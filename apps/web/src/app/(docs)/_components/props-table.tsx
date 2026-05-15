interface PropDef {
  name: string
  type: string
  required: boolean
  defaultValue?: string
}

function parsePropsFromSource(source: string): PropDef[] {
  const props: PropDef[] = []

  // Match interface XxxProps { ... } — may span multiple lines
  const interfaceRegex = /interface\s+\w+Props[^{]*\{([\s\S]*?)\n\}/g
  let match
  while ((match = interfaceRegex.exec(source)) !== null) {
    const body = match[1]
    const lines = body.split("\n")
    for (const line of lines) {
      const trimmed = line.trim()
      if (!trimmed || trimmed.startsWith("//") || trimmed.startsWith("*")) continue
      // Match: propName?: type or propName: type
      const m = trimmed.match(/^(\w+)(\?)?:\s*(.+?)(?:;\s*(?:\/\/.*)?)?$/)
      if (!m) continue
      props.push({
        name: m[1],
        required: !m[2],
        type: m[3].replace(/;$/, "").trim(),
      })
    }
  }
  return props
}

function extractDefaultValues(source: string): Record<string, string> {
  const defaults: Record<string, string> = {}
  // Match destructuring pattern: { propName = defaultValue, ... }
  const destructure = source.match(/\(\s*\{([\s\S]*?)\}\s*[:,]/)
  if (!destructure) return defaults

  const body = destructure[1]
  const entries = body.split(",")
  for (const entry of entries) {
    const m = entry.trim().match(/^(\w+)\s*=\s*(.+?)(?:\s*$)/)
    if (!m) continue
    defaults[m[1]] = m[2].trim()
  }
  return defaults
}

export function parseProps(source: string): PropDef[] {
  const props = parsePropsFromSource(source)
  const defaults = extractDefaultValues(source)
  return props.map((p) => ({
    ...p,
    defaultValue: defaults[p.name],
  }))
}

export function PropsTable({ props }: { props: PropDef[] }) {
  if (props.length === 0) return null

  return (
    <section className="mb-10">
      <h2 id="props" className="mb-5 text-lg font-semibold tracking-tight text-[var(--color-text-1)]">Props</h2>
      <div className="overflow-hidden rounded-xl border border-[var(--color-border)]">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-[var(--color-border)] bg-[var(--color-surface-2)]">
              <th className="px-4 py-2.5 text-left font-semibold text-[var(--color-text-4)] uppercase tracking-widest text-[10px]">Prop</th>
              <th className="px-4 py-2.5 text-left font-semibold text-[var(--color-text-4)] uppercase tracking-widest text-[10px]">Type</th>
              <th className="px-4 py-2.5 text-left font-semibold text-[var(--color-text-4)] uppercase tracking-widest text-[10px]">Default</th>
              <th className="px-4 py-2.5 text-left font-semibold text-[var(--color-text-4)] uppercase tracking-widest text-[10px]">Required</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--color-border)]">
            {props.map((p) => (
              <tr key={p.name} className="bg-[var(--color-surface-1)] hover:bg-[var(--color-surface-2)] transition-colors">
                <td className="px-4 py-3 font-mono font-semibold text-[var(--color-accent-text)]">{p.name}</td>
                <td className="px-4 py-3 font-mono text-[var(--color-text-3)] max-w-[200px] truncate" title={p.type}>{p.type}</td>
                <td className="px-4 py-3 font-mono text-[var(--color-text-4)]">
                  {p.defaultValue ? (
                    <code className="rounded bg-[var(--color-surface-2)] px-1.5 py-0.5">{p.defaultValue}</code>
                  ) : (
                    <span className="text-[var(--color-text-4)]">—</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  {p.required ? (
                    <span className="text-[oklch(68%_0.22_25)] font-semibold">yes</span>
                  ) : (
                    <span className="text-[var(--color-text-4)]">no</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
