import Link from "next/link";
import { BrandWordmark } from "@/components/Logo";
import { ProductCard } from "@/components/ProductCard";
import { categories, getFeaturedProducts } from "@/lib/products";
import { storeConfig } from "@/lib/store";

export default function HomePage() {
  const featured = getFeaturedProducts();

  return (
    <>
      <section className="hero" aria-label="The Savoury Lab">
        <div className="hero-media" aria-hidden />
        <div className="hero-content">
          <BrandWordmark />
          <div className="hero-copy">
            <h1>Frozen savouries, made to order.</h1>
            <p>
              Samoosas, pies, spring rolls and more — handcrafted in Kenilworth,
              sold frozen for your freezer.
            </p>
            <div className="hero-actions">
              <Link href="/menu" className="btn btn-primary">
                Browse the menu
              </Link>
              <a
                href={`https://wa.me/${storeConfig.whatsapp}`}
                className="btn btn-secondary"
                style={{ borderColor: "rgba(247,244,239,0.55)", color: "#f7f4ef" }}
                target="_blank"
                rel="noreferrer"
              >
                WhatsApp us
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <h2>Favourites from the freezer</h2>
          <p>
            Pack sizes match our price list — choose your filling, add a pack,
            and checkout when you are ready.
          </p>
        </div>
        <div className="product-stack">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="feature-strip">
          <article>
            <h3>All items frozen</h3>
            <p>Built for your freezer — fry or bake when you need them.</p>
          </article>
          <article>
            <h3>Halaal</h3>
            <p>Handcrafted savouries you can serve with confidence.</p>
          </article>
          <article>
            <h3>Kenilworth based</h3>
            <p>Order on WhatsApp or online. Collection arranged with you.</p>
          </article>
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <h2>Shop by category</h2>
          <p>From cocktail pies to pastry by the kilo.</p>
        </div>
        <div className="category-list">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/menu#${category.id}`}
              className="category-link"
            >
              <strong>{category.name}</strong>
              <span>{category.minNote}</span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
