import {REVIEWS} from '~/lib/brand';
import {FadeIn} from '~/components/ui/FadeIn';

type CustomerReviewsProps = {
  className?: string;
};

function StarRating({rating}: {rating: number}) {
  return (
    <div
      className="flex gap-1 text-accent"
      role="img"
      aria-label={`${rating} out of 5 stars`}
    >
      {Array.from({length: 5}, (_, index) => (
        <span key={index} aria-hidden="true">
          {index < rating ? '★' : '☆'}
        </span>
      ))}
    </div>
  );
}

export function CustomerReviews({className = ''}: CustomerReviewsProps) {
  return (
    <section className={`section-pad bg-brand-inverse ${className}`.trim()}>
      <div className="container-premium">
        <FadeIn className="mb-12 max-w-2xl">
          <p className="eyebrow mb-3">Reviews</p>
          <h2 className="text-balance text-3xl sm:text-4xl">
            Loved by Cape Town tables
          </h2>
        </FadeIn>

        <ul className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {REVIEWS.map((review, index) => (
            <li key={review.name}>
              <FadeIn delay={index * 0.1}>
                <blockquote className="flex h-full flex-col border border-neutral-muted bg-neutral p-8 shadow-soft">
                  <StarRating rating={review.rating} />
                  <p className="my-6 flex-1 text-base leading-relaxed text-brand">
                    &ldquo;{review.quote}&rdquo;
                  </p>
                  <footer className="border-t border-neutral-muted pt-5">
                    <cite className="not-italic">
                      <span className="block font-medium text-brand">
                        {review.name}
                      </span>
                      <span className="text-sm text-ink-muted">
                        {review.location}
                      </span>
                    </cite>
                  </footer>
                </blockquote>
              </FadeIn>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
