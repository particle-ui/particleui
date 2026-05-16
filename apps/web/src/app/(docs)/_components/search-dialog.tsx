"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import { Search, Layers, Zap, Box } from "lucide-react"

interface IndexItem {
  name: string
  title: string
  description: string
  categories: string[]
}

interface SearchDialogProps {
  items: IndexItem[]
}

export function SearchDialog({ items }: SearchDialogProps) {
  const [open, setOpen] = React.useState(false)
  const router = useRouter()

  const core = items.filter((i) => i.categories.includes("core"))
  const particles = items.filter((i) => i.categories.includes("particles"))
  const blocks = items.filter((i) => i.categories.includes("blocks"))

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || e.key === "/") {
        const active = document.activeElement
        if (e.key === "/" && (active?.tagName === "INPUT" || active?.tagName === "TEXTAREA")) return
        e.preventDefault()
        setOpen((o) => !o)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const go = (name: string) => {
    setOpen(false)
    router.push(`/docs/components/${name}`)
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-1)] px-3 py-2 text-sm text-[var(--color-text-2)] hover:border-[var(--color-border-hover)] hover:text-[var(--color-text-1)] transition-colors"
      >
        <Search size={13} />
        <span className="flex-1 text-left">Search components…</span>
        <kbd className="hidden sm:inline-flex h-5 items-center gap-0.5 rounded border border-[var(--color-border)] bg-[var(--color-surface-2)] px-1.5 text-[10px] font-mono text-[var(--color-text-2)]">
          ⌘K
        </kbd>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] px-4"
          style={{ background: "oklch(5% 0.004 265 / 0.8)", backdropFilter: "blur(4px)" }}
        >
          <div
            className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-1)] shadow-2xl"
            role="dialog"
            aria-modal
          >
            <Command className="[&>[cmdk-input-wrapper]]:border-b [&>[cmdk-input-wrapper]]:border-[var(--color-border)]">
              <CommandInput placeholder="Search components, blocks…" autoFocus />
              <CommandList className="max-h-80 overflow-y-auto p-1.5">
                <CommandEmpty className="py-8 text-center text-sm text-[var(--color-text-2)]">
                  No components found.
                </CommandEmpty>

                {core.length > 0 && (
                  <CommandGroup heading={<GroupHeading icon={<Layers size={11} />} label="Core" />}>
                    {core.map((item) => (
                      <SearchItem key={item.name} item={item} onSelect={go} />
                    ))}
                  </CommandGroup>
                )}

                {particles.length > 0 && (
                  <>
                    <CommandSeparator />
                    <CommandGroup heading={<GroupHeading icon={<Zap size={11} />} label="Particle Effects" />}>
                      {particles.map((item) => (
                        <SearchItem key={item.name} item={item} onSelect={go} />
                      ))}
                    </CommandGroup>
                  </>
                )}

                {blocks.length > 0 && (
                  <>
                    <CommandSeparator />
                    <CommandGroup heading={<GroupHeading icon={<Box size={11} />} label="Blocks" />}>
                      {blocks.map((item) => (
                        <SearchItem key={item.name} item={item} onSelect={go} />
                      ))}
                    </CommandGroup>
                  </>
                )}
              </CommandList>

              <div className="border-t border-[var(--color-border)] px-3 py-2 flex items-center gap-3 text-[10px] text-[var(--color-text-2)]">
                <span><kbd className="font-mono">↑↓</kbd> navigate</span>
                <span><kbd className="font-mono">↵</kbd> select</span>
                <span><kbd className="font-mono">esc</kbd> close</span>
              </div>
            </Command>
          </div>
          <button className="fixed inset-0 -z-10 cursor-default" onClick={() => setOpen(false)} aria-label="Close search" />
        </div>
      )}
    </>
  )
}

function GroupHeading({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <span className="flex items-center gap-1.5 text-[var(--color-text-2)]">
      {icon}
      {label}
    </span>
  )
}

function SearchItem({ item, onSelect }: { item: IndexItem; onSelect: (name: string) => void }) {
  return (
    <CommandItem
      value={`${item.name} ${item.title} ${item.description}`}
      onSelect={() => onSelect(item.name)}
      className="flex items-center gap-3 rounded-lg px-3 py-2.5 cursor-pointer aria-selected:bg-[var(--color-surface-2)]"
    >
      <div className="flex flex-col gap-0.5 overflow-hidden">
        <span className="text-sm font-medium text-[var(--color-text-1)] truncate">{item.title}</span>
        <span className="text-xs text-[var(--color-text-2)] truncate">{item.description}</span>
      </div>
    </CommandItem>
  )
}
