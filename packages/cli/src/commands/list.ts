import { Command } from "commander"
import chalk from "chalk"
import { fetchIndex } from "../lib/registry.js"
import { detectFramework, readLocalConfig } from "../lib/project.js"

export const listCommand = new Command("list")
  .alias("ls")
  .description("List available ParticleUI components")
  .argument("[query]", "Search query to filter components")
  .option("-f, --framework <fw>", "Framework: react, vue, svelte")
  .option("-c, --category <cat>", "Filter by category")
  .option("--pro", "Show only Pro components")
  .option("--free", "Show only free components")
  .action(async (query: string | undefined, opts: { framework?: string; category?: string; pro?: boolean; free?: boolean }) => {
    const config = readLocalConfig()
    const framework = (opts.framework ?? config.framework ?? detectFramework()) as string

    let items = await fetchIndex(framework)

    if (query) {
      const q = query.toLowerCase()
      items = items.filter((i) =>
        i.name.includes(q) ||
        i.title.toLowerCase().includes(q) ||
        (i.description ?? "").toLowerCase().includes(q) ||
        i.categories.some((c) => c.includes(q))
      )
    }
    if (opts.category) {
      items = items.filter((i) => i.categories.includes(opts.category!))
    }
    if (opts.pro) items = items.filter((i) => i.tier === "pro")
    if (opts.free) items = items.filter((i) => i.tier !== "pro")

    console.log()
    console.log(chalk.bold(`ParticleUI components for ${framework} (${items.length}):`))
    console.log()

    const byCategory: Record<string, typeof items> = {}
    for (const item of items) {
      const cat = item.categories.find((c) => !["free", "pro", "core"].includes(c)) ?? "core"
      byCategory[cat] = [...(byCategory[cat] ?? []), item]
    }

    for (const [cat, catItems] of Object.entries(byCategory)) {
      console.log(chalk.dim(`  ${cat.toUpperCase()}`))
      for (const item of catItems) {
        const badge = item.tier === "pro" ? chalk.yellow(" [PRO]") : ""
        console.log(
          "  " +
          chalk.white(item.name.padEnd(28)) +
          badge +
          chalk.dim((item.description ?? "").slice(0, 50))
        )
      }
      console.log()
    }

    console.log(chalk.dim(`  Install: particleui add <name>`))
    console.log()
  })
