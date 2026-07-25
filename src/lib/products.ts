import type { Category, Product } from "@/types";

export const categories: Category[] = [
  {
    id: "samoosas",
    name: "Samoosas",
    blurb: "Crisp pastry triangles, frozen ready for your fryer.",
    minNote: "Minimum 25 per filling",
  },
  {
    id: "spring-rolls",
    name: "Spring Rolls",
    blurb: "Golden rolls packed with savoury chicken.",
    minNote: "Minimum 25 per filling",
  },
  {
    id: "pies-cocktail",
    name: "Cocktail Pies",
    blurb: "Party-size pies for platters and freezers.",
    minNote: "Minimum 25 per filling",
  },
  {
    id: "pies-medium",
    name: "Medium Pies",
    blurb: "Heartier pies for weeknight dinners.",
    minNote: "Minimum 6 per filling",
  },
  {
    id: "sausage-rolls-cocktail",
    name: "Cocktail Sausage Rolls",
    blurb: "Bite-size rolls for grazing tables.",
    minNote: "Minimum 25 per filling",
  },
  {
    id: "sausage-rolls-12cm",
    name: "12cm Sausage Rolls",
    blurb: "Proper sausage rolls with a flaky wrap.",
    minNote: "Minimum 6 per filling",
  },
  {
    id: "quiche",
    name: "Quiche",
    blurb: "Baked-style fillings, frozen for easy hosting.",
    minNote: "Minimum 25 per filling",
  },
  {
    id: "pizzas",
    name: "Pizzas",
    blurb: "Freezer pizzas with bold savoury toppings.",
    minNote: "Minimum 25 per filling",
  },
  {
    id: "half-moons",
    name: "Half Moons",
    blurb: "Half-moon pastries, chicken or steak.",
    minNote: "Minimum 25 per filling",
  },
  {
    id: "extras",
    name: "Extras",
    blurb: "Pastry and leaves for your own kitchen.",
    minNote: "Sold by weight or pack",
  },
];

function product(
  partial: Omit<Product, "slug"> & { slug?: string },
): Product {
  return {
    ...partial,
    slug:
      partial.slug ??
      `${partial.category}-${(partial.filling || partial.name)
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "")}`,
  };
}

export const products: Product[] = [
  product({
    id: "samoosa-mince",
    name: "Mince Samoosas",
    category: "samoosas",
    filling: "Mince",
    description: "Classic mince filling in crisp samoosa pastry.",
    minQuantity: 25,
    unitLabel: "units",
    featured: true,
    tiers: [
      { quantity: 25, priceZar: 175 },
      { quantity: 50, priceZar: 350 },
      { quantity: 100, priceZar: 700 },
    ],
  }),
  product({
    id: "samoosa-chicken",
    name: "Chicken Samoosas",
    category: "samoosas",
    filling: "Chicken",
    description: "Spiced chicken samoosas — a freezer staple.",
    minQuantity: 25,
    unitLabel: "units",
    featured: true,
    tiers: [
      { quantity: 25, priceZar: 175 },
      { quantity: 50, priceZar: 350 },
      { quantity: 100, priceZar: 700 },
    ],
  }),
  product({
    id: "samoosa-cheese",
    name: "Cheese Samoosas",
    category: "samoosas",
    filling: "Cheese",
    description: "Rich cheese filling for a vegetarian favourite.",
    minQuantity: 25,
    unitLabel: "units",
    tiers: [
      { quantity: 25, priceZar: 200 },
      { quantity: 50, priceZar: 400 },
      { quantity: 100, priceZar: 800 },
    ],
  }),
  product({
    id: "samoosa-potato",
    name: "Potato Samoosas",
    category: "samoosas",
    filling: "Potato",
    description: "Comforting potato filling, ready to fry from frozen.",
    minQuantity: 25,
    unitLabel: "units",
    tiers: [
      { quantity: 25, priceZar: 175 },
      { quantity: 50, priceZar: 350 },
      { quantity: 100, priceZar: 700 },
    ],
  }),
  product({
    id: "samoosa-veg",
    name: "Veg Samoosas",
    category: "samoosas",
    filling: "Veg",
    description: "Mixed vegetable samoosas at our best value tier.",
    minQuantity: 25,
    unitLabel: "units",
    tiers: [
      { quantity: 25, priceZar: 162.5 },
      { quantity: 50, priceZar: 325 },
      { quantity: 100, priceZar: 650 },
    ],
  }),
  product({
    id: "spring-roll-chicken",
    name: "Chicken Spring Rolls",
    category: "spring-rolls",
    filling: "Chicken",
    description: "Crunchy spring rolls filled with seasoned chicken.",
    minQuantity: 25,
    unitLabel: "units",
    featured: true,
    tiers: [
      { quantity: 25, priceZar: 212.5 },
      { quantity: 50, priceZar: 425 },
      { quantity: 100, priceZar: 850 },
    ],
  }),
  product({
    id: "pie-cocktail-steak",
    name: "Cocktail Steak Pies",
    category: "pies-cocktail",
    filling: "Steak",
    description: "Mini steak pies for platters and parties.",
    minQuantity: 25,
    unitLabel: "units",
    featured: true,
    tiers: [
      { quantity: 25, priceZar: 212.5 },
      { quantity: 50, priceZar: 425 },
      { quantity: 100, priceZar: 850 },
    ],
  }),
  product({
    id: "pie-cocktail-mince",
    name: "Cocktail Mince Pies",
    category: "pies-cocktail",
    filling: "Mince",
    description: "Cocktail mince pies — made to order, sold frozen.",
    minQuantity: 25,
    unitLabel: "units",
    tiers: [
      { quantity: 25, priceZar: 175 },
      { quantity: 50, priceZar: 350 },
      { quantity: 100, priceZar: 700 },
    ],
  }),
  product({
    id: "pie-cocktail-chicken",
    name: "Cocktail Chicken Pies",
    category: "pies-cocktail",
    filling: "Chicken",
    description: "Bite-size chicken pies for easy entertaining.",
    minQuantity: 25,
    unitLabel: "units",
    tiers: [
      { quantity: 25, priceZar: 187.5 },
      { quantity: 50, priceZar: 375 },
      { quantity: 100, priceZar: 750 },
    ],
  }),
  product({
    id: "pie-medium-steak",
    name: "Medium Steak Pies",
    category: "pies-medium",
    filling: "Steak",
    description: "Medium steak pies for proper meals.",
    minQuantity: 6,
    unitLabel: "units",
    tiers: [
      { quantity: 6, priceZar: 150 },
      { quantity: 12, priceZar: 280 },
    ],
  }),
  product({
    id: "pie-medium-mince",
    name: "Medium Mince Pies",
    category: "pies-medium",
    filling: "Mince",
    description: "Medium mince pies with flaky pastry.",
    minQuantity: 6,
    unitLabel: "units",
    tiers: [
      { quantity: 6, priceZar: 140 },
      { quantity: 12, priceZar: 260 },
    ],
  }),
  product({
    id: "pie-medium-chicken",
    name: "Medium Chicken Pies",
    category: "pies-medium",
    filling: "Chicken",
    description: "Medium chicken pies — freezer-friendly portions.",
    minQuantity: 6,
    unitLabel: "units",
    tiers: [
      { quantity: 6, priceZar: 150 },
      { quantity: 12, priceZar: 280 },
    ],
  }),
  product({
    id: "sausage-roll-cocktail",
    name: "Cocktail Sausage Rolls",
    category: "sausage-rolls-cocktail",
    description: "Cocktail sausage rolls for grazing boards.",
    minQuantity: 25,
    unitLabel: "units",
    tiers: [
      { quantity: 25, priceZar: 150 },
      { quantity: 50, priceZar: 300 },
      { quantity: 100, priceZar: 600 },
    ],
  }),
  product({
    id: "sausage-roll-12cm",
    name: "12cm Sausage Rolls",
    category: "sausage-rolls-12cm",
    description: "12cm sausage rolls with a generous filling.",
    minQuantity: 6,
    unitLabel: "units",
    tiers: [
      { quantity: 6, priceZar: 140 },
      { quantity: 12, priceZar: 260 },
    ],
  }),
  product({
    id: "quiche-chicken",
    name: "Chicken Quiche",
    category: "quiche",
    filling: "Chicken",
    description: "Chicken quiche portions, sold frozen.",
    minQuantity: 25,
    unitLabel: "units",
    tiers: [
      { quantity: 25, priceZar: 200 },
      { quantity: 50, priceZar: 400 },
      { quantity: 100, priceZar: 800 },
    ],
  }),
  product({
    id: "quiche-spinach-feta",
    name: "Spinach & Feta Quiche",
    category: "quiche",
    filling: "Spinach & Feta",
    description: "Spinach and feta quiche — a crowd-pleasing classic.",
    minQuantity: 25,
    unitLabel: "units",
    featured: true,
    tiers: [
      { quantity: 25, priceZar: 175 },
      { quantity: 50, priceZar: 350 },
      { quantity: 100, priceZar: 700 },
    ],
  }),
  product({
    id: "pizza-vienna",
    name: "Vienna Pizza",
    category: "pizzas",
    filling: "Vienna",
    description: "Frozen pizza topped with vienna.",
    minQuantity: 25,
    unitLabel: "units",
    tiers: [
      { quantity: 25, priceZar: 250 },
      { quantity: 50, priceZar: 500 },
      { quantity: 100, priceZar: 1000 },
    ],
  }),
  product({
    id: "pizza-chicken",
    name: "Chicken Pizza",
    category: "pizzas",
    filling: "Chicken",
    description: "Frozen chicken pizza for easy nights in.",
    minQuantity: 25,
    unitLabel: "units",
    tiers: [
      { quantity: 25, priceZar: 300 },
      { quantity: 50, priceZar: 600 },
      { quantity: 100, priceZar: 1200 },
    ],
  }),
  product({
    id: "pizza-steak",
    name: "Steak Pizza",
    category: "pizzas",
    filling: "Steak",
    description: "Frozen steak pizza with a hearty topping.",
    minQuantity: 25,
    unitLabel: "units",
    tiers: [
      { quantity: 25, priceZar: 325 },
      { quantity: 50, priceZar: 650 },
      { quantity: 100, priceZar: 1300 },
    ],
  }),
  product({
    id: "half-moon-chicken",
    name: "Chicken Half Moons",
    category: "half-moons",
    filling: "Chicken",
    description: "Half-moon pastries filled with chicken.",
    minQuantity: 25,
    unitLabel: "units",
    tiers: [
      { quantity: 25, priceZar: 212.5 },
      { quantity: 50, priceZar: 425 },
      { quantity: 100, priceZar: 850 },
    ],
  }),
  product({
    id: "half-moon-steak",
    name: "Steak Half Moons",
    category: "half-moons",
    filling: "Steak",
    description: "Half-moon pastries filled with steak.",
    minQuantity: 25,
    unitLabel: "units",
    tiers: [
      { quantity: 25, priceZar: 225 },
      { quantity: 50, priceZar: 450 },
      { quantity: 100, priceZar: 900 },
    ],
  }),
  product({
    id: "extra-pastry",
    name: "Pastry",
    category: "extras",
    description: "House pastry by the kilogram.",
    minQuantity: 1,
    unitLabel: "kg",
    tiers: [{ quantity: 1, priceZar: 80 }],
  }),
  product({
    id: "extra-butter-pastry",
    name: "Butter Pastry",
    category: "extras",
    description: "Butter pastry by the kilogram.",
    minQuantity: 1,
    unitLabel: "kg",
    tiers: [{ quantity: 1, priceZar: 150 }],
  }),
  product({
    id: "extra-samoosa-leaves",
    name: "Samoosa Leaves (pur)",
    category: "extras",
    description: "Samoosa leaves — 100 sheets per pack.",
    minQuantity: 100,
    unitLabel: "sheets",
    tiers: [{ quantity: 100, priceZar: 70 }],
  }),
];

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}

export function getProductsByCategory(categoryId: string): Product[] {
  return products.filter((p) => p.category === categoryId);
}

export function getCategory(id: string): Category | undefined {
  return categories.find((c) => c.id === id);
}

/** Resolve line price from product tiers (exact tier or pro-rata from nearest). */
export function priceForQuantity(
  product: Product,
  quantity: number,
): { unitPriceZar: number; lineTotalZar: number } | null {
  if (quantity < product.minQuantity) return null;

  const exact = product.tiers.find((t) => t.quantity === quantity);
  if (exact) {
    return {
      unitPriceZar: exact.priceZar / exact.quantity,
      lineTotalZar: exact.priceZar,
    };
  }

  // For extras / custom qty: scale from the smallest tier
  const base = product.tiers[0];
  if (!base) return null;
  const unit = base.priceZar / base.quantity;
  const lineTotalZar = Math.round(unit * quantity * 100) / 100;
  return { unitPriceZar: unit, lineTotalZar };
}

export function formatZar(amount: number): string {
  const hasCents = Math.round(amount * 100) % 100 !== 0;
  return new Intl.NumberFormat("en-ZA", {
    style: "currency",
    currency: "ZAR",
    minimumFractionDigits: hasCents ? 2 : 0,
    maximumFractionDigits: 2,
  }).format(amount);
}
