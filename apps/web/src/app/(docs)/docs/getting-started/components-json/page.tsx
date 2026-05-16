import type { Metadata } from "next"
import { CodeBlock } from "@/components/code-block"
import { Callout } from "@/components/docs/callout"
import { PrevNext } from "@/components/docs/prev-next"

export const metadata: Metadata = { title: "components.json — ParticleUI Docs" }

export default function ComponentsJsonPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-accent">
        Getting Started
      </div>
      <h1 id="components-json" className="mb-5 text-[2.5rem] font-semibold tracking-[-0.02em] leading-[1.15] text-text-1">
        components.json
      </h1>
      <p className="mb-8 text-text-2 leading-[1.75] text-[0.9375rem]">
        <code>components.json</code> is the project configuration file for the ParticleUI CLI.
        It lives at your project root and tells the CLI how to install components — which
        registries to use, where to place files, and how to resolve aliases.
      </p>

      <Callout variant="note">
        Run <code>npx particleui-cli init</code> to generate this file automatically. If you
        already have one from a previous setup, just add the <code>registries</code> key.
      </Callout>

      <hr className="border-border my-10" />

      <section className="mb-10">
        <h2 id="overview" className="mb-4 text-xl font-semibold tracking-[-0.01em] text-text-1">
          Overview
        </h2>
        <p className="text-sm text-text-2 leading-[1.75] mb-4">
          A freshly initialised project produces a file like this:
        </p>
        <CodeBlock
          filename="components.json"
          code={`{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "default",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.ts",
    "css": "src/app/globals.css",
    "baseColor": "neutral",
    "cssVariables": true
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils"
  }
}`}
        />
      </section>

      <section className="mb-10">
        <h2 id="registry-configuration" className="mb-4 text-xl font-semibold tracking-[-0.01em] text-text-1">
          Registry configuration
        </h2>
        <p className="text-sm text-text-2 leading-[1.75] mb-4">
          Add a <code>registries</code> key at the top level. Each key is a namespace prefix
          you&apos;ll use in the CLI command. The <code>url</code> field uses{" "}
          <code>{"{name}"}</code> as a placeholder — the CLI fills it in automatically.
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

        <div className="mt-4 divide-y divide-border rounded-xl border border-border overflow-hidden">
          {[
            ["url", "The registry endpoint. {name} is replaced by the component name."],
            [
              "headers.Authorization",
              "Optional for free components. Required for Pro — set PARTICLEUI_TOKEN in your .env.",
            ],
          ].map(([field, desc]) => (
            <div key={field as string} className="flex items-start gap-4 bg-surface-1 px-4 py-3">
              <code className="w-44 shrink-0 text-xs font-mono text-accent-text">{field}</code>
              <p className="text-xs text-text-3 leading-[1.6]">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 id="full-example" className="mb-4 text-xl font-semibold tracking-[-0.01em] text-text-1">
          Full example
        </h2>
        <p className="text-sm text-text-2 leading-[1.75] mb-4">
          A complete <code>components.json</code> with ParticleUI configured:
        </p>
        <CodeBlock
          filename="components.json"
          code={`{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "default",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.ts",
    "css": "src/app/globals.css",
    "baseColor": "neutral",
    "cssVariables": true
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils"
  },
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
        <p className="mt-3 text-xs text-text-3">
          The <code>Authorization</code> header is silently ignored for free components, so you
          can keep the entry consistent across all projects.
        </p>
      </section>

      <section className="mb-10">
        <h2 id="framework-urls" className="mb-4 text-xl font-semibold tracking-[-0.01em] text-text-1">
          Framework URLs
        </h2>
        <p className="text-sm text-text-2 leading-[1.75] mb-3">
          Change the <code>url</code> to target a different framework:
        </p>
        <div className="divide-y divide-border rounded-xl border border-border overflow-hidden">
          {[
            ["React", "https://particleui.dev/r/react/{name}.json"],
            ["Vue", "https://particleui.dev/r/vue/{name}.json"],
            ["Svelte", "https://particleui.dev/r/svelte/{name}.json"],
          ].map(([fw, url]) => (
            <div key={fw as string} className="flex items-center gap-4 bg-surface-1 px-4 py-3">
              <span className="w-16 shrink-0 text-xs font-medium text-text-3">{fw}</span>
              <code className="text-xs text-text-3 font-mono">{url as string}</code>
            </div>
          ))}
        </div>
      </section>

      <PrevNext />
    </div>
  )
}
