import { describe, it, expect, vi } from "vitest"
import { ComponentInstaller } from "../lib/installer.js"
import type { RegistryItem } from "../lib/registry.js"
import type { RegistryFile } from "../lib/project.js"

function makeItem(name: string, overrides: Partial<RegistryItem> = {}): RegistryItem {
  return {
    name,
    type: "registry:ui",
    title: name,
    categories: ["core", "free"],
    files: [{ path: `components/ui/${name}.tsx`, content: `// ${name}`, type: "registry:ui" }],
    dependencies: [],
    registryDependencies: [],
    ...overrides,
  }
}

function makeAdapters(catalog: Record<string, RegistryItem>) {
  const written: string[] = []
  return {
    fetch: vi.fn(async (fw: string, name: string) => {
      if (!catalog[name]) throw new Error(`Component "${name}" not found`)
      return catalog[name]
    }),
    write: vi.fn((files: RegistryFile[], _dir: string) => {
      const paths = files.map((f) => `/out/${f.path}`)
      written.push(...paths)
      return paths
    }),
    written,
  }
}

describe("ComponentInstaller", () => {
  it("installs a single component", async () => {
    const catalog = { button: makeItem("button", { dependencies: ["@radix-ui/react-slot"] }) }
    const adapters = makeAdapters(catalog)
    const installer = new ComponentInstaller("react", "/out", adapters)

    const item = await installer.installWithDeps("button")

    expect(item?.name).toBe("button")
    expect(adapters.fetch).toHaveBeenCalledOnce()
    expect(adapters.write).toHaveBeenCalledOnce()

    const result = installer.getResult()
    expect(result.installed.has("button")).toBe(true)
    expect(result.deps.has("@radix-ui/react-slot")).toBe(true)
  })

  it("installs registry dependencies transitively", async () => {
    const catalog = {
      "confetti-button": makeItem("confetti-button", {
        registryDependencies: ["button"],
        dependencies: ["canvas-confetti"],
      }),
      button: makeItem("button", { dependencies: ["@radix-ui/react-slot"] }),
    }
    const adapters = makeAdapters(catalog)
    const installer = new ComponentInstaller("react", "/out", adapters)

    await installer.installWithDeps("confetti-button")

    const result = installer.getResult()
    expect(result.installed.has("confetti-button")).toBe(true)
    expect(result.installed.has("button")).toBe(true)
    expect(result.deps.has("canvas-confetti")).toBe(true)
    expect(result.deps.has("@radix-ui/react-slot")).toBe(true)
    expect(adapters.fetch).toHaveBeenCalledTimes(2)
  })

  it("does not install the same component twice", async () => {
    const catalog = {
      a: makeItem("a", { registryDependencies: ["shared"] }),
      b: makeItem("b", { registryDependencies: ["shared"] }),
      shared: makeItem("shared"),
    }
    const adapters = makeAdapters(catalog)
    const installer = new ComponentInstaller("react", "/out", adapters)

    await installer.installWithDeps("a")
    await installer.installWithDeps("b")
    await installer.installWithDeps("shared") // third call — should be no-op

    expect(adapters.fetch).toHaveBeenCalledTimes(3) // a, b, shared — shared only once
    expect(installer.getResult().installed.size).toBe(3)
  })

  it("returns the cached item on a subsequent call without re-fetching", async () => {
    const catalog = { button: makeItem("button") }
    const adapters = makeAdapters(catalog)
    const installer = new ComponentInstaller("react", "/out", adapters)

    await installer.installWithDeps("button")
    const second = await installer.installWithDeps("button")

    expect(second?.name).toBe("button")
    expect(adapters.fetch).toHaveBeenCalledOnce() // only fetched once
    expect(adapters.write).toHaveBeenCalledOnce() // only written once
  })

  it("collects devDependencies separately from dependencies", async () => {
    const catalog = {
      "data-table": makeItem("data-table", {
        dependencies: ["@tanstack/react-table"],
        devDependencies: ["@types/react-table"],
      }),
    }
    const adapters = makeAdapters(catalog)
    const installer = new ComponentInstaller("react", "/out", adapters)

    await installer.installWithDeps("data-table")

    const result = installer.getResult()
    expect(result.deps.has("@tanstack/react-table")).toBe(true)
    expect(result.devDeps.has("@types/react-table")).toBe(true)
  })

  it("propagates fetch errors", async () => {
    const adapters = makeAdapters({})
    const installer = new ComponentInstaller("react", "/out", adapters)

    await expect(installer.installWithDeps("nonexistent")).rejects.toThrow(
      'Component "nonexistent" not found'
    )
  })

  it("passes the framework to the fetch adapter", async () => {
    const catalog = { button: makeItem("button") }
    const adapters = makeAdapters(catalog)
    const installer = new ComponentInstaller("svelte", "/out", adapters)

    await installer.installWithDeps("button")

    expect(adapters.fetch).toHaveBeenCalledWith("svelte", "button")
  })

  it("accumulates writtenPaths across installs", async () => {
    const catalog = {
      card: makeItem("card", {
        files: [
          { path: "components/ui/card.tsx", content: "// card", type: "registry:ui" },
          { path: "components/ui/card-header.tsx", content: "// header", type: "registry:ui" },
        ],
      }),
    }
    const adapters = makeAdapters(catalog)
    const installer = new ComponentInstaller("react", "/out", adapters)

    await installer.installWithDeps("card")

    expect(installer.getResult().writtenPaths).toHaveLength(2)
  })
})
