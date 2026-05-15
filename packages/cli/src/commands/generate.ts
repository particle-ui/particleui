import { Command } from "commander"
import chalk from "chalk"
import ora from "ora"
import { log } from "../lib/logger.js"

const API_BASE = process.env.PARTICLEUI_API ?? "https://particleui.dev"
const TOKEN = process.env.PARTICLEUI_TOKEN

export const generateCommand = new Command("generate")
  .alias("gen")
  .description("Generate a page layout from a plain-English description")
  .argument("<prompt...>", "What page to generate (can be multiple words)")
  .option("--install", "Automatically install the suggested components")
  .action(async (promptWords: string[], opts: { install?: boolean }) => {
    const prompt = promptWords.join(" ")
    console.log()
    console.log(chalk.bold("ParticleUI AI Generator"))
    console.log(chalk.dim(`Prompt: "${prompt}"`))
    console.log()

    if (!TOKEN) {
      log.warn("No PARTICLEUI_TOKEN set. You need a Pro token to use the generator.")
      log.info("Get one at https://particleui.dev/dashboard")
      console.log()
      process.exit(1)
    }

    const spinner = ora({ text: "Generating layout...", color: "white" }).start()

    let layout: { blocks: { component: string }[] }
    try {
      const res = await fetch(`${API_BASE}/api/mcp/generate`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      })
      if (res.status === 401) throw new Error("Invalid or expired token")
      if (res.status === 429) throw new Error("Rate limit hit. Upgrade to Pro for unlimited generations.")
      if (!res.ok) throw new Error(`API error: ${res.statusText}`)
      const data = await res.json() as { layout: { blocks: { component: string }[] } }
      layout = data.layout
      spinner.succeed("Layout generated!")
    } catch (err) {
      spinner.fail("Generation failed")
      log.error(String(err instanceof Error ? err.message : err))
      process.exit(1)
    }

    console.log()
    console.log(chalk.bold(`Blocks (${layout.blocks.length}):`))
    layout.blocks.forEach((b, i) => {
      console.log(chalk.dim(`  ${i + 1}.`) + " " + chalk.white(b.component))
    })
    console.log()

    const installCmd = `particleui add ${layout.blocks.map((b) => b.component).join(" ")}`
    console.log(chalk.bold("Install all:"))
    console.log(chalk.cyan(`  ${installCmd}`))
    console.log()

    if (opts.install) {
      const { addCommand } = await import("./add.js")
      await addCommand.parseAsync(["node", "particleui", ...layout.blocks.map((b) => b.component)])
    } else {
      log.dim("Run with --install to automatically install all components.")
    }

    log.info("Preview in browser: https://particleui.dev/generate")
    console.log()
  })
