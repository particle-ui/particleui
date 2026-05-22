# ParticleUI

<p align="center">
  <a href="https://particleui.dev">Website</a> ·
  <a href="https://particleui.dev/docs">Docs</a> ·
  <a href="https://particleui.dev/components">Components</a>
</p>

<p align="center">
  <a href="https://github.com/particleui/particleui/blob/main/LICENSE">
    <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="MIT License" />
  </a>
  <a href="https://www.npmjs.com/package/particleui-cli">
    <img src="https://img.shields.io/npm/v/particleui-cli?label=cli" alt="CLI version" />
  </a>
  <a href="https://github.com/particleui/particleui/stargazers">
    <img src="https://img.shields.io/github/stars/particleui/particleui?style=flat" alt="GitHub stars" />
  </a>
  <a href="https://github.com/particleui/particleui/commits/main">
    <img src="https://img.shields.io/github/last-commit/particleui/particleui" alt="Last commit" />
  </a>
</p>

<br />

**85+ free, open-source UI components for React** — install directly into your codebase via the CLI. You own the source, style it however you want, ship to production.

```bash
npx particleui-cli add button card badge glow-button
```

## What's included

| Category | Count | Examples |
|----------|-------|---------|
| Core Primitives | 40+ | Button, Input, Dialog, Table, Select, Tabs |
| Particle Effects | 20+ | Glow card, Meteors, Tilt, Marquee, Dot Matrix |
| Full-page Blocks | 19 | Hero, Pricing, Auth, Dashboard, FAQ, Testimonials |
| Templates | 6 | Landing, Blog, Docs, SaaS Dashboard, Auth, Pricing |

## Features

- **Own CLI** — `npx particleui-cli add button`. Works standalone or alongside shadcn/ui
- **OKLCH design tokens** — Perceptual color scales, semantic tokens, dark mode first-class
- **React · Vue · Svelte** — Same components, three frameworks
- **MCP Server** — Claude can search and install components in any conversation
- **AI Generator** — Describe a UI in plain English, get a live preview + install command
- **WCAG AA accessible** — All color pairs checked, focus rings, ARIA roles, keyboard nav
- **MIT licensed** — 100% free and open source, forever

## Quick start

```bash
# Add components to any project
npx particleui-cli add button

# Add multiple at once
npx particleui-cli add glow-card tilt-card marquee beam

# Vue or Svelte
npx particleui-cli add button --framework vue
npx particleui-cli add button --framework svelte

# Browse all components
npx particleui-cli list
```

## Monorepo structure

```
particleui/
├── apps/
│   └── web/                  # Next.js 15 docs + marketing site
├── mcp/
│   └── particleui-mcp/       # MCP server for Claude Code integration
├── packages/
│   ├── cli/                  # particleui-cli npm package
│   ├── registry-builder/     # Builds registry JSON from source files
│   └── tokens/               # Shared OKLCH design token definitions
├── registry/
│   ├── react/                # React component source registry
│   ├── vue/                  # Vue 3 component source registry
│   └── svelte/               # Svelte component source registry
└── scripts/                  # Component source files
```

## Development setup

**Prerequisites:** Node.js ≥ 20, pnpm ≥ 9

```bash
git clone https://github.com/particleui/particleui.git
cd particleui
pnpm install
pnpm dev
```

**Environment variables** — copy `apps/web/.env.example` to `apps/web/.env.local`:

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | Neon Postgres connection string |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk auth public key |
| `CLERK_SECRET_KEY` | Clerk auth secret key |
| `GROQ_API_KEY` | Groq API key for `/generate` — free at console.groq.com |
| `RESEND_API_KEY` | Resend for transactional email |

## MCP server (Claude Code)

Add to `~/.claude/claude.json`:

```json
{
  "mcpServers": {
    "particleui": {
      "command": "npx",
      "args": ["-y", "@particleui/mcp"]
    }
  }
}
```

Claude can then search, preview, and install components directly in any conversation.

## Contributing

All contributions welcome — bug fixes, new components, framework ports, docs improvements.

See [CONTRIBUTING.md](CONTRIBUTING.md) to get started.

## License

[MIT](LICENSE) — free forever.
