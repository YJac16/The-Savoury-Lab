import Image from "next/image";
import { BRAND, CATEGORIES } from "@/lib/brand";

export function InstagramFeed() {
  const tiles = CATEGORIES.slice(0, 6);

  return (
    <section className="section-pad bg-neutral" aria-label="Instagram">
      <div className="container-premium">
        <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow mb-3">Instagram</p>
            <h2 className="text-balance text-3xl sm:text-4xl">
              Follow {BRAND.name}
            </h2>
          </div>
          <a
            href={BRAND.contact.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline eyebrow self-start text-brand"
          >
            @{BRAND.contact.instagramHandle}
          </a>
        </div>

        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:gap-4">
          {tiles.map((tile) => (
            <li key={tile.handle}>
              <a
                href={BRAND.contact.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block aspect-square overflow-hidden bg-brand focus-visible:outline-offset-4"
                aria-label={`View ${BRAND.name} on Instagram — ${tile.title}`}
              >
                <Image
                  src={tile.image}
                  alt={tile.title}
                  fill
                  sizes="(min-width: 1024px) 33vw, 50vw"
                  className="object-cover transition-media media-zoom-hover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand/80 via-brand/20 to-transparent" />
                <div className="relative flex h-full flex-col justify-end p-4 sm:p-5">
                  <span className="eyebrow mb-1 text-accent-soft">
                    {BRAND.name}
                  </span>
                  <span className="font-display text-lg text-brand-inverse sm:text-xl">
                    {tile.title}
                  </span>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
