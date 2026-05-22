import { createHash } from "node:crypto"
import { execFileSync } from "node:child_process"
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs"
import path from "node:path"

const ROOT = path.resolve(import.meta.dirname, "..")
const GENERATED_PATHS = ["registry", "apps/web/public/r"]

function fileHashes(dir) {
  const files = new Map()
  if (!existsSync(dir)) return files

  function visit(current) {
    for (const entry of readdirSync(current)) {
      const absolutePath = path.join(current, entry)
      const stats = statSync(absolutePath)

      if (stats.isDirectory()) {
        visit(absolutePath)
        continue
      }

      if (!stats.isFile()) continue

      const relativePath = path.relative(ROOT, absolutePath)
      const hash = createHash("sha256").update(readFileSync(absolutePath)).digest("hex")
      files.set(relativePath, hash)
    }
  }

  visit(dir)
  return files
}

function snapshot() {
  const files = new Map()
  for (const generatedPath of GENERATED_PATHS) {
    const dir = path.join(ROOT, generatedPath)
    for (const [file, hash] of fileHashes(dir)) {
      files.set(file, hash)
    }
  }
  return files
}

function changedFiles(before, after) {
  const paths = new Set([...before.keys(), ...after.keys()])
  return [...paths].filter((file) => before.get(file) !== after.get(file)).sort()
}

const before = snapshot()

execFileSync("pnpm", ["registry:all"], {
  cwd: ROOT,
  stdio: "inherit",
})

const after = snapshot()
const changed = changedFiles(before, after)

if (changed.length > 0) {
  console.error("\nGenerated registry state is stale. Regeneration changed:")
  for (const file of changed) {
    console.error(`  - ${file}`)
  }
  process.exit(1)
}

console.log("\nGenerated registry state is current.")
