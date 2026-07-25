import { storeConfig } from "@/lib/store";
import type { Product } from "@/types";

/**
 * Yoco payment-link helpers.
 *
 * When you create payment links in Yoco, either:
 * 1. Set NEXT_PUBLIC_YOCO_PAYMENT_LINK in Vercel for a store-wide checkout link, or
 * 2. Add `yocoPaymentLink` on individual products in `src/lib/products.ts`.
 *
 * Until a link is set, checkout falls back to WhatsApp ordering.
 */
export function resolveYocoPaymentLink(
  productsInOrder: Product[] = [],
): string | undefined {
  const envLink = process.env.NEXT_PUBLIC_YOCO_PAYMENT_LINK?.trim();
  if (envLink) return envLink;

  const storeLink = storeConfig.yocoPaymentLink?.trim();
  if (storeLink) return storeLink;

  // If every line shares the same product-level link, use it
  const links = productsInOrder
    .map((p) => p.yocoPaymentLink?.trim())
    .filter((l): l is string => Boolean(l));

  if (links.length && links.every((l) => l === links[0])) {
    return links[0];
  }

  return undefined;
}

export function isYocoConfigured(): boolean {
  return Boolean(resolveYocoPaymentLink());
}
