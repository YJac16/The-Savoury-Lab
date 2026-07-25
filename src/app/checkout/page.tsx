import type { Metadata } from "next";
import { CheckoutForm } from "@/components/CheckoutForm";

export const metadata: Metadata = {
  title: "Checkout",
};

export default function CheckoutPage() {
  return (
    <div className="section">
      <header className="page-intro">
        <h1>Checkout</h1>
        <p>
          Confirm your pack sizes and details. We will follow up on WhatsApp —
          Yoco payment links plug in when you are ready.
        </p>
      </header>
      <CheckoutForm />
    </div>
  );
}
