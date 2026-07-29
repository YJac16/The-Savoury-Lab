/**
 * Brand constants for The Savoury Lab storefront.
 * Contact details can be updated here without touching UI components.
 */

export const BRAND = {
  name: 'The Savoury Lab',
  tagline: 'Handcrafted Savouries · Made to Order',
  subTagline: 'Made Fresh. Frozen for Convenience.',
  halaal: true,
  siteUrl: 'https://thesavourylab.co.za',
  location: {
    suburb: 'Kenilworth',
    city: 'Cape Town',
    country: 'South Africa',
    address: 'Kenilworth, Cape Town, South Africa',
  },
  contact: {
    phone: '+27 65 663 2215',
    email: 'hello@thesavourylab.co.za',
    /** WhatsApp number in international format without + or spaces */
    whatsapp: '27656632215',
    instagram: 'https://www.instagram.com/the_savoury_lab/',
    hours: 'Mon–Fri 09:00–17:00 · Sat 09:00–13:00',
  },
} as const;

export const NAV_LINKS = [
  {title: 'Home', to: '/'},
  {title: 'Shop', to: '/collections/all'},
  {title: 'Menu', to: '/menu'},
  {title: 'About', to: '/about'},
  {title: 'Wholesale', to: '/wholesale'},
  {title: 'Recipes', to: '/recipes'},
  {title: 'Contact', to: '/contact'},
] as const;

/**
 * Collection handles must match Shopify Admin collection handles.
 * Create automatic collections in Admin with these handles.
 */
export const CATEGORIES = [
  {
    handle: 'samoosas',
    title: 'Samoosas',
    description: 'Crisp pastry, generous fillings.',
  },
  {
    handle: 'spring-rolls',
    title: 'Spring Rolls',
    description: 'Golden, hand-rolled classics.',
  },
  {
    handle: 'cocktail-pies',
    title: 'Cocktail Pies',
    description: 'Party-ready bite-sized pies.',
  },
  {
    handle: 'medium-pies',
    title: 'Medium Pies',
    description: 'Hearty pies for the table.',
  },
  {
    handle: 'sausage-rolls',
    title: 'Sausage Rolls',
    description: 'Flaky pastry, savoury filling.',
  },
  {
    handle: 'mini-pizzas',
    title: 'Mini Pizzas',
    description: 'Crowd-pleasing mini bases.',
  },
  {
    handle: 'half-moons',
    title: 'Half Moons',
    description: 'Curved pastry favourites.',
  },
  {
    handle: 'quiche',
    title: 'Quiche',
    description: 'Elegant quiches, freezer-ready.',
  },
  {
    handle: 'pastry',
    title: 'Pastry',
    description: 'Butter pastry sheets.',
  },
  {
    handle: 'samoosa-leaves',
    title: 'Samoosa Leaves',
    description: 'Premium pastry leaves.',
  },
] as const;

export const WHY_CHOOSE_US = [
  {
    title: 'Halaal certified',
    body: 'Every product is prepared with Halaal-certified ingredients and processes you can trust.',
  },
  {
    title: 'Handcrafted fresh',
    body: 'Made in small batches with quality ingredients, then frozen at peak freshness.',
  },
  {
    title: 'Frozen for convenience',
    body: 'Stock your freezer for weeknights, Ramadan, Eid, and last-minute entertaining.',
  },
  {
    title: 'Cape Town delivery',
    body: 'Collect in Kenilworth or arrange local delivery across Southern Suburbs and beyond.',
  },
] as const;

export const HOW_IT_WORKS = [
  {
    step: '01',
    title: 'Choose your pack',
    body: 'Select flavours and pack sizes — from family packs to bulk wholesale quantities.',
  },
  {
    step: '02',
    title: 'Collect or deliver frozen',
    body: 'Pick up in Kenilworth or choose local Cape Town delivery. We pack for a cold journey so products stay freezer-ready.',
  },
  {
    step: '03',
    title: 'Heat and serve',
    body: 'Keep frozen until cooking. Bake or fry from frozen using the heating guide on each product. Ready in minutes.',
  },
] as const;

/** Default PDP cold-chain copy when Shopify metafields are empty. */
export const DEFAULT_STORAGE_GUIDE =
  'Keep frozen at −18°C or below until ready to cook. Do not thaw and refreeze. Once opened, reseal and return to the freezer promptly.';

export const DEFAULT_HEATING_GUIDE =
  'Cook from frozen until piping hot throughout. Prefer oven baking for even results; frying times vary by product. See pack labels for temperatures and times where provided.';

export const FROZEN_FULFILMENT_NOTE =
  'Products ship and collect frozen. Choose collection in Kenilworth or local Cape Town delivery at checkout. Please refrigerate or freeze on arrival.';

export const REVIEWS = [
  {
    name: 'Ayesha K.',
    location: 'Kenilworth',
    rating: 5,
    quote:
      'The chicken samoosas taste homemade — crisp pastry, perfect spice. Our freezer is always stocked.',
  },
  {
    name: 'Farouk M.',
    location: 'Claremont',
    rating: 5,
    quote:
      'Ordered cocktail pies for a function. Guests kept asking who made them. Flawless quality.',
  },
  {
    name: 'Nadia S.',
    location: 'Rondebosch',
    rating: 5,
    quote:
      'Halaal, convenient, and genuinely premium. The spring rolls are a weekly staple now.',
  },
] as const;

export const FAQ_ITEMS = [
  {
    question: 'How long do products last?',
    answer:
      'Keep frozen at −18°C. Unopened packs typically keep for several months — check the best-before date on each pack. Once thawed, cook and consume promptly; do not refreeze.',
  },
  {
    question: 'Are products Halaal?',
    answer:
      'Yes. All The Savoury Lab products are Halaal certified and prepared with Halaal ingredients.',
  },
  {
    question: 'Do you deliver frozen goods?',
    answer:
      'Yes. Collection in Kenilworth and local Cape Town delivery (Southern Suburbs, Northern Suburbs, Atlantic Seaboard, West Coast). We pack for a cold journey — choose collection or delivery at checkout, then freeze on arrival.',
  },
  {
    question: 'How do I heat them?',
    answer:
      'Most items can be baked or fried from frozen. Each product page includes a heating guide with temperatures and times. Always cook until piping hot throughout.',
  },
  {
    question: 'Can I place bulk orders?',
    answer:
      'Absolutely. Visit our Wholesale page for catering, mosques, schools, corporate events, and regular monthly volume. We will respond with pricing and lead times.',
  },
] as const;

export const PERFECT_FOR = [
  'Families',
  'Events',
  'Ramadan',
  'Eid',
  'Corporate catering',
  'Schools',
  'Mosques',
  'Functions',
] as const;

export const FULFILLMENT_OPTIONS = [
  'Collection',
  'Local delivery',
] as const;

export const DELIVERY_ZONES = [
  'Cape Town',
  'Southern Suburbs',
  'Northern Suburbs',
  'Atlantic Seaboard',
  'West Coast',
] as const;
