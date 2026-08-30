import { WHY_CHOOSE_US } from "@/lib/brand";

export function WhyChooseUs() {
  return (
    <section className="section-pad bg-neutral" aria-label="Why choose us">
      <div className="container-premium">
        <div className="mb-12 max-w-2xl">
          <p className="eyebrow mb-3">Why choose us</p>
          <h2 className="text-balance text-3xl sm:text-4xl">
            Premium frozen savouries, made with care
          </h2>
        </div>

        <ul className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {WHY_CHOOSE_US.map((item) => (
            <li key={item.title}>
              <article className="h-full border-t border-brand/10 pt-6">
                <h3 className="mb-3 text-xl">{item.title}</h3>
                <p className="text-sm leading-relaxed text-ink-muted">
                  {item.body}
                </p>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
