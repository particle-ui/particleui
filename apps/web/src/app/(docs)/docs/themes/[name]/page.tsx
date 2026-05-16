import { promises as fs } from "fs"
import path from "path"
import { notFound } from "next/navigation"
import Link from "next/link"
import type { Metadata } from "next"
import { CodeBlock } from "@/components/code-block"

interface ThemeFile {
  path: string
  type: string
  content?: string
}

interface ThemeItem {
  name: string
  title: string
  description: string
  tier: string
  files: ThemeFile[]
  cssVars?: {
    dark?: Record<string, string>
    light?: Record<string, string>
  }
}

async function getTheme(name: string): Promise<ThemeItem | null> {
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
  return items.filter((i) => i.tier === "themes").map((i) => ({ name: i.name }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ name: string }>
}): Promise<Metadata> {
  const { name } = await params
  const theme = await getTheme(name)
  if (!theme) return { title: "Not found" }
  return { title: `${theme.title} Theme`, description: theme.description }
}

export default async function ThemeDetailPage({
  params,
}: {
  params: Promise<{ name: string }>
}) {
  const { name } = await params
  const theme = await getTheme(name)
  if (!theme) notFound()

  const cssFile = theme.files.find((f) => f.type === "registry:style")
  const cssContent = cssFile?.content ?? ""
  const installCmd = `npx particleui-cli add ${theme.name}`

  const darkVars = theme.cssVars?.dark ?? {}
  const lightVars = theme.cssVars?.light ?? {}

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <nav className="mb-8 flex items-center gap-1.5 text-[11px] text-[var(--color-text-4)]">
        <Link href="/docs" className="hover:text-[var(--color-text-2)] transition-colors">Docs</Link>
        <span className="opacity-40">/</span>
        <Link href="/docs/themes" className="hover:text-[var(--color-text-2)] transition-colors">Themes</Link>
        <span className="opacity-40">/</span>
        <span className="text-[var(--color-text-3)]">{theme.title}</span>
      </nav>

      <h1 className="text-[2rem] font-bold tracking-[-0.04em] leading-[1.15] text-[var(--color-text-1)] mb-3">
        {theme.title}
      </h1>
      <p className="text-[var(--color-text-3)] text-[0.9375rem] leading-[1.75] mb-10">
        {theme.description}
      </p>

      {/* Token preview swatches */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold tracking-[-0.03em] text-[var(--color-text-1)] mb-4">Token preview</h2>
        <div className="grid grid-cols-2 gap-4">
          {/* Dark */}
          <div className="rounded-xl border border-[var(--color-border)] overflow-hidden">
            <div className="px-3 py-2 border-b border-[var(--color-border)] bg-[var(--color-surface-1)]">
              <span className="text-[10px] font-semibold uppercase tracking-widest text-[var(--color-text-4)]">Dark</span>
            </div>
            <div
              className="p-4 flex flex-col gap-2"
              style={{ background: darkVars["--color-bg"] }}
            >
              {(["--color-surface-1", "--color-surface-2", "--color-accent"] as const).map((k) => (
                darkVars[k] ? (
                  <div key={k} className="flex items-center gap-3">
                    <div
                      className="w-6 h-6 rounded-md border shrink-0"
                      style={{
                        background: darkVars[k],
                        borderColor: darkVars["--color-border"] ?? "oklch(100% 0 0 / 0.07)",
                      }}
                    />
                    <code className="text-[10px] font-mono" style={{ color: darkVars["--color-text-3"] ?? "oklch(50% 0 0)" }}>
                      {k}
                    </code>
                  </div>
                ) : null
              ))}
            </div>
          </div>
          {/* Light */}
          <div className="rounded-xl border border-[var(--color-border)] overflow-hidden">
            <div className="px-3 py-2 border-b border-[var(--color-border)] bg-[var(--color-surface-1)]">
              <span className="text-[10px] font-semibold uppercase tracking-widest text-[var(--color-text-4)]">Light</span>
            </div>
            <div
              className="p-4 flex flex-col gap-2"
              style={{ background: lightVars["--color-bg"] }}
            >
              {(["--color-surface-1", "--color-surface-2", "--color-accent"] as const).map((k) => (
                lightVars[k] ? (
                  <div key={k} className="flex items-center gap-3">
                    <div
                      className="w-6 h-6 rounded-md border shrink-0"
                      style={{
                        background: lightVars[k],
                        borderColor: lightVars["--color-border"] ?? "oklch(0% 0 0 / 0.08)",
                      }}
                    />
                    <code className="text-[10px] font-mono" style={{ color: lightVars["--color-text-3"] ?? "oklch(45% 0 0)" }}>
                      {k}
                    </code>
                  </div>
                ) : null
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Installation */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold tracking-[-0.03em] text-[var(--color-text-1)] mb-5">Installation</h2>
        <div className="flex gap-4 mb-5">
          <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[var(--color-border)] text-[11px] font-bold text-[var(--color-text-3)]">
            1
          </div>
          <div className="flex-1">
            <h3 className="text-[0.9375rem] font-semibold tracking-[-0.01em] mb-2 text-[var(--color-text-1)]">Via CLI</h3>
            <p className="text-sm text-[var(--color-text-3)] mb-3">
              The CLI applies the theme tokens automatically:
            </p>
            <CodeBlock code={installCmd} />
          </div>
        </div>
        <div className="flex gap-4">
          <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[var(--color-border)] text-[11px] font-bold text-[var(--color-text-3)]">
            2
          </div>
          <div className="flex-1">
            <h3 className="text-[0.9375rem] font-semibold tracking-[-0.01em] mb-2 text-[var(--color-text-1)]">Or paste CSS</h3>
            <p className="text-sm text-[var(--color-text-3)] mb-3">
              Copy the CSS block below and paste it into your{" "}
              <code className="text-[var(--color-text-2)] bg-[var(--color-surface-2)] rounded px-1.5 py-0.5 text-xs">
                globals.css
              </code>
              , replacing the existing <code className="text-[var(--color-text-2)] bg-[var(--color-surface-2)] rounded px-1.5 py-0.5 text-xs">.dark</code> and{" "}
              <code className="text-[var(--color-text-2)] bg-[var(--color-surface-2)] rounded px-1.5 py-0.5 text-xs">.light</code> overrides.
            </p>
            {cssContent && <CodeBlock code={cssContent} lang="css" />}
          </div>
        </div>
      </section>

      <div className="flex items-center justify-between pt-6 border-t border-[var(--color-border)]">
        <Link href="/docs/themes" className="text-sm text-[var(--color-text-3)] hover:text-[var(--color-text-1)] transition-colors">
          ← All themes
        </Link>
        <Link href="/docs/getting-started/theming" className="text-sm text-[var(--color-text-3)] hover:text-[var(--color-text-1)] transition-colors">
          Theme Generator →
        </Link>
      </div>
    </div>
  )
}
