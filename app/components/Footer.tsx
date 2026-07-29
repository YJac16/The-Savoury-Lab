import {NavLink} from 'react-router';
import {BRAND, NAV_LINKS} from '~/lib/brand';
import {NewsletterForm} from '~/components/NewsletterForm';

const POLICY_LINKS = [
  {title: 'Privacy Policy', to: '/policies/privacy-policy'},
  {title: 'Refund Policy', to: '/policies/refund-policy'},
  {title: 'Shipping Policy', to: '/policies/shipping-policy'},
  {title: 'Terms of Service', to: '/policies/terms-of-service'},
] as const;

interface FooterProps {
  footer?: Promise<unknown | null>;
  header?: unknown;
  publicStoreDomain?: string;
}

export function Footer(_props: FooterProps) {
  const whatsappUrl = `https://wa.me/${BRAND.contact.whatsapp}`;
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-brand/10 bg-brand text-brand-inverse">
      <div className="container-premium section-pad">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <p className="font-display text-2xl">{BRAND.name}</p>
            <p className="mt-2 text-sm text-accent-soft">{BRAND.tagline}</p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-brand-inverse/70">
              {BRAND.subTagline} Family-owned in {BRAND.location.suburb},{' '}
              {BRAND.location.city}. Halaal certified handcrafted frozen savouries
              for homes, events, and wholesale partners.
            </p>
          </div>

          <div className="lg:col-span-2">
            <p className="eyebrow mb-4 text-accent-soft">Explore</p>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    end={link.to === '/'}
                    prefetch="intent"
                    className="text-sm text-brand-inverse/75 transition-colors hover:text-accent-soft"
                  >
                    {link.title}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <p className="eyebrow mb-4 text-accent-soft">Contact</p>
            <ul className="space-y-3 text-sm text-brand-inverse/75">
              <li>
                <a
                  href={`tel:${BRAND.contact.phone.replace(/\s/g, '')}`}
                  className="transition-colors hover:text-accent-soft"
                >
                  {BRAND.contact.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${BRAND.contact.email}`}
                  className="transition-colors hover:text-accent-soft"
                >
                  {BRAND.contact.email}
                </a>
              </li>
              <li>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-accent-soft"
                >
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href={BRAND.contact.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-accent-soft"
                >
                  Instagram
                </a>
              </li>
              <li>{BRAND.contact.hours}</li>
              <li>{BRAND.location.address}</li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <NewsletterForm className="[&_.eyebrow]:text-accent-soft [&_h2]:text-brand-inverse [&_p]:text-brand-inverse/70 [&_input]:border-brand-inverse/20 [&_input]:bg-brand-inverse/5 [&_input]:text-brand-inverse" />
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-6 border-t border-brand-inverse/10 pt-8 md:flex-row md:items-center md:justify-between">
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {POLICY_LINKS.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  prefetch="intent"
                  className="text-xs text-brand-inverse/55 transition-colors hover:text-accent-soft"
                >
                  {link.title}
                </NavLink>
              </li>
            ))}
          </ul>
          <p className="text-xs text-brand-inverse/45">
            © {year} {BRAND.name}. {BRAND.location.suburb},{' '}
            {BRAND.location.city}.
          </p>
        </div>
      </div>
    </footer>
  );
}
