import type { Metadata } from "next";
import { storeConfig } from "@/lib/store";

export const metadata: Metadata = {
  title: "Contact",
  description: "Order The Savoury Lab frozen savouries via WhatsApp or Instagram.",
};

export default function ContactPage() {
  return (
    <div className="section">
      <header className="page-intro">
        <h1>Contact</h1>
        <p>
          Best way to reach us is WhatsApp. Tell us what you need from the menu
          and when you would like to collect.
        </p>
      </header>

      <div className="contact-grid">
        <ul className="contact-list">
          <li>
            <span>WhatsApp / phone</span>
            <br />
            <a href={`https://wa.me/${storeConfig.whatsapp}`}>
              {storeConfig.phoneDisplay}
            </a>
          </li>
          <li>
            <span>Instagram</span>
            <br />
            <a href={storeConfig.instagramUrl} target="_blank" rel="noreferrer">
              @{storeConfig.instagram}
            </a>
          </li>
          <li>
            <span>Base</span>
            <br />
            <strong>{storeConfig.location}</strong>
          </li>
        </ul>

        <div className="prose">
          <p>
            Prefer to build your order online? Add pack sizes on the menu, then
            checkout — we will send you a WhatsApp confirmation. When your Yoco
            payment links are ready, they can be connected without rebuilding
            the shop.
          </p>
          <div style={{ marginTop: "1.25rem", display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            <a
              className="btn btn-whatsapp"
              href={`https://wa.me/${storeConfig.whatsapp}?text=${encodeURIComponent("Hi The Savoury Lab! I'd like to place an order.")}`}
              target="_blank"
              rel="noreferrer"
            >
              Message on WhatsApp
            </a>
            <a className="btn btn-secondary" href="/menu">
              Browse menu
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
