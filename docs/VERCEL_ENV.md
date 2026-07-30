# Vercel environment — The Savoury Lab

Project: **the-savoury-lab** (`prj_OJnoiqo9mbeyIM1xh1aHNSVJ2Kbb`)  
Team: `yaseens-projects-1765104f`  
GitHub: [YJac16/The-Savoury-Lab](https://github.com/YJac16/The-Savoury-Lab)

## Live URLs (no Shopify account required yet)

| URL | Status |
|-----|--------|
| https://the-savoury-lab.vercel.app | Production (project domain) |
| https://tsl-store.vercel.app | Production alias |
| https://the-savoury-lab-yaseens-projects-1765104f.vercel.app | Team deployment URL |

Catalogue data currently comes from Shopify’s public **[mock.shop](https://mock.shop)** demo. A banner on the site explains this. Do not take real payments until you link your own store.

> Vercel runs Node, not Oxygen. SSR must use `renderToPipeableStream` from `react-dom/server` (see `app/entry.server.tsx`). Do not use `renderToReadableStream` — Node’s `react-dom/server` does not export it as an ESM named export and the function will crash the serverless process.


## Current mode: no Shopify account yet

### Env vars for mock mode (already set on Vercel)

| Variable | Value |
|----------|--------|
| `SESSION_SECRET` | Random secret |
| `PUBLIC_STORE_DOMAIN` | `mock.shop` |
| `PUBLIC_STOREFRONT_API_TOKEN` | `public` |
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

4. Replace mock.shop values in Vercel → Settings → Environment Variables.
5. Redeploy (`npx vercel --prod` or push after commit).
6. Follow [SHOPIFY_ADMIN_CHECKLIST.md](./SHOPIFY_ADMIN_CHECKLIST.md).

## Optional marketing env

- `PUBLIC_HERO_VIDEO_URL`
- `PUBLIC_GA_MEASUREMENT_ID` / `PUBLIC_META_PIXEL_ID`
- `CONTACT_WEBHOOK_URL` / `NEWSLETTER_WEBHOOK_URL` / `WHOLESALE_WEBHOOK_URL`
