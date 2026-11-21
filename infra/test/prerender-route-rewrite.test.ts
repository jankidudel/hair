import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { runInNewContext } from 'node:vm';

interface QueryValue {
  readonly value: string;
  readonly multiValue?: readonly { readonly value: string }[];
}

interface CloudFrontRequest {
  uri: string;
  readonly headers: {
    readonly host: { readonly value: string };
  };
  readonly querystring: Readonly<Record<string, QueryValue>>;
}

interface Redirect {
  readonly statusCode: number;
  readonly headers: { readonly location: { readonly value: string } };
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

function request(
  host: string,
  uri: string,
  querystring: Record<string, QueryValue> = {},
): CloudFrontRequest {
  return { uri, headers: { host: { value: host } }, querystring };
}

function redirectTarget(result: unknown): string {
  const redirect = result as Redirect;
  assert.equal(redirect.statusCode, 301);
  return redirect.headers.location.value;
}

test('uses only syntax the CloudFront JavaScript 2.0 runtime documents', () => {
  const source = readFileSync(
    new URL('../functions/prerender-route-rewrite.ts', import.meta.url),
    'utf8',
  ).replace(/^\s*\/\/.*$/gm, '');
  const undocumented: [string, RegExp][] = [
    ['var', /\bvar\s/],
    ['for...of', /\bfor\s*\([^)]*\bof\b/],
    ['spread or rest', /\.\.\./],
    ['optional chaining', /\?\./],
    ['nullish coalescing', /\?\?/],
    ['destructuring', /\b(?:const|let)\s*[[{]/],
    ['import or export', /^\s*(?:import|export)\b/m],
  ];
  for (const [feature, pattern] of undocumented)
    assert.doesNotMatch(source, pattern, feature);
});

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

  const home = request('www.combreport.com', '/');
  assert.equal(edgeHandler()({ request: home }), home);
  assert.equal(home.uri, '/index.html');

  const asset = request('www.combreport.com', '/diagrams/barrel-geometry.svg');
  assert.equal(edgeHandler()({ request: asset }), asset);
  assert.equal(asset.uri, '/diagrams/barrel-geometry.svg');
});

test('redirects trailing-slash and index.html duplicates to the canonical route', () => {
  const handler = edgeHandler();
  const cases: [string, string][] = [
    ['/guides/', 'https://www.combreport.com/guides'],
    ['/guides//', 'https://www.combreport.com/guides'],
    [
      '/guides/how-to-choose-hair-dryer/',
      'https://www.combreport.com/guides/how-to-choose-hair-dryer',
    ],
    ['/guides/index.html', 'https://www.combreport.com/guides'],
    ['/guides/index.html/', 'https://www.combreport.com/guides'],
    ['/index.html', 'https://www.combreport.com/'],
  ];
  for (const [uri, location] of cases)
    assert.equal(
      redirectTarget(handler({ request: request('www.combreport.com', uri) })),
      location,
      uri,
    );
});

test('keeps the query string on redirects without redirecting for it alone', () => {
  const handler = edgeHandler();
  const tracking = {
    utm_source: { value: 'news%20letter' },
    tag: { value: 'a', multiValue: [{ value: 'a' }, { value: 'b' }] },
    flag: { value: '' },
  };
  assert.equal(
    redirectTarget(
      handler({ request: request('www.combreport.com', '/guides/', tracking) }),
    ),
    'https://www.combreport.com/guides?utm_source=news%20letter&tag=a&tag=b&flag',
  );

  const canonicalWithQuery = request('www.combreport.com', '/guides', tracking);
  assert.equal(handler({ request: canonicalWithQuery }), canonicalWithQuery);
  assert.equal(canonicalWithQuery.uri, '/guides/index.html');
});

test('normalises apex trailing-slash requests in a single hop', () => {
  assert.equal(
    redirectTarget(
      edgeHandler()({
        request: request('combreport.com', '/guides/', {
          gclid: { value: 'abc' },
        }),
      }),
    ),
    'https://www.combreport.com/guides?gclid=abc',
  );
  assert.equal(
    redirectTarget(edgeHandler()({ request: request('combreport.com', '/') })),
    'https://www.combreport.com/',
  );
});

test('passes API paths through without an index rewrite', () => {
  const handler = edgeHandler();
  for (const path of ['/api/contact', '/api/v1/status', '/api/']) {
    const apiRequest = request('www.combreport.com', path);
    assert.equal(handler({ request: apiRequest }), apiRequest);
    assert.equal(apiRequest.uri, path);
  }

  const guide = request('www.combreport.com', '/api-guide');
  handler({ request: guide });
  assert.equal(guide.uri, '/api-guide/index.html');
});
