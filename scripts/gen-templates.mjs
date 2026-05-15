/**
 * Reads template source files from apps/web/src/components/templates/<name>.tsx
 * and emits registry JSON to registry/react/templates/<name>.json
 *
 * Usage: node scripts/gen-templates.mjs
 */
import { readFileSync, writeFileSync, mkdirSync } from "fs"
import path from "path"
import { fileURLToPath } from "url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, "..")
const SRC = path.join(ROOT, "apps/web/src/components/templates")
const OUT = path.join(ROOT, "registry/react/templates")

mkdirSync(OUT, { recursive: true })

const meta = {
  landing: {
    type: "registry:block",
    title: "Landing Page",
    description:
      "Complete SaaS landing page: hero, logo cloud, alternating features, stats, testimonials, pricing, FAQ, CTA, and footer. Install one component, get everything.",
    categories: ["template", "marketing", "free"],
    registryDependencies: [
      "hero-split",
      "logo-cloud",
      "feature-alternating",
      "stats",
      "testimonials",
      "pricing",
      "faq",
      "cta-section",
      "footer",
    ],
    filePath: "components/templates/landing.tsx",
  },
  "saas-dashboard": {
    type: "registry:block",
    title: "SaaS Dashboard",
    description:
      "Analytics-focused dashboard with KPI stat cards and a detailed data table. Drop into any admin layout.",
    categories: ["template", "dashboard", "free"],
    registryDependencies: ["stats", "dashboard-analytics"],
    filePath: "components/templates/saas-dashboard.tsx",
  },
  auth: {
    type: "registry:block",
    title: "Auth Flow",
    description:
      "Sign-in, sign-up, forgot-password, and verify-email screens stitched together. Ready to wire to your auth provider.",
    categories: ["template", "auth", "free"],
    registryDependencies: [
      "auth-sign-in",
      "auth-sign-up",
      "auth-forgot-password",
      "auth-verify-email",
    ],
    filePath: "components/templates/auth.tsx",
  },
  "pricing-page": {
    type: "registry:block",
    title: "Pricing Page",
    description:
      "Dedicated pricing page with a centered hero, three-tier pricing table, FAQ section, and CTA footer.",
    categories: ["template", "marketing", "free"],
    registryDependencies: ["hero-centered", "pricing", "faq", "cta-section", "footer"],
    filePath: "components/templates/pricing-page.tsx",
  },
  "docs-site": {
    type: "registry:block",
    title: "Docs Site",
    description:
      "Documentation shell with sticky top nav, sidebar navigation, main content area, on-page TOC, and footer.",
    categories: ["template", "documentation", "free"],
    registryDependencies: ["footer"],
    filePath: "components/templates/docs-site.tsx",
  },
  blog: {
    type: "registry:block",
    title: "Blog",
    description:
      "Blog index with header, hero, article list with author avatars, newsletter section, and footer.",
    categories: ["template", "content", "free"],
    registryDependencies: ["newsletter", "footer"],
    filePath: "components/templates/blog.tsx",
  },
}

for (const [name, m] of Object.entries(meta)) {
  const srcFile = path.join(SRC, `${name}.tsx`)
  let content
  try {
    content = readFileSync(srcFile, "utf-8")
  } catch {
    console.warn(`Missing source: ${srcFile} — skipping`)
    continue
  }

  const item = {
    $schema: "https://particleui.dev/schema/registry-item.json",
    name,
    type: m.type,
    title: m.title,
    description: m.description,
    author: "ParticleUI",
    categories: m.categories,
    dependencies: [],
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
  console.log(`✓ templates/${name}`)
}

console.log("\nDone.")
