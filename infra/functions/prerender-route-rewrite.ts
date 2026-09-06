export function handler(event: any) {
  const request = event.request;

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

  if (request.uri.endsWith('/')) {
    request.uri += 'index.html';
  } else if (!request.uri.includes('.')) {
    request.uri += '/index.html';
  }

  return request;
}
