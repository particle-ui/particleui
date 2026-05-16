export type TokenScale = Record<string, string>

export const tokens = {
  colors: {
    // Particle brand palette — deep space with electric accents
    "particle-50": "oklch(97% 0.02 265)",
    "particle-100": "oklch(93% 0.04 265)",
    "particle-200": "oklch(86% 0.08 265)",
    "particle-300": "oklch(76% 0.13 265)",
    "particle-400": "oklch(63% 0.19 265)",
    "particle-500": "oklch(52% 0.24 265)",
    "particle-600": "oklch(44% 0.27 265)",
    "particle-700": "oklch(36% 0.24 265)",
    "particle-800": "oklch(27% 0.18 265)",
    "particle-900": "oklch(18% 0.11 265)",
    "particle-950": "oklch(12% 0.07 265)",
    // Electric accent
    "electric-400": "oklch(78% 0.22 205)",
    "electric-500": "oklch(68% 0.27 205)",
    "electric-600": "oklch(56% 0.27 205)",
  },

  shadows: {
    "glow-sm": "0 0 8px 2px oklch(68% 0.27 205 / 0.3)",
    "glow-md": "0 0 20px 4px oklch(68% 0.27 205 / 0.4)",
    "glow-lg": "0 0 40px 8px oklch(68% 0.27 205 / 0.5)",
    "glow-particle": "0 0 60px 12px oklch(52% 0.24 265 / 0.6)",
  },

  durations: {
    "particle-slow": "3000ms",
    "particle-medium": "1500ms",
    "particle-fast": "600ms",
  },
} as const

// Tailwind preset — exposes brand palette + glow shadows + animation durations.
// Import this in your tailwind.config.ts: presets: [tailwindPreset]
export const tailwindPreset = {
  theme: {
    extend: {
      colors: {
        particle: {
          50: tokens.colors["particle-50"],
          100: tokens.colors["particle-100"],
          200: tokens.colors["particle-200"],
          300: tokens.colors["particle-300"],
          400: tokens.colors["particle-400"],
          500: tokens.colors["particle-500"],
          600: tokens.colors["particle-600"],
          700: tokens.colors["particle-700"],
          800: tokens.colors["particle-800"],
          900: tokens.colors["particle-900"],
          950: tokens.colors["particle-950"],
        },
        electric: {
          400: tokens.colors["electric-400"],
          500: tokens.colors["electric-500"],
          600: tokens.colors["electric-600"],
        },
      },
      boxShadow: tokens.shadows,
      transitionDuration: tokens.durations,
    },
  },
} as const

// CSS variable names for the component theme system (defined in globals.css).
// Use these instead of hardcoding magic strings like "var(--color-accent)".
export const vars = {
  bg: "var(--color-bg)",
  surface1: "var(--color-surface-1)",
  surface2: "var(--color-surface-2)",
  surface3: "var(--color-surface-3)",
  border: "var(--color-border)",
  borderHover: "var(--color-border-hover)",
  accent: "var(--color-accent)",
  accentDim: "var(--color-accent-dim)",
  accentBorder: "var(--color-accent-border)",
  accentText: "var(--color-accent-text)",
  text1: "var(--color-text-1)",
  text2: "var(--color-text-2)",
  text3: "var(--color-text-3)",
  text4: "var(--color-text-4)",
  success: "var(--color-success)",
  successDim: "var(--color-success-dim)",
  successBorder: "var(--color-success-border)",
  successText: "var(--color-success-text)",
  error: "var(--color-error)",
  errorDim: "var(--color-error-dim)",
  errorBorder: "var(--color-error-border)",
  errorText: "var(--color-error-text)",
  warning: "var(--color-warning)",
  warningDim: "var(--color-warning-dim)",
  warningBorder: "var(--color-warning-border)",
  warningText: "var(--color-warning-text)",
  info: "var(--color-info)",
  infoDim: "var(--color-info-dim)",
  infoBorder: "var(--color-info-border)",
  infoText: "var(--color-info-text)",
} as const
