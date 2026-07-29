import {BRAND} from '~/lib/brand';

/**
 * Shown when the storefront is pointed at Shopify's public mock.shop catalog
 * (no merchant account linked yet).
 */
export function MockShopBanner({storeDomain}: {storeDomain?: string}) {
  if (!storeDomain || !storeDomain.includes('mock.shop')) return null;

  return (
    <div
      className="border-b border-accent/30 bg-neutral px-4 py-2.5 text-center text-xs leading-relaxed text-ink-muted"
      role="status"
    >
      Demo catalogue from mock.shop — create a Shopify store and link Headless
      tokens to sell real {BRAND.name} products. See{' '}
      <span className="text-brand">docs/VERCEL_ENV.md</span> in the repo.
    </div>
  );
}
