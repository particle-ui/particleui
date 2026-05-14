"use client"

import { useState, useRef } from "react"

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
            background: "rgba(0,212,255,0.1)",
            color: "#00d4ff",
            border: "1px solid rgba(0,212,255,0.3)",
            boxShadow: "0 0 16px rgba(0,212,255,0.2)",
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
          color: "#00d4ff",
          bg: "rgba(0,212,255,0.08)",
          border: "rgba(0,212,255,0.3)",
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
        { from: "#222", mid: "rgba(0,212,255,0.15)", to: "#0a0a0a" },
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
          border: `1px solid ${hovered ? "rgba(0,212,255,0.4)" : "rgba(255,255,255,0.1)"}`,
          background: hovered ? "rgba(0,212,255,0.08)" : "rgba(255,255,255,0.04)",
          color: hovered ? "#00d4ff" : "#888",
          boxShadow: hovered ? "0 0 30px rgba(0,212,255,0.2)" : "none",
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
    { color: "#00d4ff", top: "10%", left: "20%", dur: "8s" },
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
          background: "#00d4ff",
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
              background: `radial-gradient(200px circle at ${pos.x}px ${pos.y}px, rgba(0,212,255,0.07), transparent 60%)`,
            }}
          />
          <p className="text-xs font-semibold mb-1">{title}</p>
          <p className="text-[10px] text-[#444]">{desc}</p>
        </div>
      ))}
    </div>
  )
}
