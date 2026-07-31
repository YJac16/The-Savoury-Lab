import {Link} from 'react-router';
import {Image} from '@shopify/hydrogen';
import {CATEGORIES} from '~/lib/brand';
import {FadeIn} from '~/components/ui/FadeIn';

type CollectionImage = {
  url: string;
  altText?: string | null;
  width?: number | null;
  height?: number | null;
};

export type FeaturedCollection = {
  handle: string;
  title: string;
  image?: CollectionImage | null;
};

type FeaturedCategoriesProps = {
  collections?: FeaturedCollection[];
  className?: string;
};

function findCollectionImage(
  handle: string,
  collections?: FeaturedCollection[],
): CollectionImage | null | undefined {
  return collections?.find((collection) => collection.handle === handle)?.image;
}

function isLocalImageUrl(url: string): boolean {
  return url.startsWith('/');
}

export function FeaturedCategories({
  collections,
  className = '',
}: FeaturedCategoriesProps) {
  return (
    <section className={`section-pad bg-brand-inverse ${className}`.trim()}>
      <div className="container-premium">
        <FadeIn className="mb-12 max-w-2xl">
          <p className="eyebrow mb-3">Collections</p>
          <h2 className="text-balance text-3xl sm:text-4xl">
            Explore our savouries
          </h2>
        </FadeIn>

        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {CATEGORIES.map((category, index) => {
            const image = findCollectionImage(category.handle, collections);

            return (
              <li key={category.handle}>
                <FadeIn delay={index * 0.05}>
                  <Link
                    to={`/collections/${category.handle}`}
                    prefetch="intent"
                    className="group block overflow-hidden bg-neutral focus-visible:outline-offset-4"
                  >
                    <div className="relative aspect-card overflow-hidden bg-neutral-muted">
                      {image ? (
                        isLocalImageUrl(image.url) ? (
                          <img
                            src={image.url}
                            alt={image.altText || category.title}
                            width={image.width ?? 1200}
                            height={image.height ?? 1200}
                            className="size-full object-cover transition-media group-hover:scale-105"
                            loading={index < 4 ? 'eager' : 'lazy'}
                          />
                        ) : (
                          <Image
                            data={image}
                            alt={image.altText || category.title}
                            className="size-full object-cover transition-media group-hover:scale-105"
                            sizes="(min-width: 1280px) 300px, (min-width: 768px) 45vw, 100vw"
                            loading={index < 4 ? 'eager' : 'lazy'}
                          />
                        )
                      ) : (
                        <div className="flex h-full flex-col justify-end p-6">
                          <span className="eyebrow mb-2">Collection</span>
                          <span className="font-display text-2xl text-brand">
                            {category.title}
                          </span>
                        </div>
                      )}
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
                  </Link>
                </FadeIn>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
