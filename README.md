# The Savoury Lab

Full-stack storefront for **The Savoury Lab** — handcrafted frozen savouries from Kenilworth (Halaal).

## Stack

- **Next.js** (App Router) + TypeScript + Tailwind CSS v4
- Product catalogue & pricing from the official price list
- Cart + checkout API (`/api/orders`)
- WhatsApp order handoff
- **Yoco-ready** payment link support (env or per-product)

## Develop

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Yoco payment links

You do not need Yoco live yet. When you have a link:

1. Create a payment link in the [Yoco](https://www.yoco.com/) dashboard.
2. Add it in Vercel as `NEXT_PUBLIC_YOCO_PAYMENT_LINK`, **or**
3. Set `yocoPaymentLink` on a product in [`src/lib/products.ts`](src/lib/products.ts).

Until a link is set, checkout confirms via WhatsApp.

## Deploy on Vercel

1. Import this GitHub repo in [Vercel](https://vercel.com/new).
2. Framework preset: **Next.js** (auto-detected).
3. Add `NEXT_PUBLIC_YOCO_PAYMENT_LINK` when ready.
4. Deploy.

`vercel.json` targets the Cape Town region (`cpt1`).

## Contact (live on site)

- WhatsApp: 065 663 2215
- Instagram: [@the_savoury_lab](https://www.instagram.com/the_savoury_lab/)
- Location: Kenilworth
