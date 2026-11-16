import awsLambdaFastify from '@fastify/aws-lambda';
import type { APIGatewayProxyEvent } from 'aws-lambda';
import Fastify from 'fastify';
import { createRequire } from 'node:module';
import {
  contactFields,
  contactReasons,
  validateContact,
  type ContactInput,
} from './contact-fields.js';

const maxRequestBytes = 48 * 1024;
const contactPath = '/api/contact';
const siteOrigin = 'https://www.combreport.com';
const acceptedFields = new Set<string>([
  ...contactFields,
  'website',
  'turnstileToken',
]);

interface OutgoingContact {
  replyTo: string;
  subject: string;
  text: string;
}
type DeliverContact = (mail: OutgoingContact) => Promise<boolean>;

export function createContactHandler(
  deliver: DeliverContact,
  verifyToken: (token: string) => Promise<boolean>,
) {
  const app = Fastify({ logger: false });
  app.addHook('onRequest', async (_request, reply) => {
    reply.header('cache-control', 'no-store');
  });
  app.setErrorHandler((error, _request, reply) => {
    // Fastify parser errors can carry request information.
    const status =
      error instanceof Error && 'statusCode' in error
        ? error.statusCode
        : undefined;
    return reply
      .code(typeof status === 'number' ? status : 500)
      .send({ ok: false });
  });
  app.setNotFoundHandler((request, reply) => {
    const path = request.url.split('?', 1)[0];
    return reply.code(path === contactPath ? 405 : 404).send({ ok: false });
  });
  app.post(
    contactPath,
    {
      bodyLimit: maxRequestBytes,
      onRequest: async (request, reply) => {
        if (request.headers.origin !== siteOrigin) {
          return reply.code(403).send({ ok: false });
        }
        if (
          request.headers['content-type']
            ?.split(';', 1)[0]
            .trim()
            .toLowerCase() !== 'application/json'
        ) {
          return reply.code(415).send({ ok: false });
        }
      },
    },
    async (request, reply) => {
      const candidate = request.body;
      if (
        !candidate ||
        typeof candidate !== 'object' ||
        Array.isArray(candidate) ||
        Object.entries(candidate).some(
          ([key, value]) =>
            !acceptedFields.has(key) || typeof value !== 'string',
        )
      )
        return reply.code(400).send({ ok: false });

      const payload = candidate as Partial<ContactInput> & {
        website?: string;
        turnstileToken?: string;
      };
      if (payload.website) return reply.code(400).send({ ok: false });
      const result = validateContact({
        reason: payload.reason ?? '',
        name: payload.name ?? '',
        email: payload.email ?? '',
        link: payload.link ?? '',
        message: payload.message ?? '',
      });
      if ('errors' in result)
        return reply.code(400).send({ ok: false, errors: result.errors });

      const { reason, name, email, link, message } = result.message;
      const reasonLabel = contactReasons[reason];
      const token = payload.turnstileToken?.trim();
      try {
        if (!token || token.length > 2048 || !(await verifyToken(token))) {
          return reply.code(400).send({ ok: false, captcha: true });
        }
        const accepted = await deliver({
          replyTo: email,
          subject: `Comb Report contact — ${reasonLabel}`,
          text: [
            `Reason: ${reasonLabel}`,
            ...(name ? [`Name: ${name}`] : []),
            `Reply address: ${email}`,
            ...(link ? [`Page link: ${link}`] : []),
            '',
            message,
          ].join('\n'),
        });
        return accepted ? { ok: true } : reply.code(503).send({ ok: false });
      } catch {
        // Provider errors may contain message data. Return a generic failure.
        return reply.code(503).send({ ok: false });
      }
    },
  );
  return awsLambdaFastify<APIGatewayProxyEvent>(app, {
    decorateRequest: false,
  });
}

interface SesSendEmailInput {
  FromEmailAddress: string;
  Destination: { ToAddresses: string[] };
  ReplyToAddresses: string[];
  Content: {
    Simple: {
      Subject: { Data: string; Charset: 'UTF-8' };
      Body: { Text: { Data: string; Charset: 'UTF-8' } };
    };
  };
}

interface SesRuntime {
  SESv2Client: new (config: { maxAttempts: number }) => {
    send(
      command: object,
      options: { abortSignal: AbortSignal },
    ): Promise<{ MessageId?: string }>;
  };
  SendEmailCommand: new (input: SesSendEmailInput) => object;
}

const requireFromLambda = createRequire(import.meta.url);
let sesClient: InstanceType<SesRuntime['SESv2Client']> | undefined;
async function verifyTurnstileToken(token: string): Promise<boolean> {
  const secret = process.env['TURNSTILE_SECRET'];
  if (!secret) throw new Error('Turnstile is unavailable.');
  const response = await fetch(
    'https://challenges.cloudflare.com/turnstile/v0/siteverify',
    {
      method: 'POST',
      body: new URLSearchParams({ secret, response: token }),
      signal: AbortSignal.timeout(2000),
    },
  );
  if (!response.ok) throw new Error('Turnstile is unavailable.');
  const result = await response.json();
  if (result['error-codes']?.includes('internal-error')) {
    throw new Error('Turnstile is unavailable.');
  }
  return (
    result.success === true &&
    result.hostname === new URL(siteOrigin).hostname &&
    result.action === 'contact'
  );
}

export const handler = createContactHandler(async (mail) => {
  const from = process.env['CONTACT_SES_FROM'];
  const to = process.env['CONTACT_SES_TO'];
  if (!from || !to) return false;
  const { SESv2Client, SendEmailCommand } = requireFromLambda(
    '@aws-sdk/client-sesv2',
  ) as SesRuntime;
  sesClient ??= new SESv2Client({ maxAttempts: 1 });
  const response = await sesClient.send(
    new SendEmailCommand({
      FromEmailAddress: from,
      Destination: { ToAddresses: [to] },
      ReplyToAddresses: [mail.replyTo],
      Content: {
        Simple: {
          Subject: { Data: mail.subject, Charset: 'UTF-8' },
          Body: { Text: { Data: mail.text, Charset: 'UTF-8' } },
        },
      },
    }),
    { abortSignal: AbortSignal.timeout(5000) },
  );
  return !!response.MessageId;
}, verifyTurnstileToken);
