import type { Metadata } from "next";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import { storeConfig } from "@/lib/store";

export const metadata: Metadata = {
  title: "About",
  description:
    "The Savoury Lab — handcrafted frozen savouries from Kenilworth. Halaal and made to order.",
};

export default function AboutPage() {
  return (
    <div className="section">
      <header className="page-intro">
        <h1>About the lab</h1>
        <p>{storeConfig.tagline}</p>
      </header>

      <div className="about-grid">
        <div className="prose">
          <p>
            The Savoury Lab makes frozen handcrafted savouries for busy
            households, gatherings, and anyone who wants proper pastry without
            the prep. Everything is made to order and sold frozen — ready for
            your fryer or oven when you need it.
          </p>
          <p>
            Based in {storeConfig.location}, we keep the classics close:
            samoosas, cocktail and medium pies, spring rolls, sausage rolls,
            quiche, pizzas, half moons, and pastry extras.
          </p>
          <p>
            {storeConfig.halaal
              ? "Our range is Halaal — so you can order for family tables with confidence."
              : null}
          </p>
          <p>
            Additional charges apply if you need items baked or fried. Prices
            are as listed on the menu and may change.
          </p>
          <div style={{ marginTop: "1.5rem" }}>
            <Link href="/menu" className="btn btn-primary">
              See the full menu
            </Link>
          </div>
        </div>
        <div>
          <Logo size="lg" href="" />
          <ul className="notes-list">
            <li>Location: {storeConfig.location}</li>
            <li>WhatsApp: {storeConfig.phoneDisplay}</li>
            <li>Instagram: @{storeConfig.instagram}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
