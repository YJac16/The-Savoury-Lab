import { BestSellers } from "@/components/BestSellers";
import { CollectMap } from "@/components/CollectMap";
import { ExtrasSection, MenuSection } from "@/components/MenuSection";
import { FaqAccordion } from "@/components/FaqAccordion";
import { FeaturedCategories } from "@/components/FeaturedCategories";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { InstagramFeed } from "@/components/InstagramFeed";
import { SiteHeader } from "@/components/SiteHeader";
import { StickyOrderBar } from "@/components/StickyOrderBar";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { WhatsAppLink } from "@/components/WhatsAppLink";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { WholesaleCta } from "@/components/WholesaleCta";
import { BRAND, MENU_NOTES } from "@/lib/brand";
import { EXTRAS, MENU_SECTIONS } from "@/lib/menu";
import {
  COLLECT_ADDRESS,
  INSTAGRAM_HANDLE,
  INSTAGRAM_URL,
  PHONE_TEL,
  WHATSAPP_DISPLAY,
} from "@/lib/site";

export default function HomePage() {
  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <SiteHeader />
      <Hero />

      <main id="main-content">
        <FeaturedCategories />
        <BestSellers />

        <section
          id="menu"
          className="section-pad scroll-mt-24 bg-brand-inverse"
          aria-label="Menu"
        >
          <div className="container-premium">
            <div className="mb-12 max-w-2xl">
              <p className="eyebrow mb-3">Menu</p>
              <h2 className="text-balance text-3xl sm:text-4xl">
                Prices &amp; pack sizes
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-ink-muted">
                Tap a price to order that pack on WhatsApp. Halaal. Kenilworth
                collect. All items sold frozen.
              </p>
            </div>

            <ul className="mb-10 flex flex-wrap gap-x-6 gap-y-2 text-xs uppercase tracking-[0.14em] text-ink-muted">
              {MENU_NOTES.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>

            <div className="space-y-12">
              {MENU_SECTIONS.map((section) => (
                <MenuSection key={section.id} section={section} />
              ))}
              <ExtrasSection extras={EXTRAS} />
            </div>
          </div>
        </section>

        <WhyChooseUs />
        <HowItWorks />
        <WholesaleCta />
        <InstagramFeed />

        <section
          id="faq"
          className="section-pad scroll-mt-24 bg-brand-inverse"
          aria-label="FAQ"
        >
          <div className="container-premium">
            <div className="mb-10 max-w-2xl">
              <p className="eyebrow mb-3">FAQ</p>
              <h2 className="text-balance text-3xl sm:text-4xl">
                Common questions
              </h2>
            </div>
            <FaqAccordion />
          </div>
        </section>
      </main>

      <footer
        id="contact"
        className="scroll-mt-24 border-t border-neutral-muted bg-neutral px-4 py-10"
      >
        <div className="container-premium mx-auto max-w-lg text-center">
          <p className="eyebrow mb-3">Contact</p>
          <p className="font-display text-lg">{BRAND.name}</p>
          <p className="mt-3 text-sm text-ink-muted">
            Halaal · Frozen · Kenilworth collect
          </p>
          <p className="mt-4 text-sm">
            <a
              href={`tel:${PHONE_TEL}`}
              className="link-underline font-medium text-brand hover:text-accent"
            >
              {WHATSAPP_DISPLAY}
            </a>
            {" · "}
            <WhatsAppLink className="link-underline font-medium text-brand hover:text-accent">
              WhatsApp
            </WhatsAppLink>
            {" · "}
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline font-medium text-brand hover:text-accent"
            >
              @{INSTAGRAM_HANDLE}
            </a>
          </p>
          <p className="mt-4 text-sm text-ink-muted">
            Collect: {COLLECT_ADDRESS}
          </p>
          <CollectMap />
          <p className="mt-6 text-xs text-ink-muted">Prices subject to change</p>
        </div>
      </footer>

      <StickyOrderBar />
      <WhatsAppFloat />
    </>
  );
}
