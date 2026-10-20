import Image from "next/image";
import { WhatsAppLink } from "@/components/WhatsAppLink";
import { BRAND } from "@/lib/brand";
import { WHOLESALE_URL } from "@/lib/site";

export function Hero() {
  return (
    <section id="top" className="bg-brand" aria-label="Hero">
      <div className="container-premium grid items-start gap-6 pb-8 pt-[calc(4rem+0.75rem+env(safe-area-inset-top))] sm:gap-8 sm:pb-12 sm:pt-[calc(4rem+1.25rem+env(safe-area-inset-top))] lg:grid-cols-2 lg:items-center lg:gap-14 lg:pb-16 lg:pt-[calc(4.25rem+1.5rem+env(safe-area-inset-top))]">
        <div>
          <p className="eyebrow eyebrow-on-dark mb-3 sm:mb-4">{BRAND.name}</p>
          <h1 className="max-w-xl text-[1.85rem] leading-[1.05] text-brand-inverse sm:text-5xl sm:leading-[1.08] lg:text-6xl">
            Handcrafted
            <br />
            Frozen Savouries
          </h1>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-brand-inverse/80 sm:mt-5 sm:text-base">
            Frozen samoosas, pies, spring rolls, and more, made with halaal
            ingredients. Made to order.
            Collect in Kenilworth, Cape Town.
          </p>
          <div className="mt-6 grid gap-3 sm:mt-8 sm:grid-cols-2">
            <div className="flex flex-col gap-2 border border-white/20 p-3">
              <p className="text-[0.7rem] font-medium uppercase tracking-[0.16em] text-accent">
                Retail
              </p>
              <p className="text-sm leading-snug text-brand-inverse/80">
                Pack prices on this page.
              </p>
              <WhatsAppLink id="hero-order" className="btn-primary mt-auto">
                Retail order
              </WhatsAppLink>
            </div>
            <div className="flex flex-col gap-2 border border-white/20 p-3">
              <p className="text-[0.7rem] font-medium uppercase tracking-[0.16em] text-accent">
                Wholesale
              </p>
              <p className="text-sm leading-snug text-brand-inverse/80">
                Catering, events, and monthly orders.
              </p>
              <WhatsAppLink href={WHOLESALE_URL} className="btn-secondary mt-auto">
                Wholesale enquiry
              </WhatsAppLink>
            </div>
          </div>
        </div>

        <div className="relative aspect-square overflow-hidden bg-[#1a1a1a]">
          <Image
            src="/images/catalogue/samoosas.jpg"
            alt="Samoosas"
            fill
            priority
            sizes="(min-width: 1024px) 46vw, 100vw"
            className="object-cover object-center"
          />
        </div>
      </div>
    </section>
  );
}
