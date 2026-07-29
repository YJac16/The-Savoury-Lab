# Vercel environment — The Savoury Lab

Project: **the-savoury-lab** (`prj_OJnoiqo9mbeyIM1xh1aHNSVJ2Kbb`)  
Team: `yaseens-projects-1765104f`  
GitHub: [YJac16/The-Savoury-Lab](https://github.com/YJac16/The-Savoury-Lab)

## Current mode: no Shopify account yet

Until you create a Shopify store, the storefront uses Shopify’s public demo catalog **[mock.shop](https://mock.shop)**. You can browse demo products and exercise the UI; checkout is not your business and should not be used for real orders.

### Env vars for mock mode (production / preview)

| Variable | Value |
|----------|--------|
| `SESSION_SECRET` | Random secret (already set on Vercel) |
| `PUBLIC_STORE_DOMAIN` | `mock.shop` |
| `PUBLIC_STOREFRONT_API_TOKEN` | `public` (mock.shop accepts a placeholder public token) |
| `PUBLIC_STOREFRONT_ID` | `mock` |
| `PUBLIC_CHECKOUT_DOMAIN` | `checkout.shopify.com` |

## When you create a Shopify account

1. Sign up at [shopify.com](https://www.shopify.com) (trial is fine).
2. Install the **Headless** (or Hydrogen) sales channel.
3. Locally:

```bash
npx shopify hydrogen link
npx shopify hydrogen env pull
```

4. Copy the pulled values into Vercel → Project → Settings → Environment Variables (replace mock.shop values).
5. Redeploy.
6. Follow [SHOPIFY_ADMIN_CHECKLIST.md](./SHOPIFY_ADMIN_CHECKLIST.md) for collections, shipping, and payments.

## Optional marketing env

- `PUBLIC_HERO_VIDEO_URL`
- `PUBLIC_GA_MEASUREMENT_ID` / `PUBLIC_META_PIXEL_ID`
- `CONTACT_WEBHOOK_URL` / `NEWSLETTER_WEBHOOK_URL` / `WHOLESALE_WEBHOOK_URL`
