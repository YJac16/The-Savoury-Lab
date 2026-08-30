import Link from "next/link";
import { SITE_NAME } from "@/lib/site";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-svh max-w-md flex-col items-center justify-center px-4 text-center">
      <h1 className="text-2xl font-semibold uppercase tracking-wide">
        Page not found
      </h1>
      <p className="mt-3 text-sm text-mute">
        {SITE_NAME} is a WhatsApp order page. The menu is on the home page.
      </p>
      <Link
        href="/"
        className="mt-6 inline-flex min-h-12 items-center justify-center bg-ink px-6 text-sm font-medium uppercase tracking-[0.16em] text-paper"
      >
        Back to menu
      </Link>
    </main>
  );
}
