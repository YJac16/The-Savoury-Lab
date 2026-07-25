import Link from "next/link";
import { AddToCart } from "@/components/AddToCart";
import { formatZar, getCategory } from "@/lib/products";
import type { Product } from "@/types";

export function ProductCard({ product }: { product: Product }) {
  const category = getCategory(product.category);
  const from = product.tiers[0];

  return (
    <article className="product-row">
      <div className="product-row-copy">
        <p className="product-kicker">{category?.name}</p>
        <h3>
          <Link href={`/menu#${product.slug}`}>{product.name}</Link>
        </h3>
        <p>{product.description}</p>
        {from ? (
          <p className="product-from">
            From {formatZar(from.priceZar)} / {from.quantity} {product.unitLabel}
          </p>
        ) : null}
      </div>
      <AddToCart product={product} />
    </article>
  );
}
