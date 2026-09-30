import { describe, expect, it } from "vitest";

import { GET, OPTIONS } from "@/app/api/types/[code]/route";

describe("GET /api/types/[code]", () => {
  it("returns type details for an uppercase code, locale en by default", async () => {
    const res = await GET(new Request("http://x/api/types/INFJ"), {
      params: Promise.resolve({ code: "INFJ" }),
    });
    expect(res.status).toBe(200);
    expect(res.headers.get("Cache-Control")).toBe(
      "public, s-maxage=86400, stale-while-revalidate=604800",
    );

    const body = await res.json();
    expect(body.locale).toBe("en");
    expect(body.type).toMatchObject({
      code: "INFJ",
      temperament: "NF",
      stack: ["Ni", "Fe", "Ti", "Se"],
      accent: "#10b981",
    });
    expect(body.content.nickname).toBe("The Seer");
    expect(body.strengths).toMatchObject({ Ni: 100, Fe: 80, Ti: 55, Se: 30 });
  });

  it("accepts a lowercase code and locale=ar", async () => {
    const res = await GET(new Request("http://x/api/types/infj?locale=ar"), {
      params: Promise.resolve({ code: "infj" }),
    });
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.locale).toBe("ar");
    expect(body.type.code).toBe("INFJ");
    expect(typeof body.content.nickname).toBe("string");
  });

  it("returns 400 for an invalid locale", async () => {
    const res = await GET(new Request("http://x/api/types/INFJ?locale=fr"), {
      params: Promise.resolve({ code: "INFJ" }),
    });
    expect(res.status).toBe(400);
    expect(res.headers.get("Cache-Control")).toBe("no-store");
    const body = await res.json();
    expect(body).toEqual({ error: "invalid_locale" });
  });

  it("returns 404 for an unknown type code", async () => {
    const res = await GET(new Request("http://x/api/types/XXXX"), {
      params: Promise.resolve({ code: "XXXX" }),
    });
    expect(res.status).toBe(404);
    expect(res.headers.get("Cache-Control")).toBe("no-store");
    const body = await res.json();
    expect(body).toEqual({ error: "unknown_type", code: "XXXX" });
  });
});

describe("OPTIONS /api/types/[code]", () => {
  it("returns 204 with CORS headers", async () => {
    const res = await OPTIONS();
    expect(res.status).toBe(204);
    expect(res.headers.get("Access-Control-Allow-Methods")).toBe("GET, OPTIONS");
  });
});
