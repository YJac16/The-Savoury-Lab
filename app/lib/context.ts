import {createHydrogenContext} from '@shopify/hydrogen';
import {AppSession} from '~/lib/session';
import {CART_QUERY_FRAGMENT} from '~/lib/fragments';
import {getHydrogenCache} from '~/lib/cache';
import type {CartApiQueryFragment} from 'storefrontapi.generated';

// Define the additional context object
const additionalContext = {
  // Additional context for custom properties, CMS clients, 3P SDKs, etc.
} as const;

// Automatically augment HydrogenAdditionalContext with the additional context type
type AdditionalContextType = typeof additionalContext;

declare global {
  interface HydrogenAdditionalContext extends AdditionalContextType {}

  // Augment HydrogenCustomCartFragment with the codegen'd cart fragment type so
  // that context.cart.get() and all cart mutations return the extended cart type.
  interface HydrogenCustomCartFragment extends CartApiQueryFragment {}
}

type WaitUntil = (promise: Promise<unknown>) => void;

/**
 * Creates Hydrogen context for React Router (Oxygen or Vercel).
 */
export async function createHydrogenRouterContext(
  request: Request,
  env: Env,
  executionContext: {waitUntil: WaitUntil},
) {
  if (!env?.SESSION_SECRET) {
    throw new Error('SESSION_SECRET environment variable is not set');
  }

  const waitUntil = executionContext.waitUntil.bind(executionContext);
  const [cache, session] = await Promise.all([
    getHydrogenCache('hydrogen'),
    AppSession.init(request, [env.SESSION_SECRET]),
  ]);

  const hydrogenContext = createHydrogenContext(
    {
      env,
      request,
      cache,
      waitUntil,
      session,
      i18n: {language: 'EN', country: 'ZA'},
      cart: {
        queryFragment: CART_QUERY_FRAGMENT,
      },
    },
    additionalContext,
  );

  return hydrogenContext;
}
