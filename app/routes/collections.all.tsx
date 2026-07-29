import type {Route} from './+types/collections.all';
import {useLoaderData} from 'react-router';
import {getPaginationVariables} from '@shopify/hydrogen';
import {PaginatedResourceSection} from '~/components/PaginatedResourceSection';
import {ProductCard} from '~/components/ProductCard';
import {FadeIn} from '~/components/ui/FadeIn';
import {buildSeo} from '~/lib/seo';
import {BRAND} from '~/lib/brand';
import type {CollectionItemFragment} from 'storefrontapi.generated';

export const meta: Route.MetaFunction = () => {
  return buildSeo({
    title: 'Shop All',
    description: `Shop all handcrafted Halaal frozen savouries from ${BRAND.name}, Kenilworth, Cape Town.`,
    path: '/collections/all',
  });
};

export async function loader(args: Route.LoaderArgs) {
  const deferredData = loadDeferredData(args);
  const criticalData = await loadCriticalData(args);
  return {...deferredData, ...criticalData};
}

async function loadCriticalData({context, request}: Route.LoaderArgs) {
  const {storefront} = context;
  const paginationVariables = getPaginationVariables(request, {
    pageBy: 12,
  });

  const [{products}] = await Promise.all([
    storefront.query(CATALOG_QUERY, {
      variables: {...paginationVariables},
    }),
  ]);
  return {products};
}

function loadDeferredData(_args: Route.LoaderArgs) {
  return {};
}

export default function Collection() {
  const {products} = useLoaderData<typeof loader>();

  return (
    <div className="bg-brand-inverse">
      <section className="border-b border-neutral-muted bg-neutral">
        <div className="container-premium section-pad">
          <FadeIn className="max-w-2xl">
            <p className="eyebrow mb-3">Shop</p>
            <h1 className="text-4xl sm:text-5xl">All products</h1>
            <p className="mt-4 text-sm text-ink-muted">
              Handcrafted frozen savouries — made fresh, frozen for convenience.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="container-premium section-pad">
        <PaginatedResourceSection<CollectionItemFragment>
          connection={products}
          resourcesClassName="products-grid"
        >
          {({node: product, index}) => (
            <ProductCard
              key={product.id}
              product={product}
              loading={index < 8 ? 'eager' : 'lazy'}
            />
          )}
        </PaginatedResourceSection>
      </section>
    </div>
  );
}

const COLLECTION_ITEM_FRAGMENT = `#graphql
  fragment MoneyCollectionItem on MoneyV2 {
    amount
    currencyCode
  }
  fragment CollectionItem on Product {
    id
    handle
    title
    featuredImage {
      id
      altText
      url
      width
      height
    }
    priceRange {
      minVariantPrice {
        ...MoneyCollectionItem
      }
      maxVariantPrice {
        ...MoneyCollectionItem
      }
    }
    selectedOrFirstAvailableVariant {
      id
      availableForSale
    }
  }
` as const;

const CATALOG_QUERY = `#graphql
  query Catalog(
    $country: CountryCode
    $language: LanguageCode
    $first: Int
    $last: Int
    $startCursor: String
    $endCursor: String
  ) @inContext(country: $country, language: $language) {
    products(first: $first, last: $last, before: $startCursor, after: $endCursor) {
      nodes {
        ...CollectionItem
      }
      pageInfo {
        hasPreviousPage
        hasNextPage
        startCursor
        endCursor
      }
    }
  }
  ${COLLECTION_ITEM_FRAGMENT}
` as const;
