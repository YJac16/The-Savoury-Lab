import Image from "next/image";
import { BRAND } from "@/lib/brand";
import { WHOLESALE_URL } from "@/lib/site";
import { WhatsAppLink } from "@/components/WhatsAppLink";

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-svh items-end overflow-hidden bg-[#111111]"
      aria-label="Hero"
    >
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <Image
          src="/images/catalogue/samoosas.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-35"
        />
        <div className="surface-hero-scrim absolute inset-0" />
      </div>

      <div className="container-premium w-full pb-20 pt-36 sm:pb-24 sm:pt-40">
        <p className="eyebrow mb-5 text-accent">{BRAND.name}</p>
        <h1 className="max-w-3xl text-4xl leading-[1.08] text-brand-inverse sm:text-5xl md:text-6xl lg:text-7xl">
          Handcrafted
          <br />
          Frozen Savouries
        </h1>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-brand-inverse/80 sm:text-lg">
          Made with quality ingredients. Prepared fresh. Frozen for your
          convenience.
        </p>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
          <WhatsAppLink className="btn-primary">Order on WhatsApp</WhatsAppLink>
          <WhatsAppLink href={WHOLESALE_URL} className="btn-secondary">
            Wholesale orders
          </WhatsAppLink>
        </div>
      </div>
    </section>
  );
}
