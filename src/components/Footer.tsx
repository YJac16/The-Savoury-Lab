import Link from "next/link";
import { Logo } from "@/components/Logo";
import { storeConfig } from "@/lib/store";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div className="footer-brand">
          <Logo size="sm" />
          <p>{storeConfig.tagline}</p>
          <p className="footer-meta">
            Based in {storeConfig.location}
            {storeConfig.halaal ? " · Halaal" : ""}
          </p>
        </div>

        <div className="footer-links">
          <h3>Order</h3>
          <Link href="/menu">Full menu</Link>
          <Link href="/cart">Your cart</Link>
          <Link href="/checkout">Checkout</Link>
        </div>

        <div className="footer-links">
          <h3>Connect</h3>
          <a href={`tel:${storeConfig.phone}`}>{storeConfig.phoneDisplay}</a>
          <a
            href={`https://wa.me/${storeConfig.whatsapp}`}
            target="_blank"
            rel="noreferrer"
          >
            WhatsApp
          </a>
          <a href={storeConfig.instagramUrl} target="_blank" rel="noreferrer">
            @{storeConfig.instagram}
          </a>
        </div>
      </div>
      <p className="footer-copy">
        © {new Date().getFullYear()} {storeConfig.name}. All items sold frozen.
      </p>
    </footer>
  );
}
