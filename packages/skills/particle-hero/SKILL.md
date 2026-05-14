# ParticleHero Component Skill

Use this skill to help customize the `ParticleHero` component from ParticleUI.

## What this component does

`ParticleHero` renders a full-viewport hero section with an animated particle canvas background, a headline, subtext, and CTA buttons. All visual properties are configurable via props.

## Key props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `particleCount` | `number` | `80` | Number of particles. Lower on mobile. |
| `particleColor` | `string` | `"electric"` | `"electric"`, `"particle"`, or any CSS color |
| `speed` | `"slow" \| "medium" \| "fast"` | `"medium"` | Animation speed |
| `connectLines` | `boolean` | `true` | Draw lines between nearby particles |
| `headline` | `React.ReactNode` | required | Main heading |
| `subtext` | `string` | — | Secondary description text |
| `cta` | `{ label: string; href: string; variant? }[]` | — | Array of CTA buttons |

## Common customizations

**Reduce particle density on mobile:**
```tsx
<ParticleHero
  particleCount={typeof window !== "undefined" && window.innerWidth < 768 ? 30 : 80}
/>
```

**Custom headline with gradient text:**
```tsx
<ParticleHero
  headline={
    <span className="bg-gradient-to-r from-electric-400 to-particle-300 bg-clip-text text-transparent">
      Ship faster with ParticleUI
    </span>
  }
/>
```

**Dark mode aware particle color:**
Use `particleColor="electric"` — it reads the `--color-electric-500` CSS var which already adapts to your theme.

## Performance notes

The canvas uses `requestAnimationFrame` and pauses when the tab is hidden via `visibilitychange`. On low-end devices, reduce `particleCount` to `<40` and set `connectLines={false}`.

## Install

```bash
npx shadcn add @particleui/particle-hero
```

Requires `PARTICLEUI_TOKEN` in your `.env`.
