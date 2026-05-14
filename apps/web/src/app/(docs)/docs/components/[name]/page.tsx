import { promises as fs } from "fs"
import path from "path"
import { notFound } from "next/navigation"
import Link from "next/link"
import { Sparkle } from "@phosphor-icons/react/dist/ssr"
import type { Metadata } from "next"
import { ComponentTabs } from "../../../_components/component-tabs"
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
  const index = JSON.parse(await fs.readFile(p, "utf-8"))
  return index.map((i: { name: string }) => ({ name: i.name }))
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
  const installCmd = `npx shadcn add @particleui/${item.name}`

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-2 text-xs text-[#333]">
        <Link href="/docs" className="hover:text-[#666] transition-colors">Docs</Link>
        <span>/</span>
        <Link href="/docs" className="hover:text-[#666] transition-colors">Components</Link>
        <span>/</span>
        <span className="text-[#555]">{item.title}</span>
      </nav>

      {/* Title */}
      <div className="mb-2 flex items-center gap-3">
        <h1 className="text-3xl font-bold tracking-[-0.03em]">{item.title}</h1>
        {isPro && (
          <span className="inline-flex items-center gap-1 rounded-full border border-[rgba(0,212,255,0.3)] bg-[rgba(0,212,255,0.08)] px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest text-[#00d4ff]">
            <Sparkle size={8} weight="fill" />Pro
          </span>
        )}
      </div>
      <p className="mb-8 text-[#555] leading-relaxed">{item.description}</p>

      {/* Pro notice */}
      {isPro && (
        <div className="mb-8 rounded-xl border border-[rgba(0,212,255,0.15)] bg-[rgba(0,212,255,0.04)] px-4 py-3 flex items-start gap-3">
          <Sparkle size={14} weight="fill" className="text-[#00d4ff] mt-0.5 shrink-0" />
          <p className="text-sm text-[#555]">
            Pro component — requires an active license.{" "}
            <Link href="/pricing" className="text-[#00d4ff] hover:underline">
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
              <p className="text-xs text-[#333]">No preview available</p>
            )}
            code={mainFile.content}
          />
        </div>
      )}

      {/* Installation */}
      <section className="mb-10">
        <h2 className="mb-4 text-lg font-semibold tracking-tight">Installation</h2>

        {isPro && (
          <Step n={1} title="Set up your token">
            <p className="text-sm text-[#555] mb-3">
              Add your ParticleUI token to <code className="text-[#888] bg-white/[0.04] rounded px-1.5 py-0.5 text-xs">.env</code>:
            </p>
            <CodeBlock code={`PARTICLEUI_TOKEN=your-token-here`} />
          </Step>
        )}

        <Step n={isPro ? 2 : 1} title="Add the registry">
          <p className="text-sm text-[#555] mb-3">
            Add <code className="text-[#888] bg-white/[0.04] rounded px-1.5 py-0.5 text-xs">@particleui</code> to{" "}
            <code className="text-[#888] bg-white/[0.04] rounded px-1.5 py-0.5 text-xs">components.json</code>:
          </p>
          <CodeBlock
            code={`"registries": {
  "@particleui": {
    "url": "https://particleui.dev/r/react/{name}.json",
    "headers": { "Authorization": "Bearer \${PARTICLEUI_TOKEN}" }
  }
}`}
          />
        </Step>

        <Step n={isPro ? 3 : 2} title="Run the CLI">
          <CodeBlock code={installCmd} />
        </Step>
      </section>

      {/* Usage */}
      {mainFile?.content && (
        <section className="mb-10">
          <h2 className="mb-4 text-lg font-semibold tracking-tight">Usage</h2>
          <CodeBlock
            code={generateUsage(item)}
          />
        </section>
      )}

      {/* About */}
      <section className="mb-10">
        <h2 className="mb-4 text-lg font-semibold tracking-tight">Details</h2>
        <div className="divide-y divide-white/[0.05] rounded-xl border border-white/[0.07] overflow-hidden">
          {[
            ["Source file", mainFile?.path ?? "—"],
            ["Type", item.type.replace("registry:", "")],
            ["Categories", item.categories.filter((c) => c !== "pro" && c !== "free").join(", ") || "—"],
            ["npm dependencies", item.dependencies?.join(", ") ?? "—"],
            ["Registry deps", item.registryDependencies?.join(", ") ?? "—"],
            ["Claude skill", item.files.some((f) => f.type === "registry:file") ? "Bundled — installs to ~/.claude/skills/" : "—"],
          ].map(([label, value]) => (
            <div key={label as string} className="flex items-center gap-4 bg-[#0a0a0a] px-4 py-3">
              <span className="w-36 shrink-0 text-xs text-[#444]">{label}</span>
              <span className="font-mono text-xs text-[#777]">{value}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

function Step({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <div className="mb-6 flex gap-4">
      <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-white/[0.1] text-xs font-bold text-[#555]">
        {n}
      </div>
      <div className="flex-1">
        <h3 className="text-sm font-semibold mb-3">{title}</h3>
        {children}
      </div>
    </div>
  )
}

function CodeBlock({ code }: { code: string }) {
  return (
    <div className="rounded-xl border border-white/[0.07] bg-[#0a0a0a] overflow-hidden">
      <pre className="overflow-x-auto p-4 text-xs leading-6 text-[#00d4ff]">
        <code>{code}</code>
      </pre>
    </div>
  )
}

function generateUsage(item: RegistryItem): string {
  const mainFile = item.files.find((f) => f.type !== "registry:file")
  if (!mainFile) return ""
  const importPath = mainFile.path.replace(".tsx", "").replace("components/", "@/components/")
  const componentName = item.title.replace(/\s+/g, "")
  return `import { ${componentName} } from "${importPath}"

export default function Example() {
  return <${componentName} />
}`
}
