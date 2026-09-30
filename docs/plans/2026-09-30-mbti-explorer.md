# MBTI Explorer — Execution Plan

Source of intent (approved by user): `/Users/abdullahmohammed/.claude/plans/cozy-strolling-music.md`.
Product: a dark, cosmic, heavily-animated Next.js site. Users pick their MBTI type from all 16, then explore that type's cognitive functions, behavior in 8 life situations, and compatibility with every other type. Bilingual: English + Arabic (RTL). All content is curated and static (no AI, no DB).

## Global Constraints (bind every task)

- **Stack versions are fixed:** Next.js **16.3.7** App Router, React 19.2, TypeScript strict, Tailwind CSS v4.
  - This Next.js has breaking changes versus older training data. **Before using any Next API, read the matching guide in `node_modules/next/dist/docs/`.**
    - `params` and `searchParams` are Promises.
    - Locale routing uses `src/proxy.ts`, not `middleware.ts`.
    - `next/dynamic` with `ssr:false` is only allowed inside client components.
    - Cross-route shared-element transitions use React's `<ViewTransition>` from `'react'`. See `01-app/02-guides/view-transitions.md`.
- **Package manager: npm** (pnpm is broken on this machine). Scripts: `npm run dev`, `npm run build`, `npm run lint`, `npm run typecheck` (`tsc --noEmit`), `npm run test` (`vitest run`).
- Path alias is `@/*` → `src/*`. No `any`, and no `@ts-ignore`.
- **Server Components by default.** Add `'use client'` only on leaves that need state, effects, or browser APIs.
  - Never import `src/content/**` into a client component. Server components pass the needed slice down as props, so the whole content bundle never ships to the browser.
- **Keep static generation.** Pages must not read `cookies()` or `headers()`. Every `[locale]` layout and page calls `setRequestLocale(locale)` (next-intl). Dynamic segments define `generateStaticParams`. The chosen "my type" is read **client-side only**.
- **i18n:** locales `en` (default) and `ar`, `localePrefix: 'always'`, and `<html lang dir>` set per locale (`ar` → `dir="rtl"`).
  - UI chrome strings go in `messages/en.json` and `messages/ar.json` (next-intl).
  - Domain prose goes in `src/content/{en,ar}/**` (typed TS).
  - **Every user-visible string exists in both locales.** The only hardcoded literals allowed are type codes (INFJ) and function codes (Ni).
- **RTL:** use only logical Tailwind utilities for direction-sensitive layout: `ms-* me-* ps-* pe-* start-* end-* text-start text-end border-s border-e rounded-s rounded-e`. Never use `ml/mr/pl/pr/left/right/text-left/text-right`. Directional motion (horizontal scroll, slide-ins, arrows) must mirror when `dir === 'rtl'`.
- **Motion:** animate `transform`, `opacity`, and `filter` only; never layout properties in loops. Every animation respects `prefers-reduced-motion`:
  - Motion's `useReducedMotion()`
  - GSAP `gsap.matchMedia()`
  - the CSS media query
  - R3F `frameloop="demand"` with a static frame
  Reduced motion means fades only: no pinning, no scrubbing, no camera flights.
- **Design tokens** live in `src/app/globals.css` via `@theme` (exact values are in Task 1). Components use the tokens, never ad-hoc hex values. The exception is data-driven colors that come from `src/data/*`, which are applied through CSS variables such as `--accent`.
- **Accessibility:**
  - Semantic landmarks, and every interactive element reachable by keyboard with a visible focus ring (`focus-visible:ring-2 ring-[--accent]`).
  - Decorative canvases get `aria-hidden`.
  - Text contrast meets WCAG AA on the dark background.
- Each task ends with `npm run typecheck && npm run lint && npm run test && npm run build` passing. Then **one commit** (or a few) with a conventional message ending in:
  `Co-Authored-By: Claude Opus 5.5 (1M context) <noreply@anthropic.com>`
- UI tasks may invoke the `ui-ux-pro-max:ui-ux-pro-max` skill for design guidance if available. Do not dispatch subagents.

## Shared domain facts (used by several tasks)

- **Type codes** (`TYPE_CODES`, in this order):
  - NT: INTJ, INTP, ENTJ, ENTP
  - NF: INFJ, INFP, ENFJ, ENFP
  - SJ: ISTJ, ISFJ, ESTJ, ESFJ
  - SP: ISTP, ISFP, ESTP, ESFP
- URLs use lowercase codes: `/en/types/infj`, `/ar/functions/ni`.
- **Function stacks** `[dominant, auxiliary, tertiary, inferior]`:

  | NT | NF | SJ | SP |
  |---|---|---|---|
  | INTJ Ni Te Fi Se | INFJ Ni Fe Ti Se | ISTJ Si Te Fi Ne | ISTP Ti Se Ni Fe |
  | INTP Ti Ne Si Fe | INFP Fi Ne Si Te | ISFJ Si Fe Ti Ne | ISFP Fi Se Ni Te |
  | ENTJ Te Ni Se Fi | ENFJ Fe Ni Se Ti | ESTJ Te Si Ne Fi | ESTP Se Ti Fe Ni |
  | ENTP Ne Ti Fe Si | ENFP Ne Fi Te Si | ESFJ Fe Si Ne Ti | ESFP Se Fi Te Ni |

- **Accent colors per type:**

  | Temperament | Types |
  |---|---|
  | NT (violet) | INTJ #8b5cf6, INTP #a78bfa, ENTJ #7c3aed, ENTP #c4b5fd |
  | NF (emerald) | INFJ #10b981, INFP #34d399, ENFJ #059669, ENFP #6ee7b7 |
  | SJ (azure) | ISTJ #3b82f6, ISFJ #60a5fa, ESTJ #2563eb, ESFJ #93c5fd |
  | SP (amber) | ISTP #f59e0b, ISFP #fbbf24, ESTP #d97706, ESFP #fcd34d |

- **Function colors:** Ni #c084fc, Ne #f472b6, Si #60a5fa, Se #fb923c, Ti #22d3ee, Te #facc15, Fi #fb7185, Fe #4ade80.
- **Situation keys** (in order): `work, love, friendship, stress, conflict, decisions, learning, leadership`.
- **Relation kinds** (16): `identity, mirror, dual, activity, superego, conflict, extinguishment, quasiIdentity, kindred, business, semiDual, mirage, supervisor, supervisee, benefactor, beneficiary`.
- **Relation groups:**

  | Group | Color | Kinds |
  |---|---|---|
  | `complementary` | #5eead4 | dual, activity, semiDual, mirage |
  | `similar` | #a5b4fc | identity, mirror, kindred, business |
  | `asymmetric` | #f0abfc | supervisor, supervisee, benefactor, beneficiary |
  | `challenging` | #fda4af | superego, conflict, extinguishment, quasiIdentity |

- **Temperament names** (content supplies the translations): NT Rationalists, NF Empaths, SJ Stewards, SP Adventurers.
- **Type nicknames** (English; content supplies the Arabic): INTJ The Strategist, INTP The Theorist, ENTJ The Director, ENTP The Provocateur, INFJ The Seer, INFP The Idealist, ENFJ The Catalyst, ENFP The Spark, ISTJ The Keeper, ISFJ The Guardian, ESTJ The Organizer, ESFJ The Host, ISTP The Tinkerer, ISFP The Artisan, ESTP The Maverick, ESFP The Showstopper.
- **Storage key** for the user's chosen type: `mbti:my-type`. It lives in localStorage plus a cookie of the same name (path=/, 1 year, SameSite=Lax).

---

### Task 1: Foundations — dependencies, tokens, fonts, i18n routing, providers, test tooling

**Goal:** a running bilingual shell (`/en`, `/ar`) with the design system, providers, header and footer, and test tooling. Feature pages come later.

**Install**
- Dependencies: `next-intl motion gsap @gsap/react lenis three @react-three/fiber @react-three/drei @react-three/postprocessing zustand zod lucide-react clsx tailwind-merge`
- Dev dependencies: `vitest vite-tsconfig-paths @types/three`
- Run `npx shadcn@latest init` and accept the Tailwind v4 defaults (base color neutral, CSS variables). Then add components: `dialog tooltip tabs toggle-group`. Afterwards, map shadcn's CSS variables onto our tokens so the components look dark and cosmic.

**Package scripts:** `"typecheck": "tsc --noEmit"`, `"test": "vitest run"`. Add `vitest.config.mts` using `vite-tsconfig-paths` with `environment: 'node'`, including `src/**/*.test.ts`.

**Design tokens** (`src/app/globals.css`, Tailwind v4 `@theme`). Use exactly these:
- Colors: `--color-bg: #05060f`, `--color-bg-elev: #0b0d1c`, `--color-surface: rgb(255 255 255 / 0.04)`, `--color-border: rgb(255 255 255 / 0.08)`, `--color-fg: #eef0ff`, `--color-muted: #9aa0c3`
- Temperaments: `--color-nt: #a78bfa`, `--color-nf: #34d399`, `--color-sj: #60a5fa`, `--color-sp: #fbbf24`
- Relation groups: `--color-rel-complementary: #5eead4`, `--color-rel-similar: #a5b4fc`, `--color-rel-asymmetric: #f0abfc`, `--color-rel-challenging: #fda4af`
- Fonts: `--font-display` (Space Grotesk), `--font-sans` (Inter), `--font-arabic` (IBM Plex Sans Arabic)
- Body uses the `bg` color with a fixed layered background:
  - a subtle radial nebula gradient (violet and teal at about 6–10% alpha)
  - an SVG-noise grain overlay (inline data URI, about 4% opacity, `pointer-events-none`)
- Under `[dir=rtl]`, all text uses `--font-arabic` with line-height increased by about 0.15.
- Utilities:
  - `.glass`: surface background, `backdrop-blur-xl`, 1px border, inner highlight
  - `.text-gradient`: gradient text driven by the `--accent` variable
- Base rule: `@media (prefers-reduced-motion: reduce)` sets animation and transition durations to near 0 globally.

**Fonts** (`src/lib/fonts.ts`): `next/font/google` for Space Grotesk (400–700), Inter (400–600), and IBM Plex Sans Arabic (400/500/600/700, subsets `arabic`), each exposed as a CSS variable.

**i18n** (next-intl, current version; follow its Next 16 setup):
- `src/i18n/routing.ts`: `defineRouting({ locales: ['en','ar'], defaultLocale: 'en', localePrefix: 'always' })`
- `src/i18n/navigation.ts`: `createNavigation(routing)`, exporting `Link, redirect, usePathname, useRouter, getPathname`
- `src/i18n/request.ts`: loads `messages/${locale}.json`
- `src/proxy.ts`: the next-intl middleware as the Next 16 proxy. The matcher excludes `api`, `_next`, `_vercel`, and files with dots.
- `next.config.ts`: wrap with `createNextIntlPlugin()`.
- Delete the scaffold's `src/app/layout.tsx` and `src/app/page.tsx`. The root layout becomes `src/app/[locale]/layout.tsx`:
  - `<html lang={locale} dir={locale==='ar'?'rtl':'ltr'}>` with the font variables
  - `generateStaticParams` over the locales, `setRequestLocale`, `NextIntlClientProvider`
  - `notFound()` for unknown locales
- Also add `src/lib/i18n.ts` exporting `type Locale = 'en'|'ar'`, `isLocale()`, and `dirFor(locale)`.

**Providers** (`src/components/providers/`):
- `SmoothScroll.tsx` (client): a Lenis root instance (`lenis/react`) synced with GSAP:
  - `gsap.registerPlugin(ScrollTrigger)`
  - `lenis.on('scroll', ScrollTrigger.update)`
  - drive Lenis from `gsap.ticker`, and set `lagSmoothing(0)`
  - disabled entirely under reduced motion
  - export a `useLenis`-based helper to scroll to top on route change
- `src/lib/gsap.ts`: registers ScrollTrigger once. It is client-safe.

**Shell components**
- `src/components/layout/Header.tsx`:
  - a sticky glass header: logo wordmark "MBTI·Cosmos" linking home
  - nav links: Types (`/`), Functions (`/functions/ni` for now)
  - `LanguageSwitcher` (client, uses next-intl `useRouter().replace(pathname, {locale})`; label "العربية" / "English")
  - a slot for the "my type" chip (built in Task 6; leave a placeholder component that renders nothing)
- `src/components/layout/Footer.tsx`: the disclaimer "For self-reflection and fun — not a clinical assessment", plus a credit line saying compatibility is based on socionics intertype relations mapped through the function stack.
- `src/app/[locale]/page.tsx`: a temporary placeholder hero that uses the tokens, so the shell renders.
- `src/app/[locale]/not-found.tsx`: a styled not-found page.

**Messages:** create `messages/en.json` and `messages/ar.json` with namespaces `common`, `nav`, `footer`, `home`, `type`, `compat`, `functions`. Fill only what this task uses; later tasks add keys to both files.

**Acceptance**
- `npm run build` succeeds, and `/en` and `/ar` are statically generated.
- `/` redirects to `/en`.
- `/ar` renders `dir="rtl"` with the Arabic font.
- The language switcher swaps locales on the same path.
- A trivial `src/lib/i18n.test.ts` passes.
- `npm run typecheck`, `lint`, and `test` are green.

---

### Task 2: Domain data + compatibility engine (TDD)

**Files:** `src/data/types.ts`, `src/data/functions.ts`, `src/data/relations.ts`, `src/data/strengths.ts`, `src/data/index.ts`, and tests `src/data/*.test.ts`. Write the tests first, watch them fail, then implement.

**`functions.ts`**
- `FUNCTION_CODES = ['Ni','Ne','Si','Se','Ti','Te','Fi','Fe'] as const`
- `type FunctionCode`
- `interface FunctionMeta { code; element: 'N'|'S'|'T'|'F'; attitude: 'i'|'e'; kind: 'perceiving'|'judging'; color: string }` with colors from Shared facts
- `FUNCTIONS: Record<FunctionCode, FunctionMeta>`
- helpers:
  - `flipAttitude(fn)`: Ni→Ne
  - `partnerElement(fn)`: same attitude, paired element (N↔S, T↔F), so Ni→Si and Te→Fe
  - `parseFunctionCode(s)`: case-insensitive, 'ni'→'Ni', else null

**`types.ts`**
- `TYPE_CODES` in the order from Shared facts, and `type TypeCode`
- `type Temperament = 'NT'|'NF'|'SJ'|'SP'`
- `interface TypeMeta { code; temperament; stack: readonly [FunctionCode, FunctionCode, FunctionCode, FunctionCode]; accent: string }`
- `TYPES: Record<TypeCode, TypeMeta>` using the stacks and accents from Shared facts
- `TEMPERAMENTS: readonly Temperament[]` (order NT, NF, SJ, SP) and `TEMPERAMENT_COLORS`
- helpers:
  - `parseTypeCode(s)`: case-insensitive → TypeCode | null
  - `typesByTemperament(t)`
  - `typesWithFunctionAt(fn, index 0..3)`

**`relations.ts`** (socionics intertype relations, where MBTI dominant = socionics base and auxiliary = creative)

`modelA(code): FunctionCode[8]` returns positions 1–8, with B = dominant and C = auxiliary:
1. B
2. C
3. `partnerElement(B)` (keeps B's attitude)
4. `partnerElement(C)`
5. `flipAttitude(partnerElement(B))`
6. `flipAttitude(partnerElement(C))`
7. `flipAttitude(B)`
8. `flipAttitude(C)`

For example, INFJ → `[Ni, Fe, Si, Te, Se, Ti, Ne, Fi]` and ENTP → `[Ne, Ti, Se, Fi, Si, Fe, Ni, Te]`.

`getRelation(a, b)` takes the 1-based positions in `modelA(a)` of b's dominant and of b's auxiliary, as `"p,q"`, and looks the kind up here:

| `"p,q"` | Kind | `"p,q"` | Kind |
|---|---|---|---|
| `1,2` | identity | `2,1` | mirror |
| `5,6` | dual | `6,5` | activity |
| `3,4` | superego | `4,3` | conflict |
| `7,8` | extinguishment | `8,7` | quasiIdentity |
| `1,4` | kindred | `3,2` | business |
| `5,8` | semiDual | `7,6` | mirage |
| `2,3` | supervisor (a supervises b) | `4,1` | supervisee (b supervises a) |
| `8,5` | benefactor (a is b's benefactor) | `6,7` | beneficiary (a benefits from b) |

`RELATION_META: Record<RelationKind, { score: number; group: RelationGroup }>` with these scores:

| Kind | Score | Kind | Score | Kind | Score | Kind | Score |
|---|---|---|---|---|---|---|---|
| dual | 96 | activity | 88 | semiDual | 80 | mirage | 76 |
| mirror | 74 | identity | 70 | kindred | 68 | business | 64 |
| benefactor | 58 | beneficiary | 58 | extinguishment | 52 | quasiIdentity | 46 |
| supervisor | 38 | supervisee | 38 | superego | 34 | conflict | 24 |

Groups follow Shared facts. Other exports:
- `interface Relation { a; b; kind; score; group; sharedFunctions: FunctionCode[] }`. `sharedFunctions` is the functions present in both 4-stacks, in a's stack order.
- `getRelation(a, b): Relation`
- `getRelationsFor(a): Relation[]`: all 16 including self, sorted by score descending, ties broken by `TYPE_CODES` order
- `RELATION_KINDS`, `RELATION_GROUPS`, `inverseKind(kind)`: supervisor↔supervisee, benefactor↔beneficiary, and every other kind maps to itself

**`strengths.ts`** (Beebe-style development strengths): `functionStrengths(code): Record<FunctionCode, number>`.
- stack[0..3] → 100, 80, 55, 30
- flipAttitude(stack[0..3]) → 45, 35, 25, 15

For example, INFJ: Ni 100, Fe 80, Ti 55, Se 30, Ne 45, Fi 35, Te 25, Si 15.

**Required tests** (at minimum):
- `modelA('INFJ')` and `modelA('ENTP')` equal the examples above.
- Starting from INFJ: ESTP dual, ISTP activity, ENFJ mirror, ESTJ conflict, ISTJ superego, ENFP extinguishment, INFP quasiIdentity, INTJ kindred, ISFJ business, ESFP semiDual, ENTP mirage, ESFJ supervisor, ENTJ supervisee, ISFP benefactor, INTP beneficiary, INFJ identity.
- ENTP→ISFJ is dual.
- For every type, the 16 kinds from `getRelationsFor` are all distinct and cover `RELATION_KINDS`.
- For all a, b: `getRelation(b,a).kind === inverseKind(getRelation(a,b).kind)`, and the scores are equal.
- `sharedFunctions` for INFJ/INTJ is `['Ni','Se']`.
- `parseTypeCode('infj') === 'INFJ'`, and `parseTypeCode('xxxx') === null`.
- `functionStrengths('INFJ')` equals the example.

---

### Task 3: Content model + full English content

**Files**
- `src/content/schema.ts`: the interfaces
- `src/content/en/`: `types-nt.ts`, `types-nf.ts`, `types-sj.ts`, `types-sp.ts`, `functions.ts`, `relations.ts`, `meta.ts`, `index.ts`
- `src/content/index.ts`: `getContent(locale: Locale): SiteContent`. Import only `en` for now, and leave a clearly typed spot for `ar`, which Task 4 fills. Until Task 4 lands, `ar` falls back to `en`.
- `src/content/content.test.ts`: validates completeness

**Schema** (use these exact names):
```ts
export type SituationKey = 'work'|'love'|'friendship'|'stress'|'conflict'|'decisions'|'learning'|'leadership';
export interface SituationContent { summary: string; behaviors: [string, string, string]; tip: string }
export interface TypeContent {
  nickname: string; tagline: string; overview: string;
  strengths: [string, string, string, string]; blindSpots: [string, string, string, string];
  situations: Record<SituationKey, SituationContent>;
}
export interface FunctionContent { name: string; short: string; description: string; asDominant: string; asInferior: string; keywords: [string, string, string, string] }
export interface RelationContent { name: string; tagline: string; description: string; whatWorks: [string, string, string]; watchOut: [string, string, string] }
export interface SiteContent {
  types: Record<TypeCode, TypeContent>;
  functions: Record<FunctionCode, FunctionContent>;
  relations: Record<RelationKind, RelationContent>;
  situations: Record<SituationKey, { title: string; description: string }>;
  temperaments: Record<Temperament, { name: string; description: string }>;
  relationGroups: Record<RelationGroup, { name: string; description: string }>;
}
```
Also export `SITUATION_KEYS` in the Shared-facts order.

**Content quality bar.** This is the product, so write it like a sharp, warm editor, not a horoscope.
- Be specific to each type's function stack, and include concrete behavioral detail. "In a meeting, an INTJ…" beats "INTJs are smart".
- No filler, no stereotypes framed as insults, and no copying from 16personalities or Keirsey text. Nicknames and temperament names come from Shared facts.
- Length guides:
  - tagline: ≤ 90 characters
  - overview: 3–4 sentences
  - strengths and blind spots: ≤ 12 words each
  - situation summary: 2–3 sentences
  - each behavior: 1 sentence
  - tip: 1 sentence of actionable advice to that type
  - function description: 3–4 sentences, plus `asDominant` and `asInferior` at 2 sentences each
  - relation description: 3–4 sentences written to "you" (the viewer's type) about the other type
- Directional relation kinds are written from the viewer's side:
  - supervisor: "you tend to supervise them"
  - supervisee: "they tend to supervise you"
  - benefactor: "you give, they receive"
  - beneficiary: "they give, you receive"
- Relation descriptions must be generic across type pairs (the UI shows both type codes next to them), and must never name a specific type.

**Tests:** for `en`, every TypeCode, SituationKey, FunctionCode, RelationKind, Temperament, and RelationGroup has non-empty strings, and the tuple lengths are right (the compiler also enforces this). Also assert taglines are ≤ 90 characters.

---

### Task 4: Arabic content

**Files:** `src/content/ar/` mirrors `src/content/en/` exactly: the same files, typed against the same `SiteContent` schema. Wire `ar` into `getContent`, and extend `content.test.ts` to cover `ar`.

**Translation quality bar**
- Natural, elegant Modern Standard Arabic that reads as if written in Arabic, not a literal translation. Keep the English content's specificity.
- Keep type codes (INFJ) and function codes (Ni) in Latin script.
- Translate function names (for example, "الحدس الانطوائي").
- Arabic nicknames are evocative, not literal. For example, INFJ The Seer → "الرائي", ENFP The Spark → "الشرارة".
- Arabic temperament names, for example: Rationalists → "العقلانيون", Empaths → "المتعاطفون", Stewards → "الأوصياء", Adventurers → "المغامرون".
- Taglines are ≤ 90 characters.

---

### Task 5: API route handlers

**Files:** `src/app/api/types/route.ts`, `src/app/api/types/[code]/route.ts`, `src/app/api/compatibility/[a]/[b]/route.ts`, `src/lib/api.ts` (shared Zod schemas and response helpers), and tests `src/app/api/**/route.test.ts`. The tests call the exported `GET` directly with a `Request` and a params Promise. Read `node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/route.md` first.

**Endpoints**
- `GET /api/types?locale=en|ar` (default `en`) → `{ locale, types: Array<{ code, temperament, stack, accent, nickname, tagline }> }` in `TYPE_CODES` order.
- `GET /api/types/{code}?locale=` → `{ locale, type: TypeMeta, content: TypeContent, strengths: Record<FunctionCode, number> }`. The code is case-insensitive.
- `GET /api/compatibility/{a}/{b}?locale=` → `{ locale, relation: Relation, content: RelationContent, group: { key, name } }`.

**Validation** uses Zod:
- An invalid locale returns **400** `{ error: 'invalid_locale' }`.
- An unknown type code returns **404** `{ error: 'unknown_type', code }`.

**Headers:** successful responses send `Cache-Control: public, s-maxage=86400, stale-while-revalidate=604800`. Add CORS `Access-Control-Allow-Origin: *` on GET so a future Flutter or web client can call them.

**Tests:** each endpoint's happy path in both locales, a 400, a 404, and uppercase/lowercase code handling.

---

### Task 6: Shared UI kit — motion primitives, orbs, badges, state

These are reusable building blocks for Tasks 7–10. Each is a small focused file under `src/components/`.

**Motion primitives** (`motion/`), all built with `motion/react` and all honoring `useReducedMotion()`:
- **`SplitText`**: splits text into per-letter spans (Latin) or per-word spans (Arabic, where letters must stay joined, so detect the locale or `dir`) and animates them in with a staggered blur + y + opacity. Props: `as`, `text`, `delay`, `stagger`, `once`. Keep `aria-label` on the wrapper with the full text; the spans are `aria-hidden`.
- **`Reveal`**: fades and slides children in on viewport entry. Props: `direction` (`up | start | end`, where start and end mirror in RTL), `delay`.
- **`TiltCard`**: 3D tilt that follows the pointer (spring, max about 10°), plus a glare layer.
- **`SpotlightBorder`**: a radial glow on the border and background that follows the cursor through CSS variables `--x`/`--y`.
- **`Magnetic`**: its child is pulled toward the cursor within a radius and springs back.
- **`CountUp`**: animates 0 → value when in view, with a formatter using `Intl.NumberFormat(locale)`. Arabic uses Arabic-Indic digits via the locale; use `ar-EG`, `numberingSystem: 'arab'`.
- **`StaggerGroup`**: a container that staggers its children's variants.
- **`CursorGlow`**: a fixed large soft radial glow that trails the pointer on desktop only (pointer: fine). It is mounted once in the locale layout.

**Visuals** (`visual/`):
- **`GlowOrb`**: a pure CSS/DOM orb, with no WebGL, because many appear per page.
  - Props: `color`, `size`, `intensity` (0–1), `animated`.
  - Layers: a radial core gradient, a slowly rotating conic sheen, an outer blur halo, and a subtle breathing scale.
- **`TypeBadge`**: a pill with the code in the display font plus a temperament-colored dot.
- **`FunctionChip`**: a function code in its function color, with an optional position label (Dominant, Auxiliary, Tertiary, Inferior, localized).
- **`GlassCard`**: the `.glass` surface, optionally combined with `SpotlightBorder`.
- **`SectionHeading`**: an eyebrow, a `SplitText` title, and a subtitle.

**State** (`src/lib/`):
- **`useMyType.ts`** (client):
  - `useMyType()` uses `useSyncExternalStore` over localStorage key `mbti:my-type`, so it is SSR-safe (the server snapshot is `null`). It returns `{ myType: TypeCode|null, setMyType(code), clearMyType() }`.
  - `setMyType` writes localStorage and the cookie, then dispatches a same-tab event.
- **`sceneStore.ts`**: a zustand store `{ hoveredType: TypeCode|null, flyingTo: TypeCode|null, setHovered, setFlyingTo }`. It is shared between the DOM and the R3F canvas.

**`MyTypeChip`**: replaces the Task 1 header placeholder. When `myType` is set, it shows the badge "You: INFJ" linking to the hub. It mounts with an animation.

**shadcn restyle:** Dialog, Tooltip, and Tabs themed with the glass and tokens, with open and close animations.

**Tests:** unit-test `useMyType`'s pure helpers (parse and serialize), plus the cookie-string builder.

**Demo route:** add `src/app/[locale]/dev/kit/page.tsx`, rendering every primitive for visual review, with `robots: noindex`. It is removed in Task 10.

---

### Task 7: Landing page — cosmic 3D scene + type picker + selection transition

**Files:** `src/app/[locale]/page.tsx` (server; builds props from `getContent` and `TYPES`), `src/components/three/*`, `src/components/home/*`, plus message keys.

**`three/CosmicScene.tsx`** (client, loaded with `next/dynamic(..., { ssr:false })` from a client wrapper `CosmicBackdrop.tsx` with a CSS-gradient fallback while loading):
- **Starfield.** A custom `THREE.Points` with about 4000 stars (1500 on small screens or when performance is low).
  - The shader gives size attenuation, per-star twinkle (time + random phase), and a slight blue-to-violet color variation.
  - The whole field drifts slowly.
- **16 orbs** (`TypeOrb3D`), grouped in 4 temperament constellations, one per quadrant of a slowly rotating group. Each constellation is a small diamond of 4 orbs joined by faint additive lines.
  - Orb material is a custom `ShaderMaterial`: a fresnel rim glow in the type accent, an animated 3D simplex-noise surface swirl, and emissive output so Bloom catches it.
  - drei `<Float>` for bobbing.
  - Hover, from the canvas or from `sceneStore.hoveredType`: scale ×1.5 via a spring or lerp, and brighter.
  - Hovering the canvas shows the code in a drei `<Html>` label.
- **Camera.** Pointer parallax with a damped lerp.
- **Selection.** When `flyingTo` is set, the camera flies toward that orb over about 900ms (eased), the other orbs dim, and the starfield warps (stretches). Then `onArrive()` fires.
- **Postprocessing:** Bloom (mipmapBlur, luminanceThreshold about 0.15, intensity about 1.1) and Vignette. drei `<PerformanceMonitor>` toggles `dpr` between [1, 1.5] and 2, and drops Bloom on decline. `AdaptiveDpr`.
- **Reduced motion:** `frameloop="demand"`, a static composition, and no flight.
- The canvas is `aria-hidden` and `fixed inset-0 -z-10` on the landing only.

**`home/Hero.tsx`:**
- A full-viewport layout. An eyebrow and a giant `SplitText` headline ("Sixteen minds. Which one is yours?" in EN, plus an AR equivalent), a subtitle, and a `Magnetic` CTA that scrolls smoothly (Lenis) to the picker.
- Stats row with `CountUp`: 16 types, 8 functions, 256 pairings.
- A scroll cue animation.

**`home/WelcomeBack.tsx`** (client): if `myType` is set, a floating glass chip "Welcome back, INFJ — continue exploring →" with the orb.

**`home/TypePicker.tsx`** (client; receives `items: {code, temperament, stack, accent, nickname, tagline}[]` and the temperament names and descriptions as props):
- A temperament filter built with shadcn ToggleGroup: All plus the 4 temperaments, with an animated pill indicator (Motion `layoutId`). The grid reflows with Motion `layout` and `AnimatePresence popLayout`.
- Groups: 4 temperament sections, each with a header (name, description, color line), shown when the filter is "All". When filtered, a single grid.
- Each **`TypeCard`**:
  - `TiltCard` + `SpotlightBorder` + glass, with the accent set as `--accent`
  - a `GlowOrb`, the code in the display font (wrapped in `<ViewTransition name={`type-code-${code}`}>`), the nickname, the tagline, and 4 `FunctionChip`s
  - staggered `Reveal` on scroll
  - hovering sets `sceneStore.hoveredType`
- **Choosing a card** (click or Enter):
  1. `setMyType(code)` and `setFlyingTo(code)`
  2. the card pulses
  3. after the camera arrives, or 700ms (0ms under reduced motion), navigate with next-intl `router.push('/types/'+code.toLowerCase())`
  Cards are real `<Link>`s (progressive enhancement), so the flight intercepts the click and still navigates.
- Responsive:
  - Grid: 1 column (< 480px), 2 (sm), 3 (md), 4 (lg and up)
  - Mobile: tilt disabled for coarse pointers

**Acceptance:** the landing builds statically in both locales. The picker is fully keyboard operable. The Lighthouse performance target is about 90 or better, because the canvas is lazy and non-blocking. RTL layout is mirrored.

---

### Task 8: Type hub — hero, overview, function stack, situations

**Files:**
- Routes: `src/app/[locale]/types/[code]/layout.tsx`, `page.tsx`
- Components: `src/components/type/*`

**Routing**
- `generateStaticParams` returns the 16 lowercase codes (the locale comes from the parent). An unknown code calls `notFound()`.
- `generateMetadata` gives a localized title "INFJ — The Seer | MBTI·Cosmos" plus a description.
- The layout sets `style={{'--accent': accent}}` and renders `{children}{modal}` with an `@modal` slot. Task 9 fills the slot; for now create `@modal/default.tsx` returning `null`.

**Sections, in order**

1. **`TypeHero`**
   - A single R3F canvas (dynamic, `ssr:false`) with one large `TypeOrb3D` in the accent, orbited by 4 small satellites colored by the stack's function colors. Reuse the Task 7 orb shader; extract it to `three/orbMaterial.ts` if needed. Fallback: `GlowOrb`.
   - The giant code (`<ViewTransition name={`type-code-${code}`}>`, gradient text), a `SplitText` nickname, a tagline, a temperament badge, and the 4 function chips.
   - "This is me" / "You chose this type" state via `useMyType`.
   - A scroll cue.

2. **`Overview`:** a bento grid. One big card with the overview, a strengths card, and a blind-spots card. The list items reveal with stagger; strengths get a check glyph and blind spots get an eye glyph.

3. **`FunctionStack`** (GSAP ScrollTrigger inside `useGSAP`, desktop ≥ md only; mobile and reduced motion get a plain vertical list with Reveal):
   - A pinned section, about 300vh of scroll.
   - The 4 cards (Dominant → Inferior) fly in one by one and stack with offsets and scale. Each shows its position label, function code and name, short line, description snippet, a strength bar that fills, and a link to `/functions/{fn}`.
   - Alongside the stack, an **SVG radar** (octagon) of `functionStrengths(code)` for all 8 functions. Axes are labeled with function codes in their colors. The polygon path draws in (stroke-dashoffset), and the fill fades, scrubbed with the pin.
   - `gsap.matchMedia()` handles the breakpoints and reduced motion. Clean up on unmount; ScrollTrigger refreshes after fonts load.

4. **`SituationsScroller`** (desktop ≥ md: GSAP pinned horizontal scroll across 8 panels; mobile: a vertical list with `Reveal`):
   - Horizontal translation mirrors in RTL: use a positive x translate when `dir==='rtl'`.
   - Each panel: a large lucide icon with a micro-animation on enter (work Briefcase, love Heart, friendship Users, stress Flame, conflict Swords, decisions Scale, learning BookOpen, leadership Crown), the situation title and description, the type's summary, 3 behavior bullets, and the tip highlighted in an accent glass box.
   - Panel inner layers parallax at different speeds (`containerAnimation`).
   - A progress rail at the bottom with the 8 situation titles; clicking one scrolls there through Lenis.

5. **Compatibility teaser:** a placeholder section with the heading and an anchor `#compatibility`. Task 9 replaces it.

**Server/client split:** the page (server) passes plain data props (meta, content slice, and situations meta) to the client sections.

**Acceptance:**
- 32 pages are generated (16 codes × 2 locales).
- There is no hydration warning.
- Pin sections are correct after resizing.
- RTL horizontal scroll moves the correct direction.
- The mobile fallbacks work.

---

### Task 9: Compatibility — orbital wheel, pair details, intercepting modal + full page

**Files:**
- Components: `src/components/compat/*`
- Routes, under `src/app/[locale]/types/[code]/`:
  - `@modal/(.)compat/[other]/page.tsx`
  - `@modal/default.tsx` (exists)
  - `compat/[other]/page.tsx`
- Read `intercepting-routes.md`, `parallel-routes.md`, and `default.md` in the Next docs first.

**`CompatibilitySection`** replaces the Task 8 placeholder (id `compatibility`). It has a `SectionHeading`, a view toggle (Wheel | List), and a legend of the 4 relation groups with their colors and localized names and descriptions.

**`CompatWheel`** (client, SVG + DOM; no WebGL):
- The center is the current type's `GlowOrb` with its code.
- The other 15 types sit on the ring at an angle, evenly spaced and ordered by group then score.
  - Radius: `r = rMin + (1 - score/100) * (rMax - rMin)`, so better matches sit closer.
  - Each node is a small `GlowOrb` in its relation-group color, with intensity scaled by score, and a code label.
- Faint orbit circles are drawn, and connector lines from the center fade in on hover.
- The whole ring rotates very slowly (CSS or Motion). It pauses on hover or focus, and does not rotate under reduced motion.
- On entering view, nodes fly out from the center with a stagger.
- Node hover/focus:
  - a tooltip (shadcn Tooltip) with the relation name, score, and group
  - **prefetch** `GET /api/compatibility/{a}/{b}?locale=` through a tiny client cache (Map), with `router.prefetch` for the route
- Clicking a node navigates with `<Link href={`/types/${a}/compat/${b}`} scroll={false}>`, which the modal intercepts.
- Nodes are keyboard reachable in a logical order, and the mobile layout scales down.

**`CompatList`:** a sortable list (by score or by group) of the 15 types, with animated reorder using Motion `layout`. Rows show a badge, the relation name, a score bar, and a link to the same URL.

**`PairDetails`** (shared by the modal and the full page; it receives pre-resolved props, and the server resolves content):
- Header: two `GlowOrb`s (a and b) that drift toward each other on mount, joined by an animated energy beam (an SVG path with a dash animation in the group color). Code badges sit under each orb.
- The relation name (`SplitText`) and tagline, plus a circular score ring: an SVG circle whose stroke animates from 0 to the score, with `CountUp` in the middle.
- A **function Venn**: two overlapping circles with a's functions, b's functions, and the shared ones in the overlap (as `FunctionChip`s).
- Description, "What works" (3), and "Watch out for" (3) as glass cards with a staggered reveal.
- Actions:
  - "See it from {b}'s side" → `/types/{b}/compat/{a}`
  - "Explore {b}" → `/types/{b}`
  Directional kinds show the correct inverse automatically, via the engine.

**Modal route:** a shadcn Dialog open by default, with an animated scale, blur, and backdrop. Closing calls `router.back()`. Content scrolls inside the dialog, and Lenis is paused while it is open.

**Full page route:**
- `generateStaticParams` returns all 16×16 lowercase pairs (a comes from the parent `[code]`).
- `generateMetadata`, a page layout wrapping `PairDetails`, and a back link to `/types/{a}#compatibility`.
- An unknown code calls `notFound()`.

**Acceptance:**
- Clicking a node opens the modal and changes the URL; refresh shows the full page; back closes the modal.
- The build generates 512 pair pages without errors.
- Both locales work.

---

### Task 10: Functions pages + global polish

**Functions pages:** `src/app/[locale]/functions/[fn]/page.tsx`. `generateStaticParams` returns the 8 lowercase codes.
- Hero: a giant function code in its color with a `GlowOrb`, plus the name and short line.
- Description, "As a dominant function", "When it's inferior", and keyword pills.
- "Types that lead with it": 4 grids by position (Dominant, Auxiliary, Tertiary, Inferior), each listing type cards that link to the hubs.
- A function switcher rail with all 8 functions (an animated active indicator).
- The header nav "Functions" points to `/functions/ni`. Function chips everywhere link here.

**Polish**
- **Language switch:** a smooth full-screen fade/blur overlay during the locale change, using a transition-aware overlay; no layout jump.
- **Default route crossfade:** use `<ViewTransition>` defaults in the locale layout (per the Next view-transitions guide), with CSS for `::view-transition-*` giving a subtle blur-crossfade. The shared element `type-code-*` morphs between the landing card and the hub hero.
- **Metadata:**
  - localized `generateMetadata` on every page
  - `alternates.languages` for en/ar
  - `opengraph-image.tsx` for type hubs and pair pages (edge-rendered image: dark background, accent glow, code, nickname)
  - `sitemap.ts` and `robots.ts`
- **Delete** `src/app/[locale]/dev/kit`.
- **Audits:**
  - reduced motion: everything still readable and navigable
  - mobile at 375px on every page
  - RTL on every page
  - focus order
  - no console errors or hydration warnings in `next dev`

---

### Task 11: End-to-end smoke tests + final verification

- Install `@playwright/test` and Chromium (`npx playwright install chromium`). Add `playwright.config.ts`, which starts `npm run build && npm run start` on port 3100 as its `webServer`. Add an `"e2e": "playwright test"` script. Keep vitest from picking up `e2e/`.
- `e2e/flow.spec.ts`:
  1. `/` redirects to `/en`, and the landing shows 16 type cards.
  2. Click INFJ → the URL becomes `/en/types/infj`, and the hero shows INFJ plus its localized nickname. localStorage `mbti:my-type` = `INFJ`.
  3. The compatibility section exists. Click the ESTP node (or its list row) → a dialog is visible showing the Dual relation name, and the URL is `/en/types/infj/compat/estp`.
  4. Reload → the full page (no dialog role) shows the same relation.
  5. `/ar/types/infj` has `html[dir=rtl]` and the Arabic nickname.
  6. `/en/functions/ni` renders and links to the INFJ hub.
  7. The API returns 200 JSON for `/api/compatibility/infj/estp?locale=ar`, and 404 for `/api/types/abcd`.
  8. Run with `reducedMotion: 'reduce'` (a Playwright context option), and the flow still works.
- Fix any real bugs found, and document them in the report.
- Final: `npm run typecheck && npm run lint && npm run test && npm run build && npm run e2e` all green.
- Replace the scaffold `README.md` with a short project README covering the stack, scripts, structure, the relations engine explanation, and a Flutter→Next cheat sheet.
