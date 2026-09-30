/**
 * Cognitive function domain data.
 * See .superpowers/sdd/2026-09-30-mbti-explorer/globals.md (Shared domain facts).
 */

export const FUNCTION_CODES = ["Ni", "Ne", "Si", "Se", "Ti", "Te", "Fi", "Fe"] as const;

export type FunctionCode = (typeof FUNCTION_CODES)[number];

export interface FunctionMeta {
  readonly code: FunctionCode;
  readonly element: "N" | "S" | "T" | "F";
  readonly attitude: "i" | "e";
  readonly kind: "perceiving" | "judging";
  readonly color: string;
}

export const FUNCTIONS: Readonly<Record<FunctionCode, FunctionMeta>> = {
  Ni: { code: "Ni", element: "N", attitude: "i", kind: "perceiving", color: "#c084fc" },
  Ne: { code: "Ne", element: "N", attitude: "e", kind: "perceiving", color: "#f472b6" },
  Si: { code: "Si", element: "S", attitude: "i", kind: "perceiving", color: "#60a5fa" },
  Se: { code: "Se", element: "S", attitude: "e", kind: "perceiving", color: "#fb923c" },
  Ti: { code: "Ti", element: "T", attitude: "i", kind: "judging", color: "#22d3ee" },
  Te: { code: "Te", element: "T", attitude: "e", kind: "judging", color: "#facc15" },
  Fi: { code: "Fi", element: "F", attitude: "i", kind: "judging", color: "#fb7185" },
  Fe: { code: "Fe", element: "F", attitude: "e", kind: "judging", color: "#4ade80" },
} as const;

const ATTITUDE_FLIP: Readonly<Record<FunctionCode, FunctionCode>> = {
  Ni: "Ne",
  Ne: "Ni",
  Si: "Se",
  Se: "Si",
  Ti: "Te",
  Te: "Ti",
  Fi: "Fe",
  Fe: "Fi",
} as const;

/** Ni -> Ne, Te -> Ti, etc: same element, opposite attitude. */
export function flipAttitude(fn: FunctionCode): FunctionCode {
  return ATTITUDE_FLIP[fn];
}

const PARTNER_ELEMENT: Readonly<Record<FunctionCode, FunctionCode>> = {
  Ni: "Si",
  Si: "Ni",
  Ne: "Se",
  Se: "Ne",
  Ti: "Fi",
  Fi: "Ti",
  Te: "Fe",
  Fe: "Te",
} as const;

/** Same attitude, paired element (N<->S, T<->F): Ni -> Si, Te -> Fe. */
export function partnerElement(fn: FunctionCode): FunctionCode {
  return PARTNER_ELEMENT[fn];
}

const FUNCTION_CODE_SET: ReadonlySet<string> = new Set(FUNCTION_CODES);

/** Case-insensitive parse, e.g. 'ni' -> 'Ni'; returns null when not a real function code. */
export function parseFunctionCode(s: string): FunctionCode | null {
  if (s.length !== 2) return null;
  const normalized = `${s[0].toUpperCase()}${s[1].toLowerCase()}`;
  return FUNCTION_CODE_SET.has(normalized) ? (normalized as FunctionCode) : null;
}
