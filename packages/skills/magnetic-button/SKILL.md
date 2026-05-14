# MagneticButton Skill

## What it does
A button that physically tracks the cursor with spring physics. On hover the button body shifts toward the cursor; on leave it snaps back.

## Key props
| Prop | Type | Default |
|------|------|---------|
| `strength` | `number` | `0.35` |
| `glowColor` | `string` | `"rgba(0,212,255,0.3)"` |

All standard `<button>` attributes forwarded.

## Common customizations
**Subtle pull:** `strength={0.15}`
**Strong pull:** `strength={0.6}` — use carefully, can feel disorienting
**Brand color glow:** `glowColor="rgba(124,58,237,0.4)"`

## Install
```bash
npx shadcn add @particleui/magnetic-button
```
