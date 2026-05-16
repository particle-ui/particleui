import { readFileSync, writeFileSync, readdirSync, mkdirSync, existsSync } from "fs"
import path from "path"

/**
 * Generate registry JSON files from a source directory and metadata map.
 *
 * Config shape:
 *   srcDir          — where source files live
 *   outDir          — where to write .json files
 *   ext             — file extension, e.g. ".tsx"
 *   defaultType     — "registry:ui" | "registry:block" (default: "registry:ui")
 *   meta            — Record<filename-stem, MetaEntry>
 *   gracefulMissing — skip missing source files instead of throwing (for templates)
 *
 * MetaEntry shape:
 *   name?               — override the kebab name in the output (e.g. Vue PascalCase → kebab)
 *   type?               — override registry type per item
 *   title               — display title
 *   description         — short description
 *   author?             — defaults to "ParticleUI"
 *   categories          — string[]
 *   dependencies?       — npm package names
 *   devDependencies?    — npm dev package names
 *   registryDependencies? — other registry item names
 *   filePath?           — output path in registry item (defaults to components/ui/<name><ext>)
 *   subFiles?           — additional file stems to bundle into this item
 */
export function generateRegistry({
  srcDir,
  outDir,
  ext,
  defaultType = "registry:ui",
  meta,
  gracefulMissing = false,
}) {
  mkdirSync(outDir, { recursive: true })

  // Names that appear as a subFile of another entry — skip them as top-level items
  const skip = new Set(
    Object.values(meta).flatMap((m) => m.subFiles ?? [])
  )

  const stems = gracefulMissing
    ? Object.keys(meta)
    : readdirSync(srcDir).filter((f) => f.endsWith(ext)).map((f) => f.replace(ext, ""))

  let count = 0

  for (const stem of stems) {
    if (skip.has(stem)) continue

    const m = meta[stem]
    if (!m) {
      console.warn(`  ⚠ No meta for "${stem}", skipping`)
      continue
    }

    const name = m.name ?? stem
    const type = m.type ?? defaultType
    const fileType = type === "registry:block" ? "registry:block" : "registry:ui"
    const filePath = m.filePath ?? `components/ui/${name}${ext}`

    const srcFile = path.join(srcDir, stem + ext)
    if (!existsSync(srcFile)) {
      if (gracefulMissing) {
        console.warn(`  ⚠ Missing source: ${srcFile} — skipping`)
        continue
      }
      throw new Error(`Source file not found: ${srcFile}`)
    }

    const files = [
      { path: filePath, type: fileType, content: readFileSync(srcFile, "utf-8") },
      ...(m.subFiles ?? []).map((sub) => ({
        path: `components/ui/${sub}${ext}`,
        type: fileType,
        content: readFileSync(path.join(srcDir, sub + ext), "utf-8"),
      })),
    ]

    const item = {
      $schema: "https://particleui.dev/schema/registry-item.json",
      name,
      type,
      title: m.title,
      description: m.description,
      author: m.author ?? "ParticleUI",
      categories: m.categories,
      dependencies: m.dependencies ?? [],
      registryDependencies: m.registryDependencies ?? [],
      files,
      cssVars: { light: {}, dark: {} },
    }

    if (m.devDependencies?.length) item.devDependencies = m.devDependencies

    writeFileSync(path.join(outDir, `${name}.json`), JSON.stringify(item, null, 2))
    console.log(`  ✓ ${name}`)
    count++
  }

  return count
}
