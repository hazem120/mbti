"use client";

import { useTranslations } from "next-intl";

import { TYPE_CODES, TYPES } from "@/data/types";
import { useMyType } from "@/lib/useMyType";
import { useSceneStore } from "@/lib/sceneStore";
import { cn } from "@/lib/utils";
import { TypeBadge } from "@/components/visual/TypeBadge";
import { GlowOrb } from "@/components/visual/GlowOrb";
import { Magnetic } from "@/components/motion/Magnetic";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const FOCUS = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--accent)";

/** My-type picker + scene-store hover demo (drives the header MyTypeChip). */
export function MyTypeDemo() {
  const t = useTranslations("devKit");
  const { myType, setMyType, clearMyType } = useMyType();
  const hovered = useSceneStore((s) => s.hoveredType);
  const setHovered = useSceneStore((s) => s.setHovered);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-3 text-sm">
        <span className="text-muted-foreground">{t("myTypeCurrent")}</span>
        {myType ? <TypeBadge code={myType} size="sm" /> : <span>{t("myTypeNone")}</span>}
        <Button variant="outline" size="sm" onClick={clearMyType} className={FOCUS}>
          {t("myTypeClear")}
        </Button>
        <span className="ms-auto text-muted-foreground">{t("sceneHovered")}</span>
        <span translate="no" className="font-display">
          {hovered ?? "—"}
        </span>
      </div>
      <div className="grid grid-cols-4 gap-3 sm:grid-cols-8">
        {TYPE_CODES.map((code, i) => (
          <button
            key={code}
            type="button"
            aria-pressed={myType === code}
            onClick={() => setMyType(code)}
            onPointerEnter={() => setHovered(code)}
            onPointerLeave={() => setHovered(null)}
            onFocus={() => setHovered(code)}
            onBlur={() => setHovered(null)}
            className={cn(
              "flex flex-col items-center gap-1 rounded-xl p-2 text-xs transition-colors hover:bg-surface",
              myType === code && "bg-surface",
              FOCUS,
            )}
          >
            <GlowOrb
              color={TYPES[code].accent}
              size={36}
              intensity={myType === code ? 1 : 0.45}
              phase={i * 0.45}
            />
            <span translate="no" className="font-display">
              {code}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

export function MagneticDemo() {
  const t = useTranslations("devKit");
  return (
    <Magnetic>
      <button
        type="button"
        className={cn(
          "glass rounded-full px-6 py-3 text-sm font-medium text-fg transition-colors hover:text-(--accent)",
          FOCUS,
        )}
      >
        {t("magneticButton")}
      </button>
    </Magnetic>
  );
}

/** Restyled shadcn (base-ui) Dialog, Tooltip and Tabs. */
export function UiDemo() {
  const t = useTranslations("devKit");
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center gap-3">
        <Dialog>
          <DialogTrigger render={<Button variant="outline" className={FOCUS} />}>
            {t("openDialog")}
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{t("dialogTitle")}</DialogTitle>
              <DialogDescription>{t("dialogBody")}</DialogDescription>
            </DialogHeader>
            <div className="flex justify-center py-4">
              <GlowOrb size={88} intensity={0.9} />
            </div>
            <DialogFooter showCloseButton />
          </DialogContent>
        </Dialog>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger render={<Button variant="ghost" className={FOCUS} />}>
              {t("tooltipTrigger")}
            </TooltipTrigger>
            <TooltipContent>{t("tooltipBody")}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <Tabs defaultValue="one">
        <TabsList>
          <TabsTrigger value="one">{t("tabOne")}</TabsTrigger>
          <TabsTrigger value="two">{t("tabTwo")}</TabsTrigger>
          <TabsTrigger value="three">{t("tabThree")}</TabsTrigger>
        </TabsList>
        <TabsContent value="one" className="p-3 text-muted-foreground">
          {t("tabPanelOne")}
        </TabsContent>
        <TabsContent value="two" className="p-3 text-muted-foreground">
          {t("tabPanelTwo")}
        </TabsContent>
        <TabsContent value="three" className="p-3 text-muted-foreground">
          {t("tabPanelThree")}
        </TabsContent>
      </Tabs>

      <Tabs defaultValue="one">
        <TabsList variant="line">
          <TabsTrigger value="one">{t("tabOne")}</TabsTrigger>
          <TabsTrigger value="two">{t("tabTwo")}</TabsTrigger>
          <TabsTrigger value="three">{t("tabThree")}</TabsTrigger>
        </TabsList>
        <TabsContent value="one" className="p-3 text-muted-foreground">
          {t("tabPanelOne")}
        </TabsContent>
        <TabsContent value="two" className="p-3 text-muted-foreground">
          {t("tabPanelTwo")}
        </TabsContent>
        <TabsContent value="three" className="p-3 text-muted-foreground">
          {t("tabPanelThree")}
        </TabsContent>
      </Tabs>
    </div>
  );
}
