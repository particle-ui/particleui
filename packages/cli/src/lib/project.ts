import { existsSync, mkdirSync, writeFileSync, readFileSync } from "fs"
import { join, dirname, resolve } from "path"

export type Framework = "react" | "vue" | "svelte"

export type ProjectConfig = {
  framework: Framework
  componentsDir: string  // absolute path to components/ui dir
  token?: string
}

export function detectFramework(): Framework {
  try {
    const pkg = JSON.parse(readFileSync("package.json", "utf-8")) as { dependencies?: Record<string, string>; devDependencies?: Record<string, string> }
    const deps = { ...pkg.dependencies, ...pkg.devDependencies }
    if ("svelte" in deps || "@sveltejs/kit" in deps) return "svelte"
    if ("vue" in deps || "nuxt" in deps) return "vue"
  } catch {}
  return "react"
}

export function detectComponentsDir(): string {
  const candidates = [
    "src/components/ui",
    "components/ui",
    "src/components",
    "components",
  ]
  // Read particleui.json config if present
  try {
    const config = JSON.parse(readFileSync("particleui.json", "utf-8")) as { componentsDir?: string }
    if (config.componentsDir) return resolve(config.componentsDir)
  } catch {}
  // Check if src/ exists
  for (const c of candidates) {
    if (existsSync(c)) return resolve(c)
  }
  // Default: create src/components/ui
  return resolve("src/components/ui")
}

export type RegistryFile = { path: string; content: string; type: string }

export function writeComponentFiles(files: RegistryFile[], componentsDir: string): string[] {
  const written: string[] = []
  for (const file of files) {
    if (file.type === "registry:file") continue // skip skill files
    // Transform registry path to local path
    // Registry paths look like: "components/ui/button.tsx" or "src/components/ui/button.tsx"
    const filename = file.path.split("/").pop()!
    const outPath = join(componentsDir, filename)
    mkdirSync(dirname(outPath), { recursive: true })
    writeFileSync(outPath, file.content, "utf-8")
    written.push(outPath)
  }
  return written
}

export function readLocalConfig(): Partial<ProjectConfig> {
  try {
    return JSON.parse(readFileSync("particleui.json", "utf-8")) as Partial<ProjectConfig>
  } catch {
    return {}
  }
}

export function writeLocalConfig(config: Partial<ProjectConfig>): void {
  const existing = readLocalConfig()
  writeFileSync("particleui.json", JSON.stringify({ ...existing, ...config }, null, 2), "utf-8")
}
