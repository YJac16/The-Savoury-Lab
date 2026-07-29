import {BRAND} from '~/lib/brand';
import {Button} from '~/components/ui/Button';
import {FadeIn} from '~/components/ui/FadeIn';

type WholesaleCtaProps = {
  className?: string;
};

export function WholesaleCta({className = ''}: WholesaleCtaProps) {
  return (
    <section
      className={`relative overflow-hidden bg-brand text-brand-inverse ${className}`.trim()}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        aria-hidden="true"
        style={{
          backgroundImage:
            'radial-gradient(circle at 80% 20%, rgba(199,154,82,0.35), transparent 45%)',
        }}
      />
      <div className="container-premium section-pad relative">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <p className="eyebrow mb-4 text-accent-soft">Wholesale</p>
          <h2 className="text-balance text-3xl sm:text-4xl md:text-5xl">
            Catering, events &amp; consistent monthly orders
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-brand-inverse/75 sm:text-lg">
            Partner with {BRAND.name} for mosques, schools, corporate functions,
            and celebrations across Cape Town. Dedicated service, reliable
            quality, Halaal certified.
          </p>
          <div className="mt-10">
            <Button to="/wholesale" variant="secondary">
              Wholesale Enquiries
            </Button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
