export type PriceTier = {
  quantity: number;
  priceZar: number;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: CategoryId;
  filling?: string;
  description: string;
  minQuantity: number;
  unitLabel: string;
  tiers: PriceTier[];
  /** Paste a Yoco payment link here when ready — leave empty until then */
  yocoPaymentLink?: string;
  featured?: boolean;
};

export type CategoryId =
  | "samoosas"
  | "spring-rolls"
  | "pies-cocktail"
  | "pies-medium"
  | "sausage-rolls-cocktail"
  | "sausage-rolls-12cm"
  | "quiche"
  | "pizzas"
  | "half-moons"
  | "extras";

export type Category = {
  id: CategoryId;
  name: string;
  blurb: string;
  minNote: string;
};

export type CartItem = {
  productId: string;
  quantity: number;
};

export type OrderCustomer = {
  name: string;
  phone: string;
  email?: string;
  notes?: string;
  preferredCollection?: string;
};

export type OrderLine = {
  productId: string;
  productName: string;
  quantity: number;
  unitPriceZar: number;
  lineTotalZar: number;
};

export type Order = {
  id: string;
  createdAt: string;
  customer: OrderCustomer;
  lines: OrderLine[];
  totalZar: number;
  status: "pending_payment" | "awaiting_whatsapp" | "received";
  yocoPaymentLink?: string;
  whatsappUrl: string;
};

export type StoreConfig = {
  name: string;
  tagline: string;
  location: string;
  phone: string;
  phoneDisplay: string;
  whatsapp: string;
  instagram: string;
  instagramUrl: string;
  halaal: boolean;
  /** Global Yoco checkout link fallback when product-level links are empty */
  yocoPaymentLink?: string;
  notes: string[];
};
