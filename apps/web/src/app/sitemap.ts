import type { MetadataRoute } from "next"
import { promises as fs } from "fs"
import path from "path"

const BASE = "https://particleui.dev"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const indexPath = path.join(process.cwd(), "public/r/react/index.json")
  const data = JSON.parse(await fs.readFile(indexPath, "utf-8"))
  const items: { name: string; tier?: string }[] = Array.isArray(data) ? data : (data.items ?? [])
  const now = new Date()

  const static_: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE}/components`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/pricing`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/docs`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/docs/getting-started/installation`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/docs/getting-started/components-json`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/docs/getting-started/theming`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/docs/getting-started/mcp`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
  ]

  const dynamic: MetadataRoute.Sitemap = items.filter((item) => item.tier !== "themes").map((item) => ({
    url: `${BASE}/docs/components/${item.name}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }))

  return [...static_, ...dynamic]
}
