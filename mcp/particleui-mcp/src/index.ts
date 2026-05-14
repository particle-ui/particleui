#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js"
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js"
import { z } from "zod"

const REGISTRY_BASE = process.env.PARTICLEUI_REGISTRY_URL ?? "https://particleui.dev/r"

const server = new McpServer({
  name: "particleui",
  version: "0.1.0",
})

// Tool: search available components
server.tool(
  "search_components",
  "Search ParticleUI components by name, category, or description",
  {
    query: z.string().describe("Search term — component name, category (buttons, cards, hero, pro), or keyword"),
    framework: z.enum(["react", "vue", "svelte"]).default("react"),
    tier: z.enum(["free", "pro", "all"]).default("all"),
  },
  async ({ query, framework, tier }) => {
    const indexUrl = `${REGISTRY_BASE}/${framework}/index.json`
    try {
      const res = await fetch(indexUrl)
      if (!res.ok) {
        return { content: [{ type: "text", text: `Failed to fetch registry: ${res.status}` }] }
      }
      const index: Array<{ name: string; title: string; description: string; categories: string[] }> =
        await res.json()

      const q = query.toLowerCase()
      const results = index.filter((item) => {
        const matchesTier =
          tier === "all" ||
          (tier === "pro" && item.categories?.includes("pro")) ||
          (tier === "free" && !item.categories?.includes("pro"))
        const matchesQuery =
          item.name.includes(q) ||
          item.title?.toLowerCase().includes(q) ||
          item.description?.toLowerCase().includes(q) ||
          item.categories?.some((c) => c.includes(q))
        return matchesTier && matchesQuery
      })

      if (results.length === 0) {
        return { content: [{ type: "text", text: `No components matched "${query}".` }] }
      }

      const lines = results.map(
        (r) =>
          `• **${r.name}**${r.categories?.includes("pro") ? " [PRO]" : ""} — ${r.description ?? r.title}`
      )
      return {
        content: [
          {
            type: "text",
            text: `Found ${results.length} component(s):\n\n${lines.join("\n")}`,
          },
        ],
      }
    } catch (e) {
      return { content: [{ type: "text", text: `Error: ${String(e)}` }] }
    }
  }
)

// Tool: get install command for a component
server.tool(
  "get_install_command",
  "Get the npx shadcn install command for a ParticleUI component",
  {
    name: z.string().describe("Component name, e.g. particle-hero or glow-button"),
    framework: z.enum(["react", "vue", "svelte"]).default("react"),
  },
  async ({ name, framework }) => {
    const isPro = await checkIsPro(name, framework)
    const namespace = `@particleui/${name}`

    if (isPro) {
      return {
        content: [
          {
            type: "text",
            text: [
              `**${name}** is a Pro component. To install:`,
              "",
              "1. Add to your `.env`:",
              "   ```",
              "   PARTICLEUI_TOKEN=your-token-here",
              "   ```",
              "",
              "2. Add to `components.json` under `registries`:",
              "   ```json",
              '   "@particleui": {',
              `     "url": "${REGISTRY_BASE}/${framework}/{name}.json",`,
              '     "headers": { "Authorization": "Bearer ${PARTICLEUI_TOKEN}" }',
              "   }",
              "   ```",
              "",
              "3. Install:",
              `   \`\`\`bash`,
              `   npx shadcn add ${namespace}`,
              `   \`\`\``,
              "",
              "Get a token at https://particleui.dev/dashboard",
            ].join("\n"),
          },
        ],
      }
    }

    return {
      content: [
        {
          type: "text",
          text: [
            `Install **${name}** (free):`,
            "",
            "Add to `components.json` under `registries`:",
            "```json",
            '"@particleui": {',
            `  "url": "${REGISTRY_BASE}/${framework}/{name}.json"`,
            "}",
            "```",
            "",
            "Then install:",
            "```bash",
            `npx shadcn add ${namespace}`,
            "```",
          ].join("\n"),
        },
      ],
    }
  }
)

async function checkIsPro(name: string, framework: string): Promise<boolean> {
  try {
    const res = await fetch(`${REGISTRY_BASE}/${framework}/${name}.json`)
    if (!res.ok) return false
    const item = await res.json()
    return item.categories?.includes("pro") ?? false
  } catch {
    return false
  }
}

const transport = new StdioServerTransport()
await server.connect(transport)
