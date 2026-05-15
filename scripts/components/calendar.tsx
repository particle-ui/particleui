"use client"

import * as React from "react"
import { DayPicker, getDefaultClassNames } from "react-day-picker"
import { ChevronLeft, ChevronRight } from "lucide-react"

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({ className, classNames, showOutsideDays = true, ...props }: CalendarProps) {
  const def = getDefaultClassNames()

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={["p-3", className].filter(Boolean).join(" ")}
      classNames={{
        ...def,
        months: "flex flex-col sm:flex-row gap-4",
        month: "flex flex-col gap-4",
        month_caption: "flex justify-center pt-1 relative items-center w-full",
        caption_label: "text-sm font-semibold text-[var(--color-text-1)]",
        nav: "flex items-center gap-1",
        button_previous: [
          "absolute left-1 inline-flex items-center justify-center h-7 w-7 rounded-md",
          "border border-[var(--color-border)] bg-transparent",
          "text-[var(--color-text-3)] hover:text-[var(--color-text-1)] hover:bg-[var(--color-surface-2)]",
          "transition-colors duration-150 disabled:pointer-events-none disabled:opacity-40",
        ].join(" "),
        button_next: [
          "absolute right-1 inline-flex items-center justify-center h-7 w-7 rounded-md",
          "border border-[var(--color-border)] bg-transparent",
          "text-[var(--color-text-3)] hover:text-[var(--color-text-1)] hover:bg-[var(--color-surface-2)]",
          "transition-colors duration-150 disabled:pointer-events-none disabled:opacity-40",
        ].join(" "),
        month_grid: "w-full border-collapse",
        weekdays: "flex",
        weekday: "text-[var(--color-text-4)] rounded-md w-9 font-normal text-[0.8rem] flex-1 text-center",
        weeks: "",
        week: "flex w-full mt-2",
        day: "relative flex-1 p-0 text-center text-sm focus-within:relative focus-within:z-20",
        day_button: [
          "inline-flex items-center justify-center h-9 w-9 rounded-md text-sm font-normal",
          "text-[var(--color-text-2)] transition-colors duration-100",
          "hover:bg-[var(--color-surface-2)] hover:text-[var(--color-text-1)]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-1 focus-visible:ring-offset-[var(--color-bg)]",
        ].join(" "),
        selected: [
          "bg-[var(--color-accent)] text-[var(--color-bg)] font-semibold rounded-md",
          "shadow-[0_0_10px_0px_oklch(78%_0.17_200_/_0.4)]",
        ].join(" "),
        today: "bg-[var(--color-surface-2)] text-[var(--color-text-1)] font-semibold rounded-md",
        outside: "text-[var(--color-text-4)] opacity-40",
        disabled: "text-[var(--color-text-4)] opacity-30",
        range_middle: "bg-[var(--color-accent-dim)] text-[var(--color-accent-text)]",
        hidden: "invisible",
        ...classNames,
      }}
      components={{
        Chevron: ({ orientation }) =>
          orientation === "left" ? (
            <ChevronLeft className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          ),
      }}
      {...props}
    />
  )
}
Calendar.displayName = "Calendar"

export { Calendar }
