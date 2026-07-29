import {ProductCard, type ProductCardProduct} from '~/components/ProductCard';
import {FadeIn} from '~/components/ui/FadeIn';

type BestSellersProps = {
  products: ProductCardProduct[];
  className?: string;
  heading?: string;
};

export function BestSellers({
  products,
  className = '',
  heading = 'Best sellers',
}: BestSellersProps) {
  if (!products.length) {
    return null;
  }

  return (
    <section className={`section-pad bg-brand-inverse ${className}`.trim()}>
      <div className="container-premium">
        <FadeIn className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow mb-3">Shop favourites</p>
            <h2 className="text-balance text-3xl sm:text-4xl">{heading}</h2>
          </div>
        </FadeIn>

        <ul className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product, index) => (
            <li key={product.id}>
              <FadeIn delay={index * 0.06}>
                <ProductCard
                  product={product}
                  loading={index < 4 ? 'eager' : 'lazy'}
                />
              </FadeIn>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
