"use client";

import Link from "next/link";
import { useCart } from "@/components/CartProvider";
import { formatZar, getProductById, priceForQuantity } from "@/lib/products";

export function CartView() {
  const { items, subtotal, updateQuantity, removeItem } = useCart();

  if (!items.length) {
    return (
      <div className="empty-state">
        <h1>Cart</h1>
        <p>No frozen packs selected yet.</p>
        <Link className="btn btn-primary" href="/menu">
          Shop the menu
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <header className="page-intro">
        <h1>Cart</h1>
        <p>Pack sizes follow our minimums from the price list.</p>
      </header>

      <ul className="cart-list">
        {items.map((item) => {
          const product = getProductById(item.productId);
          if (!product) return null;
          const priced = priceForQuantity(product, item.quantity);
          return (
            <li key={item.productId} className="cart-line">
              <div>
                <h2>{product.name}</h2>
                <label>
                  Quantity
                  <select
                    value={item.quantity}
                    onChange={(e) =>
                      updateQuantity(item.productId, Number(e.target.value))
                    }
                  >
                    {product.tiers.map((tier) => (
                      <option key={tier.quantity} value={tier.quantity}>
                        {tier.quantity} {product.unitLabel} —{" "}
                        {formatZar(tier.priceZar)}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              <div className="cart-line-actions">
                <p>{priced ? formatZar(priced.lineTotalZar) : "—"}</p>
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={() => removeItem(item.productId)}
                >
                  Remove
                </button>
              </div>
            </li>
          );
        })}
      </ul>

      <div className="cart-footer">
        <p>
          Subtotal <strong>{formatZar(subtotal)}</strong>
        </p>
        <Link className="btn btn-primary" href="/checkout">
          Checkout
        </Link>
      </div>
    </div>
  );
}
