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

function cleanEnvValue(value: string | undefined): string {
  return (value ?? '')
    .replace(/\\r\\n/g, '')
    .replace(/\\n/g, '')
    .replace(/[\r\n]+/g, '')
    .trim();
}

function readEnv(): Env {
  const env = process.env;
  return {
    SESSION_SECRET: cleanEnvValue(env.SESSION_SECRET),
    PUBLIC_STORE_DOMAIN: cleanEnvValue(env.PUBLIC_STORE_DOMAIN),
    PUBLIC_STOREFRONT_API_TOKEN: cleanEnvValue(env.PUBLIC_STOREFRONT_API_TOKEN),
    PUBLIC_STOREFRONT_ID: cleanEnvValue(env.PUBLIC_STOREFRONT_ID),
    PUBLIC_CHECKOUT_DOMAIN: cleanEnvValue(env.PUBLIC_CHECKOUT_DOMAIN),
    PUBLIC_CUSTOMER_ACCOUNT_API_CLIENT_ID:
      cleanEnvValue(env.PUBLIC_CUSTOMER_ACCOUNT_API_CLIENT_ID) || 'unused-mock',
    PUBLIC_CUSTOMER_ACCOUNT_API_URL:
      cleanEnvValue(env.PUBLIC_CUSTOMER_ACCOUNT_API_URL) ||
      'https://shopify.com/customer-account',
    NEWSLETTER_WEBHOOK_URL: cleanEnvValue(env.NEWSLETTER_WEBHOOK_URL) || undefined,
    WHOLESALE_WEBHOOK_URL: cleanEnvValue(env.WHOLESALE_WEBHOOK_URL) || undefined,
    CONTACT_WEBHOOK_URL: cleanEnvValue(env.CONTACT_WEBHOOK_URL) || undefined,
    PUBLIC_HERO_VIDEO_URL: cleanEnvValue(env.PUBLIC_HERO_VIDEO_URL) || undefined,
    PUBLIC_GA_MEASUREMENT_ID:
      cleanEnvValue(env.PUBLIC_GA_MEASUREMENT_ID) || undefined,
    PUBLIC_META_PIXEL_ID: cleanEnvValue(env.PUBLIC_META_PIXEL_ID) || undefined,
  };
}

/**
 * Vercel server entry — Web Fetch handler with Hydrogen load context.
 */
export default async function handler(request: Request): Promise<Response> {
  try {
    const env = readEnv();

    const hydrogenContext = await createHydrogenRouterContext(request, env, {
      waitUntil,
    });

    const handleRequest = createRequestHandler({
      build: reactRouterBuild,
      mode: process.env.NODE_ENV === 'development' ? 'development' : 'production',
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
    return new Response(`Server error: ${message}`, {
      status: 500,
      headers: {'Content-Type': 'text/plain; charset=utf-8'},
    });
  }
}
