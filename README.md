# ParticleUI

A premium component registry for [shadcn/ui](https://ui.shadcn.com) projects — 85+ free components that install directly into your codebase via the ParticleUI CLI. You own the source, style it however you want, ship it to production.

```bash
npx particleui-cli@latest
```

## What's included

| Tier | Count | Description |
|------|-------|-------------|
| Core Primitives | 40+ | Buttons, inputs, modals, tables, every building block |
| Particle Effects | 12 | Glows, beams, meteors, tilt, marquee, shimmer |
| Full-page Blocks | 19 | Hero, pricing, auth, dashboards, FAQ, testimonials |
| Templates | 6 | Complete multi-section page compositions |

## Features

- **Own CLI** — `npx particleui-cli add button`. Works standalone or alongside shadcn.
- **OKLCH design tokens** — Perceptual color scales with semantic tokens. Dark mode first class.
- **React · Vue · Svelte** — Same components, three frameworks.
- **MCP Server** — Claude can search and install components in any conversation.
- **AI Generator** — Describe a UI in plain English, get a live preview + install command.
- **Theme Studio** — Design your own OKLCH theme in-browser, export as CSS or a registry URL.
- **WCAG AA accessible** — All color pairs checked. Focus rings, ARIA roles, keyboard nav.
- **MIT licensed** — Free components are MIT. You always own the source.

## Quick start

```bash
# Bootstrap a new project
npx particleui-cli@latest

# Add components to an existing project
npx particleui-cli add button card badge

# Add multiple at once
npx particleui-cli add glow-card tilt-card marquee beam

# Vue or Svelte
npx particleui-cli add button --framework vue
npx particleui-cli add button --framework svelte

# Generate a layout from a prompt
npx particleui-cli generate "SaaS landing page for a fintech startup"
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
│   ├── react/                # React component registry JSON
│   ├── vue/                  # Vue 3 component registry JSON
│   └── svelte/               # Svelte component registry JSON
└── scripts/
    ├── components/           # Core component source files
    ├── blocks/               # Full-page block source files
    ├── particles/            # Particle effect source files
    ├── vue/                  # Vue SFC source files
    └── svelte/               # Svelte SFC source files
```

## Development setup

**Prerequisites:** Node.js ≥ 20, pnpm ≥ 9

```bash
git clone https://github.com/particle-ui/particleui.git
cd particleui
pnpm install
```

**Run the docs site:**

```bash
pnpm dev
```

**Regenerate the registry:**

```bash
# All frameworks + build index
pnpm registry:all

# Specific tiers
pnpm registry:gen        # core components
pnpm registry:blocks     # full-page blocks
pnpm registry:particles  # particle effects
pnpm registry:templates  # page templates
pnpm registry:vue        # Vue 3 ports
pnpm registry:svelte     # Svelte ports
```

**Environment variables** (copy `apps/web/.env.example` to `apps/web/.env.local`):

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | Neon Postgres connection string |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk auth public key |
| `CLERK_SECRET_KEY` | Clerk auth secret key |
| `ANTHROPIC_API_KEY` | Anthropic API key (for `/generate`) |
| `PARTICLEUI_TOKEN` | Pro license token (optional) |

## CLI reference

| Command | Description |
|---------|-------------|
| `particleui` | Bootstrap a new project (interactive) |
| `particleui create [name]` | Scaffold a new Next.js + ParticleUI project |
| `particleui add <components...>` | Add one or more components |
| `particleui list [query]` | Browse available components |
| `particleui init` | Set up config in an existing project |
| `particleui generate <prompt>` | AI layout generation |

## MCP server

Add to your Claude Code config (`~/.claude/claude.json`):

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

See [CONTRIBUTING.md](CONTRIBUTING.md). All contributions welcome — bug fixes, new components, framework ports, docs improvements.

## License

MIT — see [LICENSE](LICENSE). Free components are MIT licensed. Pro components require a license available at [particleui.dev](https://particleui.dev).
