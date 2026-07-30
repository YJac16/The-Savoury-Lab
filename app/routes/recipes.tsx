import {Link, useLoaderData} from 'react-router';
import type {Route} from './+types/recipes';
import {Image} from '@shopify/hydrogen';
import {BRAND} from '~/lib/brand';
import {buildSeo} from '~/lib/seo';
import {FadeIn} from '~/components/ui/FadeIn';
import {Button} from '~/components/ui/Button';

type RecipeArticle = {
  id: string;
  handle: string;
  title: string;
  excerpt?: string | null;
  publishedAt?: string | null;
  image?: {
    id?: string | null;
    url: string;
    altText?: string | null;
    width?: number | null;
    height?: number | null;
  } | null;
};

export const meta: Route.MetaFunction = ({data}) => {
  return buildSeo({
    title: 'Recipes',
    description: `Serving ideas and kitchen inspiration from ${BRAND.name}.`,
    path: '/recipes',
    noIndex: !data?.articles.length,
  });
};

export async function loader({context}: Route.LoaderArgs) {
  const {storefront} = context;

  for (const blogHandle of ['recipes', 'journal'] as const) {
    const {blog} = await storefront.query(RECIPES_BLOG_QUERY, {
      variables: {blogHandle, first: 24},
    });

    if (blog?.articles?.nodes?.length) {
      return {
        blogHandle,
        blogTitle: blog.title,
        articles: blog.articles.nodes as RecipeArticle[],
      };
    }
  }

  const {blog: recipesBlog} = await storefront.query(RECIPES_BLOG_QUERY, {
    variables: {blogHandle: 'recipes', first: 24},
  });

  return {
    blogHandle: recipesBlog?.handle ?? 'recipes',
    blogTitle: recipesBlog?.title ?? 'Recipes',
    articles: (recipesBlog?.articles?.nodes ?? []) as RecipeArticle[],
  };
}

export default function RecipesPage() {
  const {articles, blogHandle, blogTitle} = useLoaderData<typeof loader>();

  if (!articles.length) {
    return (
      <div className="container-premium section-pad text-center">
        <FadeIn className="mx-auto max-w-lg">
          <p className="eyebrow mb-4">Recipes</p>
          <h1 className="text-4xl">Coming soon to the kitchen journal</h1>
          <p className="mt-4 text-sm leading-relaxed text-ink-muted">
            We are preparing serving ideas and heating tips. In the meantime,
            follow us on Instagram for inspiration from our Kenilworth kitchen.
          </p>
          <div className="mt-8">
            <Button href={BRAND.contact.instagram} variant="primary">
              Follow on Instagram
            </Button>
          </div>
        </FadeIn>
      </div>
    );
  }

  return (
    <div className="bg-brand-inverse">
      <section className="border-b border-neutral-muted bg-neutral">
        <div className="container-premium section-pad">
          <FadeIn className="max-w-2xl">
            <p className="eyebrow mb-3">Kitchen journal</p>
            <h1 className="text-4xl sm:text-5xl">{blogTitle}</h1>
            <p className="mt-4 text-sm text-ink-muted">
              Serving suggestions, celebration spreads, and tips from{' '}
              {BRAND.name}.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="container-premium section-pad">
        <ul className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article, index) => {
            const publishedAt = article.publishedAt
              ? new Intl.DateTimeFormat('en-ZA', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                }).format(new Date(article.publishedAt))
              : null;

            return (
              <li key={article.id}>
                <FadeIn delay={index * 0.06}>
                  <article className="group flex h-full flex-col overflow-hidden border border-neutral-muted bg-brand-inverse shadow-soft transition-shadow hover:shadow-soft">
                    <Link
                      to={`/blogs/${blogHandle}/${article.handle}`}
                      prefetch="intent"
                      className="block"
                    >
                      {article.image && (
                        <div className="aspect-3/2 overflow-hidden bg-neutral-muted">
                          <Image
                            data={article.image}
                            alt={article.image.altText || article.title}
                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                            sizes="(min-width: 1024px) 400px, 100vw"
                            loading={index < 3 ? 'eager' : 'lazy'}
                          />
                        </div>
                      )}
                      <div className="flex flex-1 flex-col p-6">
                        {publishedAt && (
                          <time
                            dateTime={article.publishedAt!}
                            className="text-xs uppercase tracking-[0.14em] text-ink-muted"
                          >
                            {publishedAt}
                          </time>
                        )}
                        <h2 className="mt-3 font-display text-xl leading-snug text-brand transition-colors group-hover:text-accent">
                          {article.title}
                        </h2>
                        {article.excerpt && (
                          <p className="mt-3 line-clamp-3 text-sm text-ink-muted">
                            {article.excerpt}
                          </p>
                        )}
                        <span className="mt-auto pt-4 text-xs font-medium uppercase tracking-[0.16em] text-accent">
                          Read article →
                        </span>
                      </div>
                    </Link>
                  </article>
                </FadeIn>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}

const RECIPES_BLOG_QUERY = `#graphql
  query RecipesBlog(
    $blogHandle: String!
    $first: Int
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    blog(handle: $blogHandle) {
      title
      handle
      articles(first: $first, sortKey: PUBLISHED_AT, reverse: true) {
        nodes {
          id
          handle
          title
          excerpt
          publishedAt
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
  }
` as const;
