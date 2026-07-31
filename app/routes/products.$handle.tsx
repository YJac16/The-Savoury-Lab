import {useLoaderData, Link} from 'react-router';
import {useState} from 'react';
import type {Route} from './+types/products.$handle';
import {
  getSelectedProductOptions,
  Analytics,
  useOptimisticVariant,
  getProductOptions,
  getAdjacentAndFirstAvailableVariants,
  useSelectedOptionInUrlParam,
  Money,
} from '@shopify/hydrogen';
import {ProductPrice} from '~/components/ProductPrice';
import {ProductForm} from '~/components/ProductForm';
import {ProductGallery} from '~/components/ProductGallery';
import {ProductCard, type ProductCardProduct} from '~/components/ProductCard';
import {AddToCartButton} from '~/components/AddToCartButton';
import {useAside} from '~/components/Aside';
import {JsonLd} from '~/components/JsonLd';
import {buildSeo, breadcrumbJsonLd, productJsonLd} from '~/lib/seo';
import {
  BRAND,
  DEFAULT_HEATING_GUIDE,
  DEFAULT_STORAGE_GUIDE,
  FROZEN_FULFILMENT_NOTE,
} from '~/lib/brand';
import {redirectIfHandleIsLocalized} from '~/lib/redirect';
import {
  getAllProducts,
  getProduct,
  isStaticCatalogue,
  type StaticProduct,
} from '~/lib/static-catalogue';
import {whatsappOrderUrl} from '~/lib/whatsapp';
import {formatMenuPrice} from '~/lib/menu';

export const meta: Route.MetaFunction = ({data}) => {
  if (!data?.product) return [{title: 'Product'}];

  if (data.staticMode) {
    const product = data.product as StaticProduct;
    return buildSeo({
      title: product.title,
      description: product.description,
      path: `/products/${product.handle}`,
      image: product.featuredImage?.url,
      type: 'product',
    });
  }

  const shopifyProduct = data.product as {
    selectedOrFirstAvailableVariant?: {image?: {url?: string} | null} | null;
    seo?: {description?: string | null; title?: string | null} | null;
    description?: string | null;
    title: string;
    handle: string;
  };
  const variant = shopifyProduct.selectedOrFirstAvailableVariant;
  const description =
    shopifyProduct.seo?.description ||
    shopifyProduct.description ||
    `${shopifyProduct.title} from The Savoury Lab`;
  const path = `/products/${shopifyProduct.handle}`;

  return [
    ...buildSeo({
      title: shopifyProduct.seo?.title || shopifyProduct.title,
      description,
      path,
      image: variant?.image?.url,
      type: 'product',
    }),
    {
      tagName: 'link',
      rel: 'canonical',
      href: `${BRAND.siteUrl.replace(/\/$/, '')}${path}`,
    },
  ];
};

export async function loader(args: Route.LoaderArgs) {
  const criticalData = await loadCriticalData(args);
  return {...criticalData};
}

async function loadCriticalData({context, params, request}: Route.LoaderArgs) {
  const {handle} = params;
  const {storefront, env} = context;

  if (!handle) {
    throw new Error('Expected product handle to be defined');
  }

  if (isStaticCatalogue(env)) {
    const product = getProduct(handle);
    if (!product) {
      throw new Response(null, {status: 404});
    }
    const relatedProducts = getAllProducts()
      .filter(
        (item) =>
          item.collectionHandle === product.collectionHandle &&
          item.handle !== product.handle,
      )
      .slice(0, 4);
    return {
      staticMode: true as const,
      product,
      relatedProducts,
    };
  }

  const [{product}] = await Promise.all([
    storefront.query(PRODUCT_QUERY, {
      variables: {handle, selectedOptions: getSelectedProductOptions(request)},
    }),
  ]);

  if (!product?.id) {
    throw new Response(null, {status: 404});
  }

  redirectIfHandleIsLocalized(request, {handle, data: product});

  const relatedProducts = await storefront
    .query(PRODUCT_RECOMMENDATIONS_QUERY, {
      variables: {productId: product.id},
    })
    .then((result: {productRecommendations?: Array<ProductCardProduct | null> | null}) =>
      (result.productRecommendations ?? [])
        .filter((item): item is ProductCardProduct => Boolean(item))
        .slice(0, 4),
    )
    .catch(() => [] as ProductCardProduct[]);

  return {staticMode: false as const, product, relatedProducts};
}

type TabId = 'description' | 'ingredients' | 'heating' | 'reviews';

export default function Product() {
  const data = useLoaderData<typeof loader>();
  if (data.staticMode) {
    return (
      <StaticProductPage
        product={data.product}
        relatedProducts={data.relatedProducts}
      />
    );
  }
  return (
    <ShopifyProductPage
      product={data.product}
      relatedProducts={data.relatedProducts}
    />
  );
}

function StaticProductPage({
  product,
  relatedProducts,
}: {
  product: StaticProduct;
  relatedProducts: ProductCardProduct[];
}) {
  const images = product.featuredImage ? [product.featuredImage] : [];
  const orderUrl = whatsappOrderUrl(product);

  const jsonLd = [
    productJsonLd({
      name: product.title,
      description: product.description,
      image: product.featuredImage?.url,
      price: product.priceRange.minVariantPrice.amount,
      currency: product.priceRange.minVariantPrice.currencyCode,
      availability: true,
      url: `/products/${product.handle}`,
    }),
    breadcrumbJsonLd([
      {name: 'Home', path: '/'},
      {name: 'Shop', path: '/collections/all'},
      {name: product.title, path: `/products/${product.handle}`},
    ]),
  ];

  return (
    <>
      <JsonLd data={jsonLd} />
      <div className="bg-brand-inverse pb-24 lg:pb-0">
        <div className="container-premium section-pad">
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-2 text-xs text-ink-muted">
              <li>
                <Link to="/" className="hover:text-accent" prefetch="intent">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link
                  to={`/collections/${product.collectionHandle}`}
                  className="hover:text-accent"
                  prefetch="intent"
                >
                  {product.collectionTitle}
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-brand" aria-current="page">
                {product.title}
              </li>
            </ol>
          </nav>

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16 xl:gap-20">
            <ProductGallery images={images} title={product.title} />

            <div className="lg:sticky lg:top-24 lg:self-start">
              <p className="eyebrow mb-3">{product.collectionTitle}</p>
              <h1 className="text-balance text-3xl sm:text-4xl">
                {product.title}
              </h1>
              <p className="mt-4 text-sm leading-relaxed text-ink-muted">
                {product.description}
              </p>
              {product.minNote ? (
                <p className="mt-3 text-xs text-ink-muted">{product.minNote}</p>
              ) : null}

              <div className="mt-8 space-y-3 border-t border-neutral-muted pt-8">
                <p className="eyebrow mb-3">Pack prices</p>
                <ul className="space-y-2 text-sm">
                  {product.packPrices.map((pack) => (
                    <li
                      key={`${pack.qty}-${pack.price}`}
                      className="flex justify-between gap-4 border-b border-neutral-muted/60 pb-2"
                    >
                      <span>{pack.qty === 1 ? pack.label : `${pack.qty} pcs`}</span>
                      <span className="font-medium text-brand">
                        {formatMenuPrice(pack.price)}
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="pt-2 text-sm text-ink-muted">
                  From{' '}
                  <Money data={product.priceRange.minVariantPrice} />
                </p>
              </div>

              <a
                href={orderUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary mt-8 inline-flex w-full justify-center sm:w-auto"
              >
                Order on WhatsApp
              </a>

              <dl className="mt-10 space-y-4 border-t border-neutral-muted pt-8 text-sm">
                <dt className="eyebrow mb-1">Storage</dt>
                <dd className="whitespace-pre-line text-ink-muted">
                  {DEFAULT_STORAGE_GUIDE}
                </dd>
                <dt className="eyebrow mb-1">Heating</dt>
                <dd className="whitespace-pre-line text-ink-muted">
                  {DEFAULT_HEATING_GUIDE}
                </dd>
                <dt className="eyebrow mb-1">Delivery</dt>
                <dd className="whitespace-pre-line text-ink-muted">
                  {FROZEN_FULFILMENT_NOTE}
                </dd>
              </dl>
            </div>
          </div>

          {relatedProducts.length > 0 && (
            <section
              className="mt-20 border-t border-neutral-muted pt-16"
              aria-labelledby="related-heading"
            >
              <p className="eyebrow mb-3">You may also like</p>
              <h2 id="related-heading" className="mb-10 text-3xl sm:text-4xl">
                Related products
              </h2>
              <ul className="products-grid">
                {relatedProducts.map((item) => (
                  <li key={item.id}>
                    <ProductCard product={item} />
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-neutral-muted bg-brand-inverse/95 p-4 backdrop-blur-md lg:hidden">
        <div className="container-premium flex items-center gap-4">
          <div className="min-w-0 flex-1">
            <p className="truncate font-display text-base">{product.title}</p>
            <p className="text-sm text-ink-muted">
              From <Money data={product.priceRange.minVariantPrice} />
            </p>
          </div>
          <a
            href={orderUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary shrink-0 whitespace-nowrap px-5 py-3 text-[0.65rem]"
          >
            Order on WhatsApp
          </a>
        </div>
      </div>
    </>
  );
}

function ShopifyProductPage({
  product,
  relatedProducts,
}: {
  product: any;
  relatedProducts: ProductCardProduct[];
}) {
  const [activeTab, setActiveTab] = useState<TabId>('description');
  const {open} = useAside();

  const selectedVariant = useOptimisticVariant(
    product.selectedOrFirstAvailableVariant,
    getAdjacentAndFirstAvailableVariants(product),
  );

  useSelectedOptionInUrlParam(selectedVariant.selectedOptions);

  const productOptions = getProductOptions({
    ...product,
    selectedOrFirstAvailableVariant: selectedVariant,
  });

  const images =
    product.media?.nodes?.length
      ? product.media.nodes
          .filter(
            (node: {__typename?: string; image?: ProductCardProduct['featuredImage']}) =>
              node.__typename === 'MediaImage' && node.image,
          )
          .map(
            (node: {image?: ProductCardProduct['featuredImage']}) => node.image!,
          )
      : selectedVariant?.image
        ? [selectedVariant.image]
        : [];

  const ingredients = product.ingredients?.value ?? null;
  const heatingGuide = product.heatingGuide?.value || DEFAULT_HEATING_GUIDE;
  const reviewsContent = product.reviews?.value;
  const nutrition = product.nutrition?.value;
  const storage = product.storage?.value || DEFAULT_STORAGE_GUIDE;
  const cooking = product.cooking?.value;
  const availabilityNote = product.availability?.value;
  const collectionNote = product.collectionInfo?.value;
  const deliveryNote = product.deliveryInfo?.value || FROZEN_FULFILMENT_NOTE;

  const allTabs: {id: TabId; label: string; show: boolean}[] = [
    {id: 'description', label: 'Description', show: true},
    {id: 'ingredients', label: 'Ingredients', show: Boolean(ingredients)},
    {id: 'heating', label: 'Heating Guide', show: true},
    {id: 'reviews', label: 'Reviews', show: Boolean(reviewsContent)},
  ];
  const tabs = allTabs.filter((tab) => tab.show);

  const jsonLd = [
    productJsonLd({
      name: product.title,
      description: product.description,
      image: selectedVariant?.image?.url,
      sku: selectedVariant?.sku ?? undefined,
      price: selectedVariant?.price.amount,
      currency: selectedVariant?.price.currencyCode,
      availability: selectedVariant?.availableForSale,
      url: `/products/${product.handle}`,
    }),
    breadcrumbJsonLd([
      {name: 'Home', path: '/'},
      {name: 'Shop', path: '/collections/all'},
      {name: product.title, path: `/products/${product.handle}`},
    ]),
  ];

  return (
    <>
      <JsonLd data={jsonLd} />
      <div className="bg-brand-inverse pb-24 lg:pb-0">
        <div className="container-premium section-pad">
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-2 text-xs text-ink-muted">
              <li>
                <Link to="/" className="hover:text-accent" prefetch="intent">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link
                  to="/collections/all"
                  className="hover:text-accent"
                  prefetch="intent"
                >
                  Shop
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-brand" aria-current="page">
                {product.title}
              </li>
            </ol>
          </nav>

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16 xl:gap-20">
            <ProductGallery images={images} title={product.title} />

            <div className="lg:sticky lg:top-24 lg:self-start">
              <p className="eyebrow mb-3">Product</p>
              <h1 className="text-balance text-3xl sm:text-4xl">{product.title}</h1>

              <div className="mt-8">
                <ProductForm
                  productOptions={productOptions}
                  selectedVariant={selectedVariant}
                />
              </div>

              {(nutrition ||
                storage ||
                cooking ||
                availabilityNote ||
                collectionNote ||
                deliveryNote) && (
                <dl className="mt-10 space-y-4 border-t border-neutral-muted pt-8 text-sm">
                  {nutrition && (
                    <>
                      <dt className="eyebrow mb-1">Nutrition</dt>
                      <dd className="whitespace-pre-line text-ink-muted">
                        {nutrition}
                      </dd>
                    </>
                  )}
                  {storage && (
                    <>
                      <dt className="eyebrow mb-1">Storage</dt>
                      <dd className="whitespace-pre-line text-ink-muted">
                        {storage}
                      </dd>
                    </>
                  )}
                  {cooking && (
                    <>
                      <dt className="eyebrow mb-1">Cooking</dt>
                      <dd className="whitespace-pre-line text-ink-muted">
                        {cooking}
                      </dd>
                    </>
                  )}
                  {availabilityNote && (
                    <>
                      <dt className="eyebrow mb-1">Availability</dt>
                      <dd className="whitespace-pre-line text-ink-muted">
                        {availabilityNote}
                      </dd>
                    </>
                  )}
                  {collectionNote && (
                    <>
                      <dt className="eyebrow mb-1">Collection</dt>
                      <dd className="whitespace-pre-line text-ink-muted">
                        {collectionNote}
                      </dd>
                    </>
                  )}
                  {deliveryNote && (
                    <>
                      <dt className="eyebrow mb-1">Delivery</dt>
                      <dd className="whitespace-pre-line text-ink-muted">
                        {deliveryNote}
                      </dd>
                    </>
                  )}
                </dl>
              )}
            </div>
          </div>

          <div className="mt-16 border-t border-neutral-muted pt-12">
            <div
              className="mb-8 flex flex-wrap gap-2 border-b border-neutral-muted"
              role="tablist"
              aria-label="Product information"
            >
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={activeTab === tab.id}
                  aria-controls={`panel-${tab.id}`}
                  id={`tab-${tab.id}`}
                  onClick={() => setActiveTab(tab.id)}
                  className={`-mb-px border-b-2 px-4 py-3 text-xs font-medium uppercase tracking-[0.14em] transition-colors ${
                    activeTab === tab.id
                      ? 'border-accent text-brand'
                      : 'border-transparent text-ink-muted hover:text-brand'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {tabs.map((tab) => (
              <div
                key={tab.id}
                id={`panel-${tab.id}`}
                role="tabpanel"
                aria-labelledby={`tab-${tab.id}`}
                hidden={activeTab !== tab.id}
                className="max-w-3xl text-sm leading-relaxed text-ink-muted"
              >
                {tab.id === 'description' && (
                  <div
                    className="prose-product"
                    dangerouslySetInnerHTML={{__html: product.descriptionHtml}}
                  />
                )}
                {tab.id === 'ingredients' && (
                  <div className="whitespace-pre-line">{ingredients}</div>
                )}
                {tab.id === 'heating' && (
                  <div className="whitespace-pre-line">{heatingGuide}</div>
                )}
                {tab.id === 'reviews' && (
                  <div className="whitespace-pre-line">{reviewsContent}</div>
                )}
              </div>
            ))}
          </div>

          {relatedProducts.length > 0 && (
            <section
              className="mt-20 border-t border-neutral-muted pt-16"
              aria-labelledby="related-heading"
            >
              <p className="eyebrow mb-3">You may also like</p>
              <h2 id="related-heading" className="mb-10 text-3xl sm:text-4xl">
                Related products
              </h2>
              <ul className="products-grid">
                {relatedProducts.map((item) => (
                  <li key={item.id}>
                    <ProductCard product={item} />
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-neutral-muted bg-brand-inverse/95 p-4 backdrop-blur-md lg:hidden">
        <div className="container-premium flex items-center gap-4">
          <div className="min-w-0 flex-1">
            <p className="truncate font-display text-base">{product.title}</p>
            <ProductPrice
              price={selectedVariant?.price}
              compareAtPrice={selectedVariant?.compareAtPrice}
            />
          </div>
          <AddToCartButton
            disabled={!selectedVariant || !selectedVariant.availableForSale}
            onClick={() => open('cart')}
            lines={
              selectedVariant
                ? [
                    {
                      merchandiseId: selectedVariant.id,
                      quantity: 1,
                      selectedVariant,
                    },
                  ]
                : []
            }
          >
            <span className="btn-primary shrink-0 whitespace-nowrap px-5 py-3 text-[0.65rem]">
              {selectedVariant?.availableForSale ? 'Add to cart' : 'Sold out'}
            </span>
          </AddToCartButton>
        </div>
      </div>

      <Analytics.ProductView
        data={{
          products: [
            {
              id: product.id,
              title: product.title,
              price: selectedVariant?.price.amount || '0',
              vendor: product.vendor,
              variantId: selectedVariant?.id || '',
              variantTitle: selectedVariant?.title || '',
              quantity: 1,
            },
          ],
        }}
      />
    </>
  );
}

const PRODUCT_VARIANT_FRAGMENT = `#graphql
  fragment ProductVariant on ProductVariant {
    availableForSale
    compareAtPrice {
      amount
      currencyCode
    }
    id
    image {
      __typename
      id
      url
      altText
      width
      height
    }
    price {
      amount
      currencyCode
    }
    product {
      title
      handle
    }
    selectedOptions {
      name
      value
    }
    sku
    title
    unitPrice {
      amount
      currencyCode
    }
  }
` as const;

const PRODUCT_FRAGMENT = `#graphql
  fragment Product on Product {
    id
    title
    vendor
    handle
    descriptionHtml
    description
    tags
    encodedVariantExistence
    encodedVariantAvailability
    ingredients: metafield(namespace: "custom", key: "ingredients") {
      value
    }
    heatingGuide: metafield(namespace: "custom", key: "heating_guide") {
      value
    }
    reviews: metafield(namespace: "custom", key: "reviews") {
      value
    }
    nutrition: metafield(namespace: "custom", key: "nutrition") {
      value
    }
    storage: metafield(namespace: "custom", key: "storage") {
      value
    }
    cooking: metafield(namespace: "custom", key: "cooking") {
      value
    }
    availability: metafield(namespace: "custom", key: "availability") {
      value
    }
    collectionInfo: metafield(namespace: "custom", key: "collection") {
      value
    }
    deliveryInfo: metafield(namespace: "custom", key: "delivery") {
      value
    }
    media(first: 8) {
      nodes {
        __typename
        ... on MediaImage {
          image {
            id
            url
            altText
            width
            height
          }
        }
      }
    }
    options {
      name
      optionValues {
        name
        firstSelectableVariant {
          ...ProductVariant
        }
        swatch {
          color
          image {
            previewImage {
              url
            }
          }
        }
      }
    }
    selectedOrFirstAvailableVariant(selectedOptions: $selectedOptions, ignoreUnknownOptions: true, caseInsensitiveMatch: true) {
      ...ProductVariant
    }
    adjacentVariants (selectedOptions: $selectedOptions) {
      ...ProductVariant
    }
    seo {
      description
      title
    }
  }
  ${PRODUCT_VARIANT_FRAGMENT}
` as const;

const PRODUCT_QUERY = `#graphql
  query Product(
    $country: CountryCode
    $handle: String!
    $language: LanguageCode
    $selectedOptions: [SelectedOptionInput!]!
  ) @inContext(country: $country, language: $language) {
    product(handle: $handle) {
      ...Product
    }
  }
  ${PRODUCT_FRAGMENT}
` as const;

const PRODUCT_RECOMMENDATIONS_QUERY = `#graphql
  query ProductRecommendations(
    $productId: ID!
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    productRecommendations(productId: $productId) {
      id
      title
      handle
      featuredImage {
        id
        url
        altText
        width
        height
      }
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
        maxVariantPrice {
          amount
          currencyCode
        }
      }
      selectedOrFirstAvailableVariant {
        id
        availableForSale
      }
    }
  }
` as const;
