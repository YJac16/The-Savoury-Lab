import {Image} from '@shopify/hydrogen';
import {BRAND, CATEGORIES} from '~/lib/brand';
import {FadeIn} from '~/components/ui/FadeIn';

type CollectionTile = {
  handle: string;
  title: string;
  image?: {
    id?: string | null;
    url: string;
    altText?: string | null;
    width?: number | null;
    height?: number | null;
  } | null;
};

type InstagramFeedProps = {
  className?: string;
  collections?: CollectionTile[];
};

export function InstagramFeed({
  className = '',
  collections = [],
}: InstagramFeedProps) {
  const instagramUrl = BRAND.contact.instagram;
  const imageByHandle = new Map(
    collections.map((collection) => [collection.handle, collection.image]),
  );

  const tiles = CATEGORIES.slice(0, 6).map((category) => ({
    label: category.title,
    handle: category.handle,
    image: imageByHandle.get(category.handle) ?? null,
  }));

  return (
    <section className={`section-pad bg-neutral ${className}`.trim()}>
      <div className="container-premium">
        <FadeIn className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow mb-3">Instagram</p>
            <h2 className="text-balance text-3xl sm:text-4xl">
              From our kitchen to your feed
            </h2>
            <p className="mt-4 text-sm text-ink-muted">
              Follow us for behind-the-scenes batches, seasonal specials, and
              celebration inspiration.
            </p>
          </div>
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline eyebrow self-start text-brand"
          >
            @{instagramUrl.split('/').filter(Boolean).pop()}
          </a>
        </FadeIn>

        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:gap-4">
          {tiles.map((tile, index) => (
            <li key={tile.handle}>
              <FadeIn delay={index * 0.05}>
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative block aspect-square overflow-hidden bg-brand focus-visible:outline-offset-4"
                  aria-label={`View ${BRAND.name} on Instagram — ${tile.label}`}
                >
                  {tile.image?.url ? (
                    tile.image.url.startsWith('/') ? (
                      <img
                        src={tile.image.url}
                        alt={tile.image.altText || tile.label}
                        width={tile.image.width ?? 1200}
                        height={tile.image.height ?? 1200}
                        className="absolute inset-0 size-full object-cover transition-media group-hover:scale-105"
                        loading="lazy"
                      />
                    ) : (
                      <Image
                        data={tile.image}
                        alt={tile.image.altText || tile.label}
                        className="absolute inset-0 object-cover transition-media group-hover:scale-105"
                        sizes="(min-width: 1024px) 33vw, 50vw"
                        loading="lazy"
                      />
                    )
                  ) : (
                    <div className="surface-instagram-fallback absolute inset-0 transition-media group-hover:scale-105" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-brand/80 via-brand/20 to-transparent" />
                  <div className="relative flex h-full flex-col justify-end p-4 sm:p-5">
                    <span className="eyebrow mb-1 text-accent-soft">
                      {BRAND.name}
                    </span>
                    <span className="font-display text-lg text-brand-inverse sm:text-xl">
                      {tile.label}
                    </span>
                  </div>
                </a>
              </FadeIn>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
