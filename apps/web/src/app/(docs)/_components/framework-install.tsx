"use client"

import { useState } from "react"
import { CopyButton } from "@/components/copy-button"

const PORTED_VUE = new Set([
  "avatar", "badge", "button", "card", "checkbox", "input",
  "label", "separator", "skeleton", "switch", "tabs", "textarea",
])

const PORTED_SVELTE = new Set([
  "avatar", "badge", "button", "card", "checkbox", "input",
  "label", "separator", "skeleton", "switch", "tabs", "textarea",
])

type Framework = "react" | "vue" | "svelte"
type PkgMgr = "npm" | "pnpm" | "yarn" | "bun"

const PKG_PREFIX: Record<PkgMgr, string> = {
  npm:  "npx",
  pnpm: "pnpm dlx",
  yarn: "yarn dlx",
  bun:  "bunx",
}

export function FrameworkInstall({ name }: { name: string }) {
  const [fw, setFw] = useState<Framework>("react")
  const [pkg, setPkg] = useState<PkgMgr>("npm")

  const hasVue = PORTED_VUE.has(name)
  const hasSvelte = PORTED_SVELTE.has(name)

  const fwFlag = fw === "react" ? "" : ` --framework ${fw}`
  const cmd = `${PKG_PREFIX[pkg]} particleui-cli add ${name}${fwFlag}`

  return (
    <div>
      {/* Framework chips */}
      <div className="mb-3 flex items-center gap-1.5">
        {(["react", "vue", "svelte"] as Framework[]).map((f) => {
          const available = f === "react" || (f === "vue" && hasVue) || (f === "svelte" && hasSvelte)
          return (
            <button
              key={f}
              onClick={() => available && setFw(f)}
              disabled={!available}
              className={[
                "rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-wide transition-all",
                fw === f && available
                  ? "border-accent-border bg-accent-dim text-accent"
                  : available
                  ? "border-border bg-surface-1 text-text-3 hover:border-border-hover hover:text-text-2"
                  : "cursor-not-allowed border-border bg-surface-1 text-text-4 opacity-50",
              ].join(" ")}
              title={!available ? `Not yet available for ${f}` : undefined}
            >
              {f}
              {!available && (
                <span className="ml-1.5 text-[9px] normal-case tracking-normal opacity-70">soon</span>
              )}
            </button>
          )
        })}
      </div>

      {/* Package-manager tabs + command block — shadcn style */}
      <div className="overflow-hidden rounded-xl border border-border">
        {/* pkg-mgr tab bar */}
        <div className="flex items-center border-b border-border bg-surface-2 px-3">
          {(["npm", "pnpm", "yarn", "bun"] as PkgMgr[]).map((p) => (
            <button
              key={p}
              onClick={() => setPkg(p)}
              className={[
                "px-3 py-2 text-[11px] font-mono font-medium transition-colors",
                pkg === p
                  ? "border-b-2 border-text-1 text-text-1"
                  : "text-text-3 hover:text-text-2",
              ].join(" ")}
              style={{ marginBottom: "-1px" }}
            >
              {p}
            </button>
          ))}
          <div className="ml-auto">
            <CopyButton code={cmd} />
          </div>
        </div>

        {/* Command */}
        <div className="flex items-center gap-2 bg-surface-1 px-4 py-3 font-mono text-[13px] text-text-2">
          <span className="select-none text-text-4">$</span>
          <span className="flex-1 min-w-0 truncate">{cmd}</span>
        </div>
      </div>

      {fw !== "react" && (
        <p className="mt-2 text-[11px] text-text-4">
          {fw === "vue" ? "Requires Vue 3 + Tailwind." : "Requires Svelte 4/5 + Tailwind."}{" "}
          <a
            href={`/docs/getting-started/installation#${fw}`}
            className="text-accent hover:underline"
          >
            Setup guide →
          </a>
        </p>
      )}
    </div>
  )
}
