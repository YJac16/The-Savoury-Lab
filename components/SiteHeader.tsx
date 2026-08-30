"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useId, useState } from "react";
import { NAV_LINKS } from "@/lib/brand";
import { SITE_NAME } from "@/lib/site";

function navLinkClass(lightText: boolean) {
  return `flex min-h-11 items-center font-sans text-[0.7rem] font-medium uppercase tracking-[0.16em] transition-colors duration-300 ${
    lightText
      ? "text-brand-inverse/90 hover:text-accent-soft focus-visible:text-accent-soft"
      : "text-brand hover:text-accent focus-visible:text-accent"
  }`;
}

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuId = useId();

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 48);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const solid = scrolled || menuOpen;
  const lightText = !scrolled && !menuOpen;

  function closeMenu() {
    setMenuOpen(false);
  }

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
          className="mx-auto hidden items-center gap-8 md:flex"
          aria-label="Primary"
        >
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className={navLinkClass(lightText)}>
              {link.title}
            </a>
          ))}
        </nav>

        <button
          type="button"
          className={`ml-auto flex h-11 w-11 items-center justify-center md:hidden ${
            lightText ? "text-brand-inverse" : "text-brand"
          }`}
          aria-expanded={menuOpen}
          aria-controls={menuId}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="h-6 w-6"
            aria-hidden="true"
          >
            {menuOpen ? (
              <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </div>

      {menuOpen ? (
        <nav
          id={menuId}
          className="border-t border-neutral-muted bg-brand-inverse md:hidden"
          aria-label="Mobile menu"
        >
          <ul className="container-premium flex flex-col py-2">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`${navLinkClass(false)} border-b border-neutral-muted/60 px-1 py-3 last:border-b-0`}
                  onClick={closeMenu}
                >
                  {link.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
