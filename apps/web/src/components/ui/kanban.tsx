"use client"

import * as React from "react"
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  closestCorners,
  useSensor,
  useSensors,
} from "@dnd-kit/core"
import {
  SortableContext,
  arrayMove,
  horizontalListSortingStrategy,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { GripVertical, Plus } from "lucide-react"
import { cn } from "@/lib/utils"

export interface KanbanCard {
  id: string
  title: string
  description?: string
  priority?: "low" | "medium" | "high"
  tag?: string
}

export interface KanbanColumn {
  id: string
  title: string
  cards: KanbanCard[]
}

const DEFAULT_COLUMNS: KanbanColumn[] = [
  {
    id: "todo",
    title: "To Do",
    cards: [
      { id: "card-1", title: "Design system audit", description: "Review all tokens and component variants", priority: "high", tag: "design" },
      { id: "card-2", title: "Write unit tests", priority: "medium", tag: "eng" },
      { id: "card-3", title: "Update changelog", priority: "low" },
    ],
  },
  {
    id: "in-progress",
    title: "In Progress",
    cards: [
      { id: "card-4", title: "Kanban component", description: "Drag-and-drop board with dnd-kit", priority: "high", tag: "eng" },
      { id: "card-5", title: "Landing page copy", priority: "medium", tag: "marketing" },
    ],
  },
  {
    id: "done",
    title: "Done",
    cards: [
      { id: "card-6", title: "Dark mode tokens", description: "OKLCH-based color scale", priority: "low", tag: "design" },
      { id: "card-7", title: "CI pipeline setup", priority: "medium", tag: "eng" },
    ],
  },
]

const PRIORITY_STYLES: Record<NonNullable<KanbanCard["priority"]>, string> = {
  low:    "bg-[oklch(65%_0.17_145/0.12)] text-[oklch(72%_0.14_145)] border-[oklch(65%_0.17_145/0.25)]",
  medium: "bg-[oklch(78%_0.16_75/0.12)]  text-[oklch(82%_0.14_75)]  border-[oklch(78%_0.16_75/0.25)]",
  high:   "bg-[oklch(65%_0.20_25/0.12)]  text-[oklch(72%_0.17_25)]  border-[oklch(65%_0.20_25/0.25)]",
}

const PRIORITY_DOT: Record<NonNullable<KanbanCard["priority"]>, string> = {
  low:    "bg-[oklch(65%_0.17_145)]",
  medium: "bg-[oklch(78%_0.16_75)]",
  high:   "bg-[oklch(65%_0.20_25)]",
}

interface CardItemProps {
  card: KanbanCard
  isDragging?: boolean
}

function CardItem({ card, isDragging }: CardItemProps) {
  return (
    <div
      className={cn(
        "group relative rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)]",
        "px-3 py-2.5 select-none cursor-grab active:cursor-grabbing",
        "transition-all duration-150",
        isDragging
          ? "shadow-[0_8px_32px_oklch(0%_0_0/0.55)] scale-[1.02] border-[var(--color-border-hover)] opacity-95"
          : "hover:border-[var(--color-border-hover)] hover:bg-[var(--color-surface-1)]"
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <p className="text-sm font-medium text-[var(--color-text-1)] leading-snug">{card.title}</p>
        <GripVertical className="h-3.5 w-3.5 shrink-0 text-[var(--color-text-4)] mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      {card.description && (
        <p className="mt-1 text-xs text-[var(--color-text-3)] leading-relaxed line-clamp-2">
          {card.description}
        </p>
      )}

      {(card.priority || card.tag) && (
        <div className="mt-2 flex items-center gap-1.5 flex-wrap">
          {card.priority && (
            <span
              className={cn(
                "inline-flex items-center gap-1 rounded-full border px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide",
                PRIORITY_STYLES[card.priority]
              )}
            >
              <span className={cn("h-1.5 w-1.5 rounded-full", PRIORITY_DOT[card.priority])} />
              {card.priority}
            </span>
          )}
          {card.tag && (
            <span className="inline-flex items-center rounded-full border border-[var(--color-border)] bg-[var(--color-surface-2)] px-1.5 py-0.5 text-[10px] text-[var(--color-text-4)]">
              {card.tag}
            </span>
          )}
        </div>
      )}
    </div>
  )
}

interface SortableCardProps {
  card: KanbanCard
}

function SortableCard({ card }: SortableCardProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: card.id,
    data: { type: "card", card },
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.35 : 1,
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <CardItem card={card} />
    </div>
  )
}

interface AddCardFormProps {
  onAdd: (title: string) => void
  onCancel: () => void
}

function AddCardForm({ onAdd, onCancel }: AddCardFormProps) {
  const [value, setValue] = React.useState("")
  const inputRef = React.useRef<HTMLInputElement>(null)

  React.useEffect(() => {
    inputRef.current?.focus()
  }, [])

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter") {
      const trimmed = value.trim()
      if (trimmed) onAdd(trimmed)
    } else if (e.key === "Escape") {
      onCancel()
    }
  }

  return (
    <div className="rounded-lg border border-[var(--color-accent-border)] bg-[var(--color-bg)] px-3 py-2.5">
      <input
        ref={inputRef}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Card title…"
        className={cn(
          "w-full bg-transparent text-sm text-[var(--color-text-1)] placeholder:text-[var(--color-text-4)]",
          "outline-none"
        )}
      />
      <div className="mt-2 flex items-center gap-2">
        <button
          onClick={() => { const t = value.trim(); if (t) onAdd(t) }}
          className={cn(
            "rounded-md bg-[var(--color-accent)] px-2.5 py-1 text-[11px] font-semibold text-[var(--color-bg)]",
            "hover:opacity-90 transition-opacity"
          )}
        >
          Add card
        </button>
        <button
          onClick={onCancel}
          className="rounded-md px-2 py-1 text-[11px] text-[var(--color-text-4)] hover:text-[var(--color-text-2)] transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  )
}

interface ColumnProps {
  column: KanbanColumn
  onAddCard: (columnId: string, title: string) => void
}

function ColumnContainer({ column, onAddCard }: ColumnProps) {
  const [adding, setAdding] = React.useState(false)
  const cardIds = column.cards.map((c) => c.id)

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: column.id,
    data: { type: "column", column },
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "flex w-72 shrink-0 flex-col rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-1)]",
        isDragging && "opacity-50"
      )}
    >
      <div
        {...attributes}
        {...listeners}
        className="flex items-center justify-between px-3.5 py-3 cursor-grab active:cursor-grabbing"
      >
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-semibold uppercase tracking-widest text-[var(--color-text-3)]">
            {column.title}
          </span>
          <span
            className={cn(
              "flex h-4 min-w-4 items-center justify-center rounded-full px-1",
              "bg-[var(--color-surface-3)] text-[10px] font-semibold text-[var(--color-text-4)]"
            )}
          >
            {column.cards.length}
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-2 overflow-y-auto px-2.5 pb-2.5" style={{ maxHeight: "calc(100vh - 200px)" }}>
        <SortableContext items={cardIds} strategy={verticalListSortingStrategy}>
          {column.cards.map((card) => (
            <SortableCard key={card.id} card={card} />
          ))}
        </SortableContext>

        {adding && (
          <AddCardForm
            onAdd={(title) => {
              onAddCard(column.id, title)
              setAdding(false)
            }}
            onCancel={() => setAdding(false)}
          />
        )}
      </div>

      {!adding && (
        <button
          onClick={() => setAdding(true)}
          className={cn(
            "mx-2.5 mb-2.5 flex items-center gap-1.5 rounded-lg px-2.5 py-2",
            "text-xs text-[var(--color-text-4)] hover:text-[var(--color-text-2)]",
            "hover:bg-[var(--color-surface-2)] transition-colors"
          )}
        >
          <Plus className="h-3.5 w-3.5" />
          Add card
        </button>
      )}
    </div>
  )
}

interface KanbanBoardProps {
  initialColumns?: KanbanColumn[]
  className?: string
}

function KanbanBoard({ initialColumns = DEFAULT_COLUMNS, className }: KanbanBoardProps) {
  const [columns, setColumns] = React.useState<KanbanColumn[]>(initialColumns)
  const [activeCard, setActiveCard] = React.useState<KanbanCard | null>(null)
  const [activeColumn, setActiveColumn] = React.useState<KanbanColumn | null>(null)

  const columnIds = columns.map((c) => c.id)

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  )

  function findColumn(id: string) {
    const direct = columns.find((c) => c.id === id)
    if (direct) return direct
    return columns.find((c) => c.cards.some((card) => card.id === id))
  }

  function handleDragStart(event: DragStartEvent) {
    const data = event.active.data.current
    if (data?.type === "card") setActiveCard(data.card)
    if (data?.type === "column") setActiveColumn(data.column)
  }

  function handleDragOver(event: DragOverEvent) {
    const { active, over } = event
    if (!over || active.id === over.id) return

    const activeData = active.data.current
    if (activeData?.type !== "card") return

    const activeColId = findColumn(active.id as string)?.id
    const overData = over.data.current
    const overColId = overData?.type === "column"
      ? (over.id as string)
      : findColumn(over.id as string)?.id

    if (!activeColId || !overColId || activeColId === overColId) return

    setColumns((prev) => {
      const activeCol = prev.find((c) => c.id === activeColId)!
      const overCol = prev.find((c) => c.id === overColId)!
      const card = activeCol.cards.find((c) => c.id === active.id)!

      const overCardIndex = overCol.cards.findIndex((c) => c.id === over.id)
      const insertIndex = overCardIndex >= 0 ? overCardIndex : overCol.cards.length

      return prev.map((col) => {
        if (col.id === activeColId) return { ...col, cards: col.cards.filter((c) => c.id !== active.id) }
        if (col.id === overColId) {
          const newCards = [...col.cards]
          newCards.splice(insertIndex, 0, card)
          return { ...col, cards: newCards }
        }
        return col
      })
    })
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    setActiveCard(null)
    setActiveColumn(null)

    if (!over || active.id === over.id) return

    const activeData = active.data.current

    if (activeData?.type === "column") {
      setColumns((prev) => {
        const oldIndex = prev.findIndex((c) => c.id === active.id)
        const newIndex = prev.findIndex((c) => c.id === over.id)
        return arrayMove(prev, oldIndex, newIndex)
      })
      return
    }

    if (activeData?.type === "card") {
      const activeColId = findColumn(active.id as string)?.id
      const overColId = findColumn(over.id as string)?.id
      if (!activeColId || !overColId || activeColId !== overColId) return

      setColumns((prev) =>
        prev.map((col) => {
          if (col.id !== activeColId) return col
          const oldIndex = col.cards.findIndex((c) => c.id === active.id)
          const newIndex = col.cards.findIndex((c) => c.id === over.id)
          return { ...col, cards: arrayMove(col.cards, oldIndex, newIndex) }
        })
      )
    }
  }

  function handleAddCard(columnId: string, title: string) {
    const id = `card-${Date.now()}`
    setColumns((prev) =>
      prev.map((col) =>
        col.id === columnId ? { ...col, cards: [...col.cards, { id, title }] } : col
      )
    )
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className={cn("flex gap-4 overflow-x-auto pb-4", className)}>
        <SortableContext items={columnIds} strategy={horizontalListSortingStrategy}>
          {columns.map((col) => (
            <ColumnContainer key={col.id} column={col} onAddCard={handleAddCard} />
          ))}
        </SortableContext>
      </div>

      <DragOverlay>
        {activeCard && (
          <div className="w-72">
            <CardItem card={activeCard} isDragging />
          </div>
        )}
        {activeColumn && (
          <div className="flex w-72 flex-col rounded-xl border border-[var(--color-border-hover)] bg-[var(--color-surface-1)] opacity-90 shadow-[0_16px_48px_oklch(0%_0_0/0.6)]">
            <div className="px-3.5 py-3">
              <span className="text-[10px] font-semibold uppercase tracking-widest text-[var(--color-text-3)]">
                {activeColumn.title}
              </span>
            </div>
            <div className="flex flex-col gap-2 px-2.5 pb-2.5">
              {activeColumn.cards.map((card) => (
                <CardItem key={card.id} card={card} />
              ))}
            </div>
          </div>
        )}
      </DragOverlay>
    </DndContext>
  )
}

export { KanbanBoard }
export type { KanbanBoardProps }
