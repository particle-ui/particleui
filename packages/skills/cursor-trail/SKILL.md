# CursorTrail Skill

## What it does
Attaches a fixed canvas over the entire page that draws glowing particles at past cursor positions, fading them out over 600ms.

## Key props
| Prop | Type | Default |
|------|------|---------|
| `color` | `string` (CSS color) | `"#00d4ff"` |
| `size` | `number` (px) | `6` |
| `length` | `number` (history) | `20` |

## Usage
Place once at the root layout level:
```tsx
// app/layout.tsx
import { CursorTrail } from "@/components/ui/cursor-trail"
export default function RootLayout({ children }) {
  return (
    <html><body>
      <CursorTrail color="#00d4ff" />
      {children}
    </body></html>
  )
}
```

## Install
```bash
npx shadcn add @particleui/cursor-trail
```
