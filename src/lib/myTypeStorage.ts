/**
 * Pure (environment-free) helpers for persisting the user's chosen type.
 * Kept separate from the `useMyType` hook so they are unit-testable in the
 * node vitest environment.
 *
 * Storage contract (globals.md): localStorage key `mbti:my-type` plus a cookie
 * of the same name (path=/, 1 year, SameSite=Lax).
 */

import { parseTypeCode, type TypeCode } from "@/data/types";

export const MY_TYPE_KEY = "mbti:my-type";

/** Same-tab change event (the native `storage` event only fires cross-tab). */
export const MY_TYPE_EVENT = "mbti:my-type-change";

/** One year, in seconds. */
export const MY_TYPE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

/**
 * Parses a stored value into a `TypeCode`. Tolerates case, surrounding
 * whitespace and a JSON-quoted string; anything else yields `null`.
 */
export function parseMyType(raw: string | null | undefined): TypeCode | null {
  if (raw == null) return null;
  let value = raw.trim();
  if (value.length >= 2 && value.startsWith('"') && value.endsWith('"')) {
    value = value.slice(1, -1).trim();
  }
  if (value.length === 0) return null;
  return parseTypeCode(value);
}

/** Serializes a type code for storage (the canonical uppercase code). */
export function serializeMyType(code: TypeCode): string {
  return code.toUpperCase();
}

export interface MyTypeCookieOptions {
  /** Append the `Secure` attribute (use when served over https). */
  secure?: boolean;
}

/**
 * Builds a `document.cookie` assignment string. Passing `null` produces a
 * string that expires the cookie immediately.
 */
export function buildMyTypeCookie(
  code: TypeCode | null,
  options: MyTypeCookieOptions = {},
): string {
  const value = code === null ? "" : serializeMyType(code);
  const maxAge = code === null ? 0 : MY_TYPE_COOKIE_MAX_AGE;
  const parts = [
    `${MY_TYPE_KEY}=${value}`,
    "Path=/",
    `Max-Age=${maxAge}`,
    "SameSite=Lax",
  ];
  if (options.secure) parts.push("Secure");
  return parts.join("; ");
}

/** Reads the chosen type out of a `Cookie` header / `document.cookie` string. */
export function readMyTypeFromCookieString(cookies: string): TypeCode | null {
  for (const pair of cookies.split(";")) {
    const eq = pair.indexOf("=");
    if (eq === -1) continue;
    if (pair.slice(0, eq).trim() === MY_TYPE_KEY) {
      return parseMyType(pair.slice(eq + 1));
    }
  }
  return null;
}
