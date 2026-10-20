"use client";

import Image from "next/image";
import { useState } from "react";
import { CarouselDetailPlate } from "@/components/CarouselDetailPlate";
import { SnapCoverflow } from "@/components/SnapCoverflow";
import { WhatsAppLink } from "@/components/WhatsAppLink";
import { BEST_SELLERS } from "@/lib/brand";
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

function BestSellerCard({
  label,
  image,
  href,
}: {
  label: string;
  image: string;
  href: string;
}) {
  return (
    <WhatsAppLink
      href={href}
      ariaLabel={label}
      className="block overflow-hidden rounded-sm bg-neutral shadow-soft focus-visible:outline-offset-4"
    >
      <div className="relative aspect-square overflow-hidden bg-neutral-muted">
        <Image
          src={image}
          alt=""
          fill
          sizes="78vw"
          className="object-cover object-center"
          draggable={false}
        />
      </div>
    </WhatsAppLink>
  );
}

export function BestSellers() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = BEST_SELLERS[activeIndex] ?? BEST_SELLERS[0];

  return (
    <section className="section-pad bg-brand-inverse" aria-label="Best sellers">
      <div className="container-premium">
        <div className="mb-8 max-w-2xl md:mb-12">
          <p className="eyebrow mb-3">Popular picks</p>
          <h2 className="text-balance text-3xl sm:text-4xl">Best sellers</h2>
        </div>

        <div className="md:hidden">
          <SnapCoverflow
            ariaLabel="Best sellers"
            onActiveIndexChange={setActiveIndex}
          >
            {BEST_SELLERS.map((product) => (
              <BestSellerCard
                key={product.orderName}
                label={`Order ${product.title}, pack of ${product.pack}, ${product.priceFrom}`}
                image={product.image}
                href={sellerOrder(product)}
              />
            ))}
          </SnapCoverflow>

          {active ? (
            <CarouselDetailPlate
              title={active.title}
              description="All items sold frozen."
              meta={
                <p>
                  Pack of {active.pack} · {active.priceFrom}
                </p>
              }
              actions={
                <WhatsAppLink
                  href={sellerOrder(active)}
                  className="btn-primary btn-wrap w-full"
                >
                  Order this pack on WhatsApp
                </WhatsAppLink>
              }
            />
          ) : null}
        </div>

        <ul className="hidden grid-cols-2 gap-8 md:grid lg:grid-cols-4">
          {BEST_SELLERS.map((product, index) => (
            <li key={product.orderName}>
              <article className="flex h-full flex-col">
                <WhatsAppLink
                  href={sellerOrder(product)}
                  ariaLabel={`Order ${product.title}, pack of ${product.pack}, ${product.priceFrom}`}
                  className="mb-4 block overflow-hidden bg-neutral focus-visible:outline-offset-4"
                >
                  <div className="relative aspect-square overflow-hidden bg-neutral-muted">
                    <Image
                      src={product.image}
                      alt=""
                      fill
                      sizes="(min-width: 1280px) 300px, (min-width: 768px) 45vw, 100vw"
                      className="object-cover object-center transition-media media-zoom-hover"
                      priority={index < 4}
                    />
                  </div>
                </WhatsAppLink>

                <div className="flex flex-1 flex-col gap-3">
                  <h3 className="font-display text-lg leading-snug text-brand">
                    {product.title}
                  </h3>
                  <p className="text-sm text-ink-muted">
                    Pack of {product.pack} · {product.priceFrom}
                  </p>
                  <WhatsAppLink
                    href={sellerOrder(product)}
                    className="btn-outline btn-wrap mt-auto w-full"
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
