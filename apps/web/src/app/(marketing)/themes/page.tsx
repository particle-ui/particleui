import type { Metadata } from "next"
import Link from "next/link"
import { Nav } from "../_components/nav"

export const metadata: Metadata = {
  title: "Themes — ParticleUI",
  description: "Browse and customize ParticleUI themes. Open any theme in Theme Studio to preview, edit, and export.",
}

interface SeedTheme {
  name: string
  preset: string
  description: string
  swatches: {
    bg: string
    surface: string
    accent: string
    text: string
  }
}

const SEED_THEMES: SeedTheme[] = [
  {
    name: "Espresso",
    preset: "espresso",
    description: "Warm espresso-black. Rich depth without blue-gray coldness.",
    swatches: {
      bg: "oklch(4% 0.005 60)",
      surface: "oklch(8% 0.004 60)",
      accent: "oklch(96% 0.01 80)",
      text: "oklch(97% 0.005 80)",
    },
  },
  {
    name: "Ocean",
    preset: "ocean",
    description: "Deep blue-gray tones with cyan accents.",
    swatches: {
      bg: "oklch(6% 0.01 230)",
      surface: "oklch(10% 0.01 225)",
      accent: "oklch(72% 0.18 200)",
      text: "oklch(95% 0.005 200)",
    },
  },
  {
    name: "Forest",
    preset: "forest",
    description: "Dark green-tinted surfaces with emerald accents.",
    swatches: {
      bg: "oklch(5% 0.01 145)",
      surface: "oklch(9% 0.01 145)",
      accent: "oklch(65% 0.18 145)",
      text: "oklch(94% 0.005 145)",
    },
  },
  {
    name: "Cyber",
    preset: "cyber",
    description: "Near-black base with electric violet accents.",
    swatches: {
      bg: "oklch(4% 0.003 280)",
      surface: "oklch(8% 0.006 280)",
      accent: "oklch(70% 0.25 290)",
      text: "oklch(96% 0.005 290)",
    },
  },
  {
    name: "Solarized",
    preset: "solarized",
    description: "Warm cream light mode with orange accents.",
    swatches: {
      bg: "oklch(96% 0.02 85)",
      surface: "oklch(92% 0.018 85)",
      accent: "oklch(60% 0.18 55)",
      text: "oklch(20% 0.01 60)",
    },
  },
  {
    name: "Mono",
    preset: "mono",
    description: "Pure neutral grayscale. No chroma, maximum clarity.",
    swatches: {
      bg: "oklch(4% 0 0)",
      surface: "oklch(9% 0 0)",
      accent: "oklch(94% 0 0)",
      text: "oklch(96% 0 0)",
    },
  },
]

function ThemeCard({ theme }: { theme: SeedTheme }) {
  return (
    <div
      className="group flex flex-col overflow-hidden rounded-xl border transition-colors hover:border-border-hover"
      style={{ borderColor: "var(--color-border)" }}
    >
      {/* Swatch preview */}
      <div
        className="flex h-24 items-end gap-px overflow-hidden p-3"
        style={{ backgroundColor: theme.swatches.bg }}
      >
        <div className="flex gap-2">
          {/* bg swatch */}
          <div
            className="h-8 w-8 rounded-lg border"
            style={{
              backgroundColor: theme.swatches.bg,
              borderColor: "oklch(100% 0 0 / 0.15)",
            }}
            title="Background"
          />
          {/* surface swatch */}
          <div
            className="h-8 w-8 rounded-lg"
            style={{ backgroundColor: theme.swatches.surface }}
            title="Surface"
          />
          {/* accent swatch */}
          <div
            className="h-8 w-8 rounded-lg"
            style={{ backgroundColor: theme.swatches.accent }}
            title="Accent"
          />
          {/* text swatch */}
          <div
            className="h-8 w-8 rounded-lg"
            style={{ backgroundColor: theme.swatches.text }}
            title="Text"
          />
        </div>
      </div>

      {/* Info */}
      <div
        className="flex flex-1 flex-col gap-1 p-4"
        style={{ backgroundColor: "var(--color-surface-1)" }}
      >
        <h3 className="text-sm font-semibold text-text-1">{theme.name}</h3>
        <p className="flex-1 text-xs text-text-3">{theme.description}</p>
        <Link
          href={`/theme-studio?preset=${theme.preset}`}
          className="mt-3 flex items-center justify-center rounded-lg py-2 text-xs font-medium transition-all"
          style={{
            backgroundColor: "var(--color-surface-2)",
            color: "var(--color-text-2)",
            border: "1px solid var(--color-border)",
          }}
        >
          Open in Studio
        </Link>
      </div>
    </div>
  )
}

export default function ThemesPage() {
  return (
    <>
      <Nav />
      <main className="mx-auto max-w-5xl px-6 py-24">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="mb-3 text-4xl font-bold tracking-tight text-text-1">
            Themes
          </h1>
          <p className="text-base text-text-2">
            Browse community themes, or build your own in the interactive Theme Studio.
          </p>
          <Link
            href="/theme-studio"
            className="mt-6 inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition-opacity hover:opacity-90"
            style={{
              backgroundColor: "var(--color-accent)",
              color: "var(--color-bg)",
            }}
          >
            Open Theme Studio
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SEED_THEMES.map((theme) => (
            <ThemeCard key={theme.preset} theme={theme} />
          ))}
        </div>

        {/* Footer note */}
        <p className="mt-10 text-center text-xs text-text-4">
          Community themes coming soon. Save and publish your own from Theme Studio.
        </p>
      </main>
    </>
  )
}
