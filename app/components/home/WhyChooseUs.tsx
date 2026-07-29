import {WHY_CHOOSE_US} from '~/lib/brand';
import {FadeIn} from '~/components/ui/FadeIn';

type WhyChooseUsProps = {
  className?: string;
};

export function WhyChooseUs({className = ''}: WhyChooseUsProps) {
  return (
    <section className={`section-pad bg-neutral ${className}`.trim()}>
      <div className="container-premium">
        <FadeIn className="mb-12 max-w-2xl">
          <p className="eyebrow mb-3">Why choose us</p>
          <h2 className="text-balance text-3xl sm:text-4xl">
            Premium frozen savouries, made with care
          </h2>
        </FadeIn>

        <ul className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {WHY_CHOOSE_US.map((item, index) => (
            <li key={item.title}>
              <FadeIn delay={index * 0.08}>
                <article className="h-full border-t border-brand/10 pt-6">
                  <h3 className="mb-3 text-xl">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-ink-muted">
                    {item.body}
                  </p>
                </article>
              </FadeIn>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
