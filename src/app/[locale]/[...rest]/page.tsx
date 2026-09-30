import { notFound } from "next/navigation";

/**
 * Catch-all for any path under a locale that doesn't match a real route.
 * Without this, Next.js can't identify unmatched paths as belonging to the
 * `[locale]` segment tree, so it falls back to the generic global 404
 * instead of our styled `[locale]/not-found.tsx`. See:
 * https://next-intl.dev/docs/environments/error-files#catching-unknown-routes
 */
export function generateStaticParams() {
  return [];
}

export default function CatchAll(): never {
  notFound();
}
