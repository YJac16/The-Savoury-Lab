/**
 * Static food catalogue used while PUBLIC_STORE_DOMAIN points at mock.shop.
 * Built from brand CATEGORIES + menu price sheets. Swap to Shopify when a
 * real storefront is linked.
 */

import {CATEGORIES, BRAND} from '~/lib/brand';
import {
  MENU_EXTRAS,
  MENU_SECTIONS,
  formatMenuPrice,
  type MenuSection,
} from '~/lib/menu';
import type {ProductCardProduct} from '~/components/ProductCard';

export type StaticImage = {
  id: string;
  url: string;
  altText: string;
  width: number;
  height: number;
};

export type StaticCollection = {
  id: string;
  handle: string;
  title: string;
  description: string;
  image: StaticImage;
  products: {
    nodes: ProductCardProduct[];
    pageInfo: {
      hasPreviousPage: boolean;
      hasNextPage: boolean;
      startCursor: string | null;
      endCursor: string | null;
    };
  };
};

export type StaticProduct = ProductCardProduct & {
  description: string;
  collectionHandle: string;
  collectionTitle: string;
  packPrices: {qty: number; price: number; label: string}[];
  minNote?: string;
  subtitle?: string;
  orderViaWhatsApp: true;
};

const CATALOGUE_IMAGE_SIZE = 1200;

/** Map menu section ids → brand category handles (image + collection URL). */
const SECTION_TO_CATEGORY: Record<string, string> = {
  samoosas: 'samoosas',
  'spring-rolls': 'spring-rolls',
  'cocktail-pies': 'cocktail-pies',
  'medium-pies': 'medium-pies',
  'sausage-rolls-cocktail': 'sausage-rolls',
  'sausage-rolls-12cm': 'sausage-rolls',
  quiche: 'quiche',
  pizzas: 'mini-pizzas',
  'half-moons': 'half-moons',
};

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export function isStaticCatalogue(env: {
  PUBLIC_STORE_DOMAIN?: string;
}): boolean {
  return (env.PUBLIC_STORE_DOMAIN ?? '').includes('mock.shop');
}

export function catalogueImagePath(handle: string): string {
  return `/images/catalogue/${handle}.jpg`;
}

function makeImage(handle: string, altText: string): StaticImage {
  return {
    id: `static-image-${handle}`,
    url: catalogueImagePath(handle),
    altText,
    width: CATALOGUE_IMAGE_SIZE,
    height: CATALOGUE_IMAGE_SIZE,
  };
}

function categoryByHandle(handle: string) {
  return CATEGORIES.find((category) => category.handle === handle);
}

function productTitle(section: MenuSection, itemName: string): string {
  if (section.subtitle) {
    return `${section.title} (${section.subtitle}) — ${itemName}`;
  }
  if (itemName.toLowerCase() === section.title.toLowerCase()) {
    return section.title;
  }
  return `${section.title} — ${itemName}`;
}

function buildProducts(): StaticProduct[] {
  const products: StaticProduct[] = [];

  for (const section of MENU_SECTIONS) {
    const collectionHandle =
      SECTION_TO_CATEGORY[section.id] ?? section.id;
    const category = categoryByHandle(collectionHandle);
    const image = makeImage(
      collectionHandle,
      category?.title ?? section.title,
    );

    for (const item of section.items) {
      const handle = `${section.id}-${slugify(item.name)}`;
      const minPrice = Math.min(...item.prices.map((pack) => pack.price));
      const maxPrice = Math.max(...item.prices.map((pack) => pack.price));
      const title = productTitle(section, item.name);

      products.push({
        id: `static-product-${handle}`,
        handle,
        title,
        description:
          category?.description ??
          `Handcrafted Halaal ${section.title.toLowerCase()} from ${BRAND.name}. Sold frozen.`,
        collectionHandle,
        collectionTitle: category?.title ?? section.title,
        featuredImage: image,
        priceRange: {
          minVariantPrice: {
            amount: String(minPrice),
            currencyCode: 'ZAR',
          },
          maxVariantPrice: {
            amount: String(maxPrice),
            currencyCode: 'ZAR',
          },
        },
        selectedOrFirstAvailableVariant: null,
        packPrices: item.prices.map((pack) => ({
          qty: pack.qty,
          price: pack.price,
          label: `${pack.qty} pcs — ${formatMenuPrice(pack.price)}`,
        })),
        minNote: section.minNote,
        subtitle: section.subtitle,
        orderViaWhatsApp: true,
      });
    }
  }

  for (const extra of MENU_EXTRAS) {
    const handle =
      extra.name.toLowerCase().includes('samoosa')
        ? 'samoosa-leaves'
        : extra.name.toLowerCase().includes('butter')
          ? 'pastry-butter'
          : 'pastry';
    const imageHandle = handle.startsWith('pastry') ? 'pastry' : handle;
    const category = categoryByHandle(imageHandle);
    const image = makeImage(imageHandle, extra.name);
    const priceMatch = extra.priceLabel.match(/R([\d.]+)/);
    const amount = priceMatch ? priceMatch[1] : '0';

    products.push({
      id: `static-product-${handle}`,
      handle,
      title: extra.name,
      description:
        category?.description ??
        `${extra.name} from ${BRAND.name}. ${extra.priceLabel}.`,
      collectionHandle: imageHandle,
      collectionTitle: category?.title ?? extra.name,
      featuredImage: image,
      priceRange: {
        minVariantPrice: {
          amount,
          currencyCode: 'ZAR',
        },
      },
      selectedOrFirstAvailableVariant: null,
      packPrices: [{qty: 1, price: Number(amount), label: extra.priceLabel}],
      orderViaWhatsApp: true,
    });
  }

  return products;
}

const PRODUCTS = buildProducts();

export function getAllProducts(): StaticProduct[] {
  return PRODUCTS;
}

export function getProduct(handle: string): StaticProduct | undefined {
  return PRODUCTS.find((product) => product.handle === handle);
}

export function getCollections(): StaticCollection[] {
  return CATEGORIES.map((category) => {
    const nodes = PRODUCTS.filter(
      (product) => product.collectionHandle === category.handle,
    );
    return {
      id: `static-collection-${category.handle}`,
      handle: category.handle,
      title: category.title,
      description: category.description,
      image: makeImage(category.handle, category.title),
      products: {
        nodes,
        pageInfo: {
          hasPreviousPage: false,
          hasNextPage: false,
          startCursor: null,
          endCursor: null,
        },
      },
    };
  });
}

export function getCollection(handle: string): StaticCollection | undefined {
  return getCollections().find((collection) => collection.handle === handle);
}

export function getFeaturedCollections() {
  return getCollections().map((collection) => ({
    handle: collection.handle,
    title: collection.title,
    image: collection.image,
  }));
}

export function getBestSellers(limit = 8): ProductCardProduct[] {
  return PRODUCTS.slice(0, limit);
}

export function searchStaticProducts(query: string): ProductCardProduct[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return PRODUCTS.filter(
    (product) =>
      product.title.toLowerCase().includes(q) ||
      product.collectionTitle.toLowerCase().includes(q) ||
      product.description.toLowerCase().includes(q),
  );
}

export function asProductConnection(products: ProductCardProduct[]) {
  return {
    nodes: products,
    pageInfo: {
      hasPreviousPage: false,
      hasNextPage: false,
      startCursor: null,
      endCursor: null,
    },
  };
}

export function asCollectionConnection(collections: StaticCollection[]) {
  return {
    nodes: collections.map(({id, handle, title, image}) => ({
      id,
      handle,
      title,
      image,
    })),
    pageInfo: {
      hasPreviousPage: false,
      hasNextPage: false,
      startCursor: null,
      endCursor: null,
    },
  };
}
