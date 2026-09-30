import { describe, expect, it } from "vitest";

import { TYPE_CODES } from "@/data";
import { GET, OPTIONS } from "@/app/api/types/route";

describe("GET /api/types", () => {
  it("defaults to locale en and returns all types in TYPE_CODES order", async () => {
    const res = await GET(new Request("http://x/api/types"));
    expect(res.status).toBe(200);
    expect(res.headers.get("Cache-Control")).toBe(
      "public, s-maxage=86400, stale-while-revalidate=604800",
    );
    expect(res.headers.get("Access-Control-Allow-Origin")).toBe("*");

    const body = await res.json();
    expect(body.locale).toBe("en");
    expect(body.types).toHaveLength(TYPE_CODES.length);
    expect(body.types.map((t: { code: string }) => t.code)).toEqual([...TYPE_CODES]);

    const infj = body.types.find((t: { code: string }) => t.code === "INFJ");
    expect(infj).toMatchObject({
      code: "INFJ",
      temperament: "NF",
      stack: ["Ni", "Fe", "Ti", "Se"],
      accent: "#10b981",
      nickname: "The Seer",
    });
    expect(typeof infj.tagline).toBe("string");
    expect(infj.tagline.length).toBeGreaterThan(0);
  });

  it("honors locale=ar", async () => {
    const res = await GET(new Request("http://x/api/types?locale=ar"));
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.locale).toBe("ar");
    expect(body.types).toHaveLength(TYPE_CODES.length);
    const infj = body.types.find((t: { code: string }) => t.code === "INFJ");
    expect(typeof infj.nickname).toBe("string");
    expect(infj.nickname.length).toBeGreaterThan(0);
  });

  it("returns 400 for an invalid locale", async () => {
    const res = await GET(new Request("http://x/api/types?locale=fr"));
    expect(res.status).toBe(400);
    expect(res.headers.get("Cache-Control")).toBe("no-store");
    const body = await res.json();
    expect(body).toEqual({ error: "invalid_locale" });
  });
});

describe("OPTIONS /api/types", () => {
  it("returns 204 with CORS headers", async () => {
    const res = await OPTIONS();
    expect(res.status).toBe(204);
    expect(res.headers.get("Access-Control-Allow-Origin")).toBe("*");
    expect(res.headers.get("Access-Control-Allow-Methods")).toBe("GET, OPTIONS");
  });
});
