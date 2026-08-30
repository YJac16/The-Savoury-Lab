import { BRAND } from "@/lib/brand";
import { WhatsAppLink } from "@/components/WhatsAppLink";

export function WholesaleCta() {
  return (
    <section
      id="wholesale"
      className="relative scroll-mt-24 overflow-hidden bg-brand text-brand-inverse"
      aria-label="Wholesale"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        aria-hidden="true"
        style={{
          backgroundImage:
            "radial-gradient(circle at 80% 20%, rgba(200,150,62,0.35), transparent 45%)",
        }}
      />
      <div className="container-premium section-pad relative">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow mb-4 text-accent-soft">Wholesale</p>
          <h2 className="text-balance text-3xl sm:text-4xl md:text-5xl">
            Catering, events &amp; consistent monthly orders
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-brand-inverse/75 sm:text-lg">
            Partner with {BRAND.name} for mosques, schools, corporate functions,
            and celebrations. Dedicated service, reliable quality, Halaal
            certified. Collect in Kenilworth — arrange bulk orders on WhatsApp.
          </p>
          <div className="mt-10">
            <WhatsAppLink href={BRAND.contact.wholesaleUrl} className="btn-secondary">
              Enquire on WhatsApp
            </WhatsAppLink>
          </div>
        </div>
      </div>
    </section>
  );
}
