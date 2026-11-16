import assert from 'node:assert/strict';
import test from 'node:test';
import type { APIGatewayProxyEvent, Context } from 'aws-lambda';
import { createContactHandler } from '../src/contact.js';

const valid = {
  reason: 'correction',
  name: ' Example Reader ',
  email: 'reader+test@example.com',
  link: 'https://www.combreport.com/guides/ghd-speed-vs-helios#section',
  message: ' The specification needs checking.\nThank you. ',
};
const request = (body: unknown) =>
  ({
    path: '/api/contact',
    httpMethod: 'POST',
    headers: {
      Origin: 'https://www.combreport.com',
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify(body),
    isBase64Encoded: false,
  }) as APIGatewayProxyEvent;
const context = {} as Context;

test('accepts a validated correction only after the provider accepts it', async () => {
  const handler = createContactHandler(async (mail) => {
    assert.deepEqual(mail, {
      replyTo: valid.email,
      subject: 'Comb Report contact — Report a correction',
      text: [
        'Reason: Report a correction',
        'Name: Example Reader',
        `Reply address: ${valid.email}`,
        `Page link: ${valid.link}`,
        '',
        valid.message.trim(),
      ].join('\n'),
    });
    return true;
  });
  const event = request(valid);
  // API Gateway can deliver the same request as a base64 payload.
  event.body = Buffer.from(event.body!).toString('base64');
  event.isBase64Encoded = true;
  const response = await handler(event, context);
  assert.equal(response.statusCode, 200);
  assert.equal(response.headers?.['cache-control'], 'no-store');
  assert.deepEqual(JSON.parse(response.body), { ok: true });
});

test('rejects invalid fields, unexpected fields, honeypot entries and oversized requests', async () => {
  let deliveries = 0;
  const handler = createContactHandler(async () => {
    deliveries++;
    return true;
  });
  const invalid = await handler(
    request({
      reason: 'unauthorised',
      name: 'x'.repeat(101),
      email: 'victim@example.com\r\nBcc: attacker@example.com',
      link: 'javascript:alert(1)',
      message: '  ',
    }),
    context,
  );
  assert.equal(invalid.statusCode, 400);
  assert.deepEqual(JSON.parse(invalid.body).errors, {
    reason: 'Choose a reason.',
    name: 'Keep your name to 100 characters or fewer.',
    email: 'Enter a valid email address.',
    link: 'Enter a full link starting with https:// or http://.',
    message: 'Enter a message.',
  });
  for (const body of [
    { ...valid, website: 'spam.test' },
    { ...valid, to: 'other@example.com' },
    { ...valid, name: ['Reader'] },
    { ...valid, message: 'x'.repeat(5001) },
    { ...valid, link: `https://example.com/${'x'.repeat(2048)}` },
  ])
    assert.equal((await handler(request(body), context)).statusCode, 400);
  assert.equal(
    (await handler(request({ ...valid, message: 'x'.repeat(50000) }), context))
      .statusCode,
    413,
  );
  assert.equal(
    (
      await handler(
        {
          ...request(valid),
          headers: { Origin: 'https://example.com' },
        },
        context,
      )
    ).statusCode,
    403,
  );
  assert.equal(deliveries, 0);
});

test('returns the JSON error contract for rejected HTTP requests', async () => {
  const handler = createContactHandler(async () =>
    assert.fail('Unexpected delivery'),
  );
  const validRequest = request(valid);
  for (const [event, status] of [
    [{ ...validRequest, body: '{' }, 400],
    [
      { ...validRequest, headers: { Origin: 'https://www.combreport.com' } },
      415,
    ],
    [{ ...validRequest, httpMethod: 'GET', body: null }, 405],
  ] as const) {
    const response = await handler(event, context);
    assert.equal(response.statusCode, status);
    assert.equal(response.headers['cache-control'], 'no-store');
    assert.deepEqual(JSON.parse(response.body), { ok: false });
  }
});

test('returns a generic failure for provider rejection or an ambiguous timeout', async () => {
  for (const send of [
    async () => false,
    async () => {
      throw new Error(valid.message);
    },
  ]) {
    const response = await createContactHandler(send)(request(valid), context);
    assert.equal(response.statusCode, 503);
    assert.deepEqual(JSON.parse(response.body), { ok: false });
  }
});
