import { build, context } from "esbuild"
import { readFileSync, writeFileSync, copyFileSync, mkdirSync } from "fs"

const watch = process.argv.includes("--watch")
mkdirSync("dist", { recursive: true })

const codeOptions = {
  entryPoints: ["src/code.ts"],
  bundle: true,
  outfile: "dist/code.js",
  target: "es6",
  logLevel: "info",
}

// Inline the ui.html into dist/ as-is
function copyUI() {
  copyFileSync("src/ui.html", "dist/ui.html")
  console.log("Copied ui.html → dist/ui.html")
}

if (watch) {
  const ctx = await context(codeOptions)
  await ctx.watch()
  copyUI()
  console.log("Watching for changes…")
} else {
  await build(codeOptions)
  copyUI()
  console.log("Build complete.")
}
