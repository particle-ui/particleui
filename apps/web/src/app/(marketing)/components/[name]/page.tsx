import { promises as fs } from "fs"
import path from "path"
import { notFound } from "next/navigation"
import Link from "next/link"
import {
  ArrowLeft,
  Copy,
  Sparkle,
  ArrowSquareOut,
  Check,
} from "@phosphor-icons/react/dist/ssr"
import type { Metadata } from "next"
import { CopyButton } from "./_copy-button"

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

async function getItem(name: string): Promise<RegistryItem | null> {
  const p = path.join(process.cwd(), "public/r/react", `${name}.json`)
  try {
    return JSON.parse(await fs.readFile(p, "utf-8"))
  } catch {
    return null
  }
}

async function getAllNames(): Promise<string[]> {
  const p = path.join(process.cwd(), "public/r/react/index.json")
  const index = JSON.parse(await fs.readFile(p, "utf-8"))
  return index.map((i: { name: string }) => i.name)
}

export async function generateStaticParams() {
  const names = await getAllNames()
  return names.map((name) => ({ name }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ name: string }>
}): Promise<Metadata> {
  const { name } = await params
  const item = await getItem(name)
  if (!item) return { title: "Not found" }
  return { title: item.title, description: item.description }
}

export default async function ComponentPage({
  params,
}: {
  params: Promise<{ name: string }>
}) {
  const { name } = await params
  const item = await getItem(name)
  if (!item) notFound()

  const isPro = item.categories.includes("pro")
  const installCmd = `npx shadcn add @particleui/${item.name}`
  const sourceFile = item.files.find((f) => f.type !== "registry:file")
  const skillFile = item.files.find((f) => f.type === "registry:file")

  return (
    <main className="min-h-svh bg-[#030303] text-white pt-24 pb-20 px-6">
      <div className="mx-auto max-w-4xl">
        {/* Back */}
        <Link
          href="/components"
          className="mb-8 inline-flex items-center gap-2 text-sm text-[#444] hover:text-white transition-colors"
        >
          <ArrowLeft size={14} />
          All components
        </Link>

        {/* Header */}
        <div className="mb-10 flex items-start justify-between gap-6 flex-wrap">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <h1 className="text-4xl font-bold tracking-[-0.04em]">{item.title}</h1>
              {isPro ? (
                <span className="inline-flex items-center gap-1 rounded-full border border-[rgba(0,212,255,0.3)] bg-[rgba(0,212,255,0.08)] px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest text-[#00d4ff]">
                  <Sparkle size={8} weight="fill" />Pro
                </span>
              ) : (
                <span className="inline-flex rounded-full border border-white/[0.07] bg-white/[0.03] px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest text-[#333]">
                  Free
                </span>
              )}
            </div>
            <p className="text-[#555] max-w-xl">{item.description}</p>
          </div>
        </div>

        {/* Install */}
        <div className="mb-10 rounded-2xl border border-white/[0.07] bg-[#0a0a0a] overflow-hidden">
          <div className="flex items-center justify-between border-b border-white/[0.05] px-5 py-3">
            <span className="text-xs text-[#444]">Install</span>
            {isPro && (
              <span className="text-xs text-[#444]">
                Requires <code className="text-[#00d4ff]">PARTICLEUI_TOKEN</code>
              </span>
            )}
          </div>
          <div className="flex items-center justify-between px-5 py-4">
            <code className="font-mono text-sm text-[#00d4ff]">{installCmd}</code>
            <CopyButton text={installCmd} />
          </div>
        </div>

        {isPro && (
          <div className="mb-8 rounded-2xl border border-[rgba(0,212,255,0.15)] bg-[rgba(0,212,255,0.04)] px-5 py-4 flex items-start gap-3">
            <Sparkle size={16} weight="fill" className="text-[#00d4ff] mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-medium mb-0.5">Pro component</p>
              <p className="text-xs text-[#555]">
                Requires an active ParticleUI Pro license.{" "}
                <Link href="/pricing" className="text-[#00d4ff] hover:underline">
                  Get access →
                </Link>
              </p>
            </div>
          </div>
        )}

        {/* Metadata grid */}
        <div className="mb-10 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            ["Type", item.type.replace("registry:", "")],
            ["Categories", item.categories.filter((c) => c !== "pro" && c !== "free").join(", ") || "—"],
            ["npm deps", item.dependencies?.length ? item.dependencies.join(", ") : "—"],
            ["Claude skill", skillFile ? "Included" : "—"],
          ].map(([label, value]) => (
            <div key={label} className="rounded-xl border border-white/[0.06] bg-[#0a0a0a] p-4">
              <p className="text-[10px] uppercase tracking-widest text-[#333] mb-1">{label}</p>
              <p className="text-xs text-[#666] font-mono truncate">{value}</p>
            </div>
          ))}
        </div>

        {/* Source */}
        {sourceFile?.content && (
          <div className="rounded-2xl border border-white/[0.07] bg-[#0a0a0a] overflow-hidden">
            <div className="flex items-center justify-between border-b border-white/[0.05] px-5 py-3">
              <span className="font-mono text-xs text-[#444]">{sourceFile.path}</span>
              <CopyButton text={sourceFile.content} />
            </div>
            <pre className="overflow-x-auto p-5 text-xs leading-relaxed text-[#777] max-h-[480px]">
              <code>{sourceFile.content}</code>
            </pre>
          </div>
        )}
      </div>
    </main>
  )
}
