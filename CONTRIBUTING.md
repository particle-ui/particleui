# Contributing to ParticleUI

Thanks for your interest in contributing. This document covers how to get set up, what kinds of contributions are welcome, and how the review process works.

## Ways to contribute

- **Bug reports** — Open an issue with a clear title and reproduction steps.
- **New components** — Core primitives, particle effects, or full-page blocks.
- **Framework ports** — Vue and Svelte ports of existing React components.
- **Docs improvements** — Fixes, examples, better explanations.
- **Design tokens** — Improvements to the OKLCH color system.
- **CLI features** — New commands, better error messages, framework support.

## Development setup

**Prerequisites:** Node.js ≥ 20, pnpm ≥ 9

```bash
git clone https://github.com/particleui/particleui.git
cd particleui
pnpm install
cp apps/web/.env.example apps/web/.env.local
# fill in your own DATABASE_URL, Clerk keys, etc.
pnpm dev
```

The docs site runs at `http://localhost:3000`.

## Adding a new component

1. **Write the source file** in `scripts/components/<name>.tsx` (core), `scripts/blocks/<name>.tsx` (block), or `scripts/particles/<name>.tsx` (effect).

2. **Add metadata** to the `meta` object in the corresponding gen script (`scripts/gen-registry.mjs`, `scripts/gen-blocks.mjs`, or `scripts/gen-particles.mjs`):

```js
"my-component": {
  type: "registry:ui",
  title: "My Component",
  description: "One clear sentence describing what it does.",
  categories: ["category", "core", "free"],
  dependencies: ["some-npm-package"],
  filePath: "components/ui/my-component.tsx",
},
```

3. **Add a preview** in `apps/web/src/app/(docs)/_components/previews.tsx` — export a `MyComponentPreview` function.

4. **Regenerate the registry:**

```bash
pnpm registry:gen   # or registry:blocks / registry:particles
```

5. **Check types:**

```bash
pnpm --filter web typecheck
```

## Adding a Vue or Svelte port

Write the SFC in `scripts/vue/<Name>.vue` or `scripts/svelte/<name>.svelte`, then add metadata to `scripts/gen-vue.mjs` or `scripts/gen-svelte.mjs` and run `pnpm registry:vue` / `pnpm registry:svelte`.

## Pull request checklist

- [ ] `pnpm --filter web typecheck` passes with no errors
- [ ] `pnpm registry:all` runs without errors
- [ ] New components have a preview in `previews.tsx`
- [ ] No hardcoded secrets, personal names, or internal URLs
- [ ] PR description explains *what* and *why*, links any related issue

## Commit style

Use conventional commits — `feat:`, `fix:`, `docs:`, `refactor:`, `chore:`. One topic per commit.

## Code style

- TypeScript strict mode throughout
- Tailwind classes only — no inline style objects except for CSS variable overrides
- No comments unless the *why* is genuinely non-obvious
- OKLCH for all color values — no hex, no hsl

## Reporting a security issue

Do **not** open a public issue. Email `security@particleui.dev` instead. We'll respond within 48 hours.

## License

By contributing, you agree that your contributions will be licensed under the [MIT License](LICENSE).
