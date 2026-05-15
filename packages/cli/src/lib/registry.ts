const REGISTRY_BASE = process.env.PARTICLEUI_REGISTRY ?? "https://particleui.dev/r"
const TOKEN = process.env.PARTICLEUI_TOKEN

function authHeaders(): Record<string, string> {
  const h: Record<string, string> = { Accept: "application/json" }
  if (TOKEN) h["Authorization"] = `Bearer ${TOKEN}`
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

export async function fetchIndex(framework: string): Promise<IndexItem[]> {
  const res = await fetch(`${REGISTRY_BASE}/${framework}/index.json`)
  if (!res.ok) throw new Error(`Failed to fetch registry index: ${res.statusText}`)
  const data = await res.json() as { items?: IndexItem[] } | IndexItem[]
  return Array.isArray(data) ? data : (data.items ?? [])
}

export async function fetchComponent(framework: string, name: string): Promise<RegistryItem> {
  const res = await fetch(`${REGISTRY_BASE}/${framework}/${name}.json`, {
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
