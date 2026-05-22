interface PropDef {
  name: string
  type: string
  required: boolean
  defaultValue?: string
}

export const EXTRA_PROPS: Record<string, PropDef[]> = {
  button: [
    {
      name: "variant",
      type: '"default" | "secondary" | "outline" | "ghost" | "destructive" | "link"',
      required: false,
      defaultValue: '"default"',
    },
    {
      name: "size",
      type: '"sm" | "default" | "lg" | "icon"',
      required: false,
      defaultValue: '"default"',
    },
  ],
  badge: [
    {
      name: "variant",
      type: '"default" | "secondary" | "outline" | "success" | "destructive" | "warning"',
      required: false,
      defaultValue: '"default"',
    },
  ],
  alert: [
    {
      name: "variant",
      type: '"default" | "info" | "success" | "warning" | "destructive"',
      required: false,
      defaultValue: '"default"',
    },
  ],
  spinner: [
    {
      name: "size",
      type: '"xs" | "sm" | "md" | "lg" | "xl"',
      required: false,
      defaultValue: '"md"',
    },
  ],
  "dots-loader": [
    { name: "size", type: '"sm" | "md" | "lg"', required: false, defaultValue: '"md"' },
  ],
  "pulse-loader": [
    { name: "size", type: '"sm" | "md" | "lg"', required: false, defaultValue: '"md"' },
  ],
  "bars-loader": [
    { name: "size", type: '"sm" | "md" | "lg"', required: false, defaultValue: '"md"' },
    { name: "bars", type: "number", required: false, defaultValue: "5" },
  ],
  "ring-loader": [
    { name: "size", type: '"sm" | "md" | "lg"', required: false, defaultValue: '"md"' },
  ],
  "dot-matrix": [
    {
      name: "type",
      type: '"neon-drift" | "cascade" | "pulse-ladder" | "prism-sweep" | "ripple" | "core-spiral" | "twin-orbit" | "snake" | "matrix-rain" | "vortex" | "bloom" | "stagger-rows" | "grid-pulse" | "wave" | "heartbeat" | "cross-hatch" | "clockwise" | "zipper" | "sunrise" | "twin-sweep"',
      required: false,
      defaultValue: '"neon-drift"',
    },
    { name: "size", type: '"sm" | "md" | "lg"', required: false, defaultValue: '"md"' },
  ],
  input: [
    { name: "type", type: "string", required: false, defaultValue: '"text"' },
    { name: "placeholder", type: "string", required: false },
    { name: "disabled", type: "boolean", required: false, defaultValue: "false" },
  ],
  textarea: [
    { name: "placeholder", type: "string", required: false },
    { name: "disabled", type: "boolean", required: false, defaultValue: "false" },
    { name: "rows", type: "number", required: false },
  ],
  "glow-button": [
    {
      name: "variant",
      type: '"default" | "secondary" | "outline" | "ghost"',
      required: false,
      defaultValue: '"default"',
    },
    {
      name: "size",
      type: '"sm" | "default" | "lg"',
      required: false,
      defaultValue: '"default"',
    },
  ],
  "animate-in": [
    {
      name: "variant",
      type: '"fade" | "slide-up" | "slide-down" | "slide-left" | "slide-right" | "scale" | "rotate"',
      required: false,
      defaultValue: '"fade"',
    },
    { name: "delay", type: "number", required: false, defaultValue: "0" },
    { name: "duration", type: "number", required: false, defaultValue: "400" },
  ],
}
