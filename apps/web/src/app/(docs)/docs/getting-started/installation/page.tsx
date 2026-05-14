import type { Metadata } from "next"

export const metadata: Metadata = { title: "Installation — ParticleUI Docs" }

function CodeBlock({ code, filename }: { code: string; filename?: string }) {
  return (
    <div className="rounded-xl border border-white/[0.07] bg-[#0a0a0a] overflow-hidden mb-6">
      {filename && (
        <div className="border-b border-white/[0.05] px-4 py-2.5">
          <span className="font-mono text-xs text-[#444]">{filename}</span>
        </div>
      )}
      <pre className="overflow-x-auto p-4 text-xs leading-6 text-[#00d4ff]">
        <code>{code}</code>
      </pre>
    </div>
  )
}

function Step({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <div className="mb-8 flex gap-4">
      <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-white/[0.1] text-xs font-bold text-[#555]">
        {n}
      </div>
      <div className="flex-1">
        <h3 className="text-base font-semibold mb-3">{title}</h3>
        {children}
      </div>
    </div>
  )
}

export default function InstallationPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <div className="mb-2 text-xs font-semibold uppercase tracking-[0.15em] text-[#333]">
        Getting Started
      </div>
      <h1 className="mb-4 text-4xl font-bold tracking-[-0.03em]">Installation</h1>
      <p className="mb-10 text-[#555] leading-relaxed">
        ParticleUI works with any project that uses shadcn/ui. If you haven't set up shadcn yet,{" "}
        <a href="https://ui.shadcn.com/docs/installation" className="text-[#00d4ff] hover:underline">
          do that first
        </a>.
      </p>

      <Step n={1} title="Get a token">
        <p className="text-sm text-[#555] mb-3">
          Free components don't require a token. For Pro components,{" "}
          <a href="/sign-up" className="text-[#00d4ff] hover:underline">create an account</a> and
          copy your API token from the{" "}
          <a href="/dashboard" className="text-[#00d4ff] hover:underline">dashboard</a>.
        </p>
        <CodeBlock filename=".env" code="PARTICLEUI_TOKEN=pui_your_token_here" />
      </Step>

      <Step n={2} title="Add the registry">
        <p className="text-sm text-[#555] mb-3">
          Open your <code className="text-[#888] bg-white/[0.04] rounded px-1.5 py-0.5 text-xs">components.json</code> and
          add <code className="text-[#888] bg-white/[0.04] rounded px-1.5 py-0.5 text-xs">@particleui</code> under{" "}
          <code className="text-[#888] bg-white/[0.04] rounded px-1.5 py-0.5 text-xs">registries</code>:
        </p>
        <CodeBlock
          filename="components.json"
          code={`{
  "registries": {
    "@particleui": {
      "url": "https://particleui.dev/r/react/{name}.json",
      "headers": {
        "Authorization": "Bearer \${PARTICLEUI_TOKEN}"
      }
    }
  }
}`}
        />
        <p className="text-xs text-[#444]">
          The <code className="text-[#666]">{"{name}"}</code> placeholder is filled in by the shadcn CLI automatically.
          The token is read from your environment — it's never hard-coded.
        </p>
      </Step>

      <Step n={3} title="Install a component">
        <p className="text-sm text-[#555] mb-3">
          Use the standard shadcn CLI with the <code className="text-[#888] bg-white/[0.04] rounded px-1.5 py-0.5 text-xs">@particleui</code> namespace:
        </p>
        <CodeBlock code="npx shadcn add @particleui/glow-button" />
        <p className="text-sm text-[#555] mb-3">For Pro components:</p>
        <CodeBlock code="npx shadcn add @particleui/particle-hero" />
      </Step>

      <Step n={4} title="Use it">
        <p className="text-sm text-[#555] mb-3">
          The component is now in your project. Import it like any other component:
        </p>
        <CodeBlock
          code={`import { GlowButton } from "@/components/ui/glow-button"

export default function Page() {
  return <GlowButton variant="electric">Ship it</GlowButton>
}`}
        />
      </Step>

      <hr className="border-white/[0.06] my-8" />

      <section>
        <h2 className="mb-4 text-xl font-semibold tracking-tight">Vue & Svelte</h2>
        <p className="text-sm text-[#555] leading-relaxed mb-3">
          Use the framework-specific registry URL:
        </p>
        <div className="divide-y divide-white/[0.05] rounded-xl border border-white/[0.07] overflow-hidden">
          {[
            ["React", "https://particleui.dev/r/react/{name}.json"],
            ["Vue", "https://particleui.dev/r/vue/{name}.json"],
            ["Svelte", "https://particleui.dev/r/svelte/{name}.json"],
          ].map(([fw, url]) => (
            <div key={fw as string} className="flex items-center gap-4 bg-[#0a0a0a] px-4 py-3">
              <span className="w-16 shrink-0 text-xs font-medium text-[#666]">{fw}</span>
              <code className="text-xs text-[#444] font-mono">{url as string}</code>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
