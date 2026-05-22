import { cn } from "@/lib/utils"

const ROWS = 5
const COLS = 5

export type DotMatrixType =
  | "neon-drift"
  | "cascade"
  | "pulse-ladder"
  | "prism-sweep"
  | "ripple"
  | "core-spiral"
  | "twin-orbit"
  | "snake"
  | "matrix-rain"
  | "vortex"
  | "bloom"
  | "stagger-rows"
  | "grid-pulse"
  | "wave"
  | "heartbeat"
  | "cross-hatch"
  | "clockwise"
  | "zipper"
  | "sunrise"
  | "twin-sweep"

interface DotMatrixProps {
  type?: DotMatrixType
  size?: "sm" | "md" | "lg"
  className?: string
}

const dotSz = { sm: 5, md: 7, lg: 10 }
const gapSz = { sm: 3, md: 4, lg: 6 }

// Spiral order precomputed once
const SPIRAL_ORDER = (() => {
  const order: [number, number][] = []
  const visited = Array.from({ length: ROWS }, () => Array(COLS).fill(false))
  const dirs = [[0, 1], [1, 0], [0, -1], [-1, 0]]
  let r = 0, c = 0, d = 0
  for (let i = 0; i < ROWS * COLS; i++) {
    order.push([r, c])
    visited[r][c] = true
    const [nr, nc] = [r + dirs[d][0], c + dirs[d][1]]
    if (nr < 0 || nr >= ROWS || nc < 0 || nc >= COLS || visited[nr][nc]) d = (d + 1) % 4
    r += dirs[d][0]
    c += dirs[d][1]
  }
  const rankMap = new Map<string, number>()
  order.forEach(([rr, cc], i) => rankMap.set(`${rr},${cc}`, ROWS * COLS - 1 - i))
  return rankMap
})()

// Snake traversal order precomputed once
const SNAKE_ORDER = (() => {
  const order = new Map<string, number>()
  let idx = 0
  for (let r = 0; r < ROWS; r++) {
    const cols = r % 2 === 0
      ? Array.from({ length: COLS }, (_, i) => i)
      : Array.from({ length: COLS }, (_, i) => COLS - 1 - i)
    for (const c of cols) order.set(`${r},${c}`, idx++)
  }
  return order
})()

type DelayFn = (r: number, c: number) => string
type AnimName = "dm-fade" | "dm-blink" | "dm-pulse-scale"

function getVariant(type: DotMatrixType): { delay: DelayFn; anim: AnimName } {
  const cr = (ROWS - 1) / 2
  const cc = (COLS - 1) / 2
  const total = ROWS * COLS

  switch (type) {
    case "neon-drift":
      return { anim: "dm-fade", delay: (_, c) => `${-(1.4 - c * 0.28).toFixed(2)}s` }
    case "cascade":
      return { anim: "dm-fade", delay: (r) => `${-(1.4 - r * 0.35).toFixed(2)}s` }
    case "pulse-ladder":
      return { anim: "dm-fade", delay: (r, c) => `${-(1.4 - (r + c) * 0.14).toFixed(2)}s` }
    case "prism-sweep":
      return { anim: "dm-fade", delay: (r, c) => `${-(1.4 - ((COLS - 1 - c) + r) * 0.14).toFixed(2)}s` }
    case "ripple": {
      return {
        anim: "dm-fade",
        delay: (r, c) => {
          const dist = Math.sqrt((r - cr) ** 2 + (c - cc) ** 2)
          return `${-(1.4 - dist * 0.22).toFixed(2)}s`
        },
      }
    }
    case "core-spiral":
      return {
        anim: "dm-fade",
        delay: (r, c) => {
          const rank = SPIRAL_ORDER.get(`${r},${c}`) ?? 0
          return `${-(1.4 - rank * (1.4 / total)).toFixed(2)}s`
        },
      }
    case "twin-orbit":
      return {
        anim: "dm-fade",
        delay: (r, c) => {
          const dist = Math.round(Math.max(Math.abs(r - cr), Math.abs(c - cc)))
          return `${(dist % 2 === 0 ? 0 : -0.7).toFixed(2)}s`
        },
      }
    case "snake":
      return {
        anim: "dm-fade",
        delay: (r, c) => {
          const rank = SNAKE_ORDER.get(`${r},${c}`) ?? 0
          return `${-(1.4 - rank * (1.4 / total)).toFixed(2)}s`
        },
      }
    case "matrix-rain":
      return { anim: "dm-fade", delay: (r, c) => `${-(1.4 - (c * 0.2 + r * 0.08)).toFixed(2)}s` }
    case "vortex":
      return {
        anim: "dm-fade",
        delay: (r, c) => {
          const angle = Math.atan2(r - cr, c - cc)
          const normalized = (angle + Math.PI) / (2 * Math.PI)
          return `${-(1.4 - normalized * 1.4).toFixed(2)}s`
        },
      }
    case "bloom":
      return {
        anim: "dm-pulse-scale",
        delay: (r, c) => {
          const dist = Math.sqrt((r - cr) ** 2 + (c - cc) ** 2)
          return `${(dist * 0.18).toFixed(2)}s`
        },
      }
    case "stagger-rows":
      return {
        anim: "dm-fade",
        delay: (r, c) => {
          const base = r % 2 === 0 ? c * 0.14 : (COLS - 1 - c) * 0.14
          return `${-(1.4 - base - r * 0.14).toFixed(2)}s`
        },
      }
    case "grid-pulse":
      return { anim: "dm-fade", delay: (r, c) => `${-((r * COLS + c) * 0.056).toFixed(2)}s` }
    case "wave":
      return {
        anim: "dm-fade",
        delay: (r, c) => {
          const offset = Math.sin((c / (COLS - 1)) * Math.PI) * 0.7
          return `${-(r * 0.18 + offset).toFixed(2)}s`
        },
      }
    case "heartbeat":
      return {
        anim: "dm-blink",
        delay: (r, c) => {
          const dist = Math.sqrt((r - cr) ** 2 + (c - cc) ** 2)
          return `${(dist * 0.15).toFixed(2)}s`
        },
      }
    case "cross-hatch":
      return { anim: "dm-fade", delay: (r, c) => `${((r + c) % 2 === 0 ? 0 : -0.7).toFixed(2)}s` }
    case "clockwise":
      return {
        anim: "dm-fade",
        delay: (r, c) => {
          const angle = (Math.atan2(r - cr, c - cc) + Math.PI / 2 + 2 * Math.PI) % (2 * Math.PI)
          return `${-(1.4 - (angle / (2 * Math.PI)) * 1.4).toFixed(2)}s`
        },
      }
    case "zipper":
      return {
        anim: "dm-fade",
        delay: (r, c) => {
          const distFromEdge = Math.min(c, COLS - 1 - c)
          return `${-(1.4 - (distFromEdge * 0.35 + r * 0.07)).toFixed(2)}s`
        },
      }
    case "sunrise":
      return { anim: "dm-fade", delay: (r, c) => `${-(1.4 - (ROWS - 1 - r) * 0.28 - c * 0.04).toFixed(2)}s` }
    case "twin-sweep":
      return {
        anim: "dm-fade",
        delay: (_, c) => {
          const distFromEdge = Math.min(c, COLS - 1 - c)
          return `${-(1.4 - distFromEdge * 0.35).toFixed(2)}s`
        },
      }
  }
}

export function DotMatrix({ type = "neon-drift", size = "md", className }: DotMatrixProps) {
  const d = dotSz[size]
  const g = gapSz[size]
  const { delay, anim } = getVariant(type)

  return (
    <div
      role="status"
      aria-label={`${type} loading`}
      className={cn("inline-flex flex-col", className)}
      style={{ gap: g }}
    >
      {Array.from({ length: ROWS }, (_, r) => (
        <div key={r} className="flex" style={{ gap: g }}>
          {Array.from({ length: COLS }, (_, c) => (
            <div
              key={c}
              className="rounded-full bg-[var(--color-accent)]"
              style={{
                width: d,
                height: d,
                animation: `${anim} 1.4s ease-in-out infinite`,
                animationDelay: delay(r, c),
              }}
            />
          ))}
        </div>
      ))}
      <style>{`
        @keyframes dm-fade {
          0%, 100% { opacity: 0.12; transform: scale(0.72); }
          50%       { opacity: 1;    transform: scale(1); }
        }
        @keyframes dm-blink {
          0%, 100% { opacity: 0.1; }
          50%       { opacity: 1; }
        }
        @keyframes dm-pulse-scale {
          0%, 100% { opacity: 0.15; transform: scale(0.6); }
          50%       { opacity: 1;   transform: scale(1.1); }
        }
      `}</style>
    </div>
  )
}
