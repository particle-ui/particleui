"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Check, Copy, RotateCcw } from "lucide-react"

interface Token {
  key: string
  label: string
  description: string
  defaultL: number
  defaultC: number
  defaultH: number
  isAlpha?: boolean
  defaultA?: number
}

const TOKENS: Token[] = [
  { key: "--color-accent", label: "Accent", description: "Primary brand color — buttons, focus rings, links", defaultL: 78, defaultC: 0.17, defaultH: 200 },
  { key: "--color-bg", label: "Background", description: "Page background color", defaultL: 5, defaultC: 0.004, defaultH: 265 },
  { key: "--color-surface-1", label: "Surface 1", description: "Card and panel backgrounds", defaultL: 8, defaultC: 0.004, defaultH: 265 },
  { key: "--color-surface-2", label: "Surface 2", description: "Elevated surfaces and hover states", defaultL: 11, defaultC: 0.004, defaultH: 265 },
  { key: "--color-text-1", label: "Text Primary", description: "Headings and critical UI text", defaultL: 97, defaultC: 0, defaultH: 0 },
  { key: "--color-text-2", label: "Text Secondary", description: "Body copy and descriptions", defaultL: 70, defaultC: 0, defaultH: 0 },
]

function oklchToCSS(l: number, c: number, h: number, a?: number) {
  if (a !== undefined) return `oklch(${l}% ${c} ${h} / ${a})`
  return `oklch(${l}% ${c} ${h})`
}

function generateCSS(values: Record<string, { l: number; c: number; h: number }>) {
  const lines = Object.entries(values).map(([key, { l, c, h }]) => `  ${key}: oklch(${l}% ${c.toFixed(3)} ${h});`)
  const derived = [
    `  --color-surface-3: oklch(${Math.min(100, (values["--color-surface-2"]?.l ?? 11) + 3)}% ${(values["--color-surface-2"]?.c ?? 0.004).toFixed(3)} ${values["--color-surface-2"]?.h ?? 265});`,
    `  --color-border: oklch(100% 0 0 / 0.07);`,
    `  --color-border-hover: oklch(100% 0 0 / 0.14);`,
    `  --color-accent-dim: ${oklchToCSS(values["--color-accent"]?.l ?? 78, values["--color-accent"]?.c ?? 0.17, values["--color-accent"]?.h ?? 200, 0.10)};`,
    `  --color-accent-border: ${oklchToCSS(values["--color-accent"]?.l ?? 78, values["--color-accent"]?.c ?? 0.17, values["--color-accent"]?.h ?? 200, 0.25)};`,
    `  --color-accent-text: oklch(${Math.min(100, (values["--color-accent"]?.l ?? 78) + 7)}% ${Math.max(0, (values["--color-accent"]?.c ?? 0.17) - 0.05).toFixed(3)} ${values["--color-accent"]?.h ?? 200});`,
    `  --color-text-3: oklch(${Math.round((values["--color-text-2"]?.l ?? 70) * 0.69)}% 0 0);`,
    `  --color-text-4: oklch(${Math.round((values["--color-text-2"]?.l ?? 70) * 0.43)}% 0 0);`,
  ]
  return `@layer base {\n  :root {\n${lines.join("\n")}\n${derived.join("\n")}\n  }\n}`
}

function initValues(): Record<string, { l: number; c: number; h: number }> {
  return Object.fromEntries(TOKENS.map((t) => [t.key, { l: t.defaultL, c: t.defaultC, h: t.defaultH }]))
}

export default function ThemingPage() {
  const [values, setValues] = React.useState(initValues)
  const [copied, setCopied] = React.useState(false)
  const previewRef = React.useRef<HTMLDivElement>(null)

  const set = (key: string, field: "l" | "c" | "h", val: number) => {
    setValues((prev) => ({ ...prev, [key]: { ...prev[key], [field]: val } }))
  }

  // Apply tokens as CSS custom properties on the preview div
  React.useEffect(() => {
    const el = previewRef.current
    if (!el) return
    for (const [key, { l, c, h }] of Object.entries(values)) {
      el.style.setProperty(key, `oklch(${l}% ${c} ${h})`)
    }
    // Derived
    const acc = values["--color-accent"] ?? { l: 78, c: 0.17, h: 200 }
    const s2 = values["--color-surface-2"] ?? { l: 11, c: 0.004, h: 265 }
    const t2 = values["--color-text-2"] ?? { l: 70, c: 0, h: 0 }
    el.style.setProperty("--color-surface-3", `oklch(${Math.min(100, s2.l + 3)}% ${s2.c} ${s2.h})`)
    el.style.setProperty("--color-accent-dim", `oklch(${acc.l}% ${acc.c} ${acc.h} / 0.10)`)
    el.style.setProperty("--color-accent-border", `oklch(${acc.l}% ${acc.c} ${acc.h} / 0.25)`)
    el.style.setProperty("--color-accent-text", `oklch(${Math.min(100, acc.l + 7)}% ${Math.max(0, acc.c - 0.05)} ${acc.h})`)
    el.style.setProperty("--color-text-3", `oklch(${Math.round(t2.l * 0.69)}% 0 0)`)
    el.style.setProperty("--color-text-4", `oklch(${Math.round(t2.l * 0.43)}% 0 0)`)
    el.style.setProperty("--color-border", "oklch(100% 0 0 / 0.07)")
    el.style.setProperty("--color-border-hover", "oklch(100% 0 0 / 0.14)")
  }, [values])

  const css = generateCSS(values)

  const copy = () => {
    navigator.clipboard.writeText(css)
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }

  const reset = () => setValues(initValues())

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <nav className="mb-6 flex items-center gap-2 text-xs text-[var(--color-text-4)]">
        <span>Docs</span><span>/</span>
        <span>Getting Started</span><span>/</span>
        <span className="text-[var(--color-text-3)]">Theming</span>
      </nav>

      <h1 className="text-3xl font-bold tracking-tight mb-2">Theme Generator</h1>
      <p className="text-[var(--color-text-3)] mb-10 leading-relaxed">
        Adjust the OKLCH tokens below. The preview updates live. When you're happy, copy the CSS and paste it into your <code className="text-[var(--color-text-2)] bg-[var(--color-surface-2)] rounded px-1.5 py-0.5 text-xs">globals.css</code>.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Controls */}
        <div className="flex flex-col gap-6">
          {TOKENS.map((token) => {
            const val = values[token.key]
            return (
              <div key={token.key} className="flex flex-col gap-3 p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-1)]">
                <div className="flex items-center gap-3">
                  <div
                    className="w-5 h-5 rounded-full border border-[var(--color-border)] shrink-0"
                    style={{ background: `oklch(${val.l}% ${val.c} ${val.h})` }}
                  />
                  <div>
                    <div className="text-sm font-semibold text-[var(--color-text-1)]">{token.label}</div>
                    <div className="text-[10px] text-[var(--color-text-4)] font-mono">{token.key}</div>
                  </div>
                </div>
                <p className="text-xs text-[var(--color-text-3)]">{token.description}</p>

                <div className="grid grid-cols-3 gap-3">
                  <div className="flex flex-col gap-1.5">
                    <Label className="text-[10px] text-[var(--color-text-4)] uppercase tracking-widest">Lightness</Label>
                    <div className="flex items-center gap-2">
                      <Slider
                        value={[val.l]}
                        onValueChange={([v]) => set(token.key, "l", v)}
                        min={0} max={100} step={1}
                        className="flex-1"
                      />
                      <span className="text-[10px] font-mono text-[var(--color-text-3)] w-8 text-right">{val.l}%</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label className="text-[10px] text-[var(--color-text-4)] uppercase tracking-widest">Chroma</Label>
                    <div className="flex items-center gap-2">
                      <Slider
                        value={[val.c * 1000]}
                        onValueChange={([v]) => set(token.key, "c", v / 1000)}
                        min={0} max={400} step={1}
                        className="flex-1"
                      />
                      <span className="text-[10px] font-mono text-[var(--color-text-3)] w-8 text-right">{val.c.toFixed(2)}</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label className="text-[10px] text-[var(--color-text-4)] uppercase tracking-widest">Hue</Label>
                    <div className="flex items-center gap-2">
                      <Slider
                        value={[val.h]}
                        onValueChange={([v]) => set(token.key, "h", v)}
                        min={0} max={360} step={1}
                        className="flex-1"
                      />
                      <span className="text-[10px] font-mono text-[var(--color-text-3)] w-8 text-right">{val.h}°</span>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Preview + export */}
        <div className="flex flex-col gap-6 lg:sticky lg:top-6 lg:self-start">
          {/* Live preview */}
          <div
            ref={previewRef}
            className="rounded-xl border border-[var(--color-border)] overflow-hidden"
            style={{ background: `oklch(${values["--color-bg"]?.l ?? 5}% ${values["--color-bg"]?.c ?? 0.004} ${values["--color-bg"]?.h ?? 265})` }}
          >
            <div className="p-4 border-b border-[var(--color-border)] flex items-center gap-2">
              <span className="text-xs font-semibold text-[var(--color-text-1)]">Preview</span>
              <Badge variant="outline">Live</Badge>
            </div>
            <div className="p-5 flex flex-col gap-4">
              <div className="flex flex-wrap gap-2">
                <Button size="sm">Primary</Button>
                <Button size="sm" variant="outline">Outline</Button>
                <Button size="sm" variant="ghost">Ghost</Button>
              </div>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Sample Card</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-3">
                  <Input placeholder="Type something…" />
                  <div className="flex items-center gap-2">
                    <Switch id="demo-sw" />
                    <Label htmlFor="demo-sw" className="text-sm">Toggle me</Label>
                  </div>
                  <div className="flex gap-2">
                    <Badge>Default</Badge>
                    <Badge variant="outline">Outline</Badge>
                    <Badge variant="secondary">Secondary</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* CSS export */}
          <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-1)] overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--color-border)]">
              <span className="text-xs font-semibold text-[var(--color-text-3)]">globals.css</span>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" className="h-7 gap-1.5 text-xs" onClick={reset}>
                  <RotateCcw size={11} /> Reset
                </Button>
                <Button size="sm" className="h-7 gap-1.5 text-xs" onClick={copy}>
                  {copied ? <Check size={11} /> : <Copy size={11} />}
                  {copied ? "Copied!" : "Copy CSS"}
                </Button>
              </div>
            </div>
            <pre className="overflow-x-auto p-4 text-[10px] leading-5 font-mono text-[var(--color-text-3)] max-h-64">
              <code>{css}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  )
}
