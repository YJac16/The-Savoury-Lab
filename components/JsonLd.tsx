import {
  SITE_NAME,
  SITE_URL,
  WHATSAPP_E164,
} from "@/lib/site";

const localBusiness = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: SITE_NAME,
  description:
    "Halaal frozen savouries for Kenilworth collect. Order handcrafted frozen savouries on WhatsApp.",
  url: SITE_URL,
  telephone: `+${WHATSAPP_E164}`,
  image: `${SITE_URL}/images/catalogue/samoosas.jpg`,
  address: {
    "@type": "PostalAddress",
    streetAddress: "52 Goldbourne Road",
    addressLocality: "Kenilworth",
    addressRegion: "Western Cape",
    addressCountry: "ZA",
  },
  areaServed: "Kenilworth, Cape Town",
  servesCuisine: "Frozen savouries",
  priceRange: "$$",
};

export function JsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
    />
  );
}
