#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js"
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js"
import { z } from "zod"

const BASE = process.env.PARTICLEUI_REGISTRY_URL ?? "https://particleui.dev/r"
const TOKEN = process.env.PARTICLEUI_TOKEN

function headers(): Record<string, string> {
  return TOKEN
    ? { Authorization: `Bearer ${TOKEN}`, Accept: "application/vnd.shadcn.v1+json" }
    : { Accept: "application/vnd.shadcn.v1+json" }
}

type IndexItem = {
  name: string; type: string; title: string
  description: string; categories: string[]
}

async function fetchIndex(fw: string): Promise<IndexItem[]> {
  const res = await fetch(`${BASE}/${fw}/index.json`)
  if (!res.ok) return []
  return res.json()
}

const server = new McpServer({ name: "particleui", version: "0.1.0" })

/* ── search_components ── */
server.tool(
  "search_components",
  "Search ParticleUI components by name, category (buttons, cards, hero, animations, backgrounds, text), or tier (free/pro).",
  {
    query: z.string().describe("Search term"),
    framework: z.enum(["react", "vue", "svelte"]).default("react"),
    tier: z.enum(["free", "pro", "all"]).default("all"),
  },
  async ({ query, framework, tier }) => {
    const index = await fetchIndex(framework)
    const q = query.toLowerCase()
    const results = index.filter((item) => {
      const matchesTier =
        tier === "all" ||
        (tier === "pro" && item.categories.includes("pro")) ||
        (tier === "free" && !item.categories.includes("pro"))
      const matchesQuery =
        item.name.includes(q) ||
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.categories.some((c) => c.includes(q))
      return matchesTier && matchesQuery
    })

    if (!results.length)
      return { content: [{ type: "text", text: `No components matched "${query}".` }] }

    const lines = results.map(
      (r) =>
        `• **${r.name}**${r.categories.includes("pro") ? " [PRO]" : " [free]"} — ${r.description}`
    )
    return {
      content: [{ type: "text", text: `Found ${results.length}:\n\n${lines.join("\n")}` }],
    }
  }
)

/* ── get_component ── */
server.tool(
  "get_component",
  "Fetch full details for a single ParticleUI component including props and source.",
  {
    name: z.string().describe("Component name e.g. particle-hero"),
    framework: z.enum(["react", "vue", "svelte"]).default("react"),
  },
  async ({ name, framework }) => {
    const res = await fetch(`${BASE}/${framework}/${name}.json`, { headers: headers() })
    if (res.status === 401)
      return {
        content: [{
          type: "text",
          text: `**${name}** is a Pro component. Add your PARTICLEUI_TOKEN to the MCP environment:\n\`\`\`\nPARTICLEUI_TOKEN=your-token claude mcp add @particleui/mcp\n\`\`\`\nGet a token at https://particleui.dev/dashboard`,
        }],
      }
    if (!res.ok)
      return { content: [{ type: "text", text: `Component "${name}" not found.` }] }

    const item = await res.json()
    const isPro = item.categories?.includes("pro")
    const mainFile = item.files?.find((f: { type: string }) => f.type !== "registry:file")

    const lines = [
      `# ${item.title}${isPro ? " [PRO]" : " [free]"}`,
      ``,
      item.description,
      ``,
      `## Install`,
      `\`\`\`bash`,
      `npx shadcn add @particleui/${item.name}`,
      `\`\`\``,
    ]

    if (item.dependencies?.length)
      lines.push(``, `## npm dependencies`, item.dependencies.map((d: string) => `- ${d}`).join("\n"))

    if (item.registryDependencies?.length)
      lines.push(``, `## Registry dependencies`, item.registryDependencies.join(", "))

    if (mainFile?.content) {
      lines.push(``, `## Source`, `\`\`\`tsx`, mainFile.content, `\`\`\``)
    }

    return { content: [{ type: "text", text: lines.join("\n") }] }
  }
)

/* ── get_install_config ── */
server.tool(
  "get_install_config",
  "Get the components.json registry config snippet to add ParticleUI to a project.",
  { framework: z.enum(["react", "vue", "svelte"]).default("react") },
  async ({ framework }) => {
    const text = [
      `Add to your **components.json** under \`"registries"\`:`,
      `\`\`\`json`,
      `"@particleui": {`,
      `  "url": "${BASE}/${framework}/{name}.json",`,
      `  "headers": { "Authorization": "Bearer \${PARTICLEUI_TOKEN}" }`,
      `}`,
      `\`\`\``,
      ``,
      `Add to your **.env**:`,
      `\`\`\``,
      `PARTICLEUI_TOKEN=your-token-here`,
      `\`\`\``,
      ``,
      `Get a token at https://particleui.dev/dashboard`,
    ].join("\n")
    return { content: [{ type: "text", text }] }
  }
)

/* ── list_categories ── */
server.tool(
  "list_categories",
  "List all available component categories.",
  { framework: z.enum(["react", "vue", "svelte"]).default("react") },
  async ({ framework }) => {
    const index = await fetchIndex(framework)
    const cats = new Set(index.flatMap((i) => i.categories))
    return {
      content: [{
        type: "text",
        text: `Categories: ${[...cats].sort().join(", ")}`,
      }],
    }
  }
)

const transport = new StdioServerTransport()
await server.connect(transport)
