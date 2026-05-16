import path from "path"
import { fileURLToPath } from "url"
import { generateRegistry } from "./lib/generate.mjs"
import { meta } from "./meta/blocks.mjs"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, "..")

console.log("Generating blocks…")
const count = generateRegistry({
  srcDir: path.join(__dirname, "blocks"),
  outDir: path.join(ROOT, "registry/react/blocks"),
  ext: ".tsx",
  defaultType: "registry:block",
  meta,
})
console.log(`\nDone — ${count} items. Run: pnpm registry:build`)
