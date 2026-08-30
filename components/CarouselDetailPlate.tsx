import type { ReactNode } from "react";

type CarouselDetailPlateProps = {
  title: string;
  description?: string;
  meta?: ReactNode;
  actions: ReactNode;
};

export function CarouselDetailPlate({
  title,
  description,
  meta,
  actions,
}: CarouselDetailPlateProps) {
  return (
    <div className="mt-6 rounded-sm border border-neutral-muted bg-neutral p-5 shadow-soft">
      <h3 className="font-display text-xl">{title}</h3>
      {description ? (
        <p className="mt-2 text-sm leading-relaxed text-ink-muted">{description}</p>
      ) : null}
      {meta ? <div className="mt-3 text-sm text-ink-muted">{meta}</div> : null}
      <div className="mt-5 flex flex-col gap-3">{actions}</div>
    </div>
  );
}
