"use client";

import { useId, useState } from "react";
import { FAQ_ITEMS } from "@/lib/brand";

type FaqItem = {
  question: string;
  answer: string;
};

function FaqItemPanel({
  item,
  isOpen,
  onToggle,
  panelId,
  buttonId,
}: {
  item: FaqItem;
  isOpen: boolean;
  onToggle: () => void;
  panelId: string;
  buttonId: string;
}) {
  return (
    <div className="border-b border-neutral-muted">
      <h3>
        <button
          id={buttonId}
          type="button"
          className="flex w-full items-center justify-between gap-6 py-6 text-left font-sans text-base font-medium text-brand transition-colors hover:text-accent focus-visible:-outline-offset-2"
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={onToggle}
        >
          <span>{item.question}</span>
          <span
            className={`shrink-0 text-accent transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}
            aria-hidden="true"
          >
            +
          </span>
        </button>
      </h3>
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        hidden={!isOpen}
        className={isOpen ? "block" : "hidden"}
      >
        <p className="pb-6 pr-8 text-sm leading-relaxed text-ink-muted">
          {item.answer}
        </p>
      </div>
    </div>
  );
}

export function FaqAccordion({
  items = FAQ_ITEMS,
}: {
  items?: ReadonlyArray<FaqItem>;
}) {
  const baseId = useId();
  const [openIndexes, setOpenIndexes] = useState<Set<number>>(new Set());

  function toggleIndex(index: number) {
    setOpenIndexes((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  }

  return (
    <div className="divide-y divide-neutral-muted border-t border-neutral-muted">
      {items.map((item, index) => (
        <FaqItemPanel
          key={item.question}
          item={item}
          isOpen={openIndexes.has(index)}
          onToggle={() => toggleIndex(index)}
          buttonId={`${baseId}-button-${index}`}
          panelId={`${baseId}-panel-${index}`}
        />
      ))}
    </div>
  );
}
