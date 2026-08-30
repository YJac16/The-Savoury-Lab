import Image from "next/image";
import { BEST_SELLERS } from "@/lib/brand";
import { orderUrl } from "@/lib/site";
import { WhatsAppLink } from "@/components/WhatsAppLink";

export function BestSellers() {
  return (
    <section className="section-pad bg-brand-inverse" aria-label="Best sellers">
      <div className="container-premium">
        <div className="mb-12 max-w-2xl">
          <p className="eyebrow mb-3">Popular picks</p>
          <h2 className="text-balance text-3xl sm:text-4xl">Best sellers</h2>
        </div>

        <ul className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {BEST_SELLERS.map((product, index) => (
            <li key={product.orderName}>
              <article className="group flex h-full flex-col">
                <a
                  href={`#samoosas`}
                  className="mb-4 block overflow-hidden bg-neutral focus-visible:outline-offset-4"
                >
                  <div className="relative aspect-square overflow-hidden bg-neutral-muted">
                    <Image
                      src={product.image}
                      alt={product.title}
                      fill
                      sizes="(min-width: 1280px) 300px, (min-width: 768px) 45vw, 100vw"
                      className="object-cover transition-media group-hover:scale-105"
                      priority={index < 4}
                    />
                  </div>
                </a>

                <div className="flex flex-1 flex-col gap-3">
                  <a
                    href={`#samoosas`}
                    className="font-display text-lg leading-snug text-brand transition-colors hover:text-accent"
                  >
                    {product.title}
                  </a>

                  <p className="text-sm text-ink-muted">
                    From {product.priceFrom}
                    <span className="sr-only">
                      {` for pack of ${product.pack}`}
                    </span>
                  </p>

                  <WhatsAppLink
                    href={orderUrl(product.orderName, product.pack)}
                    className="btn-outline mt-auto w-full"
                  >
                    Order on WhatsApp
                  </WhatsAppLink>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
