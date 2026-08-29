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

Catalogue data uses a **static food menu** with local placeholder images while `PUBLIC_STORE_DOMAIN=mock.shop` (see [CATALOGUE_IMAGES.md](./CATALOGUE_IMAGES.md)). Clothing from mock.shop is not shown. Do not take real payments until you link your own Shopify store.

> Vercel runs Node, not Oxygen. SSR must use `renderToPipeableStream` from `react-dom/server` (see `app/entry.server.tsx`). Do not use `renderToReadableStream` — Node’s `react-dom/server` does not export it for the serverless runtime.

> Git production branch in the Vercel project should be `launch/storefront` (not `main`) so pushes to this branch auto-promote. If a push only creates a Preview, run `npx vercel --prod` or promote the deployment in the dashboard.


## Current mode: no Shopify account yet

### Env vars for mock mode (already set on Vercel)

| Variable | Value |
|----------|--------|
| `SESSION_SECRET` | Random secret |
| `PUBLIC_STORE_DOMAIN` | `mock.shop` |
| `PUBLIC_STOREFRONT_API_TOKEN` | `public` (mock placeholder only) |
| `PUBLIC_STOREFRONT_ID` | `mock` (placeholder only) |
| `PUBLIC_CHECKOUT_DOMAIN` | `checkout.shopify.com` |

Mock values are **not** a real storefront. The storefront disables Shopify Customer Privacy / PerfKit analytics until a real public token and storefront id are set — otherwise the browser logs `private access token used instead of public` and `Invalid storefrontId`.

## Required Vercel env vars (names only — never commit token values)

Set these on the **the-savoury-lab** project for Production and Preview. Use the **public** Storefront API token from the Headless / Hydrogen sales channel.

| Variable | What to set |
|----------|-------------|
| `SESSION_SECRET` | Long random string |
| `PUBLIC_STORE_DOMAIN` | `your-store.myshopify.com` (or `mock.shop` for the static catalogue) |
| `PUBLIC_STOREFRONT_API_TOKEN` | **32-character public** Storefront API token. Not an Admin `shpat_` key. Not `PRIVATE_STOREFRONT_API_TOKEN`. |
| `PUBLIC_STOREFRONT_ID` | Headless / Hydrogen storefront id (numeric). Do not use `mock` once a real store is linked. |
| `PUBLIC_CHECKOUT_DOMAIN` | Checkout host, often `checkout.shopify.com` or `your-store.myshopify.com` |

Do **not** put `PRIVATE_STOREFRONT_API_TOKEN` or Admin API tokens in client-facing Hydrogen consent. The server only reads `PUBLIC_STOREFRONT_API_TOKEN`.

## When you create a Shopify account

1. Sign up at [shopify.com](https://www.shopify.com) (trial is fine).
2. Install the **Headless** (or Hydrogen) sales channel.
3. Copy the **public** Storefront API token (32 characters) and storefront id — not the Admin API token.
4. Locally (optional):

```bash
npx shopify hydrogen link
npx shopify hydrogen env pull
```

5. Replace mock.shop values in Vercel → Settings → Environment Variables. Confirm `PUBLIC_STOREFRONT_API_TOKEN` is the public token, not a private/admin token that Hydrogen env pull may also write as `PRIVATE_STOREFRONT_API_TOKEN`.
6. Redeploy (`npx vercel --prod` or push after commit).
7. Follow [SHOPIFY_ADMIN_CHECKLIST.md](./SHOPIFY_ADMIN_CHECKLIST.md).

## Optional marketing env

- `PUBLIC_HERO_VIDEO_URL`
- `PUBLIC_GA_MEASUREMENT_ID` / `PUBLIC_META_PIXEL_ID`
- `CONTACT_WEBHOOK_URL` / `NEWSLETTER_WEBHOOK_URL` / `WHOLESALE_WEBHOOK_URL`
