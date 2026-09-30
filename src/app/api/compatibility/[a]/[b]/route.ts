import { getRelation, parseTypeCode } from "@/data";
import { getContent } from "@/content";
import { json, notFound, preflight, resolveLocale } from "@/lib/api";

interface RouteParams {
  a: string;
  b: string;
}

export async function GET(
  request: Request,
  { params }: { params: Promise<RouteParams> },
): Promise<Response> {
  const locale = resolveLocale(new URL(request.url));
  if (locale instanceof Response) return locale;

  const { a: rawA, b: rawB } = await params;
  const a = parseTypeCode(rawA);
  if (!a) {
    return notFound({ error: "unknown_type", code: rawA });
  }
  const b = parseTypeCode(rawB);
  if (!b) {
    return notFound({ error: "unknown_type", code: rawB });
  }

  const content = getContent(locale);
  const relation = getRelation(a, b);
  const group = content.relationGroups[relation.group];

  return json({
    locale,
    relation,
    content: content.relations[relation.kind],
    group: { key: relation.group, name: group.name },
  });
}

export async function OPTIONS(): Promise<Response> {
  return preflight();
}
