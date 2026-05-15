import { Command } from "commander"
import prompts from "prompts"
import { writeLocalConfig, detectFramework, detectComponentsDir } from "../lib/project.js"
import { log } from "../lib/logger.js"
import chalk from "chalk"

export const initCommand = new Command("init")
  .description("Set up ParticleUI in your project")
  .action(async () => {
    console.log()
    console.log(chalk.bold("ParticleUI — Project setup"))
    console.log(chalk.dim("This creates a particleui.json config in your project root."))
    console.log()

    const detectedFw = detectFramework()
    const detectedDir = detectComponentsDir()

    const answers = await prompts([
      {
        type: "select",
        name: "framework",
        message: "Framework",
        choices: [
          { title: "React", value: "react" },
          { title: "Vue", value: "vue" },
          { title: "Svelte", value: "svelte" },
        ],
        initial: ["react", "vue", "svelte"].indexOf(detectedFw),
      },
      {
        type: "text",
        name: "componentsDir",
        message: "Components directory",
        initial: detectedDir.replace(process.cwd() + "/", ""),
      },
      {
        type: "text",
        name: "token",
        message: "Pro token (optional — leave blank for free components)",
        initial: process.env.PARTICLEUI_TOKEN ?? "",
      },
    ])

    if (!answers.framework) {
      log.warn("Aborted.")
      return
    }

    writeLocalConfig({
      framework: answers.framework as "react" | "vue" | "svelte",
      componentsDir: answers.componentsDir as string,
    })

    if (answers.token) {
      log.info("Add this to your .env file:")
      console.log(chalk.cyan(`  PARTICLEUI_TOKEN=${answers.token as string}`))
    }

    console.log()
    log.success("particleui.json created!")
    console.log(chalk.dim("  Run: particleui add button"))
    console.log()
  })
