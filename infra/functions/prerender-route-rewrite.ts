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
