"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { NAV_LINKS } from "@/lib/brand";
import { SITE_NAME } from "@/lib/site";
import { WhatsAppLink } from "@/components/WhatsAppLink";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 48);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solid = scrolled;
  const lightText = !scrolled;

  return (
    <header
      className={`transition-header fixed inset-x-0 top-0 z-40 ${
        solid
          ? "border-b border-neutral-muted/80 bg-brand-inverse/95 shadow-soft backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="container-premium flex h-16 items-center gap-4 lg:h-[4.25rem]">
        <Link href="#top" className="shrink-0" aria-label={`${SITE_NAME} — home`}>
          <Image
            src={lightText ? "/logo-inverted.png" : "/logo-nav.png"}
            alt={SITE_NAME}
            width={160}
            height={48}
            priority
            className="h-9 w-auto sm:h-10"
          />
        </Link>

        <nav
          className="mx-auto hidden items-center gap-8 lg:flex"
          aria-label="Primary"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`link-underline font-sans text-[0.7rem] font-medium uppercase tracking-[0.16em] transition-colors duration-300 ${
                lightText
                  ? "text-brand-inverse/90 hover:text-accent-soft"
                  : "text-brand hover:text-accent"
              }`}
            >
              {link.title}
            </a>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-3">
          <WhatsAppLink
            className={`hidden min-h-10 items-center justify-center px-4 text-[0.65rem] font-medium uppercase tracking-[0.16em] sm:inline-flex ${
              lightText
                ? "border border-brand-inverse/40 text-brand-inverse hover:border-accent hover:bg-accent hover:text-brand"
                : "btn-primary py-0"
            }`}
          >
            Order on WhatsApp
          </WhatsAppLink>
          <a
            href="#menu"
            className={`link-underline font-sans text-[0.7rem] font-medium uppercase tracking-[0.16em] lg:hidden ${
              lightText
                ? "text-brand-inverse/90 hover:text-accent-soft"
                : "text-brand hover:text-accent"
            }`}
          >
            Menu
          </a>
        </div>
      </div>
    </header>
  );
}
