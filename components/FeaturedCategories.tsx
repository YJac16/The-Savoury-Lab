"use client";

import Image from "next/image";
import { useState } from "react";
import { CarouselDetailPlate } from "@/components/CarouselDetailPlate";
import { SnapCoverflow } from "@/components/SnapCoverflow";
import { WhatsAppLink } from "@/components/WhatsAppLink";
import { CATEGORIES } from "@/lib/brand";
import { categoryOrderUrl } from "@/lib/site";

function CategoryCard({
  title,
  description,
  image,
  orderUrl,
}: {
  title: string;
  description: string;
  image: string;
  orderUrl: string;
}) {
  return (
    <WhatsAppLink
      href={orderUrl}
      className="block overflow-hidden rounded-sm bg-neutral shadow-soft focus-visible:outline-offset-4"
    >
      <div className="relative aspect-card overflow-hidden bg-neutral-muted">
        <Image
          src={image}
          alt={title}
          fill
          sizes="78vw"
          className="object-cover"
          draggable={false}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand/75 via-brand/15 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-5">
          <h3 className="font-display text-xl text-brand-inverse">{title}</h3>
          <p className="mt-1 text-sm text-brand-inverse/80">{description}</p>
        </div>
      </div>
    </WhatsAppLink>
  );
}

export function FeaturedCategories() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = CATEGORIES[activeIndex] ?? CATEGORIES[0];

  return (
    <section className="section-pad bg-brand-inverse" aria-label="Collections">
      <div className="container-premium">
        <div className="mb-8 max-w-2xl md:mb-12">
          <p className="eyebrow mb-3">Collections</p>
          <h2 className="text-balance text-3xl sm:text-4xl">
            Explore our savouries
          </h2>
        </div>

        <div className="md:hidden">
          <SnapCoverflow
            ariaLabel="Savouries collections"
            onActiveIndexChange={setActiveIndex}
          >
            {CATEGORIES.map((category) => (
              <CategoryCard
                key={category.handle}
                title={category.title}
                description={category.description}
                image={category.image}
                orderUrl={categoryOrderUrl(category.title)}
              />
            ))}
          </SnapCoverflow>

          {active ? (
            <CarouselDetailPlate
              title={active.title}
              description={active.description}
              meta={<p>Tap a card or order below on WhatsApp.</p>}
              actions={
                <>
                  <a href={`#${active.menuAnchor}`} className="btn-outline w-full">
                    View menu
                  </a>
                  <WhatsAppLink
                    href={categoryOrderUrl(active.title)}
                    className="btn-primary w-full"
                  >
                    Order on WhatsApp
                  </WhatsAppLink>
                </>
              }
            />
          ) : null}
        </div>

        <ul className="hidden grid-cols-2 gap-6 md:grid lg:grid-cols-3 xl:grid-cols-4">
          {CATEGORIES.map((category, index) => (
            <li key={category.handle}>
              <WhatsAppLink
                href={categoryOrderUrl(category.title)}
                className="group block overflow-hidden bg-neutral focus-visible:outline-offset-4"
              >
                <div className="relative aspect-card overflow-hidden bg-neutral-muted">
                  <Image
                    src={category.image}
                    alt={category.title}
                    fill
                    sizes="(min-width: 1280px) 300px, (min-width: 768px) 45vw, 100vw"
                    className="object-cover transition-media media-zoom-hover"
                    priority={index < 4}
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand/70 via-brand/10 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <h3 className="font-display text-xl text-brand-inverse sm:text-2xl">
                      {category.title}
                    </h3>
                    <p className="mt-2 text-sm text-brand-inverse/75">
                      {category.description}
                    </p>
                  </div>
                </div>
              </WhatsAppLink>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
