import { Command } from "commander"
import chalk from "chalk"
import ora from "ora"
import { fetchComponent } from "../lib/registry.js"
import { detectFramework, detectComponentsDir, writeComponentFiles, readLocalConfig } from "../lib/project.js"
import { ComponentInstaller } from "../lib/installer.js"
import { log } from "../lib/logger.js"

export const addCommand = new Command("add")
  .description("Add one or more components to your project")
  .argument("<components...>", "Component name(s) to install")
  .option("-f, --framework <fw>", "Framework: react, vue, or svelte")
  .option("-d, --dir <dir>", "Components directory (default: auto-detect)")
  .option("--no-deps", "Skip printing npm install instructions")
  .action(async (components: string[], opts: { framework?: string; dir?: string; deps: boolean }) => {
    const config = readLocalConfig()
    const framework = (opts.framework ?? config.framework ?? detectFramework()) as "react" | "vue" | "svelte"
    const componentsDir = opts.dir ?? config.componentsDir ?? detectComponentsDir()

    console.log()
    log.bold(`ParticleUI — Adding ${components.length} component(s)`)
    log.dim(`Framework: ${framework}  |  Output: ${componentsDir}`)
    console.log()

    const installer = new ComponentInstaller(framework, componentsDir, {
      fetch: fetchComponent,
      write: writeComponentFiles,
    })

    for (const name of components) {
      const spinner = ora({ text: chalk.dim(`Fetching ${name}...`), color: "white" }).start()
      try {
        const item = await installer.installWithDeps(name)
        if (!item) {
          spinner.info(chalk.dim(`${name} already installed`))
          continue
        }
        spinner.succeed(chalk.green(`✓ ${item.title ?? name}`))
        const { writtenPaths } = installer.getResult()
        for (const p of writtenPaths.slice(-item.files.length)) {
          log.dim(`  → ${p.replace(process.cwd() + "/", "")}`)
        }
      } catch (err) {
        spinner.fail(chalk.red(`✗ ${name}`))
        log.error(String(err instanceof Error ? err.message : err))
      }
    }

    const { deps, devDeps } = installer.getResult()

    console.log()

    if (opts.deps && deps.size > 0) {
      log.info("Install npm dependencies:")
      console.log(chalk.cyan(`  npm install ${[...deps].join(" ")}`))
      console.log()
    }
    if (opts.deps && devDeps.size > 0) {
      log.info("Install dev dependencies:")
      console.log(chalk.cyan(`  npm install -D ${[...devDeps].join(" ")}`))
      console.log()
    }

    log.success(`Done! ${installer.getResult().installed.size} component(s) added.`)
    console.log()
  })
