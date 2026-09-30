import createMiddleware from "next-intl/middleware";

import { routing } from "@/i18n/routing";

export const proxy = createMiddleware(routing);

export const config = {
  // Skip API routes, Next internals, Vercel internals, and any request for
  // a file (path segment containing a dot, e.g. favicon.ico).
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
