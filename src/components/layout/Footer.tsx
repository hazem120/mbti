import { getTranslations } from "next-intl/server";

export async function Footer() {
  const t = await getTranslations("footer");

  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-6xl space-y-1 px-4 py-6 text-center text-xs text-muted-foreground sm:px-6">
        <p>{t("disclaimer")}</p>
        <p>{t("credit")}</p>
      </div>
    </footer>
  );
}
