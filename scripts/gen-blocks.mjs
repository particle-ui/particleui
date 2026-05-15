/**
 * Reads block source files from scripts/blocks/<name>.tsx
 * and emits registry JSON to registry/react/blocks/<name>.json
 *
 * Usage: node scripts/gen-blocks.mjs
 */
import { readFileSync, writeFileSync, readdirSync, mkdirSync } from "fs"
import path from "path"
import { fileURLToPath } from "url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, "..")
const SRC = path.join(__dirname, "blocks")
const OUT = path.join(ROOT, "registry/react/blocks")

mkdirSync(OUT, { recursive: true })

const meta = {
  "hero-centered": {
    type: "registry:block",
    title: "Hero — Centered",
    description: "Full-width centered hero with gradient headline, typewriter subtitle, CTA buttons, beam separator, and optional meteor shower.",
    categories: ["hero", "blocks", "free"],
    dependencies: ["lucide-react"],
    registryDependencies: ["button", "badge", "gradient-text", "typewriter", "beam", "meteors"],
    filePath: "components/blocks/hero-centered.tsx",
  },
  "hero-split": {
    type: "registry:block",
    title: "Hero — Split",
    description: "Two-column hero with headline and feature bullets on the left, animated code preview card on the right.",
    categories: ["hero", "blocks", "free"],
    dependencies: ["lucide-react"],
    registryDependencies: ["button", "badge", "glow-card", "gradient-text", "beam"],
    filePath: "components/blocks/hero-split.tsx",
  },
  pricing: {
    type: "registry:block",
    title: "Pricing Section",
    description: "Three-tier pricing table with monthly/annual toggle, feature lists, and highlighted popular plan.",
    categories: ["marketing", "blocks", "free"],
    dependencies: ["lucide-react"],
    registryDependencies: ["button", "badge", "card", "switch", "label"],
    filePath: "components/blocks/pricing.tsx",
  },
  "feature-grid": {
    type: "registry:block",
    title: "Feature Grid",
    description: "Bento-style feature grid with glow cards, gradient text titles, and icon badges.",
    categories: ["marketing", "blocks", "free"],
    dependencies: ["lucide-react"],
    registryDependencies: ["glow-card", "gradient-text", "badge"],
    filePath: "components/blocks/feature-grid.tsx",
  },
  "feature-alternating": {
    type: "registry:block",
    title: "Feature — Alternating",
    description: "Three alternating feature rows with code previews. Left-right layout flips on odd rows.",
    categories: ["marketing", "blocks", "free"],
    dependencies: [],
    registryDependencies: ["badge", "glow-card", "gradient-text", "beam"],
    filePath: "components/blocks/feature-alternating.tsx",
  },
  "cta-section": {
    type: "registry:block",
    title: "CTA Section",
    description: "Full-width call-to-action section with radial gradient background, meteors, and dual CTA buttons.",
    categories: ["marketing", "blocks", "free"],
    dependencies: ["lucide-react"],
    registryDependencies: ["button", "gradient-text", "meteors"],
    filePath: "components/blocks/cta-section.tsx",
  },
  footer: {
    type: "registry:block",
    title: "Footer",
    description: "Three-column footer with brand tagline, link groups, legal links, and copyright.",
    categories: ["layout", "blocks", "free"],
    dependencies: [],
    registryDependencies: ["separator"],
    filePath: "components/blocks/footer.tsx",
  },
  "auth-sign-in": {
    type: "registry:block",
    title: "Auth — Sign In",
    description: "Sign-in form with email/password, Google/GitHub social buttons, and forgot password link.",
    categories: ["auth", "blocks", "free"],
    dependencies: [],
    registryDependencies: ["button", "input", "label", "card", "separator"],
    filePath: "components/blocks/auth-sign-in.tsx",
  },
  "auth-sign-up": {
    type: "registry:block",
    title: "Auth — Sign Up",
    description: "Sign-up form with name, email, password, terms checkbox, and social login options.",
    categories: ["auth", "blocks", "free"],
    dependencies: [],
    registryDependencies: ["button", "input", "label", "card", "checkbox", "separator"],
    filePath: "components/blocks/auth-sign-up.tsx",
  },
  "dashboard-analytics": {
    type: "registry:block",
    title: "Dashboard — Analytics",
    description: "Analytics dashboard with metric cards, recent orders table, and top pages with progress bars.",
    categories: ["dashboard", "blocks", "free"],
    dependencies: ["lucide-react"],
    registryDependencies: ["card", "badge", "button", "progress", "avatar", "table", "select"],
    filePath: "components/blocks/dashboard-analytics.tsx",
  },
  "settings-page": {
    type: "registry:block",
    title: "Settings Page",
    description: "Settings layout with Profile, Security, Notifications, and Billing tabs.",
    categories: ["dashboard", "blocks", "free"],
    dependencies: ["lucide-react"],
    registryDependencies: ["button", "input", "label", "card", "tabs", "switch", "select", "avatar", "separator", "badge"],
    filePath: "components/blocks/settings-page.tsx",
  },
  "ai-chat": {
    type: "registry:block",
    title: "AI Chat Interface",
    description: "Full-featured AI chat UI with message bubbles, model selector, copy button, and typing indicator.",
    categories: ["ai", "blocks", "free"],
    dependencies: ["lucide-react"],
    registryDependencies: ["button", "input", "avatar", "scroll-area", "select", "badge"],
    filePath: "components/blocks/ai-chat.tsx",
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
        type: "registry:block",
        content,
      },
    ],
    cssVars: { light: {}, dark: {} },
  }

  const outPath = path.join(OUT, `${name}.json`)
  writeFileSync(outPath, JSON.stringify(item, null, 2))
  console.log(`✓ blocks/${name}`)
}

console.log(`\nDone. Run: pnpm registry:build`)
