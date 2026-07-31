import {BRAND} from '~/lib/brand';

export function whatsappOrderUrl(product: {
  title: string;
  packPrices?: {label: string}[];
}): string {
  const packs =
    product.packPrices?.map((pack) => pack.label).join(', ') ?? '';
  const message = [
    `Hi ${BRAND.name}! I'd like to order:`,
    product.title,
    packs ? `Pack options: ${packs}` : null,
  ]
    .filter(Boolean)
    .join('\n');

  return `https://wa.me/${BRAND.contact.whatsapp}?text=${encodeURIComponent(message)}`;
}
