import type { SiteContent } from "@/content/schema";
import { functions } from "@/content/en/functions";
import { relationGroups, situations, temperaments } from "@/content/en/meta";
import { relations } from "@/content/en/relations";
import { nfTypes } from "@/content/en/types-nf";
import { ntTypes } from "@/content/en/types-nt";
import { sjTypes } from "@/content/en/types-sj";
import { spTypes } from "@/content/en/types-sp";

export const en = {
  types: { ...ntTypes, ...nfTypes, ...sjTypes, ...spTypes },
  functions,
  relations,
  situations,
  temperaments,
  relationGroups,
} satisfies SiteContent;
