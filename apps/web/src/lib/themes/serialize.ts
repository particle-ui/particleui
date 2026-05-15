export interface ThemeTokens {
  // Dark mode
  dark: {
    bg: string
    surface1: string
    surface2: string
    surface3: string
    border: string
    accent: string
    text1: string
    text2: string
    text3: string
    text4: string
    success: string
    error: string
    warning: string
    info: string
  }
  // Light mode (same keys)
  light: {
    bg: string
    surface1: string
    surface2: string
    surface3: string
    border: string
    accent: string
    text1: string
    text2: string
    text3: string
    text4: string
    success: string
    error: string
    warning: string
    info: string
  }
}

export const DEFAULT_TOKENS: ThemeTokens = {
  dark: {
    bg: "oklch(4% 0.005 60)",
    surface1: "oklch(8% 0.004 60)",
    surface2: "oklch(12% 0.004 60)",
    surface3: "oklch(16% 0.003 60)",
    border: "oklch(100% 0 0 / 0.07)",
    accent: "oklch(96% 0.01 80)",
    text1: "oklch(97% 0.005 80)",
    text2: "oklch(72% 0.003 80)",
    text3: "oklch(50% 0.002 80)",
    text4: "oklch(33% 0.001 80)",
    success: "oklch(65% 0.17 145)",
    error: "oklch(65% 0.20 25)",
    warning: "oklch(78% 0.16 75)",
    info: "oklch(70% 0.13 230)",
  },
  light: {
    bg: "oklch(99% 0.004 80)",
    surface1: "oklch(96% 0.004 80)",
    surface2: "oklch(93% 0.003 80)",
    surface3: "oklch(90% 0.003 80)",
    border: "oklch(0% 0 0 / 0.08)",
    accent: "oklch(22% 0.005 60)",
    text1: "oklch(10% 0.005 60)",
    text2: "oklch(28% 0.003 60)",
    text3: "oklch(45% 0.002 60)",
    text4: "oklch(62% 0.001 60)",
    success: "oklch(38% 0.14 145)",
    error: "oklch(40% 0.18 25)",
    warning: "oklch(42% 0.14 75)",
    info: "oklch(40% 0.11 230)",
  },
}

function toCSSVars(tokens: ThemeTokens["dark"], mode: "dark" | "light"): string {
  const prefix = mode === "dark" ? ".dark" : ".light"
  return (
    `${prefix} {\n` +
    `  --color-bg: ${tokens.bg};\n` +
    `  --color-surface-1: ${tokens.surface1};\n` +
    `  --color-surface-2: ${tokens.surface2};\n` +
    `  --color-surface-3: ${tokens.surface3};\n` +
    `  --color-border: ${tokens.border};\n` +
    `  --color-accent: ${tokens.accent};\n` +
    `  --color-text-1: ${tokens.text1};\n` +
    `  --color-text-2: ${tokens.text2};\n` +
    `  --color-text-3: ${tokens.text3};\n` +
    `  --color-text-4: ${tokens.text4};\n` +
    `  --color-success: ${tokens.success};\n` +
    `  --color-error: ${tokens.error};\n` +
    `  --color-warning: ${tokens.warning};\n` +
    `  --color-info: ${tokens.info};\n` +
    `}`
  )
}

export function tokensToCSS(tokens: ThemeTokens): string {
  return [toCSSVars(tokens.dark, "dark"), toCSSVars(tokens.light, "light")].join("\n\n")
}

export function tokensToRegistryItem(name: string, slug: string, tokens: ThemeTokens): object {
  return {
    name: slug,
    type: "registry:style",
    title: name,
    description: `Custom ParticleUI theme: ${name}`,
    cssVars: {
      dark: {
        "--color-bg": tokens.dark.bg,
        "--color-surface-1": tokens.dark.surface1,
        "--color-surface-2": tokens.dark.surface2,
        "--color-accent": tokens.dark.accent,
        "--color-text-1": tokens.dark.text1,
        "--color-text-2": tokens.dark.text2,
        "--color-text-3": tokens.dark.text3,
        "--color-text-4": tokens.dark.text4,
      },
      light: {
        "--color-bg": tokens.light.bg,
        "--color-surface-1": tokens.light.surface1,
        "--color-surface-2": tokens.light.surface2,
        "--color-accent": tokens.light.accent,
        "--color-text-1": tokens.light.text1,
        "--color-text-2": tokens.light.text2,
        "--color-text-3": tokens.light.text3,
        "--color-text-4": tokens.light.text4,
      },
    },
  }
}

export function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
}
