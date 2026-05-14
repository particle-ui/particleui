const PRO_ITEMS: Record<string, Set<string>> = {
  react: new Set([
    "particle-hero",
    "particle-cursor",
    "magnetic-button",
    "aurora-background",
    "liquid-glass-card",
  ]),
  vue: new Set(),
  svelte: new Set(),
}

export function isProItem(fw: string, name: string): boolean {
  return PRO_ITEMS[fw]?.has(name) ?? false
}
