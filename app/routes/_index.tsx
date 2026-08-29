import {useLoaderData} from 'react-router';
import type {Route} from './+types/_index';
import {Hero} from '~/components/home/Hero';
import {FeaturedCategories} from '~/components/home/FeaturedCategories';
import {BestSellers} from '~/components/home/BestSellers';
import {WhyChooseUs} from '~/components/home/WhyChooseUs';
import {CustomerReviews} from '~/components/home/CustomerReviews';
import {HowItWorks} from '~/components/home/HowItWorks';
import {WholesaleCta} from '~/components/home/WholesaleCta';
import {InstagramFeed} from '~/components/home/InstagramFeed';
import {NewsletterForm} from '~/components/NewsletterForm';
import {FaqAccordion} from '~/components/FaqAccordion';
import {JsonLd} from '~/components/JsonLd';
import {buildSeo, faqJsonLd, organizationJsonLd} from '~/lib/seo';
import {FAQ_ITEMS, HERO_IMAGE_SRC} from '~/lib/brand';
import {
  getBestSellers,
  getFeaturedCollections,
  isStaticCatalogue,
} from '~/lib/static-catalogue';

export const meta: Route.MetaFunction = () => {
  return buildSeo({
    description:
      'Premium Halaal handcrafted frozen savouries from Kenilworth, Cape Town. Shop samoosas, pies, spring rolls and more.',
    path: '/',
  });
};

export async function loader({context}: Route.LoaderArgs) {
  const {storefront, env} = context ?? {};

  if (isStaticCatalogue(env)) {
    const collections = getFeaturedCollections();
    const products = getBestSellers(8);
    return {
      collections,
      products,
      heroImage: HERO_IMAGE_SRC,
      heroVideoUrl: env?.PUBLIC_HERO_VIDEO_URL || undefined,
    };
  }

  const [{collections}, {products}] = await Promise.all([
    storefront.query(HOMEPAGE_COLLECTIONS_QUERY),
    storefront.query(HOMEPAGE_PRODUCTS_QUERY),
  ]);

  const heroImage =
    collections.nodes.find(
      (node: {image?: {url?: string} | null}) => Boolean(node.image),
    )?.image?.url ?? HERO_IMAGE_SRC;

  return {
    collections: collections.nodes,
    products: products.nodes,
    heroImage,
    heroVideoUrl: env.PUBLIC_HERO_VIDEO_URL || undefined,
  };
}

export default function Homepage() {
  const {collections, products, heroImage, heroVideoUrl} =
    useLoaderData<typeof loader>();

  return (
    <>
      <JsonLd data={[organizationJsonLd(), faqJsonLd(FAQ_ITEMS)]} />
      <Hero posterUrl={heroImage} videoUrl={heroVideoUrl} />
      <FeaturedCategories collections={collections} />
      <BestSellers products={products} />
      <WhyChooseUs />
      <CustomerReviews />
      <HowItWorks />
      <WholesaleCta />
      <InstagramFeed collections={collections} />
      <section className="section-pad bg-brand-inverse">
        <div className="container-premium grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          <NewsletterForm />
          <div>
            <p className="eyebrow mb-3">FAQ</p>
            <h2 className="mb-8 text-balance text-3xl sm:text-4xl">
              Questions answered
            </h2>
            <FaqAccordion />
          </div>
        </div>
      </section>
    </>
  );
}

const HOMEPAGE_COLLECTIONS_QUERY = `#graphql
  query HomepageCollections($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    collections(first: 12, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        handle
        title
        image {
          id
          url
          altText
          width
          height
        }
      }
    }
  }
` as const;

const HOMEPAGE_PRODUCTS_QUERY = `#graphql
  query HomepageProducts($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    products(first: 8, sortKey: BEST_SELLING) {
      nodes {
        id
        title
        handle
        featuredImage {
          id
          url
          altText
          width
          height
        }
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
          maxVariantPrice {
            amount
            currencyCode
          }
        }
        selectedOrFirstAvailableVariant {
          id
          availableForSale
        }
      }
    }
  }
` as const;
