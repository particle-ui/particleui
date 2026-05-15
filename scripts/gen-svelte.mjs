/**
 * Reads Svelte 5 component source files from scripts/svelte/*.svelte
 * and emits registry JSON to registry/svelte/core/<name>.json
 *
 * Usage: node scripts/gen-svelte.mjs
 */
import { readFileSync, writeFileSync, readdirSync, mkdirSync } from "fs"
import path from "path"
import { fileURLToPath } from "url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, "..")
const SRC = path.join(__dirname, "svelte")
const OUT = path.join(ROOT, "registry/svelte/core")

mkdirSync(OUT, { recursive: true })

// Components that are grouped together (sub-files emitted into the parent's registry item)
const GROUPS = {
  card: ["card", "card-header", "card-title", "card-description", "card-content", "card-footer"],
  tabs: ["tabs", "tabs-list", "tabs-trigger", "tabs-content"],
}

const meta = {
  button: {
    title: "Button",
    description: "Accessible button with six variants. Electric-glow on the default variant.",
    categories: ["buttons", "core", "free"],
    dependencies: ["tailwind-variants"],
  },
  input: {
    title: "Input",
    description: "Text input with OKLCH-tuned focus ring and surface hierarchy.",
    categories: ["forms", "core", "free"],
    dependencies: [],
  },
  textarea: {
    title: "Textarea",
    description: "Textarea with matching input design language.",
    categories: ["forms", "core", "free"],
    dependencies: [],
  },
  label: {
    title: "Label",
    description: "Accessible form label.",
    categories: ["forms", "core", "free"],
    dependencies: [],
  },
  badge: {
    title: "Badge",
    description: "Inline status badge with four variants.",
    categories: ["badges", "core", "free"],
    dependencies: ["tailwind-variants"],
  },
  card: {
    title: "Card",
    description: "Composable card with header, content, and footer slots.",
    categories: ["layout", "core", "free"],
    dependencies: [],
    subFiles: ["card-header", "card-title", "card-description", "card-content", "card-footer"],
  },
  separator: {
    title: "Separator",
    description: "Horizontal or vertical visual divider.",
    categories: ["layout", "core", "free"],
    dependencies: [],
  },
  skeleton: {
    title: "Skeleton",
    description: "Animated placeholder for loading states.",
    categories: ["feedback", "core", "free"],
    dependencies: [],
  },
  avatar: {
    title: "Avatar",
    description: "Circular avatar with image and initials fallback.",
    categories: ["media", "core", "free"],
    dependencies: [],
  },
  switch: {
    title: "Switch",
    description: "Accessible toggle switch with electric-cyan on state.",
    categories: ["forms", "core", "free"],
    dependencies: [],
  },
  checkbox: {
    title: "Checkbox",
    description: "Accessible checkbox with electric-accent checked state.",
    categories: ["forms", "core", "free"],
    dependencies: [],
  },
  tabs: {
    title: "Tabs",
    description: "Context-based tab panels with keyboard navigation.",
    categories: ["navigation", "core", "free"],
    dependencies: [],
    subFiles: ["tabs-list", "tabs-trigger", "tabs-content"],
  },
}

// Skip sub-component files — they're bundled into the parent
const SKIP = new Set([
  "card-header", "card-title", "card-description", "card-content", "card-footer",
  "tabs-list", "tabs-trigger", "tabs-content",
])

const files = readdirSync(SRC).filter((f) => f.endsWith(".svelte"))

for (const file of files) {
  const name = file.replace(".svelte", "")
  if (SKIP.has(name)) continue

  const m = meta[name]
  if (!m) {
    console.warn(`No meta for ${name}, skipping`)
    continue
  }

  const registryFiles = [
    {
      path: `components/ui/${name}.svelte`,
      type: "registry:ui",
      content: readFileSync(path.join(SRC, file), "utf-8"),
    },
  ]

  // Bundle sub-components
  if (m.subFiles) {
    for (const sub of m.subFiles) {
      const subFile = path.join(SRC, `${sub}.svelte`)
      registryFiles.push({
        path: `components/ui/${sub}.svelte`,
        type: "registry:ui",
        content: readFileSync(subFile, "utf-8"),
      })
    }
  }

  const item = {
    $schema: "https://particleui.dev/schema/registry-item.json",
    name,
    type: "registry:ui",
    title: m.title,
    description: m.description,
    author: "ParticleUI",
    categories: m.categories,
    dependencies: m.dependencies ?? [],
    registryDependencies: [],
    files: registryFiles,
    cssVars: { light: {}, dark: {} },
  }

  const outPath = path.join(OUT, `${name}.json`)
  writeFileSync(outPath, JSON.stringify(item, null, 2))
  console.log(`✓ svelte/${name}`)
}

console.log(`\nDone. Run: pnpm registry:build`)
