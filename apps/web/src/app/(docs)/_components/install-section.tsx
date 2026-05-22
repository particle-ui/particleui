"use client"

import { useState } from "react"
import { FrameworkInstall } from "./framework-install"

type InstallTab = "command" | "manual"

export function InstallSection({
  name,
  dependencies,
  manualContent,
}: {
  name: string
  dependencies: string[]
  manualContent: React.ReactNode
}) {
  const [tab, setTab] = useState<InstallTab>("command")

  return (
    <div>
      {/* Command / Manual tabs — shadcn underline style */}
      <div className="mb-5 flex items-center gap-0 border-b border-border">
        {(["command", "manual"] as InstallTab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={[
              "pb-2 pr-5 text-sm font-medium capitalize transition-colors",
              tab === t
                ? "border-b-2 border-text-1 text-text-1"
                : "text-text-3 hover:text-text-2",
            ].join(" ")}
            style={{ marginBottom: "-1px" }}
          >
            {t === "command" ? "CLI" : "Manual"}
          </button>
        ))}
      </div>

      {tab === "command" && <FrameworkInstall name={name} />}
      {tab === "manual" && (
        <div className="space-y-4">
          {dependencies.length > 0 && (
            <div>
              <p className="mb-2 text-sm text-text-2">Install dependencies:</p>
              {manualContent}
            </div>
          )}
          {dependencies.length === 0 && manualContent}
        </div>
      )}
    </div>
  )
}
