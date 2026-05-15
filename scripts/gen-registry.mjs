/**
 * Reads component source files from scripts/components/<name>.tsx
 * and emits registry JSON to registry/react/core/<name>.json
 *
 * Usage: node scripts/gen-registry.mjs
 */
import { readFileSync, writeFileSync, readdirSync } from "fs"
import path from "path"
import { fileURLToPath } from "url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, "..")
const SRC = path.join(__dirname, "components")
const OUT = path.join(ROOT, "registry/react/core")

const meta = {
  button: {
    type: "registry:ui",
    title: "Button",
    description: "Accessible button with six variants and electric-glow on the default variant.",
    categories: ["buttons", "core", "free"],
    dependencies: ["@radix-ui/react-slot", "tailwind-variants"],
    filePath: "components/ui/button.tsx",
  },
  input: {
    type: "registry:ui",
    title: "Input",
    description: "Text input with OKLCH-tuned focus ring and surface hierarchy.",
    categories: ["forms", "core", "free"],
    dependencies: [],
    filePath: "components/ui/input.tsx",
  },
  textarea: {
    type: "registry:ui",
    title: "Textarea",
    description: "Auto-resizable textarea with matching input design language.",
    categories: ["forms", "core", "free"],
    dependencies: [],
    filePath: "components/ui/textarea.tsx",
  },
  label: {
    type: "registry:ui",
    title: "Label",
    description: "Accessible form label built on Radix UI.",
    categories: ["forms", "core", "free"],
    dependencies: ["@radix-ui/react-label", "tailwind-variants"],
    filePath: "components/ui/label.tsx",
  },
  badge: {
    type: "registry:ui",
    title: "Badge",
    description: "Inline status badge with five variants including electric accent.",
    categories: ["badges", "core", "free"],
    dependencies: ["tailwind-variants"],
    filePath: "components/ui/badge.tsx",
  },
  card: {
    type: "registry:ui",
    title: "Card",
    description: "Composable card with header, content, and footer slots.",
    categories: ["layout", "core", "free"],
    dependencies: [],
    filePath: "components/ui/card.tsx",
  },
  separator: {
    type: "registry:ui",
    title: "Separator",
    description: "Horizontal or vertical separator rule built on Radix UI.",
    categories: ["layout", "core", "free"],
    dependencies: ["@radix-ui/react-separator"],
    filePath: "components/ui/separator.tsx",
  },
  skeleton: {
    type: "registry:ui",
    title: "Skeleton",
    description: "Loading placeholder with subtle pulse animation.",
    categories: ["feedback", "core", "free"],
    dependencies: [],
    filePath: "components/ui/skeleton.tsx",
  },
  avatar: {
    type: "registry:ui",
    title: "Avatar",
    description: "Circular avatar with image, fallback initials, and electric ring variant.",
    categories: ["display", "core", "free"],
    dependencies: ["@radix-ui/react-avatar"],
    filePath: "components/ui/avatar.tsx",
  },
  tooltip: {
    type: "registry:ui",
    title: "Tooltip",
    description: "Lightweight tooltip built on Radix UI with smooth fade-in.",
    categories: ["overlay", "core", "free"],
    dependencies: ["@radix-ui/react-tooltip"],
    filePath: "components/ui/tooltip.tsx",
  },
  switch: {
    type: "registry:ui",
    title: "Switch",
    description: "Toggle switch built on Radix UI with electric accent when checked.",
    categories: ["forms", "core", "free"],
    dependencies: ["@radix-ui/react-switch"],
    filePath: "components/ui/switch.tsx",
  },
  checkbox: {
    type: "registry:ui",
    title: "Checkbox",
    description: "Checkbox with electric fill and smooth check animation.",
    categories: ["forms", "core", "free"],
    dependencies: ["@radix-ui/react-checkbox", "lucide-react"],
    filePath: "components/ui/checkbox.tsx",
  },
  "radio-group": {
    type: "registry:ui",
    title: "Radio Group",
    description: "Radio group built on Radix UI with electric accent indicator.",
    categories: ["forms", "core", "free"],
    dependencies: ["@radix-ui/react-radio-group"],
    filePath: "components/ui/radio-group.tsx",
  },
  select: {
    type: "registry:ui",
    title: "Select",
    description: "Full-featured select built on Radix UI with keyboard navigation.",
    categories: ["forms", "core", "free"],
    dependencies: ["@radix-ui/react-select", "lucide-react"],
    filePath: "components/ui/select.tsx",
  },
  sonner: {
    type: "registry:ui",
    title: "Sonner",
    description: "Toast notifications via Sonner with ParticleUI dark theme.",
    categories: ["feedback", "core", "free"],
    dependencies: ["sonner"],
    filePath: "components/ui/sonner.tsx",
  },
  dialog: {
    type: "registry:ui",
    title: "Dialog",
    description: "Accessible modal dialog built on Radix UI with smooth enter/exit animations.",
    categories: ["overlay", "core", "free"],
    dependencies: ["@radix-ui/react-dialog", "lucide-react"],
    filePath: "components/ui/dialog.tsx",
  },
  "alert-dialog": {
    type: "registry:ui",
    title: "Alert Dialog",
    description: "Confirmation dialog with accessible labelling. Blocks interaction until dismissed.",
    categories: ["overlay", "core", "free"],
    dependencies: ["@radix-ui/react-alert-dialog", "tailwind-variants"],
    filePath: "components/ui/alert-dialog.tsx",
  },
  sheet: {
    type: "registry:ui",
    title: "Sheet",
    description: "Slide-in panel from any edge — left, right, top, or bottom. Built on Radix Dialog.",
    categories: ["overlay", "core", "free"],
    dependencies: ["@radix-ui/react-dialog", "lucide-react", "tailwind-variants"],
    filePath: "components/ui/sheet.tsx",
  },
  "dropdown-menu": {
    type: "registry:ui",
    title: "Dropdown Menu",
    description: "Accessible dropdown with items, checkboxes, radio groups, labels, and submenus.",
    categories: ["overlay", "core", "free"],
    dependencies: ["@radix-ui/react-dropdown-menu", "lucide-react"],
    filePath: "components/ui/dropdown-menu.tsx",
  },
  popover: {
    type: "registry:ui",
    title: "Popover",
    description: "Floating popover panel anchored to a trigger, with smart collision detection.",
    categories: ["overlay", "core", "free"],
    dependencies: ["@radix-ui/react-popover"],
    filePath: "components/ui/popover.tsx",
  },
  tabs: {
    type: "registry:ui",
    title: "Tabs",
    description: "Accessible tab panels built on Radix UI with keyboard navigation.",
    categories: ["navigation", "core", "free"],
    dependencies: ["@radix-ui/react-tabs"],
    filePath: "components/ui/tabs.tsx",
  },
  accordion: {
    type: "registry:ui",
    title: "Accordion",
    description: "Vertically stacked sections that expand/collapse, built on Radix UI.",
    categories: ["disclosure", "core", "free"],
    dependencies: ["@radix-ui/react-accordion", "lucide-react"],
    filePath: "components/ui/accordion.tsx",
  },
  alert: {
    type: "registry:ui",
    title: "Alert",
    description: "Inline alert banner with default, info, success, warning, and destructive variants.",
    categories: ["feedback", "core", "free"],
    dependencies: ["tailwind-variants", "lucide-react"],
    filePath: "components/ui/alert.tsx",
  },
  command: {
    type: "registry:ui",
    title: "Command",
    description: "Command palette / ⌘K menu built on cmdk with fuzzy search.",
    categories: ["overlay", "core", "free"],
    dependencies: ["cmdk", "lucide-react"],
    filePath: "components/ui/command.tsx",
  },
  form: {
    type: "registry:ui",
    title: "Form",
    description: "Form field wrappers integrating react-hook-form with accessible labels, descriptions, and error messages.",
    categories: ["forms", "core", "free"],
    dependencies: ["@radix-ui/react-label", "@radix-ui/react-slot", "react-hook-form"],
    filePath: "components/ui/form.tsx",
  },
  table: {
    type: "registry:ui",
    title: "Table",
    description: "Styled HTML table with header, body, footer, row, head, and cell slots.",
    categories: ["data", "core", "free"],
    dependencies: [],
    filePath: "components/ui/table.tsx",
  },
  "data-table": {
    type: "registry:ui",
    title: "Data Table",
    description: "Fully featured data table with sorting, filtering, pagination, and row selection via TanStack Table v8.",
    categories: ["data", "core", "free"],
    dependencies: ["@tanstack/react-table", "lucide-react"],
    filePath: "components/ui/data-table.tsx",
  },
  pagination: {
    type: "registry:ui",
    title: "Pagination",
    description: "Page navigation control with previous, next, numbered pages, and ellipsis.",
    categories: ["navigation", "core", "free"],
    dependencies: ["lucide-react"],
    filePath: "components/ui/pagination.tsx",
  },
  slider: {
    type: "registry:ui",
    title: "Slider",
    description: "Range slider built on Radix UI with electric glow on the thumb.",
    categories: ["forms", "core", "free"],
    dependencies: ["@radix-ui/react-slider"],
    filePath: "components/ui/slider.tsx",
  },
  progress: {
    type: "registry:ui",
    title: "Progress",
    description: "Linear progress bar built on Radix UI with electric accent fill and glow.",
    categories: ["feedback", "core", "free"],
    dependencies: ["@radix-ui/react-progress"],
    filePath: "components/ui/progress.tsx",
  },
  breadcrumb: {
    type: "registry:ui",
    title: "Breadcrumb",
    description: "Accessible breadcrumb navigation with separator, ellipsis, and current page slots.",
    categories: ["navigation", "core", "free"],
    dependencies: ["lucide-react"],
    filePath: "components/ui/breadcrumb.tsx",
  },
  "scroll-area": {
    type: "registry:ui",
    title: "Scroll Area",
    description: "Custom scrollbar overlay built on Radix UI. Consistent across browsers.",
    categories: ["layout", "core", "free"],
    dependencies: ["@radix-ui/react-scroll-area"],
    filePath: "components/ui/scroll-area.tsx",
  },
  "hover-card": {
    type: "registry:ui",
    title: "Hover Card",
    description: "Rich hover card for previewing content without navigating away.",
    categories: ["overlay", "core", "free"],
    dependencies: ["@radix-ui/react-hover-card"],
    filePath: "components/ui/hover-card.tsx",
  },
  "context-menu": {
    type: "registry:ui",
    title: "Context Menu",
    description: "Right-click context menu with items, checkboxes, radio groups, submenus, and shortcuts.",
    categories: ["overlay", "core", "free"],
    dependencies: ["@radix-ui/react-context-menu", "lucide-react"],
    filePath: "components/ui/context-menu.tsx",
  },
  resizable: {
    type: "registry:ui",
    title: "Resizable",
    description: "Draggable resize handles for panel layouts, built on react-resizable-panels.",
    categories: ["layout", "core", "free"],
    dependencies: ["react-resizable-panels", "lucide-react"],
    filePath: "components/ui/resizable.tsx",
  },
  "navigation-menu": {
    type: "registry:ui",
    title: "Navigation Menu",
    description: "Accessible site navigation with dropdown panels, built on Radix UI.",
    categories: ["navigation", "core", "free"],
    dependencies: ["@radix-ui/react-navigation-menu", "lucide-react", "tailwind-variants"],
    filePath: "components/ui/navigation-menu.tsx",
  },
  calendar: {
    type: "registry:ui",
    title: "Calendar",
    description: "Full-featured calendar picker built on react-day-picker with ParticleUI styling.",
    categories: ["forms", "core", "free"],
    dependencies: ["react-day-picker", "lucide-react"],
    filePath: "components/ui/calendar.tsx",
  },
  "date-picker": {
    type: "registry:ui",
    title: "Date Picker",
    description: "Calendar inside a Popover, triggered by a Button. Composable and accessible.",
    categories: ["forms", "core", "free"],
    dependencies: ["date-fns", "lucide-react"],
    filePath: "components/ui/date-picker.tsx",
  },
  combobox: {
    type: "registry:ui",
    title: "Combobox",
    description: "Searchable select built by combining Command inside a Popover.",
    categories: ["forms", "core", "free"],
    dependencies: ["lucide-react"],
    filePath: "components/ui/combobox.tsx",
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
    dependencies: m.dependencies,
    registryDependencies: [],
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
  console.log(`✓ core/${name}`)
}

console.log(`\nDone. Run: pnpm registry:build`)
