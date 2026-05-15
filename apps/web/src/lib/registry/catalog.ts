const PRO_ITEMS: Record<string, Set<string>> = {
  react: new Set([
    "aurora-background",
    "cursor-trail",
    "magnetic-button",
    "orbit-animation",
    "particle-hero",
    "spotlight-hero",
  ]),
  vue: new Set(),
  svelte: new Set(),
}

export function isProItem(fw: string, name: string): boolean {
  return PRO_ITEMS[fw]?.has(name) ?? false
}
