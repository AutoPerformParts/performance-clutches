import {RemixServer} from '@remix-run/react';
import {createContentSecurityPolicy} from '@shopify/hydrogen';
import type {EntryContext} from '@shopify/remix-oxygen';
import isbot from 'isbot';
import {renderToReadableStream} from 'react-dom/server';

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
) {
  const {
    nonce,
    header: originalHeader,
    NonceProvider,
  } = createContentSecurityPolicy({
    'font-src': 'https://use.typekit.net',
  });
  const header = originalHeader
    .replace(
      "style-src 'self' 'unsafe-inline'",
      "style-src 'self' 'unsafe-inline' https://p.typekit.net https://use.typekit.net",
    )
    .replaceAll(
      'http://localhost:*',
      'http://localhost:* https://major-grouper-frankly.ngrok-free.app',
    )
    .replaceAll(
      'ws://localhost:*',
      'ws://localhost:* wss://major-grouper-frankly.ngrok-free.app:*',
    )
    .replaceAll(
      "connect-src 'self'",
      "connect-src 'self' *.algolia.net *.algolianet.com",
    );

  const body = await renderToReadableStream(
    <NonceProvider>
      <RemixServer context={remixContext} url={request.url} />
    </NonceProvider>,
    {
      nonce,
      signal: request.signal,
      onError(error) {
        // eslint-disable-next-line no-console
        console.error(error);
        responseStatusCode = 500;
      },
    },
  );

  if (isbot(request.headers.get('user-agent'))) {
    await body.allReady;
  }

  responseHeaders.set('Content-Type', 'text/html');
  responseHeaders.set('Content-Security-Policy', header);

  return new Response(body, {
    headers: responseHeaders,
    status: responseStatusCode,
  });
}
