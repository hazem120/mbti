import { getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";

export default async function NotFound() {
  const t = await getTranslations("common");

  return (
    <section className="mx-auto flex max-w-xl flex-col items-center gap-6 px-4 py-32 text-center sm:px-6">
      <p className="text-sm font-medium uppercase tracking-[0.2em] text-nt">
        404
      </p>
      <h1 className="text-gradient text-3xl font-semibold tracking-tight sm:text-4xl">
        {t("notFoundTitle")}
      </h1>
      <p className="text-muted-foreground">{t("notFoundDescription")}</p>
      <Link
        href="/"
        className="glass rounded-full px-5 py-2 text-sm font-medium text-foreground transition-colors hover:text-nt focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--accent)"
      >
        {t("backHome")}
      </Link>
    </section>
  );
}
