import {Link} from 'react-router';
import {BRAND} from '~/lib/brand';

/**
 * Shown when the storefront is in static-catalogue / mock.shop mode
 * (no merchant Shopify catalogue linked yet).
 */
export function MockShopBanner({storeDomain}: {storeDomain?: string}) {
  if (!storeDomain || !storeDomain.includes('mock.shop')) return null;

  return (
    <div
      className="border-b border-accent/30 bg-neutral px-4 py-2.5 text-center text-xs leading-relaxed text-ink-muted"
      role="status"
    >
      Preview menu — order via{' '}
      <a
        href={`https://wa.me/${BRAND.contact.whatsapp}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-brand underline-offset-2 hover:underline"
      >
        WhatsApp
      </a>{' '}
      or{' '}
      <Link to="/contact" className="text-brand underline-offset-2 hover:underline">
        Contact
      </Link>
      . Online checkout unlocks when our Shopify store is linked.
    </div>
  );
}
