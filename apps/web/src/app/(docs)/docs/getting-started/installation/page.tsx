import type { Metadata } from "next"
import { CodeBlock } from "@/components/code-block"
import { Callout } from "@/components/docs/callout"
import { Steps, Step } from "@/components/docs/steps"
import { PrevNext } from "@/components/docs/prev-next"

export const metadata: Metadata = { title: "Installation — ParticleUI Docs" }

export default function InstallationPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-accent">
        Getting Started
      </div>
      <h1 id="installation" className="mb-5 text-[2.5rem] font-semibold tracking-[-0.02em] leading-[1.15] text-text-1">
        Installation
      </h1>
      <p className="mb-8 text-text-2 leading-[1.75] text-[0.9375rem]">
        ParticleUI ships its own CLI — <code>particleui-cli</code> — so you don&apos;t need the
        any other tool. One command installs any component directly into your project.
      </p>

      <Callout variant="note">
        The ParticleUI CLI auto-detects React, Vue, and Svelte projects. It writes components
        directly into your codebase — no runtime package, no wrapper, no version lock-in.
      </Callout>

      <h2 id="steps" className="mb-6 mt-10 text-xl font-semibold tracking-[-0.01em] text-text-1">
        Setup steps
      </h2>

      <Steps>
        <Step title="Install your first component">
          <p className="mb-3">
            No setup required. Just run the CLI with the component name — it auto-detects your
            framework and writes the file directly into your project:
          </p>
          <CodeBlock code="npx particleui-cli add button" />
          <p className="mt-3 text-text-3 text-sm">
            Install multiple at once:
          </p>
          <div className="mt-2">
            <CodeBlock code="npx particleui-cli add glow-card tilt-card marquee" />
          </div>
        </Step>

        <Step title="(Optional) Set up project config">
          <p className="mb-3">
            The CLI auto-detects your framework and components directory. To lock in your preferences,
            run the interactive init:
          </p>
          <CodeBlock code="npx particleui-cli init" />
          <p className="mt-3 text-text-3 text-sm">
            This creates a <code>particleui.json</code> in your project root with your framework,
            components directory, and optional Pro token path.
          </p>
        </Step>

        <Step title="Use it like any other component">
          <p className="mb-3">Import and use — the file is already in your project:</p>
          <CodeBlock
            code={`import { GlowButton } from "@/components/ui/glow-button"

export default function Page() {
  return <GlowButton variant="electric">Ship it</GlowButton>
}`}
          />
        </Step>
      </Steps>

      <Callout variant="tip" title="Global install for daily use">
        Install once, use everywhere without npx:
        <br />
        <br />
        <code>npm install -g particleui-cli</code>
        <br />
        <code>particleui add glow-button tilt-card beam</code>
      </Callout>

      <hr className="border-border my-10" />

      <section className="mb-10">
        <h2 id="pro-components" className="mb-4 text-xl font-semibold tracking-[-0.01em] text-text-1">
          Pro components
        </h2>
        <p className="text-sm text-text-2 leading-[1.75] mb-4">
          Pro components require an active license. After purchasing,{" "}
          <a href="/dashboard" className="text-accent hover:underline">
            copy your API token from the dashboard
          </a>{" "}
          and set it in your environment:
        </p>
        <CodeBlock filename=".env" code="PARTICLEUI_TOKEN=pui_your_token_here" />
        <p className="mt-3 text-sm text-text-3 mb-3">
          The CLI reads this automatically — no extra config needed:
        </p>
        <CodeBlock code="npx particleui-cli add particle-hero" />
        <p className="mt-2 text-xs text-text-3">
          The token is read at install time only — it is never bundled into your app. Add{" "}
          <code>.env</code> to <code>.gitignore</code>.
        </p>
      </section>

      <section className="mb-10">
        <h2 id="vue-svelte" className="mb-4 text-xl font-semibold tracking-[-0.01em] text-text-1">
          Vue &amp; Svelte
        </h2>
        <p className="text-sm text-text-2 leading-[1.75] mb-3">
          The CLI auto-detects Vue and Svelte projects. You can also pass <code>--framework</code>:
        </p>
        <CodeBlock code={`npx particleui-cli add button --framework vue\nnpx particleui-cli add button --framework svelte`} />
        <p className="mt-3 text-sm text-text-3 mb-3">
          Frameworks with available components (more ported weekly):
        </p>
        <div className="divide-y divide-border rounded-xl border border-border overflow-hidden">
          {[
            ["React", "85 components"],
            ["Vue", "12 components"],
            ["Svelte", "12 components"],
          ].map(([fw, count]) => (
            <div key={fw as string} className="flex items-center gap-4 bg-surface-1 px-4 py-3">
              <span className="w-16 shrink-0 text-xs font-medium text-text-3">{fw}</span>
              <span className="text-xs text-text-4">{count as string}</span>
            </div>
          ))}
        </div>
      </section>

      <PrevNext />
    </div>
  )
}
