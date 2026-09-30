import type { SiteContent } from "@/content/schema";
import { functions } from "@/content/ar/functions";
import { relationGroups, situations, temperaments } from "@/content/ar/meta";
import { relations } from "@/content/ar/relations";
import { nfTypes } from "@/content/ar/types-nf";
import { ntTypes } from "@/content/ar/types-nt";
import { sjTypes } from "@/content/ar/types-sj";
import { spTypes } from "@/content/ar/types-sp";

export const ar = {
  types: { ...ntTypes, ...nfTypes, ...sjTypes, ...spTypes },
  functions,
  relations,
  situations,
  temperaments,
  relationGroups,
} satisfies SiteContent;
