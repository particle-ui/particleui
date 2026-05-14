import { tokens } from "./tokens"

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
}
