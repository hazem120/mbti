/**
 * MBTI type domain data.
 * See .superpowers/sdd/2026-09-30-mbti-explorer/globals.md (Shared domain facts).
 */

import type { FunctionCode } from "@/data/functions";

export const TYPE_CODES = [
  "INTJ",
  "INTP",
  "ENTJ",
  "ENTP",
  "INFJ",
  "INFP",
  "ENFJ",
  "ENFP",
  "ISTJ",
  "ISFJ",
  "ESTJ",
  "ESFJ",
  "ISTP",
  "ISFP",
  "ESTP",
  "ESFP",
] as const;

export type TypeCode = (typeof TYPE_CODES)[number];

export type Temperament = "NT" | "NF" | "SJ" | "SP";

export interface TypeMeta {
  readonly code: TypeCode;
  readonly temperament: Temperament;
  readonly stack: readonly [FunctionCode, FunctionCode, FunctionCode, FunctionCode];
  readonly accent: string;
}

export const TYPES: Readonly<Record<TypeCode, TypeMeta>> = {
  INTJ: { code: "INTJ", temperament: "NT", stack: ["Ni", "Te", "Fi", "Se"], accent: "#8b5cf6" },
  INTP: { code: "INTP", temperament: "NT", stack: ["Ti", "Ne", "Si", "Fe"], accent: "#a78bfa" },
  ENTJ: { code: "ENTJ", temperament: "NT", stack: ["Te", "Ni", "Se", "Fi"], accent: "#7c3aed" },
  ENTP: { code: "ENTP", temperament: "NT", stack: ["Ne", "Ti", "Fe", "Si"], accent: "#c4b5fd" },

  INFJ: { code: "INFJ", temperament: "NF", stack: ["Ni", "Fe", "Ti", "Se"], accent: "#10b981" },
  INFP: { code: "INFP", temperament: "NF", stack: ["Fi", "Ne", "Si", "Te"], accent: "#34d399" },
  ENFJ: { code: "ENFJ", temperament: "NF", stack: ["Fe", "Ni", "Se", "Ti"], accent: "#059669" },
  ENFP: { code: "ENFP", temperament: "NF", stack: ["Ne", "Fi", "Te", "Si"], accent: "#6ee7b7" },

  ISTJ: { code: "ISTJ", temperament: "SJ", stack: ["Si", "Te", "Fi", "Ne"], accent: "#3b82f6" },
  ISFJ: { code: "ISFJ", temperament: "SJ", stack: ["Si", "Fe", "Ti", "Ne"], accent: "#60a5fa" },
  ESTJ: { code: "ESTJ", temperament: "SJ", stack: ["Te", "Si", "Ne", "Fi"], accent: "#2563eb" },
  ESFJ: { code: "ESFJ", temperament: "SJ", stack: ["Fe", "Si", "Ne", "Ti"], accent: "#93c5fd" },

  ISTP: { code: "ISTP", temperament: "SP", stack: ["Ti", "Se", "Ni", "Fe"], accent: "#f59e0b" },
  ISFP: { code: "ISFP", temperament: "SP", stack: ["Fi", "Se", "Ni", "Te"], accent: "#fbbf24" },
  ESTP: { code: "ESTP", temperament: "SP", stack: ["Se", "Ti", "Fe", "Ni"], accent: "#d97706" },
  ESFP: { code: "ESFP", temperament: "SP", stack: ["Se", "Fi", "Te", "Ni"], accent: "#fcd34d" },
} as const;

export const TEMPERAMENTS: readonly Temperament[] = ["NT", "NF", "SJ", "SP"] as const;

/**
 * One representative hex per temperament, matching the `--color-nt` /
 * `--color-nf` / `--color-sj` / `--color-sp` design tokens defined in
 * src/app/globals.css (Task 1).
 */
export const TEMPERAMENT_COLORS: Readonly<Record<Temperament, string>> = {
  NT: "#a78bfa",
  NF: "#34d399",
  SJ: "#60a5fa",
  SP: "#fbbf24",
} as const;

const TYPE_CODE_SET: ReadonlySet<string> = new Set(TYPE_CODES);

/** Case-insensitive parse, e.g. 'infj' -> 'INFJ'; returns null when not a real type code. */
export function parseTypeCode(s: string): TypeCode | null {
  const normalized = s.toUpperCase();
  return TYPE_CODE_SET.has(normalized) ? (normalized as TypeCode) : null;
}

export function typesByTemperament(t: Temperament): TypeCode[] {
  return TYPE_CODES.filter((code) => TYPES[code].temperament === t);
}

export function typesWithFunctionAt(fn: FunctionCode, index: 0 | 1 | 2 | 3): TypeCode[] {
  return TYPE_CODES.filter((code) => TYPES[code].stack[index] === fn);
}
