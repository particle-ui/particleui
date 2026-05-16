const BASE = process.env.PARTICLEUI_REGISTRY_URL ?? "https://particleui.dev/r"
const TOKEN = process.env.PARTICLEUI_TOKEN

function authHeaders(): Record<string, string> {
  return TOKEN
    ? { Authorization: `Bearer ${TOKEN}`, Accept: "application/vnd.shadcn.v1+json" }
    : { Accept: "application/vnd.shadcn.v1+json" }
}

export type IndexItem = {
  name: string
  tier: string
  title: string
  description: string
  categories: string[]
  dependencies: string[]
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
  const res = await fetch(`${BASE}/${framework}/index.json`)
  if (!res.ok) return []
  const data = await res.json()
  return Array.isArray(data) ? data : (data.items ?? [])
}

export async function fetchComponent(
  framework: string,
  name: string,
): Promise<{ ok: true; item: RegistryItem } | { ok: false; status: number; message: string }> {
  const res = await fetch(`${BASE}/${framework}/${name}.json`, { headers: authHeaders() })

  if (res.status === 401) {
    return {
      ok: false,
      status: 401,
      message:
        `**${name}** is a Pro component. Add your PARTICLEUI_TOKEN to the MCP environment:\n` +
        "```\nPARTICLEUI_TOKEN=your-token claude mcp add @particleui/mcp\n```\n" +
        "Get a token at https://particleui.dev/dashboard",
    }
  }

  if (!res.ok) {
    return { ok: false, status: res.status, message: `Component "${name}" not found.` }
  }

  return { ok: true, item: await res.json() }
}
