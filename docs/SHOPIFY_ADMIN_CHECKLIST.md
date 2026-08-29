# Shopify Admin checklist — The Savoury Lab

**You do not need a Shopify account to preview the Vercel site.** With `PUBLIC_STORE_DOMAIN=mock.shop` the UI uses Shopify’s public demo catalogue. Create a real store before taking payments.

## 0. Create a Shopify account (when ready)

- [ ] Sign up at https://www.shopify.com (trial OK)
- [ ] Create store “The Savoury Lab”
- [ ] Install the **Headless** sales channel (or Hydrogen channel)
- [ ] Run locally: `npx shopify hydrogen link` then `npx shopify hydrogen env pull`
- [ ] Replace mock.shop env vars on Vercel (see [VERCEL_ENV.md](./VERCEL_ENV.md))
- [ ] Redeploy

## 1. Headless channel & API

- [ ] Create a Storefront API token with product/collection/cart scopes
- [ ] Copy into Vercel / `.env` (public names only — do not commit values):
  - `PUBLIC_STORE_DOMAIN` (e.g. `your-store.myshopify.com`)
  - `PUBLIC_STOREFRONT_API_TOKEN` (32-character **public** token, not `shpat_` / not `PRIVATE_STOREFRONT_API_TOKEN`)
  - `PUBLIC_STOREFRONT_ID` (real Headless storefront id, not `mock`)
  - `PUBLIC_CHECKOUT_DOMAIN`
  - `SESSION_SECRET` (long random string)
- [ ] Optional Customer Account API: `PUBLIC_CUSTOMER_ACCOUNT_API_CLIENT_ID`, `PUBLIC_CUSTOMER_ACCOUNT_API_URL`

## 2. Catalog & collections

Create collections whose **handles** match the storefront (`app/lib/brand.ts`):

| Handle | Title |
|--------|--------|
| `samoosas` | Samoosas |
| `spring-rolls` | Spring Rolls |
| `cocktail-pies` | Cocktail Pies |
| `medium-pies` | Medium Pies |
| `sausage-rolls` | Sausage Rolls |
| `mini-pizzas` | Mini Pizzas |
| `half-moons` | Half Moons |
| `quiche` | Quiche |
| `pastry` | Pastry |
| `samoosa-leaves` | Samoosa Leaves |

- [ ] Add products with pack-size variants (e.g. 12 / 24 / 48)
- [ ] Set inventory, images, SEO titles/descriptions
- [ ] Publish products to the Headless channel

## 3. Product metafields (namespace `custom`)

| Key | Used for |
|-----|----------|
| `ingredients` | Ingredients tab |
| `heating_guide` | Heating Guide tab |
| `reviews` | Reviews tab |
| `nutrition` | PDP detail |
| `storage` | Cold-chain storage |
| `cooking` | Cooking notes |
| `availability` | Availability note |
| `collection` | Collection note |
| `delivery` | Delivery note |

## 4. Frozen fulfilment (Checkout)

- [ ] Enable **store pickup** (Kenilworth / collection)
- [ ] Configure **local delivery** or shipping zones for Cape Town areas
- [ ] Add packaging / cold-chain notes in shipping policy
- [ ] Publish policies (shipping, refund, privacy, terms)

## 5. Payments (South Africa)

- [ ] Enable a ZA-friendly gateway (PayFast, Ozow, Yoco, or Shopify Payments)
- [ ] Test checkout in ZAR

## 6. Navigation & content

- [ ] Menus: `main-menu` and `footer`
- [ ] Optional blog `recipes` or `journal` for `/recipes`

## 7. Marketing (optional)

- [ ] Form webhooks + analytics IDs on Vercel

## 8. Domain

- [ ] Point `thesavourylab.co.za` to Vercel
- [ ] Align Shopify checkout domain with the live URL
