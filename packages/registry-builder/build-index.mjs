/**
 * Emits apps/web/public/r/<fw>/index.json
 * Shape: Array<{ name, type, title, description, categories }>
 * Used by the MCP server and the /components gallery page.
 */
import { readFileSync, writeFileSync, readdirSync, statSync } from "fs"
import path from "path"
import { glob } from "glob"

const ROOT = path.resolve(import.meta.dirname, "../..")
const REGISTRY_OUT = path.join(ROOT, "apps/web/public/r")

for (const fw of ["react", "vue", "svelte"]) {
  const files = await glob(path.join(REGISTRY_OUT, fw, "*.json"))
  const index = files
    .map((f) => {
      const item = JSON.parse(readFileSync(f, "utf-8"))
      if (!item.name) return null
      return {
        name: item.name,
        type: item.type,
        title: item.title ?? item.name,
        description: item.description ?? "",
        categories: item.categories ?? [],
      }
    })
    .filter(Boolean)
    .sort((a, b) => a.name.localeCompare(b.name))

  if (index.length === 0) continue
  writeFileSync(path.join(REGISTRY_OUT, fw, "index.json"), JSON.stringify(index, null, 2))
  console.log(`✓ ${fw}/index.json (${index.length} items)`)
}
