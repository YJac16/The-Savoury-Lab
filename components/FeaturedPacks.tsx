import Image from "next/image";
import { WhatsAppLink } from "@/components/WhatsAppLink";
import { getFeaturedProducts } from "@/lib/featured";
import { orderUrl } from "@/lib/site";

export function FeaturedPacks() {
  const products = getFeaturedProducts();

  return (
    <section
      id="featured"
      className="section-pad scroll-mt-24 bg-brand-inverse"
      aria-label="Featured packs"
    >
      <div className="container-premium">
        <div className="mb-8 max-w-2xl md:mb-12">
          <p className="eyebrow mb-3">Retail packs</p>
          <h2 className="text-balance text-3xl sm:text-4xl">Order a pack</h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-ink-muted">
            Filling, pack size, and price from the menu. Tap to order that pack
            on WhatsApp. Halaal. Kenilworth collect. All items sold frozen.
          </p>
        </div>

        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {products.map((product) => (
            <li key={product.orderName}>
              <article className="flex h-full flex-col border border-neutral-muted bg-brand-inverse shadow-soft">
                <div className="relative aspect-square overflow-hidden bg-neutral-muted">
                  <Image
                    src={product.image}
                    alt={product.imageAlt}
                    fill
                    sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                    className="object-cover object-center"
                  />
                </div>
                <div className="flex flex-1 flex-col gap-2 p-4 sm:p-5">
                  <p className="eyebrow">{product.category}</p>
                  <h3 className="font-display text-2xl leading-tight text-brand">
                    {product.filling}
                  </h3>
                  <p className="text-sm text-ink-muted">Pack of {product.qty}</p>
                  <p className="text-base font-medium tabular-nums text-brand">
                    {product.price}
                  </p>
                  <WhatsAppLink
                    href={orderUrl({
                      product: product.category,
                      filling: product.filling,
                      pack: product.qty,
                      price: product.price,
                    })}
                    className="btn-primary btn-wrap mt-auto w-full"
                  >
                    Order this pack on WhatsApp
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
