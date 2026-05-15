/**
 * Reads each registry/<fw>/<type>/<name>.json, validates it against
 * the shadcn registryItemSchema shape (via our own Zod mirror), and
 * emits flat files to apps/web/public/r/<fw>/<name>.json
 *
 * Usage: node packages/registry-builder/build.mjs [--fw react|vue|svelte]
 */

import { readFileSync, writeFileSync, mkdirSync } from "fs"
import path from "path"
import { glob } from "glob"
import { z } from "zod"
import chalk from "chalk"

const ROOT = path.resolve(import.meta.dirname, "../..")
const REGISTRY_SRC = path.join(ROOT, "registry")
const REGISTRY_OUT = path.join(ROOT, "apps/web/public/r")

// Minimal mirror of shadcn registryItemSchema — extend as shadcn adds fields
const registryFileSchema = z.object({
  path: z.string(),
  content: z.string().optional(),
  type: z.enum([
    "registry:lib",
    "registry:block",
    "registry:component",
    "registry:ui",
    "registry:hook",
    "registry:page",
    "registry:file",
    "registry:theme",
    "registry:style",
  ]),
  target: z.string().optional(),
})

const registryItemSchema = z.object({
  $schema: z.string().optional(),
  name: z.string(),
  type: z.enum([
    "registry:lib",
    "registry:block",
    "registry:component",
    "registry:ui",
    "registry:hook",
    "registry:page",
    "registry:file",
    "registry:theme",
    "registry:style",
  ]),
  title: z.string().optional(),
  description: z.string().optional(),
  author: z.string().optional(),
  dependencies: z.array(z.string()).optional(),
  devDependencies: z.array(z.string()).optional(),
  registryDependencies: z.array(z.string()).optional(),
  files: z.array(registryFileSchema),
  cssVars: z
    .object({
      theme: z.record(z.string()).optional(),
      light: z.record(z.string()).optional(),
      dark: z.record(z.string()).optional(),
    })
    .optional(),
  meta: z.record(z.unknown()).optional(),
  docs: z.string().optional(),
  categories: z.array(z.string()).optional(),
})

const fwArg = process.argv.find((a) => a.startsWith("--fw="))?.split("=")[1]
const frameworks = fwArg ? [fwArg] : ["react", "vue", "svelte"]

let errors = 0
let emitted = 0

for (const fw of frameworks) {
  const pattern = path.join(REGISTRY_SRC, fw, "**/*.json")
  const files = await glob(pattern)

  if (files.length === 0) continue

  const outDir = path.join(REGISTRY_OUT, fw)
  mkdirSync(outDir, { recursive: true })

  /** { name, tier, title, description, categories, dependencies } */
  const indexEntries = []

  for (const file of files) {
    const raw = JSON.parse(readFileSync(file, "utf-8"))
    const result = registryItemSchema.safeParse(raw)

    if (!result.success) {
      console.error(chalk.red(`✗ ${path.relative(ROOT, file)}`))
      result.error.issues.forEach((i) =>
        console.error(chalk.red(`  ${i.path.join(".")}: ${i.message}`))
      )
      errors++
      continue
    }

    // Extract tier from directory structure: registry/<fw>/<tier>/<name>.json
    const rel = path.relative(path.join(REGISTRY_SRC, fw), file)
    const tier = rel.split(path.sep).length > 1 ? rel.split(path.sep)[0] : "core"

    const outPath = path.join(outDir, `${result.data.name}.json`)
    writeFileSync(outPath, JSON.stringify(result.data, null, 2))
    console.log(chalk.green(`✓ ${fw}/${tier}/${result.data.name}`))
    emitted++

    indexEntries.push({
      name: result.data.name,
      tier,
      title: result.data.title ?? result.data.name,
      description: result.data.description ?? "",
      categories: result.data.categories ?? [],
      dependencies: result.data.dependencies ?? [],
      registryDependencies: result.data.registryDependencies ?? [],
    })
  }

  // Emit tiered index
  const indexPath = path.join(outDir, "index.json")
  writeFileSync(indexPath, JSON.stringify({ items: indexEntries }, null, 2))
  console.log(chalk.cyan(`  → wrote ${fw}/index.json (${indexEntries.length} items)`))
}

if (errors > 0) {
  console.error(chalk.red(`\n${errors} error(s). Registry not fully built.`))
  process.exit(1)
}

console.log(chalk.bold(`\n${emitted} item(s) emitted to apps/web/public/r/`))
