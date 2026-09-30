import { TYPE_CODES, TYPES } from "@/data";
import { getContent } from "@/content";
import { json, preflight, resolveLocale } from "@/lib/api";

export async function GET(request: Request): Promise<Response> {
  const locale = resolveLocale(new URL(request.url));
  if (locale instanceof Response) return locale;

  const content = getContent(locale);

  const types = TYPE_CODES.map((code) => {
    const meta = TYPES[code];
    const typeContent = content.types[code];
    return {
      code: meta.code,
      temperament: meta.temperament,
      stack: meta.stack,
      accent: meta.accent,
      nickname: typeContent.nickname,
      tagline: typeContent.tagline,
    };
  });

  return json({ locale, types });
}

export async function OPTIONS(): Promise<Response> {
  return preflight();
}
