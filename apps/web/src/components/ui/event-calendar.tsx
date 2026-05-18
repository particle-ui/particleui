"use client"

import * as React from "react"
import { Calendar, dateFnsLocalizer, Views, SlotInfo } from "react-big-calendar"
import { format, parse, startOfWeek, getDay } from "date-fns"
import { enUS } from "date-fns/locale"
import { ChevronLeft, ChevronRight, CalendarDays } from "lucide-react"
import { cn } from "@/lib/utils"
import "react-big-calendar/lib/css/react-big-calendar.css"

export interface CalendarEvent {
  id: string
  title: string
  start: Date
  end: Date
  color?: string
}

type CalendarView = "month" | "week" | "day" | "agenda"

const locales = { "en-US": enUS }

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 0 }),
  getDay,
  locales,
})

const now = new Date()
const y = now.getFullYear()
const m = now.getMonth()

const DEFAULT_EVENTS: CalendarEvent[] = [
  {
    id: "1",
    title: "Design Review",
    start: new Date(y, m, 5, 10, 0),
    end: new Date(y, m, 5, 11, 30),
    color: "oklch(65% 0.17 145)",
  },
  {
    id: "2",
    title: "Team Standup",
    start: new Date(y, m, 10, 9, 0),
    end: new Date(y, m, 10, 9, 30),
  },
  {
    id: "3",
    title: "Product Launch",
    start: new Date(y, m, 15, 14, 0),
    end: new Date(y, m, 15, 17, 0),
    color: "oklch(65% 0.20 25)",
  },
  {
    id: "4",
    title: "Investor Call",
    start: new Date(y, m, 20, 11, 0),
    end: new Date(y, m, 20, 12, 0),
    color: "oklch(60% 0.16 260)",
  },
  {
    id: "5",
    title: "Quarterly Planning",
    start: new Date(y, m, 25, 9, 0),
    end: new Date(y, m, 26, 18, 0),
  },
]

const VIEW_LABELS: Record<CalendarView, string> = {
  month: "Month",
  week: "Week",
  day: "Day",
  agenda: "Agenda",
}

interface ToolbarProps {
  date: Date
  view: CalendarView
  onNavigate: (action: "PREV" | "NEXT" | "TODAY") => void
  onView: (view: CalendarView) => void
}

function CalendarToolbar({ date, view, onNavigate, onView }: ToolbarProps) {
  const label = React.useMemo(() => {
    if (view === "month") return format(date, "MMMM yyyy")
    if (view === "week") return format(date, "MMM d, yyyy")
    if (view === "day") return format(date, "EEEE, MMMM d, yyyy")
    return format(date, "MMMM yyyy")
  }, [date, view])

  return (
    <div className="flex items-center justify-between gap-3 mb-3 flex-wrap">
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-lg bg-[var(--color-accent-dim)] border border-[var(--color-accent-border)] flex items-center justify-center">
          <CalendarDays size={13} className="text-[var(--color-accent)]" />
        </div>
        <span className="text-sm font-semibold text-[var(--color-text-1)]">{label}</span>
      </div>

      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1 rounded-lg border border-[rgba(255,255,255,0.07)] bg-[var(--color-surface-2)] p-0.5">
          {(Object.keys(VIEW_LABELS) as CalendarView[]).map((v) => (
            <button
              key={v}
              onClick={() => onView(v)}
              className={cn(
                "px-2.5 py-1 text-xs rounded-md transition-colors duration-150",
                view === v
                  ? "bg-[var(--color-surface-3)] text-[var(--color-text-1)] font-medium"
                  : "text-[var(--color-text-3)] hover:text-[var(--color-text-2)]"
              )}
            >
              {VIEW_LABELS[v]}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => onNavigate("PREV")}
            className={cn(
              "inline-flex items-center justify-center h-7 w-7 rounded-md",
              "border border-[rgba(255,255,255,0.07)] bg-transparent",
              "text-[var(--color-text-3)] hover:text-[var(--color-text-1)] hover:bg-[var(--color-surface-2)]",
              "transition-colors duration-150"
            )}
          >
            <ChevronLeft size={14} />
          </button>
          <button
            onClick={() => onNavigate("TODAY")}
            className={cn(
              "px-2.5 h-7 text-xs rounded-md",
              "border border-[rgba(255,255,255,0.07)] bg-transparent",
              "text-[var(--color-text-2)] hover:text-[var(--color-text-1)] hover:bg-[var(--color-surface-2)]",
              "transition-colors duration-150"
            )}
          >
            Today
          </button>
          <button
            onClick={() => onNavigate("NEXT")}
            className={cn(
              "inline-flex items-center justify-center h-7 w-7 rounded-md",
              "border border-[rgba(255,255,255,0.07)] bg-transparent",
              "text-[var(--color-text-3)] hover:text-[var(--color-text-1)] hover:bg-[var(--color-surface-2)]",
              "transition-colors duration-150"
            )}
          >
            <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </div>
  )
}

const DARK_OVERRIDES = `
  .pui-calendar .rbc-calendar {
    background: transparent;
    color: oklch(97% 0.005 80);
    font-family: var(--font-sans, ui-sans-serif);
  }
  .pui-calendar .rbc-header {
    border-color: rgba(255,255,255,0.07);
    color: oklch(50% 0.002 80);
    font-size: 0.75rem;
    font-weight: 500;
    padding: 6px 4px;
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }
  .pui-calendar .rbc-month-view,
  .pui-calendar .rbc-time-view,
  .pui-calendar .rbc-agenda-view {
    border: 1px solid rgba(255,255,255,0.07);
    border-radius: 10px;
    overflow: hidden;
  }
  .pui-calendar .rbc-month-row + .rbc-month-row,
  .pui-calendar .rbc-day-bg + .rbc-day-bg,
  .pui-calendar .rbc-header + .rbc-header,
  .pui-calendar .rbc-time-content > * + * > *,
  .pui-calendar .rbc-timeslot-group,
  .pui-calendar .rbc-day-slot .rbc-time-slot,
  .pui-calendar .rbc-time-header-content,
  .pui-calendar .rbc-time-header.rbc-overflowing {
    border-color: rgba(255,255,255,0.07);
  }
  .pui-calendar .rbc-off-range-bg {
    background: oklch(6% 0.003 60);
  }
  .pui-calendar .rbc-off-range {
    color: oklch(33% 0.001 80);
  }
  .pui-calendar .rbc-today {
    background: oklch(20% 0.01 80 / 30%);
  }
  .pui-calendar .rbc-event {
    background: oklch(96% 0.01 80);
    color: oklch(4% 0.005 60);
    border: none;
    border-radius: 4px;
    font-size: 0.75rem;
    font-weight: 500;
    padding: 2px 6px;
  }
  .pui-calendar .rbc-event.rbc-selected {
    background: oklch(90% 0.012 80);
  }
  .pui-calendar .rbc-event:focus {
    outline: 2px solid oklch(96% 0.01 80 / 60%);
    outline-offset: 1px;
  }
  .pui-calendar .rbc-show-more {
    color: oklch(72% 0.003 80);
    font-size: 0.7rem;
    background: transparent;
  }
  .pui-calendar .rbc-show-more:hover {
    color: oklch(96% 0.01 80);
  }
  .pui-calendar .rbc-toolbar {
    display: none;
  }
  .pui-calendar .rbc-date-cell {
    font-size: 0.75rem;
    color: oklch(72% 0.003 80);
    padding: 4px 6px;
    text-align: right;
  }
  .pui-calendar .rbc-date-cell.rbc-now {
    color: oklch(96% 0.01 80);
    font-weight: 600;
  }
  .pui-calendar .rbc-row-content {
    z-index: 1;
  }
  .pui-calendar .rbc-time-gutter .rbc-label,
  .pui-calendar .rbc-label {
    font-size: 0.7rem;
    color: oklch(33% 0.001 80);
    padding: 0 6px;
  }
  .pui-calendar .rbc-current-time-indicator {
    background: oklch(96% 0.01 80 / 60%);
    height: 1px;
  }
  .pui-calendar .rbc-agenda-table {
    border-color: rgba(255,255,255,0.07);
  }
  .pui-calendar .rbc-agenda-table thead > tr > th {
    border-color: rgba(255,255,255,0.07);
    color: oklch(50% 0.002 80);
    font-size: 0.7rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    padding: 6px 10px;
    background: oklch(8% 0.004 60);
  }
  .pui-calendar .rbc-agenda-table tbody > tr > td,
  .pui-calendar .rbc-agenda-table tbody > tr + tr > td {
    border-color: rgba(255,255,255,0.07);
    color: oklch(72% 0.003 80);
    font-size: 0.8125rem;
    padding: 8px 10px;
  }
  .pui-calendar .rbc-agenda-date-cell,
  .pui-calendar .rbc-agenda-time-cell {
    color: oklch(50% 0.002 80);
    font-size: 0.75rem;
    white-space: nowrap;
  }
  .pui-calendar .rbc-agenda-event-cell {
    color: oklch(90% 0.008 80);
  }
  .pui-calendar .rbc-slot-selection {
    background: oklch(96% 0.01 80 / 12%);
    border: 1px solid oklch(96% 0.01 80 / 30%);
    border-radius: 4px;
    color: oklch(96% 0.01 80);
    font-size: 0.75rem;
  }
  .pui-calendar .rbc-overlay {
    background: oklch(12% 0.004 60);
    border: 1px solid rgba(255,255,255,0.07);
    border-radius: 8px;
    box-shadow: 0 8px 32px rgba(0,0,0,0.5);
    padding: 8px;
  }
  .pui-calendar .rbc-overlay-header {
    color: oklch(72% 0.003 80);
    font-size: 0.75rem;
    font-weight: 600;
    padding: 4px 6px 8px;
    border-bottom: 1px solid rgba(255,255,255,0.07);
    margin-bottom: 4px;
  }
`

interface EventCalendarProps {
  events?: CalendarEvent[]
  className?: string
  defaultView?: CalendarView
}

function EventCalendar({
  events = DEFAULT_EVENTS,
  className,
  defaultView = "month",
}: EventCalendarProps) {
  const [view, setView] = React.useState<CalendarView>(defaultView)
  const [date, setDate] = React.useState(new Date())
  const [allEvents, setAllEvents] = React.useState<CalendarEvent[]>(events)

  const handleNavigate = React.useCallback((action: "PREV" | "NEXT" | "TODAY") => {
    setDate((current) => {
      const d = new Date(current)
      if (action === "TODAY") return new Date()
      const delta = action === "NEXT" ? 1 : -1
      if (view === "month") {
        d.setMonth(d.getMonth() + delta)
      } else if (view === "week") {
        d.setDate(d.getDate() + delta * 7)
      } else if (view === "day") {
        d.setDate(d.getDate() + delta)
      } else {
        d.setMonth(d.getMonth() + delta)
      }
      return d
    })
  }, [view])

  const handleSelectSlot = React.useCallback((slot: SlotInfo) => {
    const title = window.prompt("Event title:")
    if (!title?.trim()) return
    const newEvent: CalendarEvent = {
      id: String(Date.now()),
      title: title.trim(),
      start: slot.start as Date,
      end: slot.end as Date,
    }
    setAllEvents((prev) => [...prev, newEvent])
  }, [])

  const eventStyleGetter = React.useCallback((event: CalendarEvent) => {
    if (!event.color) return {}
    return {
      style: {
        background: event.color,
        color: "oklch(4% 0.005 60)",
      },
    }
  }, [])

  return (
    <div className={cn("pui-calendar flex flex-col", className)}>
      <style>{DARK_OVERRIDES}</style>

      <CalendarToolbar
        date={date}
        view={view}
        onNavigate={handleNavigate}
        onView={setView}
      />

      <div className="flex-1 min-h-0" style={{ height: 560 }}>
        <Calendar
          localizer={localizer}
          events={allEvents}
          view={view}
          date={date}
          onNavigate={setDate}
          onView={(v) => setView(v as CalendarView)}
          onSelectSlot={handleSelectSlot}
          selectable
          eventPropGetter={eventStyleGetter}
          views={[Views.MONTH, Views.WEEK, Views.DAY, Views.AGENDA]}
          style={{ height: "100%" }}
          popup
        />
      </div>
    </div>
  )
}

EventCalendar.displayName = "EventCalendar"

export { EventCalendar }
export type { EventCalendarProps }
