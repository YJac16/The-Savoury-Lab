import {
  createRequestHandler,
  storefrontRedirect,
} from '@shopify/hydrogen';
import {waitUntil as vercelWaitUntil} from '@vercel/functions';
import * as reactRouterBuild from 'virtual:react-router/server-build';
import {createHydrogenRouterContext} from '~/lib/context';

function waitUntil(promise: Promise<unknown>) {
  try {
    vercelWaitUntil(promise);
  } catch {
    // Outside a Vercel request context, background work is optional.
  }
}

/**
 * Vercel server entry — Web Fetch handler with Hydrogen load context.
 */
export default async function handler(request: Request): Promise<Response> {
  try {
    const env = process.env as unknown as Env;

    const hydrogenContext = await createHydrogenRouterContext(request, env, {
      waitUntil,
    });

    const handleRequest = createRequestHandler({
      build: reactRouterBuild,
      mode: process.env.NODE_ENV,
      getLoadContext: () => hydrogenContext,
    });

    const response = await handleRequest(request);

    if (hydrogenContext.session.isPending) {
      response.headers.set(
        'Set-Cookie',
        await hydrogenContext.session.commit(),
      );
    }

    if (response.status === 404) {
      return storefrontRedirect({
        request,
        response,
        storefront: hydrogenContext.storefront,
      });
    }

    return response;
  } catch (error) {
    console.error('Hydrogen request failed', error);
    const message =
      error instanceof Error ? error.message : 'An unexpected error occurred';
    return new Response(`Server error: ${message}`, {status: 500});
  }
}
