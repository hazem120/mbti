import { describe, expect, it } from "vitest";

import { GET, OPTIONS } from "@/app/api/compatibility/[a]/[b]/route";

describe("GET /api/compatibility/[a]/[b]", () => {
  it("returns relation details, locale en by default", async () => {
    const res = await GET(new Request("http://x/api/compatibility/INFJ/ENFP"), {
      params: Promise.resolve({ a: "INFJ", b: "ENFP" }),
    });
    expect(res.status).toBe(200);
    expect(res.headers.get("Cache-Control")).toBe(
      "public, s-maxage=86400, stale-while-revalidate=604800",
    );

    const body = await res.json();
    expect(body.locale).toBe("en");
    expect(body.relation).toMatchObject({ a: "INFJ", b: "ENFP" });
    expect(typeof body.relation.kind).toBe("string");
    expect(typeof body.content.name).toBe("string");
    expect(body.group.key).toBe(body.relation.group);
    expect(typeof body.group.name).toBe("string");
    expect(body.group.name.length).toBeGreaterThan(0);
  });

  it("accepts lowercase codes and locale=ar", async () => {
    const res = await GET(new Request("http://x/api/compatibility/infj/enfp?locale=ar"), {
      params: Promise.resolve({ a: "infj", b: "enfp" }),
    });
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.locale).toBe("ar");
    expect(body.relation.a).toBe("INFJ");
    expect(body.relation.b).toBe("ENFP");
    expect(typeof body.group.name).toBe("string");
  });

  it("returns 400 for an invalid locale", async () => {
    const res = await GET(new Request("http://x/api/compatibility/INFJ/ENFP?locale=fr"), {
      params: Promise.resolve({ a: "INFJ", b: "ENFP" }),
    });
    expect(res.status).toBe(400);
    expect(res.headers.get("Cache-Control")).toBe("no-store");
    const body = await res.json();
    expect(body).toEqual({ error: "invalid_locale" });
  });

  it("returns 404 for an unknown first type code", async () => {
    const res = await GET(new Request("http://x/api/compatibility/XXXX/ENFP"), {
      params: Promise.resolve({ a: "XXXX", b: "ENFP" }),
    });
    expect(res.status).toBe(404);
    expect(res.headers.get("Cache-Control")).toBe("no-store");
    const body = await res.json();
    expect(body).toEqual({ error: "unknown_type", code: "XXXX" });
  });

  it("returns 404 for an unknown second type code", async () => {
    const res = await GET(new Request("http://x/api/compatibility/INFJ/YYYY"), {
      params: Promise.resolve({ a: "INFJ", b: "YYYY" }),
    });
    expect(res.status).toBe(404);
    const body = await res.json();
    expect(body).toEqual({ error: "unknown_type", code: "YYYY" });
  });
});

describe("OPTIONS /api/compatibility/[a]/[b]", () => {
  it("returns 204 with CORS headers", async () => {
    const res = await OPTIONS();
    expect(res.status).toBe(204);
    expect(res.headers.get("Access-Control-Allow-Methods")).toBe("GET, OPTIONS");
  });
});
