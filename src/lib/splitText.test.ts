import { describe, expect, it } from "vitest";

import {
  containsArabic,
  groupWordsForBidi,
  resolveSplitMode,
  splitWords,
} from "@/lib/splitText";

describe("containsArabic", () => {
  it("detects Arabic script", () => {
    expect(containsArabic("استكشف كون الشخصية")).toBe(true);
    expect(containsArabic("Hello INFJ")).toBe(false);
  });
});

describe("resolveSplitMode", () => {
  it("splits Arabic locale by word", () => {
    expect(resolveSplitMode("INFJ", "ar")).toBe("words");
  });

  it("splits Arabic text by word even in an English locale", () => {
    expect(resolveSplitMode("العربية", "en")).toBe("words");
  });

  it("splits Latin text by character", () => {
    expect(resolveSplitMode("Explore the cosmos", "en")).toBe("chars");
  });

  it("respects an explicit mode", () => {
    expect(resolveSplitMode("Explore", "en", "words")).toBe("words");
  });
});

describe("splitWords", () => {
  it("splits on any whitespace and drops empties", () => {
    expect(splitWords("  The   Seer\nINFJ ").map((w) => w.word)).toEqual([
      "The",
      "Seer",
      "INFJ",
    ]);
  });

  it("splits characters by code point", () => {
    expect(splitWords("Ni✦")[0].chars).toEqual(["N", "i", "✦"]);
  });

  it("returns no words for blank input", () => {
    expect(splitWords("   ")).toEqual([]);
  });
});

describe("groupWordsForBidi", () => {
  it("keeps Arabic words separate in an RTL paragraph", () => {
    expect(groupWordsForBidi(splitWords("استكشف كون الشخصية"), "rtl")).toEqual([
      "استكشف",
      "كون",
      "الشخصية",
    ]);
  });

  it("merges a run of Latin words inside an RTL paragraph", () => {
    expect(groupWordsForBidi(splitWords("نمط INFJ · Ni Fe هنا"), "rtl")).toEqual([
      "نمط",
      "INFJ · Ni Fe",
      "هنا",
    ]);
  });

  it("merges a run of Arabic words inside an LTR paragraph", () => {
    expect(groupWordsForBidi(splitWords("Say مرحبا بك today"), "ltr")).toEqual([
      "Say",
      "مرحبا بك",
      "today",
    ]);
  });

  it("leaves pure Latin text word-by-word in LTR", () => {
    expect(groupWordsForBidi(splitWords("The Seer"), "ltr")).toEqual(["The", "Seer"]);
  });
});
