import Image from "next/image";
import { CATEGORIES } from "@/lib/brand";

export function FeaturedCategories() {
  return (
    <section className="section-pad bg-brand-inverse" aria-label="Collections">
      <div className="container-premium">
        <div className="mb-12 max-w-2xl">
          <p className="eyebrow mb-3">Collections</p>
          <h2 className="text-balance text-3xl sm:text-4xl">
            Explore our savouries
          </h2>
        </div>

        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {CATEGORIES.map((category, index) => (
            <li key={category.handle}>
              <a
                href={`#${category.menuAnchor}`}
                className="group block overflow-hidden bg-neutral focus-visible:outline-offset-4"
              >
                <div className="relative aspect-card overflow-hidden bg-neutral-muted">
                  <Image
                    src={category.image}
                    alt={category.title}
                    fill
                    sizes="(min-width: 1280px) 300px, (min-width: 768px) 45vw, 100vw"
                    className="object-cover transition-media group-hover:scale-105"
                    priority={index < 4}
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand/70 via-brand/10 to-transparent transition-opacity duration-500 group-hover:from-brand/80" />
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <h3 className="font-display text-xl text-brand-inverse sm:text-2xl">
                      {category.title}
                    </h3>
                    <p className="mt-2 text-sm text-brand-inverse/75">
                      {category.description}
                    </p>
                  </div>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
