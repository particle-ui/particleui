/**
 * Reads Vue 3 component source files from scripts/vue/*.vue
 * and emits registry JSON to registry/vue/core/<name>.json
 *
 * Usage: node scripts/gen-vue.mjs
 */
import { readFileSync, writeFileSync, readdirSync, mkdirSync } from "fs"
import path from "path"
import { fileURLToPath } from "url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, "..")
const SRC = path.join(__dirname, "vue")
const OUT = path.join(ROOT, "registry/vue/core")

mkdirSync(OUT, { recursive: true })

const meta = {
  Button: {
    name: "button",
    title: "Button",
    description: "Accessible button with six variants. Electric-glow on the default variant.",
    categories: ["buttons", "core", "free"],
    dependencies: ["tailwind-variants"],
    subFiles: [],
  },
  Input: {
    name: "input",
    title: "Input",
    description: "Text input with OKLCH-tuned focus ring and surface hierarchy.",
    categories: ["forms", "core", "free"],
    dependencies: [],
    subFiles: [],
  },
  Textarea: {
    name: "textarea",
    title: "Textarea",
    description: "Textarea with matching input design language.",
    categories: ["forms", "core", "free"],
    dependencies: [],
    subFiles: [],
  },
  Label: {
    name: "label",
    title: "Label",
    description: "Accessible form label.",
    categories: ["forms", "core", "free"],
    dependencies: [],
    subFiles: [],
  },
  Badge: {
    name: "badge",
    title: "Badge",
    description: "Inline status badge with four variants.",
    categories: ["badges", "core", "free"],
    dependencies: ["tailwind-variants"],
    subFiles: [],
  },
  Card: {
    name: "card",
    title: "Card",
    description: "Composable card with header, content, and footer slots.",
    categories: ["layout", "core", "free"],
    dependencies: [],
    subFiles: ["CardHeader", "CardTitle", "CardDescription", "CardContent", "CardFooter"],
  },
  Separator: {
    name: "separator",
    title: "Separator",
    description: "Horizontal or vertical visual divider.",
    categories: ["layout", "core", "free"],
    dependencies: [],
    subFiles: [],
  },
  Skeleton: {
    name: "skeleton",
    title: "Skeleton",
    description: "Animated placeholder for loading states.",
    categories: ["feedback", "core", "free"],
    dependencies: [],
    subFiles: [],
  },
  Avatar: {
    name: "avatar",
    title: "Avatar",
    description: "Circular avatar with image and initials fallback.",
    categories: ["media", "core", "free"],
    dependencies: [],
    subFiles: [],
  },
  Switch: {
    name: "switch",
    title: "Switch",
    description: "Accessible toggle switch with electric-cyan on state.",
    categories: ["forms", "core", "free"],
    dependencies: [],
    subFiles: [],
  },
  Checkbox: {
    name: "checkbox",
    title: "Checkbox",
    description: "Accessible checkbox with electric-accent checked state.",
    categories: ["forms", "core", "free"],
    dependencies: [],
    subFiles: [],
  },
  Tabs: {
    name: "tabs",
    title: "Tabs",
    description: "Context-based tab panels with keyboard navigation.",
    categories: ["navigation", "core", "free"],
    dependencies: [],
    subFiles: ["TabsList", "TabsTrigger", "TabsContent"],
  },
}

// Skip sub-component files — bundled into parent
const SKIP = new Set([
  "CardHeader", "CardTitle", "CardDescription", "CardContent", "CardFooter",
  "TabsList", "TabsTrigger", "TabsContent",
])

const files = readdirSync(SRC).filter((f) => f.endsWith(".vue"))

for (const file of files) {
  const componentName = file.replace(".vue", "")
  if (SKIP.has(componentName)) continue

  const m = meta[componentName]
  if (!m) {
    console.warn(`No meta for ${componentName}, skipping`)
    continue
  }

  const kebab = m.name

  const registryFiles = [
    {
      path: `components/ui/${componentName}.vue`,
      type: "registry:ui",
      content: readFileSync(path.join(SRC, file), "utf-8"),
    },
  ]

  // Bundle sub-components
  for (const sub of m.subFiles ?? []) {
    registryFiles.push({
      path: `components/ui/${sub}.vue`,
      type: "registry:ui",
      content: readFileSync(path.join(SRC, `${sub}.vue`), "utf-8"),
    })
  }

  const item = {
    $schema: "https://particleui.dev/schema/registry-item.json",
    name: kebab,
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

  const outPath = path.join(OUT, `${kebab}.json`)
  writeFileSync(outPath, JSON.stringify(item, null, 2))
  console.log(`✓ vue/${kebab}`)
}

console.log(`\nDone. Run: pnpm registry:build`)
