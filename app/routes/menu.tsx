import type {Route} from './+types/menu';
import {BRAND} from '~/lib/brand';
import {
  MENU_EXTRAS,
  MENU_INTRO,
  MENU_SECTIONS,
  formatMenuPrice,
  type MenuSection,
} from '~/lib/menu';
import {buildSeo} from '~/lib/seo';
import {FadeIn} from '~/components/ui/FadeIn';
import {Button} from '~/components/ui/Button';

export const meta: Route.MetaFunction = () => {
  return buildSeo({
    title: 'Menu & Prices',
    description: `Frozen Halaal savouries price list from ${BRAND.name} in ${BRAND.location.suburb}. Samoosas, pies, spring rolls, and more — made to order.`,
    path: '/menu',
  });
};

export default function MenuPage() {
  const whatsappUrl = `https://wa.me/${BRAND.contact.whatsapp}`;

  return (
    <div className="bg-brand-inverse">
      <section className="border-b border-neutral-muted bg-neutral">
        <div className="container-premium section-pad">
          <FadeIn className="mx-auto max-w-3xl text-center">
            <p className="eyebrow mb-4">Price list</p>
            <h1 className="text-balance text-4xl sm:text-5xl md:text-6xl">
              {BRAND.name}
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-base text-ink-muted sm:text-lg">
              {BRAND.tagline}
            </p>
            <p className="mt-3 text-sm font-medium uppercase tracking-[0.14em] text-brand">
              {MENU_INTRO.frozenNote}
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-sm text-ink-muted">
              {BRAND.halaal && (
                <span className="border border-brand/15 bg-brand-inverse px-3 py-1.5 text-xs font-medium uppercase tracking-[0.14em] text-brand">
                  Halaal
                </span>
              )}
              <span>
                Based in {BRAND.location.suburb}
              </span>
              <span aria-hidden="true">·</span>
              <a
                href={BRAND.contact.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline"
              >
                @the_savoury_lab
              </a>
            </div>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button href={whatsappUrl} variant="primary">
                WhatsApp to order
              </Button>
              <Button to="/collections/all" variant="outline">
                Shop online
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="container-premium section-pad">
        <div className="mx-auto flex max-w-4xl flex-col gap-14">
          {MENU_SECTIONS.map((section, index) => (
            <FadeIn key={section.id} delay={index * 0.03}>
              <MenuSectionTable section={section} />
            </FadeIn>
          ))}

          <FadeIn>
            <div>
              <h2 className="mb-1 text-2xl sm:text-3xl">Extras</h2>
              <div className="mt-4 overflow-x-auto border border-neutral-muted">
                <table className="w-full min-w-[20rem] text-left text-sm">
                  <thead>
                    <tr className="bg-brand text-brand-inverse">
                      <th className="px-4 py-3 font-medium">Item</th>
                      <th className="px-4 py-3 text-right font-medium">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {MENU_EXTRAS.map((extra, i) => (
                      <tr
                        key={extra.name}
                        className={
                          i % 2 === 0 ? 'bg-brand-inverse' : 'bg-neutral'
                        }
                      >
                        <td className="px-4 py-3 text-brand">{extra.name}</td>
                        <td className="px-4 py-3 text-right tabular-nums text-brand">
                          {extra.priceLabel}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="border-t border-neutral-muted bg-neutral">
        <div className="container-premium section-pad text-center">
          <FadeIn className="mx-auto max-w-xl">
            <p className="text-sm text-ink-muted">{MENU_INTRO.bakedFriedNote}</p>
            <p className="mt-2 text-xs uppercase tracking-[0.14em] text-ink-muted">
              {MENU_INTRO.pricesNote}
            </p>
            <p className="mt-6 text-sm text-ink-muted">
              Order via WhatsApp{' '}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline font-medium text-brand"
              >
                {BRAND.contact.phone}
              </a>
            </p>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}

function MenuSectionTable({section}: {section: MenuSection}) {
  const packQtys =
    section.packQtys ?? section.items[0]?.prices.map((p) => p.qty) ?? [];

  return (
    <div>
      <div className="mb-4">
        <h2 className="text-2xl sm:text-3xl">
          {section.title}
          {section.subtitle ? (
            <span className="ml-2 text-lg font-normal text-ink-muted sm:text-xl">
              — {section.subtitle}
            </span>
          ) : null}
        </h2>
        {section.minNote ? (
          <p className="mt-1 text-sm text-ink-muted">{section.minNote}</p>
        ) : null}
      </div>
      <div className="overflow-x-auto border border-neutral-muted">
        <table className="w-full min-w-[20rem] text-left text-sm">
          <thead>
            <tr className="bg-brand text-brand-inverse">
              <th className="px-4 py-3 font-medium">Filling</th>
              {packQtys.map((qty) => (
                <th
                  key={qty}
                  className="px-4 py-3 text-right font-medium tabular-nums"
                >
                  {qty}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {section.items.map((item, i) => (
              <tr
                key={item.name}
                className={i % 2 === 0 ? 'bg-brand-inverse' : 'bg-neutral'}
              >
                <td className="px-4 py-3 text-brand">{item.name}</td>
                {packQtys.map((qty) => {
                  const pack = item.prices.find((p) => p.qty === qty);
                  return (
                    <td
                      key={qty}
                      className="px-4 py-3 text-right tabular-nums text-brand"
                    >
                      {pack ? formatMenuPrice(pack.price) : '—'}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
