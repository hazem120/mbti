"use client"

import { Tabs as TabsPrimitive } from "@base-ui/react/tabs"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

function Tabs({
  className,
  orientation = "horizontal",
  ...props
}: TabsPrimitive.Root.Props) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      data-orientation={orientation}
      className={cn(
        "group/tabs flex gap-2 data-horizontal:flex-col",
        className
      )}
      {...props}
    />
  )
}

const tabsListVariants = cva(
  "group/tabs-list relative isolate inline-flex w-fit items-center justify-center rounded-full p-1 text-muted-foreground group-data-horizontal/tabs:h-10 group-data-vertical/tabs:h-fit group-data-vertical/tabs:flex-col group-data-vertical/tabs:rounded-2xl data-[variant=line]:rounded-none data-[variant=line]:p-0",
  {
    variants: {
      variant: {
        default: "glass",
        line: "gap-1 border-b border-border bg-transparent",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function TabsList({
  className,
  variant = "default",
  children,
  ...props
}: TabsPrimitive.List.Props & VariantProps<typeof tabsListVariants>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      data-variant={variant}
      className={cn(tabsListVariants({ variant }), className)}
      {...props}
    >
      {children}
      <TabsIndicator variant={variant ?? "default"} />
    </TabsPrimitive.List>
  )
}

/**
 * Sliding active-tab indicator. Base UI writes the active tab's box to
 * `--active-tab-*` (physical px from the list's top-left), so it is
 * positioned from the physical top-left corner and glides in both LTR and RTL.
 */
function TabsIndicator({
  variant,
}: {
  variant: NonNullable<VariantProps<typeof tabsListVariants>["variant"]>
}) {
  return (
    <TabsPrimitive.Indicator
      data-slot="tabs-indicator"
      // Physical origin on purpose: --active-tab-left/top are physical px.
      style={{ top: 0, left: 0 }}
      className={cn(
        "pointer-events-none absolute -z-10 h-(--active-tab-height) w-(--active-tab-width) translate-x-(--active-tab-left) translate-y-(--active-tab-top) transition-[translate,width,height] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
        variant === "line"
          ? "after:absolute after:inset-x-2 after:-bottom-px after:h-0.5 after:rounded-full after:bg-(--accent) after:shadow-[0_0_12px_var(--accent)]"
          : "rounded-full border border-[color-mix(in_oklab,var(--accent)_45%,transparent)] bg-[color-mix(in_oklab,var(--accent)_18%,transparent)] shadow-[0_0_24px_-6px_var(--accent)]"
      )}
    />
  )
}

function TabsTrigger({ className, ...props }: TabsPrimitive.Tab.Props) {
  return (
    <TabsPrimitive.Tab
      data-slot="tabs-trigger"
      className={cn(
        "relative inline-flex h-full flex-1 items-center justify-center gap-1.5 rounded-full border border-transparent px-4 py-1 text-sm font-medium whitespace-nowrap text-foreground/60 transition-colors duration-300 outline-none focus-visible:ring-2 focus-visible:ring-(--accent) group-data-vertical/tabs:w-full group-data-vertical/tabs:justify-start hover:text-foreground disabled:pointer-events-none disabled:opacity-50 has-data-[icon=inline-end]:pe-1 has-data-[icon=inline-start]:ps-1 aria-disabled:pointer-events-none aria-disabled:opacity-50 dark:text-muted-foreground dark:hover:text-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        "group-data-[variant=line]/tabs-list:bg-transparent group-data-[variant=line]/tabs-list:data-active:bg-transparent dark:group-data-[variant=line]/tabs-list:data-active:border-transparent dark:group-data-[variant=line]/tabs-list:data-active:bg-transparent",
        "data-active:bg-transparent data-active:text-foreground dark:data-active:text-foreground",
        className
      )}
      {...props}
    />
  )
}

function TabsContent({ className, ...props }: TabsPrimitive.Panel.Props) {
  return (
    <TabsPrimitive.Panel
      data-slot="tabs-content"
      className={cn("flex-1 text-sm outline-none animate-in fade-in-0 slide-in-from-bottom-1 duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] focus-visible:ring-2 focus-visible:ring-(--accent) rounded-xl", className)}
      {...props}
    />
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent, TabsIndicator, tabsListVariants }
