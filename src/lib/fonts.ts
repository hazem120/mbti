import { IBM_Plex_Sans_Arabic, Inter, Space_Grotesk } from "next/font/google";

/**
 * Display font — used for headings (LTR only, see globals.css).
 */
export const fontDisplay = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

/**
 * Body font — used for LTR body copy.
 */
export const fontSans = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

/**
 * Arabic body font — used for all text when dir="rtl" (see globals.css).
 */
export const fontArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-arabic",
  display: "swap",
});

/** Combined font variable class names to apply on <html>. */
export const fontVariables = `${fontDisplay.variable} ${fontSans.variable} ${fontArabic.variable}`;
