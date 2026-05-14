import { writeFileSync } from "fs"
import { tokens } from "../dist/tokens.js"

const lines = [
  "/* Auto-generated — do not edit. Run pnpm build in packages/tokens */",
  ":root {",
]

for (const [key, value] of Object.entries(tokens.colors)) {
  lines.push(`  --color-${key}: ${value};`)
}

for (const [key, value] of Object.entries(tokens.shadows)) {
  lines.push(`  --shadow-${key}: ${value};`)
}

for (const [key, value] of Object.entries(tokens.durations)) {
  lines.push(`  --duration-${key}: ${value};`)
}

lines.push("}", "")

writeFileSync("dist/tokens.css", lines.join("\n"))
console.log("✓ dist/tokens.css written")
