/**
 * Socionics intertype relations, derived from MBTI stacks.
 * MBTI dominant = socionics base, MBTI auxiliary = socionics creative.
 * See .superpowers/sdd/2026-09-30-mbti-explorer/task-2-brief.md.
 */

import type { FunctionCode } from "@/data/functions";
import { flipAttitude, partnerElement } from "@/data/functions";
import type { TypeCode } from "@/data/types";
import { TYPE_CODES, TYPES } from "@/data/types";

export const RELATION_KINDS = [
  "identity",
  "mirror",
  "dual",
  "activity",
  "superego",
  "conflict",
  "extinguishment",
  "quasiIdentity",
  "kindred",
  "business",
  "semiDual",
  "mirage",
  "supervisor",
  "supervisee",
  "benefactor",
  "beneficiary",
] as const;

export type RelationKind = (typeof RELATION_KINDS)[number];

export const RELATION_GROUPS = ["complementary", "similar", "asymmetric", "challenging"] as const;

export type RelationGroup = (typeof RELATION_GROUPS)[number];

export const RELATION_GROUP_COLORS: Readonly<Record<RelationGroup, string>> = {
  complementary: "#5eead4",
  similar: "#a5b4fc",
  asymmetric: "#f0abfc",
  challenging: "#fda4af",
} as const;

export const RELATION_META: Readonly<Record<RelationKind, { score: number; group: RelationGroup }>> = {
  dual: { score: 96, group: "complementary" },
  activity: { score: 88, group: "complementary" },
  semiDual: { score: 80, group: "complementary" },
  mirage: { score: 76, group: "complementary" },
  mirror: { score: 74, group: "similar" },
  identity: { score: 70, group: "similar" },
  kindred: { score: 68, group: "similar" },
  business: { score: 64, group: "similar" },
  benefactor: { score: 58, group: "asymmetric" },
  beneficiary: { score: 58, group: "asymmetric" },
  extinguishment: { score: 52, group: "challenging" },
  quasiIdentity: { score: 46, group: "challenging" },
  supervisor: { score: 38, group: "asymmetric" },
  supervisee: { score: 38, group: "asymmetric" },
  superego: { score: 34, group: "challenging" },
  conflict: { score: 24, group: "challenging" },
} as const;

/** supervisor<->supervisee and benefactor<->beneficiary swap; every other kind maps to itself. */
export function inverseKind(kind: RelationKind): RelationKind {
  switch (kind) {
    case "supervisor":
      return "supervisee";
    case "supervisee":
      return "supervisor";
    case "benefactor":
      return "beneficiary";
    case "beneficiary":
      return "benefactor";
    default:
      return kind;
  }
}

const POSITION_TO_KIND: Readonly<Record<string, RelationKind>> = {
  "1,2": "identity",
  "2,1": "mirror",
  "5,6": "dual",
  "6,5": "activity",
  "3,4": "superego",
  "4,3": "conflict",
  "7,8": "extinguishment",
  "8,7": "quasiIdentity",
  "1,4": "kindred",
  "3,2": "business",
  "5,8": "semiDual",
  "7,6": "mirage",
  "2,3": "supervisor",
  "4,1": "supervisee",
  "8,5": "benefactor",
  "6,7": "beneficiary",
} as const;

/**
 * Model A positions 1-8 for a type, with B = dominant and C = auxiliary.
 */
export function modelA(code: TypeCode): readonly [
  FunctionCode,
  FunctionCode,
  FunctionCode,
  FunctionCode,
  FunctionCode,
  FunctionCode,
  FunctionCode,
  FunctionCode,
] {
  const [b, c] = TYPES[code].stack;
  return [
    b,
    c,
    partnerElement(b),
    partnerElement(c),
    flipAttitude(partnerElement(b)),
    flipAttitude(partnerElement(c)),
    flipAttitude(b),
    flipAttitude(c),
  ];
}

export interface Relation {
  readonly a: TypeCode;
  readonly b: TypeCode;
  readonly kind: RelationKind;
  readonly score: number;
  readonly group: RelationGroup;
  readonly sharedFunctions: readonly FunctionCode[];
}

function sharedFunctionsFor(a: TypeCode, b: TypeCode): FunctionCode[] {
  const bStack = TYPES[b].stack;
  return TYPES[a].stack.filter((fn) => bStack.includes(fn));
}

export function getRelation(a: TypeCode, b: TypeCode): Relation {
  const positions = modelA(a);
  const [bDominant, bAuxiliary] = TYPES[b].stack;
  const p = positions.indexOf(bDominant) + 1;
  const q = positions.indexOf(bAuxiliary) + 1;
  const kind = POSITION_TO_KIND[`${p},${q}`];
  const meta = RELATION_META[kind];
  return {
    a,
    b,
    kind,
    score: meta.score,
    group: meta.group,
    sharedFunctions: sharedFunctionsFor(a, b),
  };
}

/** All 16 relations from `a`, including self (identity), sorted by score descending,
 * ties broken by TYPE_CODES order. */
export function getRelationsFor(a: TypeCode): Relation[] {
  return TYPE_CODES.map((b) => getRelation(a, b)).sort((x, y) => {
    if (y.score !== x.score) return y.score - x.score;
    return TYPE_CODES.indexOf(x.b) - TYPE_CODES.indexOf(y.b);
  });
}
