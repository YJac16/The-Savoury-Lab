/// <reference types="vite/client" />
/// <reference types="react-router" />
/// <reference types="@shopify/oxygen-workers-types" />
/// <reference types="@shopify/hydrogen/react-router-types" />

// Enhance TypeScript's built-in typings.
import '@total-typescript/ts-reset';

declare global {
  interface Env {
    SESSION_SECRET: string;
    PUBLIC_STORE_DOMAIN: string;
    PUBLIC_STOREFRONT_API_TOKEN: string;
    PUBLIC_STOREFRONT_ID: string;
    PUBLIC_CHECKOUT_DOMAIN: string;
    PUBLIC_CUSTOMER_ACCOUNT_API_CLIENT_ID: string;
    PUBLIC_CUSTOMER_ACCOUNT_API_URL: string;
    NEWSLETTER_WEBHOOK_URL?: string;
    WHOLESALE_WEBHOOK_URL?: string;
    CONTACT_WEBHOOK_URL?: string;
    PUBLIC_HERO_VIDEO_URL?: string;
    PUBLIC_GA_MEASUREMENT_ID?: string;
    PUBLIC_META_PIXEL_ID?: string;
  }
}

export {};
