import {Suspense, useEffect, useState} from 'react';
import {Await, NavLink, useAsyncValue, useLocation} from 'react-router';
import {
  type CartViewPayload,
  useAnalytics,
  useOptimisticCart,
} from '@shopify/hydrogen';
import type {CartApiQueryFragment, HeaderQuery} from 'storefrontapi.generated';
import {useAside} from '~/components/Aside';
import {Logo} from '~/components/Logo';
import {NAV_LINKS} from '~/lib/brand';

interface HeaderProps {
  header: HeaderQuery;
  cart: Promise<CartApiQueryFragment | null>;
  isLoggedIn: Promise<boolean>;
  publicStoreDomain: string;
  transparentOnTop?: boolean;
}

type Viewport = 'desktop' | 'mobile';

export function Header({
  isLoggedIn,
  cart,
  transparentOnTop = true,
}: HeaderProps) {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const useTransparent = transparentOnTop && isHome;
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 48);
    }
    onScroll();
    window.addEventListener('scroll', onScroll, {passive: true});
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const solid = scrolled || !useTransparent;
  const lightText = useTransparent && !scrolled;

  return (
    <>
      <header
        className={`transition-header fixed inset-x-0 top-0 z-40 ${
          solid
            ? 'border-b border-neutral-muted/80 bg-brand-inverse/95 shadow-soft backdrop-blur-md'
            : 'border-b border-transparent bg-transparent'
        }`}
      >
        <div className="container-premium flex h-16 items-center gap-6 lg:h-17">
          <Logo inverted={lightText} className="shrink-0" />

          <HeaderMenu viewport="desktop" lightText={lightText} />

          <HeaderCtas
            isLoggedIn={isLoggedIn}
            cart={cart}
            lightText={lightText}
          />
        </div>
      </header>
    </>
  );
}

export function HeaderMenu({
  viewport,
  lightText = false,
}: {
  viewport: Viewport;
  lightText?: boolean;
}) {
  const {close} = useAside();
  const isMobile = viewport === 'mobile';

  const linkClass = ({isActive}: {isActive: boolean}) =>
    [
      'link-underline font-sans text-[0.7rem] font-medium uppercase tracking-[0.16em] transition-colors duration-300',
      lightText && !isMobile
        ? 'text-brand-inverse/90 hover:text-accent-soft'
        : 'text-brand hover:text-accent',
      isActive ? 'text-accent' : '',
    ]
      .filter(Boolean)
      .join(' ');

  return (
    <nav
      className={
        isMobile
          ? 'flex flex-col gap-1'
          : 'mx-auto hidden items-center gap-8 lg:flex'
      }
      aria-label={isMobile ? 'Mobile menu' : 'Primary'}
    >
      {NAV_LINKS.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          end={link.to === '/'}
          prefetch="intent"
          onClick={isMobile ? close : undefined}
          className={linkClass}
        >
          {link.title}
        </NavLink>
      ))}
    </nav>
  );
}

function HeaderCtas({
  isLoggedIn,
  cart,
  lightText,
}: Pick<HeaderProps, 'isLoggedIn' | 'cart'> & {lightText: boolean}) {
  const iconClass = lightText
    ? 'text-brand-inverse/90 hover:text-accent-soft'
    : 'text-brand hover:text-accent';

  return (
    <nav className="ml-auto flex items-center gap-3 sm:gap-5" aria-label="Utility">
      <SearchToggle className={iconClass} />
      <AccountLink isLoggedIn={isLoggedIn} className={iconClass} />
      <CartToggle cart={cart} className={iconClass} />
      <HeaderMenuMobileToggle className={iconClass} />
    </nav>
  );
}

function HeaderMenuMobileToggle({className}: {className: string}) {
  const {open} = useAside();
  return (
    <button
      type="button"
      className={`flex h-10 w-10 items-center justify-center lg:hidden ${className}`}
      onClick={() => open('mobile')}
      aria-label="Open menu"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="h-6 w-6"
        aria-hidden="true"
      >
        <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
      </svg>
    </button>
  );
}

function SearchToggle({className}: {className: string}) {
  const {open} = useAside();
  return (
    <button
      type="button"
      className={`hidden items-center gap-2 sm:flex ${className}`}
      onClick={() => open('search')}
      aria-label="Open search"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="h-5 w-5"
        aria-hidden="true"
      >
        <circle cx="11" cy="11" r="7" />
        <path strokeLinecap="round" d="M20 20l-3-3" />
      </svg>
      <span className="sr-only sm:not-sr-only sm:text-[0.65rem] sm:font-medium sm:uppercase sm:tracking-[0.16em]">
        Search
      </span>
    </button>
  );
}

function AccountLink({
  isLoggedIn,
  className,
}: Pick<HeaderProps, 'isLoggedIn'> & {className: string}) {
  return (
    <NavLink
      prefetch="intent"
      to="/account"
      className={`hidden items-center gap-2 sm:flex ${className}`}
      aria-label="Account"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="h-5 w-5"
        aria-hidden="true"
      >
        <circle cx="12" cy="8" r="4" />
        <path strokeLinecap="round" d="M4 20c1.5-4 6-6 8-6s6.5 2 8 6" />
      </svg>
      <Suspense fallback={<span className="text-[0.65rem] font-medium uppercase tracking-[0.16em]">Account</span>}>
        <Await resolve={isLoggedIn} errorElement={<span>Sign in</span>}>
          {(loggedIn) => (
            <span className="text-[0.65rem] font-medium uppercase tracking-[0.16em]">
              {loggedIn ? 'Account' : 'Sign in'}
            </span>
          )}
        </Await>
      </Suspense>
    </NavLink>
  );
}

function CartBadge({count, className}: {count: number; className: string}) {
  const {open} = useAside();
  const {publish, shop, cart, prevCart} = useAnalytics();

  return (
    <button
      type="button"
      className={`relative flex h-10 w-10 items-center justify-center ${className}`}
      onClick={() => {
        open('cart');
        void publish('cart_viewed', {
          cart,
          prevCart,
          shop,
          url: window.location.href || '',
        } as CartViewPayload);
      }}
      aria-label={`Open cart, ${count} items`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="h-5 w-5"
        aria-hidden="true"
      >
        <path strokeLinecap="round" d="M6 6h15l-1.5 9h-12z" />
        <path strokeLinecap="round" d="M6 6l-1-2H3M9 20a1 1 0 100-2 1 1 0 000 2zm8 0a1 1 0 100-2 1 1 0 000 2z" />
      </svg>
      {count > 0 && (
        <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1 text-[0.65rem] font-semibold text-brand">
          {count}
        </span>
      )}
    </button>
  );
}

function CartToggle({
  cart,
  className,
}: Pick<HeaderProps, 'cart'> & {className: string}) {
  return (
    <Suspense fallback={<CartBadge count={0} className={className} />}>
      <Await resolve={cart}>
        <CartBanner className={className} />
      </Await>
    </Suspense>
  );
}

function CartBanner({className}: {className: string}) {
  const originalCart = useAsyncValue() as CartApiQueryFragment | null;
  const cart = useOptimisticCart(originalCart);
  return <CartBadge count={cart?.totalQuantity ?? 0} className={className} />;
}
