import Image from "next/image";
import { ExtrasSection, MenuSection } from "@/components/MenuSection";
import { WhatsAppLink } from "@/components/WhatsAppLink";
import { EXTRAS, MENU_SECTIONS } from "@/lib/menu";
import {
  GENERAL_ORDER_URL,
  INSTAGRAM_HANDLE,
  INSTAGRAM_URL,
  SITE_NAME,
  TAGLINE,
  WHATSAPP_DISPLAY,
  WHOLESALE_URL,
} from "@/lib/site";

const NOTES = [
  "Halaal",
  "Kenilworth collect",
  "All items sold frozen",
  "Additional charges apply for baked and fried goods",
  "Prices subject to change",
];

export default function HomePage() {
  return (
    <div className="flex min-h-svh flex-col pb-24">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <header className="sticky top-0 z-30 border-b border-ink/15 bg-paper/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-4 px-4 py-3">
          <a href="#top" className="shrink-0" aria-label={`${SITE_NAME} — top`}>
            <Image
              src="/logo.png"
              alt={SITE_NAME}
              width={441}
              height={279}
              priority
              className="h-12 w-auto sm:h-14"
            />
          </a>
          <nav aria-label="Primary" className="flex items-center gap-4 text-xs font-medium uppercase tracking-[0.16em]">
            <a href="#menu" className="hover:underline">
              Menu
            </a>
            <WhatsAppLink className="hover:underline">Order</WhatsAppLink>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              Instagram
            </a>
          </nav>
        </div>
      </header>

      <main id="main-content" className="mx-auto w-full max-w-3xl flex-1 px-4">
        <section
          id="top"
          className="flex flex-col items-center pb-10 pt-10 text-center sm:pt-14"
        >
          <Image
            src="/logo.png"
            alt={SITE_NAME}
            width={441}
            height={279}
            priority
            className="h-auto w-[220px] sm:w-[280px]"
          />
          <p className="mt-6 text-sm uppercase tracking-[0.22em] text-mute sm:text-base">
            {TAGLINE}
          </p>
          <p className="mt-4 max-w-md text-sm text-mute">
            All items sold frozen. Halaal. Collect in Kenilworth.
          </p>
          <div className="mt-8 flex w-full max-w-sm flex-col gap-3 sm:max-w-none sm:flex-row sm:justify-center">
            <WhatsAppLink className="inline-flex min-h-12 items-center justify-center bg-ink px-6 text-sm font-medium uppercase tracking-[0.16em] text-paper hover:bg-ink/90">
              Order on WhatsApp
            </WhatsAppLink>
            <a
              href="#menu"
              className="inline-flex min-h-12 items-center justify-center border-2 border-ink px-6 text-sm font-medium uppercase tracking-[0.16em] hover:bg-stripe"
            >
              View menu
            </a>
          </div>
        </section>

        <section
          aria-label="Order details"
          className="mb-10 grid gap-3 border-y-2 border-ink py-4 text-center text-xs uppercase tracking-[0.14em] sm:grid-cols-3 sm:text-[0.7rem]"
        >
          <p>
            WhatsApp{" "}
            <WhatsAppLink className="font-semibold underline-offset-4 hover:underline">
              {WHATSAPP_DISPLAY}
            </WhatsAppLink>
          </p>
          <p>Based in Kenilworth</p>
          <p>Halaal</p>
        </section>

        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mb-10 flex min-h-12 items-center justify-center bg-ink px-4 text-center text-xs font-medium uppercase tracking-[0.16em] text-paper hover:bg-ink/90"
        >
          Follow us on Instagram | @{INSTAGRAM_HANDLE}
        </a>

        <section id="menu" className="scroll-mt-24 space-y-10">
          <div className="text-center">
            <h2 className="text-2xl font-semibold tracking-wide uppercase">
              Menu
            </h2>
            <p className="mt-2 text-sm text-mute">
              Tap a price to order that pack on WhatsApp.
            </p>
          </div>
          {MENU_SECTIONS.map((section) => (
            <MenuSection key={section.id} section={section} />
          ))}
          <ExtrasSection extras={EXTRAS} />
        </section>

        <section
          id="wholesale"
          className="mt-12 scroll-mt-24 border-2 border-ink px-5 py-8 text-center"
        >
          <h2 className="text-lg font-semibold tracking-wide uppercase">
            Wholesale
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-mute">
            Bulk and regular orders are arranged on WhatsApp — there is no
            wholesale portal or online checkout.
          </p>
          <WhatsAppLink
            href={WHOLESALE_URL}
            className="mt-6 inline-flex min-h-12 items-center justify-center border-2 border-ink px-6 text-sm font-medium uppercase tracking-[0.16em] hover:bg-stripe"
          >
            Enquire on WhatsApp
          </WhatsAppLink>
        </section>

        <section className="mt-12 pb-6">
          <h2 className="sr-only">Notes</h2>
          <ul className="space-y-2 text-center text-sm text-mute">
            {NOTES.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
        </section>
      </main>

      <footer className="mx-auto mt-auto w-full max-w-3xl border-t-2 border-ink px-4 py-6 text-center text-xs text-mute">
        <p className="font-medium uppercase tracking-[0.16em] text-ink">
          {SITE_NAME}
        </p>
        <p className="mt-2">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            @{INSTAGRAM_HANDLE}
          </a>
          {" · "}
          <WhatsAppLink className="hover:underline">{WHATSAPP_DISPLAY}</WhatsAppLink>
        </p>
        <p className="mt-2">Prices subject to change</p>
      </footer>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t-2 border-ink bg-paper p-3 print:hidden">
        <WhatsAppLink
          href={GENERAL_ORDER_URL}
          className="mx-auto flex min-h-12 max-w-3xl items-center justify-center bg-ink text-sm font-medium uppercase tracking-[0.16em] text-paper hover:bg-ink/90"
        >
          Order on WhatsApp
        </WhatsAppLink>
      </div>
    </div>
  );
}
