import { promises as fs } from "fs"
import path from "path"
import type { Metadata } from "next"
import { SandboxClient } from "./sandbox-client"

export async function generateStaticParams() {
  const p = path.join(process.cwd(), "public/r/react/index.json")
  const data = JSON.parse(await fs.readFile(p, "utf-8"))
  const items: { name: string; tier?: string }[] = Array.isArray(data) ? data : (data.items ?? [])
  return items.filter((i) => i.tier !== "themes").map((i) => ({ component: i.name }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ component: string }>
}): Promise<Metadata> {
  const { component } = await params
  return {
    title: `${component} — Sandbox`,
    robots: { index: false },
  }
}

export default async function SandboxPage({
  params,
}: {
  params: Promise<{ component: string }>
}) {
  const { component } = await params
  return <SandboxClient name={component} />
}
