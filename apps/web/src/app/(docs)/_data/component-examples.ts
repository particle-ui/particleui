interface ComponentExample {
  title: string
  description?: string
  code: string
}

export const COMPONENT_EXAMPLES: Record<string, ComponentExample[]> = {
  button: [
    {
      title: "Variants",
      description: "Use the variant prop to change the visual style.",
      code: `import { Button } from "@/components/ui/button"

export default function Example() {
  return (
    <div className="flex flex-wrap gap-3">
      <Button variant="default">Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="link">Link</Button>
    </div>
  )
}`,
    },
    {
      title: "Sizes",
      description: "Adjust the size with the size prop.",
      code: `import { Button } from "@/components/ui/button"

export default function Example() {
  return (
    <div className="flex items-center gap-3">
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
    </div>
  )
}`,
    },
  ],

  badge: [
    {
      title: "Variants",
      description: "Use variant to communicate intent.",
      code: `import { Badge } from "@/components/ui/badge"

export default function Example() {
  return (
    <div className="flex flex-wrap gap-2">
      <Badge variant="default">Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="warning">Warning</Badge>
    </div>
  )
}`,
    },
  ],

  alert: [
    {
      title: "Variants",
      description: "Use variant to communicate the severity or nature of the alert.",
      code: `import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"

export default function Example() {
  return (
    <div className="space-y-3">
      <Alert variant="default">
        <AlertTitle>Default</AlertTitle>
        <AlertDescription>A neutral informational alert.</AlertDescription>
      </Alert>
      <Alert variant="info">
        <AlertTitle>Info</AlertTitle>
        <AlertDescription>Helpful context for the user.</AlertDescription>
      </Alert>
      <Alert variant="success">
        <AlertTitle>Success</AlertTitle>
        <AlertDescription>Action completed successfully.</AlertDescription>
      </Alert>
      <Alert variant="warning">
        <AlertTitle>Warning</AlertTitle>
        <AlertDescription>Proceed with caution.</AlertDescription>
      </Alert>
      <Alert variant="destructive">
        <AlertTitle>Destructive</AlertTitle>
        <AlertDescription>This action cannot be undone.</AlertDescription>
      </Alert>
    </div>
  )
}`,
    },
  ],

  input: [
    {
      title: "Types",
      description: "The type prop maps to the native HTML input type.",
      code: `import { Input } from "@/components/ui/input"

export default function Example() {
  return (
    <div className="space-y-3 max-w-sm">
      <Input type="text" placeholder="Text" />
      <Input type="email" placeholder="Email" />
      <Input type="password" placeholder="Password" />
      <Input type="number" placeholder="Number" />
    </div>
  )
}`,
    },
    {
      title: "Disabled state",
      code: `import { Input } from "@/components/ui/input"

export default function Example() {
  return <Input disabled placeholder="Disabled input" />
}`,
    },
  ],

  textarea: [
    {
      title: "With rows",
      description: "Control height with the rows prop.",
      code: `import { Textarea } from "@/components/ui/textarea"

export default function Example() {
  return (
    <div className="space-y-3 max-w-sm">
      <Textarea rows={2} placeholder="2 rows" />
      <Textarea rows={5} placeholder="5 rows (default)" />
      <Textarea rows={8} placeholder="8 rows" />
    </div>
  )
}`,
    },
    {
      title: "Disabled state",
      code: `import { Textarea } from "@/components/ui/textarea"

export default function Example() {
  return <Textarea disabled placeholder="Disabled textarea" />
}`,
    },
  ],

  spinner: [
    {
      title: "Sizes",
      description: "Five size options from extra small to extra large.",
      code: `import { Spinner } from "@/components/ui/spinner"

export default function Example() {
  return (
    <div className="flex items-center gap-6">
      <Spinner size="xs" />
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
      <Spinner size="xl" />
    </div>
  )
}`,
    },
  ],

  "dots-loader": [
    {
      title: "Sizes",
      code: `import { DotsLoader } from "@/components/ui/dots-loader"

export default function Example() {
  return (
    <div className="flex items-center gap-8">
      <DotsLoader size="sm" />
      <DotsLoader size="md" />
      <DotsLoader size="lg" />
    </div>
  )
}`,
    },
  ],

  "pulse-loader": [
    {
      title: "Sizes",
      code: `import { PulseLoader } from "@/components/ui/pulse-loader"

export default function Example() {
  return (
    <div className="flex items-center gap-8">
      <PulseLoader size="sm" />
      <PulseLoader size="md" />
      <PulseLoader size="lg" />
    </div>
  )
}`,
    },
  ],

  "bars-loader": [
    {
      title: "Sizes",
      code: `import { BarsLoader } from "@/components/ui/bars-loader"

export default function Example() {
  return (
    <div className="flex items-center gap-8">
      <BarsLoader size="sm" />
      <BarsLoader size="md" />
      <BarsLoader size="lg" />
    </div>
  )
}`,
    },
    {
      title: "Custom bar count",
      description: "Change the number of bars with the bars prop.",
      code: `import { BarsLoader } from "@/components/ui/bars-loader"

export default function Example() {
  return (
    <div className="flex items-center gap-8">
      <BarsLoader bars={3} />
      <BarsLoader bars={5} />
      <BarsLoader bars={8} />
    </div>
  )
}`,
    },
  ],

  "ring-loader": [
    {
      title: "Sizes",
      code: `import { RingLoader } from "@/components/ui/ring-loader"

export default function Example() {
  return (
    <div className="flex items-center gap-8">
      <RingLoader size="sm" />
      <RingLoader size="md" />
      <RingLoader size="lg" />
    </div>
  )
}`,
    },
  ],

  "dot-matrix": [
    {
      title: "Types",
      description: "20 animation patterns controlled by the type prop.",
      code: `import { DotMatrix } from "@/components/ui/dot-matrix-loaders"

export default function Example() {
  return (
    <div className="flex flex-wrap gap-8">
      <DotMatrix type="neon-drift" />
      <DotMatrix type="cascade" />
      <DotMatrix type="pulse-ladder" />
      <DotMatrix type="wave" />
      <DotMatrix type="matrix-rain" />
      <DotMatrix type="vortex" />
    </div>
  )
}`,
    },
    {
      title: "Sizes",
      code: `import { DotMatrix } from "@/components/ui/dot-matrix-loaders"

export default function Example() {
  return (
    <div className="flex items-end gap-8">
      <DotMatrix type="neon-drift" size="sm" />
      <DotMatrix type="neon-drift" size="md" />
      <DotMatrix type="neon-drift" size="lg" />
    </div>
  )
}`,
    },
  ],

  "glow-button": [
    {
      title: "Variants",
      code: `import { GlowButton } from "@/components/ui/glow-button"

export default function Example() {
  return (
    <div className="flex flex-wrap gap-3">
      <GlowButton variant="default">Default</GlowButton>
      <GlowButton variant="secondary">Secondary</GlowButton>
      <GlowButton variant="outline">Outline</GlowButton>
      <GlowButton variant="ghost">Ghost</GlowButton>
    </div>
  )
}`,
    },
    {
      title: "Sizes",
      code: `import { GlowButton } from "@/components/ui/glow-button"

export default function Example() {
  return (
    <div className="flex items-center gap-3">
      <GlowButton size="sm">Small</GlowButton>
      <GlowButton size="default">Default</GlowButton>
      <GlowButton size="lg">Large</GlowButton>
    </div>
  )
}`,
    },
  ],

  "animate-in": [
    {
      title: "Variants",
      description: "Choose the entrance animation with the variant prop.",
      code: `import { AnimateIn } from "@/components/ui/animate-in"

export default function Example() {
  return (
    <div className="space-y-3">
      <AnimateIn variant="fade">
        <div className="rounded-lg border border-border bg-surface-1 px-4 py-3 text-sm">fade</div>
      </AnimateIn>
      <AnimateIn variant="slide-up" delay={100}>
        <div className="rounded-lg border border-border bg-surface-1 px-4 py-3 text-sm">slide-up</div>
      </AnimateIn>
      <AnimateIn variant="slide-right" delay={200}>
        <div className="rounded-lg border border-border bg-surface-1 px-4 py-3 text-sm">slide-right</div>
      </AnimateIn>
      <AnimateIn variant="scale" delay={300}>
        <div className="rounded-lg border border-border bg-surface-1 px-4 py-3 text-sm">scale</div>
      </AnimateIn>
    </div>
  )
}`,
    },
    {
      title: "Staggered delay",
      description: "Use the delay prop (ms) to stagger multiple AnimateIn elements.",
      code: `import { AnimateIn } from "@/components/ui/animate-in"

export default function Example() {
  const items = ["First", "Second", "Third", "Fourth"]
  return (
    <div className="space-y-2">
      {items.map((item, i) => (
        <AnimateIn key={item} variant="slide-up" delay={i * 80}>
          <div className="rounded-lg border border-border bg-surface-1 px-4 py-3 text-sm">{item}</div>
        </AnimateIn>
      ))}
    </div>
  )
}`,
    },
  ],
}
