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
import type { Locale } from "@/lib/i18n";

const LOCALES: readonly Locale[] = ["en", "ar"];

/** Arabic words run longer and are counted differently, so ar gets a looser cap. */
const MAX_LINE_WORDS: Record<Locale, number> = { en: 12, ar: 14 };

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

/** Every string leaf in a content tree, paired with its dotted path. */
function collectStrings(node: unknown, path = ""): [string, string][] {
  if (typeof node === "string") return [[path, node]];
  if (Array.isArray(node)) return node.flatMap((v, i) => collectStrings(v, `${path}[${i}]`));
  if (node !== null && typeof node === "object") {
    return Object.entries(node).flatMap(([k, v]) => collectStrings(v, path ? `${path}.${k}` : k));
  }
  return [];
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

describe.each(LOCALES)("%s content: types", (locale) => {
  const content = getContent(locale);

  it("has exactly the sixteen type codes", () => {
    expect(Object.keys(content.types).sort()).toEqual([...TYPE_CODES].sort());
  });

  it.each(TYPE_CODES)("%s has complete, non-empty content", (code) => {
    const t = content.types[code];
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
    expect(content.types[code].tagline.length).toBeLessThanOrEqual(90);
  });

  it.each(TYPE_CODES)(`%s strengths and blind spots are at most ${MAX_LINE_WORDS[locale]} words`, (code) => {
    const t = content.types[code];
    for (const line of [...t.strengths, ...t.blindSpots]) {
      expect(wordCount(line), line).toBeLessThanOrEqual(MAX_LINE_WORDS[locale]);
    }
  });

  it("gives every type a distinct nickname", () => {
    const nicknames = TYPE_CODES.map((c) => content.types[c].nickname);
    expect(new Set(nicknames).size).toBe(TYPE_CODES.length);
  });

  it("never repeats a sentence-level string across or within types", () => {
    const seen = new Map<string, string>();
    for (const code of TYPE_CODES) {
      const t = content.types[code];
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

describe.each(LOCALES)("%s content: functions", (locale) => {
  const content = getContent(locale);

  it.each(FUNCTION_CODES)("%s has complete, non-empty content", (code) => {
    const f = content.functions[code];
    expectText(f.name, `${code}.name`);
    expectText(f.short, `${code}.short`);
    expectText(f.description, `${code}.description`);
    expectText(f.asDominant, `${code}.asDominant`);
    expectText(f.asInferior, `${code}.asInferior`);
    expectTexts(f.keywords, 4, `${code}.keywords`);
  });
});

describe.each(LOCALES)("%s content: relations", (locale) => {
  const content = getContent(locale);

  it.each(RELATION_KINDS)("%s has complete, non-empty content", (kind) => {
    const r = content.relations[kind];
    expectText(r.name, `${kind}.name`);
    expectText(r.tagline, `${kind}.tagline`);
    expectText(r.description, `${kind}.description`);
    expectTexts(r.whatWorks, 3, `${kind}.whatWorks`);
    expectTexts(r.watchOut, 3, `${kind}.watchOut`);
  });

  it("never names a specific type code", () => {
    const pattern = new RegExp(`\\b(${TYPE_CODES.join("|")})\\b`);
    for (const kind of RELATION_KINDS) {
      const r = content.relations[kind];
      const all = [r.name, r.tagline, r.description, ...r.whatWorks, ...r.watchOut].join(" ");
      expect(all, kind).not.toMatch(pattern);
    }
  });

  it("gives every relation a distinct name", () => {
    const names = RELATION_KINDS.map((k) => content.relations[k].name);
    expect(new Set(names).size).toBe(RELATION_KINDS.length);
  });
});

describe.each(LOCALES)("%s content: meta", (locale) => {
  const content = getContent(locale);

  it.each(SITUATION_KEYS)("situation %s has a title and description", (key) => {
    expectText(content.situations[key].title, `${key}.title`);
    expectText(content.situations[key].description, `${key}.description`);
  });

  it.each(TEMPERAMENTS)("temperament %s has a name and description", (t) => {
    expectText(content.temperaments[t].name, `${t}.name`);
    expectText(content.temperaments[t].description, `${t}.description`);
  });

  it.each(RELATION_GROUPS)("relation group %s has a name and description", (g) => {
    expectText(content.relationGroups[g].name, `${g}.name`);
    expectText(content.relationGroups[g].description, `${g}.description`);
  });
});

describe("en content: shared-facts names", () => {
  const en = getContent("en");

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

  it("uses the shared-facts temperament names", () => {
    expect(TEMPERAMENTS.map((t) => en.temperaments[t].name)).toEqual([
      "Rationalists",
      "Empaths",
      "Stewards",
      "Adventurers",
    ]);
  });
});

describe("ar content: glossary", () => {
  const ar = getContent("ar");

  it("uses the chosen Arabic nicknames", () => {
    const nicknames = Object.fromEntries(TYPE_CODES.map((c) => [c, ar.types[c].nickname]));
    expect(nicknames).toEqual({
      INTJ: "الاستراتيجي",
      INTP: "المنظّر",
      ENTJ: "الربّان",
      ENTP: "المشاكس",
      INFJ: "الرائي",
      INFP: "الحالم",
      ENFJ: "المُلهِم",
      ENFP: "الشرارة",
      ISTJ: "الأمين",
      ISFJ: "الحامي",
      ESTJ: "المدبّر",
      ESFJ: "المضيف",
      ISTP: "الحِرَفي",
      ISFP: "الفنّان",
      ESTP: "المِقدام",
      ESFP: "النجم",
    });
  });

  it("uses the chosen Arabic temperament names", () => {
    expect(TEMPERAMENTS.map((t) => ar.temperaments[t].name)).toEqual([
      "العقلانيون",
      "المتعاطفون",
      "الأوصياء",
      "المغامرون",
    ]);
  });

  it("uses the chosen Arabic function names", () => {
    const names = Object.fromEntries(FUNCTION_CODES.map((c) => [c, ar.functions[c].name]));
    expect(names).toEqual({
      Ni: "الحدس الانطوائي",
      Ne: "الحدس الانبساطي",
      Si: "الحس الانطوائي",
      Se: "الحس الانبساطي",
      Ti: "التفكير الانطوائي",
      Te: "التفكير الانبساطي",
      Fi: "الشعور الانطوائي",
      Fe: "الشعور الانبساطي",
    });
  });

  it("uses the chosen Arabic relation names", () => {
    const names = Object.fromEntries(RELATION_KINDS.map((k) => [k, ar.relations[k].name]));
    expect(names).toEqual({
      identity: "التطابق",
      mirror: "المرآة",
      dual: "الثنائي المكمّل",
      activity: "التنشيط",
      superego: "الأنا العليا",
      conflict: "الصراع",
      extinguishment: "التعاكس",
      quasiIdentity: "شبه التطابق",
      kindred: "القرابة",
      business: "الزمالة",
      semiDual: "شبه الثنائي",
      mirage: "السراب",
      supervisor: "الرقيب",
      supervisee: "تحت الرقابة",
      benefactor: "المانح",
      beneficiary: "المستفيد",
    });
  });
});

describe("ar content: script hygiene", () => {
  const strings = collectStrings(getContent("ar"));
  const allowedLatin = new RegExp(`\\b(${[...TYPE_CODES, ...FUNCTION_CODES].join("|")})\\b`, "g");

  it("contains no bidi control characters", () => {
    const bidi = /[‎‏‪-‮⁦-⁩؜]/;
    for (const [where, text] of strings) expect(text, where).not.toMatch(bidi);
  });

  it("uses Latin script only for type and function codes", () => {
    for (const [where, text] of strings) {
      expect(text.replace(allowedLatin, ""), where).not.toMatch(/[A-Za-z]/);
    }
  });

  it("writes every string in Arabic script", () => {
    for (const [where, text] of strings) expect(text, where).toMatch(/[؀-ۿ]/);
  });
});

describe("getContent", () => {
  it("returns distinct content per locale", () => {
    expect(getContent("ar")).not.toBe(getContent("en"));
    expect(getContent("ar").types.INFJ.nickname).toBe("الرائي");
    expect(getContent("en").types.INFJ.nickname).toBe("The Seer");
  });
});
