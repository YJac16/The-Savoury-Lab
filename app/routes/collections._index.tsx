import {useLoaderData, Link} from 'react-router';
import type {Route} from './+types/collections._index';
import {getPaginationVariables, Image} from '@shopify/hydrogen';
import type {CollectionFragment} from 'storefrontapi.generated';
import {PaginatedResourceSection} from '~/components/PaginatedResourceSection';
import {FadeIn} from '~/components/ui/FadeIn';
import {buildSeo} from '~/lib/seo';
import {BRAND} from '~/lib/brand';

export const meta: Route.MetaFunction = () => {
  return buildSeo({
    title: 'Shop',
    description: `Browse all collections from ${BRAND.name} — Halaal handcrafted frozen savouries from Kenilworth, Cape Town.`,
    path: '/collections',
  });
};

export async function loader(args: Route.LoaderArgs) {
  const deferredData = loadDeferredData(args);
  const criticalData = await loadCriticalData(args);
  return {...deferredData, ...criticalData};
}

async function loadCriticalData({context, request}: Route.LoaderArgs) {
  const paginationVariables = getPaginationVariables(request, {
    pageBy: 12,
  });

  const [{collections}] = await Promise.all([
    context.storefront.query(COLLECTIONS_QUERY, {
      variables: paginationVariables,
    }),
  ]);

  return {collections};
}

function loadDeferredData(_args: Route.LoaderArgs) {
  return {};
}

export default function Collections() {
  const {collections} = useLoaderData<typeof loader>();

  return (
    <div className="bg-brand-inverse">
      <section className="border-b border-neutral-muted bg-neutral">
        <div className="container-premium section-pad">
          <FadeIn className="max-w-2xl">
            <p className="eyebrow mb-3">Shop</p>
            <h1 className="text-4xl sm:text-5xl">Collections</h1>
            <p className="mt-4 text-sm text-ink-muted">
              Explore our range of handcrafted Halaal frozen savouries.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="container-premium section-pad">
        <PaginatedResourceSection<CollectionFragment>
          connection={collections}
          resourcesClassName="collections-grid"
        >
          {({node: collection, index}) => (
            <CollectionItem
              key={collection.id}
              collection={collection}
              index={index}
            />
          )}
        </PaginatedResourceSection>
      </section>
    </div>
  );
}

function CollectionItem({
  collection,
  index,
}: {
  collection: CollectionFragment;
  index: number;
}) {
  return (
    <FadeIn delay={index * 0.05}>
      <Link
        className="group block overflow-hidden bg-neutral focus-visible:outline-offset-4"
        to={`/collections/${collection.handle}`}
        prefetch="intent"
      >
        <div className="relative aspect-card overflow-hidden bg-neutral-muted">
          {collection?.image ? (
            <Image
              alt={collection.image.altText || collection.title}
              data={collection.image}
              loading={index < 3 ? 'eager' : 'lazy'}
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="size-full object-cover transition-media group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-end p-6">
              <span className="font-display text-2xl text-brand">
                {collection.title}
              </span>
            </div>
          )}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand/70 via-brand/10 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-6">
            <h2 className="font-display text-xl text-brand-inverse sm:text-2xl">
              {collection.title}
            </h2>
          </div>
        </div>
      </Link>
    </FadeIn>
  );
}

const COLLECTIONS_QUERY = `#graphql
  fragment Collection on Collection {
    id
    title
    handle
    image {
      id
      url
      altText
      width
      height
    }
  }
  query StoreCollections(
    $country: CountryCode
    $endCursor: String
    $first: Int
    $language: LanguageCode
    $last: Int
    $startCursor: String
  ) @inContext(country: $country, language: $language) {
    collections(
      first: $first,
      last: $last,
      before: $startCursor,
      after: $endCursor
    ) {
      nodes {
        ...Collection
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
    }
  }
` as const;
