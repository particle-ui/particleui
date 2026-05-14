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

  // Glow effects
  shadows: {
    "glow-sm": "0 0 8px 2px oklch(68% 0.27 205 / 0.3)",
    "glow-md": "0 0 20px 4px oklch(68% 0.27 205 / 0.4)",
    "glow-lg": "0 0 40px 8px oklch(68% 0.27 205 / 0.5)",
    "glow-particle": "0 0 60px 12px oklch(52% 0.24 265 / 0.6)",
  },

  // Animation durations
  durations: {
    "particle-slow": "3000ms",
    "particle-medium": "1500ms",
    "particle-fast": "600ms",
  },
} as const
