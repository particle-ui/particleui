import type { RegistryItem } from "./registry.js"
import type { RegistryFile } from "./project.js"

export type InstallerAdapters = {
  fetch: (framework: string, name: string) => Promise<RegistryItem>
  write: (files: RegistryFile[], dir: string) => string[]
}

export type InstallResult = {
  installed: Map<string, RegistryItem>
  writtenPaths: string[]
  deps: Set<string>
  devDeps: Set<string>
}

export class ComponentInstaller {
  private seen = new Set<string>()
  private result: InstallResult = {
    installed: new Map(),
    writtenPaths: [],
    deps: new Set(),
    devDeps: new Set(),
  }

  constructor(
    private readonly framework: string,
    private readonly componentsDir: string,
    private readonly adapters: InstallerAdapters,
  ) {}

  async installWithDeps(name: string): Promise<RegistryItem | null> {
    if (this.seen.has(name)) return this.result.installed.get(name) ?? null
    this.seen.add(name)

    const item = await this.adapters.fetch(this.framework, name)

    const written = this.adapters.write(item.files, this.componentsDir)
    this.result.writtenPaths.push(...written)
    this.result.installed.set(name, item)

    for (const dep of item.dependencies ?? []) this.result.deps.add(dep)
    for (const dep of item.devDependencies ?? []) this.result.devDeps.add(dep)

    for (const dep of item.registryDependencies ?? []) {
      await this.installWithDeps(dep)
    }

    return item
  }

  getResult(): InstallResult {
    return this.result
  }
}
