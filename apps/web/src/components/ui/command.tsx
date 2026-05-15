"use client"

import * as React from "react"
import { Command as CommandPrimitive } from "cmdk"
import { Search } from "lucide-react"

const Command = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive>
>(({ className, ...props }, ref) => (
  <CommandPrimitive
    ref={ref}
    className={[
      "flex h-full w-full flex-col overflow-hidden rounded-xl",
      "bg-[var(--color-surface-1)] text-[var(--color-text-1)]",
      className,
    ]
      .filter(Boolean)
      .join(" ")}
    {...props}
  />
))
Command.displayName = CommandPrimitive.displayName

const CommandInput = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Input>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>
>(({ className, ...props }, ref) => (
  <div className="flex items-center border-b border-[var(--color-border)] px-3" cmdk-input-wrapper="">
    <Search className="mr-2 h-4 w-4 shrink-0 text-[var(--color-text-4)]" />
    <CommandPrimitive.Input
      ref={ref}
      className={[
        "flex h-11 w-full bg-transparent py-3 text-sm outline-none",
        "text-[var(--color-text-1)] placeholder:text-[var(--color-text-4)]",
        "disabled:cursor-not-allowed disabled:opacity-40",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    />
  </div>
))
CommandInput.displayName = CommandPrimitive.Input.displayName

const CommandList = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.List>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.List
    ref={ref}
    className={["max-h-[300px] overflow-y-auto overflow-x-hidden p-1", className].filter(Boolean).join(" ")}
    {...props}
  />
))
CommandList.displayName = CommandPrimitive.List.displayName

const CommandEmpty = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Empty>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>
>((props, ref) => (
  <CommandPrimitive.Empty
    ref={ref}
    className="py-8 text-center text-sm text-[var(--color-text-4)]"
    {...props}
  />
))
CommandEmpty.displayName = CommandPrimitive.Empty.displayName

const CommandGroup = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Group>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Group
    ref={ref}
    className={[
      "overflow-hidden p-1 text-[var(--color-text-1)]",
      "[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5",
      "[&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:font-semibold",
      "[&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wider",
      "[&_[cmdk-group-heading]]:text-[var(--color-text-4)]",
      className,
    ]
      .filter(Boolean)
      .join(" ")}
    {...props}
  />
))
CommandGroup.displayName = CommandPrimitive.Group.displayName

const CommandSeparator = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Separator
    ref={ref}
    className={["-mx-1 h-px my-1 bg-[var(--color-border)]", className].filter(Boolean).join(" ")}
    {...props}
  />
))
CommandSeparator.displayName = CommandPrimitive.Separator.displayName

const CommandItem = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Item
    ref={ref}
    className={[
      "relative flex cursor-pointer select-none items-center gap-2 rounded-md px-2 py-1.5 text-sm",
      "text-[var(--color-text-2)] outline-none transition-colors duration-100",
      "data-[selected=true]:bg-[var(--color-surface-3)] data-[selected=true]:text-[var(--color-text-1)]",
      "data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-40",
      "[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:text-[var(--color-text-4)]",
      className,
    ]
      .filter(Boolean)
      .join(" ")}
    {...props}
  />
))
CommandItem.displayName = CommandPrimitive.Item.displayName

const CommandShortcut = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => (
  <span
    className={["ml-auto text-xs tracking-widest text-[var(--color-text-4)] opacity-60", className].filter(Boolean).join(" ")}
    {...props}
  />
)
CommandShortcut.displayName = "CommandShortcut"

export {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
}
