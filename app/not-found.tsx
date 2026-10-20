import Link from "next/link";
import { SITE_NAME } from "@/lib/site";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-svh max-w-md flex-col items-center justify-center bg-brand-inverse px-5 text-center text-brand">
      <h1 className="text-3xl">Page not found</h1>
      <p className="mt-3 text-sm leading-relaxed text-ink-muted">
        {SITE_NAME} takes orders on WhatsApp. The menu is on the home page.
      </p>
      <Link href="/#menu" className="btn-primary mt-6">
        Back to menu
      </Link>
    </main>
  );
}
