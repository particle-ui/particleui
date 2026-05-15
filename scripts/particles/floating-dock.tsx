"use client"

import * as React from "react"

interface DockItem {
  icon: React.ReactNode
  label: string
  href?: string
  onClick?: () => void
}

interface FloatingDockProps {
  items: DockItem[]
  className?: string
  magnification?: number
  distance?: number
}

function FloatingDock({
  items,
  className,
  magnification = 2.2,
  distance = 120,
}: FloatingDockProps) {
  const [mouseX, setMouseX] = React.useState<number | null>(null)
  const dockRef = React.useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent) => {
    setMouseX(e.clientX)
  }

  const handleMouseLeave = () => setMouseX(null)

  const getScale = (el: HTMLElement | null) => {
    if (!el || mouseX === null) return 1
    const rect = el.getBoundingClientRect()
    const center = rect.left + rect.width / 2
    const dist = Math.abs(mouseX - center)
    if (dist > distance) return 1
    const t = 1 - dist / distance
    return 1 + (magnification - 1) * t * t
  }

  return (
    <div
      ref={dockRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={[
        "flex items-end gap-2 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-1)]/80 px-4 py-3 backdrop-blur-xl",
        "shadow-[0_8px_32px_0px_oklch(0%_0_0_/_0.4)]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {items.map((item, i) => (
        <DockIcon key={i} item={item} getScale={getScale} mouseX={mouseX} />
      ))}
    </div>
  )
}

function DockIcon({
  item,
  getScale,
  mouseX,
}: {
  item: DockItem
  getScale: (el: HTMLElement | null) => number
  mouseX: number | null
}) {
  const ref = React.useRef<HTMLAnchorElement & HTMLButtonElement>(null)
  const [scale, setScale] = React.useState(1)
  const raf = React.useRef<number>(0)

  React.useEffect(() => {
    cancelAnimationFrame(raf.current)
    raf.current = requestAnimationFrame(() => {
      setScale(getScale(ref.current))
    })
  }, [mouseX, getScale])

  const Comp = item.href ? "a" : "button"

  return (
    <div className="group relative flex flex-col items-center">
      <div
        className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md border border-[var(--color-border)] bg-[var(--color-surface-2)] px-2 py-1 text-[10px] font-medium text-[var(--color-text-2)] opacity-0 transition-opacity duration-150 group-hover:opacity-100 pointer-events-none"
      >
        {item.label}
      </div>
      <Comp
        ref={ref as React.Ref<HTMLAnchorElement & HTMLButtonElement>}
        href={item.href as string}
        onClick={item.onClick}
        title={item.label}
        style={{
          transform: `scale(${scale})`,
          transformOrigin: "bottom center",
          transition: "transform 0.15s cubic-bezier(0.34, 1.56, 0.64, 1)",
        }}
        className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--color-surface-2)] border border-[var(--color-border)] text-[var(--color-text-2)] hover:text-[var(--color-text-1)] hover:bg-[var(--color-surface-3)] hover:border-[var(--color-border-hover)] transition-colors duration-150 cursor-pointer"
      >
        {item.icon}
      </Comp>
    </div>
  )
}

export { FloatingDock }
export type { DockItem }
