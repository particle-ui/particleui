"use client"

import * as React from "react"

interface AnimatedListProps {
  children: React.ReactNode
  delay?: number
  className?: string
}

function AnimatedList({
  children,
  delay = 100,
  className,
}: AnimatedListProps) {
  const items = React.Children.toArray(children)

  return (
    <>
      <style>{`
        @keyframes animated-list-in {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animated-list-item {
          animation: animated-list-in 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
        }
      `}</style>
      <div className={className}>
        {items.map((child, i) => (
          <div
            key={i}
            className="animated-list-item"
            style={{ animationDelay: `${i * delay}ms` }}
          >
            {child}
          </div>
        ))}
      </div>
    </>
  )
}

export { AnimatedList }
export default AnimatedList
