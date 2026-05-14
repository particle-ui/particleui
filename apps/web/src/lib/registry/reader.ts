import { promises as fs } from "fs"
import path from "path"

const REGISTRY_DIR = path.join(process.cwd(), "public", "r")

export async function readRegistryItem(
  fw: string,
  name: string
): Promise<unknown | null> {
  const filePath = path.join(REGISTRY_DIR, fw, `${name}.json`)
  try {
    const raw = await fs.readFile(filePath, "utf-8")
    return JSON.parse(raw)
  } catch {
    return null
  }
}
