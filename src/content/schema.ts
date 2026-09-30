/**
 * Typed shape of all localized domain prose (types, functions, relations, meta).
 * Every locale under src/content/<locale>/ must satisfy `SiteContent`.
 * See .superpowers/sdd/2026-09-30-mbti-explorer/task-3-brief.md.
 */

import type { FunctionCode, RelationGroup, RelationKind, Temperament, TypeCode } from "@/data";

export const SITUATION_KEYS = [
  "work",
  "love",
  "friendship",
  "stress",
  "conflict",
  "decisions",
  "learning",
  "leadership",
] as const;

export type SituationKey = (typeof SITUATION_KEYS)[number];

export interface SituationContent {
  summary: string;
  behaviors: [string, string, string];
  tip: string;
}

export interface TypeContent {
  nickname: string;
  tagline: string;
  overview: string;
  strengths: [string, string, string, string];
  blindSpots: [string, string, string, string];
  situations: Record<SituationKey, SituationContent>;
}

export interface FunctionContent {
  name: string;
  short: string;
  description: string;
  asDominant: string;
  asInferior: string;
  keywords: [string, string, string, string];
}

export interface RelationContent {
  name: string;
  tagline: string;
  description: string;
  whatWorks: [string, string, string];
  watchOut: [string, string, string];
}

export interface SiteContent {
  types: Record<TypeCode, TypeContent>;
  functions: Record<FunctionCode, FunctionContent>;
  relations: Record<RelationKind, RelationContent>;
  situations: Record<SituationKey, { title: string; description: string }>;
  temperaments: Record<Temperament, { name: string; description: string }>;
  relationGroups: Record<RelationGroup, { name: string; description: string }>;
}
