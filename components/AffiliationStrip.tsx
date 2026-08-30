import { BILS_INSTAGRAM_URL, BILS_URL } from "@/lib/site";

export function AffiliationStrip() {
  return (
    <div className="border-t border-neutral-muted/80 bg-brand-inverse py-4 text-center">
      <p className="text-xs text-ink-muted">
        Affiliated with{" "}
        <a
          href={BILS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="min-h-11 inline-flex items-center font-medium text-brand underline-offset-4 hover:text-accent hover:underline focus-visible:underline"
        >
          BIL&apos;s
        </a>
        {" · "}
        <a
          href={BILS_INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="min-h-11 inline-flex items-center font-medium text-brand underline-offset-4 hover:text-accent hover:underline focus-visible:underline"
        >
          Instagram
        </a>
      </p>
    </div>
  );
}
