# Catalogue images

Temporary AI placeholders live in `public/images/catalogue/`. Replace with real product photos before launch.

## Specs

| Spec | Value |
|------|--------|
| Count | 10 (one per category handle) |
| Aspect | 1:1 |
| Min size | 1200×1200 |
| Format | JPG or WebP, ideally under ~400KB each |
| Style | Overhead or 45° plate shot, warm kitchen light, plain/neutral surface, no text overlays |
| Path | `public/images/catalogue/{handle}.jpg` |

## Handles

`samoosas`, `spring-rolls`, `cocktail-pies`, `medium-pies`, `sausage-rolls`, `mini-pizzas`, `half-moons`, `quiche`, `pastry`, `samoosa-leaves`

Fillings reuse the category image until you shoot per-flavour photos.

## Static catalogue mode

While `PUBLIC_STORE_DOMAIN` contains `mock.shop`, shop pages use [`app/lib/static-catalogue.ts`](../app/lib/static-catalogue.ts) (menu + these images) and WhatsApp order CTAs — not Shopify’s clothing demo catalogue.

When you link a real Shopify store, update Vercel env vars (see [VERCEL_ENV.md](./VERCEL_ENV.md)); the storefront will switch back to Storefront API products.
