import Image from "next/image";
import { WhatsAppLink } from "@/components/WhatsAppLink";
import { BEST_SELLER_PHOTO, BEST_SELLERS } from "@/lib/brand";
import { orderUrl, type OrderDetails } from "@/lib/site";

function sellerOrder(product: (typeof BEST_SELLERS)[number]) {
  const [productName, filling] = product.orderName.split(" — ");
  const details: OrderDetails = {
    product: productName,
    filling,
    pack: product.pack,
    price: product.priceFrom,
  };
  return orderUrl(details);
}

export function BestSellers() {
  return (
    <section className="section-pad bg-brand-inverse" aria-label="Best sellers">
      <div className="container-premium">
        <div className="mb-8 max-w-2xl md:mb-12">
          <p className="eyebrow mb-3">Popular picks</p>
          <h2 className="text-balance text-3xl sm:text-4xl">Best sellers</h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-ink-muted">
            Samoosa pack of 25. Choose a filling to order. Larger packs are in
            the menu.
          </p>
        </div>

        <div className="grid items-start gap-8 lg:grid-cols-2 lg:gap-12">
          <a
            href={BEST_SELLER_PHOTO.href}
            className="block overflow-hidden bg-neutral focus-visible:outline-offset-4"
          >
            <div className="relative aspect-square overflow-hidden bg-neutral-muted">
              <Image
                src={BEST_SELLER_PHOTO.src}
                alt=""
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover object-center"
              />
            </div>
            <p className="px-1 py-3 text-sm font-medium text-brand">
              View all samoosa prices
              <span className="sr-only">. Photo of samoosas.</span>
            </p>
          </a>

          <ul className="divide-y divide-neutral-muted border-y border-neutral-muted">
            {BEST_SELLERS.map((product) => (
              <li key={product.orderName} className="flex flex-col gap-3 py-4">
                <div className="min-w-0">
                  <h3 className="font-display text-lg leading-snug text-brand">
                    {product.title}
                  </h3>
                  <p className="mt-1 text-sm text-ink-muted">
                    Pack of {product.pack} · {product.priceFrom}
                  </p>
                </div>
                <WhatsAppLink
                  href={sellerOrder(product)}
                  className="btn-outline btn-wrap w-full sm:w-fit"
                >
                  Order this pack on WhatsApp
                </WhatsAppLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
