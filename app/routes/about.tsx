import type {Route} from './+types/about';
import {PERFECT_FOR, BRAND} from '~/lib/brand';
import {buildSeo} from '~/lib/seo';
import {FadeIn} from '~/components/ui/FadeIn';
import {Button} from '~/components/ui/Button';

export const meta: Route.MetaFunction = () => {
  return buildSeo({
    title: 'About',
    description: `Family-owned in ${BRAND.location.suburb}, ${BRAND.location.city}. Handcrafted Halaal frozen savouries, frozen immediately at peak freshness.`,
    path: '/about',
  });
};

export default function AboutPage() {
  return (
    <div className="bg-brand-inverse">
      <section className="border-b border-neutral-muted bg-neutral">
        <div className="container-premium section-pad">
          <FadeIn className="mx-auto max-w-3xl text-center">
            <p className="eyebrow mb-4">Our story</p>
            <h1 className="text-balance text-4xl sm:text-5xl md:text-6xl">
              Made fresh. Frozen for convenience.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-ink-muted sm:text-lg">
              {BRAND.name} is a family-owned kitchen in {BRAND.location.suburb},{' '}
              {BRAND.location.city}. Every savoury is handcrafted with quality
              ingredients — never mass-produced shortcuts — then frozen
              immediately to lock in freshness.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="container-premium section-pad">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          <FadeIn>
            <p className="eyebrow mb-3">Craft</p>
            <h2 className="mb-4 text-3xl">Handcrafted with care</h2>
            <p className="text-sm leading-relaxed text-ink-muted">
              From samoosas to cocktail pies, each batch is prepared by hand in
              our Kenilworth kitchen. We believe premium frozen food should taste
              like it was made today — because for us, it practically was.
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="eyebrow mb-3">Quality</p>
            <h2 className="mb-4 text-3xl">Frozen at peak freshness</h2>
            <p className="text-sm leading-relaxed text-ink-muted">
              Products are frozen immediately after preparation at −18°C, preserving
              texture and flavour until you are ready to heat and serve. No thawing
              required for most items — straight from freezer to oven or air fryer.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="section-pad bg-neutral">
        <div className="container-premium">
          <FadeIn className="mb-10 max-w-2xl">
            <p className="eyebrow mb-3">Perfect for</p>
            <h2 className="text-3xl sm:text-4xl">Every table, every occasion</h2>
          </FadeIn>
          <ul className="flex flex-wrap gap-3">
            {PERFECT_FOR.map((label, index) => (
              <FadeIn key={label} delay={index * 0.04} as="li">
                <span className="inline-flex items-center border border-brand/15 bg-brand-inverse px-5 py-2.5 text-xs font-medium uppercase tracking-[0.14em] text-brand">
                  {label}
                </span>
              </FadeIn>
            ))}
          </ul>
        </div>
      </section>

      <section className="container-premium section-pad text-center">
        <FadeIn className="mx-auto max-w-xl">
          <h2 className="text-3xl">Taste the difference</h2>
          <p className="mt-4 text-sm text-ink-muted">
            Halaal certified. Cape Town roots. Premium frozen savouries you can
            trust for family dinners, Ramadan, Eid, and celebrations.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Button to="/collections/all" variant="primary">
              Shop Now
            </Button>
            <Button to="/wholesale" variant="outline">
              Wholesale
            </Button>
          </div>
        </FadeIn>
      </section>
    </div>
  );
}
