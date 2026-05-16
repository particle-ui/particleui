#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js"
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js"
import { z } from "zod"
import { fetchIndex, fetchComponent } from "./registry.js"

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
        (tier === "pro" && item.tier === "pro") ||
        (tier === "free" && item.tier !== "pro")
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
        `• **${r.name}**${r.tier === "pro" ? " [PRO]" : " [free]"} (${r.tier}) — ${r.description}`
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
    const result = await fetchComponent(framework, name)
    if (!result.ok)
      return { content: [{ type: "text", text: result.message }] }

    const item = result.item
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
      `  "url": "${process.env.PARTICLEUI_REGISTRY_URL ?? "https://particleui.dev/r"}/${framework}/{name}.json",`,
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

/* ── generate_layout ── */
server.tool(
  "generate_layout",
  "Generate a page layout from a prompt. Returns a list of ParticleUI blocks that compose the described page, plus a one-command install string.",
  {
    prompt: z.string().max(500).describe("Natural-language description of the page or UI"),
    framework: z.enum(["react", "vue", "svelte"]).default("react"),
  },
  async ({ prompt, framework }) => {
    const base = process.env.PARTICLEUI_REGISTRY_URL ?? "https://particleui.dev"
    const res = await fetch(`${base}/api/mcp/generate`, {
      method: "POST",
      headers: {
        ...(process.env.PARTICLEUI_TOKEN ? { Authorization: `Bearer ${process.env.PARTICLEUI_TOKEN}` } : {}),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    })
    if (res.status === 401)
      return { content: [{ type: "text", text: "Missing or invalid PARTICLEUI_TOKEN. Get a token at https://particleui.dev/dashboard" }] }
    if (!res.ok)
      return { content: [{ type: "text", text: `Generation failed: ${res.statusText}` }] }

    const data = (await res.json()) as { layout: { blocks: { component: string }[] }; installCmd: string }
    const blocks = data.layout?.blocks ?? []
    const installCmd = `npx shadcn add ${blocks.map((b) => `@particleui/${b.component}`).join(" ")}`
    const lines = [
      `## Generated layout for: "${prompt.slice(0, 60)}..."`,
      ``,
      `**Blocks (${blocks.length}):**`,
      blocks.map((b, i) => `${i + 1}. \`${b.component}\``).join("\n"),
      ``,
      `**Install all in one command:**`,
      `\`\`\`bash`,
      installCmd,
      `\`\`\``,
      ``,
      `**Preview in browser:** ${base}/generate`,
    ]
    return { content: [{ type: "text", text: lines.join("\n") }] }
  }
)

/* ── install_template ── */
server.tool(
  "install_template",
  "Get the install command for a full-page ParticleUI template. Templates are composed multi-section pages (landing, dashboard, auth, pricing, docs, blog).",
  {
    name: z.enum(["landing", "saas-dashboard", "auth", "pricing-page", "docs-site", "blog"]).describe("Template name"),
  },
  async ({ name }) => {
    const TEMPLATE_BLOCKS: Record<string, string[]> = {
      landing: ["hero-split", "logo-cloud", "feature-alternating", "stats", "testimonials", "pricing", "faq", "cta-section", "footer"],
      "saas-dashboard": ["dashboard-analytics", "stats"],
      auth: ["auth-sign-in", "auth-sign-up", "auth-forgot-password", "auth-verify-email"],
      "pricing-page": ["hero-centered", "pricing", "faq", "cta-section", "footer"],
      "docs-site": ["footer"],
      blog: ["newsletter", "footer"],
    }
    const blocks = TEMPLATE_BLOCKS[name] ?? []
    const installCmd = `npx shadcn add ${blocks.map((b) => `@particleui/${b}`).join(" ")}`
    const lines = [
      `## Template: ${name}`,
      ``,
      `**Blocks included (${blocks.length}):** ${blocks.join(", ")}`,
      ``,
      `**Install everything in one command:**`,
      `\`\`\`bash`,
      installCmd,
      `\`\`\``,
      ``,
      `**Docs:** https://particleui.dev/docs/templates/${name}`,
    ]
    return { content: [{ type: "text", text: lines.join("\n") }] }
  }
)

/* ── preview_theme ── */
server.tool(
  "preview_theme",
  "Generate a CSS theme snippet from OKLCH token values. Returns ready-to-paste CSS for globals.css and a shareable theme studio URL.",
  {
    bg: z.string().describe("Background color in OKLCH e.g. oklch(4% 0.005 60)").optional(),
    accent: z.string().describe("Accent/brand color in OKLCH").optional(),
    name: z.string().describe("Theme name").default("My Theme"),
  },
  async ({ bg, accent, name }) => {
    const safeBg = bg ?? "oklch(4% 0.005 60)"
    const safeAccent = accent ?? "oklch(96% 0.01 80)"
    const css = `.dark {
  --color-bg: ${safeBg};
  --color-accent: ${safeAccent};
  --color-accent-dim: ${safeAccent.replace(")", " / 0.08)")};
  --color-accent-border: ${safeAccent.replace(")", " / 0.18)")};
}

/* Apply to your globals.css .dark block */`
    const studioUrl = `https://particleui.dev/theme-studio`
    const lines = [
      `## Theme: ${name}`,
      ``,
      `\`\`\`css`,
      css,
      `\`\`\``,
      ``,
      `**Customize further:** ${studioUrl}`,
      `**Install a community theme:** \`npx shadcn add https://particleui.dev/r/themes/<slug>.json\``,
    ]
    return { content: [{ type: "text", text: lines.join("\n") }] }
  }
)

const transport = new StdioServerTransport()
await server.connect(transport)
