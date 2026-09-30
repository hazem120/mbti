import { describe, expect, it } from "vitest";

import { dirFor, isLocale } from "@/lib/i18n";

describe("isLocale", () => {
  it("accepts the configured locales", () => {
    expect(isLocale("en")).toBe(true);
    expect(isLocale("ar")).toBe(true);
  });

  it("rejects anything else", () => {
    expect(isLocale("fr")).toBe(false);
    expect(isLocale("")).toBe(false);
    expect(isLocale("EN")).toBe(false);
  });
});

describe("dirFor", () => {
  it("returns rtl for Arabic", () => {
    expect(dirFor("ar")).toBe("rtl");
  });

  it("returns ltr for English", () => {
    expect(dirFor("en")).toBe("ltr");
  });
});
