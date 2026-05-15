import { cn } from "@/lib/utils"

const ITEMS = [
  { name: "particle-hero", tier: "pro" },
  { name: "glow-button", tier: "free" },
  { name: "magnetic-button", tier: "pro" },
  { name: "gradient-card", tier: "free" },
  { name: "aurora-background", tier: "pro" },
  { name: "electric-badge", tier: "free" },
  { name: "liquid-glass-card", tier: "pro" },
  { name: "cursor-trail", tier: "pro" },
  { name: "noise-texture", tier: "free" },
  { name: "spotlight-hero", tier: "pro" },
  { name: "shimmer-text", tier: "free" },
  { name: "orbit-animation", tier: "pro" },
]

export function Marquee() {
  return (
    <div className="relative w-full overflow-hidden border-y border-white/[0.05] py-4">
      {/* Fade edges */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-bg to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-bg to-transparent" />

      <div className="flex">
        <Track />
        <Track aria-hidden />
      </div>
    </div>
  )
}

function Track({ "aria-hidden": hidden }: { "aria-hidden"?: boolean }) {
  return (
    <div
      aria-hidden={hidden}
      className="flex shrink-0 items-center gap-6 pr-6"
      style={{ animation: "marquee 30s linear infinite" }}
    >
      {ITEMS.map((item) => (
        <div
          key={item.name}
          className="flex items-center gap-2.5 rounded-full border border-white/[0.07] bg-white/[0.03] px-4 py-2 text-sm whitespace-nowrap"
        >
          <span
            className={cn(
              "h-1.5 w-1.5 rounded-full",
              item.tier === "pro" ? "bg-accent" : "bg-text-4"
            )}
          />
          <span className="font-mono text-xs text-text-3">{item.name}</span>
          {item.tier === "pro" && (
            <span className="text-[9px] font-semibold uppercase tracking-wider text-accent/60">
              pro
            </span>
          )}
        </div>
      ))}
      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }
      `}</style>
    </div>
  )
}
