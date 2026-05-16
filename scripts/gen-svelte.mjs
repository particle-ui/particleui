import path from "path"
import { fileURLToPath } from "url"
import { generateRegistry } from "./lib/generate.mjs"
import { meta } from "./meta/svelte.mjs"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, "..")

console.log("Generating Svelte components…")
const count = generateRegistry({
  srcDir: path.join(__dirname, "svelte"),
  outDir: path.join(ROOT, "registry/svelte/core"),
  ext: ".svelte",
  defaultType: "registry:ui",
  meta,
})
console.log(`\nDone — ${count} items. Run: pnpm registry:build`)
