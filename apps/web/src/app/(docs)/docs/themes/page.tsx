import { promises as fs } from "fs"
import path from "path"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Themes",
  description: "Starter themes for ParticleUI — drop-in OKLCH token overrides for your globals.css.",
}

interface ThemeItem {
  name: string
  title: string
  description: string
  tier: string
  cssVars?: {
    dark?: Record<string, string>
    light?: Record<string, string>
  }
}

async function getThemes(): Promise<ThemeItem[]> {
  try {
    const p = path.join(process.cwd(), "public/r/react/index.json")
    const data = JSON.parse(await fs.readFile(p, "utf-8"))
    const items: ThemeItem[] = Array.isArray(data) ? data : (data.items ?? [])
    return items.filter((i) => i.tier === "themes")
  } catch {
    return []
  }
}

const THEME_ACCENT_PREVIEW: Record<string, { dark: string; light: string }> = {
  slate: { dark: "oklch(62% 0.17 250)", light: "oklch(40% 0.17 250)" },
  rose:  { dark: "oklch(70% 0.22 15)",  light: "oklch(42% 0.20 15)"  },
  mono:  { dark: "oklch(92% 0 0)",      light: "oklch(15% 0 0)"      },
}

export default async function ThemesPage() {
  const themes = await getThemes()

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <nav className="mb-6 flex items-center gap-2 text-xs text-text-2">
        <Link href="/docs" className="hover:text-text-1 transition-colors">Docs</Link>
        <span className="opacity-40">/</span>
        <span className="text-text-2">Themes</span>
      </nav>

      <h1 className="text-[2rem] font-semibold tracking-[-0.02em] leading-[1.2] text-[var(--color-text-1)] mb-3">
        Themes
      </h1>
      <p className="text-text-2 text-[15px] leading-[1.75] mb-3">
        Starter themes for ParticleUI — each is a set of OKLCH token overrides for your{" "}
        <code className="text-[var(--color-text-2)] bg-[var(--color-surface-2)] rounded px-1.5 py-0.5 text-xs">
          globals.css
        </code>
        . Install via the CLI or copy the CSS directly.
      </p>
      <p className="text-text-2 text-[15px] leading-relaxed mb-10">
        The default ParticleUI palette is warm espresso dark with cream accents. These themes
        swap out the accent hue and surface tint — all semantic tokens (success, error, warning, info)
        stay the same.
      </p>

      <div className="grid gap-4">
        {themes.map((theme) => {
          const preview = THEME_ACCENT_PREVIEW[theme.name]
          const installCmd = `npx particleui-cli add ${theme.name}`
          return (
            <Link
              key={theme.name}
              href={`/docs/themes/${theme.name}`}
              className="group flex items-center gap-5 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-1)] px-5 py-4 hover:border-[var(--color-border-hover)] hover:bg-[var(--color-surface-2)] transition-colors duration-150"
            >
              {/* Color swatch — dark + light pair */}
              {preview && (
                <div className="flex shrink-0 gap-1.5">
                  <div
                    className="w-7 h-7 rounded-lg border border-[var(--color-border)]"
                    style={{ background: preview.dark }}
                    title="Dark accent"
                  />
                  <div
                    className="w-7 h-7 rounded-lg border border-[var(--color-border)]"
                    style={{ background: preview.light }}
                    title="Light accent"
                  />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="font-semibold text-[var(--color-text-1)]">{theme.title}</span>
                  <span className="text-xs font-mono text-text-2 bg-[var(--color-surface-2)] border border-[var(--color-border)] rounded px-1.5 py-0.5">
                    free
                  </span>
                </div>
                <p className="text-[15px] text-text-2 truncate">{theme.description}</p>
              </div>
              <code className="hidden sm:block text-xs font-mono text-text-2 bg-[var(--color-surface-2)] border border-[var(--color-border)] rounded px-2 py-1 shrink-0 max-w-[220px] truncate">
                {installCmd}
              </code>
            </Link>
          )
        })}
      </div>

      {themes.length === 0 && (
        <p className="text-[15px] text-text-3">No themes found — run the registry builder first.</p>
      )}

      {/* How it works */}
      <section className="mt-12 border-t border-[var(--color-border)] pt-10">
        <h2 className="text-xl font-semibold tracking-[-0.01em] text-[var(--color-text-1)] mb-4">How themes work</h2>
        <ol className="space-y-6">
          {[
            {
              n: 1,
              title: "Install via CLI",
              body: "Run the install command shown on the theme page. It writes a CSS file to your project and optionally imports it.",
              code: "npx particleui-cli add slate",
            },
            {
              n: 2,
              title: "Or copy the CSS",
              body: "Open the theme page, copy the CSS block, and paste it into your globals.css — replacing or extending the existing .dark and .light overrides.",
              code: null,
            },
            {
              n: 3,
              title: "Customize further",
              body: "Use the Theme Generator to fine-tune any OKLCH value. All components derive from the same token system, so changing one token recolors everything.",
              code: null,
            },
          ].map(({ n, title, body, code }) => (
            <li key={n} className="flex gap-4">
              <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[var(--color-border)] text-xs font-bold text-text-3">
                {n}
              </div>
              <div>
                <h3 className="font-semibold text-[var(--color-text-1)] mb-1">{title}</h3>
                <p className="text-[15px] text-text-2">{body}</p>
                {code && (
                  <code className="mt-2 block text-xs font-mono text-text-2 bg-[var(--color-surface-2)] border border-[var(--color-border)] rounded-lg px-3 py-2">
                    {code}
                  </code>
                )}
              </div>
            </li>
          ))}
        </ol>
      </section>
    </div>
  )
}
