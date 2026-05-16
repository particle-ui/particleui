#!/usr/bin/env node
import path from "path"
import { fileURLToPath } from "url"
import { generateRegistry } from "./lib/generate.mjs"
import { meta } from "./meta/pro.mjs"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, "..")

console.log("Generating pro components…")

const count = generateRegistry({
  srcDir: path.join(ROOT, "scripts/pro"),
  outDir: path.join(ROOT, "registry/react/pro"),
  ext: ".tsx",
  defaultType: "registry:ui",
  meta,
  gracefulMissing: false,
})

console.log(`\nDone — ${count} items. Run: pnpm registry:build`)
