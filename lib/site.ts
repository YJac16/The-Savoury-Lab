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

export type OrderDetails = {
  product: string;
  filling?: string;
  pack: string;
  price: string;
};

export function orderMessage({ product, filling, pack, price }: OrderDetails) {
  const lines = ["Hi The Savoury Lab, I'd like to order:", `Product: ${product}`];
  if (filling) lines.push(`Filling: ${filling}`);
  lines.push(`Pack size: ${pack}`);
  lines.push(`Price: ${price}`);
  return lines.join("\n");
}

export function orderUrl(details: OrderDetails) {
  return whatsappUrl(orderMessage(details));
}

export const GENERAL_ORDER_URL = whatsappUrl(
  "Hi The Savoury Lab, I'd like to place an order.",
);
export const WHOLESALE_URL = whatsappUrl(
  "Hi The Savoury Lab, I'd like to enquire about a wholesale order.",
);

export const BILS_URL = "https://bils.co.za/";
export const BILS_INSTAGRAM_URL = "https://www.instagram.com/brother_in_laws_/";
