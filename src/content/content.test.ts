import { describe, expect, it } from "vitest";

import {
  FUNCTION_CODES,
  RELATION_GROUPS,
  RELATION_KINDS,
  TEMPERAMENTS,
  TYPE_CODES,
} from "@/data";
import { getContent } from "@/content";
import { SITUATION_KEYS } from "@/content/schema";

const en = getContent("en");

function expectText(value: unknown, label: string): void {
  expect(typeof value, label).toBe("string");
  expect((value as string).trim().length, label).toBeGreaterThan(0);
}

function expectTexts(values: readonly unknown[], length: number, label: string): void {
  expect(Array.isArray(values), label).toBe(true);
  expect(values, label).toHaveLength(length);
  values.forEach((v, i) => expectText(v, `${label}[${i}]`));
}

function wordCount(s: string): number {
  return s.trim().split(/\s+/).length;
}

describe("SITUATION_KEYS", () => {
  it("lists the eight situations in shared-facts order", () => {
    expect(SITUATION_KEYS).toEqual([
      "work",
      "love",
      "friendship",
      "stress",
      "conflict",
      "decisions",
      "learning",
      "leadership",
    ]);
  });
});

describe("en content: types", () => {
  it("has exactly the sixteen type codes", () => {
    expect(Object.keys(en.types).sort()).toEqual([...TYPE_CODES].sort());
  });

  it.each(TYPE_CODES)("%s has complete, non-empty content", (code) => {
    const t = en.types[code];
    expectText(t.nickname, `${code}.nickname`);
    expectText(t.tagline, `${code}.tagline`);
    expectText(t.overview, `${code}.overview`);
    expectTexts(t.strengths, 4, `${code}.strengths`);
    expectTexts(t.blindSpots, 4, `${code}.blindSpots`);
    expect(Object.keys(t.situations).sort()).toEqual([...SITUATION_KEYS].sort());
    for (const key of SITUATION_KEYS) {
      const s = t.situations[key];
      expectText(s.summary, `${code}.${key}.summary`);
      expectTexts(s.behaviors, 3, `${code}.${key}.behaviors`);
      expectText(s.tip, `${code}.${key}.tip`);
    }
  });

  it.each(TYPE_CODES)("%s tagline is at most 90 characters", (code) => {
    expect(en.types[code].tagline.length).toBeLessThanOrEqual(90);
  });

  it.each(TYPE_CODES)("%s strengths and blind spots are at most 12 words", (code) => {
    const t = en.types[code];
    for (const line of [...t.strengths, ...t.blindSpots]) {
      expect(wordCount(line), line).toBeLessThanOrEqual(12);
    }
  });

  it("uses the shared-facts nicknames", () => {
    const nicknames = Object.fromEntries(TYPE_CODES.map((c) => [c, en.types[c].nickname]));
    expect(nicknames).toEqual({
      INTJ: "The Strategist",
      INTP: "The Theorist",
      ENTJ: "The Director",
      ENTP: "The Provocateur",
      INFJ: "The Seer",
      INFP: "The Idealist",
      ENFJ: "The Catalyst",
      ENFP: "The Spark",
      ISTJ: "The Keeper",
      ISFJ: "The Guardian",
      ESTJ: "The Organizer",
      ESFJ: "The Host",
      ISTP: "The Tinkerer",
      ISFP: "The Artisan",
      ESTP: "The Maverick",
      ESFP: "The Showstopper",
    });
  });

  it("never repeats a sentence-level string across or within types", () => {
    const seen = new Map<string, string>();
    for (const code of TYPE_CODES) {
      const t = en.types[code];
      const lines: [string, string][] = [
        [`${code}.tagline`, t.tagline],
        [`${code}.overview`, t.overview],
        ...t.strengths.map((s, i): [string, string] => [`${code}.strengths[${i}]`, s]),
        ...t.blindSpots.map((s, i): [string, string] => [`${code}.blindSpots[${i}]`, s]),
      ];
      for (const key of SITUATION_KEYS) {
        const s = t.situations[key];
        lines.push([`${code}.${key}.summary`, s.summary], [`${code}.${key}.tip`, s.tip]);
        s.behaviors.forEach((b, i) => lines.push([`${code}.${key}.behaviors[${i}]`, b]));
      }
      for (const [where, text] of lines) {
        const normalized = text.trim().toLowerCase();
        expect(seen.get(normalized), `${where} duplicates ${seen.get(normalized)}`).toBeUndefined();
        seen.set(normalized, where);
      }
    }
  });
});

describe("en content: functions", () => {
  it.each(FUNCTION_CODES)("%s has complete, non-empty content", (code) => {
    const f = en.functions[code];
    expectText(f.name, `${code}.name`);
    expectText(f.short, `${code}.short`);
    expectText(f.description, `${code}.description`);
    expectText(f.asDominant, `${code}.asDominant`);
    expectText(f.asInferior, `${code}.asInferior`);
    expectTexts(f.keywords, 4, `${code}.keywords`);
  });
});

describe("en content: relations", () => {
  it.each(RELATION_KINDS)("%s has complete, non-empty content", (kind) => {
    const r = en.relations[kind];
    expectText(r.name, `${kind}.name`);
    expectText(r.tagline, `${kind}.tagline`);
    expectText(r.description, `${kind}.description`);
    expectTexts(r.whatWorks, 3, `${kind}.whatWorks`);
    expectTexts(r.watchOut, 3, `${kind}.watchOut`);
  });

  it("never names a specific type code", () => {
    const pattern = new RegExp(`\\b(${TYPE_CODES.join("|")})\\b`);
    for (const kind of RELATION_KINDS) {
      const r = en.relations[kind];
      const all = [r.name, r.tagline, r.description, ...r.whatWorks, ...r.watchOut].join(" ");
      expect(all, kind).not.toMatch(pattern);
    }
  });
});

describe("en content: meta", () => {
  it.each(SITUATION_KEYS)("situation %s has a title and description", (key) => {
    expectText(en.situations[key].title, `${key}.title`);
    expectText(en.situations[key].description, `${key}.description`);
  });

  it.each(TEMPERAMENTS)("temperament %s has a name and description", (t) => {
    expectText(en.temperaments[t].name, `${t}.name`);
    expectText(en.temperaments[t].description, `${t}.description`);
  });

  it("uses the shared-facts temperament names", () => {
    expect(TEMPERAMENTS.map((t) => en.temperaments[t].name)).toEqual([
      "Rationalists",
      "Empaths",
      "Stewards",
      "Adventurers",
    ]);
  });

  it.each(RELATION_GROUPS)("relation group %s has a name and description", (g) => {
    expectText(en.relationGroups[g].name, `${g}.name`);
    expectText(en.relationGroups[g].description, `${g}.description`);
  });
});

describe("getContent", () => {
  it("returns a complete SiteContent for ar (English fallback until Task 4)", () => {
    const ar = getContent("ar");
    expect(Object.keys(ar.types)).toHaveLength(TYPE_CODES.length);
    expect(Object.keys(ar.functions)).toHaveLength(FUNCTION_CODES.length);
    expect(Object.keys(ar.relations)).toHaveLength(RELATION_KINDS.length);
  });
});
