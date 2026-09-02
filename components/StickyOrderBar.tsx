"use client";

import { useEffect, useState } from "react";
import { WhatsAppLink } from "@/components/WhatsAppLink";

export function StickyOrderBar() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("top");
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => setShow(!entry.isIntersecting),
      { threshold: 0 },
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-neutral-muted/80 bg-brand-inverse/95 p-3 shadow-soft backdrop-blur-md print:hidden md:hidden pb-[max(0.75rem,env(safe-area-inset-bottom))]">
      <WhatsAppLink className="btn-primary mx-auto w-full max-w-lg min-h-11">
        Order on WhatsApp
      </WhatsAppLink>
    </div>
  );
}
