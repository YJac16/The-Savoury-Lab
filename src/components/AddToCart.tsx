"use client";

import { useMemo, useState } from "react";
import { useCart } from "@/components/CartProvider";
import { formatZar, priceForQuantity } from "@/lib/products";
import type { Product } from "@/types";

export function AddToCart({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(product.tiers[0]?.quantity ?? product.minQuantity);
  const [added, setAdded] = useState(false);

  const priced = useMemo(
    () => priceForQuantity(product, quantity),
    [product, quantity],
  );

  const onAdd = () => {
    addItem(product.id, quantity);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1600);
  };

  return (
    <div className="add-to-cart">
      <label className="qty-label">
        Pack size
        <select
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
        >
          {product.tiers.map((tier) => (
            <option key={tier.quantity} value={tier.quantity}>
              {tier.quantity} {product.unitLabel} — {formatZar(tier.priceZar)}
            </option>
          ))}
        </select>
      </label>

      <div className="add-to-cart-row">
        <p className="line-price">
          {priced ? formatZar(priced.lineTotalZar) : "—"}
        </p>
        <button type="button" className="btn btn-primary" onClick={onAdd}>
          {added ? "Added" : "Add to cart"}
        </button>
      </div>
      <p className="min-note">Min {product.minQuantity} {product.unitLabel}</p>
    </div>
  );
}
