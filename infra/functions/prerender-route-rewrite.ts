// CloudFront executes this file as JavaScript (cloudfront-js-2.0 runtime), so it
// must contain no TypeScript syntax despite its .ts filename. The runtime is not
// Node.js: it supports const/let, arrow functions, template literals and
// Object.entries, but AWS does not document for...of, destructuring, spread,
// optional chaining or nullish coalescing, so this file avoids them.
// infra/test/prerender-route-rewrite.test.ts guards that list.
const canonicalOrigin = 'https://www.combreport.com';
const apexHost = 'combreport.com';

// Rebuilds the viewer's query string exactly as received (CloudFront passes
// names and values still URL-encoded), so utm/gclid parameters survive a
// redirect. Query strings never trigger a redirect on their own: the canonical
// tag covers them.
const querySuffix = (querystring) => {
  const parts = Object.entries(querystring || {}).map((entry) =>
    (entry[1].multiValue || [entry[1]])
      .map((item) =>
        item.value === '' ? entry[0] : `${entry[0]}=${item.value}`,
      )
      .join('&'),
  );
  return parts.length ? `?${parts.join('&')}` : '';
};

// Prerendered routes are served at `/path`. `/path/`, `/path/index.html` and
// repeated variants return the same document, so they redirect to it instead of
// serving a duplicate URL.
const canonicalPath = (uri) =>
  uri.startsWith('/api/')
    ? uri
    : uri.replace(/(\/index\.html|\/)+$/, '') || '/';

// `/guides` → `/guides/index.html`; files with an extension pass through.
const originPath = (uri) => {
  if (uri === '/') return '/index.html';
  if (uri.startsWith('/api/') || uri.includes('.')) return uri;
  return `${uri}/index.html`;
};

const redirect = (location) => ({
  statusCode: 301,
  statusDescription: 'Moved Permanently',
  headers: { location: { value: location } },
});

function handler(event) {
  const request = event.request;
  const path = canonicalPath(request.uri);
  // One hop to the canonical host and path, so apex and slash variants never
  // chain two redirects.
  if (request.headers.host.value === apexHost || path !== request.uri)
    return redirect(canonicalOrigin + path + querySuffix(request.querystring));

  request.uri = originPath(request.uri);
  return request;
}
