"use client"

import * as React from "react"
import { ThemeToggle } from "@/components/theme-toggle"
import {
  GlowButtonPreview,
  ElectricBadgePreview,
  GradientCardPreview,
  ShimmerTextPreview,
  MagneticButtonPreview,
  AuroraBackgroundPreview,
  KbdPreview,
  OrbitAnimationPreview,
  NoiseTexturePreview,
  SpotlightHeroPreview,
  BentoGridPreview,
  ButtonPreview,
  InputPreview,
  TextareaPreview,
  LabelPreview,
  BadgePreview,
  CardPreview,
  SeparatorPreview,
  SkeletonPreview,
  AvatarPreview,
  TooltipPreview,
  SwitchPreview,
  CheckboxPreview,
  RadioGroupPreview,
  SelectPreview,
  SonnerPreview,
  DialogPreview,
  AlertDialogPreview,
  SheetPreview,
  DropdownMenuPreview,
  PopoverPreview,
  TabsPreview,
  AccordionPreview,
  AlertPreview,
  CommandPreview,
  FormPreview,
  TablePreview,
  DataTablePreview,
  PaginationPreview,
  SliderPreview,
  ProgressPreview,
  BreadcrumbPreview,
  ScrollAreaPreview,
  HoverCardPreview,
  ContextMenuPreview,
  ResizablePreview,
  NavigationMenuPreview,
  CalendarPreview,
  DatePickerPreview,
  ComboboxPreview,
  TiltCardPreview,
  TypewriterPreview,
  CounterPreview,
  GradientTextPreview,
  MeteorsPreview,
  ConfettiButtonPreview,
  ShimmerButtonPreview,
  GlowCardPreview,
  FloatingDockPreview,
  MarqueePreview,
  BeamPreview,
  GlowInputPreview,
  HeroCenteredPreview,
  HeroSplitPreview,
  PricingSectionPreview,
  FeatureGridPreview,
  FeatureAlternatingPreview,
  CtaSectionPreview,
  FooterPreview,
  AuthSignInPreview,
  AuthSignUpPreview,
  DashboardAnalyticsPreview,
  SettingsPagePreview,
  AIChatPreview,
} from "@/app/(docs)/_components/previews"

const PREVIEWS: Record<string, React.ReactNode> = {
  "glow-button": <GlowButtonPreview />,
  "electric-badge": <ElectricBadgePreview />,
  "gradient-card": <GradientCardPreview />,
  "shimmer-text": <ShimmerTextPreview />,
  "magnetic-button": <MagneticButtonPreview />,
  "aurora-background": <AuroraBackgroundPreview />,
  "kbd": <KbdPreview />,
  "orbit-animation": <OrbitAnimationPreview />,
  "noise-texture": <NoiseTexturePreview />,
  "spotlight-hero": <SpotlightHeroPreview />,
  "bento-grid": <BentoGridPreview />,
  "button": <ButtonPreview />,
  "input": <InputPreview />,
  "textarea": <TextareaPreview />,
  "label": <LabelPreview />,
  "badge": <BadgePreview />,
  "card": <CardPreview />,
  "separator": <SeparatorPreview />,
  "skeleton": <SkeletonPreview />,
  "avatar": <AvatarPreview />,
  "tooltip": <TooltipPreview />,
  "switch": <SwitchPreview />,
  "checkbox": <CheckboxPreview />,
  "radio-group": <RadioGroupPreview />,
  "select": <SelectPreview />,
  "sonner": <SonnerPreview />,
  "dialog": <DialogPreview />,
  "alert-dialog": <AlertDialogPreview />,
  "sheet": <SheetPreview />,
  "dropdown-menu": <DropdownMenuPreview />,
  "popover": <PopoverPreview />,
  "tabs": <TabsPreview />,
  "accordion": <AccordionPreview />,
  "alert": <AlertPreview />,
  "command": <CommandPreview />,
  "form": <FormPreview />,
  "table": <TablePreview />,
  "data-table": <DataTablePreview />,
  "pagination": <PaginationPreview />,
  "slider": <SliderPreview />,
  "progress": <ProgressPreview />,
  "breadcrumb": <BreadcrumbPreview />,
  "scroll-area": <ScrollAreaPreview />,
  "hover-card": <HoverCardPreview />,
  "context-menu": <ContextMenuPreview />,
  "resizable": <ResizablePreview />,
  "navigation-menu": <NavigationMenuPreview />,
  "calendar": <CalendarPreview />,
  "date-picker": <DatePickerPreview />,
  "combobox": <ComboboxPreview />,
  "tilt-card": <TiltCardPreview />,
  "typewriter": <TypewriterPreview />,
  "counter": <CounterPreview />,
  "gradient-text": <GradientTextPreview />,
  "meteors": <MeteorsPreview />,
  "confetti-button": <ConfettiButtonPreview />,
  "shimmer-button": <ShimmerButtonPreview />,
  "glow-card": <GlowCardPreview />,
  "floating-dock": <FloatingDockPreview />,
  "marquee": <MarqueePreview />,
  "beam": <BeamPreview />,
  "glow-input": <GlowInputPreview />,
  "hero-centered": <HeroCenteredPreview />,
  "hero-split": <HeroSplitPreview />,
  "pricing": <PricingSectionPreview />,
  "feature-grid": <FeatureGridPreview />,
  "feature-alternating": <FeatureAlternatingPreview />,
  "cta-section": <CtaSectionPreview />,
  "footer": <FooterPreview />,
  "auth-sign-in": <AuthSignInPreview />,
  "auth-sign-up": <AuthSignUpPreview />,
  "dashboard-analytics": <DashboardAnalyticsPreview />,
  "settings-page": <SettingsPagePreview />,
  "ai-chat": <AIChatPreview />,
}

export function SandboxClient({ name }: { name: string }) {
  const preview = PREVIEWS[name]

  return (
    <div className="min-h-svh flex flex-col bg-[var(--color-bg)]">
      {/* Minimal toolbar */}
      <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between h-10 px-4 border-b border-[var(--color-border)] bg-[var(--color-bg)]/90 backdrop-blur-sm">
        <span className="text-xs font-mono text-[var(--color-text-4)]">
          /sandbox/<span className="text-[var(--color-text-3)]">{name}</span>
        </span>
        <div className="flex items-center gap-3">
          <a
            href={`/docs/components/${name}`}
            className="text-[11px] text-[var(--color-text-4)] hover:text-[var(--color-text-2)] transition-colors"
          >
            docs →
          </a>
          <ThemeToggle />
        </div>
      </div>

      {/* Preview area */}
      <div className="flex-1 flex items-center justify-center pt-10 p-8">
        {preview ?? (
          <p className="text-sm text-[var(--color-text-4)]">
            No preview registered for &quot;{name}&quot;
          </p>
        )}
      </div>
    </div>
  )
}
