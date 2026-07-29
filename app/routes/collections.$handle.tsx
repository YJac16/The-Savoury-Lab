import {redirect, useLoaderData} from 'react-router';
import type {Route} from './+types/collections.$handle';
import {getPaginationVariables, Analytics} from '@shopify/hydrogen';
import {PaginatedResourceSection} from '~/components/PaginatedResourceSection';
import {redirectIfHandleIsLocalized} from '~/lib/redirect';
import {ProductCard} from '~/components/ProductCard';
import {FadeIn} from '~/components/ui/FadeIn';
import {buildSeo} from '~/lib/seo';
import type {ProductItemFragment} from 'storefrontapi.generated';

export const meta: Route.MetaFunction = ({data}) => {
  if (!data?.collection) {
    return buildSeo({
      title: 'Collection',
      description: 'Shop handcrafted Halaal frozen savouries from The Savoury Lab.',
      path: '/collections',
    });
  }

  return buildSeo({
    title: data.collection.title,
    description:
      data.collection.description ||
      `Shop ${data.collection.title} — handcrafted Halaal frozen savouries from The Savoury Lab, Kenilworth, Cape Town.`,
    path: `/collections/${data.collection.handle}`,
  });
};

export async function loader(args: Route.LoaderArgs) {
  const deferredData = loadDeferredData(args);
  const criticalData = await loadCriticalData(args);
  return {...deferredData, ...criticalData};
}

async function loadCriticalData({context, params, request}: Route.LoaderArgs) {
  const {handle} = params;
  const {storefront} = context;
  const paginationVariables = getPaginationVariables(request, {
    pageBy: 12,
  });

  if (!handle) {
    throw redirect('/collections');
  }

  const [{collection}] = await Promise.all([
    storefront.query(COLLECTION_QUERY, {
      variables: {handle, ...paginationVariables},
    }),
  ]);

  if (!collection) {
    throw new Response(`Collection ${handle} not found`, {
      status: 404,
    });
  }

  redirectIfHandleIsLocalized(request, {handle, data: collection});

  return {collection};
}

function loadDeferredData(_args: Route.LoaderArgs) {
  return {};
}

export default function Collection() {
  const {collection} = useLoaderData<typeof loader>();

  return (
    <div className="bg-brand-inverse">
      <section className="border-b border-neutral-muted bg-neutral">
        <div className="container-premium section-pad">
          <FadeIn className="max-w-2xl">
            <p className="eyebrow mb-3">Collection</p>
            <h1 className="text-4xl sm:text-5xl">{collection.title}</h1>
            {collection.description ? (
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-ink-muted">
                {collection.description}
              </p>
            ) : null}
          </FadeIn>
        </div>
      </section>

      <section className="container-premium section-pad">
        <PaginatedResourceSection<ProductItemFragment>
          connection={collection.products}
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

      <Analytics.CollectionView
        data={{
          collection: {
            id: collection.id,
            handle: collection.handle,
          },
        }}
      />
    </div>
  );
}

const PRODUCT_ITEM_FRAGMENT = `#graphql
  fragment MoneyProductItem on MoneyV2 {
    amount
    currencyCode
  }
  fragment ProductItem on Product {
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
        ...MoneyProductItem
      }
      maxVariantPrice {
        ...MoneyProductItem
      }
    }
    selectedOrFirstAvailableVariant {
      id
      availableForSale
    }
  }
` as const;

const COLLECTION_QUERY = `#graphql
  ${PRODUCT_ITEM_FRAGMENT}
  query Collection(
    $handle: String!
    $country: CountryCode
    $language: LanguageCode
    $first: Int
    $last: Int
    $startCursor: String
    $endCursor: String
  ) @inContext(country: $country, language: $language) {
    collection(handle: $handle) {
      id
      handle
      title
      description
      products(
        first: $first,
        last: $last,
        before: $startCursor,
        after: $endCursor
      ) {
        nodes {
          ...ProductItem
        }
        pageInfo {
          hasPreviousPage
          hasNextPage
          endCursor
          startCursor
        }
      }
    }
  }
` as const;
