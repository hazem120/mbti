import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { isLocale } from "@/lib/i18n";

export default async function HomePage(props: PageProps<"/[locale]">) {
  const { locale } = await props.params;
  if (!isLocale(locale)) notFound();

  setRequestLocale(locale);

  const t = await getTranslations("home");

  return (
    <section className="mx-auto flex max-w-3xl flex-col items-center gap-6 px-4 py-24 text-center sm:px-6">
      <p className="text-sm font-medium uppercase tracking-[0.2em] text-[--color-nt]">
        {t("kicker")}
      </p>
      <h1 className="text-gradient text-4xl font-semibold tracking-tight sm:text-5xl">
        {t("title")}
      </h1>
      <p className="max-w-xl text-balance text-muted-foreground">
        {t("subtitle")}
      </p>
    </section>
  );
}
