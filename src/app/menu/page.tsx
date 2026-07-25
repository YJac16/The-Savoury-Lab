import type { Metadata } from "next";
import { ProductCard } from "@/components/ProductCard";
import { categories, getProductsByCategory } from "@/lib/products";
import { storeConfig } from "@/lib/store";

export const metadata: Metadata = {
  title: "Menu & prices",
  description:
    "Full The Savoury Lab price list — samoosas, pies, spring rolls, quiche, pizzas and extras.",
};

export default function MenuPage() {
  return (
    <div className="section">
      <header className="page-intro">
        <p className="halaal-pill">Halaal · All items sold frozen</p>
        <h1>Menu & prices</h1>
        <p>
          {storeConfig.tagline}. Based in {storeConfig.location}. Minimums apply
          per filling — select a pack size to add to cart.
        </p>
      </header>

      {categories.map((category) => {
        const items = getProductsByCategory(category.id);
        return (
          <section
            key={category.id}
            id={category.id}
            className="menu-category"
          >
            <div className="menu-category-head">
              <div>
                <h2>{category.name}</h2>
                <p>{category.blurb}</p>
              </div>
              <p className="min-note">{category.minNote}</p>
            </div>
            <div className="product-stack">
              {items.map((product) => (
                <div key={product.id} id={product.slug}>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </section>
        );
      })}

      <ul className="notes-list">
        {storeConfig.notes.map((note) => (
          <li key={note}>{note}</li>
        ))}
      </ul>
    </div>
  );
}
