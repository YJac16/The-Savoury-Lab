export const SITE_NAME = "The Savoury Lab";
export const TAGLINE = "Handcrafted Savouries · Made to Order";

export const WHATSAPP_E164 = "27656632215";
export const WHATSAPP_DISPLAY = "065 663 2215";
export const WHATSAPP_BASE = `https://wa.me/${WHATSAPP_E164}`;

export const INSTAGRAM_HANDLE = "the_savoury_lab";
export const INSTAGRAM_URL = `https://www.instagram.com/${INSTAGRAM_HANDLE}/`;

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

export const BILS_URL = "https://bils.co.za/";
export const BILS_INSTAGRAM_URL = "https://www.instagram.com/brother_in_laws_/";
