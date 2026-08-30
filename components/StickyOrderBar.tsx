"use client";

import { useEffect, useState } from "react";
import { WhatsAppLink } from "@/components/WhatsAppLink";

export function StickyOrderBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > window.innerHeight * 0.6);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-neutral-muted/80 bg-brand-inverse/95 p-3 shadow-soft backdrop-blur-md print:hidden sm:hidden">
      <WhatsAppLink className="btn-primary mx-auto w-full max-w-lg">
        Order on WhatsApp
      </WhatsAppLink>
    </div>
  );
}
