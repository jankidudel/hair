import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { runInNewContext } from 'node:vm';

interface CloudFrontRequest {
  uri: string;
  readonly headers: {
    readonly host: { readonly value: string };
  };
}

type CloudFrontHandler = (event: { request: CloudFrontRequest }) => unknown;

function edgeHandler(): CloudFrontHandler {
  const source = readFileSync(
    new URL('../functions/prerender-route-rewrite.ts', import.meta.url),
    'utf8',
  );
  const candidate = runInNewContext(`${source}; handler;`);
  assert.equal(typeof candidate, 'function');
  return candidate as CloudFrontHandler;
}

function request(host: string, uri: string): CloudFrontRequest {
  return { uri, headers: { host: { value: host } } };
}

test('redirects the apex hostname to the canonical hostname', () => {
  const result = edgeHandler()({
    request: request('combreport.com', '/guides'),
  }) as {
    readonly statusCode: number;
    readonly headers: { readonly location: { readonly value: string } };
  };
  assert.equal(result.statusCode, 301);
  assert.equal(
    result.headers.location.value,
    'https://www.combreport.com/guides',
  );
});

test('rewrites clean routes using CloudFront JavaScript-compatible operations', () => {
  const cleanRoute = request('www.combreport.com', '/guides');
  assert.equal(edgeHandler()({ request: cleanRoute }), cleanRoute);
  assert.equal(cleanRoute.uri, '/guides/index.html');

  const directoryRoute = request('www.combreport.com', '/guides/');
  assert.equal(edgeHandler()({ request: directoryRoute }), directoryRoute);
  assert.equal(directoryRoute.uri, '/guides/index.html');
});
