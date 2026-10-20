import { MENU_SECTIONS } from "@/lib/menu";

const JUMPS = [
  ...MENU_SECTIONS.map((section) => ({
    href: `#${section.id}`,
    label: section.title,
  })),
  { href: "#extras", label: "Extras" },
];

export function MenuJump() {
  return (
    <nav
      aria-label="Jump to a menu category"
      className="sticky top-[calc(4rem+env(safe-area-inset-top))] z-30 mb-8 max-w-full border-y border-neutral-muted bg-brand-inverse/95 backdrop-blur-md md:hidden"
    >
      <ul className="flex w-full min-w-0 gap-2 overflow-x-auto px-1 py-2">
        {JUMPS.map((item) => (
          <li key={item.href} className="shrink-0">
            <a
              href={item.href}
              className="inline-flex min-h-11 items-center whitespace-nowrap border border-neutral-muted bg-neutral px-3 text-[0.68rem] font-medium uppercase tracking-[0.12em] text-brand"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
