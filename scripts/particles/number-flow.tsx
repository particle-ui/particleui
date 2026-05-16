"use client"

import * as React from "react"

interface NumberFlowProps {
  value: number
  prefix?: string
  suffix?: string
  className?: string
}

function useAnimatedDigits(value: number) {
  const [displayValue, setDisplayValue] = React.useState(value)
  const [prevValue, setPrevValue] = React.useState(value)
  const [animating, setAnimating] = React.useState(false)

  React.useEffect(() => {
    if (value === displayValue) return
    setPrevValue(displayValue)
    setAnimating(true)
    const raf = requestAnimationFrame(() => {
      const duration = 500
      const start = performance.now()
      const from = displayValue

      const step = (now: number) => {
        const elapsed = now - start
        const t = Math.min(elapsed / duration, 1)
        const eased = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
        const current = Math.round(from + (value - from) * eased)
        setDisplayValue(current)
        if (t < 1) {
          requestAnimationFrame(step)
        } else {
          setDisplayValue(value)
          setAnimating(false)
        }
      }
      requestAnimationFrame(step)
    })
    return () => cancelAnimationFrame(raf)
  }, [value]) // eslint-disable-line react-hooks/exhaustive-deps

  return { displayValue, animating }
}

function DigitColumn({ digit, direction }: { digit: string; direction: "up" | "down" | "none" }) {
  return (
    <>
      <style>{`
        @keyframes digit-roll-up {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes digit-roll-down {
          from { transform: translateY(-100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .digit-roll-up { animation: digit-roll-up 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) both; }
        .digit-roll-down { animation: digit-roll-down 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) both; }
      `}</style>
      <span
        style={{ display: "inline-block", overflow: "hidden", height: "1.2em", verticalAlign: "text-top" }}
      >
        <span
          key={digit}
          className={
            direction === "up"
              ? "digit-roll-up"
              : direction === "down"
              ? "digit-roll-down"
              : ""
          }
          style={{ display: "inline-block" }}
        >
          {digit}
        </span>
      </span>
    </>
  )
}

function NumberFlow({ value, prefix, suffix, className }: NumberFlowProps) {
  const { displayValue, animating } = useAnimatedDigits(value)
  const [prevDisplayed, setPrevDisplayed] = React.useState(displayValue)

  const direction: "up" | "down" | "none" = animating
    ? value > prevDisplayed
      ? "up"
      : "down"
    : "none"

  React.useEffect(() => {
    if (!animating) setPrevDisplayed(displayValue)
  }, [animating, displayValue])

  const formatted = Math.abs(displayValue).toLocaleString()
  const isNegative = displayValue < 0

  return (
    <span
      className={[
        "inline-flex items-baseline tabular-nums text-[var(--color-text-1)]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      aria-live="polite"
      aria-atomic
    >
      {prefix && <span>{prefix}</span>}
      {isNegative && <span>-</span>}
      {formatted.split("").map((char, i) => (
        <DigitColumn key={i} digit={char} direction={/\d/.test(char) ? direction : "none"} />
      ))}
      {suffix && <span>{suffix}</span>}
    </span>
  )
}

export { NumberFlow }
export default NumberFlow
