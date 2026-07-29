import type {ReactNode} from 'react';
import type {CartLineUpdateInput} from '@shopify/hydrogen/storefront-api-types';
import type {CartLayout, LineItemChildrenMap} from '~/components/CartMain';
import {CartForm, Image, type OptimisticCartLine} from '@shopify/hydrogen';
import {useVariantUrl} from '~/lib/variants';
import {Link} from 'react-router';
import {ProductPrice} from './ProductPrice';
import {useAside} from './Aside';
import type {CartApiQueryFragment} from 'storefrontapi.generated';

export type CartLine = OptimisticCartLine<CartApiQueryFragment>;

export function CartLineItem({
  layout,
  line,
  childrenMap,
}: {
  layout: CartLayout;
  line: CartLine;
  childrenMap: LineItemChildrenMap;
}) {
  const {id, merchandise} = line;
  const {product, title, image, selectedOptions} = merchandise;
  const lineItemUrl = useVariantUrl(product.handle, selectedOptions);
  const {close} = useAside();
  const lineItemChildren = childrenMap[id];
  const childrenLabelId = `cart-line-children-${id}`;

  return (
    <li className="cart-line py-5">
      <div className="cart-line-inner flex gap-4">
        {image && (
          <Link
            to={lineItemUrl}
            onClick={() => {
              if (layout === 'aside') close();
            }}
            className="shrink-0 overflow-hidden bg-neutral"
          >
            <Image
              alt={title}
              aspectRatio="1/1"
              data={image}
              height={88}
              loading="lazy"
              width={88}
              className="h-[88px] w-[88px] object-cover"
            />
          </Link>
        )}

        <div className="min-w-0 flex-1">
          <Link
            prefetch="intent"
            to={lineItemUrl}
            onClick={() => {
              if (layout === 'aside') close();
            }}
            className="font-display text-base leading-snug text-brand transition-colors hover:text-accent"
          >
            {product.title}
          </Link>

          {selectedOptions.length > 0 && (
            <p className="mt-1 text-xs text-ink-muted">
              {selectedOptions.map((option) => option.value).join(' · ')}
            </p>
          )}

          <div className="mt-2">
            <ProductPrice price={line?.cost?.totalAmount} />
          </div>

          <CartLineQuantity line={line} />
        </div>
      </div>

      {lineItemChildren ? (
        <div className="mt-3 pl-4">
          <p id={childrenLabelId} className="sr-only">
            Add-ons for {product.title}
          </p>
          <ul
            aria-labelledby={childrenLabelId}
            className="cart-line-children space-y-3 border-l border-neutral-muted pl-4"
          >
            {lineItemChildren.map((childLine) => (
              <CartLineItem
                childrenMap={childrenMap}
                key={childLine.id}
                line={childLine}
                layout={layout}
              />
            ))}
          </ul>
        </div>
      ) : null}
    </li>
  );
}

function CartLineQuantity({line}: {line: CartLine}) {
  if (!line || typeof line?.quantity === 'undefined') return null;
  const {id: lineId, quantity, isOptimistic} = line;
  const prevQuantity = Number(Math.max(0, quantity - 1).toFixed(0));
  const nextQuantity = Number((quantity + 1).toFixed(0));

  return (
    <div className="cart-line-quantity mt-4 flex items-center gap-3">
      <CartLineUpdateButton lines={[{id: lineId, quantity: prevQuantity}]}>
        <button
          type="button"
          aria-label="Decrease quantity"
          disabled={quantity <= 1 || !!isOptimistic}
          name="decrease-quantity"
          value={prevQuantity}
          className="flex h-9 w-9 items-center justify-center border border-neutral-muted text-brand transition-colors hover:border-accent disabled:opacity-40"
        >
          <span aria-hidden="true">−</span>
        </button>
      </CartLineUpdateButton>

      <span
        className="min-w-8 text-center text-sm font-medium tabular-nums"
        aria-live="polite"
      >
        {quantity}
      </span>

      <CartLineUpdateButton lines={[{id: lineId, quantity: nextQuantity}]}>
        <button
          type="button"
          aria-label="Increase quantity"
          name="increase-quantity"
          value={nextQuantity}
          disabled={!!isOptimistic}
          className="flex h-9 w-9 items-center justify-center border border-neutral-muted text-brand transition-colors hover:border-accent disabled:opacity-40"
        >
          <span aria-hidden="true">+</span>
        </button>
      </CartLineUpdateButton>

      <CartLineRemoveButton lineIds={[lineId]} disabled={!!isOptimistic} />
    </div>
  );
}

function CartLineRemoveButton({
  lineIds,
  disabled,
}: {
  lineIds: string[];
  disabled: boolean;
}) {
  return (
    <CartForm
      fetcherKey={getUpdateKey(lineIds)}
      route="/cart"
      action={CartForm.ACTIONS.LinesRemove}
      inputs={{lineIds}}
    >
      <button
        disabled={disabled}
        type="submit"
        className="ml-auto text-xs uppercase tracking-[0.12em] text-ink-muted transition-colors hover:text-error disabled:opacity-40"
        aria-label="Remove item"
      >
        Remove
      </button>
    </CartForm>
  );
}

function CartLineUpdateButton({
  children,
  lines,
}: {
  children: ReactNode;
  lines: CartLineUpdateInput[];
}) {
  const lineIds = lines.map((line) => line.id);

  return (
    <CartForm
      fetcherKey={getUpdateKey(lineIds)}
      route="/cart"
      action={CartForm.ACTIONS.LinesUpdate}
      inputs={{lines}}
    >
      {children}
    </CartForm>
  );
}

function getUpdateKey(lineIds: string[]) {
  return [CartForm.ACTIONS.LinesUpdate, ...lineIds].join('-');
}
