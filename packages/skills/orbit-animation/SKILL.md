# OrbitAnimation Skill

## What it does
Renders a set of elements orbiting a central node using pure CSS `@keyframes`. Each item rotates around the center at a configurable radius, speed, and starting offset.

## Key props
| Prop | Type | Default |
|------|------|---------|
| `center` | `ReactNode` | — |
| `items` | `OrbitItem[]` | required |
| `size` | `number` (px) | `280` |

### OrbitItem shape
```ts
{ content: ReactNode; radius?: number; duration?: number; offset?: number }
```

## Example — tech stack icons
```tsx
<OrbitAnimation
  center={<Logo />}
  size={320}
  items={[
    { content: <ReactIcon />, radius: 80, duration: 8 },
    { content: <TypeScriptIcon />, radius: 120, duration: 14 },
    { content: <TailwindIcon />, radius: 80, duration: 8, offset: 180 },
  ]}
/>
```

## Install
```bash
npx shadcn add @particleui/orbit-animation
```
