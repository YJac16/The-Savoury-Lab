"use client";

import { useEffect, useState } from "react";
import { WhatsAppLink } from "@/components/WhatsAppLink";

export function StickyOrderBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const heroOrder = document.getElementById("hero-order");
    if (!heroOrder) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(!entry.isIntersecting);
      },
      { threshold: 0.25 },
    );
    observer.observe(heroOrder);
    return () => observer.disconnect();
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 bg-accent pb-[env(safe-area-inset-bottom)] print:hidden md:hidden">
      <WhatsAppLink className="btn-primary w-full shadow-none">
        Retail order
      </WhatsAppLink>
    </div>
  );
}
