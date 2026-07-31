import {Await, Link, useLocation} from 'react-router';
import {Suspense, useId, type ReactNode} from 'react';
import type {
  CartApiQueryFragment,
  FooterQuery,
  HeaderQuery,
} from 'storefrontapi.generated';
import {Aside} from '~/components/Aside';
import {Footer} from '~/components/Footer';
import {Header, HeaderMenu} from '~/components/Header';
import {CartMain} from '~/components/CartMain';
import type {ProductCardProduct} from '~/components/ProductCard';
import {WhatsAppFloat} from '~/components/WhatsAppFloat';
import {
  SEARCH_ENDPOINT,
  SearchFormPredictive,
} from '~/components/SearchFormPredictive';
import {SearchResultsPredictive} from '~/components/SearchResultsPredictive';

interface PageLayoutProps {
  cart: Promise<CartApiQueryFragment | null>;
  footer: Promise<FooterQuery | null>;
  header: HeaderQuery;
  isLoggedIn: Promise<boolean>;
  publicStoreDomain: string;
  recommendedProducts?: Promise<ProductCardProduct[]>;
  children?: ReactNode;
}

export function PageLayout({
  cart,
  children = null,
  footer,
  header,
  isLoggedIn,
  publicStoreDomain,
  recommendedProducts,
}: PageLayoutProps) {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <Aside.Provider>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <div className="flex min-h-svh flex-col">
        <CartAside cart={cart} recommendedProducts={recommendedProducts} />
        <SearchAside />
        <MobileMenuAside />
        {header && (
          <Header
            header={header}
            cart={cart}
            isLoggedIn={isLoggedIn}
            publicStoreDomain={publicStoreDomain}
          />
        )}
        <main
          id="main-content"
          tabIndex={-1}
          className={`flex-1 outline-none ${isHome ? '' : 'pt-16 lg:pt-17'}`}
        >
          {children}
        </main>
        <Footer
          footer={footer}
          header={header}
          publicStoreDomain={publicStoreDomain}
        />
        <WhatsAppFloat />
      </div>
    </Aside.Provider>
  );
}

function CartAside({
  cart,
  recommendedProducts,
}: {
  cart: PageLayoutProps['cart'];
  recommendedProducts?: Promise<ProductCardProduct[]>;
}) {
  return (
    <Aside type="cart" heading="Your Cart" wide>
      <Suspense
        fallback={
          <p className="py-8 text-center text-sm text-ink-muted">
            Loading your cart…
          </p>
        }
      >
        <Await resolve={cart}>
          {(resolvedCart) => (
            <Suspense fallback={<CartMain cart={resolvedCart} layout="aside" />}>
              {recommendedProducts ? (
                <Await resolve={recommendedProducts}>
                  {(products) => (
                    <CartMain
                      cart={resolvedCart}
                      layout="aside"
                      recommendedProducts={products}
                    />
                  )}
                </Await>
              ) : (
                <CartMain cart={resolvedCart} layout="aside" />
              )}
            </Suspense>
          )}
        </Await>
      </Suspense>
    </Aside>
  );
}

function SearchAside() {
  const queriesDatalistId = useId();
  return (
    <Aside type="search" heading="Search">
      <div className="predictive-search flex h-full flex-col">
        <SearchFormPredictive className="predictive-search-form border-b border-neutral-muted px-1 pb-4">
          {({fetchResults, goToSearch, inputRef}) => (
            <div className="flex gap-2">
              <label htmlFor="aside-search" className="sr-only">
                Search products
              </label>
              <input
                id="aside-search"
                name="q"
                onChange={fetchResults}
                onFocus={fetchResults}
                placeholder="Search savouries…"
                ref={inputRef}
                type="search"
                list={queriesDatalistId}
                className="min-h-11 flex-1 border border-neutral-muted bg-brand-inverse px-4 text-sm text-brand placeholder:text-ink-muted/60 focus-visible:border-accent"
                autoComplete="off"
              />
              <button
                type="button"
                onClick={() => {
                  goToSearch();
                }}
                className="btn-outline min-h-11 shrink-0 px-5"
                aria-label="Search"
              >
                Go
              </button>
            </div>
          )}
        </SearchFormPredictive>

        <div className="flex-1 overflow-y-auto pt-4">
          <SearchResultsPredictive>
            {({items, total, term, state, closeSearch}) => {
              const {articles, collections, pages, products, queries} = items;

              if (state === 'loading' && term.current) {
                return (
                  <p className="text-sm text-ink-muted">Searching…</p>
                );
              }

              if (!total) {
                return <SearchResultsPredictive.Empty term={term} />;
              }

              return (
                <div className="space-y-6">
                  <SearchResultsPredictive.Queries
                    queries={queries}
                    queriesDatalistId={queriesDatalistId}
                  />
                  <SearchResultsPredictive.Products
                    products={products}
                    closeSearch={closeSearch}
                    term={term}
                  />
                  <SearchResultsPredictive.Collections
                    collections={collections}
                    closeSearch={closeSearch}
                    term={term}
                  />
                  <SearchResultsPredictive.Pages
                    pages={pages}
                    closeSearch={closeSearch}
                    term={term}
                  />
                  <SearchResultsPredictive.Articles
                    articles={articles}
                    closeSearch={closeSearch}
                    term={term}
                  />
                  {term.current && total ? (
                    <Link
                      onClick={() => {
                        closeSearch();
                      }}
                      to={`${SEARCH_ENDPOINT}?q=${term.current}`}
                      className="block border-t border-neutral-muted pt-4 text-sm font-medium text-brand hover:text-accent"
                    >
                      View all results for &ldquo;{term.current}&rdquo; →
                    </Link>
                  ) : null}
                </div>
              );
            }}
          </SearchResultsPredictive>
        </div>
      </div>
    </Aside>
  );
}

function MobileMenuAside() {
  return (
    <Aside type="mobile" heading="Menu">
      <HeaderMenu viewport="mobile" />
      <div className="mt-8 border-t border-neutral-muted pt-6">
        <p className="eyebrow mb-4">Quick links</p>
        <Link
          to="/collections/all"
          className="block py-2 text-sm text-brand hover:text-accent"
        >
          Shop all
        </Link>
        <Link
          to="/account"
          className="block py-2 text-sm text-brand hover:text-accent"
        >
          Account
        </Link>
      </div>
    </Aside>
  );
}
