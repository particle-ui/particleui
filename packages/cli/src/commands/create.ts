import { Command } from "commander"
import chalk from "chalk"
import ora from "ora"
import prompts from "prompts"
import { mkdirSync, writeFileSync, existsSync } from "fs"
import { join, resolve } from "path"
import { execSync } from "child_process"
import { fetchComponent, type RegistryItem } from "../lib/registry.js"
import { writeComponentFiles } from "../lib/project.js"
import { log } from "../lib/logger.js"

const STARTER_COMPONENTS = ["button", "badge", "card", "input", "label", "separator"]

export async function runCreate(name?: string) {
    console.log()
    console.log(chalk.bold("ParticleUI — Create new project"))
    console.log()

    const answers = await prompts([
      {
        type: name ? null : "text",
        name: "projectName",
        message: "Project name",
        initial: "my-app",
        validate: (v: string) => /^[a-z0-9-_]+$/.test(v) || "Use lowercase letters, numbers, hyphens only",
      },
      {
        type: "select",
        name: "packageManager",
        message: "Package manager",
        choices: [
          { title: "npm", value: "npm" },
          { title: "pnpm", value: "pnpm" },
          { title: "yarn", value: "yarn" },
          { title: "bun", value: "bun" },
        ],
      },
      {
        type: "text",
        name: "token",
        message: "Pro token (optional — press Enter to skip)",
        initial: process.env.PARTICLEUI_TOKEN ?? "",
      },
    ])

    const projectName = name ?? (answers.projectName as string)
    if (!projectName) { log.warn("Aborted."); return }

    const pm = (answers.packageManager as string) ?? "npm"
    const token = answers.token as string | undefined
    const projectDir = resolve(projectName)

    if (existsSync(projectDir)) {
      log.error(`Directory "${projectName}" already exists.`)
      process.exit(1)
    }

    console.log()

    // --- Scaffold files ---
    const spinner = ora("Scaffolding project...").start()

    const dirs = [
      projectDir,
      join(projectDir, "src/app"),
      join(projectDir, "src/components/ui"),
      join(projectDir, "src/lib"),
      join(projectDir, "public"),
    ]
    for (const d of dirs) mkdirSync(d, { recursive: true })

    function write(relPath: string, content: string) {
      writeFileSync(join(projectDir, relPath), content, "utf-8")
    }

    write("package.json", generatePackageJson(projectName))
    write("tsconfig.json", TSCONFIG)
    write("next.config.ts", NEXT_CONFIG)
    write("postcss.config.mjs", POSTCSS_CONFIG)
    write("src/app/globals.css", GLOBALS_CSS)
    write("src/app/layout.tsx", LAYOUT_TSX)
    write("src/app/page.tsx", PAGE_TSX)
    write("src/lib/utils.ts", UTILS_TS)
    write(".gitignore", GITIGNORE)
    write(".env.example", ENV_EXAMPLE)
    write("particleui.json", JSON.stringify({ framework: "react", componentsDir: "src/components/ui" }, null, 2))
    if (token) write(".env.local", `PARTICLEUI_TOKEN=${token}\n`)

    spinner.succeed("Project scaffolded")

    // --- Install dependencies ---
    const installSpinner = ora(`Installing dependencies with ${pm}...`).start()
    try {
      const installCmd = pm === "npm" ? "npm install" : pm === "yarn" ? "yarn" : `${pm} install`
      installSpinner.stop()
      execSync(installCmd, {
        cwd: projectDir,
        stdio: "inherit",
        env: { ...process.env },
        shell: true,
      })
      installSpinner.succeed("Dependencies installed")
    } catch (err) {
      installSpinner.warn("Dependency install failed — run manually")
      if (err instanceof Error) console.error(chalk.red("  " + err.message.split("\n")[0]))
    }

    // --- Install starter components ---
    const componentsSpinner = ora("Adding starter components...").start()
    const componentsDir = join(projectDir, "src/components/ui")
    let installedCount = 0
    for (const componentName of STARTER_COMPONENTS) {
      try {
        const item = await fetchComponent("react", componentName)
        const files = (item as RegistryItem).files
        writeComponentFiles(files, componentsDir)
        installedCount++
      } catch {
        // skip silently — registry may not be reachable in all envs
      }
    }
    if (installedCount > 0) {
      componentsSpinner.succeed(`Added ${installedCount} starter components`)
    } else {
      componentsSpinner.warn("Starter components skipped (run: particleui add button badge card)")
    }

    // --- Done ---
    console.log()
    console.log(chalk.bold("✓ Done! Your project is ready."))
    console.log()
    console.log(chalk.dim("  Next steps:"))
    console.log(chalk.cyan(`    cd ${projectName}`))
    console.log(chalk.cyan(`    ${pm === "npm" ? "npm run dev" : pm === "bun" ? "bun dev" : `${pm} dev`}`))
    console.log()
    console.log(chalk.dim("  Add more components:"))
    console.log(chalk.cyan(`    particleui add glow-card tilt-card marquee`))
    console.log()
    console.log(chalk.dim("  Explore:"))
    console.log(chalk.cyan("    https://particleui.dev/docs"))
    console.log()
}

export const createCommand = new Command("create")
  .alias("new")
  .description("Scaffold a new project with ParticleUI pre-installed")
  .argument("[name]", "Project name")
  .action(runCreate)

function generatePackageJson(name: string): string {
  return JSON.stringify(
    {
      name,
      version: "0.1.0",
      private: true,
      scripts: {
        dev: "next dev --turbopack",
        build: "next build",
        start: "next start",
      },
      dependencies: {
        next: "^15.3.0",
        react: "^19.1.0",
        "react-dom": "^19.1.0",
        "@radix-ui/react-slot": "^1.2.3",
        "class-variance-authority": "^0.7.1",
        clsx: "^2.1.1",
        "tailwind-merge": "^3.2.0",
        "tailwind-variants": "^3.2.2",
      },
      devDependencies: {
        typescript: "^5.8.3",
        "@types/node": "^22.0.0",
        "@types/react": "^19.1.0",
        "@types/react-dom": "^19.1.0",
        tailwindcss: "^4.1.7",
        "@tailwindcss/postcss": "^4.1.7",
      },
    },
    null,
    2
  )
}

const TSCONFIG = `{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./src/*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules"]
}`

const NEXT_CONFIG = `import type { NextConfig } from "next"
const config: NextConfig = {}
export default config
`

const POSTCSS_CONFIG = `const config = { plugins: { "@tailwindcss/postcss": {} } }
export default config
`

const GLOBALS_CSS = `@import "tailwindcss";

@theme {
  /* ── Fonts ──────────────────────────────────────────────────────────────── */
  --font-sans: var(--font-geist), ui-sans-serif, system-ui, -apple-system, sans-serif;
  --font-mono: var(--font-geist-mono), "Fira Code", ui-monospace, monospace;

  /* ── Neutral scale (OKLCH perceptual) ────────────────────────────────────
     Step from 97% down to 3% lightness, 0 chroma, hue 0
     Each step is visually equidistant — unlike raw hex grays             */
  --color-gray-50:  oklch(97% 0 0);
  --color-gray-100: oklch(93% 0 0);
  --color-gray-200: oklch(86% 0 0);
  --color-gray-300: oklch(76% 0 0);
  --color-gray-400: oklch(62% 0 0);
  --color-gray-500: oklch(50% 0 0);
  --color-gray-600: oklch(40% 0 0);
  --color-gray-700: oklch(30% 0 0);
  --color-gray-800: oklch(22% 0 0);
  --color-gray-900: oklch(14% 0 0);
  --color-gray-950: oklch(9%  0 0);
  --color-gray-1000: oklch(5% 0 0);

  /* ── Surfaces ────────────────────────────────────────────────────────────
     Warm espresso-black tint — rich depth without blue-gray coldness     */
  --color-bg:        oklch(4%  0.005 60);    /* warm near-black */
  --color-surface-1: oklch(8%  0.004 60);    /* warm dark card */
  --color-surface-2: oklch(12% 0.004 60);    /* elevated surface */
  --color-surface-3: oklch(16% 0.003 60);    /* hover state */
  --color-border:    oklch(100% 0 0 / 0.07); /* default border */
  --color-border-hover: oklch(100% 0 0 / 0.14);

  /* ── Accent — warm white / cream ────────────────────────────────────── */
  --color-accent:        oklch(96% 0.01 80);  /* warm white, like heavy cream */
  --color-accent-dim:    oklch(96% 0.01 80 / 0.08);
  --color-accent-border: oklch(96% 0.01 80 / 0.18);
  --color-accent-text:   oklch(90% 0.008 80); /* slightly softer for inline text */

  /* ── Text hierarchy — warm grays ────────────────────────────────────── */
  --color-text-1: oklch(97% 0.005 80);   /* warm white — headings */
  --color-text-2: oklch(72% 0.003 80);   /* warm light gray — body */
  --color-text-3: oklch(50% 0.002 80);   /* warm mid-gray — secondary */
  --color-text-4: oklch(33% 0.001 80);   /* warm dark gray — placeholders */

  /* ── Type scale ──────────────────────────────────────────────────────── */
  --text-2xs: 0.6875rem;   /* 11px */
  --text-xs:  0.75rem;     /* 12px */
  --text-sm:  0.875rem;    /* 14px */
  --text-base: 1rem;       /* 16px */
  --text-lg:  1.125rem;    /* 18px */
  --text-xl:  1.25rem;     /* 20px */
  --text-2xl: 1.5rem;      /* 24px */
  --text-3xl: 1.875rem;    /* 30px */
  --text-4xl: 2.25rem;     /* 36px */
  --text-5xl: 3rem;        /* 48px */

  /* ── Radii ────────────────────────────────────────────────────────────── */
  --radius-sm:  6px;
  --radius-md:  10px;
  --radius-lg:  14px;
  --radius-xl:  18px;
  --radius-2xl: 22px;
  --radius-full: 9999px;

  /* ── Semantic — Success (green, hue 145°) ───────────────────────────── */
  --color-success:        oklch(65% 0.17 145);   /* 7.2:1 on bg ✓ AAA */
  --color-success-dim:    oklch(65% 0.17 145 / 0.10);
  --color-success-border: oklch(65% 0.17 145 / 0.22);
  --color-success-text:   oklch(72% 0.14 145);

  /* ── Semantic — Error (red, hue 25°) ───────────────────────────────── */
  --color-error:        oklch(65% 0.20 25);      /* 7.0:1 on bg ✓ AAA */
  --color-error-dim:    oklch(65% 0.20 25 / 0.10);
  --color-error-border: oklch(65% 0.20 25 / 0.22);
  --color-error-text:   oklch(72% 0.17 25);

  /* ── Semantic — Warning (amber, hue 75°) ───────────────────────────── */
  --color-warning:        oklch(78% 0.16 75);    /* 10.4:1 on bg ✓ AAA */
  --color-warning-dim:    oklch(78% 0.16 75 / 0.10);
  --color-warning-border: oklch(78% 0.16 75 / 0.22);
  --color-warning-text:   oklch(82% 0.14 75);

  /* ── Semantic — Info (blue, hue 230°) ──────────────────────────────── */
  --color-info:        oklch(70% 0.13 230);      /* 8.4:1 on bg ✓ AAA */
  --color-info-dim:    oklch(70% 0.13 230 / 0.10);
  --color-info-border: oklch(70% 0.13 230 / 0.22);
  --color-info-text:   oklch(76% 0.11 230);

  /* ── Shadows ─────────────────────────────────────────────────────────── */
  --shadow-glow-sm: 0 0 14px 2px oklch(96% 0.01 80 / 0.18);
  --shadow-glow-md: 0 0 28px 4px oklch(96% 0.01 80 / 0.22);
  --color-shadow-overlay: oklch(0% 0 0 / 0.50);
  --color-shadow-strong:  oklch(0% 0 0 / 0.60);
  --color-accent-glow-sm: oklch(96% 0.01 80 / 0.25);
  --color-accent-glow-lg: oklch(96% 0.01 80 / 0.40);
  --color-glass-shine:     oklch(100% 0 0 / 0.12);
  --color-glass-highlight: oklch(100% 0 0 / 0.60);
}

/* ── Dark mode (explicit — next-themes sets class="dark" on html) ─────────── */
.dark {
  color-scheme: dark;
  --color-bg:        oklch(4%  0.005 60);
  --color-surface-1: oklch(8%  0.004 60);
  --color-surface-2: oklch(12% 0.004 60);
  --color-surface-3: oklch(16% 0.003 60);
  --color-border:    oklch(100% 0 0 / 0.07);
  --color-border-hover: oklch(100% 0 0 / 0.14);

  --color-accent:        oklch(96% 0.01 80);
  --color-accent-dim:    oklch(96% 0.01 80 / 0.08);
  --color-accent-border: oklch(96% 0.01 80 / 0.18);
  --color-accent-text:   oklch(90% 0.008 80);

  --color-text-1: oklch(97% 0.005 80);
  --color-text-2: oklch(72% 0.003 80);
  --color-text-3: oklch(50% 0.002 80);
  --color-text-4: oklch(33% 0.001 80);

  --color-success:        oklch(65% 0.17 145);
  --color-success-dim:    oklch(65% 0.17 145 / 0.10);
  --color-success-border: oklch(65% 0.17 145 / 0.22);
  --color-success-text:   oklch(72% 0.14 145);

  --color-error:        oklch(65% 0.20 25);
  --color-error-dim:    oklch(65% 0.20 25 / 0.10);
  --color-error-border: oklch(65% 0.20 25 / 0.22);
  --color-error-text:   oklch(72% 0.17 25);

  --color-warning:        oklch(78% 0.16 75);
  --color-warning-dim:    oklch(78% 0.16 75 / 0.10);
  --color-warning-border: oklch(78% 0.16 75 / 0.22);
  --color-warning-text:   oklch(82% 0.14 75);

  --color-info:        oklch(70% 0.13 230);
  --color-info-dim:    oklch(70% 0.13 230 / 0.10);
  --color-info-border: oklch(70% 0.13 230 / 0.22);
  --color-info-text:   oklch(76% 0.11 230);

  --shadow-glow-sm: 0 0 14px 2px oklch(96% 0.01 80 / 0.18);
  --shadow-glow-md: 0 0 28px 4px oklch(96% 0.01 80 / 0.22);
  --color-shadow-overlay: oklch(0% 0 0 / 0.50);
  --color-shadow-strong:  oklch(0% 0 0 / 0.60);
  --color-accent-glow-sm: oklch(96% 0.01 80 / 0.25);
  --color-accent-glow-lg: oklch(96% 0.01 80 / 0.40);
  --color-glass-shine:     oklch(100% 0 0 / 0.12);
  --color-glass-highlight: oklch(100% 0 0 / 0.60);
}

/* ── Light mode overrides ────────────────────────────────────────────────── */
.light {
  color-scheme: light;
  --color-bg:        oklch(99%  0.004 80);
  --color-surface-1: oklch(96%  0.004 80);
  --color-surface-2: oklch(93%  0.003 80);
  --color-surface-3: oklch(90%  0.003 80);
  --color-border:    oklch(0% 0 0 / 0.08);
  --color-border-hover: oklch(0% 0 0 / 0.16);

  --color-accent:        oklch(22% 0.005 60);
  --color-accent-dim:    oklch(22% 0.005 60 / 0.08);
  --color-accent-border: oklch(22% 0.005 60 / 0.18);
  --color-accent-text:   oklch(30% 0.004 60);

  --color-text-1: oklch(10%  0.005 60);
  --color-text-2: oklch(28%  0.003 60);
  --color-text-3: oklch(45%  0.002 60);
  --color-text-4: oklch(62%  0.001 60);

  --shadow-glow-sm: 0 0 14px 2px oklch(22% 0.005 60 / 0.12);
  --shadow-glow-md: 0 0 28px 4px oklch(22% 0.005 60 / 0.15);
  --color-shadow-overlay: oklch(0% 0 0 / 0.12);
  --color-shadow-strong:  oklch(0% 0 0 / 0.18);
  --color-accent-glow-sm: oklch(22% 0.005 60 / 0.20);
  --color-accent-glow-lg: oklch(22% 0.005 60 / 0.30);
  --color-glass-shine:     oklch(0% 0 0 / 0.06);
  --color-glass-highlight: oklch(0% 0 0 / 0.25);

  /* Semantic light overrides — all 4.5:1+ on light bg ✓ AA */
  --color-success:        oklch(38% 0.14 145);
  --color-success-dim:    oklch(38% 0.14 145 / 0.10);
  --color-success-border: oklch(38% 0.14 145 / 0.22);
  --color-success-text:   oklch(34% 0.13 145);

  --color-error:        oklch(40% 0.18 25);
  --color-error-dim:    oklch(40% 0.18 25 / 0.10);
  --color-error-border: oklch(40% 0.18 25 / 0.22);
  --color-error-text:   oklch(36% 0.17 25);

  --color-warning:        oklch(42% 0.14 75);
  --color-warning-dim:    oklch(42% 0.14 75 / 0.10);
  --color-warning-border: oklch(42% 0.14 75 / 0.22);
  --color-warning-text:   oklch(38% 0.13 75);

  --color-info:        oklch(40% 0.11 230);
  --color-info-dim:    oklch(40% 0.11 230 / 0.10);
  --color-info-border: oklch(40% 0.11 230 / 0.22);
  --color-info-text:   oklch(36% 0.10 230);
}

/* ── Semantic utility classes ────────────────────────────────────────────
   Tailwind v4 generates utilities from @theme, but explicit declarations
   here guarantee they work regardless of scanning / cache state.         */
@layer utilities {
  /* Backgrounds */
  .bg-bg        { background-color: var(--color-bg); }
  .bg-surface-1 { background-color: var(--color-surface-1); }
  .bg-surface-2 { background-color: var(--color-surface-2); }
  .bg-surface-3 { background-color: var(--color-surface-3); }
  .bg-accent     { background-color: var(--color-accent); }
  .bg-accent-dim { background-color: var(--color-accent-dim); }
  .bg-text-4     { background-color: var(--color-text-4); }

  /* Text */
  .text-text-1    { color: var(--color-text-1); }
  .text-text-2    { color: var(--color-text-2); }
  .text-text-3    { color: var(--color-text-3); }
  .text-text-4    { color: var(--color-text-4); }
  .text-accent     { color: var(--color-accent); }
  .text-accent-text { color: var(--color-accent-text); }

  /* Borders */
  .border-border        { border-color: var(--color-border); }
  .border-border-hover  { border-color: var(--color-border-hover); }
  .border-accent-border { border-color: var(--color-accent-border); }

  /* Divide */
  .divide-border > :not([hidden]) ~ :not([hidden]) {
    border-color: var(--color-border);
  }

  /* Semantic — success */
  .bg-success        { background-color: var(--color-success); }
  .bg-success-dim    { background-color: var(--color-success-dim); }
  .text-success      { color: var(--color-success-text); }
  .border-success    { border-color: var(--color-success-border); }

  /* Semantic — error */
  .bg-error          { background-color: var(--color-error); }
  .bg-error-dim      { background-color: var(--color-error-dim); }
  .text-error        { color: var(--color-error-text); }
  .border-error      { border-color: var(--color-error-border); }

  /* Semantic — warning */
  .bg-warning        { background-color: var(--color-warning); }
  .bg-warning-dim    { background-color: var(--color-warning-dim); }
  .text-warning      { color: var(--color-warning-text); }
  .border-warning    { border-color: var(--color-warning-border); }

  /* Semantic — info */
  .bg-info           { background-color: var(--color-info); }
  .bg-info-dim       { background-color: var(--color-info-dim); }
  .text-info         { color: var(--color-info-text); }
  .border-info       { border-color: var(--color-info-border); }
}

/* ── Code block (Shiki) overrides ───────────────────────────────────────── */
[class*="shiki"] pre,
[class*="shiki"] code {
  font-family: var(--font-mono);
  font-size: 0.8125rem;
  line-height: 1.75;
}

/* Scrollbar for code blocks */
.overflow-x-auto::-webkit-scrollbar,
.overflow-auto::-webkit-scrollbar {
  height: 4px;
  width: 4px;
}
.overflow-x-auto::-webkit-scrollbar-thumb,
.overflow-auto::-webkit-scrollbar-thumb {
  background: oklch(22% 0 0);
  border-radius: 2px;
}
.overflow-x-auto::-webkit-scrollbar-thumb:hover,
.overflow-auto::-webkit-scrollbar-thumb:hover {
  background: oklch(30% 0 0);
}

/* ── Base ───────────────────────────────────────────────────────────────── */
*, *::before, *::after {
  box-sizing: border-box;
}

html {
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  background-color: var(--color-bg);
  color: var(--color-text-1);
  font-family: var(--font-sans);
  font-size: var(--text-sm);
  line-height: 1.6;
  font-feature-settings: "rlig" 1, "calt" 1, "ss01" 1;
  font-variant-numeric: tabular-nums;
}

/* ── Headings ───────────────────────────────────────────────────────────── */
h1, h2, h3, h4, h5, h6 {
  line-height: 1.15;
  letter-spacing: -0.03em;
  color: var(--color-text-1);
}

/* ── Code ───────────────────────────────────────────────────────────────── */
code, kbd, pre {
  font-family: var(--font-mono);
  font-feature-settings: "liga" 0, "calt" 0;
}

/* ── Focus ──────────────────────────────────────────────────────────────── */
:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
  border-radius: var(--radius-sm);
}

/* ── Scrollbar ──────────────────────────────────────────────────────────── */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background: var(--color-surface-3);
  border-radius: 3px;
}
::-webkit-scrollbar-thumb:hover {
  background: var(--color-border-hover);
}

/* ── Selection ──────────────────────────────────────────────────────────── */
::selection {
  background: oklch(78% 0.17 200 / 0.25);
}

/* ── Accordion animations ───────────────────────────────────────────────── */
@keyframes accordion-down {
  from { height: 0; opacity: 0; }
  to { height: var(--radix-accordion-content-height); opacity: 1; }
}
@keyframes accordion-up {
  from { height: var(--radix-accordion-content-height); opacity: 1; }
  to { height: 0; opacity: 0; }
}
.animate-accordion-down {
  animation: accordion-down 0.2s ease-out;
}
.animate-accordion-up {
  animation: accordion-up 0.2s ease-out;
}

/* ── Particle layer animations ──────────────────────────────────────────── */
@keyframes typewriter-blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}
@keyframes gradient-shift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
@keyframes shimmer-spin {
  from { rotate: 0deg; }
  to { rotate: 360deg; }
}
@keyframes marquee-left {
  from { transform: translateX(0); }
  to { transform: translateX(-100%); }
}
@keyframes marquee-right {
  from { transform: translateX(-100%); }
  to { transform: translateX(0); }
}
@keyframes beam-slide {
  0%   { transform: translateX(-100%); opacity: 0; }
  20%  { opacity: 1; }
  80%  { opacity: 1; }
  100% { transform: translateX(200%); opacity: 0; }
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
`

const LAYOUT_TSX = `import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" })
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" })

export const metadata: Metadata = { title: "My App", description: "Built with ParticleUI" }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={\`\${geist.variable} \${geistMono.variable} font-sans antialiased\`}>
        {children}
      </body>
    </html>
  )
}
`

const PAGE_TSX = `export default function Home() {
  return (
    <main className="min-h-svh bg-[var(--color-bg)]">
      {/* Hero */}
      <section className="flex min-h-svh flex-col items-center justify-center px-6 text-center">
        <div
          className="mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs"
          style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-surface-1)", color: "var(--color-text-3)" }}
        >
          <span className="relative flex h-1.5 w-1.5 rounded-full" style={{ backgroundColor: "var(--color-accent)" }}>
            <span className="absolute inset-0 animate-ping rounded-full opacity-60" style={{ backgroundColor: "var(--color-accent)" }} />
          </span>
          ParticleUI starter — ready to ship
        </div>

        <h1
          className="text-[clamp(2.5rem,7vw,5rem)] font-bold leading-[0.95] tracking-[-0.05em]"
          style={{ color: "var(--color-text-1)" }}
        >
          Your app starts here
        </h1>

        <p className="mt-5 max-w-md text-lg leading-relaxed" style={{ color: "var(--color-text-2)" }}>
          ParticleUI components are already installed. Edit{" "}
          <code
            className="rounded px-1.5 py-0.5 text-sm font-mono"
            style={{ backgroundColor: "var(--color-surface-2)", color: "var(--color-accent)" }}
          >
            src/app/page.tsx
          </code>{" "}
          to get started.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a
            href="https://particleui.dev/docs"
            className="rounded-xl px-6 py-3 text-sm font-semibold transition-all hover:brightness-110"
            style={{ backgroundColor: "var(--color-accent)", color: "var(--color-bg)" }}
          >
            Browse components
          </a>
          <a
            href="https://particleui.dev/generate"
            className="rounded-xl border px-6 py-3 text-sm font-medium transition-all"
            style={{
              borderColor: "var(--color-border)",
              backgroundColor: "var(--color-surface-1)",
              color: "var(--color-text-2)",
            }}
          >
            AI Generator
          </a>
        </div>

        {/* Installed components preview */}
        <div
          className="mt-16 w-full max-w-2xl rounded-2xl border p-6 text-left"
          style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-surface-1)" }}
        >
          <p
            className="mb-4 text-xs font-semibold uppercase tracking-widest"
            style={{ color: "var(--color-text-4)" }}
          >
            Starter components installed
          </p>
          <div className="flex flex-wrap gap-2 mb-4">
            {["button", "badge", "card", "input", "label", "separator"].map((c) => (
              <span
                key={c}
                className="rounded-full border px-3 py-1 font-mono text-xs"
                style={{
                  borderColor: "var(--color-border)",
                  backgroundColor: "var(--color-surface-2)",
                  color: "var(--color-text-3)",
                }}
              >
                {c}
              </span>
            ))}
          </div>
          <div
            className="border-t pt-4 text-xs"
            style={{ borderColor: "var(--color-border)", color: "var(--color-text-4)" }}
          >
            Add more:{" "}
            <code style={{ color: "var(--color-accent)" }}>
              particleui add glow-card tilt-card marquee
            </code>
          </div>
        </div>

        {/* Feature cards */}
        <div className="mt-12 grid w-full max-w-2xl grid-cols-1 gap-3 sm:grid-cols-3">
          {[
            { title: "85+ components", desc: "Primitives, particles, and full-page blocks" },
            { title: "OKLCH tokens", desc: "Perceptual color system, dark mode first" },
            { title: "Your code", desc: "Files land in your project — you own them" },
          ].map((f) => (
            <div
              key={f.title}
              className="rounded-xl border p-4 text-left"
              style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-surface-1)" }}
            >
              <p className="text-sm font-semibold mb-1" style={{ color: "var(--color-text-1)" }}>{f.title}</p>
              <p className="text-xs leading-relaxed" style={{ color: "var(--color-text-3)" }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
`

const UTILS_TS = `import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
export function cn(...inputs: ClassValue[]) { return twMerge(clsx(inputs)) }
`

const GITIGNORE = `node_modules/
.next/
.env
.env.local
dist/
particleui.json
`

const ENV_EXAMPLE = `# PARTICLEUI_TOKEN=your-pro-token-here
`
