import { Command } from "commander"
import chalk from "chalk"
import ora from "ora"
import { fetchComponent, type RegistryItem } from "../lib/registry.js"
import { detectFramework, detectComponentsDir, writeComponentFiles, readLocalConfig } from "../lib/project.js"
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

    const allDeps = new Set<string>()
    const allDevDeps = new Set<string>()
    const installed = new Set<string>()

    async function install(name: string): Promise<void> {
      if (installed.has(name)) return
      installed.add(name)

      const spinner = ora({ text: chalk.dim(`Fetching ${name}...`), color: "white" }).start()

      let item: RegistryItem
      try {
        item = await fetchComponent(framework, name)
        spinner.succeed(chalk.green(`✓ ${item.title ?? name}`))
      } catch (err) {
        spinner.fail(chalk.red(`✗ ${name}`))
        log.error(String(err instanceof Error ? err.message : err))
        return
      }

      // Write files
      const written = writeComponentFiles(item.files, componentsDir)
      for (const p of written) {
        log.dim(`  → ${p.replace(process.cwd() + "/", "")}`)
      }

      // Collect deps
      for (const dep of item.dependencies ?? []) allDeps.add(dep)
      for (const dep of item.devDependencies ?? []) allDevDeps.add(dep)

      // Recursively install registry dependencies
      for (const dep of item.registryDependencies ?? []) {
        await install(dep)
      }
    }

    for (const name of components) {
      await install(name)
    }

    console.log()

    if (opts.deps && allDeps.size > 0) {
      log.info("Install npm dependencies:")
      console.log(chalk.cyan(`  npm install ${[...allDeps].join(" ")}`))
      console.log()
    }
    if (opts.deps && allDevDeps.size > 0) {
      log.info("Install dev dependencies:")
      console.log(chalk.cyan(`  npm install -D ${[...allDevDeps].join(" ")}`))
      console.log()
    }

    log.success(`Done! ${installed.size} component(s) added.`)
    console.log()
  })
