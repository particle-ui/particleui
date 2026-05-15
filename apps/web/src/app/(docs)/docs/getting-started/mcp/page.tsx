import type { Metadata } from "next"
import { CodeBlock } from "@/components/code-block"
import { Callout } from "@/components/docs/callout"
import { Steps, Step } from "@/components/docs/steps"
import { PrevNext } from "@/components/docs/prev-next"

export const metadata: Metadata = { title: "MCP Server — ParticleUI Docs" }

const tools = [
  {
    name: "list_components",
    desc: "Returns the full catalogue of available components with names, descriptions, and Pro/free status.",
  },
  {
    name: "get_component",
    desc: "Fetches the full source, props API, and usage examples for a single component by name.",
  },
  {
    name: "install_component",
    desc: "Runs the shadcn CLI install command for a component in your project directory.",
  },
  {
    name: "search_components",
    desc: 'Semantic search across all components — finds the best match for a description like "animated card with tilt effect".',
  },
]

export default function McpPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-accent">
        Getting Started
      </div>
      <h1 id="mcp-server" className="mb-5 text-[2.5rem] font-bold tracking-[-0.04em] leading-[1.1] text-text-1">
        MCP Server
      </h1>
      <p className="mb-8 text-text-2 leading-[1.75] text-[0.9375rem]">
        Let Claude search and install components from any conversation. The ParticleUI MCP server
        exposes your component library as a set of tools that Claude Code — or any MCP-compatible
        AI client — can call directly.
      </p>

      <Callout variant="tip" title="What the MCP server enables">
        Ask Claude in plain language: &ldquo;Add a glowing card with tilt effect to my project&rdquo;
        — Claude will search the registry, pick the right component, and run the install command
        for you. No copy-pasting, no looking up names.
      </Callout>

      <hr className="border-border my-10" />

      <section className="mb-10">
        <h2 id="setup" className="mb-6 text-xl font-semibold tracking-[-0.03em] text-text-1">
          Setup
        </h2>

        <Steps>
          <Step title="Add to Claude config">
            <p className="mb-3">
              Add the MCP server with a single command in your terminal:
            </p>
            <CodeBlock code="claude mcp add @particleui/mcp" />
            <p className="mb-3 mt-3">
              Or configure it manually in your Claude config file:
            </p>
            <CodeBlock
              filename="~/.claude/config.json"
              code={`{
  "mcpServers": {
    "particleui": {
      "command": "npx",
      "args": ["-y", "@particleui/mcp"],
      "env": {
        "PARTICLEUI_TOKEN": "pui_your_token_here"
      }
    }
  }
}`}
            />
          </Step>

          <Step title="Restart Claude Code">
            <p>
              Quit and reopen Claude Code (or run <code>/mcp restart</code> in an existing
              conversation) to pick up the new server. You should see{" "}
              <code>particleui</code> listed when you type <code>/mcp</code>.
            </p>
          </Step>

          <Step title="Use it in conversation">
            <p className="mb-3">
              Ask Claude in plain language — it will call the right tool automatically:
            </p>
            <div className="rounded-xl border border-border overflow-hidden">
              <div className="border-b border-border px-4 py-2.5 bg-surface-2">
                <span className="font-mono text-xs text-text-3">Claude Code conversation</span>
              </div>
              <div className="divide-y divide-border">
                <div className="flex gap-3 px-4 py-3 bg-surface-1">
                  <span className="shrink-0 text-xs font-medium text-text-3 w-12">You</span>
                  <p className="text-xs text-text-2 leading-relaxed">
                    Add a glowing card component to my project.
                  </p>
                </div>
                <div className="flex gap-3 px-4 py-3">
                  <span className="shrink-0 text-xs font-medium text-accent w-12">Claude</span>
                  <div className="space-y-2">
                    <p className="text-xs text-text-2 leading-relaxed">
                      I&apos;ll search for a glowing card component in ParticleUI.
                    </p>
                    <p className="text-xs text-text-3 italic">
                      Calling <code>search_components</code> with &ldquo;glowing card&rdquo;&hellip;
                    </p>
                    <p className="text-xs text-text-2 leading-relaxed">
                      Found <strong className="text-text-1">GlowCard</strong> — a card with a
                      radial glow that follows your cursor. Installing it now.
                    </p>
                    <p className="text-xs text-text-3 italic">
                      Calling <code>install_component</code> with &ldquo;glow-card&rdquo;&hellip;
                    </p>
                    <p className="text-xs text-text-2 leading-relaxed">
                      Done. <code className="text-text-1">GlowCard</code> has been added to{" "}
                      <code className="text-text-1">src/components/ui/glow-card.tsx</code>.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Step>
        </Steps>
      </section>

      <hr className="border-border mb-10" />

      <section className="mb-10">
        <h2 id="available-tools" className="mb-4 text-xl font-semibold tracking-[-0.03em] text-text-1">
          Available tools
        </h2>
        <p className="text-sm text-text-2 leading-[1.75] mb-4">
          The server exposes four tools that Claude can call:
        </p>
        <div className="divide-y divide-border rounded-xl border border-border overflow-hidden">
          {tools.map(({ name, desc }) => (
            <div key={name} className="flex flex-col gap-1 bg-surface-1 px-4 py-3.5">
              <code className="text-xs font-mono text-accent-text">{name}</code>
              <p className="text-xs text-text-3 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 id="other-clients" className="mb-4 text-xl font-semibold tracking-[-0.03em] text-text-1">
          Other MCP clients
        </h2>
        <p className="text-sm text-text-2 leading-[1.75]">
          The ParticleUI MCP server follows the{" "}
          <a
            href="https://modelcontextprotocol.io"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:underline"
          >
            Model Context Protocol
          </a>{" "}
          spec and works with any compatible client including Cursor, Zed, and custom agent
          frameworks. The server command is always{" "}
          <code>npx -y @particleui/mcp</code> — consult your client&apos;s docs for the
          config format.
        </p>
      </section>

      <PrevNext />
    </div>
  )
}
