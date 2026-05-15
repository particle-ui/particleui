/**
 * Reads particle/animation source files from scripts/particles/<name>.tsx
 * and emits registry JSON to registry/react/particles/<name>.json
 *
 * Usage: node scripts/gen-particles.mjs
 */
import { readFileSync, writeFileSync, readdirSync, mkdirSync } from "fs"
import path from "path"
import { fileURLToPath } from "url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, "..")
const SRC = path.join(__dirname, "particles")
const OUT = path.join(ROOT, "registry/react/particles")

mkdirSync(OUT, { recursive: true })

const meta = {
  "tilt-card": {
    type: "registry:ui",
    title: "Tilt Card",
    description: "3D perspective tilt card with cursor-tracked glare highlight. Pure CSS transforms, no dependencies.",
    categories: ["cards", "particles", "free"],
    dependencies: [],
    filePath: "components/ui/tilt-card.tsx",
  },
  typewriter: {
    type: "registry:ui",
    title: "Typewriter",
    description: "Animated typewriter with configurable typing/deleting speed, pause, and loop. Electric cursor blink.",
    categories: ["text", "particles", "free"],
    dependencies: [],
    filePath: "components/ui/typewriter.tsx",
  },
  counter: {
    type: "registry:ui",
    title: "Counter",
    description: "Spring-animated number counter with IntersectionObserver trigger, easing, and prefix/suffix support.",
    categories: ["text", "particles", "free"],
    dependencies: [],
    filePath: "components/ui/counter.tsx",
  },
  "gradient-text": {
    type: "registry:ui",
    title: "Gradient Text",
    description: "Animated gradient text with 5 variants: electric, aurora, fire, candy, and gold.",
    categories: ["text", "particles", "free"],
    dependencies: ["tailwind-variants"],
    filePath: "components/ui/gradient-text.tsx",
  },
  meteors: {
    type: "registry:ui",
    title: "Meteors",
    description: "CSS-animated meteor shower effect. Drop into any relative-positioned container.",
    categories: ["background", "particles", "free"],
    dependencies: [],
    filePath: "components/ui/meteors.tsx",
  },
  "confetti-button": {
    type: "registry:ui",
    title: "Confetti Button",
    description: "Button that fires a canvas confetti burst on click. Wraps the core Button component.",
    categories: ["buttons", "particles", "free"],
    dependencies: [],
    registryDependencies: ["button"],
    filePath: "components/ui/confetti-button.tsx",
  },
  "shimmer-button": {
    type: "registry:ui",
    title: "Shimmer Button",
    description: "Button with rotating conic-gradient shimmer border effect. Three variants: default, filled, dark.",
    categories: ["buttons", "particles", "free"],
    dependencies: ["tailwind-variants"],
    filePath: "components/ui/shimmer-button.tsx",
  },
  "glow-card": {
    type: "registry:ui",
    title: "Glow Card",
    description: "Card with cursor-tracked radial spotlight glow. Configurable color, size, and opacity.",
    categories: ["cards", "particles", "free"],
    dependencies: [],
    filePath: "components/ui/glow-card.tsx",
  },
  "floating-dock": {
    type: "registry:ui",
    title: "Floating Dock",
    description: "macOS-style dock with spring-scale magnification on hover. Fully keyboard accessible.",
    categories: ["navigation", "particles", "free"],
    dependencies: [],
    filePath: "components/ui/floating-dock.tsx",
  },
  marquee: {
    type: "registry:ui",
    title: "Marquee",
    description: "Infinite scroll marquee with configurable speed, direction, gap, and pause-on-hover.",
    categories: ["layout", "particles", "free"],
    dependencies: [],
    filePath: "components/ui/marquee.tsx",
  },
  beam: {
    type: "registry:ui",
    title: "Beam",
    description: "Animated light beam that slides across a 1px separator line. Configurable color, speed, and delay.",
    categories: ["layout", "particles", "free"],
    dependencies: [],
    filePath: "components/ui/beam.tsx",
  },
  "glow-input": {
    type: "registry:ui",
    title: "Glow Input",
    description: "Input with animated gradient border and drop-shadow glow on focus. Drop-in replacement for Input.",
    categories: ["forms", "particles", "free"],
    dependencies: [],
    filePath: "components/ui/glow-input.tsx",
  },
}

const files = readdirSync(SRC).filter((f) => f.endsWith(".tsx"))

for (const file of files) {
  const name = file.replace(".tsx", "")
  const m = meta[name]
  if (!m) {
    console.warn(`No meta for ${name}, skipping`)
    continue
  }

  const content = readFileSync(path.join(SRC, file), "utf-8")

  const item = {
    $schema: "https://particleui.dev/schema/registry-item.json",
    name,
    type: m.type,
    title: m.title,
    description: m.description,
    author: "ParticleUI",
    categories: m.categories,
    dependencies: m.dependencies ?? [],
    registryDependencies: m.registryDependencies ?? [],
    files: [
      {
        path: m.filePath,
        type: "registry:ui",
        content,
      },
    ],
    cssVars: { light: {}, dark: {} },
  }

  const outPath = path.join(OUT, `${name}.json`)
  writeFileSync(outPath, JSON.stringify(item, null, 2))
  console.log(`✓ particles/${name}`)
}

console.log(`\nDone. Run: pnpm registry:build`)
