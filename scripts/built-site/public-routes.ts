// Runs the real CloudFront viewer-request function (the same source CDK deploys)
// against the exact directory that is uploaded, so a route that only works
// through client-side navigation, or a rewrite that points at a missing object,
// fails before deployment instead of in production.
import { access, readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { runInNewContext } from 'node:vm';
import { JSDOM } from 'jsdom';
import { canonicalOrigin, cleanText } from './pages.ts';

const repositoryRoot = join(import.meta.dirname, '../..');
const rewriteSource = join(
  repositoryRoot,
  'infra/functions/prerender-route-rewrite.ts',
);
const stackSource = join(repositoryRoot, 'infra/lib/hair-stack.ts');
const canonicalHost = new URL(canonicalOrigin).hostname;
const apexHost = canonicalHost.replace(/^www\./, '');

interface EdgeRequest {
  uri: string;
  headers: { host: { value: string } };
  querystring: Record<string, { value: string }>;
}
interface EdgeRedirect {
  statusCode: number;
  headers: { location: { value: string } };
}
export type EdgeHandler = (event: {
  request: EdgeRequest;
}) => EdgeRequest | EdgeRedirect;

export async function loadEdgeHandler(): Promise<EdgeHandler> {
  const handler: unknown = runInNewContext(
    `${await readFile(rewriteSource, 'utf8')}; handler;`,
  );
  if (typeof handler !== 'function')
    throw new Error(`${rewriteSource}: no handler function.`);
  return handler as EdgeHandler;
}

export function viewerRequest(
  handler: EdgeHandler,
  uri: string,
  host = canonicalHost,
) {
  return handler({
    request: { uri, headers: { host: { value: host } }, querystring: {} },
  });
}

const exists = (file: string) =>
  access(file).then(
    () => true,
    () => false,
  );

/** CloudFront error-response pages declared by the stack, e.g. /404/index.html. */
export async function errorResponsePages(): Promise<string[]> {
  const source = await readFile(stackSource, 'utf8');
  return [
    ...new Set(
      [...source.matchAll(/responsePagePath:\s*'([^']+)'/g)].map((m) => m[1]),
    ),
  ];
}

export async function publicRouteErrors(
  root: string,
  paths: readonly string[],
): Promise<string[]> {
  const handler = await loadEdgeHandler();
  const errors: string[] = [];
  const notFoundHeading = cleanText(
    new JSDOM(
      await readFile(join(root, '404', 'index.html'), 'utf8'),
    ).window.document.querySelector('h1')?.textContent,
  );

  for (const path of paths) {
    const canonical = canonicalOrigin + path;
    const result = viewerRequest(handler, path);
    if ('statusCode' in result) {
      errors.push(
        `${path}: canonical URL redirects to ${result.headers.location.value}.`,
      );
      continue;
    }
    const file = join(root, result.uri);
    if (!(await exists(file))) {
      errors.push(`${path}: edge rewrite ${result.uri} has no built object.`);
      continue;
    }
    const doc = new JSDOM(await readFile(file, 'utf8')).window.document;
    const pageCanonical = doc
      .querySelector('link[rel="canonical"]')
      ?.getAttribute('href');
    if (pageCanonical !== canonical)
      errors.push(
        `${path}: served document has canonical ${pageCanonical ?? '(none)'}.`,
      );
    const main = doc.querySelector('main');
    if (main?.querySelectorAll('h1').length !== 1)
      errors.push(`${path}: served document has no single <main> H1.`);
    if (cleanText(main?.textContent).length < 80)
      errors.push(`${path}: served document is an empty app shell.`);
    if (
      notFoundHeading &&
      cleanText(main?.querySelector('h1')?.textContent) === notFoundHeading
    )
      errors.push(`${path}: served document is the not-found page.`);

    // Variants must reach the canonical URL in one hop.
    const variants: [string, string][] = [[path, apexHost]];
    if (path !== '/')
      variants.push(
        [`${path}/`, canonicalHost],
        [`${path}/index.html`, canonicalHost],
      );
    for (const [uri, host] of variants) {
      const redirect = viewerRequest(handler, uri, host);
      if (
        !('statusCode' in redirect) ||
        redirect.statusCode !== 301 ||
        redirect.headers.location.value !== canonical
      )
        errors.push(
          `${host}${uri}: expected one 301 to ${canonical}, got ${'statusCode' in redirect ? `${redirect.statusCode} ${redirect.headers.location.value}` : `origin ${redirect.uri}`}.`,
        );
    }
  }

  const unknown = '/__unregistered-public-route-check__';
  const unknownResult = viewerRequest(handler, unknown);
  if ('statusCode' in unknownResult)
    errors.push(`${unknown}: unknown route redirects instead of 404.`);
  else if (await exists(join(root, unknownResult.uri)))
    errors.push(`${unknown}: unknown route resolves to a built object.`);

  const errorPages = await errorResponsePages();
  if (!errorPages.length)
    errors.push('hair-stack.ts: no CloudFront error response page found.');
  for (const page of errorPages) {
    const file = join(root, page);
    if (!(await exists(file)))
      errors.push(`${page}: CloudFront error response page is not built.`);
    else if (
      !new JSDOM(await readFile(file, 'utf8')).window.document
        .querySelector('meta[name="robots"]')
        ?.getAttribute('content')
        ?.includes('noindex')
    )
      errors.push(`${page}: CloudFront error response page must be noindex.`);
  }
  return errors;
}
