import {
  GENERAL_ORDER_URL,
  INSTAGRAM_HANDLE,
  INSTAGRAM_URL,
  SITE_NAME,
  TAGLINE,
  WHOLESALE_URL,
} from "@/lib/site";

export const BRAND = {
  name: SITE_NAME,
  tagline: TAGLINE,
  subTagline: "Made Fresh. Frozen for Convenience.",
  halaal: true,
  location: {
    suburb: "Kenilworth",
    city: "Cape Town",
    country: "South Africa",
  },
  contact: {
    instagram: INSTAGRAM_URL,
    instagramHandle: INSTAGRAM_HANDLE,
    orderUrl: GENERAL_ORDER_URL,
    wholesaleUrl: WHOLESALE_URL,
  },
} as const;

export const CATEGORIES = [
  {
    handle: "samoosas",
    menuAnchor: "samoosas",
    title: "Samoosas",
    description: "Crisp pastry, generous fillings.",
    image: "/images/catalogue/samoosas.jpg",
  },
  {
    handle: "spring-rolls",
    menuAnchor: "spring-rolls",
    title: "Spring Rolls",
    description: "Golden, hand-rolled classics.",
    image: "/images/catalogue/spring-rolls.jpg",
  },
  {
    handle: "cocktail-pies",
    menuAnchor: "pies-cocktail",
    title: "Cocktail Pies",
    description: "Party-ready bite-sized pies.",
    image: "/images/catalogue/cocktail-pies.jpg",
  },
  {
    handle: "medium-pies",
    menuAnchor: "pies-medium",
    title: "Medium Pies",
    description: "Hearty pies for the table.",
    image: "/images/catalogue/medium-pies.jpg",
  },
  {
    handle: "sausage-rolls",
    menuAnchor: "sausage-rolls-cocktail",
    title: "Sausage Rolls",
    description: "Flaky pastry, savoury filling.",
    image: "/images/catalogue/sausage-rolls.jpg",
  },
  {
    handle: "mini-pizzas",
    menuAnchor: "pizzas",
    title: "Mini Pizzas",
    description: "Crowd-pleasing mini bases.",
    image: "/images/catalogue/mini-pizzas.jpg",
  },
  {
    handle: "half-moons",
    menuAnchor: "half-moons",
    title: "Half Moons",
    description: "Curved pastry favourites.",
    image: "/images/catalogue/half-moons.jpg",
  },
  {
    handle: "quiche",
    menuAnchor: "quiche",
    title: "Quiche",
    description: "Elegant quiches, freezer-ready.",
    image: "/images/catalogue/quiche.jpg",
  },
  {
    handle: "pastry",
    menuAnchor: "extras",
    title: "Pastry",
    description: "Butter pastry sheets.",
    image: "/images/catalogue/pastry.jpg",
  },
  {
    handle: "samoosa-leaves",
    menuAnchor: "extras",
    title: "Samoosa Leaves",
    description: "Premium pastry leaves.",
    image: "/images/catalogue/samoosa-leaves.jpg",
  },
] as const;

export const WHY_CHOOSE_US = [
  {
    title: "Halaal certified",
    body: "Every product is prepared with Halaal-certified ingredients and processes you can trust.",
  },
  {
    title: "Handcrafted fresh",
    body: "Made in small batches with quality ingredients, then frozen at peak freshness.",
  },
  {
    title: "Frozen for convenience",
    body: "Stock your freezer for weeknights, Ramadan, Eid, and last-minute entertaining.",
  },
  {
    title: "Kenilworth collect",
    body: "Collect your order in Kenilworth. All items are sold frozen and ready for your freezer.",
  },
] as const;

export const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Choose your pack",
    body: "Browse the menu and pick flavours and pack sizes — from family packs to bulk wholesale quantities.",
  },
  {
    step: "02",
    title: "Order on WhatsApp",
    body: "Tap a price or message us with your selection. We confirm your order on WhatsApp — no online checkout.",
  },
  {
    step: "03",
    title: "Collect, heat, and serve",
    body: "Collect frozen in Kenilworth. Keep frozen until cooking, then bake or fry from frozen until piping hot.",
  },
] as const;

export const FAQ_ITEMS = [
  {
    question: "How long do products last?",
    answer:
      "Keep frozen at −18°C. Unopened packs typically keep for several months — check the best-before date on each pack. Once thawed, cook and consume promptly; do not refreeze.",
  },
  {
    question: "Are products Halaal?",
    answer:
      "Yes. All The Savoury Lab products are Halaal certified and prepared with Halaal ingredients.",
  },
  {
    question: "Where do I collect?",
    answer:
      "Orders are collected in Kenilworth. Message us on WhatsApp to confirm collection arrangements.",
  },
  {
    question: "How do I heat them?",
    answer:
      "Most items can be baked or fried from frozen. Always cook until piping hot throughout.",
  },
  {
    question: "Can I place bulk orders?",
    answer:
      "Yes. Message us on WhatsApp for catering, mosques, schools, corporate events, and regular monthly volume.",
  },
] as const;

export const MENU_NOTES = [
  "All items sold frozen",
  "Additional charges apply for baked and fried goods",
  "Prices subject to change",
] as const;

export const NAV_LINKS = [
  { title: "Menu", href: "#menu" },
  { title: "Wholesale", href: "#wholesale" },
  { title: "Contact", href: "#contact" },
] as const;
