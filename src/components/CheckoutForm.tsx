"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { useCart } from "@/components/CartProvider";
import { formatZar, getProductById, priceForQuantity } from "@/lib/products";
import type { Order } from "@/types";

export function CheckoutForm() {
  const router = useRouter();
  const { items, subtotal, clear } = useCart();
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setSubmitting(true);

    const form = new FormData(event.currentTarget);
    const payload = {
      items,
      customer: {
        name: String(form.get("name") || ""),
        phone: String(form.get("phone") || ""),
        email: String(form.get("email") || ""),
        preferredCollection: String(form.get("preferredCollection") || ""),
        notes: String(form.get("notes") || ""),
      },
    };

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json()) as { order?: Order; error?: string };
      if (!res.ok || !data.order) {
        throw new Error(data.error || "Order failed");
      }

      clear();
      const params = new URLSearchParams({
        id: data.order.id,
        wa: data.order.whatsappUrl,
      });
      if (data.order.yocoPaymentLink) {
        params.set("yoco", data.order.yocoPaymentLink);
      }
      router.push(`/order/success?${params.toString()}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setSubmitting(false);
    }
  };

  if (!items.length) {
    return (
      <div className="empty-state">
        <h2>Your cart is empty</h2>
        <p>Browse the menu and add pack sizes before checkout.</p>
        <a className="btn btn-primary" href="/menu">
          View menu
        </a>
      </div>
    );
  }

  return (
    <div className="checkout-layout">
      <form className="checkout-form" onSubmit={onSubmit}>
        <h2>Your details</h2>
        <label>
          Name
          <input name="name" required autoComplete="name" />
        </label>
        <label>
          Phone / WhatsApp
          <input name="phone" required autoComplete="tel" placeholder="065…" />
        </label>
        <label>
          Email <span className="optional">(optional)</span>
          <input name="email" type="email" autoComplete="email" />
        </label>
        <label>
          Preferred collection
          <input
            name="preferredCollection"
            placeholder="e.g. Friday afternoon, Kenilworth"
          />
        </label>
        <label>
          Notes <span className="optional">(optional)</span>
          <textarea
            name="notes"
            rows={3}
            placeholder="Allergies, baked/fried upgrade, etc."
          />
        </label>

        {error ? <p className="form-error">{error}</p> : null}

        <button type="submit" className="btn btn-primary" disabled={submitting}>
          {submitting ? "Placing order…" : "Place order"}
        </button>
        <p className="checkout-hint">
          Yoco payment links can be added later. For now we confirm orders on
          WhatsApp.
        </p>
      </form>

      <aside className="checkout-summary">
        <h2>Order summary</h2>
        <ul>
          {items.map((item) => {
            const product = getProductById(item.productId);
            if (!product) return null;
            const priced = priceForQuantity(product, item.quantity);
            return (
              <li key={item.productId}>
                <span>
                  {product.name}
                  <small>
                    × {item.quantity} {product.unitLabel}
                  </small>
                </span>
                <span>{priced ? formatZar(priced.lineTotalZar) : "—"}</span>
              </li>
            );
          })}
        </ul>
        <p className="summary-total">
          <span>Total</span>
          <strong>{formatZar(subtotal)}</strong>
        </p>
      </aside>
    </div>
  );
}
