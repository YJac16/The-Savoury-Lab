import { HOW_IT_WORKS } from "@/lib/brand";

export function HowItWorks() {
  return (
    <section className="section-pad bg-brand-inverse" aria-label="How it works">
      <div className="container-premium">
        <div className="mb-12 max-w-2xl">
          <p className="eyebrow mb-3">How it works</p>
          <h2 className="text-balance text-3xl sm:text-4xl">
            From freezer to table in minutes
          </h2>
        </div>

        <ol className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
          {HOW_IT_WORKS.map((step) => (
            <li key={step.step}>
              <article>
                <p className="eyebrow mb-4 text-brand/40">{step.step}</p>
                <h3 className="mb-3 text-2xl">{step.title}</h3>
                <p className="text-sm leading-relaxed text-ink-muted">
                  {step.body}
                </p>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
