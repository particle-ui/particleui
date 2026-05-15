"use client"

import * as React from "react"
import { Group, Panel, Separator, type GroupProps } from "react-resizable-panels"
import { GripVertical } from "lucide-react"

function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(" ")
}

const ResizablePanelGroup = ({ className, ...props }: GroupProps) => (
  <Group
    className={cn(
      "flex h-full w-full data-[orientation=vertical]:flex-col",
      className
    )}
    {...props}
  />
)
ResizablePanelGroup.displayName = "ResizablePanelGroup"

const ResizablePanel = Panel
ResizablePanel.displayName = "ResizablePanel"

const ResizableHandle = ({
  withHandle,
  className,
  ...props
}: React.ComponentProps<typeof Separator> & { withHandle?: boolean }) => (
  <Separator
    className={cn(
      "relative flex w-px items-center justify-center bg-[var(--color-border)]",
      "after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2",
      "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-1 focus-visible:ring-offset-[var(--color-bg)]",
      "data-[orientation=vertical]:h-px data-[orientation=vertical]:w-full",
      "data-[orientation=vertical]:after:left-0 data-[orientation=vertical]:after:h-1 data-[orientation=vertical]:after:w-full data-[orientation=vertical]:after:-translate-y-1/2 data-[orientation=vertical]:after:translate-x-0",
      "transition-colors duration-150",
      className
    )}
    {...props}
  >
    {withHandle && (
      <div className="z-10 flex h-4 w-3 items-center justify-center rounded-sm border border-[var(--color-border)] bg-[var(--color-surface-2)]">
        <GripVertical className="h-2.5 w-2.5 text-[var(--color-text-4)]" />
      </div>
    )}
  </Separator>
)
ResizableHandle.displayName = "ResizableHandle"

export { ResizablePanelGroup, ResizablePanel, ResizableHandle }
