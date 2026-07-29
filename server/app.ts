import {
  createRequestHandler,
  storefrontRedirect,
} from '@shopify/hydrogen';
import {waitUntil} from '@vercel/functions';
import * as reactRouterBuild from 'virtual:react-router/server-build';
import {createHydrogenRouterContext} from '~/lib/context';

/**
 * Vercel server entry — Web Fetch handler with Hydrogen load context.
 * @see https://vercel.com/docs/frameworks/frontend/react-router
 * @see https://shopify.dev/docs/storefronts/headless/hydrogen/deployments/self-hosting
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
    console.error(error);
    return new Response('An unexpected error occurred', {status: 500});
  }
}
