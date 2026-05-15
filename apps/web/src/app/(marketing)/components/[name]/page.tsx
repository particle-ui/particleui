import { promises as fs } from "fs"
import path from "path"
import { redirect } from "next/navigation"
import type { Metadata } from "next"

interface RegistryItem {
  name: string
  title: string
  description: string
  categories: string[]
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
  const data = JSON.parse(await fs.readFile(p, "utf-8"))
  const items: { name: string; tier?: string }[] = Array.isArray(data) ? data : (data.items ?? [])
  return items.filter((i) => i.tier !== "themes").map((i) => i.name)
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
  redirect(`/docs/components/${name}`)
}
