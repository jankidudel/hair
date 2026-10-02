// CloudFront executes this file as JavaScript, so it must contain no TypeScript
// syntax despite using a .ts filename for repository consistency.
function rewriteOrRedirect(request) {
  if (request.headers.host.value === 'combreport.com') {
    return {
      statusCode: 301,
      statusDescription: 'Moved Permanently',
      headers: {
        location: {
          value: 'https://www.combreport.com' + request.uri,
        },
      },
    };
  }

  // Retired duplicate routes are handled before the static-route rewrite so
  // they remain a single permanent response, never a rendered duplicate.
  var redirects = {
    '/guides/best-hair-brush-for-curly-hair': '/guides/best-brushes-curly-hair',
    '/guides/best-hair-brush-for-thick-hair': '/guides/best-brushes-thick-hair',
    '/products/dyson-supersonic-vs-shark-speedstyle':
      '/guides/dyson-supersonic-vs-shark-speedstyle',
    '/products/dyson-airwrap-vs-shark-flexstyle':
      '/guides/dyson-airwrap-vs-shark-flexstyle',
    '/products/babyliss-air-style-1000-vs-flawless-volume':
      '/guides/babyliss-air-style-1000-vs-flawless-volume',
  };
  var destination = redirects[request.uri];
  if (destination) {
    return {
      statusCode: 308,
      statusDescription: 'Permanent Redirect',
      headers: { location: { value: destination } },
    };
  }

  if (request.uri.charAt(request.uri.length - 1) === '/') {
    request.uri += 'index.html';
  } else if (request.uri.indexOf('.') === -1) {
    request.uri += '/index.html';
  }

  return request;
}

function handler(event) {
  return rewriteOrRedirect(event.request);
}
