import type { StoreConfig } from "@/types";

/**
 * Brand + contact config for The Savoury Lab.
 * Set YOCO_PAYMENT_LINK (or NEXT_PUBLIC_YOCO_PAYMENT_LINK) in Vercel env
 * when you have your Yoco payment link ready.
 */
export const storeConfig: StoreConfig = {
  name: "The Savoury Lab",
  tagline: "Handcrafted Savouries · Made to Order",
  location: "Kenilworth",
  phone: "0656632215",
  phoneDisplay: "065 663 2215",
  whatsapp: "27656632215",
  instagram: "the_savoury_lab",
  instagramUrl: "https://www.instagram.com/the_savoury_lab/",
  halaal: true,
  yocoPaymentLink: process.env.NEXT_PUBLIC_YOCO_PAYMENT_LINK || "",
  notes: [
    "All items are sold frozen.",
    "Additional charges apply for baked and fried goods.",
    "Prices subject to change.",
  ],
};

export function getWhatsAppOrderUrl(message: string): string {
  return `https://wa.me/${storeConfig.whatsapp}?text=${encodeURIComponent(message)}`;
}
