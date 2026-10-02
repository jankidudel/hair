import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { runInNewContext } from 'node:vm';
import { wrapViewerRequestWithBasicAuth } from '../lib/hair-stack.js';

interface CloudFrontRequest {
  uri: string;
  readonly headers: {
    readonly host: { readonly value: string };
    readonly authorization?: { readonly value: string };
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

function devEdgeHandler(expectedAuthorization: string): CloudFrontHandler {
  const routeRewriteCode = readFileSync(
    new URL('../functions/prerender-route-rewrite.ts', import.meta.url),
    'utf8',
  );
  const candidate = runInNewContext(
    `${wrapViewerRequestWithBasicAuth(routeRewriteCode, expectedAuthorization)}; handler;`,
  );
  assert.equal(typeof candidate, 'function');
  return candidate as CloudFrontHandler;
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

test('permanently redirects retired duplicate guides and product comparisons', () => {
  const result = edgeHandler()({
    request: request('www.combreport.com', '/products/dyson-airwrap-vs-shark-flexstyle'),
  }) as { readonly statusCode: number; readonly headers: { readonly location: { readonly value: string } } };
  assert.equal(result.statusCode, 308);
  assert.equal(result.headers.location.value, '/guides/dyson-airwrap-vs-shark-flexstyle');
});

test('rejects unauthenticated requests with a Basic authentication challenge', () => {
  const result = devEdgeHandler('Basic ZGV2OnNlY3JldA==')({
    request: request('dev.example.test', '/guides'),
  }) as {
    readonly statusCode: number;
    readonly headers: {
      readonly 'www-authenticate': { readonly value: string };
    };
  };

  assert.equal(result.statusCode, 401);
  assert.equal(
    result.headers['www-authenticate'].value,
    'Basic realm="Development"',
  );
});

test('passes authenticated requests to the existing rewrite logic', () => {
  const authenticatedRequest: CloudFrontRequest = {
    uri: '/guides',
    headers: {
      host: { value: 'dev.example.test' },
      authorization: { value: 'Basic ZGV2OnNlY3JldA==' },
    },
  };

  assert.equal(
    devEdgeHandler('Basic ZGV2OnNlY3JldA==')({
      request: authenticatedRequest,
    }),
    authenticatedRequest,
  );
  assert.equal(authenticatedRequest.uri, '/guides/index.html');

  const redirect = devEdgeHandler('Basic ZGV2OnNlY3JldA==')({
    request: {
      uri: '/guides',
      headers: {
        host: { value: 'combreport.com' },
        authorization: { value: 'Basic ZGV2OnNlY3JldA==' },
      },
    },
  }) as {
    readonly statusCode: number;
    readonly headers: { readonly location: { readonly value: string } };
  };
  assert.equal(redirect.statusCode, 301);
  assert.equal(
    redirect.headers.location.value,
    'https://www.combreport.com/guides',
  );
});
