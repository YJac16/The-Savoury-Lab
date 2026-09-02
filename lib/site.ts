export const SITE_URL = "https://the-savoury-lab.vercel.app";
export const SITE_NAME = "The Savoury Lab";
export const TAGLINE = "Handcrafted Savouries · Made to Order";

export const WHATSAPP_E164 = "27656632215";
export const WHATSAPP_DISPLAY = "065 663 2215";
export const WHATSAPP_BASE = `https://wa.me/${WHATSAPP_E164}`;
export const PHONE_TEL = "0656632215";

export const INSTAGRAM_HANDLE = "the_savoury_lab";
export const INSTAGRAM_URL = `https://www.instagram.com/${INSTAGRAM_HANDLE}/`;

export const COLLECT_ADDRESS = "52 Goldbourne Road, Kenilworth";
export const COLLECT_ADDRESS_FULL =
  "52 Goldbourne Road, Kenilworth, Cape Town, South Africa";
export const COLLECT_LAT = -33.9978658;
export const COLLECT_LON = 18.4769187;

export function whatsappUrl(message: string) {
  return `${WHATSAPP_BASE}?text=${encodeURIComponent(message)}`;
}

export function orderMessage(product: string, pack?: string) {
  if (pack) {
    return `Hi The Savoury Lab, I'd like to order ${product} — ${pack}.`;
  }
  return `Hi The Savoury Lab, I'd like to order ${product}.`;
}

export function orderUrl(product: string, pack?: string) {
  return whatsappUrl(orderMessage(product, pack));
}

export function categoryOrderUrl(categoryTitle: string) {
  return whatsappUrl(`Hi The Savoury Lab, I'd like to order ${categoryTitle}.`);
}

export const GENERAL_ORDER_URL = whatsappUrl(
  "Hi The Savoury Lab, I'd like to place an order.",
);
export const WHOLESALE_URL = whatsappUrl(
  "Hi The Savoury Lab, I'd like to enquire about a wholesale order.",
);
