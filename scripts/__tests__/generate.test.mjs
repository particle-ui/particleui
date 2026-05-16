import { test, describe, before, after } from "node:test"
import assert from "node:assert/strict"
import { mkdirSync, writeFileSync, readFileSync, rmSync, existsSync } from "node:fs"
import { mkdtempSync } from "node:fs"
import { tmpdir } from "node:os"
import path from "node:path"
import { generateRegistry } from "../lib/generate.mjs"

let tmpDir

describe("generateRegistry", () => {
  before(() => {
    tmpDir = mkdtempSync(path.join(tmpdir(), "particleui-test-"))
  })

  after(() => {
    rmSync(tmpDir, { recursive: true, force: true })
  })

  function makeSourceFile(dir, name, ext = ".tsx") {
    mkdirSync(dir, { recursive: true })
    writeFileSync(path.join(dir, name + ext), `// ${name} source`)
  }

  function readOutput(outDir, name) {
    return JSON.parse(readFileSync(path.join(outDir, `${name}.json`), "utf-8"))
  }

  test("generates a registry item from a source file and metadata", () => {
    const srcDir = path.join(tmpDir, "src-basic")
    const outDir = path.join(tmpDir, "out-basic")
    makeSourceFile(srcDir, "button")

    generateRegistry({
      srcDir,
      outDir,
      ext: ".tsx",
      meta: {
        button: {
          title: "Button",
          description: "A button component.",
          categories: ["buttons", "core", "free"],
          dependencies: ["@radix-ui/react-slot"],
        },
      },
    })

    const item = readOutput(outDir, "button")
    assert.equal(item.name, "button")
    assert.equal(item.title, "Button")
    assert.equal(item.type, "registry:ui")
    assert.deepEqual(item.dependencies, ["@radix-ui/react-slot"])
    assert.equal(item.files[0].content, "// button source")
    assert.equal(item.files[0].path, "components/ui/button.tsx")
  })

  test("uses defaultType for registry type", () => {
    const srcDir = path.join(tmpDir, "src-block")
    const outDir = path.join(tmpDir, "out-block")
    makeSourceFile(srcDir, "hero")

    generateRegistry({
      srcDir,
      outDir,
      ext: ".tsx",
      defaultType: "registry:block",
      meta: {
        hero: {
          title: "Hero",
          description: "Hero block.",
          categories: ["hero", "blocks", "free"],
        },
      },
    })

    const item = readOutput(outDir, "hero")
    assert.equal(item.type, "registry:block")
    assert.equal(item.files[0].type, "registry:block")
  })

  test("uses name override from meta (Vue PascalCase → kebab)", () => {
    const srcDir = path.join(tmpDir, "src-vue")
    const outDir = path.join(tmpDir, "out-vue")
    makeSourceFile(srcDir, "Button", ".vue")

    generateRegistry({
      srcDir,
      outDir,
      ext: ".vue",
      meta: {
        Button: {
          name: "button",
          title: "Button",
          description: "Vue button.",
          categories: ["buttons", "core", "free"],
        },
      },
    })

    assert(existsSync(path.join(outDir, "button.json")))
    const item = readOutput(outDir, "button")
    assert.equal(item.name, "button")
  })

  test("bundles subFiles into the registry item", () => {
    const srcDir = path.join(tmpDir, "src-sub")
    const outDir = path.join(tmpDir, "out-sub")
    makeSourceFile(srcDir, "card")
    makeSourceFile(srcDir, "card-header")
    makeSourceFile(srcDir, "card-footer")

    generateRegistry({
      srcDir,
      outDir,
      ext: ".tsx",
      meta: {
        card: {
          title: "Card",
          description: "Card.",
          categories: ["layout", "core", "free"],
          subFiles: ["card-header", "card-footer"],
        },
      },
    })

    const item = readOutput(outDir, "card")
    assert.equal(item.files.length, 3)
    assert(item.files.some((f) => f.path === "components/ui/card-header.tsx"))
    assert(item.files.some((f) => f.path === "components/ui/card-footer.tsx"))
  })

  test("skips files listed as subFiles when scanning top-level", () => {
    const srcDir = path.join(tmpDir, "src-skip")
    const outDir = path.join(tmpDir, "out-skip")
    makeSourceFile(srcDir, "tabs")
    makeSourceFile(srcDir, "tabs-list")
    makeSourceFile(srcDir, "tabs-trigger")

    generateRegistry({
      srcDir,
      outDir,
      ext: ".tsx",
      meta: {
        tabs: {
          title: "Tabs",
          description: "Tabs.",
          categories: ["navigation", "core", "free"],
          subFiles: ["tabs-list", "tabs-trigger"],
        },
      },
    })

    // Only tabs.json should exist at the top level (sub-files bundled, not separate)
    assert(existsSync(path.join(outDir, "tabs.json")))
    assert(!existsSync(path.join(outDir, "tabs-list.json")))
    assert(!existsSync(path.join(outDir, "tabs-trigger.json")))
  })

  test("warns but continues when no meta exists for a source file", () => {
    const srcDir = path.join(tmpDir, "src-warn")
    const outDir = path.join(tmpDir, "out-warn")
    makeSourceFile(srcDir, "known")
    makeSourceFile(srcDir, "unknown") // no meta entry

    const warnings = []
    const origWarn = console.warn
    console.warn = (...args) => warnings.push(args.join(" "))

    generateRegistry({
      srcDir,
      outDir,
      ext: ".tsx",
      meta: {
        known: {
          title: "Known",
          description: "Known component.",
          categories: ["core", "free"],
        },
      },
    })

    console.warn = origWarn

    assert(existsSync(path.join(outDir, "known.json")))
    assert(!existsSync(path.join(outDir, "unknown.json")))
    assert(warnings.some((w) => w.includes("unknown")))
  })

  test("gracefulMissing skips missing source files without throwing", () => {
    const srcDir = path.join(tmpDir, "src-graceful")
    const outDir = path.join(tmpDir, "out-graceful")
    makeSourceFile(srcDir, "exists")
    // "missing" source file intentionally not created

    generateRegistry({
      srcDir,
      outDir,
      ext: ".tsx",
      gracefulMissing: true,
      meta: {
        exists: {
          title: "Exists",
          description: "Present.",
          categories: ["core", "free"],
        },
        missing: {
          title: "Missing",
          description: "Source file not present.",
          categories: ["core", "free"],
        },
      },
    })

    assert(existsSync(path.join(outDir, "exists.json")))
    assert(!existsSync(path.join(outDir, "missing.json")))
  })

  test("returns the count of generated items", () => {
    const srcDir = path.join(tmpDir, "src-count")
    const outDir = path.join(tmpDir, "out-count")
    makeSourceFile(srcDir, "a")
    makeSourceFile(srcDir, "b")
    makeSourceFile(srcDir, "c")

    const count = generateRegistry({
      srcDir,
      outDir,
      ext: ".tsx",
      meta: {
        a: { title: "A", description: "A.", categories: [] },
        b: { title: "B", description: "B.", categories: [] },
        c: { title: "C", description: "C.", categories: [] },
      },
    })

    assert.equal(count, 3)
  })

  test("uses filePath override from meta instead of default path", () => {
    const srcDir = path.join(tmpDir, "src-filepath")
    const outDir = path.join(tmpDir, "out-filepath")
    makeSourceFile(srcDir, "button")

    generateRegistry({
      srcDir,
      outDir,
      ext: ".tsx",
      meta: {
        button: {
          title: "Button",
          description: "Button.",
          categories: ["buttons", "core", "free"],
          filePath: "components/ui/button.tsx",
        },
      },
    })

    const item = readOutput(outDir, "button")
    assert.equal(item.files[0].path, "components/ui/button.tsx")
  })
})
