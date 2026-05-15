"use client"

import { useEffect, useState } from "react"

interface Heading {
  id: string
  text: string
  level: 2 | 3
}

export function OnThisPage() {
  const [headings, setHeadings] = useState<Heading[]>([])
  const [activeId, setActiveId] = useState<string>("")

  useEffect(() => {
    const els = Array.from(
      document.querySelectorAll<HTMLElement>("main h2[id], main h3[id]")
    )
    const found: Heading[] = els.map((el) => ({
      id: el.id,
      text: el.textContent ?? "",
      level: el.tagName === "H2" ? 2 : 3,
    }))
    setHeadings(found)

    if (found.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        }
      },
      { rootMargin: "0px 0px -60% 0px" }
    )

    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  if (headings.length === 0) return null

  return (
    <div>
      <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-text-3">
        On this page
      </p>
      <ul className="space-y-1">
        {headings.map((h) => (
          <li key={h.id} className={h.level === 3 ? "pl-3" : ""}>
            <a
              href={`#${h.id}`}
              className={`block text-[0.8125rem] leading-[1.5] transition-colors ${
                activeId === h.id
                  ? "text-accent font-medium"
                  : "text-text-3 hover:text-text-2"
              }`}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
