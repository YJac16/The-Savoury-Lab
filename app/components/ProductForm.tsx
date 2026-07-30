import {Link, useNavigate} from 'react-router';
import {type MappedProductOptions} from '@shopify/hydrogen';
import type {
  Maybe,
  ProductOptionValueSwatch,
} from '@shopify/hydrogen/storefront-api-types';
import {AddToCartButton} from './AddToCartButton';
import {useAside} from './Aside';
import {ProductPrice} from './ProductPrice';
import type {ProductFragment} from 'storefrontapi.generated';

export function ProductForm({
  productOptions,
  selectedVariant,
}: {
  productOptions: MappedProductOptions[];
  selectedVariant: ProductFragment['selectedOrFirstAvailableVariant'];
}) {
  const navigate = useNavigate();
  const {open} = useAside();

  return (
    <div className="product-form space-y-8">
      {selectedVariant?.price && (
        <div className="border-b border-neutral-muted pb-6">
          <p className="eyebrow mb-2">Price</p>
          <ProductPrice
            price={selectedVariant.price}
            compareAtPrice={selectedVariant.compareAtPrice}
          />
        </div>
      )}

      {productOptions.map((option) => {
        if (option.optionValues.length === 1) return null;

        return (
          <fieldset className="product-options" key={option.name}>
            <legend className="mb-4 text-xs font-medium uppercase tracking-[0.14em] text-brand">
              {option.name}
              {selectedVariant?.selectedOptions?.find(
                (item) => item.name === option.name,
              )?.value && (
                <span className="ml-2 normal-case tracking-normal text-ink-muted">
                  —{' '}
                  {
                    selectedVariant.selectedOptions.find(
                      (item) => item.name === option.name,
                    )?.value
                  }
                </span>
              )}
            </legend>
            <div className="flex flex-wrap gap-2">
              {option.optionValues.map((value) => {
                const {
                  name,
                  handle,
                  variantUriQuery,
                  selected,
                  available,
                  exists,
                  isDifferentProduct,
                  swatch,
                } = value;

                const pillClass = [
                  'inline-flex min-h-11 min-w-14 items-center justify-center border px-4 py-2 text-sm font-medium transition-all duration-300',
                  selected
                    ? 'border-accent bg-accent/10 text-brand ring-1 ring-accent'
                    : 'border-neutral-muted text-brand hover:border-accent',
                  !available || !exists ? 'cursor-not-allowed opacity-40' : '',
                ]
                  .filter(Boolean)
                  .join(' ');

                const label = <ProductOptionSwatch swatch={swatch} name={name} />;

                if (isDifferentProduct) {
                  return (
                    <Link
                      className={pillClass}
                      key={option.name + name}
                      prefetch="intent"
                      preventScrollReset
                      replace
                      to={`/products/${handle}?${variantUriQuery}`}
                      aria-label={`${option.name}: ${name}`}
                      aria-current={selected ? 'true' : undefined}
                    >
                      {label}
                    </Link>
                  );
                }

                return (
                  <button
                    type="button"
                    className={pillClass}
                    key={option.name + name}
                    disabled={!exists}
                    aria-label={`${option.name}: ${name}`}
                    aria-pressed={selected}
                    onClick={() => {
                      if (!selected) {
                        void navigate(`?${variantUriQuery}`, {
                          replace: true,
                          preventScrollReset: true,
                        });
                      }
                    }}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </fieldset>
        );
      })}

      <div className="hidden lg:block">
        <AddToCartButton
          disabled={!selectedVariant || !selectedVariant.availableForSale}
          onClick={() => open('cart')}
          lines={
            selectedVariant
              ? [
                  {
                    merchandiseId: selectedVariant.id,
                    quantity: 1,
                    selectedVariant,
                  },
                ]
              : []
          }
        >
          <span className="btn-primary w-full min-h-12">
            {selectedVariant?.availableForSale ? 'Add to cart' : 'Sold out'}
          </span>
        </AddToCartButton>
      </div>
    </div>
  );
}

function ProductOptionSwatch({
  swatch,
  name,
}: {
  swatch?: Maybe<ProductOptionValueSwatch> | undefined;
  name: string;
}) {
  const image = swatch?.image?.previewImage?.url;
  const color = swatch?.color;

  if (image) {
    return (
      <img
        src={image}
        alt={name}
        className="h-8 w-8 rounded-full object-cover"
      />
    );
  }

  if (color) {
    return (
      <span
        aria-label={name}
        className="inline-flex h-8 w-8 rounded-full border border-neutral-muted"
        style={{backgroundColor: color}}
      />
    );
  }

  return <span>{name}</span>;
}
