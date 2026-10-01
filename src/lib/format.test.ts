import { describe, expect, it } from "vitest";

import { formatNumber, numberFormatConfig } from "@/lib/format";

describe("numberFormatConfig", () => {
  it("maps Arabic to ar-EG with Arabic-Indic digits", () => {
    expect(numberFormatConfig("ar")).toEqual({
      locale: "ar-EG",
      options: { numberingSystem: "arab" },
    });
  });

  it("passes other locales through untouched", () => {
    expect(numberFormatConfig("en", { maximumFractionDigits: 1 })).toEqual({
      locale: "en",
      options: { maximumFractionDigits: 1 },
    });
  });
});

describe("formatNumber", () => {
  it("formats English with Latin digits and grouping", () => {
    expect(formatNumber(1234, "en")).toBe("1,234");
    expect(formatNumber(16, "en")).toBe("16");
  });

  it("formats Arabic with Arabic-Indic digits", () => {
    expect(formatNumber(16, "ar")).toBe("١٦");
    expect(formatNumber(0, "ar")).toBe("٠");
  });

  it("honours extra options such as percent", () => {
    expect(formatNumber(0.5, "en", { style: "percent" })).toBe("50%");
    expect(formatNumber(0.5, "ar", { style: "percent" })).toMatch(/٥٠/);
  });
});
