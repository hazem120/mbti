/**
 * Shared pieces for the /api route handlers: locale validation, response
 * helpers with the standard Cache-Control/CORS headers, and error bodies.
 * See .superpowers/sdd/2026-09-30-mbti-explorer/task-5-brief.md.
 */

import { z } from "zod";

import type { Locale } from "@/lib/i18n";

/** Zod schema for the `locale` query param: only 'en' or 'ar' are valid. */
export const localeSchema = z.enum(["en", "ar"]);

const CACHE_CONTROL = "public, s-maxage=86400, stale-while-revalidate=604800";

const CORS_HEADERS: Readonly<Record<string, string>> = {
  "Access-Control-Allow-Origin": "*",
};

/** Success response: JSON body with the long-cache Cache-Control header plus CORS. */
export function json(data: unknown, init?: ResponseInit): Response {
  return Response.json(data, {
    ...init,
    headers: {
      "Cache-Control": CACHE_CONTROL,
      ...CORS_HEADERS,
      ...init?.headers,
    },
  });
}

/** Error response: JSON body, no-store (never long-cached), plus CORS. */
function errorResponse(body: Record<string, unknown>, status: number): Response {
  return Response.json(body, {
    status,
    headers: {
      "Cache-Control": "no-store",
      ...CORS_HEADERS,
    },
  });
}

export function badRequest(body: Record<string, unknown>): Response {
  return errorResponse(body, 400);
}

export function notFound(body: Record<string, unknown>): Response {
  return errorResponse(body, 404);
}

/**
 * Reads and validates the `locale` query param from a request URL, defaulting
 * to 'en' when missing. Returns the resolved Locale, or a ready-to-return 400
 * Response when the value is neither 'en' nor 'ar'.
 */
export function resolveLocale(url: URL): Locale | Response {
  const raw = url.searchParams.get("locale") ?? "en";
  const parsed = localeSchema.safeParse(raw);
  if (!parsed.success) {
    return badRequest({ error: "invalid_locale" });
  }
  return parsed.data;
}

/** 204 response for CORS preflight requests, allowing GET from any origin. */
export function preflight(): Response {
  return new Response(null, {
    status: 204,
    headers: {
      ...CORS_HEADERS,
      "Access-Control-Allow-Methods": "GET, OPTIONS",
    },
  });
}
