/**
 * Public menu / price list sourced from The Savoury Lab price sheets.
 * Display reference only — live commerce prices come from Shopify.
 */

export type MenuPackPrice = {
  qty: number;
  /** Price in ZAR */
  price: number;
};

export type MenuItem = {
  name: string;
  prices: MenuPackPrice[];
};

export type MenuSection = {
  id: string;
  title: string;
  /** Optional size/style subtitle (e.g. Cocktail, 12cm) */
  subtitle?: string;
  /** Minimum order note shown under the section */
  minNote?: string;
  /** Column headers for pack sizes; derived from first item when omitted */
  packQtys?: number[];
  items: MenuItem[];
};

export type MenuExtra = {
  name: string;
  priceLabel: string;
};

export const MENU_INTRO = {
  frozenNote: 'All items sold frozen.',
  bakedFriedNote: 'Additional charges apply for baked and fried goods.',
  pricesNote: 'Prices subject to change.',
} as const;

export const MENU_SECTIONS: MenuSection[] = [
  {
    id: 'samoosas',
    title: 'Samoosas',
    minNote: 'Minimum of 25 per filling.',
    packQtys: [25, 50, 100],
    items: [
      {
        name: 'Mince',
        prices: [
          {qty: 25, price: 175},
          {qty: 50, price: 350},
          {qty: 100, price: 700},
        ],
      },
      {
        name: 'Chicken',
        prices: [
          {qty: 25, price: 175},
          {qty: 50, price: 350},
          {qty: 100, price: 700},
        ],
      },
      {
        name: 'Cheese',
        prices: [
          {qty: 25, price: 200},
          {qty: 50, price: 400},
          {qty: 100, price: 800},
        ],
      },
      {
        name: 'Potato',
        prices: [
          {qty: 25, price: 175},
          {qty: 50, price: 350},
          {qty: 100, price: 700},
        ],
      },
      {
        name: 'Veg',
        prices: [
          {qty: 25, price: 162.5},
          {qty: 50, price: 325},
          {qty: 100, price: 650},
        ],
      },
    ],
  },
  {
    id: 'spring-rolls',
    title: 'Spring Rolls',
    minNote: 'Minimum of 25 per filling.',
    packQtys: [25, 50, 100],
    items: [
      {
        name: 'Chicken',
        prices: [
          {qty: 25, price: 212.5},
          {qty: 50, price: 425},
          {qty: 100, price: 850},
        ],
      },
    ],
  },
  {
    id: 'cocktail-pies',
    title: 'Pies',
    subtitle: 'Cocktail',
    minNote: 'Minimum of 25 per filling.',
    packQtys: [25, 50, 100],
    items: [
      {
        name: 'Steak',
        prices: [
          {qty: 25, price: 212.5},
          {qty: 50, price: 425},
          {qty: 100, price: 850},
        ],
      },
      {
        name: 'Mince',
        prices: [
          {qty: 25, price: 175},
          {qty: 50, price: 350},
          {qty: 100, price: 700},
        ],
      },
      {
        name: 'Chicken',
        prices: [
          {qty: 25, price: 187.5},
          {qty: 50, price: 375},
          {qty: 100, price: 750},
        ],
      },
    ],
  },
  {
    id: 'medium-pies',
    title: 'Pies',
    subtitle: 'Medium',
    minNote: 'Minimum of 6 per filling.',
    packQtys: [6, 12],
    items: [
      {
        name: 'Steak',
        prices: [
          {qty: 6, price: 150},
          {qty: 12, price: 280},
        ],
      },
      {
        name: 'Mince',
        prices: [
          {qty: 6, price: 140},
          {qty: 12, price: 260},
        ],
      },
      {
        name: 'Chicken',
        prices: [
          {qty: 6, price: 150},
          {qty: 12, price: 280},
        ],
      },
    ],
  },
  {
    id: 'sausage-rolls-cocktail',
    title: 'Sausage Rolls',
    subtitle: 'Cocktail',
    minNote: 'Minimum of 25 per filling.',
    packQtys: [25, 50, 100],
    items: [
      {
        name: 'Cocktail',
        prices: [
          {qty: 25, price: 150},
          {qty: 50, price: 300},
          {qty: 100, price: 600},
        ],
      },
    ],
  },
  {
    id: 'sausage-rolls-12cm',
    title: 'Sausage Rolls',
    subtitle: '12cm',
    minNote: 'Minimum of 6 per filling.',
    packQtys: [6, 12],
    items: [
      {
        name: '12cm',
        prices: [
          {qty: 6, price: 140},
          {qty: 12, price: 260},
        ],
      },
    ],
  },
  {
    id: 'quiche',
    title: 'Quiche',
    minNote: 'Minimum of 25 per filling.',
    packQtys: [25, 50, 100],
    items: [
      {
        name: 'Chicken',
        prices: [
          {qty: 25, price: 200},
          {qty: 50, price: 400},
          {qty: 100, price: 800},
        ],
      },
      {
        name: 'Spinach & Feta',
        prices: [
          {qty: 25, price: 175},
          {qty: 50, price: 350},
          {qty: 100, price: 700},
        ],
      },
    ],
  },
  {
    id: 'pizzas',
    title: 'Pizzas',
    minNote: 'Minimum of 25 per filling.',
    packQtys: [25, 50, 100],
    items: [
      {
        name: 'Vienna',
        prices: [
          {qty: 25, price: 250},
          {qty: 50, price: 500},
          {qty: 100, price: 1000},
        ],
      },
      {
        name: 'Chicken',
        prices: [
          {qty: 25, price: 300},
          {qty: 50, price: 600},
          {qty: 100, price: 1200},
        ],
      },
      {
        name: 'Steak',
        prices: [
          {qty: 25, price: 325},
          {qty: 50, price: 650},
          {qty: 100, price: 1300},
        ],
      },
    ],
  },
  {
    id: 'half-moons',
    title: 'Half Moons',
    minNote: 'Minimum of 25 per filling.',
    packQtys: [25, 50, 100],
    items: [
      {
        name: 'Chicken',
        prices: [
          {qty: 25, price: 212.5},
          {qty: 50, price: 425},
          {qty: 100, price: 850},
        ],
      },
      {
        name: 'Steak',
        prices: [
          {qty: 25, price: 225},
          {qty: 50, price: 450},
          {qty: 100, price: 900},
        ],
      },
    ],
  },
];

export const MENU_EXTRAS: MenuExtra[] = [
  {name: 'Pastry', priceLabel: 'R80 / kg'},
  {name: 'Butter Pastry', priceLabel: 'R150 / kg'},
  {name: 'Samoosa Leaves (pur)', priceLabel: 'R70 / 100 sheets'},
];

/** Format ZAR for menu tables (e.g. R212.50, R700). */
export function formatMenuPrice(amount: number): string {
  const formatted = Number.isInteger(amount)
    ? amount.toFixed(0)
    : amount.toFixed(2);
  return `R${formatted}`;
}
