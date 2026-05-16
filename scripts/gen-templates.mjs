import path from "path"
import { fileURLToPath } from "url"
import { generateRegistry } from "./lib/generate.mjs"
import { meta } from "./meta/templates.mjs"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, "..")

console.log("Generating templates…")
const count = generateRegistry({
  srcDir: path.join(ROOT, "apps/web/src/components/templates"),
  outDir: path.join(ROOT, "registry/react/templates"),
  ext: ".tsx",
  defaultType: "registry:block",
  gracefulMissing: true,
  meta,
})
console.log(`\nDone — ${count} items. Run: pnpm registry:build`)
