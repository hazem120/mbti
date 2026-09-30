import { functionStrengths, parseTypeCode, TYPES } from "@/data";
import { getContent } from "@/content";
import { json, notFound, preflight, resolveLocale } from "@/lib/api";

interface RouteParams {
  code: string;
}

export async function GET(
  request: Request,
  { params }: { params: Promise<RouteParams> },
): Promise<Response> {
  const locale = resolveLocale(new URL(request.url));
  if (locale instanceof Response) return locale;

  const { code: rawCode } = await params;
  const code = parseTypeCode(rawCode);
  if (!code) {
    return notFound({ error: "unknown_type", code: rawCode });
  }

  const content = getContent(locale);

  return json({
    locale,
    type: TYPES[code],
    content: content.types[code],
    strengths: functionStrengths(code),
  });
}

export async function OPTIONS(): Promise<Response> {
  return preflight();
}
