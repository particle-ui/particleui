# AuroraBackground Skill

## What it does
Renders slow-moving aurora gradient blobs over any surface. Each blob is an absolutely positioned div with `blur` and CSS keyframe animations.

## Key props
| Prop | Type | Default |
|------|------|---------|
| `colors` | `string[]` | `["#00d4ff","#7c3aed","#0ea5e9","#10b981"]` |
| `speed` | `"slow"\|"medium"\|"fast"` | `"medium"` |
| `blur` | `number` (px) | `80` |

## Common customizations
**Custom brand colors:** `<AuroraBackground colors={["#ff6b35","#f7c59f","#efefd0"]}>`
**Full page:** wrap in `min-h-svh` — the component fills its parent.
**Overlay text:** children render above the aurora via `relative z-10`.

## Install
```bash
npx shadcn add @particleui/aurora-background
```
