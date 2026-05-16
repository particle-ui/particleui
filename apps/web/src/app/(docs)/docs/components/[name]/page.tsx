import { promises as fs } from "fs"
import path from "path"
import { notFound } from "next/navigation"
import Link from "next/link"
import { Sparkle } from "@phosphor-icons/react/dist/ssr"
import type { Metadata } from "next"
import { codeToHtml } from "shiki"
import { ComponentTabs } from "../../../_components/component-tabs"
import { PropsTable, parseProps } from "../../../_components/props-table"
import { CodeBlock } from "@/components/code-block"
import { PrevNext } from "@/components/docs/prev-next"
import { FrameworkInstall } from "../../../_components/framework-install"
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
  SpotlightPreview,
  BorderBeamPreview,
  WordRotatePreview,
  ScrollRevealPreview,
  RippleButtonPreview,
  FlipCardPreview,
  ShineBorderPreview,
  HeroCenteredPreview,
  HeroSplitPreview,
  PricingSectionPreview,
  FeatureGridPreview,
  FeatureAlternatingPreview,
  CtaSectionPreview,
  FooterPreview,
  AuthSignInPreview,
  AuthSignUpPreview,
  AuthForgotPasswordPreview,
  AuthVerifyEmailPreview,
  DashboardAnalyticsPreview,
  SettingsPagePreview,
  AIChatPreview,
  TestimonialsSectionPreview,
  StatsSectionPreview,
  FaqSectionPreview,
  LogoCloudPreview,
  HowItWorksPreview,
  NewsletterSectionPreview,
  GlobePreview,
  AnimatedBeamPreview,
  CursorTrailPreview,
  ParticleHeroPreview,
  BlurFadePreview,
  MorphingTextPreview,
  RetroGridPreview,
  TextShimmerPreview,
  SparklesTextPreview,
  AnimatedListPreview,
  NeonBorderPreview,
  TextRevealPreview,
  GlitchTextPreview,
  LetterSwapPreview,
  ScrollProgressPreview,
  WaveTextPreview,
  LiquidButtonPreview,
  NumberFlowPreview,
  BadgeShinePreview,
  AnimateInPreview,
  LandingTemplatePreview,
  AuthTemplatePreview,
  BlogTemplatePreview,
  DocsSiteTemplatePreview,
  PricingPageTemplatePreview,
  SaasDashboardTemplatePreview,
} from "../../../_components/previews"

interface RegistryItem {
  name: string
  type: string
  title: string
  description: string
  categories: string[]
  dependencies?: string[]
  registryDependencies?: string[]
  files: { path: string; content?: string; type: string }[]
}

const PREVIEWS: Record<string, React.ReactNode> = {
  // Particle / effect components
  "glow-button": <GlowButtonPreview />,
  "electric-badge": <ElectricBadgePreview />,
  "gradient-card": <GradientCardPreview />,
  "shimmer-text": <ShimmerTextPreview />,
  "magnetic-button": <MagneticButtonPreview />,
  "aurora-background": <AuroraBackgroundPreview />,
  "globe": <GlobePreview />,
  "animated-beam": <AnimatedBeamPreview />,
  "cursor-trail": <CursorTrailPreview />,
  "kbd": <KbdPreview />,
  "orbit-animation": <OrbitAnimationPreview />,
  "noise-texture": <NoiseTexturePreview />,
  "spotlight-hero": <SpotlightHeroPreview />,
  "bento-grid": <BentoGridPreview />,
  // Core primitives
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
  // Phase 2: Composite
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
  // Phase 3: Data + Navigation
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
  // Phase 4: Particle layer
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
  "spotlight": <SpotlightPreview />,
  "border-beam": <BorderBeamPreview />,
  "word-rotate": <WordRotatePreview />,
  "scroll-reveal": <ScrollRevealPreview />,
  "ripple": <RippleButtonPreview />,
  "flip-card": <FlipCardPreview />,
  "shine-border": <ShineBorderPreview />,
  // Phase 8: New particles
  "blur-fade": <BlurFadePreview />,
  "morphing-text": <MorphingTextPreview />,
  "retro-grid": <RetroGridPreview />,
  "text-shimmer": <TextShimmerPreview />,
  "sparkles-text": <SparklesTextPreview />,
  "animated-list": <AnimatedListPreview />,
  "neon-border": <NeonBorderPreview />,
  "text-reveal": <TextRevealPreview />,
  "glitch-text": <GlitchTextPreview />,
  "letter-swap": <LetterSwapPreview />,
  "scroll-progress": <ScrollProgressPreview />,
  "wave-text": <WaveTextPreview />,
  "liquid-button": <LiquidButtonPreview />,
  "number-flow": <NumberFlowPreview />,
  "badge-shine": <BadgeShinePreview />,
  "animate-in": <AnimateInPreview />,
  // Phase 5: Blocks
  "hero-centered": <HeroCenteredPreview />,
  "hero-split": <HeroSplitPreview />,
  "pricing": <PricingSectionPreview />,
  "feature-grid": <FeatureGridPreview />,
  "feature-alternating": <FeatureAlternatingPreview />,
  "cta-section": <CtaSectionPreview />,
  "footer": <FooterPreview />,
  "auth-sign-in": <AuthSignInPreview />,
  "auth-sign-up": <AuthSignUpPreview />,
  "auth-forgot-password": <AuthForgotPasswordPreview />,
  "auth-verify-email": <AuthVerifyEmailPreview />,
  "dashboard-analytics": <DashboardAnalyticsPreview />,
  "settings-page": <SettingsPagePreview />,
  "ai-chat": <AIChatPreview />,
  "testimonials": <TestimonialsSectionPreview />,
  "stats": <StatsSectionPreview />,
  "faq": <FaqSectionPreview />,
  "logo-cloud": <LogoCloudPreview />,
  "how-it-works": <HowItWorksPreview />,
  "newsletter": <NewsletterSectionPreview />,
  // Templates
  "landing": <LandingTemplatePreview />,
  "auth": <AuthTemplatePreview />,
  "blog": <BlogTemplatePreview />,
  "docs-site": <DocsSiteTemplatePreview />,
  "pricing-page": <PricingPageTemplatePreview />,
  "saas-dashboard": <SaasDashboardTemplatePreview />,
  // Pro blocks
  "particle-hero": <ParticleHeroPreview />,
}

async function getItem(name: string): Promise<RegistryItem | null> {
  try {
    const p = path.join(process.cwd(), "public/r/react", `${name}.json`)
    return JSON.parse(await fs.readFile(p, "utf-8"))
  } catch {
    return null
  }
}

export async function generateStaticParams() {
  const p = path.join(process.cwd(), "public/r/react/index.json")
  const data = JSON.parse(await fs.readFile(p, "utf-8"))
  const items: { name: string; tier?: string }[] = Array.isArray(data) ? data : (data.items ?? [])
  return items.filter((i) => i.tier !== "themes").map((i) => ({ name: i.name }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ name: string }>
}): Promise<Metadata> {
  const { name } = await params
  const item = await getItem(name)
  if (!item) return { title: "Not found" }
  return { title: `${item.title} — ParticleUI`, description: item.description }
}

export default async function ComponentDocPage({
  params,
}: {
  params: Promise<{ name: string }>
}) {
  const { name } = await params
  const item = await getItem(name)
  if (!item) notFound()

  const isPro = item.categories.includes("pro")
  const mainFile = item.files.find((f) => f.type !== "registry:file")
  const preview = PREVIEWS[name]
  const installCmd = `npx particleui-cli add ${item.name}`
  const propDefs = mainFile?.content ? parseProps(mainFile.content) : []

  const usageCode = generateUsage(item)
  const highlightedUsage = usageCode
    ? await codeToHtml(usageCode.trim(), { lang: "tsx", theme: "github-dark-dimmed" })
    : undefined

  const aiPrompt = generateAiPrompt(item, usageCode)

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      {/* Breadcrumb */}
      <nav className="mb-8 flex items-center gap-1.5 text-xs text-text-3">
        <Link href="/docs" className="hover:text-text-2 transition-colors">Docs</Link>
        <span className="opacity-40">/</span>
        <Link href="/docs" className="hover:text-text-2 transition-colors">Components</Link>
        <span className="opacity-40">/</span>
        <span className="text-text-3">{item.title}</span>
      </nav>

      {/* Title */}
      <div className="mb-3 flex items-center gap-3">
        <h1 className="text-[2rem] font-semibold tracking-[-0.02em] leading-[1.2] text-text-1">{item.title}</h1>
        {isPro && (
          <span className="inline-flex items-center gap-1 rounded-full border border-accent-border bg-accent-dim px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-accent">
            <Sparkle size={9} weight="fill" />Pro
          </span>
        )}
      </div>
      <p className="mb-8 text-text-2 text-[0.9375rem] leading-[1.75]">{item.description}</p>

      {/* Pro notice */}
      {isPro && (
        <div className="mb-8 rounded-xl border border-accent-border bg-accent-dim px-4 py-3 flex items-start gap-3">
          <Sparkle size={14} weight="fill" className="text-accent mt-0.5 shrink-0" />
          <p className="text-[15px] text-text-2">
            Pro component — requires an active license.{" "}
            <Link href="/pricing" className="text-accent hover:underline">
              Get access →
            </Link>
          </p>
        </div>
      )}

      {/* Preview + Code tabs */}
      {mainFile?.content && (
        <div className="mb-10">
          <ComponentTabs
            preview={preview ?? (
              <p className="text-xs text-text-3">No preview available</p>
            )}
            code={usageCode}
            highlightedCode={highlightedUsage}
            aiPrompt={aiPrompt}
            componentName={name}
          />
        </div>
      )}

      {/* Installation */}
      <section className="mb-10">
        <h2 id="installation" className="mb-5 text-xl font-semibold tracking-[-0.01em] text-text-1">Installation</h2>

        {isPro ? (
          <>
            <Step n={1} title="Add your token to .env">
              <p className="text-[15px] text-text-2 mb-3">
                Get a token from{" "}
                <Link href="/dashboard/tokens" className="text-accent hover:underline">your dashboard</Link>, then add it to{" "}
                <code className="text-text-2 bg-white/[0.05] rounded px-1.5 py-0.5 text-xs">.env</code>:
              </p>
              <CodeBlock code={`PARTICLEUI_TOKEN=your-token-here`} />
            </Step>
            <Step n={2} title="Add the registry to components.json">
              <p className="text-[15px] text-text-2 mb-3">
                Wire up the authenticated registry so the CLI can resolve Pro components:
              </p>
              <CodeBlock
                code={`"registries": {\n  "@particleui": {\n    "url": "https://particleui.dev/r/react/{name}.json",\n    "headers": { "Authorization": "Bearer \${PARTICLEUI_TOKEN}" }\n  }\n}`}
              />
            </Step>
            <Step n={3} title="Run the CLI">
              <CodeBlock code={installCmd} />
            </Step>
          </>
        ) : (
          <Step n={1} title="Run the CLI">
            <FrameworkInstall name={item.name} isPro={isPro} />
          </Step>
        )}
      </section>

      {/* Usage */}
      {mainFile?.content && (
        <section className="mb-10">
          <h2 id="usage" className="mb-5 text-xl font-semibold tracking-[-0.01em] text-text-1">Usage</h2>
          <CodeBlock code={generateUsage(item)} />
        </section>
      )}

      {/* Props table */}
      <PropsTable props={propDefs} />

      {/* Details */}
      <section className="mb-10">
        <h2 id="details" className="mb-5 text-xl font-semibold tracking-[-0.01em] text-text-1">Details</h2>
        <div className="divide-y divide-border rounded-xl border border-border overflow-hidden">
          {[
            ["Source file", mainFile?.path ?? "—"],
            ["Type", item.type.replace("registry:", "")],
            ["Categories", item.categories.filter((c) => c !== "pro" && c !== "free").join(", ") || "—"],
            ["npm dependencies", item.dependencies?.join(", ") ?? "—"],
            ["Registry deps", item.registryDependencies?.join(", ") ?? "—"],
            ["Claude skill", item.files.some((f) => f.type === "registry:file") ? "Bundled — installs to ~/.claude/skills/" : "—"],
          ].map(([label, value]) => (
            <div key={label as string} className="flex items-center gap-4 bg-surface-1 px-4 py-3">
              <span className="w-36 shrink-0 text-xs text-text-3">{label}</span>
              <span className="font-mono text-xs text-text-2">{value}</span>
            </div>
          ))}
        </div>
      </section>

      <PrevNext />
    </div>
  )
}

function Step({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <div className="mb-6 flex gap-4">
      <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-border text-xs font-bold text-text-3">
        {n}
      </div>
      <div className="flex-1">
        <h3 className="text-[0.9375rem] font-semibold tracking-[-0.01em] mb-3 text-text-1">{title}</h3>
        {children}
      </div>
    </div>
  )
}


const USAGE_EXAMPLES: Record<string, string> = {
  // Core primitives
  button: `import { Button } from "@/components/ui/button"

export default function Example() {
  return <Button>Click me</Button>
}`,
  badge: `import { Badge } from "@/components/ui/badge"

export default function Example() {
  return <Badge>New</Badge>
}`,
  input: `import { Input } from "@/components/ui/input"

export default function Example() {
  return <Input placeholder="Email" />
}`,
  label: `import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

export default function Example() {
  return (
    <div className="grid gap-1.5">
      <Label htmlFor="email">Email</Label>
      <Input id="email" placeholder="you@example.com" />
    </div>
  )
}`,
  textarea: `import { Textarea } from "@/components/ui/textarea"

export default function Example() {
  return <Textarea placeholder="Write something..." />
}`,
  card: `import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export default function Example() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Title</CardTitle>
      </CardHeader>
      <CardContent>Content goes here.</CardContent>
    </Card>
  )
}`,
  avatar: `import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

export default function Example() {
  return (
    <Avatar>
      <AvatarImage src="https://avatar.vercel.sh/user" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  )
}`,
  separator: `import { Separator } from "@/components/ui/separator"

export default function Example() {
  return (
    <div>
      <p>Above</p>
      <Separator className="my-4" />
      <p>Below</p>
    </div>
  )
}`,
  skeleton: `import { Skeleton } from "@/components/ui/skeleton"

export default function Example() {
  return (
    <div className="flex items-center gap-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[200px]" />
        <Skeleton className="h-4 w-[160px]" />
      </div>
    </div>
  )
}`,
  tooltip: `import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"

export default function Example() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Hover me</Button>
        </TooltipTrigger>
        <TooltipContent>This is a tooltip</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}`,
  switch: `import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export default function Example() {
  return (
    <div className="flex items-center gap-2">
      <Switch id="airplane" />
      <Label htmlFor="airplane">Airplane mode</Label>
    </div>
  )
}`,
  checkbox: `import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

export default function Example() {
  return (
    <div className="flex items-center gap-2">
      <Checkbox id="terms" />
      <Label htmlFor="terms">Accept terms</Label>
    </div>
  )
}`,
  select: `import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"

export default function Example() {
  return (
    <Select>
      <SelectTrigger className="w-48">
        <SelectValue placeholder="Pick one" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="react">React</SelectItem>
        <SelectItem value="vue">Vue</SelectItem>
        <SelectItem value="svelte">Svelte</SelectItem>
      </SelectContent>
    </Select>
  )
}`,
  "radio-group": `import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

export default function Example() {
  return (
    <RadioGroup defaultValue="react">
      <div className="flex items-center gap-2">
        <RadioGroupItem value="react" id="react" />
        <Label htmlFor="react">React</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="vue" id="vue" />
        <Label htmlFor="vue">Vue</Label>
      </div>
    </RadioGroup>
  )
}`,
  tabs: `import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

export default function Example() {
  return (
    <Tabs defaultValue="account">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">Account settings.</TabsContent>
      <TabsContent value="password">Change password here.</TabsContent>
    </Tabs>
  )
}`,
  accordion: `import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"

export default function Example() {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>Yes. It follows WAI-ARIA guidelines.</AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}`,
  alert: `import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"

export default function Example() {
  return (
    <Alert>
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>You can add components from the CLI.</AlertDescription>
    </Alert>
  )
}`,
  dialog: `import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

export default function Example() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>This action cannot be undone.</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}`,
  "alert-dialog": `import {
  AlertDialog, AlertDialogTrigger, AlertDialogContent,
  AlertDialogHeader, AlertDialogTitle, AlertDialogDescription,
  AlertDialogFooter, AlertDialogCancel, AlertDialogAction,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"

export default function Example() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">Delete</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}`,
  sheet: `import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"

export default function Example() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>Open sheet</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}`,
  popover: `import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"

export default function Example() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Open</Button>
      </PopoverTrigger>
      <PopoverContent>Place content here.</PopoverContent>
    </Popover>
  )
}`,
  "dropdown-menu": `import {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

export default function Example() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Open</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuItem>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}`,
  sonner: `import { Button } from "@/components/ui/button"
import { toast } from "sonner"

export default function Example() {
  return (
    <Button onClick={() => toast("Event created!")}>Show toast</Button>
  )
}`,
  slider: `import { Slider } from "@/components/ui/slider"

export default function Example() {
  return <Slider defaultValue={[50]} max={100} step={1} className="w-64" />
}`,
  progress: `import { Progress } from "@/components/ui/progress"

export default function Example() {
  return <Progress value={60} className="w-64" />
}`,
  breadcrumb: `import {
  Breadcrumb, BreadcrumbList, BreadcrumbItem,
  BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage,
} from "@/components/ui/breadcrumb"

export default function Example() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem><BreadcrumbLink href="/">Home</BreadcrumbLink></BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem><BreadcrumbLink href="/docs">Docs</BreadcrumbLink></BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem><BreadcrumbPage>Components</BreadcrumbPage></BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}`,
  "scroll-area": `import { ScrollArea } from "@/components/ui/scroll-area"

export default function Example() {
  return (
    <ScrollArea className="h-48 w-64 rounded-md border p-4">
      {Array.from({ length: 20 }).map((_, i) => (
        <p key={i} className="text-sm">Item {i + 1}</p>
      ))}
    </ScrollArea>
  )
}`,
  "hover-card": `import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card"

export default function Example() {
  return (
    <HoverCard>
      <HoverCardTrigger className="underline cursor-pointer">@particleui</HoverCardTrigger>
      <HoverCardContent>
        <p className="text-sm">The component library for ambitious UIs.</p>
      </HoverCardContent>
    </HoverCard>
  )
}`,
  "context-menu": `import {
  ContextMenu, ContextMenuTrigger, ContextMenuContent, ContextMenuItem,
} from "@/components/ui/context-menu"

export default function Example() {
  return (
    <ContextMenu>
      <ContextMenuTrigger className="border rounded p-8 text-sm">Right-click here</ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>Edit</ContextMenuItem>
        <ContextMenuItem>Delete</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}`,
  resizable: `import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable"

export default function Example() {
  return (
    <ResizablePanelGroup direction="horizontal" className="h-48 rounded-lg border">
      <ResizablePanel defaultSize={50}>
        <div className="flex h-full items-center justify-center p-6">One</div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={50}>
        <div className="flex h-full items-center justify-center p-6">Two</div>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}`,
  calendar: `import { Calendar } from "@/components/ui/calendar"
import { useState } from "react"

export default function Example() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  return <Calendar mode="single" selected={date} onSelect={setDate} />
}`,
  "date-picker": `import { DatePicker } from "@/components/ui/date-picker"

export default function Example() {
  return <DatePicker />
}`,
  combobox: `import { Combobox } from "@/components/ui/combobox"

export default function Example() {
  return <Combobox />
}`,
  command: `import {
  Command, CommandInput, CommandList, CommandEmpty,
  CommandGroup, CommandItem,
} from "@/components/ui/command"

export default function Example() {
  return (
    <Command className="rounded-lg border shadow-md w-64">
      <CommandInput placeholder="Type a command..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem>Calendar</CommandItem>
          <CommandItem>Search</CommandItem>
          <CommandItem>Settings</CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  )
}`,
  table: `import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"

export default function Example() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>Alice</TableCell>
          <TableCell>Active</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}`,
  pagination: `import {
  Pagination, PaginationContent, PaginationItem,
  PaginationPrevious, PaginationLink, PaginationNext,
} from "@/components/ui/pagination"

export default function Example() {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem><PaginationPrevious href="#" /></PaginationItem>
        <PaginationItem><PaginationLink href="#">1</PaginationLink></PaginationItem>
        <PaginationItem><PaginationLink href="#" isActive>2</PaginationLink></PaginationItem>
        <PaginationItem><PaginationNext href="#" /></PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}`,
  // Particle effects
  marquee: `import { Marquee } from "@/components/ui/marquee"

export default function Example() {
  return (
    <Marquee speed={30} pauseOnHover gap={24}>
      {["React", "TypeScript", "Tailwind", "OKLCH", "ParticleUI"].map((tag) => (
        <span key={tag} className="rounded-full border border-border bg-surface-1 px-4 py-1.5 text-sm text-text-2">
          {tag}
        </span>
      ))}
    </Marquee>
  )
}`,
  "glow-button": `import { GlowButton } from "@/components/ui/glow-button"

export default function Example() {
  return <GlowButton>Get started</GlowButton>
}`,
  "shimmer-button": `import { ShimmerButton } from "@/components/ui/shimmer-button"

export default function Example() {
  return <ShimmerButton>Deploy now</ShimmerButton>
}`,
  "glow-card": `import { GlowCard } from "@/components/ui/glow-card"

export default function Example() {
  return (
    <GlowCard className="p-6">
      <h3 className="font-semibold">Card title</h3>
      <p className="text-sm text-text-3 mt-1">Move your cursor over the card.</p>
    </GlowCard>
  )
}`,
  "glow-input": `import { GlowInput } from "@/components/ui/glow-input"

export default function Example() {
  return <GlowInput placeholder="Focus to glow..." />
}`,
  "tilt-card": `import { TiltCard } from "@/components/ui/tilt-card"

export default function Example() {
  return (
    <TiltCard className="w-64 rounded-xl border border-border bg-surface-1 p-6">
      <h3 className="font-semibold">Hover me</h3>
      <p className="text-sm text-text-3 mt-1">Tilt effect on mouse move.</p>
    </TiltCard>
  )
}`,
  typewriter: `import { Typewriter } from "@/components/ui/typewriter"

export default function Example() {
  return (
    <Typewriter
      phrases={["Build faster.", "Ship beautiful UIs.", "Powered by ParticleUI."]}
      className="text-2xl font-bold"
    />
  )
}`,
  counter: `import { Counter } from "@/components/ui/counter"

export default function Example() {
  return <Counter from={0} to={1000} duration={2} suffix="+" />
}`,
  "gradient-text": `import { GradientText } from "@/components/ui/gradient-text"

export default function Example() {
  return (
    <GradientText className="text-4xl font-bold">
      Beautiful gradients
    </GradientText>
  )
}`,
  meteors: `import { Meteors } from "@/components/ui/meteors"

export default function Example() {
  return (
    <div className="relative h-48 overflow-hidden rounded-xl border border-border">
      <Meteors number={20} />
    </div>
  )
}`,
  "confetti-button": `import { ConfettiButton } from "@/components/ui/confetti-button"

export default function Example() {
  return <ConfettiButton>Celebrate!</ConfettiButton>
}`,
  "floating-dock": `import { FloatingDock } from "@/components/ui/floating-dock"
import { House, BookOpen, CreditCard } from "@phosphor-icons/react"

export default function Example() {
  const items = [
    { title: "Home", icon: <House size={18} />, href: "/" },
    { title: "Docs", icon: <BookOpen size={18} />, href: "/docs" },
    { title: "Pricing", icon: <CreditCard size={18} />, href: "/pricing" },
  ]
  return <FloatingDock items={items} />
}`,
  beam: `import { Beam } from "@/components/ui/beam"

export default function Example() {
  return (
    <div className="relative h-32 overflow-hidden rounded-xl border border-border">
      <Beam />
    </div>
  )
}`,
  // Blocks
  testimonials: `import { TestimonialsSection } from "@/components/blocks/testimonials"

export default function Page() {
  return <TestimonialsSection />
}`,
  stats: `import { StatsSection } from "@/components/blocks/stats"

export default function Page() {
  return <StatsSection />
}`,
  faq: `import { FaqSection } from "@/components/blocks/faq"

export default function Page() {
  return <FaqSection />
}`,
  "logo-cloud": `import { LogoCloud } from "@/components/blocks/logo-cloud"

export default function Page() {
  return <LogoCloud />
}`,
  "how-it-works": `import { HowItWorks } from "@/components/blocks/how-it-works"

export default function Page() {
  return <HowItWorks />
}`,
  newsletter: `import { NewsletterSection } from "@/components/blocks/newsletter"

export default function Page() {
  return <NewsletterSection />
}`,
  spotlight: `import { Spotlight } from "@/components/ui/spotlight"

export default function Example() {
  return (
    <Spotlight className="w-64 p-6">
      <h3 className="font-semibold">Hover me</h3>
      <p className="text-sm text-muted-foreground mt-1">Cursor-tracked spotlight.</p>
    </Spotlight>
  )
}`,
  "border-beam": `import { BorderBeam } from "@/components/ui/border-beam"

export default function Example() {
  return (
    <BorderBeam className="w-64 p-6 bg-surface-1">
      <h3 className="font-semibold">Border Beam</h3>
      <p className="text-sm text-muted-foreground mt-1">Rotating gradient border.</p>
    </BorderBeam>
  )
}`,
  "word-rotate": `import { WordRotate } from "@/components/ui/word-rotate"

export default function Example() {
  return (
    <h1 className="text-4xl font-bold">
      <WordRotate
        staticPrefix="Build "
        words={["beautiful", "accessible", "fast"]}
      />
      {" UIs"}
    </h1>
  )
}`,
  "scroll-reveal": `import { ScrollReveal } from "@/components/ui/scroll-reveal"

export default function Example() {
  return (
    <ScrollReveal direction="up" delay={100}>
      <div className="rounded-xl border p-6">
        <h3 className="font-semibold">Appears on scroll</h3>
        <p className="text-sm text-muted-foreground mt-1">Fades in from below.</p>
      </div>
    </ScrollReveal>
  )
}`,
  "magnetic-button": `import { MagneticButton } from "@/components/ui/magnetic-button"

export default function Example() {
  return <MagneticButton strength={0.4}>Hover me</MagneticButton>
}`,
  ripple: `import { RippleButton } from "@/components/ui/ripple"

export default function Example() {
  return <RippleButton>Click me</RippleButton>
}`,
  "flip-card": `import { FlipCard } from "@/components/ui/flip-card"

export default function Example() {
  return (
    <FlipCard
      height={200}
      className="w-48"
      front={
        <div className="flex h-full items-center justify-center">
          <p className="font-semibold">Front</p>
        </div>
      }
      back={
        <div className="flex h-full items-center justify-center">
          <p className="font-semibold text-accent">Back</p>
        </div>
      }
    />
  )
}`,
  "shine-border": `import { ShineBorder } from "@/components/ui/shine-border"

export default function Example() {
  return (
    <ShineBorder className="w-64 p-6 flex items-center justify-center">
      <p className="font-semibold">Shine Border</p>
    </ShineBorder>
  )
}`,
  "blur-fade": `import { BlurFade } from "@/components/ui/blur-fade"

export default function Example() {
  return (
    <BlurFade delay={0}>
      <h1 className="text-4xl font-bold">Blur Fade In</h1>
    </BlurFade>
  )
}`,
  "morphing-text": `import { MorphingText } from "@/components/ui/morphing-text"

export default function Example() {
  return (
    <MorphingText
      words={["Beautiful", "Animated", "Powerful", "Yours"]}
      className="text-4xl font-bold"
    />
  )
}`,
  "retro-grid": `import { RetroGrid } from "@/components/ui/retro-grid"

export default function Example() {
  return (
    <div className="relative h-64 overflow-hidden rounded-xl bg-bg">
      <RetroGrid opacity={0.5} />
      <div className="absolute inset-0 flex items-center justify-center">
        <h2 className="text-2xl font-bold">Your content here</h2>
      </div>
    </div>
  )
}`,
  "text-shimmer": `import { TextShimmer } from "@/components/ui/text-shimmer"

export default function Example() {
  return (
    <TextShimmer
      text="Shimmering text effect"
      className="text-3xl font-bold"
      duration={2000}
    />
  )
}`,
  "sparkles-text": `import { SparklesText } from "@/components/ui/sparkles-text"

export default function Example() {
  return (
    <SparklesText className="text-3xl font-bold" count={8}>
      Magic Text ✨
    </SparklesText>
  )
}`,
  "animated-list": `import { AnimatedList } from "@/components/ui/animated-list"

export default function Example() {
  const items = ["First item", "Second item", "Third item"]
  return (
    <AnimatedList delay={150}>
      {items.map((item) => (
        <div key={item} className="rounded-lg border border-border bg-surface-1 px-4 py-3">
          {item}
        </div>
      ))}
    </AnimatedList>
  )
}`,
  "neon-border": `import { NeonBorder } from "@/components/ui/neon-border"

export default function Example() {
  return (
    <NeonBorder color="cyan" className="p-8 flex items-center justify-center">
      <p className="font-semibold">Neon glow card</p>
    </NeonBorder>
  )
}`,
  "text-reveal": `import { TextReveal } from "@/components/ui/text-reveal"

export default function Example() {
  return (
    <TextReveal
      text="Revealed by a sliding mask"
      className="text-3xl font-bold"
    />
  )
}`,
  "glitch-text": `import { GlitchText } from "@/components/ui/glitch-text"

export default function Example() {
  return (
    <GlitchText text="GLITCH" className="text-5xl font-black tracking-widest" />
  )
}`,
  "letter-swap": `import { LetterSwap } from "@/components/ui/letter-swap"

export default function Example() {
  return (
    <LetterSwap text="Hover to scramble" className="text-2xl font-bold cursor-pointer" />
  )
}`,
  "scroll-progress": `import { ScrollProgress } from "@/components/ui/scroll-progress"

// Add to your root layout — renders a fixed progress bar at the top of the page
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ScrollProgress color="var(--color-accent)" />
      {children}
    </>
  )
}`,
  "wave-text": `import { WaveText } from "@/components/ui/wave-text"

export default function Example() {
  return (
    <WaveText text="Wave animation!" className="text-4xl font-bold" />
  )
}`,
  "liquid-button": `import { LiquidButton } from "@/components/ui/liquid-button"

export default function Example() {
  return (
    <div className="flex gap-4">
      <LiquidButton>Click me</LiquidButton>
      <LiquidButton variant="outline">Outline</LiquidButton>
    </div>
  )
}`,
  "number-flow": `import { NumberFlow } from "@/components/ui/number-flow"

export default function Example() {
  return (
    <div className="flex gap-8">
      <NumberFlow value={1234} prefix="$" className="text-4xl font-bold" />
      <NumberFlow value={99} suffix="%" className="text-4xl font-bold" />
    </div>
  )
}`,
  "badge-shine": `import { BadgeShine } from "@/components/ui/badge-shine"

export default function Example() {
  return (
    <div className="flex gap-3">
      <BadgeShine variant="default">Default</BadgeShine>
      <BadgeShine variant="pro">Pro</BadgeShine>
      <BadgeShine variant="new">New</BadgeShine>
    </div>
  )
}`,
  "animate-in": `import { AnimateIn } from "@/components/ui/animate-in"

export default function Example() {
  return (
    <AnimateIn variant="slide-up" delay={200}>
      <div className="rounded-xl border border-border bg-surface-1 p-8">
        <h2 className="text-2xl font-bold">Animated entrance</h2>
        <p className="text-text-2 mt-2">Slides up and fades in when it enters the viewport.</p>
      </div>
    </AnimateIn>
  )
}`,
  "hero-centered": `import { HeroCentered } from "@/components/blocks/hero-centered"

export default function Page() {
  return <HeroCentered />
}`,
  "hero-split": `import { HeroSplit } from "@/components/blocks/hero-split"

export default function Page() {
  return <HeroSplit />
}`,
  pricing: `import { PricingSection } from "@/components/blocks/pricing"

export default function Page() {
  return <PricingSection />
}`,
  "feature-grid": `import { FeatureGrid } from "@/components/blocks/feature-grid"

export default function Page() {
  return <FeatureGrid />
}`,
  "feature-alternating": `import { FeatureAlternating } from "@/components/blocks/feature-alternating"

export default function Page() {
  return <FeatureAlternating />
}`,
  "cta-section": `import { CtaSection } from "@/components/blocks/cta-section"

export default function Page() {
  return <CtaSection />
}`,
  footer: `import { Footer } from "@/components/blocks/footer"

export default function Page() {
  return <Footer />
}`,
  "auth-sign-in": `import { AuthSignIn } from "@/components/blocks/auth-sign-in"

export default function Page() {
  return <AuthSignIn />
}`,
  "auth-sign-up": `import { AuthSignUp } from "@/components/blocks/auth-sign-up"

export default function Page() {
  return <AuthSignUp />
}`,
  "auth-forgot-password": `import { AuthForgotPassword } from "@/components/blocks/auth-forgot-password"

export default function Page() {
  return <AuthForgotPassword />
}`,
  "auth-verify-email": `import { AuthVerifyEmail } from "@/components/blocks/auth-verify-email"

export default function Page() {
  return <AuthVerifyEmail />
}`,
  "dashboard-analytics": `import { DashboardAnalytics } from "@/components/blocks/dashboard-analytics"

export default function Page() {
  return <DashboardAnalytics />
}`,
  "settings-page": `import { SettingsPage } from "@/components/blocks/settings-page"

export default function Page() {
  return <SettingsPage />
}`,
  "ai-chat": `import { AIChat } from "@/components/blocks/ai-chat"

export default function Page() {
  return <AIChat />
}`,
  // Pro components
  globe: `import { Globe } from "@/components/ui/globe"

export default function Example() {
  return (
    <div className="flex items-center justify-center p-8">
      <Globe size={320} />
    </div>
  )
}`,
  "animated-beam": `"use client"
import { useRef } from "react"
import { AnimatedBeam } from "@/components/ui/animated-beam"

export default function Example() {
  const containerRef = useRef<HTMLDivElement>(null)
  const fromRef = useRef<HTMLDivElement>(null)
  const toRef = useRef<HTMLDivElement>(null)

  return (
    <div ref={containerRef} className="relative flex items-center justify-between px-12 py-8">
      <div ref={fromRef} className="h-12 w-12 rounded-full border bg-card flex items-center justify-center">
        🤖
      </div>
      <div ref={toRef} className="h-12 w-12 rounded-full border bg-card flex items-center justify-center">
        💡
      </div>
      <AnimatedBeam containerRef={containerRef} fromRef={fromRef} toRef={toRef} />
    </div>
  )
}`,
  "cursor-trail": `"use client"
import { CursorTrail } from "@/components/ui/cursor-trail"

// Mount once at root layout or a top-level client component.
// The canvas is position:fixed z-[9999] so it overlays everything.
export default function Layout({ children }) {
  return (
    <>
      <CursorTrail color="oklch(78% 0.17 200)" size={6} length={24} />
      {children}
    </>
  )
}`,
  "aurora-background": `import { AuroraBackground } from "@/components/ui/aurora-background"

export default function Example() {
  return (
    <AuroraBackground className="h-screen w-full bg-background">
      <div className="relative z-10 flex h-full items-center justify-center">
        <h1 className="text-4xl font-bold">Your content here</h1>
      </div>
    </AuroraBackground>
  )
}`,
  "orbit-animation": `import { OrbitAnimation } from "@/components/ui/orbit-animation"

export default function Example() {
  return (
    <OrbitAnimation
      size={300}
      center={<div className="h-14 w-14 rounded-full border bg-card flex items-center justify-center text-2xl">⚛️</div>}
      items={[
        { content: <div className="h-9 w-9 rounded-full border bg-card flex items-center justify-center">🎨</div>, radius: 70, duration: 10 },
        { content: <div className="h-9 w-9 rounded-full border bg-card flex items-center justify-center">⚡</div>, radius: 110, duration: 16 },
        { content: <div className="h-9 w-9 rounded-full border bg-card flex items-center justify-center">🌊</div>, radius: 70, duration: 10, offset: 180 },
      ]}
    />
  )
}`,
  // Core components with complex usage
  "electric-badge": `import { ElectricBadge } from "@/components/ui/electric-badge"

export default function Example() {
  return (
    <div className="flex gap-2">
      <ElectricBadge>New</ElectricBadge>
      <ElectricBadge variant="outline">Beta</ElectricBadge>
      <ElectricBadge pulse>Live</ElectricBadge>
    </div>
  )
}`,
  "gradient-card": `import { GradientCard } from "@/components/ui/gradient-card"

export default function Example() {
  return (
    <GradientCard className="max-w-sm p-6">
      <h3 className="text-lg font-semibold mb-2">Card title</h3>
      <p className="text-sm text-muted-foreground">Card content goes here.</p>
    </GradientCard>
  )
}`,
  kbd: `import { Kbd } from "@/components/ui/kbd"

export default function Example() {
  return (
    <div className="flex items-center gap-1 text-sm">
      Press <Kbd>⌘</Kbd><Kbd>K</Kbd> to open command palette
    </div>
  )
}`,
  "shimmer-text": `import { ShimmerText } from "@/components/ui/shimmer-text"

export default function Example() {
  return (
    <ShimmerText className="text-3xl font-bold">
      Shimmer effect
    </ShimmerText>
  )
}`,
  "noise-texture": `import { NoiseTexture } from "@/components/ui/noise-texture"

export default function Example() {
  return (
    <div className="relative h-48 w-full rounded-xl bg-neutral-900 overflow-hidden">
      <NoiseTexture opacity={0.08} />
      <div className="relative z-10 flex h-full items-center justify-center">
        <p className="text-white font-semibold">Content over noise</p>
      </div>
    </div>
  )
}`,
  "data-table": `"use client"
import { DataTable } from "@/components/ui/data-table"
import type { ColumnDef } from "@tanstack/react-table"

type User = { id: string; name: string; email: string }
const columns: ColumnDef<User>[] = [
  { accessorKey: "name", header: "Name" },
  { accessorKey: "email", header: "Email" },
]
const data: User[] = [
  { id: "1", name: "Alice", email: "alice@example.com" },
  { id: "2", name: "Bob", email: "bob@example.com" },
]

export default function Example() {
  return <DataTable columns={columns} data={data} />
}`,
  form: `"use client"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const schema = z.object({ email: z.string().email() })

export default function Example() {
  const form = useForm({ resolver: zodResolver(schema), defaultValues: { email: "" } })
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(console.log)} className="space-y-4 max-w-sm">
        <FormField control={form.control} name="email" render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl><Input placeholder="you@example.com" {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}`,
  "navigation-menu": `import {
  NavigationMenu, NavigationMenuContent, NavigationMenuItem,
  NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"

export default function Example() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Getting Started</NavigationMenuTrigger>
          <NavigationMenuContent>
            <NavigationMenuLink href="/docs">Documentation</NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}`,
  // Blocks
  "bento-grid": `import { BentoGrid } from "@/components/blocks/bento-grid"

export default function Page() {
  return <BentoGrid />
}`,
  "spotlight-hero": `import { SpotlightHero } from "@/components/blocks/spotlight-hero"

export default function Page() {
  return <SpotlightHero />
}`,
  "particle-hero": `import { ParticleHero } from "@/components/blocks/particle-hero"

export default function Page() {
  return (
    <ParticleHero
      headline="Build something amazing"
      subtext="Animated particle canvas hero. Pro component."
      cta={[
        { label: "Get started", href: "/docs", variant: "electric" },
        { label: "View pricing", href: "/pricing", variant: "outline" },
      ]}
      particleCount={80}
      connectLines
    />
  )
}`,
  // Templates
  landing: `import { LandingTemplate } from "@/components/templates/landing"

export default function Page() {
  return <LandingTemplate />
}`,
  auth: `import { AuthTemplate } from "@/components/templates/auth"

export default function Page() {
  return <AuthTemplate />
}`,
  blog: `import { BlogTemplate } from "@/components/templates/blog"

export default function Page() {
  return <BlogTemplate />
}`,
  "docs-site": `import { DocsSiteTemplate } from "@/components/templates/docs-site"

export default function Page() {
  return <DocsSiteTemplate />
}`,
  "pricing-page": `import { PricingPageTemplate } from "@/components/templates/pricing-page"

export default function Page() {
  return <PricingPageTemplate />
}`,
  "saas-dashboard": `import { SaasDashboardTemplate } from "@/components/templates/saas-dashboard"

export default function Page() {
  return <SaasDashboardTemplate />
}`,
}

function generateUsage(item: RegistryItem): string {
  if (USAGE_EXAMPLES[item.name]) return USAGE_EXAMPLES[item.name]
  const mainFile = item.files.find((f) => f.type !== "registry:file")
  if (!mainFile) return ""
  const importPath = mainFile.path.replace(".tsx", "").replace("components/", "@/components/")
  const componentName = item.title.replace(/\s+/g, "")
  return `import { ${componentName} } from "${importPath}"

export default function Example() {
  return <${componentName} />
}`
}

function generateAiPrompt(item: RegistryItem, usageCode: string): string {
  const deps = item.dependencies?.length ? `\nDependencies: ${item.dependencies.join(", ")}` : ""
  return `I'm using the ${item.title} component from ParticleUI in my Next.js project.

${item.description}${deps}

Here's how to use it:

\`\`\`tsx
${usageCode}
\`\`\`

Help me integrate this into my project.`
}
