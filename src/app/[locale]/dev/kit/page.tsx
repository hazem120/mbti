import type { Metadata } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { FUNCTION_CODES } from "@/data/functions";
import { TEMPERAMENT_COLORS, TYPE_CODES, TYPES } from "@/data/types";
import { isLocale } from "@/lib/i18n";
import { CountUp } from "@/components/motion/CountUp";
import { Reveal } from "@/components/motion/Reveal";
import { SplitText } from "@/components/motion/SplitText";
import { StaggerGroup, StaggerItem } from "@/components/motion/StaggerGroup";
import { TiltCard } from "@/components/motion/TiltCard";
import { FUNCTION_POSITIONS, FunctionChip } from "@/components/visual/FunctionChip";
import { GlassCard } from "@/components/visual/GlassCard";
import { GlowOrb } from "@/components/visual/GlowOrb";
import { SectionHeading } from "@/components/visual/SectionHeading";
import { TypeBadge } from "@/components/visual/TypeBadge";
import { MagneticDemo, MyTypeDemo, UiDemo } from "./_components/KitInteractive";

// Temporary visual-review route for the Task 6 UI kit (removed in Task 10).

export async function generateMetadata(props: PageProps<"/[locale]/dev/kit">): Promise<Metadata> {
  const { locale } = await props.params;
  if (!isLocale(locale)) notFound();
  const t = await getTranslations({ locale, namespace: "devKit" });
  return {
    title: t("metaTitle"),
    robots: { index: false, follow: false },
  };
}

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="flex flex-col gap-4">
      <h3 translate="no" className="font-display text-sm font-medium text-muted-foreground">
        {title}
      </h3>
      {children}
    </section>
  );
}

export default async function DevKitPage(props: PageProps<"/[locale]/dev/kit">) {
  const { locale } = await props.params;
  if (!isLocale(locale)) notFound();
  setRequestLocale(locale);

  const t = await getTranslations("devKit");

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-20 px-4 py-16 sm:px-6">
      <SectionHeading
        as="h1"
        immediate
        title={t("title")}
        subtitle={t("intro")}
      />

      {/* ---------------------------------------------------------- Motion */}
      <div className="flex flex-col gap-12">
        <SectionHeading eyebrow={t("motionEyebrow")} title={t("motionTitle")} />

        <Block title={t("splitTitle")}>
          <SplitText
            as="p"
            text={t("splitSample")}
            className="text-4xl font-semibold tracking-tight text-fg sm:text-5xl"
          />
          <SplitText as="p" text="INFJ · Ni · Fe · Ti · Se" stagger={0.05} className="font-display text-2xl" />
        </Block>

        <Block title={t("revealTitle")}>
          <div className="grid gap-4 sm:grid-cols-3">
            <Reveal direction="up">
              <GlassCard>{t("revealUp")}</GlassCard>
            </Reveal>
            <Reveal direction="start" delay={0.1}>
              <GlassCard>{t("revealStart")}</GlassCard>
            </Reveal>
            <Reveal direction="end" delay={0.2} blur>
              <GlassCard>{t("revealEnd")}</GlassCard>
            </Reveal>
          </div>
        </Block>

        <Block title={t("staggerTitle")}>
          <StaggerGroup as="ul" className="flex flex-wrap gap-2" stagger={0.05}>
            {TYPE_CODES.map((code) => (
              <StaggerItem as="li" key={code} pop>
                <TypeBadge code={code} />
              </StaggerItem>
            ))}
          </StaggerGroup>
        </Block>

        <div className="grid gap-8 md:grid-cols-2">
          <Block title={t("tiltTitle")}>
            <TiltCard className="rounded-2xl">
              <GlassCard accent={TYPES.INFJ.accent} className="flex items-center gap-5 p-8">
                <GlowOrb color={TYPES.INFJ.accent} size={72} intensity={0.9} />
                <div className="flex flex-col gap-2">
                  <TypeBadge code="INFJ" size="lg" />
                  <p className="text-sm text-muted-foreground">{t("tiltBody")}</p>
                </div>
              </GlassCard>
            </TiltCard>
          </Block>

          <Block title={t("spotlightTitle")}>
            <GlassCard spotlight accent={TYPES.ENTP.accent} className="flex h-full flex-col gap-3 p-8">
              <FunctionChip code="Ne" position="dominant" className="self-start" />
              <p className="text-sm text-muted-foreground">{t("spotlightBody")}</p>
            </GlassCard>
          </Block>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <Block title={t("magneticTitle")}>
            <div className="flex h-32 items-center justify-center">
              <MagneticDemo />
            </div>
          </Block>

          <Block title={t("countTitle")}>
            <div className="grid grid-cols-3 gap-4 text-center">
              {(
                [
                  [16, t("countTypes")],
                  [8, t("countFunctions")],
                  [256, t("countPairs")],
                ] as const
              ).map(([value, label]) => (
                <GlassCard key={label} className="flex flex-col gap-1 p-4">
                  <CountUp value={value} className="font-display text-3xl font-semibold text-fg" />
                  <span className="text-xs text-muted-foreground">{label}</span>
                </GlassCard>
              ))}
            </div>
          </Block>
        </div>
      </div>

      {/* --------------------------------------------------------- Visuals */}
      <div className="flex flex-col gap-12">
        <SectionHeading eyebrow={t("visualEyebrow")} title={t("visualTitle")} />

        <Block title={t("orbTitle")}>
          <div className="flex flex-wrap items-center gap-10 py-6">
            {(Object.keys(TEMPERAMENT_COLORS) as (keyof typeof TEMPERAMENT_COLORS)[]).map(
              (temp, i) => (
                <GlowOrb
                  key={temp}
                  color={TEMPERAMENT_COLORS[temp]}
                  size={56 + i * 20}
                  intensity={0.4 + i * 0.2}
                  phase={i * 1.3}
                >
                  <span translate="no" className="font-display text-xs font-semibold text-bg">
                    {temp}
                  </span>
                </GlowOrb>
              ),
            )}
            <div className="flex flex-col items-center gap-2">
              <GlowOrb size={64} animated={false} intensity={0.6} />
              <span className="text-xs text-muted-foreground">{t("orbStatic")}</span>
            </div>
          </div>
          <div className="grid grid-cols-8 place-items-center gap-y-8 py-4">
            {TYPE_CODES.map((code, i) => (
              <GlowOrb key={code} color={TYPES[code].accent} size={28} intensity={0.6} phase={i * 0.6} />
            ))}
          </div>
        </Block>

        <Block title={t("badgeTitle")}>
          <div className="flex flex-wrap items-center gap-3">
            <TypeBadge code="INTJ" size="sm" />
            <TypeBadge code="ENFP" />
            <TypeBadge code="ISTJ" size="lg" />
            <TypeBadge code="ESTP" label={t("myTypeCurrent")} />
          </div>
        </Block>

        <Block title={t("chipTitle")}>
          <div className="flex flex-wrap gap-2">
            {TYPES.INFJ.stack.map((fn, i) => (
              <FunctionChip key={fn} code={fn} position={FUNCTION_POSITIONS[i]} />
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {FUNCTION_CODES.map((fn) => (
              <FunctionChip key={fn} code={fn} size="sm" />
            ))}
          </div>
        </Block>

        <Block title={t("headingBlock")}>
          <SectionHeading
            align="center"
            eyebrow={t("headingEyebrow")}
            title={t("headingTitle")}
            subtitle={t("headingSubtitle")}
          />
        </Block>
      </div>

      {/* ------------------------------------------------------ State + UI */}
      <div className="flex flex-col gap-12">
        <SectionHeading eyebrow={t("stateEyebrow")} title={t("myTypeTitle")} />
        <GlassCard>
          <MyTypeDemo />
        </GlassCard>

        <Block title={t("uiTitle")}>
          <GlassCard>
            <UiDemo />
          </GlassCard>
        </Block>
      </div>
    </div>
  );
}
