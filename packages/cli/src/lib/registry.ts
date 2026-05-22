import { readFile } from "node:fs/promises"

function registryBase(): string {
  return process.env.PARTICLEUI_REGISTRY ?? "https://particleui.dev/r"
}

function authHeaders(): Record<string, string> {
  const h: Record<string, string> = { Accept: "application/json" }
  if (process.env.PARTICLEUI_TOKEN) h["Authorization"] = `Bearer ${process.env.PARTICLEUI_TOKEN}`
  return h
}

export type IndexItem = {
  name: string
  title: string
  description: string
  categories: string[]
  tier: string
}

export type RegistryItem = {
  name: string
  type: string
  title: string
  description?: string
  categories: string[]
  dependencies?: string[]
  devDependencies?: string[]
  registryDependencies?: string[]
  files: { path: string; content: string; type: string }[]
}

function registryUrl(pathname: string): URL {
  const baseUrl = registryBase()
  const base = baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`
  return new URL(pathname, base)
}

async function readLocalRegistryJson<T>(url: URL, notFoundMessage: string): Promise<T> {
  try {
    return JSON.parse(await readFile(url, "utf-8")) as T
  } catch (error) {
    if (error instanceof SyntaxError) {
      throw error
    }
    throw new Error(notFoundMessage)
  }
}

export async function fetchIndex(framework: string): Promise<IndexItem[]> {
  const url = registryUrl(`${framework}/index.json`)
  if (url.protocol === "file:") {
    const data = await readLocalRegistryJson<{ items?: IndexItem[] } | IndexItem[]>(
      url,
      `Failed to fetch registry index: not found`
    )
    return Array.isArray(data) ? data : (data.items ?? [])
  }

  const res = await fetch(url)
  if (!res.ok) throw new Error(`Failed to fetch registry index: ${res.statusText}`)
  const data = await res.json() as { items?: IndexItem[] } | IndexItem[]
  return Array.isArray(data) ? data : (data.items ?? [])
}

export async function fetchComponent(framework: string, name: string): Promise<RegistryItem> {
  const url = registryUrl(`${framework}/${name}.json`)
  if (url.protocol === "file:") {
    return readLocalRegistryJson<RegistryItem>(
      url,
      `Component "${name}" not found. Run "particleui list" to see available components.`
    )
  }

  const res = await fetch(url, {
    headers: authHeaders(),
  })
  if (res.status === 401) {
    throw new Error(
      `"${name}" is a Pro component. Set PARTICLEUI_TOKEN in your environment:\n  export PARTICLEUI_TOKEN=your-token-here\n  Get a token at https://particleui.dev/dashboard`
    )
  }
  if (res.status === 404) {
    throw new Error(`Component "${name}" not found. Run "particleui list" to see available components.`)
  }
  if (!res.ok) {
    throw new Error(`Failed to fetch "${name}": ${res.statusText}`)
  }
  return res.json() as Promise<RegistryItem>
}
