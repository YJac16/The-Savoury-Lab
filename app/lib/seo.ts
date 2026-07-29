import type {MetaDescriptor} from 'react-router';
import {BRAND} from '~/lib/brand';

type BuildSeoInput = {
  title?: string;
  description: string;
  path?: string;
  image?: string;
  type?: 'website' | 'product' | 'article';
  noIndex?: boolean;
};

type FaqItem = {
  question: string;
  answer: string;
};

type ProductJsonLdInput = {
  name: string;
  description?: string | null;
  image?: string | null;
  sku?: string;
  price?: string;
  currency?: string;
  availability?: boolean;
  url: string;
};

function absoluteUrl(path = '/') {
  const base = BRAND.siteUrl.replace(/\/$/, '');
  if (!path || path === '/') return base;
  return `${base}${path.startsWith('/') ? path : `/${path}`}`;
}

/**
 * Builds Open Graph, Twitter, and standard meta tags for a route.
 */
export function buildSeo({
  title,
  description,
  path = '/',
  image,
  type = 'website',
  noIndex = false,
}: BuildSeoInput): MetaDescriptor[] {
  const pageTitle = title
    ? `${title} · ${BRAND.name}`
    : `${BRAND.name} · ${BRAND.tagline}`;
  const url = absoluteUrl(path);
  const ogImage = image || `${BRAND.siteUrl}/og-default.png`;

  const tags: MetaDescriptor[] = [
    {title: pageTitle},
    {name: 'description', content: description},
    {property: 'og:site_name', content: BRAND.name},
    {property: 'og:title', content: pageTitle},
    {property: 'og:description', content: description},
    {property: 'og:type', content: type},
    {property: 'og:url', content: url},
    {property: 'og:locale', content: 'en_ZA'},
    {property: 'og:image', content: ogImage},
    {name: 'twitter:card', content: 'summary_large_image'},
    {name: 'twitter:title', content: pageTitle},
    {name: 'twitter:description', content: description},
    {name: 'twitter:image', content: ogImage},
  ];

  if (noIndex) {
    tags.push({name: 'robots', content: 'noindex, nofollow'});
  }

  return tags;
}

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: BRAND.name,
    url: BRAND.siteUrl,
    description: `${BRAND.tagline}. ${BRAND.subTagline}`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: BRAND.location.suburb,
      addressRegion: BRAND.location.city,
      addressCountry: 'ZA',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: BRAND.contact.phone,
      email: BRAND.contact.email,
      contactType: 'customer service',
      areaServed: 'ZA',
      availableLanguage: 'English',
    },
    sameAs: [BRAND.contact.instagram],
  };
}

export function faqJsonLd(items: ReadonlyArray<FaqItem>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

export function productJsonLd({
  name,
  description,
  image,
  sku,
  price,
  currency,
  availability,
  url,
}: ProductJsonLdInput) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description: description || undefined,
    image: image || undefined,
    sku: sku || undefined,
    brand: {
      '@type': 'Brand',
      name: BRAND.name,
    },
    offers: price
      ? {
          '@type': 'Offer',
          url: absoluteUrl(url),
          priceCurrency: currency || 'ZAR',
          price,
          availability: availability
            ? 'https://schema.org/InStock'
            : 'https://schema.org/OutOfStock',
          seller: {
            '@type': 'Organization',
            name: BRAND.name,
          },
        }
      : undefined,
  };
}

export function breadcrumbJsonLd(
  items: ReadonlyArray<{name: string; path: string}>,
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
