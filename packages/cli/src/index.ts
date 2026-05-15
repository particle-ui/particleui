import { Command } from "commander"
import chalk from "chalk"
import { addCommand } from "./commands/add.js"
import { listCommand } from "./commands/list.js"
import { initCommand } from "./commands/init.js"
import { generateCommand } from "./commands/generate.js"
import { createCommand, runCreate } from "./commands/create.js"

const VERSION = "0.3.1"

const program = new Command()
  .name("particleui")
  .description("ParticleUI — scaffold projects and install components")
  .version(VERSION)
  // Default action: running `npx particleui-cli` with no args bootstraps a project
  .action(async () => {
    console.log()
    console.log(chalk.bold("  ParticleUI") + chalk.dim(` v${VERSION}`))
    console.log(chalk.dim("  Bootstrap a new project or add components to an existing one."))
    console.log()
    await runCreate()
  })

program.addCommand(createCommand)
program.addCommand(addCommand)
program.addCommand(listCommand)
program.addCommand(initCommand)
program.addCommand(generateCommand)

program.parse()
