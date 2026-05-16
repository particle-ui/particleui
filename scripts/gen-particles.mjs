import path from "path"
import { fileURLToPath } from "url"
import { generateRegistry } from "./lib/generate.mjs"
import { meta } from "./meta/particles.mjs"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, "..")

console.log("Generating particles…")
const count = generateRegistry({
  srcDir: path.join(__dirname, "particles"),
  outDir: path.join(ROOT, "registry/react/particles"),
  ext: ".tsx",
  defaultType: "registry:ui",
  meta,
})
console.log(`\nDone — ${count} items. Run: pnpm registry:build`)
