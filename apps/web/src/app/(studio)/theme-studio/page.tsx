"use client"

import { useState, useTransition, useMemo, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Palette, Copy, Check, Share, FloppyDisk } from "@phosphor-icons/react"
import { ThemeToggle } from "@/components/theme-toggle"
import {
  DEFAULT_TOKENS,
  tokensToCSS,
  tokensToRegistryItem,
  type ThemeTokens,
} from "@/lib/themes/serialize"
import { saveThemeAction } from "./actions"
import { useUser } from "@clerk/nextjs"

// ─── Presets ─────────────────────────────────────────────────────────────────

const PRESETS: Record<string, ThemeTokens> = {
  espresso: DEFAULT_TOKENS,
  ocean: {
    dark: {
      bg: "oklch(6% 0.01 230)", surface1: "oklch(10% 0.01 225)", surface2: "oklch(14% 0.01 225)",
      surface3: "oklch(18% 0.008 225)", border: "oklch(100% 0 0 / 0.07)", accent: "oklch(72% 0.18 200)",
      text1: "oklch(95% 0.005 200)", text2: "oklch(72% 0.003 200)", text3: "oklch(52% 0.002 200)",
      text4: "oklch(35% 0.001 200)", success: "oklch(65% 0.17 145)", error: "oklch(65% 0.20 25)",
      warning: "oklch(78% 0.16 75)", info: "oklch(72% 0.14 230)",
    },
    light: {
      bg: "oklch(98% 0.006 225)", surface1: "oklch(95% 0.005 225)", surface2: "oklch(91% 0.005 225)",
      surface3: "oklch(87% 0.004 225)", border: "oklch(0% 0 0 / 0.08)", accent: "oklch(55% 0.20 230)",
      text1: "oklch(15% 0.01 225)", text2: "oklch(38% 0.005 225)", text3: "oklch(55% 0.004 225)",
      text4: "oklch(68% 0.003 225)", success: "oklch(48% 0.17 145)", error: "oklch(50% 0.22 25)",
      warning: "oklch(55% 0.18 75)", info: "oklch(50% 0.16 230)",
    },
  },
  forest: {
    dark: {
      bg: "oklch(5% 0.01 145)", surface1: "oklch(9% 0.01 145)", surface2: "oklch(13% 0.01 145)",
      surface3: "oklch(17% 0.008 145)", border: "oklch(100% 0 0 / 0.07)", accent: "oklch(65% 0.18 145)",
      text1: "oklch(94% 0.005 145)", text2: "oklch(70% 0.003 145)", text3: "oklch(50% 0.002 145)",
      text4: "oklch(34% 0.001 145)", success: "oklch(65% 0.17 145)", error: "oklch(65% 0.20 25)",
      warning: "oklch(78% 0.16 75)", info: "oklch(70% 0.13 230)",
    },
    light: {
      bg: "oklch(98% 0.005 145)", surface1: "oklch(95% 0.005 145)", surface2: "oklch(91% 0.004 145)",
      surface3: "oklch(87% 0.003 145)", border: "oklch(0% 0 0 / 0.08)", accent: "oklch(48% 0.20 145)",
      text1: "oklch(12% 0.01 145)", text2: "oklch(35% 0.005 145)", text3: "oklch(52% 0.004 145)",
      text4: "oklch(66% 0.003 145)", success: "oklch(48% 0.17 145)", error: "oklch(50% 0.22 25)",
      warning: "oklch(55% 0.18 75)", info: "oklch(50% 0.16 230)",
    },
  },
  cyber: {
    dark: {
      bg: "oklch(5% 0.008 290)", surface1: "oklch(9% 0.008 290)", surface2: "oklch(13% 0.007 290)",
      surface3: "oklch(17% 0.006 290)", border: "oklch(100% 0 0 / 0.07)", accent: "oklch(72% 0.22 290)",
      text1: "oklch(95% 0.004 290)", text2: "oklch(70% 0.003 290)", text3: "oklch(50% 0.002 290)",
      text4: "oklch(33% 0.001 290)", success: "oklch(65% 0.17 145)", error: "oklch(65% 0.20 25)",
      warning: "oklch(78% 0.16 75)", info: "oklch(70% 0.13 230)",
    },
    light: {
      bg: "oklch(98% 0.004 290)", surface1: "oklch(95% 0.004 290)", surface2: "oklch(91% 0.003 290)",
      surface3: "oklch(87% 0.003 290)", border: "oklch(0% 0 0 / 0.08)", accent: "oklch(55% 0.24 290)",
      text1: "oklch(12% 0.01 290)", text2: "oklch(35% 0.005 290)", text3: "oklch(52% 0.004 290)",
      text4: "oklch(66% 0.003 290)", success: "oklch(48% 0.17 145)", error: "oklch(50% 0.22 25)",
      warning: "oklch(55% 0.18 75)", info: "oklch(50% 0.16 230)",
    },
  },
  solarized: {
    dark: {
      bg: "oklch(18% 0.03 210)", surface1: "oklch(22% 0.025 210)", surface2: "oklch(26% 0.022 210)",
      surface3: "oklch(30% 0.018 210)", border: "oklch(100% 0 0 / 0.1)", accent: "oklch(75% 0.19 185)",
      text1: "oklch(85% 0.01 60)", text2: "oklch(65% 0.008 60)", text3: "oklch(50% 0.005 60)",
      text4: "oklch(38% 0.004 60)", success: "oklch(65% 0.17 145)", error: "oklch(65% 0.20 25)",
      warning: "oklch(78% 0.16 75)", info: "oklch(75% 0.19 185)",
    },
    light: {
      bg: "oklch(96% 0.012 80)", surface1: "oklch(93% 0.01 80)", surface2: "oklch(90% 0.009 80)",
      surface3: "oklch(86% 0.008 80)", border: "oklch(0% 0 0 / 0.09)", accent: "oklch(52% 0.20 210)",
      text1: "oklch(25% 0.02 210)", text2: "oklch(42% 0.012 210)", text3: "oklch(57% 0.008 210)",
      text4: "oklch(68% 0.005 210)", success: "oklch(48% 0.17 145)", error: "oklch(50% 0.22 25)",
      warning: "oklch(55% 0.18 75)", info: "oklch(50% 0.16 210)",
    },
  },
  mono: {
    dark: {
      bg: "oklch(4% 0 0)", surface1: "oklch(8% 0 0)", surface2: "oklch(12% 0 0)",
      surface3: "oklch(16% 0 0)", border: "oklch(100% 0 0 / 0.07)", accent: "oklch(92% 0 0)",
      text1: "oklch(95% 0 0)", text2: "oklch(68% 0 0)", text3: "oklch(48% 0 0)",
      text4: "oklch(32% 0 0)", success: "oklch(65% 0 0)", error: "oklch(55% 0 0)",
      warning: "oklch(75% 0 0)", info: "oklch(65% 0 0)",
    },
    light: {
      bg: "oklch(99% 0 0)", surface1: "oklch(96% 0 0)", surface2: "oklch(92% 0 0)",
      surface3: "oklch(88% 0 0)", border: "oklch(0% 0 0 / 0.08)", accent: "oklch(12% 0 0)",
      text1: "oklch(8% 0 0)", text2: "oklch(32% 0 0)", text3: "oklch(50% 0 0)",
      text4: "oklch(65% 0 0)", success: "oklch(35% 0 0)", error: "oklch(25% 0 0)",
      warning: "oklch(40% 0 0)", info: "oklch(35% 0 0)",
    },
  },
}

// ─── Token controls ───────────────────────────────────────────────────────────

type ModeTokens = ThemeTokens["dark"]
type TokenKey = keyof ModeTokens

const TOKEN_GROUPS: { label: string; keys: TokenKey[] }[] = [
  { label: "Background", keys: ["bg", "surface1", "surface2", "surface3"] },
  { label: "Border", keys: ["border"] },
  { label: "Accent", keys: ["accent"] },
  { label: "Text", keys: ["text1", "text2", "text3", "text4"] },
  { label: "Semantic", keys: ["success", "error", "warning", "info"] },
]

const TOKEN_LABELS: Record<TokenKey, string> = {
  bg: "Background",
  surface1: "Surface 1",
  surface2: "Surface 2",
  surface3: "Surface 3",
  border: "Border",
  accent: "Accent",
  text1: "Text 1",
  text2: "Text 2",
  text3: "Text 3",
  text4: "Text 4",
  success: "Success",
  error: "Error",
  warning: "Warning",
  info: "Info",
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function CopyButton({ text, label = "Copy" }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors"
      style={{
        backgroundColor: "var(--color-surface-2)",
        color: copied ? "var(--color-success)" : "var(--color-text-2)",
        border: "1px solid var(--color-border)",
      }}
    >
      {copied ? <Check size={12} weight="bold" /> : <Copy size={12} />}
      {copied ? "Copied!" : label}
    </button>
  )
}

function TokenRow({
  tokenKey,
  value,
  onChange,
}: {
  tokenKey: TokenKey
  value: string
  onChange: (key: TokenKey, value: string) => void
}) {
  return (
    <div className="flex items-center gap-2 py-1">
      {/* Color swatch */}
      <div
        className="h-5 w-5 shrink-0 rounded"
        style={{
          backgroundColor: value,
          border: "1px solid var(--color-border)",
        }}
      />
      <label className="w-20 shrink-0 text-xs" style={{ color: "var(--color-text-3)" }}>
        {TOKEN_LABELS[tokenKey]}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(tokenKey, e.target.value)}
        className="min-w-0 flex-1 rounded px-2 py-0.5 font-mono text-xs outline-none focus:ring-1"
        style={{
          backgroundColor: "var(--color-surface-2)",
          border: "1px solid var(--color-border)",
          color: "var(--color-text-1)",
        }}
        spellCheck={false}
      />
    </div>
  )
}

// ─── Preview panel ───────────────────────────────────────────────────────────

function PreviewPanel({ tokens, mode }: { tokens: ThemeTokens; mode: "dark" | "light" }) {
  const t = tokens[mode]

  const previewVars = {
    "--color-bg": t.bg,
    "--color-surface-1": t.surface1,
    "--color-surface-2": t.surface2,
    "--color-surface-3": t.surface3,
    "--color-border": t.border,
    "--color-accent": t.accent,
    "--color-text-1": t.text1,
    "--color-text-2": t.text2,
    "--color-text-3": t.text3,
    "--color-text-4": t.text4,
    "--color-success": t.success,
    "--color-error": t.error,
    "--color-warning": t.warning,
    "--color-info": t.info,
  } as React.CSSProperties

  return (
    <div
      className="h-full w-full overflow-y-auto p-6"
      style={{ ...previewVars, backgroundColor: t.bg, color: t.text1 }}
    >
      {/* Label */}
      <p className="mb-4 text-xs font-medium uppercase tracking-wider" style={{ color: t.text3 }}>
        Live Preview ({mode} mode)
      </p>

      {/* Card */}
      <div
        className="mb-4 rounded-xl p-5"
        style={{
          backgroundColor: t.surface1,
          border: `1px solid ${t.border}`,
        }}
      >
        <h3 className="mb-1 text-base font-semibold" style={{ color: t.text1 }}>
          Component card
        </h3>
        <p className="mb-4 text-sm" style={{ color: t.text2 }}>
          This card uses surface-1, with text-1 for the heading and text-2 for body copy.
        </p>

        {/* Buttons */}
        <div className="flex flex-wrap gap-2">
          <button
            className="rounded-md px-4 py-1.5 text-sm font-medium"
            style={{ backgroundColor: t.accent, color: t.bg }}
          >
            Primary
          </button>
          <button
            className="rounded-md px-4 py-1.5 text-sm font-medium"
            style={{
              backgroundColor: "transparent",
              border: `1px solid ${t.border}`,
              color: t.text1,
            }}
          >
            Secondary
          </button>
        </div>
      </div>

      {/* Input */}
      <div className="mb-4">
        <label className="mb-1 block text-xs font-medium" style={{ color: t.text2 }}>
          Input field
        </label>
        <input
          type="text"
          placeholder="Placeholder text..."
          className="w-full rounded-lg px-3 py-2 text-sm outline-none"
          style={{
            backgroundColor: t.surface2,
            border: `1px solid ${t.border}`,
            color: t.text1,
          }}
          readOnly
        />
      </div>

      {/* Text hierarchy */}
      <div
        className="mb-4 rounded-xl p-4"
        style={{ backgroundColor: t.surface1, border: `1px solid ${t.border}` }}
      >
        <p className="text-sm font-semibold" style={{ color: t.text1 }}>
          Text 1 — Primary heading
        </p>
        <p className="text-sm" style={{ color: t.text2 }}>
          Text 2 — Body copy and descriptions
        </p>
        <p className="text-sm" style={{ color: t.text3 }}>
          Text 3 — Secondary / muted text
        </p>
        <p className="text-sm" style={{ color: t.text4 }}>
          Text 4 — Placeholders and disabled
        </p>
      </div>

      {/* Semantic badges */}
      <div className="flex flex-wrap gap-2">
        {(
          [
            { label: "Success", color: t.success },
            { label: "Error", color: t.error },
            { label: "Warning", color: t.warning },
            { label: "Info", color: t.info },
            { label: "Accent", color: t.accent },
          ] as { label: string; color: string }[]
        ).map(({ label, color }) => (
          <span
            key={label}
            className="rounded-full px-3 py-0.5 text-xs font-medium"
            style={{
              backgroundColor: `color-mix(in oklch, ${color} 15%, transparent)`,
              color,
              border: `1px solid color-mix(in oklch, ${color} 30%, transparent)`,
            }}
          >
            {label}
          </span>
        ))}
      </div>
    </div>
  )
}

// ─── Main page ───────────────────────────────────────────────────────────────

function ThemeStudioInner() {
  const { isSignedIn } = useUser()
  const searchParams = useSearchParams()
  const presetKey = searchParams.get("preset") ?? "espresso"
  const initialTokens = useMemo(() => PRESETS[presetKey] ?? DEFAULT_TOKENS, [presetKey])
  const initialName = presetKey.charAt(0).toUpperCase() + presetKey.slice(1)

  const [tokens, setTokens] = useState<ThemeTokens>(initialTokens)
  const [name, setName] = useState(initialName)
  const [activeMode, setActiveMode] = useState<"dark" | "light">("dark")
  const [activeExportTab, setActiveExportTab] = useState<"css" | "json">("css")
  const [headerCopied, setHeaderCopied] = useState(false)
  const [isPending, startTransition] = useTransition()
  const [saveResult, setSaveResult] = useState<{ slug?: string; error?: string } | null>(null)

  const css = tokensToCSS(tokens)
  const registryJson = JSON.stringify(tokensToRegistryItem(name, name.toLowerCase().replace(/[^a-z0-9]+/g, "-"), tokens), null, 2)

  function updateToken(mode: "dark" | "light", key: keyof ModeTokens, value: string) {
    setTokens((prev) => ({
      ...prev,
      [mode]: { ...prev[mode], [key]: value },
    }))
  }

  function handleHeaderCopy() {
    navigator.clipboard.writeText(css).then(() => {
      setHeaderCopied(true)
      setTimeout(() => setHeaderCopied(false), 2000)
    })
  }

  function handleSave() {
    startTransition(async () => {
      const result = await saveThemeAction(name, JSON.stringify(tokens))
      setSaveResult(result ?? null)
    })
  }

  return (
    <div className="flex h-screen flex-col overflow-hidden" style={{ backgroundColor: "var(--color-bg)" }}>
      {/* ── Top bar ─────────────────────────────────────────────────────── */}
      <header
        className="flex h-14 shrink-0 items-center gap-4 px-4"
        style={{
          backgroundColor: "var(--color-surface-1)",
          borderBottom: "1px solid var(--color-border)",
        }}
      >
        {/* Left */}
        <div className="flex items-center gap-2">
          <Palette size={18} style={{ color: "var(--color-accent)" }} />
          <span className="text-sm font-semibold" style={{ color: "var(--color-text-1)" }}>
            Theme Studio
          </span>
        </div>

        {/* Center — name input */}
        <div className="flex flex-1 justify-center">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="rounded-lg px-3 py-1.5 text-center text-sm font-medium outline-none focus:ring-1"
            style={{
              backgroundColor: "var(--color-surface-2)",
              border: "1px solid var(--color-border)",
              color: "var(--color-text-1)",
              minWidth: 180,
            }}
            placeholder="Theme name"
          />
        </div>

        {/* Right */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleHeaderCopy}
            className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors"
            style={{
              backgroundColor: "var(--color-accent)",
              color: "var(--color-bg)",
            }}
          >
            {headerCopied ? <Check size={12} weight="bold" /> : <Copy size={12} />}
            {headerCopied ? "Copied!" : "Export CSS"}
          </button>
          <button
            disabled
            className="flex cursor-not-allowed items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium opacity-40"
            style={{
              border: "1px solid var(--color-border)",
              color: "var(--color-text-2)",
            }}
          >
            <Share size={12} />
            Share
          </button>
          <ThemeToggle />
        </div>
      </header>

      {/* ── Three-column body ────────────────────────────────────────────── */}
      <div className="flex flex-1 overflow-hidden">
        {/* Column 1 — Controls */}
        <aside
          className="flex w-[280px] shrink-0 flex-col overflow-y-auto"
          style={{
            backgroundColor: "var(--color-surface-1)",
            borderRight: "1px solid var(--color-border)",
          }}
        >
          {/* Mode tabs */}
          <div
            className="flex shrink-0 border-b p-2 gap-1"
            style={{ borderColor: "var(--color-border)" }}
          >
            {(["dark", "light"] as const).map((m) => (
              <button
                key={m}
                onClick={() => setActiveMode(m)}
                className="flex-1 rounded-md py-1.5 text-xs font-medium capitalize transition-colors"
                style={{
                  backgroundColor:
                    activeMode === m ? "var(--color-surface-3)" : "transparent",
                  color:
                    activeMode === m ? "var(--color-text-1)" : "var(--color-text-3)",
                }}
              >
                {m}
              </button>
            ))}
          </div>

          {/* Token groups */}
          <div className="flex-1 overflow-y-auto p-4 space-y-5">
            {TOKEN_GROUPS.map((group) => (
              <div key={group.label}>
                <p
                  className="mb-2 text-xs font-semibold uppercase tracking-wider"
                  style={{ color: "var(--color-text-4)" }}
                >
                  {group.label}
                </p>
                {group.keys.map((key) => (
                  <TokenRow
                    key={key}
                    tokenKey={key}
                    value={tokens[activeMode][key]}
                    onChange={(k, v) => updateToken(activeMode, k, v)}
                  />
                ))}
              </div>
            ))}
          </div>

          {/* Reset */}
          <div className="shrink-0 border-t p-4" style={{ borderColor: "var(--color-border)" }}>
            <button
              onClick={() => setTokens(DEFAULT_TOKENS)}
              className="w-full rounded-lg py-2 text-xs font-medium transition-colors"
              style={{
                border: "1px solid var(--color-border)",
                color: "var(--color-text-3)",
              }}
            >
              Reset to defaults
            </button>
          </div>
        </aside>

        {/* Column 2 — Preview */}
        <main className="flex flex-1 flex-col overflow-hidden" style={{ backgroundColor: "var(--color-bg)" }}>
          <PreviewPanel tokens={tokens} mode={activeMode} />
        </main>

        {/* Column 3 — Export */}
        <aside
          className="flex w-[320px] shrink-0 flex-col overflow-hidden"
          style={{
            backgroundColor: "var(--color-surface-1)",
            borderLeft: "1px solid var(--color-border)",
          }}
        >
          {/* Export tabs */}
          <div
            className="flex shrink-0 border-b p-2 gap-1"
            style={{ borderColor: "var(--color-border)" }}
          >
            {(["css", "json"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveExportTab(tab)}
                className="flex-1 rounded-md py-1.5 text-xs font-medium uppercase tracking-wide transition-colors"
                style={{
                  backgroundColor:
                    activeExportTab === tab ? "var(--color-surface-3)" : "transparent",
                  color:
                    activeExportTab === tab ? "var(--color-text-1)" : "var(--color-text-3)",
                }}
              >
                {tab === "css" ? "CSS" : "Registry JSON"}
              </button>
            ))}
          </div>

          {/* Code output */}
          <div className="relative min-h-0 flex-1 overflow-hidden">
            <div className="absolute right-3 top-3 z-10">
              <CopyButton text={activeExportTab === "css" ? css : registryJson} />
            </div>
            <pre
              className="h-full overflow-auto p-4 font-mono text-xs leading-relaxed"
              style={{ color: "var(--color-text-2)" }}
            >
              {activeExportTab === "css" ? css : registryJson}
            </pre>
          </div>

          {/* Save section */}
          <div
            className="shrink-0 border-t p-4"
            style={{ borderColor: "var(--color-border)" }}
          >
            <p className="mb-2 text-xs font-semibold" style={{ color: "var(--color-text-2)" }}>
              Save to ParticleUI
            </p>
            {isSignedIn ? (
              <div className="space-y-2">
                <button
                  onClick={handleSave}
                  disabled={isPending}
                  className="flex w-full items-center justify-center gap-2 rounded-lg py-2 text-xs font-medium transition-colors disabled:opacity-60"
                  style={{
                    backgroundColor: "var(--color-accent)",
                    color: "var(--color-bg)",
                  }}
                >
                  <FloppyDisk size={12} />
                  {isPending ? "Saving..." : "Save theme"}
                </button>
                {saveResult?.slug && (
                  <p className="text-center text-xs" style={{ color: "var(--color-success)" }}>
                    Saved as &ldquo;{saveResult.slug}&rdquo;
                  </p>
                )}
                {saveResult?.error && (
                  <p className="text-center text-xs" style={{ color: "var(--color-error)" }}>
                    {saveResult.error}
                  </p>
                )}
              </div>
            ) : (
              <p className="text-center text-xs" style={{ color: "var(--color-text-3)" }}>
                Sign in to save and share your theme
              </p>
            )}
          </div>
        </aside>
      </div>
    </div>
  )
}

export default function ThemeStudioPage() {
  return (
    <Suspense>
      <ThemeStudioInner />
    </Suspense>
  )
}
