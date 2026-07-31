import {Analytics, getShopAnalytics, useNonce} from '@shopify/hydrogen';
import {
  Outlet,
  useRouteError,
  isRouteErrorResponse,
  type ShouldRevalidateFunction,
  Links,
  Meta,
  Scripts,
  ScrollRestoration,
  useRouteLoaderData,
} from 'react-router';
import type {ComponentProps, ReactNode} from 'react';
import type {Route} from './+types/root';
import type {CartApiQueryFragment} from 'storefrontapi.generated';
import favicon from '~/assets/favicon.svg';
import {FOOTER_QUERY, HEADER_QUERY} from '~/lib/fragments';
import resetStyles from '~/styles/reset.css?url';
import appStyles from '~/styles/app.css?url';
import tailwindCss from './styles/tailwind.css?url';
import {PageLayout} from './components/PageLayout';
import {AnalyticsScripts} from './components/AnalyticsScripts';
import {
  getBestSellers,
  isStaticCatalogue,
} from '~/lib/static-catalogue';

export type RootLoader = typeof loader;

/**
 * This is important to avoid re-fetching root queries on sub-navigations
 */
export const shouldRevalidate: ShouldRevalidateFunction = ({
  formMethod,
  currentUrl,
  nextUrl,
}) => {
  // revalidate when a mutation is performed e.g add to cart, login...
  if (formMethod && formMethod !== 'GET') return true;

  // revalidate when manually revalidating via useRevalidator
  if (currentUrl.toString() === nextUrl.toString()) return true;

  // Defaulting to no revalidation for root loader data to improve performance.
  // When using this feature, you risk your UI getting out of sync with your server.
  // Use with caution. If you are uncomfortable with this optimization, update the
  // line below to `return defaultShouldRevalidate` instead.
  // For more details see: https://remix.run/docs/en/main/route/should-revalidate
  return false;
};

/**
 * The main and reset stylesheets are added in the Layout component
 * to prevent a bug in development HMR updates.
 *
 * This avoids the "failed to execute 'insertBefore' on 'Node'" error
 * that occurs after editing and navigating to another page.
 *
 * It's a temporary fix until the issue is resolved.
 * https://github.com/remix-run/remix/issues/9242
 */
export function links() {
  return [
    {
      rel: 'preconnect',
      href: 'https://fonts.googleapis.com',
    },
    {
      rel: 'preconnect',
      href: 'https://fonts.gstatic.com',
      crossOrigin: 'anonymous',
    },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Playfair+Display:wght@500;600;700&display=swap',
    },
    {
      rel: 'preconnect',
      href: 'https://cdn.shopify.com',
    },
    {
      rel: 'preconnect',
      href: 'https://shop.app',
    },
    {rel: 'icon', type: 'image/svg+xml', href: favicon},
  ];
}

export async function loader(args: Route.LoaderArgs) {
  // Start fetching non-critical data without blocking time to first byte
  const deferredData = loadDeferredData(args);

  // Await the critical data required to render initial state of the page
  const criticalData = await loadCriticalData(args);

  const {storefront, env} = args.context;

  let shop;
  try {
    shop = getShopAnalytics({
      storefront,
      publicStorefrontId: env.PUBLIC_STOREFRONT_ID,
    });
  } catch (error) {
    console.error('getShopAnalytics failed', error);
    shop = null;
  }

  return {
    ...deferredData,
    ...criticalData,
    publicStoreDomain: env.PUBLIC_STORE_DOMAIN,
    analyticsIds: {
      ga: env.PUBLIC_GA_MEASUREMENT_ID || undefined,
      metaPixel: env.PUBLIC_META_PIXEL_ID || undefined,
    },
    shop,
    consent: {
      checkoutDomain: env.PUBLIC_CHECKOUT_DOMAIN,
      storefrontAccessToken: env.PUBLIC_STOREFRONT_API_TOKEN,
      withPrivacyBanner: false,
      country: args.context.storefront.i18n.country,
      language: args.context.storefront.i18n.language,
    },
  };
}

/**
 * Load data necessary for rendering content above the fold. This is the critical data
 * needed to render the page. If it's unavailable, the whole page should 400 or 500 error.
 */
async function loadCriticalData({context}: Route.LoaderArgs) {
  const {storefront} = context;

  const [header] = await Promise.all([
    storefront.query(HEADER_QUERY, {
      cache: storefront.CacheLong(),
      variables: {
        headerMenuHandle: 'main-menu', // Adjust to your header menu handle
      },
    }),
    // Add other queries here, so that they are loaded in parallel
  ]);

  return {header};
}

/**
 * Load data for rendering content below the fold. This data is deferred and will be
 * fetched after the initial page load. If it's unavailable, the page should still 200.
 * Make sure to not throw any errors here, as it will cause the page to 500.
 */
function loadDeferredData({context}: Route.LoaderArgs) {
  const {storefront, customerAccount, cart, env} = context;
  const staticMode = isStaticCatalogue(env);

  // defer the footer query (below the fold)
  const footer = storefront
    .query(FOOTER_QUERY, {
      cache: storefront.CacheLong(),
      variables: {
        footerMenuHandle: 'footer', // Adjust to your footer menu handle
      },
    })
    .catch((error: Error) => {
      // Log query errors, but don't throw them so the page can still render
      console.error(error);
      return null;
    });

  const recommendedProducts = staticMode
    ? Promise.resolve(getBestSellers(4))
    : storefront
        .query(RECOMMENDED_PRODUCTS_QUERY, {
          cache: storefront.CacheLong(),
        })
        .then((result) => result.products.nodes)
        .catch((error: Error) => {
          console.error(error);
          return [];
        });

  // Customer Account API is unavailable on mock.shop and until Headless CAAPI is configured
  const isLoggedIn = Promise.resolve(false)
    .then(async () => {
      try {
        return await customerAccount.isLoggedIn();
      } catch (error) {
        console.error('customerAccount.isLoggedIn failed', error);
        return false;
      }
    });

  const cartPromise = Promise.resolve(null as CartApiQueryFragment | null)
    .then(async () => {
      try {
        return await cart.get();
      } catch (error) {
        console.error('cart.get failed', error);
        return null;
      }
    });

  return {
    cart: cartPromise,
    isLoggedIn,
    footer,
    recommendedProducts,
  };
}

export function Layout({children}: {children?: ReactNode}) {
  const nonce = useNonce();

  return (
    <html lang="en-ZA">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <link rel="stylesheet" href={tailwindCss}></link>
        <link rel="stylesheet" href={resetStyles}></link>
        <link rel="stylesheet" href={appStyles}></link>
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration nonce={nonce} />
        <Scripts nonce={nonce} />
      </body>
    </html>
  );
}

export default function App() {
  const data = useRouteLoaderData<RootLoader>('root');

  if (!data) {
    return <Outlet />;
  }

  const page = (
    <PageLayout {...data}>
      <Outlet />
    </PageLayout>
  );

  if (!data.shop) {
    return (
      <>
        {page}
        <AnalyticsScripts />
      </>
    );
  }

  return (
    <Analytics.Provider
      cart={data.cart as ComponentProps<typeof Analytics.Provider>['cart']}
      shop={data.shop}
      consent={data.consent}
    >
      {page}
      <AnalyticsScripts />
    </Analytics.Provider>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  let errorMessage = 'Unknown error';
  let errorStatus = 500;

  if (isRouteErrorResponse(error)) {
    errorMessage = error?.data?.message ?? error.data;
    errorStatus = error.status;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  }

  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-neutral px-6 py-16 text-center">
      <p className="eyebrow mb-4">Something went wrong</p>
      <h1 className="font-display text-6xl text-brand">{errorStatus}</h1>
      <p className="mt-4 max-w-md text-sm text-ink-muted">
        {errorStatus === 404
          ? 'The page you are looking for could not be found.'
          : 'We apologize for the inconvenience. Please try again or return home.'}
      </p>
      {errorMessage && errorStatus !== 404 && (
        <details className="mt-8 max-w-lg text-left">
          <summary className="cursor-pointer text-xs uppercase tracking-[0.14em] text-ink-muted">
            Technical details
          </summary>
          <pre className="mt-3 overflow-auto rounded-sm border border-neutral-muted bg-brand-inverse p-4 text-left text-xs text-brand">
            {errorMessage}
          </pre>
        </details>
      )}
      <a href="/" className="btn-primary mt-10">
        Return home
      </a>
    </div>
  );
}

const RECOMMENDED_PRODUCTS_QUERY = `#graphql
  query CartRecommendedProducts($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    products(first: 4, sortKey: BEST_SELLING) {
      nodes {
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
  }
` as const;
