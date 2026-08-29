/**
 * Shopify Headless / Hydrogen env helpers.
 *
 * Customer-facing Hydrogen analytics and Customer Privacy require a
 * *public* Storefront API token (32 characters). Admin tokens (`shpat_`)
 * and private storefront tokens must never be passed to the browser.
 *
 * Set these on Vercel (Production + Preview). Do not commit token values.
 *   PUBLIC_STORE_DOMAIN              e.g. your-store.myshopify.com
 *   PUBLIC_STOREFRONT_API_TOKEN      32-char public token from Headless channel
 *   PUBLIC_STOREFRONT_ID             Hydrogen / Headless storefront id
 *   PUBLIC_CHECKOUT_DOMAIN           checkout host (often checkout.shopify.com)
 *   SESSION_SECRET                   long random string
 *
 * Optional until /account is used:
 *   PUBLIC_CUSTOMER_ACCOUNT_API_CLIENT_ID
 *   PUBLIC_CUSTOMER_ACCOUNT_API_URL
 *
 * Never put PRIVATE_STOREFRONT_API_TOKEN or Admin API tokens in client props.
 */

const PRIVATE_TOKEN_PREFIXES = [
  'shpat_',
  'shpca_',
  'shpss_',
  'shppa_',
] as const;

export function isMockStorefront(env: {
  PUBLIC_STORE_DOMAIN?: string;
}): boolean {
  return (env.PUBLIC_STORE_DOMAIN ?? '').includes('mock.shop');
}

export function looksLikePrivateAccessToken(token?: string): boolean {
  if (!token) return false;
  return PRIVATE_TOKEN_PREFIXES.some((prefix) => token.startsWith(prefix));
}

/** Public Storefront API tokens are 32 characters and are not `shpat_` admin keys. */
export function isPublicStorefrontToken(token?: string): boolean {
  if (!token) return false;
  const value = token.trim();
  if (!value || looksLikePrivateAccessToken(value)) return false;
  return value.length === 32;
}

export function isValidStorefrontId(id?: string): boolean {
  if (!id) return false;
  const value = id.trim();
  if (!value || value.toLowerCase() === 'mock') return false;
  return true;
}

/**
 * True only when client-side Shopify analytics / customer privacy can run
 * without logging "private access token" or "Invalid storefrontId".
 */
export function canUseShopifyCustomerAnalytics(env: {
  PUBLIC_STORE_DOMAIN?: string;
  PUBLIC_STOREFRONT_API_TOKEN?: string;
  PUBLIC_STOREFRONT_ID?: string;
  PUBLIC_CHECKOUT_DOMAIN?: string;
}): boolean {
  if (isMockStorefront(env)) return false;
  if (!env.PUBLIC_CHECKOUT_DOMAIN?.trim()) return false;
  return (
    isPublicStorefrontToken(env.PUBLIC_STOREFRONT_API_TOKEN) &&
    isValidStorefrontId(env.PUBLIC_STOREFRONT_ID)
  );
}
