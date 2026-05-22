import { codeToHtml } from "shiki"
import { CopyButton } from "./copy-button"

type Lang = "tsx" | "ts" | "jsx" | "js" | "json" | "bash" | "css" | "svelte" | "vue" | "html"

function detectLang(code: string, filename?: string): Lang {
  if (filename) {
    if (filename.match(/\.(tsx|ts)$/)) return "tsx"
    if (filename.match(/\.(jsx|js)$/)) return "jsx"
    if (filename.match(/\.json$/) || filename.includes("components.json")) return "json"
    if (filename.match(/\.env/) || filename === ".env") return "bash"
    if (filename.match(/\.css$/)) return "css"
    if (filename.match(/\.svelte$/)) return "svelte"
    if (filename.match(/\.vue$/)) return "vue"
    if (filename.match(/\.html$/)) return "html"
    if (filename.match(/\.(sh|bash|zsh)$/)) return "bash"
  }
  const t = code.trimStart()
  if (t.startsWith("npx ") || t.startsWith("pnpm ") || t.startsWith("npm ") || t.startsWith("claude ") || t.startsWith("$ ")) return "bash"
  if (t.startsWith("{") && t.includes('"')) return "json"
  if (t.includes("import ") && t.includes(" from ")) return "tsx"
  if (t.includes("<template>") || t.includes("defineComponent")) return "vue"
  if (t.includes("<script")) return "svelte"
  return "bash"
}

function langLabel(lang: string, filename?: string): string {
  if (filename) return filename.split("/").pop() ?? filename
  const map: Record<string, string> = {
    tsx: "TSX", ts: "TS", jsx: "JSX", js: "JS", json: "JSON",
    bash: "bash", css: "CSS", svelte: "Svelte", vue: "Vue", html: "HTML",
  }
  return map[lang] ?? lang.toUpperCase()
}

export async function CodeBlock({
  code,
  lang,
  filename,
}: {
  code: string
  lang?: Lang
  filename?: string
}) {
  const language = lang ?? detectLang(code, filename)
  const trimmed = code.trim()

  const html = await codeToHtml(trimmed, {
    lang: language,
    theme: "github-dark-dimmed",
  })

  return (
    <div className="my-5 overflow-hidden rounded-xl border border-border">
      {/* Header bar — clean shadcn style, no traffic lights */}
      <div className="flex items-center justify-between border-b border-border bg-surface-2 px-4 py-2.5">
        <span className="font-mono text-[11px] text-text-3">
          {filename ?? langLabel(language)}
        </span>
        <CopyButton code={trimmed} />
      </div>

      {/* Highlighted code — override shiki's bg to match our surface */}
      <div
        className="overflow-x-auto [&_pre]:m-0 [&_pre]:rounded-none [&_pre]:!bg-surface-1 [&_pre]:p-5 [&_pre]:text-[0.8125rem] [&_pre]:leading-[1.75]"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  )
}
