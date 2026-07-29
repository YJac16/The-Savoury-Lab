import {
  DELIVERY_ZONES,
  FROZEN_FULFILMENT_NOTE,
  FULFILLMENT_OPTIONS,
} from '~/lib/brand';

type CartDeliveryEstimateProps = {
  className?: string;
};

/**
 * Soft delivery guidance shown in cart.
 * Exact collection/delivery slots are selected in Shopify Checkout.
 */
export function CartDeliveryEstimate({
  className = '',
}: CartDeliveryEstimateProps) {
  return (
    <section
      className={`border-t border-neutral-muted pt-4 ${className}`.trim()}
      aria-labelledby="cart-delivery-heading"
    >
      <h3
        id="cart-delivery-heading"
        className="text-xs font-medium uppercase tracking-[0.14em] text-brand"
      >
        Frozen fulfilment
      </h3>
      <p className="mt-2 text-xs leading-relaxed text-ink-muted">
        {FULFILLMENT_OPTIONS.join(' or ')} — {FROZEN_FULFILMENT_NOTE}
      </p>
      <ul className="mt-3 flex flex-wrap gap-x-3 gap-y-1">
        {DELIVERY_ZONES.map((zone) => (
          <li
            key={zone}
            className="text-[0.65rem] uppercase tracking-[0.12em] text-ink-muted"
          >
            {zone}
          </li>
        ))}
      </ul>
    </section>
  );
}
