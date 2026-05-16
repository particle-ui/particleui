import path from "path"
import { fileURLToPath } from "url"
import { generateRegistry } from "./lib/generate.mjs"
import { meta } from "./meta/vue.mjs"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, "..")

console.log("Generating Vue components…")
const count = generateRegistry({
  srcDir: path.join(__dirname, "vue"),
  outDir: path.join(ROOT, "registry/vue/core"),
  ext: ".vue",
  defaultType: "registry:ui",
  meta,
})
console.log(`\nDone — ${count} items. Run: pnpm registry:build`)
