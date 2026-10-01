import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";

import { getContent } from "@/content";
import { TEMPERAMENTS, TEMPERAMENT_COLORS, TYPES, TYPE_CODES } from "@/data/types";
import { isLocale } from "@/lib/i18n";
import { CosmicBackdrop } from "@/components/three/CosmicBackdrop";
import { Hero } from "@/components/home/Hero";
import {
  TypePicker,
  type PickerItem,
  type PickerTemperament,
} from "@/components/home/TypePicker";
import { WelcomeBack } from "@/components/home/WelcomeBack";

const PICKER_ID = "picker";

export default async function HomePage(props: PageProps<"/[locale]">) {
  const { locale } = await props.params;
  if (!isLocale(locale)) notFound();

  setRequestLocale(locale);

  // Only the slices the client needs cross the boundary (not the content bundle).
  const content = getContent(locale);
  const items: PickerItem[] = TYPE_CODES.map((code) => ({
    code,
    temperament: TYPES[code].temperament,
    stack: TYPES[code].stack,
    accent: TYPES[code].accent,
    nickname: content.types[code].nickname,
    tagline: content.types[code].tagline,
  }));
  const temperaments: PickerTemperament[] = TEMPERAMENTS.map((key) => ({
    key,
    name: content.temperaments[key].name,
    description: content.temperaments[key].description,
    color: TEMPERAMENT_COLORS[key],
  }));

  return (
    <>
      <CosmicBackdrop />
      <Hero pickerId={PICKER_ID} />
      <TypePicker id={PICKER_ID} items={items} temperaments={temperaments} />
      <WelcomeBack />
    </>
  );
}
