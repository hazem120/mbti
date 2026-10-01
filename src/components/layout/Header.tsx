import { getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { MyTypeChip } from "@/components/layout/MyTypeChip";

export async function Header() {
  const t = await getTranslations();

  return (
    <header className="glass sticky top-0 z-40">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link
          href="/"
          className="text-gradient font-display text-lg font-semibold tracking-tight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--accent) rounded-md"
        >
          {t("common.brand")}
        </Link>

        <nav
          aria-label={t("nav.ariaLabel")}
          className="flex items-center gap-1 text-sm"
        >
          <Link
            href="/"
            className="rounded-md px-3 py-1.5 text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--accent)"
          >
            {t("nav.types")}
          </Link>
          <Link
            href="/functions/ni"
            className="rounded-md px-3 py-1.5 text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--accent)"
          >
            {t("nav.functions")}
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <MyTypeChip />
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}
