import { describe, expect, it } from "vitest";

import {
  MY_TYPE_COOKIE_MAX_AGE,
  MY_TYPE_KEY,
  buildMyTypeCookie,
  parseMyType,
  readMyTypeFromCookieString,
  serializeMyType,
} from "@/lib/myTypeStorage";

describe("MY_TYPE_KEY", () => {
  it("matches the shared storage key", () => {
    expect(MY_TYPE_KEY).toBe("mbti:my-type");
  });
});

describe("parseMyType", () => {
  it("parses canonical codes", () => {
    expect(parseMyType("INFJ")).toBe("INFJ");
    expect(parseMyType("ESTP")).toBe("ESTP");
  });

  it("is case-insensitive and trims whitespace", () => {
    expect(parseMyType("infj")).toBe("INFJ");
    expect(parseMyType("  EnTp \n")).toBe("ENTP");
  });

  it("accepts a JSON-quoted value", () => {
    expect(parseMyType('"isfp"')).toBe("ISFP");
  });

  it("returns null for empty, missing, or invalid values", () => {
    expect(parseMyType(null)).toBeNull();
    expect(parseMyType(undefined)).toBeNull();
    expect(parseMyType("")).toBeNull();
    expect(parseMyType("   ")).toBeNull();
    expect(parseMyType("XXXX")).toBeNull();
    expect(parseMyType("INFJX")).toBeNull();
    expect(parseMyType("null")).toBeNull();
  });
});

describe("serializeMyType", () => {
  it("writes the uppercase code", () => {
    expect(serializeMyType("INFJ")).toBe("INFJ");
  });

  it("round-trips every code through parse", () => {
    for (const code of ["INTJ", "ENFP", "ISTJ", "ESFP"] as const) {
      expect(parseMyType(serializeMyType(code))).toBe(code);
    }
  });
});

describe("buildMyTypeCookie", () => {
  it("builds a one-year, root-path, SameSite=Lax cookie", () => {
    expect(MY_TYPE_COOKIE_MAX_AGE).toBe(60 * 60 * 24 * 365);
    expect(buildMyTypeCookie("INFJ")).toBe(
      "mbti:my-type=INFJ; Path=/; Max-Age=31536000; SameSite=Lax",
    );
  });

  it("appends Secure when requested", () => {
    expect(buildMyTypeCookie("ENTP", { secure: true })).toBe(
      "mbti:my-type=ENTP; Path=/; Max-Age=31536000; SameSite=Lax; Secure",
    );
  });

  it("expires the cookie immediately when clearing", () => {
    expect(buildMyTypeCookie(null)).toBe(
      "mbti:my-type=; Path=/; Max-Age=0; SameSite=Lax",
    );
  });
});

describe("readMyTypeFromCookieString", () => {
  it("finds the value among other cookies", () => {
    expect(
      readMyTypeFromCookieString("a=1; mbti:my-type=intp; NEXT_LOCALE=ar"),
    ).toBe("INTP");
  });

  it("returns null when absent or invalid", () => {
    expect(readMyTypeFromCookieString("")).toBeNull();
    expect(readMyTypeFromCookieString("a=1; b=2")).toBeNull();
    expect(readMyTypeFromCookieString("mbti:my-type=nope")).toBeNull();
    expect(readMyTypeFromCookieString("xmbti:my-type=INFJ")).toBeNull();
  });

  it("round-trips the cookie it builds", () => {
    const pair = buildMyTypeCookie("ESFJ").split(";")[0];
    expect(readMyTypeFromCookieString(pair)).toBe("ESFJ");
  });
});
