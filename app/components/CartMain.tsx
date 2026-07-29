import {useOptimisticCart} from '@shopify/hydrogen';
import {Link} from 'react-router';
import type {CartApiQueryFragment} from 'storefrontapi.generated';
import {useAside} from '~/components/Aside';
import {CartLineItem, type CartLine} from '~/components/CartLineItem';
import {ProductCard, type ProductCardProduct} from '~/components/ProductCard';
import {CartDeliveryEstimate} from '~/components/CartDeliveryEstimate';
import {CartSummary} from './CartSummary';
import {BRAND} from '~/lib/brand';

export type CartLayout = 'page' | 'aside';

export type CartMainProps = {
  cart: CartApiQueryFragment | null;
  layout: CartLayout;
  recommendedProducts?: ProductCardProduct[];
};

export type LineItemChildrenMap = {[parentId: string]: CartLine[]};

function getLineItemChildrenMap(lines: CartLine[]): LineItemChildrenMap {
  const children: LineItemChildrenMap = {};
  for (const line of lines) {
    if ('parentRelationship' in line && line.parentRelationship?.parent) {
      const parentId = line.parentRelationship.parent.id;
      if (!children[parentId]) children[parentId] = [];
      children[parentId].push(line);
    }
    if ('lineComponents' in line) {
      const lineChildren = getLineItemChildrenMap(line.lineComponents);
      for (const [parentId, childIds] of Object.entries(lineChildren)) {
        if (!children[parentId]) children[parentId] = [];
        children[parentId].push(...childIds);
      }
    }
  }
  return children;
}

export function CartMain({
  layout,
  cart: originalCart,
  recommendedProducts = [],
}: CartMainProps) {
  const cart = useOptimisticCart(originalCart);

  const linesCount = Boolean(cart?.lines?.nodes?.length || 0);
  const withDiscount =
    cart &&
    Boolean(cart?.discountCodes?.filter((code) => code.applicable)?.length);
  const cartHasItems = cart?.totalQuantity ? cart.totalQuantity > 0 : false;
  const childrenMap = getLineItemChildrenMap(cart?.lines?.nodes ?? []);

  return (
    <section
      className={`cart-main flex h-full flex-col ${withDiscount ? 'with-discount' : ''}`}
      aria-label={layout === 'page' ? 'Cart page' : 'Cart drawer'}
    >
      <CartEmpty hidden={linesCount} layout={layout} />

      {linesCount && (
        <div className="cart-details flex flex-1 flex-col">
          <p
            id="cart-lines"
            className="sr-only"
          >
            Line items
          </p>
          <ul
            aria-labelledby="cart-lines"
            className="flex-1 divide-y divide-neutral-muted overflow-y-auto"
          >
            {(cart?.lines?.nodes ?? []).map((line) => {
              if (
                'parentRelationship' in line &&
                line.parentRelationship?.parent
              ) {
                return null;
              }
              return (
                <CartLineItem
                  key={line.id}
                  line={line}
                  layout={layout}
                  childrenMap={childrenMap}
                />
              );
            })}
          </ul>

          {cartHasItems && (
            <CartDeliveryEstimate
              className={layout === 'page' ? 'mt-6' : 'mt-4'}
            />
          )}

          {recommendedProducts.length > 0 && (
            <section
              className="mt-6 border-t border-neutral-muted pt-6"
              aria-labelledby="cart-upsell-heading"
            >
              <h3
                id="cart-upsell-heading"
                className="mb-4 font-display text-lg"
              >
                Customers also bought
              </h3>
              <ul
                className={
                  layout === 'page'
                    ? 'grid grid-cols-2 gap-6 sm:grid-cols-4'
                    : 'grid grid-cols-2 gap-4'
                }
              >
                {recommendedProducts
                  .slice(0, layout === 'page' ? 4 : 2)
                  .map((product) => (
                    <li key={product.id}>
                      <ProductCard product={product} />
                    </li>
                  ))}
              </ul>
            </section>
          )}

          {cartHasItems && <CartSummary cart={cart} layout={layout} />}
        </div>
      )}
    </section>
  );
}

function CartEmpty({
  hidden = false,
  layout,
}: {
  hidden: boolean;
  layout?: CartLayout;
}) {
  const {close} = useAside();

  if (hidden) return null;

  return (
    <div className="flex flex-col items-center py-12 text-center">
      <p className="font-display text-xl text-brand">Your cart is empty</p>
      <p className="mt-3 max-w-xs text-sm text-ink-muted">
        Discover handcrafted frozen savouries from {BRAND.name}.
      </p>
      <Link
        to="/collections/all"
        onClick={layout === 'aside' ? close : undefined}
        prefetch="intent"
        className="btn-primary mt-8"
      >
        Continue shopping
      </Link>
    </div>
  );
}
