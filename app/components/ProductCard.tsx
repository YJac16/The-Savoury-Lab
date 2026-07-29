import {Link} from 'react-router';
import {Image, Money} from '@shopify/hydrogen';
import type {CurrencyCode} from '@shopify/hydrogen/storefront-api-types';
import {AddToCartButton} from '~/components/AddToCartButton';
import {useAside} from '~/components/Aside';
import {useVariantUrl} from '~/lib/variants';

export type ProductCardProduct = {
  id: string;
  handle: string;
  title: string;
  featuredImage?: {
    id?: string | null;
    url: string;
    altText?: string | null;
    width?: number | null;
    height?: number | null;
  } | null;
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: CurrencyCode;
    };
    maxVariantPrice?: {
      amount: string;
      currencyCode: CurrencyCode;
    };
  };
  selectedOrFirstAvailableVariant?: {
    id: string;
    availableForSale: boolean;
  } | null;
};

type ProductCardProps = {
  product: ProductCardProduct;
  loading?: 'eager' | 'lazy';
  className?: string;
};

export function ProductCard({
  product,
  loading = 'lazy',
  className = '',
}: ProductCardProps) {
  const variantUrl = useVariantUrl(product.handle);
  const image = product.featuredImage;
  const variant = product.selectedOrFirstAvailableVariant;
  const {open} = useAside();

  return (
    <article className={`group flex h-full flex-col ${className}`.trim()}>
      <Link
        to={variantUrl}
        prefetch="intent"
        className="mb-4 block overflow-hidden bg-neutral focus-visible:outline-offset-4"
      >
        <div className="relative aspect-square overflow-hidden bg-neutral-muted">
          {image ? (
            <Image
              alt={image.altText || product.title}
              aspectRatio="1/1"
              data={image}
              loading={loading}
              className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
              sizes="(min-width: 1280px) 300px, (min-width: 768px) 45vw, 100vw"
            />
          ) : (
            <div className="flex h-full items-center justify-center p-6 text-center">
              <span className="font-display text-lg text-brand/60">
                {product.title}
              </span>
            </div>
          )}
        </div>
      </Link>

      <div className="flex flex-1 flex-col gap-3">
        <Link
          to={variantUrl}
          prefetch="intent"
          className="font-display text-lg leading-snug text-brand transition-colors hover:text-accent"
        >
          {product.title}
        </Link>

        <p className="text-sm text-ink-muted">
          <Money data={product.priceRange.minVariantPrice} />
        </p>

        {variant?.availableForSale ? (
          <AddToCartButton
            onClick={() => open('cart')}
            lines={[
              {
                merchandiseId: variant.id,
                quantity: 1,
              },
            ]}
          >
            <span className="inline-flex min-h-11 w-full items-center justify-center border border-brand px-5 py-2.5 font-sans text-[0.7rem] font-medium uppercase tracking-[0.18em] text-brand transition-all duration-300 hover:border-accent hover:bg-accent hover:text-brand">
              Add to cart
            </span>
          </AddToCartButton>
        ) : (
          <Link
            to={variantUrl}
            className="inline-flex min-h-11 w-full items-center justify-center border border-neutral-muted px-5 py-2.5 font-sans text-[0.7rem] font-medium uppercase tracking-[0.18em] text-ink-muted transition-colors hover:border-brand hover:text-brand"
          >
            View product
          </Link>
        )}
      </div>
    </article>
  );
}
