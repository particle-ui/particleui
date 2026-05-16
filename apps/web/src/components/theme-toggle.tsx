"use client"

import { useTheme } from "next-themes"
import { Sun, Moon } from "@phosphor-icons/react"
import { useEffect, useState } from "react"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) {
    return <div className="h-8 w-8" />
  }

  const isDark = theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches)

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-text-2 hover:text-text-1 hover:border-border-hover transition-all"
    >
      {isDark ? <Sun size={14} /> : <Moon size={14} />}
    </button>
  )
}
