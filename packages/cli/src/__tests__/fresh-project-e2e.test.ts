import { execFile } from "node:child_process"
import { createHash } from "node:crypto"
import { mkdtemp, mkdir, readFile, readdir, rm, symlink, writeFile } from "node:fs/promises"
import { tmpdir } from "node:os"
import path from "node:path"
import { pathToFileURL } from "node:url"
import { promisify } from "node:util"
import { afterEach, beforeEach, describe, expect, it } from "vitest"
import { addCommand } from "../commands/add.js"

const execFileAsync = promisify(execFile)

const repoRoot = path.resolve(import.meta.dirname, "../../../..")
const webNodeModules = path.join(repoRoot, "apps/web/node_modules")
const webTsc = path.join(webNodeModules, ".bin/tsc")
const registryRoot = path.join(repoRoot, "apps/web/public/r")
const registryBaseUrl = pathToFileURL(`${registryRoot}/`).toString()
const originalCwd = process.cwd()

async function writeFreshReactProject(projectDir: string): Promise<void> {
  await mkdir(path.join(projectDir, "src"), { recursive: true })
  await symlink(webNodeModules, path.join(projectDir, "node_modules"), "dir")

  await writeFile(
    path.join(projectDir, "package.json"),
    JSON.stringify(
      {
        name: "fresh-particleui-install-test",
        private: true,
        type: "module",
        dependencies: {
          "@radix-ui/react-slot": "workspace-test",
          react: "workspace-test",
          "tailwind-variants": "workspace-test",
        },
        devDependencies: {
          "@types/react": "workspace-test",
          typescript: "workspace-test",
        },
      },
      null,
      2
    ),
    "utf-8"
  )

  await writeFile(
    path.join(projectDir, "tsconfig.json"),
    JSON.stringify(
      {
        compilerOptions: {
          strict: true,
          jsx: "react-jsx",
          module: "ESNext",
          moduleResolution: "Bundler",
          target: "ES2022",
          skipLibCheck: true,
          noEmit: true,
        },
        include: ["src/**/*.ts", "src/**/*.tsx"],
      },
      null,
      2
    ),
    "utf-8"
  )
}

async function runCliAdd(projectDir: string, registryUrl: string): Promise<void> {
  const previousRegistry = process.env.PARTICLEUI_REGISTRY
  const previousToken = process.env.PARTICLEUI_TOKEN
  const previousNoColor = process.env.NO_COLOR

  process.chdir(projectDir)
  process.env.NO_COLOR = "1"
  process.env.PARTICLEUI_REGISTRY = registryUrl
  delete process.env.PARTICLEUI_TOKEN

  try {
    await addCommand.parseAsync(["button", "--no-deps"], { from: "user" })
  } finally {
    process.chdir(originalCwd)
    if (previousRegistry === undefined) delete process.env.PARTICLEUI_REGISTRY
    else process.env.PARTICLEUI_REGISTRY = previousRegistry

    if (previousToken === undefined) delete process.env.PARTICLEUI_TOKEN
    else process.env.PARTICLEUI_TOKEN = previousToken

    if (previousNoColor === undefined) delete process.env.NO_COLOR
    else process.env.NO_COLOR = previousNoColor
  }
}

async function sha256(filePath: string): Promise<string> {
  return createHash("sha256").update(await readFile(filePath)).digest("hex")
}

async function listRelativeFiles(dir: string): Promise<string[]> {
  const files: string[] = []

  async function visit(current: string): Promise<void> {
    for (const entry of await readdir(current, { withFileTypes: true })) {
      const absolutePath = path.join(current, entry.name)
      if (entry.isDirectory()) {
        await visit(absolutePath)
        continue
      }
      if (entry.isFile() || entry.isSymbolicLink()) {
        files.push(path.relative(dir, absolutePath))
      }
    }
  }

  await visit(dir)
  return files.sort()
}

describe("fresh project CLI install", () => {
  let sandboxDir: string

  beforeEach(async () => {
    sandboxDir = await mkdtemp(path.join(tmpdir(), "particleui-cli-e2e-"))
  })

  afterEach(async () => {
    await rm(sandboxDir, { recursive: true, force: true })
  })

  it("installs the free React button component into a fresh project", async () => {
    const projectDir = path.join(sandboxDir, "project")
    const outsideDir = path.join(sandboxDir, "outside")
    await mkdir(projectDir)
    await mkdir(outsideDir)
    await writeFreshReactProject(projectDir)

    const packageJsonBefore = await readFile(path.join(projectDir, "package.json"), "utf-8")

    await runCliAdd(projectDir, registryBaseUrl)

    const buttonPath = path.join(projectDir, "src/components/ui/button.tsx")
    const buttonSource = await readFile(buttonPath, "utf-8")
    expect(buttonSource).toContain("export { Button, buttonVariants }")
    expect(buttonSource).toContain("@radix-ui/react-slot")
    expect(buttonSource).toContain("tailwind-variants")

    await writeFile(
      path.join(projectDir, "src/app.tsx"),
      'import { Button } from "./components/ui/button"\n\nexport function App() {\n  return <Button>Install works</Button>\n}\n',
      "utf-8"
    )

    await expect(
      execFileAsync(webTsc, ["--project", path.join(projectDir, "tsconfig.json")], {
        cwd: projectDir,
        timeout: 20_000,
      })
    ).resolves.toMatchObject({ stderr: "" })

    expect(await readFile(path.join(projectDir, "package.json"), "utf-8")).toBe(packageJsonBefore)
    expect(await listRelativeFiles(outsideDir)).toEqual([])

    const sandboxFiles = await listRelativeFiles(sandboxDir)
    expect(sandboxFiles.every((file) => file.startsWith("project/") || file.startsWith("outside/"))).toBe(true)

    const firstHash = await sha256(buttonPath)
    await runCliAdd(projectDir, registryBaseUrl)
    const secondHash = await sha256(buttonPath)

    expect(secondHash).toBe(firstHash)
    expect(await listRelativeFiles(outsideDir)).toEqual([])
  }, 30_000)
})
