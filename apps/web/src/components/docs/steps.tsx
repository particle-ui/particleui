import React from "react"

interface StepProps {
  title: string
  children: React.ReactNode
  _index?: number
  _total?: number
}

interface StepsProps {
  children: React.ReactNode
}

export function Steps({ children }: StepsProps) {
  const steps = React.Children.toArray(children)
  const total = steps.length

  return (
    <div className="my-6 ml-2">
      {steps.map((child, index) => {
        if (!React.isValidElement(child)) return child
        return React.cloneElement(child as React.ReactElement<StepProps>, {
          _index: index + 1,
          _total: total,
        })
      })}
    </div>
  )
}

export function Step({ title, children, _index = 1, _total = 1 }: StepProps) {
  const isLast = _index === _total

  return (
    <div className="relative flex gap-5 pb-8 last:pb-0">
      {/* Connecting vertical line */}
      {!isLast && (
        <div className="absolute left-[15px] top-8 bottom-0 w-px bg-border" />
      )}
      {/* Circle number */}
      <div className="relative z-10 mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-accent-border bg-accent-dim text-[0.8125rem] font-bold text-accent">
        {_index}
      </div>
      {/* Content */}
      <div className="flex-1 min-w-0 pt-0.5">
        <h3 className="mb-3 text-[0.9375rem] font-semibold tracking-[-0.01em] text-text-1">
          {title}
        </h3>
        <div className="text-sm text-text-2 leading-[1.75] [&_code]:rounded [&_code]:bg-surface-2 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-xs [&_code]:text-text-2">
          {children}
        </div>
      </div>
    </div>
  )
}
