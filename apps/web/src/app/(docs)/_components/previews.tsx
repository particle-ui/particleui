"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, CommandShortcut } from "@/components/ui/command"
import { Settings, User, CreditCard, LogOut, FileText, Terminal, CalendarIcon } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Slider } from "@/components/ui/slider"
import { Progress } from "@/components/ui/progress"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { ScrollArea } from "@/components/ui/scroll-area"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuLabel, ContextMenuSeparator, ContextMenuShortcut, ContextMenuTrigger } from "@/components/ui/context-menu"
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable"
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"
import { Calendar } from "@/components/ui/calendar"
import { DatePicker } from "@/components/ui/date-picker"
import { Combobox } from "@/components/ui/combobox"
import { TiltCard } from "@/components/ui/tilt-card"
import { Typewriter } from "@/components/ui/typewriter"
import { Counter } from "@/components/ui/counter"
import { GradientText } from "@/components/ui/gradient-text"
import { Meteors } from "@/components/ui/meteors"
import { ConfettiButton } from "@/components/ui/confetti-button"
import { ShimmerButton } from "@/components/ui/shimmer-button"
import { GlowCard } from "@/components/ui/glow-card"
import { FloatingDock } from "@/components/ui/floating-dock"
import { Marquee } from "@/components/ui/marquee"
import { Beam } from "@/components/ui/beam"
import { GlowInput } from "@/components/ui/glow-input"
import { Home, Search, Bell, Star, Heart, Music, Video, Camera } from "lucide-react"
import { HeroCentered } from "@/components/blocks/hero-centered"
import { HeroSplit } from "@/components/blocks/hero-split"
import { PricingSection } from "@/components/blocks/pricing"
import { FeatureGrid } from "@/components/blocks/feature-grid"
import { FeatureAlternating } from "@/components/blocks/feature-alternating"
import { CtaSection } from "@/components/blocks/cta-section"
import { Footer } from "@/components/blocks/footer"
import { AuthSignIn } from "@/components/blocks/auth-sign-in"
import { AuthSignUp } from "@/components/blocks/auth-sign-up"
import { DashboardAnalytics } from "@/components/blocks/dashboard-analytics"
import { SettingsPage } from "@/components/blocks/settings-page"
import { AIChat } from "@/components/blocks/ai-chat"
import { TestimonialsSection } from "@/components/blocks/testimonials"
import { StatsSection } from "@/components/blocks/stats"
import { FaqSection } from "@/components/blocks/faq"
import { LogoCloud } from "@/components/blocks/logo-cloud"
import { HowItWorks } from "@/components/blocks/how-it-works"
import { NewsletterSection } from "@/components/blocks/newsletter"

/* ── Glow Button Preview ─────────────────────────────────────────────────── */
export function GlowButtonPreview() {
  return (
    <div className="flex flex-wrap gap-3 justify-center">
      {[
        {
          label: "Default",
          style: {
            background: "#fff",
            color: "#000",
            border: "none",
          },
          hover: { boxShadow: "0 0 20px rgba(255,255,255,0.3)" },
        },
        {
          label: "Electric",
          style: {
            background: "rgba(255,255,255,0.04)",
            color: "oklch(96% 0.01 80)",
            border: "1px solid rgba(255,255,255,0.12)",
            boxShadow: "0 0 16px rgba(255,255,255,0.08)",
          },
        },
        {
          label: "Ghost",
          style: {
            background: "transparent",
            color: "#666",
            border: "1px solid rgba(255,255,255,0.1)",
          },
        },
      ].map(({ label, style }) => (
        <button
          key={label}
          className="rounded-md px-5 py-2.5 text-sm font-medium transition-all duration-200 hover:scale-105"
          style={style as React.CSSProperties}
        >
          {label}
        </button>
      ))}
    </div>
  )
}

/* ── Electric Badge Preview ──────────────────────────────────────────────── */
export function ElectricBadgePreview() {
  return (
    <div className="flex flex-wrap gap-3 justify-center">
      {[
        {
          label: "Live",
          color: "oklch(96% 0.01 80)",
          bg: "rgba(255,255,255,0.04)",
          border: "rgba(255,255,255,0.12)",
        },
        {
          label: "Deployed",
          color: "#4ade80",
          bg: "rgba(74,222,128,0.08)",
          border: "rgba(74,222,128,0.3)",
        },
        {
          label: "Incident",
          color: "#f87171",
          bg: "rgba(248,113,113,0.08)",
          border: "rgba(248,113,113,0.3)",
        },
      ].map(({ label, color, bg, border }) => (
        <span
          key={label}
          className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium"
          style={{
            background: bg,
            border: `1px solid ${border}`,
            color,
          }}
        >
          <span className="relative flex h-1.5 w-1.5">
            <span
              className="animate-ping absolute inset-0 rounded-full opacity-60"
              style={{ background: color }}
            />
            <span
              className="relative h-1.5 w-1.5 rounded-full"
              style={{ background: color }}
            />
          </span>
          {label}
        </span>
      ))}
    </div>
  )
}

/* ── Gradient Card Preview ───────────────────────────────────────────────── */
export function GradientCardPreview() {
  return (
    <div className="space-y-3 w-full max-w-[260px]">
      {[
        { from: "#222", mid: "rgba(255,255,255,0.06)", to: "#0a0a0a" },
        { from: "#1a1a1a", mid: "rgba(124,58,237,0.15)", to: "#080808" },
      ].map(({ from, mid, to }, i) => (
        <div
          key={i}
          className="rounded-xl p-px"
          style={{ background: `linear-gradient(135deg, ${from}, ${mid}, ${to})` }}
        >
          <div className="rounded-[11px] bg-[#0d0d0d] p-4">
            <div className="flex items-center gap-2.5 mb-3">
              <div
                className="h-7 w-7 rounded-full"
                style={{ background: `linear-gradient(135deg, ${mid}, ${from})` }}
              />
              <div className="h-2 w-24 rounded bg-white/10" />
            </div>
            <div className="space-y-1.5">
              <div className="h-1.5 w-full rounded bg-white/[0.06]" />
              <div className="h-1.5 w-3/4 rounded bg-white/[0.06]" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

/* ── Shimmer Text Preview ────────────────────────────────────────────────── */
export function ShimmerTextPreview() {
  return (
    <div className="text-center space-y-3">
      {["Ship faster", "Look stunning", "Build different"].map((text) => (
        <p
          key={text}
          className="text-2xl font-bold relative inline-block overflow-hidden text-white"
        >
          {text}
          <span
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.7) 50%, transparent 60%)",
              backgroundSize: "300% 100%",
              animation: "shimmer 2.5s linear infinite",
            }}
          />
        </p>
      ))}
      <style>{`
        @keyframes shimmer {
          0%   { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </div>
  )
}

/* ── Magnetic Button Preview ─────────────────────────────────────────────── */
export function MagneticButtonPreview() {
  const ref = useRef<HTMLButtonElement>(null)
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const [hovered, setHovered] = useState(false)

  return (
    <div className="flex flex-col items-center gap-4">
      <button
        ref={ref}
        onMouseMove={(e) => {
          const r = ref.current!.getBoundingClientRect()
          setOffset({
            x: (e.clientX - r.left - r.width / 2) * 0.35,
            y: (e.clientY - r.top - r.height / 2) * 0.35,
          })
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => {
          setOffset({ x: 0, y: 0 })
          setHovered(false)
        }}
        className="rounded-full px-8 py-3 text-sm font-medium transition-all duration-150"
        style={{
          transform: `translate(${offset.x}px, ${offset.y}px)`,
          border: `1px solid ${hovered ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.1)"}`,
          background: hovered ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.04)",
          color: hovered ? "oklch(96% 0.01 80)" : "#888",
          boxShadow: hovered ? "0 0 30px rgba(255,255,255,0.08)" : "none",
        }}
      >
        Hover me
      </button>
      <p className="text-xs text-[#333]">Move cursor over the button</p>
    </div>
  )
}

/* ── Aurora Background Preview ───────────────────────────────────────────── */
export function AuroraBackgroundPreview() {
  const blobs = [
    { color: "#f5f0e8", top: "10%", left: "20%", dur: "8s" },
    { color: "#7c3aed", top: "40%", left: "60%", dur: "11s" },
    { color: "#0ea5e9", top: "70%", left: "10%", dur: "9s" },
  ]
  return (
    <div className="relative w-full h-40 rounded-xl overflow-hidden bg-[#050505]">
      {blobs.map((b, i) => (
        <div
          key={i}
          className="absolute rounded-full opacity-25"
          style={{
            background: b.color,
            width: "55%",
            height: "55%",
            top: b.top,
            left: b.left,
            filter: "blur(50px)",
            animation: `aurora-${i % 3} ${b.dur} ease-in-out infinite`,
          }}
        />
      ))}
      <style>{`
        @keyframes aurora-0 { 0%,100% { transform:translate(0,0) scale(1); } 50% { transform:translate(10%,-15%) scale(1.1); } }
        @keyframes aurora-1 { 0%,100% { transform:translate(0,0) scale(1.05); } 50% { transform:translate(-12%,10%) scale(0.95); } }
        @keyframes aurora-2 { 0%,100% { transform:translate(0,0) scale(0.9); } 50% { transform:translate(8%,12%) scale(1.1); } }
      `}</style>
      <div className="absolute inset-0 flex items-center justify-center text-sm font-medium text-white/60">
        Aurora Background
      </div>
    </div>
  )
}

/* ── Kbd Preview ─────────────────────────────────────────────────────────── */
export function KbdPreview() {
  const combos = [["⌘", "K"], ["⌃", "⇧", "P"], ["⌘", "⌥", "T"]]
  return (
    <div className="space-y-3 text-center">
      {combos.map((keys, i) => (
        <div key={i} className="inline-flex items-center gap-1">
          {keys.map((k) => (
            <kbd
              key={k}
              className="inline-flex items-center justify-center rounded border border-white/[0.1] bg-white/[0.06] px-2 py-1 font-mono text-xs text-[#888] shadow-[inset_0_-1px_0_rgba(255,255,255,0.08)]"
            >
              {k}
            </kbd>
          ))}
        </div>
      ))}
    </div>
  )
}

/* ── Orbit Animation Preview ─────────────────────────────────────────────── */
export function OrbitAnimationPreview() {
  const items = [
    { emoji: "⚛️", r: 60, dur: 8 },
    { emoji: "🎨", r: 90, dur: 13 },
    { emoji: "⚡", r: 60, dur: 8, off: 180 },
    { emoji: "🌊", r: 90, dur: 13, off: 180 },
  ]
  return (
    <div className="relative flex items-center justify-center" style={{ width: 220, height: 220 }}>
      {[60, 90].map((r) => (
        <div
          key={r}
          className="absolute rounded-full border border-white/[0.06]"
          style={{ width: r * 2, height: r * 2 }}
        />
      ))}
      <div className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/[0.05] border border-white/[0.1] text-lg">
        ✦
      </div>
      {items.map(({ emoji, r, dur, off = 0 }, i) => (
        <div
          key={i}
          className="absolute inset-0 flex items-center justify-center"
          style={{
            animation: `orbit ${dur}s linear infinite`,
            animationDelay: `${-(off / 360) * dur}s`,
          }}
        >
          <div
            style={{ transform: `translateY(-${r}px)` }}
            className="flex h-7 w-7 items-center justify-center rounded-full bg-[#111] border border-white/[0.08] text-sm"
          >
            {emoji}
          </div>
        </div>
      ))}
      <style>{`
        @keyframes orbit { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  )
}

/* ── Noise Texture Preview ───────────────────────────────────────────────── */
export function NoiseTexturePreview() {
  return (
    <div className="flex gap-4">
      {[0.03, 0.06, 0.1].map((op) => (
        <div
          key={op}
          className="relative h-24 w-24 rounded-xl border border-white/[0.08] bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] overflow-hidden"
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
              opacity: op,
            }}
          />
          <div className="absolute inset-0 flex items-end p-2">
            <span className="text-[10px] text-[#444]">opacity {op}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

/* ── Spotlight Hero Preview ──────────────────────────────────────────────── */
export function SpotlightHeroPreview() {
  const ref = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState({ x: "50%", y: "50%" })

  return (
    <div
      ref={ref}
      onMouseMove={(e) => {
        const r = ref.current!.getBoundingClientRect()
        setPos({
          x: `${((e.clientX - r.left) / r.width) * 100}%`,
          y: `${((e.clientY - r.top) / r.height) * 100}%`,
        })
      }}
      className="relative w-full h-40 rounded-xl overflow-hidden bg-[#030303] flex items-center justify-center cursor-crosshair"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.12) 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
          maskImage: `radial-gradient(ellipse 60% 60% at ${pos.x} ${pos.y}, black 30%, transparent 80%)`,
          WebkitMaskImage: `radial-gradient(ellipse 60% 60% at ${pos.x} ${pos.y}, black 30%, transparent 80%)`,
        }}
      />
      <div
        className="pointer-events-none absolute h-32 w-32 rounded-full opacity-15 blur-[40px] transition-all duration-150"
        style={{
          background: "#f5f0e8",
          left: `calc(${pos.x} - 4rem)`,
          top: `calc(${pos.y} - 4rem)`,
        }}
      />
      <p className="relative text-sm font-medium text-[#555]">Move cursor here</p>
    </div>
  )
}

/* ── Bento Grid Preview ──────────────────────────────────────────────────── */
export function BentoGridPreview() {
  const ref = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState({ x: 0, y: 0, opacity: 0 })

  return (
    <div className="grid grid-cols-2 gap-2 w-full max-w-[300px]">
      {[
        { title: "Fast", desc: "Zero runtime deps", span: false },
        { title: "Typed", desc: "Full TypeScript", span: false },
        { title: "Open source", desc: "You own the code. MIT licensed.", span: true },
      ].map(({ title, desc, span }) => (
        <div
          key={title}
          onMouseMove={(e) => {
            const r = (e.currentTarget as HTMLElement).getBoundingClientRect()
            setPos({ x: e.clientX - r.left, y: e.clientY - r.top, opacity: 1 })
          }}
          onMouseLeave={() => setPos((p) => ({ ...p, opacity: 0 }))}
          className={`relative overflow-hidden rounded-xl border border-white/[0.07] bg-[#0d0d0d] p-4 ${span ? "col-span-2" : ""}`}
        >
          <div
            className="pointer-events-none absolute inset-0 transition-opacity duration-300"
            style={{
              opacity: pos.opacity,
              background: `radial-gradient(200px circle at ${pos.x}px ${pos.y}px, rgba(255,255,255,0.04), transparent 60%)`,
            }}
          />
          <p className="text-xs font-semibold mb-1">{title}</p>
          <p className="text-[10px] text-[#444]">{desc}</p>
        </div>
      ))}
    </div>
  )
}

/* ── Core Component Previews ─────────────────────────────────────────────── */

export function ButtonPreview() {
  return (
    <div className="flex flex-wrap gap-3 justify-center items-center">
      <Button>Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="link">Link</Button>
      <Button size="sm">Small</Button>
      <Button size="lg">Large</Button>
      <Button disabled>Disabled</Button>
    </div>
  )
}

export function InputPreview() {
  return (
    <div className="flex flex-col gap-4 w-full max-w-sm mx-auto">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" placeholder="you@example.com" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="search">Search</Label>
        <Input id="search" placeholder="Search components..." />
      </div>
      <Input placeholder="Disabled input" disabled />
    </div>
  )
}

export function TextareaPreview() {
  return (
    <div className="flex flex-col gap-4 w-full max-w-sm mx-auto">
      <div className="space-y-2">
        <Label htmlFor="message">Message</Label>
        <Textarea id="message" placeholder="Write your message here..." rows={4} />
      </div>
    </div>
  )
}

export function LabelPreview() {
  return (
    <div className="flex flex-col gap-4 w-full max-w-sm mx-auto">
      <div className="flex items-center gap-3">
        <Checkbox id="terms" />
        <Label htmlFor="terms">Accept terms and conditions</Label>
      </div>
      <div className="flex items-center gap-3">
        <Switch id="notifs" />
        <Label htmlFor="notifs">Enable notifications</Label>
      </div>
    </div>
  )
}

export function BadgePreview() {
  return (
    <div className="flex flex-wrap gap-3 justify-center items-center">
      <Badge>Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="destructive">Error</Badge>
      <Badge variant="warning">Warning</Badge>
    </div>
  )
}

export function CardPreview() {
  return (
    <Card className="w-full max-w-sm mx-auto">
      <CardHeader>
        <CardTitle>ParticleUI Card</CardTitle>
        <CardDescription>A composable card component with header, content, and footer.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-[var(--color-text-3)]">
          Cards are the fundamental layout unit for displaying grouped content.
        </p>
      </CardContent>
      <CardFooter className="gap-2">
        <Button size="sm">Action</Button>
        <Button size="sm" variant="ghost">Cancel</Button>
      </CardFooter>
    </Card>
  )
}

export function SeparatorPreview() {
  return (
    <div className="w-full max-w-sm mx-auto space-y-4">
      <div className="space-y-1">
        <p className="text-sm font-medium text-[var(--color-text-1)]">ParticleUI</p>
        <p className="text-xs text-[var(--color-text-3)]">Component Library</p>
      </div>
      <Separator />
      <div className="flex items-center gap-4 text-sm text-[var(--color-text-3)]">
        <span>Components</span>
        <Separator orientation="vertical" className="h-4" />
        <span>Docs</span>
        <Separator orientation="vertical" className="h-4" />
        <span>Pricing</span>
      </div>
    </div>
  )
}

export function SkeletonPreview() {
  return (
    <div className="flex flex-col gap-4 w-full max-w-sm mx-auto">
      <div className="flex items-center gap-3">
        <Skeleton className="h-10 w-10 rounded-full" />
        <div className="space-y-2 flex-1">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
        </div>
      </div>
      <Skeleton className="h-32 w-full rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-5/6" />
        <Skeleton className="h-3 w-4/6" />
      </div>
    </div>
  )
}

export function AvatarPreview() {
  return (
    <div className="flex flex-wrap gap-4 justify-center items-end">
      <Avatar className="h-8 w-8">
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>SC</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>SC</AvatarFallback>
      </Avatar>
      <Avatar className="h-12 w-12" ring>
        <AvatarFallback>PU</AvatarFallback>
      </Avatar>
      <Avatar className="h-14 w-14">
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
    </div>
  )
}

export function TooltipPreview() {
  return (
    <TooltipProvider>
      <div className="flex flex-wrap gap-4 justify-center">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline">Hover me</Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>This is a tooltip</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="secondary">Top tooltip</Button>
          </TooltipTrigger>
          <TooltipContent side="top">
            <p>Positioned above</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost">Right tooltip</Button>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>Positioned right</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  )
}

export function SwitchPreview() {
  const [vals, setVals] = useState({ notifs: true, mktg: false, updates: true })
  return (
    <div className="flex flex-col gap-4 w-full max-w-xs mx-auto">
      {(["notifs", "mktg", "updates"] as const).map((key) => (
        <div key={key} className="flex items-center justify-between">
          <Label htmlFor={key} className="cursor-pointer">
            {key === "notifs" ? "Notifications" : key === "mktg" ? "Marketing emails" : "Product updates"}
          </Label>
          <Switch
            id={key}
            checked={vals[key]}
            onCheckedChange={(v) => setVals((p) => ({ ...p, [key]: v }))}
          />
        </div>
      ))}
    </div>
  )
}

export function CheckboxPreview() {
  const [checked, setChecked] = useState<Record<string, boolean>>({
    components: true, docs: false, changelog: true,
  })
  return (
    <div className="flex flex-col gap-3 w-full max-w-xs mx-auto">
      {Object.entries(checked).map(([key, val]) => (
        <div key={key} className="flex items-center gap-3">
          <Checkbox
            id={key}
            checked={val}
            onCheckedChange={(v) => setChecked((p) => ({ ...p, [key]: !!v }))}
          />
          <Label htmlFor={key} className="cursor-pointer capitalize">{key}</Label>
        </div>
      ))}
    </div>
  )
}

export function RadioGroupPreview() {
  const [val, setVal] = useState("balanced")
  return (
    <div className="w-full max-w-xs mx-auto space-y-3">
      <Label>Select a plan</Label>
      <RadioGroup value={val} onValueChange={setVal} className="gap-3">
        {[
          { value: "starter", label: "Starter", desc: "Perfect for side projects" },
          { value: "balanced", label: "Pro", desc: "For growing teams" },
          { value: "enterprise", label: "Enterprise", desc: "Custom pricing" },
        ].map((opt) => (
          <div key={opt.value} className="flex items-center gap-3">
            <RadioGroupItem value={opt.value} id={opt.value} />
            <div>
              <Label htmlFor={opt.value} className="cursor-pointer">{opt.label}</Label>
              <p className="text-[11px] text-[var(--color-text-4)]">{opt.desc}</p>
            </div>
          </div>
        ))}
      </RadioGroup>
    </div>
  )
}

export function SelectPreview() {
  return (
    <div className="flex flex-col gap-4 w-full max-w-xs mx-auto">
      <div className="space-y-2">
        <Label>Framework</Label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select a framework" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="next">Next.js</SelectItem>
            <SelectItem value="remix">Remix</SelectItem>
            <SelectItem value="astro">Astro</SelectItem>
            <SelectItem value="vite">Vite</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label>Theme</Label>
        <Select defaultValue="dark">
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="dark">Dark</SelectItem>
            <SelectItem value="light">Light</SelectItem>
            <SelectItem value="system">System</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

export function SonnerPreview() {
  return (
    <div className="flex flex-wrap gap-3 justify-center">
      <p className="text-xs text-[var(--color-text-4)] w-full text-center mb-2">
        Add <code className="text-[var(--color-text-3)]">&lt;Toaster /&gt;</code> to your root layout, then use{" "}
        <code className="text-[var(--color-text-3)]">toast()</code> from sonner.
      </p>
      <Button variant="outline" size="sm" onClick={() => {
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        const { toast } = require("sonner")
        toast("Component installed", { description: "Button has been added to your project." })
      }}>
        Default toast
      </Button>
    </div>
  )
}

/* ── Phase 2: Composite Component Previews ───────────────────────────────── */

export function DialogPreview() {
  return (
    <div className="flex flex-wrap gap-3 justify-center">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Open dialog</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3 py-2">
            <div className="space-y-1.5">
              <Label htmlFor="dialog-name">Display name</Label>
              <Input id="dialog-name" defaultValue="Alex Rivera" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="dialog-username">Username</Label>
              <Input id="dialog-username" defaultValue="@alexrivera" />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export function AlertDialogPreview() {
  return (
    <div className="flex flex-wrap gap-3 justify-center">
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="destructive">Delete account</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Delete account</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

export function SheetPreview() {
  return (
    <div className="flex flex-wrap gap-3 justify-center">
      {(["left", "right", "top", "bottom"] as const).map((side) => (
        <Sheet key={side}>
          <SheetTrigger asChild>
            <Button variant="outline" size="sm" className="capitalize">{side}</Button>
          </SheetTrigger>
          <SheetContent side={side}>
            <SheetHeader>
              <SheetTitle>Edit settings</SheetTitle>
              <SheetDescription>Make changes to your settings here.</SheetDescription>
            </SheetHeader>
            <div className="p-6 space-y-4">
              <div className="space-y-1.5">
                <Label>Name</Label>
                <Input placeholder="Your name" />
              </div>
              <div className="space-y-1.5">
                <Label>Email</Label>
                <Input type="email" placeholder="you@example.com" />
              </div>
            </div>
          </SheetContent>
        </Sheet>
      ))}
    </div>
  )
}

export function DropdownMenuPreview() {
  return (
    <div className="flex flex-wrap gap-3 justify-center">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            <User className="mr-2 h-4 w-4" />
            My account
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-48">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <User className="mr-2 h-4 w-4" />
            Profile
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <CreditCard className="mr-2 h-4 w-4" />
            Billing
            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings className="mr-2 h-4 w-4" />
            Settings
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-red-400 focus:text-red-400 focus:bg-red-500/10">
            <LogOut className="mr-2 h-4 w-4" />
            Log out
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export function PopoverPreview() {
  return (
    <div className="flex flex-wrap gap-3 justify-center">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Open popover</Button>
        </PopoverTrigger>
        <PopoverContent>
          <div className="space-y-3">
            <h4 className="font-semibold text-sm text-[var(--color-text-1)]">Dimensions</h4>
            <p className="text-xs text-[var(--color-text-3)]">Set the dimensions for the layer.</p>
            <div className="grid grid-cols-3 gap-2 items-center">
              <Label className="text-right text-xs">Width</Label>
              <Input defaultValue="100%" className="col-span-2 h-8 text-xs" />
              <Label className="text-right text-xs">Max. width</Label>
              <Input defaultValue="300px" className="col-span-2 h-8 text-xs" />
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}

export function TabsPreview() {
  return (
    <div className="w-full max-w-sm mx-auto">
      <Tabs defaultValue="account">
        <TabsList className="w-full">
          <TabsTrigger value="account" className="flex-1">Account</TabsTrigger>
          <TabsTrigger value="password" className="flex-1">Password</TabsTrigger>
          <TabsTrigger value="billing" className="flex-1">Billing</TabsTrigger>
        </TabsList>
        <TabsContent value="account" className="space-y-3">
          <div className="space-y-1.5">
            <Label>Display name</Label>
            <Input placeholder="Alex Rivera" />
          </div>
          <div className="space-y-1.5">
            <Label>Email</Label>
            <Input type="email" placeholder="alex@example.com" />
          </div>
          <Button size="sm">Save account</Button>
        </TabsContent>
        <TabsContent value="password" className="space-y-3">
          <div className="space-y-1.5">
            <Label>Current password</Label>
            <Input type="password" />
          </div>
          <div className="space-y-1.5">
            <Label>New password</Label>
            <Input type="password" />
          </div>
          <Button size="sm">Change password</Button>
        </TabsContent>
        <TabsContent value="billing">
          <p className="text-sm text-[var(--color-text-3)]">Billing settings coming soon.</p>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export function AccordionPreview() {
  return (
    <div className="w-full max-w-sm mx-auto">
      <Accordion type="single" collapsible defaultValue="item-1">
        <AccordionItem value="item-1">
          <AccordionTrigger>Is it accessible?</AccordionTrigger>
          <AccordionContent>
            Yes. It adheres to the WAI-ARIA design pattern, built on Radix UI.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Is it free?</AccordionTrigger>
          <AccordionContent>
            All core components are free and open source under the MIT license.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Can I use it in my project?</AccordionTrigger>
          <AccordionContent>
            Yes. Copy the component source into your project — no package dependency required.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

export function AlertPreview() {
  return (
    <div className="flex flex-col gap-3 w-full max-w-md mx-auto">
      <Alert>
        <AlertTitle>Default</AlertTitle>
        <AlertDescription>Something happened that you should know about.</AlertDescription>
      </Alert>
      <Alert variant="info">
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>You can add components via the CLI or copy the source directly.</AlertDescription>
      </Alert>
      <Alert variant="success">
        <AlertTitle>Component installed</AlertTitle>
        <AlertDescription>Button has been added to your project.</AlertDescription>
      </Alert>
      <Alert variant="warning">
        <AlertTitle>Update available</AlertTitle>
        <AlertDescription>A new version of ParticleUI is available.</AlertDescription>
      </Alert>
      <Alert variant="destructive">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Your session has expired. Please sign in again.</AlertDescription>
      </Alert>
    </div>
  )
}

export function CommandPreview() {
  return (
    <div className="w-full max-w-sm mx-auto border border-[var(--color-border)] rounded-xl overflow-hidden shadow-[0_8px_32px_0px_oklch(0%_0_0_/_0.4)]">
      <Command>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem>
              <FileText />
              <span>New document</span>
              <CommandShortcut>⌘N</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <Settings />
              <span>Settings</span>
              <CommandShortcut>⌘,</CommandShortcut>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Components">
            <CommandItem>
              <Terminal />
              <span>Button</span>
            </CommandItem>
            <CommandItem>
              <Terminal />
              <span>Dialog</span>
            </CommandItem>
            <CommandItem>
              <Terminal />
              <span>Tabs</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
  )
}

export function FormPreview() {
  return (
    <div className="w-full max-w-sm mx-auto space-y-4">
      <p className="text-xs text-[var(--color-text-4)] text-center">
        Form integrates react-hook-form with accessible validation. See docs for full usage example.
      </p>
      <div className="space-y-4 p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-1)]">
        <div className="space-y-1.5">
          <Label htmlFor="form-email">Email</Label>
          <Input id="form-email" type="email" placeholder="you@example.com" aria-describedby="form-email-desc" />
          <p id="form-email-desc" className="text-xs text-[var(--color-text-4)]">We&apos;ll never share your email.</p>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="form-msg">Message</Label>
          <Textarea id="form-msg" placeholder="Your message..." rows={3} />
          <p className="text-xs text-red-400">This field is required.</p>
        </div>
        <Button className="w-full">Submit</Button>
      </div>
    </div>
  )
}

/* ── Phase 3: Data + Navigation Previews ─────────────────────────────────── */

export function TablePreview() {
  const invoices = [
    { invoice: "INV-001", status: "Paid", method: "Credit Card", amount: "$250.00" },
    { invoice: "INV-002", status: "Pending", method: "PayPal", amount: "$150.00" },
    { invoice: "INV-003", status: "Unpaid", method: "Bank Transfer", amount: "$350.00" },
    { invoice: "INV-004", status: "Paid", method: "Credit Card", amount: "$450.00" },
  ]
  return (
    <div className="w-full">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Invoice</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Method</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((row) => (
            <TableRow key={row.invoice}>
              <TableCell className="font-medium">{row.invoice}</TableCell>
              <TableCell>
                <span className={[
                  "inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium border",
                  row.status === "Paid" ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30" :
                  row.status === "Pending" ? "bg-amber-500/10 text-amber-400 border-amber-500/30" :
                  "bg-red-500/10 text-red-400 border-red-500/30"
                ].join(" ")}>{row.status}</span>
              </TableCell>
              <TableCell>{row.method}</TableCell>
              <TableCell className="text-right">{row.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export function DataTablePreview() {
  return (
    <div className="w-full p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-1)]">
      <p className="text-xs text-[var(--color-text-4)] text-center">
        DataTable wraps TanStack Table v8 with sorting, filtering, and pagination built in.
        See docs for full column definition example.
      </p>
      <TablePreview />
    </div>
  )
}

export function PaginationPreview() {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem><PaginationPrevious href="#" /></PaginationItem>
        <PaginationItem><PaginationLink href="#">1</PaginationLink></PaginationItem>
        <PaginationItem><PaginationLink href="#" isActive>2</PaginationLink></PaginationItem>
        <PaginationItem><PaginationLink href="#">3</PaginationLink></PaginationItem>
        <PaginationItem><PaginationEllipsis /></PaginationItem>
        <PaginationItem><PaginationLink href="#">8</PaginationLink></PaginationItem>
        <PaginationItem><PaginationNext href="#" /></PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

export function SliderPreview() {
  const [val, setVal] = useState([40])
  const [range, setRange] = useState([20, 75])
  return (
    <div className="flex flex-col gap-6 w-full max-w-sm mx-auto">
      <div className="space-y-3">
        <div className="flex justify-between text-xs text-[var(--color-text-3)]">
          <span>Volume</span>
          <span>{val[0]}%</span>
        </div>
        <Slider value={val} onValueChange={setVal} max={100} step={1} />
      </div>
      <div className="space-y-3">
        <div className="flex justify-between text-xs text-[var(--color-text-3)]">
          <span>Price range</span>
          <span>${range[0]} — ${range[1]}</span>
        </div>
        <Slider value={range} onValueChange={setRange} max={100} step={1} />
      </div>
    </div>
  )
}

export function ProgressPreview() {
  const [p, setP] = useState(0)
  useRef(() => {
    const t = setInterval(() => setP((v) => (v >= 100 ? 0 : v + 2)), 80)
    return () => clearInterval(t)
  })
  return (
    <div className="flex flex-col gap-5 w-full max-w-sm mx-auto">
      {[33, 66, 100].map((v) => (
        <div key={v} className="space-y-2">
          <div className="flex justify-between text-xs text-[var(--color-text-3)]">
            <span>{v === 100 ? "Complete" : v === 66 ? "In progress" : "Starting"}</span>
            <span>{v}%</span>
          </div>
          <Progress value={v} />
        </div>
      ))}
    </div>
  )
}

export function BreadcrumbPreview() {
  return (
    <div className="flex flex-col gap-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem><BreadcrumbLink href="#">Home</BreadcrumbLink></BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem><BreadcrumbLink href="#">Docs</BreadcrumbLink></BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem><BreadcrumbLink href="#">Components</BreadcrumbLink></BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem><BreadcrumbPage>Breadcrumb</BreadcrumbPage></BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  )
}

export function ScrollAreaPreview() {
  const tags = Array.from({ length: 30 }, (_, i) => `component-${i + 1}`)
  return (
    <ScrollArea className="h-48 w-full max-w-xs mx-auto rounded-xl border border-[var(--color-border)]">
      <div className="p-4 space-y-1">
        <p className="text-xs font-semibold text-[var(--color-text-4)] uppercase tracking-wider mb-3">Components</p>
        {tags.map((tag) => (
          <div key={tag} className="text-sm text-[var(--color-text-2)] py-1 px-2 rounded hover:bg-[var(--color-surface-2)] cursor-pointer transition-colors">
            {tag}
          </div>
        ))}
      </div>
    </ScrollArea>
  )
}

export function HoverCardPreview() {
  return (
    <div className="flex justify-center">
      <HoverCard>
        <HoverCardTrigger asChild>
          <Button variant="link">@particleui</Button>
        </HoverCardTrigger>
        <HoverCardContent>
          <div className="flex gap-3">
            <Avatar className="h-10 w-10" ring>
              <AvatarFallback>PU</AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <h4 className="text-sm font-semibold text-[var(--color-text-1)]">ParticleUI</h4>
              <p className="text-xs text-[var(--color-text-3)]">
                The best component library in the world. Built with Radix UI + Tailwind.
              </p>
              <div className="flex items-center gap-1 pt-1">
                <CalendarIcon className="h-3 w-3 text-[var(--color-text-4)]" />
                <span className="text-[11px] text-[var(--color-text-4)]">Joined May 2025</span>
              </div>
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>
    </div>
  )
}

export function ContextMenuPreview() {
  return (
    <div className="flex justify-center">
      <ContextMenu>
        <ContextMenuTrigger className="flex h-32 w-64 items-center justify-center rounded-xl border border-dashed border-[var(--color-border)] text-sm text-[var(--color-text-4)] select-none cursor-default">
          Right-click here
        </ContextMenuTrigger>
        <ContextMenuContent className="w-48">
          <ContextMenuLabel>Actions</ContextMenuLabel>
          <ContextMenuSeparator />
          <ContextMenuItem>
            Back
            <ContextMenuShortcut>⌘[</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem>
            Forward
            <ContextMenuShortcut>⌘]</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem>
            Reload
            <ContextMenuShortcut>⌘R</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem className="text-red-400 focus:text-red-400 focus:bg-red-500/10">
            Delete
            <ContextMenuShortcut>⌘⌫</ContextMenuShortcut>
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    </div>
  )
}

export function ResizablePreview() {
  return (
    <ResizablePanelGroup orientation="horizontal" className="max-w-md rounded-xl border border-[var(--color-border)] h-36 mx-auto">
      <ResizablePanel defaultSize={50}>
        <div className="flex h-full items-center justify-center p-4">
          <p className="text-xs text-[var(--color-text-4)]">Panel one</p>
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={50}>
        <ResizablePanelGroup orientation="vertical">
          <ResizablePanel defaultSize={50}>
            <div className="flex h-full items-center justify-center p-2">
              <p className="text-xs text-[var(--color-text-4)]">Panel two</p>
            </div>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={50}>
            <div className="flex h-full items-center justify-center p-2">
              <p className="text-xs text-[var(--color-text-4)]">Panel three</p>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}

export function NavigationMenuPreview() {
  return (
    <p className="text-xs text-[var(--color-text-4)] text-center">
      NavigationMenu renders inline nav with dropdown panels. Best seen in a full layout context — see the docs for a complete example.
    </p>
  )
}

export function CalendarPreview() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  return (
    <div className="flex justify-center">
      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-1)] w-fit">
        <Calendar mode="single" selected={date} onSelect={setDate} />
      </div>
    </div>
  )
}

export function DatePickerPreview() {
  const [date, setDate] = useState<Date | undefined>()
  return (
    <div className="w-full max-w-xs mx-auto space-y-3">
      <div className="space-y-1.5">
        <Label>Start date</Label>
        <DatePicker date={date} onDateChange={setDate} />
      </div>
    </div>
  )
}

export function ComboboxPreview() {
  const [fw, setFw] = useState("")
  const [lang, setLang] = useState("")
  const frameworks = [
    { value: "next", label: "Next.js" },
    { value: "remix", label: "Remix" },
    { value: "astro", label: "Astro" },
    { value: "nuxt", label: "Nuxt" },
    { value: "sveltekit", label: "SvelteKit" },
  ]
  const langs = [
    { value: "typescript", label: "TypeScript" },
    { value: "javascript", label: "JavaScript" },
    { value: "rust", label: "Rust" },
    { value: "go", label: "Go" },
    { value: "python", label: "Python" },
  ]
  return (
    <div className="flex flex-col gap-4 w-full max-w-xs mx-auto">
      <div className="space-y-1.5">
        <Label>Framework</Label>
        <Combobox options={frameworks} value={fw} onValueChange={setFw} placeholder="Select framework..." />
      </div>
      <div className="space-y-1.5">
        <Label>Language</Label>
        <Combobox options={langs} value={lang} onValueChange={setLang} placeholder="Select language..." searchPlaceholder="Search languages..." />
      </div>
    </div>
  )
}

/* ── Phase 4: Particle Components ───────────────────────────────────────── */

export function TiltCardPreview() {
  return (
    <div className="flex gap-4 flex-wrap justify-center">
      <TiltCard className="w-48 p-6 flex flex-col gap-2">
        <div className="text-2xl font-bold text-[var(--color-accent)]">3D</div>
        <div className="text-sm text-[var(--color-text-2)]">Hover to tilt</div>
      </TiltCard>
      <TiltCard intensity={20} className="w-48 p-6 flex flex-col gap-2">
        <div className="text-2xl font-bold text-[var(--color-text-1)]">High</div>
        <div className="text-sm text-[var(--color-text-2)]">intensity 20</div>
      </TiltCard>
      <TiltCard glare={false} className="w-48 p-6 flex flex-col gap-2">
        <div className="text-2xl font-bold text-[var(--color-text-1)]">No Glare</div>
        <div className="text-sm text-[var(--color-text-2)]">glare off</div>
      </TiltCard>
    </div>
  )
}

export function TypewriterPreview() {
  return (
    <div className="flex flex-col gap-6 items-center">
      <div className="text-2xl font-bold text-[var(--color-text-1)]">
        Build{" "}
        <Typewriter
          words={["faster.", "smarter.", "better.", "with ParticleUI."]}
          className="text-[var(--color-accent)]"
        />
      </div>
      <div className="text-base text-[var(--color-text-2)]">
        <Typewriter
          words={["Elegant components.", "Zero compromise.", "Ship today."]}
          typingSpeed={50}
          deletingSpeed={30}
        />
      </div>
    </div>
  )
}

export function CounterPreview() {
  return (
    <div className="flex gap-8 flex-wrap justify-center">
      {[
        { to: 12500, prefix: "+", suffix: "", label: "Stars" },
        { to: 99.9, prefix: "", suffix: "%", label: "Uptime", decimals: 1 },
        { to: 50, prefix: "", suffix: " components", label: "Free" },
        { to: 4200, prefix: "", suffix: " users", label: "Developers" },
      ].map(({ to, prefix, suffix, label, decimals }) => (
        <div key={label} className="flex flex-col items-center gap-1">
          <span className="text-3xl font-bold text-[var(--color-accent)] tabular-nums">
            <Counter to={to} prefix={prefix} suffix={suffix} decimals={decimals ?? 0} />
          </span>
          <span className="text-xs text-[var(--color-text-3)] uppercase tracking-widest">{label}</span>
        </div>
      ))}
    </div>
  )
}

export function GradientTextPreview() {
  const variants = ["electric", "aurora", "fire", "candy", "gold"] as const
  return (
    <div className="flex flex-col gap-3 items-center">
      {variants.map((v) => (
        <GradientText key={v} variant={v} className="text-2xl font-bold">
          {v.charAt(0).toUpperCase() + v.slice(1)} Gradient
        </GradientText>
      ))}
    </div>
  )
}

export function MeteorsPreview() {
  return (
    <div className="relative w-full h-48 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-1)] overflow-hidden flex items-center justify-center">
      <Meteors count={14} />
      <span className="relative z-10 text-[var(--color-text-1)] font-semibold">Meteor Shower</span>
    </div>
  )
}

export function ConfettiButtonPreview() {
  return (
    <div className="flex gap-3 flex-wrap justify-center">
      <ConfettiButton>Click for confetti</ConfettiButton>
      <ConfettiButton variant="outline">Outline</ConfettiButton>
      <ConfettiButton variant="ghost">Ghost</ConfettiButton>
    </div>
  )
}

export function ShimmerButtonPreview() {
  return (
    <div className="flex gap-3 flex-wrap justify-center">
      <ShimmerButton>Default shimmer</ShimmerButton>
      <ShimmerButton variant="filled">Filled</ShimmerButton>
      <ShimmerButton variant="dark">Dark</ShimmerButton>
      <ShimmerButton size="sm">Small</ShimmerButton>
      <ShimmerButton size="lg">Large</ShimmerButton>
    </div>
  )
}

export function GlowCardPreview() {
  return (
    <div className="flex gap-4 flex-wrap justify-center">
      <GlowCard className="w-52 p-6">
        <div className="text-sm font-semibold text-[var(--color-text-1)] mb-1">Glow Card</div>
        <div className="text-xs text-[var(--color-text-3)]">Move cursor over me</div>
      </GlowCard>
      <GlowCard glowColor="oklch(72% 0.2 280)" className="w-52 p-6">
        <div className="text-sm font-semibold text-[var(--color-text-1)] mb-1">Purple Glow</div>
        <div className="text-xs text-[var(--color-text-3)]">Custom color</div>
      </GlowCard>
      <GlowCard glowColor="oklch(72% 0.22 60)" glowOpacity={0.2} className="w-52 p-6">
        <div className="text-sm font-semibold text-[var(--color-text-1)] mb-1">Amber Glow</div>
        <div className="text-xs text-[var(--color-text-3)]">Higher opacity</div>
      </GlowCard>
    </div>
  )
}

export function FloatingDockPreview() {
  const items = [
    { icon: <Home size={18} />, label: "Home", href: "#" },
    { icon: <Search size={18} />, label: "Search", href: "#" },
    { icon: <Bell size={18} />, label: "Notifications", href: "#" },
    { icon: <Star size={18} />, label: "Favorites", href: "#" },
    { icon: <Heart size={18} />, label: "Liked", href: "#" },
    { icon: <Music size={18} />, label: "Music", href: "#" },
  ]
  return (
    <div className="flex justify-center py-8">
      <FloatingDock items={items} />
    </div>
  )
}

export function MarqueePreview() {
  const tags = ["React", "TypeScript", "Tailwind", "Radix UI", "OKLCH", "ParticleUI", "Open Source", "Free"]
  return (
    <div className="flex flex-col gap-4">
      <Marquee speed={30} gap={24}>
        {tags.map((t) => (
          <span key={t} className="rounded-full border border-[var(--color-border)] bg-[var(--color-surface-2)] px-4 py-1.5 text-xs font-medium text-[var(--color-text-2)] whitespace-nowrap">
            {t}
          </span>
        ))}
      </Marquee>
      <Marquee speed={25} direction="right" gap={24}>
        {tags.slice().reverse().map((t) => (
          <span key={t} className="rounded-full border border-[var(--color-accent-border)] bg-[var(--color-accent-dim)] px-4 py-1.5 text-xs font-medium text-[var(--color-accent-text)] whitespace-nowrap">
            {t}
          </span>
        ))}
      </Marquee>
    </div>
  )
}

export function BeamPreview() {
  return (
    <div className="flex flex-col gap-6 py-4">
      <Beam colorFrom="var(--color-accent)" />
      <Beam colorFrom="oklch(72% 0.2 280)" duration={2} />
      <Beam colorFrom="oklch(72% 0.22 60)" duration={4} delay={1} />
      <Beam colorFrom="oklch(72% 0.2 340)" duration={5} delay={2} />
    </div>
  )
}

export function GlowInputPreview() {
  return (
    <div className="flex flex-col gap-4 w-72">
      <GlowInput placeholder="Focus for electric glow…" />
      <GlowInput glowColor="oklch(72% 0.2 280)" placeholder="Purple glow on focus" />
      <GlowInput glowColor="oklch(72% 0.22 60)" placeholder="Amber glow on focus" />
      <GlowInput type="password" placeholder="Password with glow" />
    </div>
  )
}

/* ── Phase 5: Blocks ────────────────────────────────────────────────────── */

export function HeroCenteredPreview() {
  return <HeroCentered meteors={false} />
}

export function HeroSplitPreview() {
  return <HeroSplit />
}

export function PricingSectionPreview() {
  return <PricingSection />
}

export function FeatureGridPreview() {
  return <FeatureGrid />
}

export function FeatureAlternatingPreview() {
  return <FeatureAlternating />
}

export function CtaSectionPreview() {
  return <CtaSection meteors={false} />
}

export function FooterPreview() {
  return <Footer />
}

export function AuthSignInPreview() {
  return <AuthSignIn />
}

export function AuthSignUpPreview() {
  return <AuthSignUp />
}

export function DashboardAnalyticsPreview() {
  return <DashboardAnalytics />
}

export function SettingsPagePreview() {
  return <SettingsPage />
}

export function AIChatPreview() {
  return <AIChat />
}

export function TestimonialsSectionPreview() {
  return <TestimonialsSection />
}

export function StatsSectionPreview() {
  return <StatsSection />
}

export function FaqSectionPreview() {
  return <FaqSection />
}

export function LogoCloudPreview() {
  return <LogoCloud />
}

export function HowItWorksPreview() {
  return <HowItWorks />
}

export function NewsletterSectionPreview() {
  return <NewsletterSection />
}
