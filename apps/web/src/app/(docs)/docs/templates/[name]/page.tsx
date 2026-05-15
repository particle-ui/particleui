import { notFound } from "next/navigation"
import type { Metadata } from "next"
import Link from "next/link"
import { CodeBlock } from "@/components/code-block"

const TEMPLATES: Record<
  string,
  {
    title: string
    description: string
    blocks: string[]
    component: string
  }
> = {
  landing: {
    title: "Landing Page",
    description:
      "A complete SaaS landing page: hero, logos, features, stats, testimonials, pricing, FAQ, CTA, and footer.",
    blocks: [
      "hero-split",
      "logo-cloud",
      "feature-alternating",
      "stats",
      "testimonials",
      "pricing",
      "faq",
      "cta-section",
      "footer",
    ],
    component: "LandingTemplate",
  },
  "saas-dashboard": {
    title: "SaaS Dashboard",
    description: "Analytics dashboard with stat cards and data visualization.",
    blocks: ["dashboard-analytics", "stats"],
    component: "SaasDashboardTemplate",
  },
  auth: {
    title: "Auth Flow",
    description:
      "Sign in, sign up, forgot password, and email verification screens.",
    blocks: [
      "auth-sign-in",
      "auth-sign-up",
      "auth-forgot-password",
      "auth-verify-email",
    ],
    component: "AuthTemplate",
  },
  "pricing-page": {
    title: "Pricing Page",
    description:
      "Standalone pricing page with hero, plans, FAQ, and CTA.",
    blocks: ["hero-centered", "pricing", "faq", "cta-section", "footer"],
    component: "PricingPageTemplate",
  },
  "docs-site": {
    title: "Docs Site",
    description:
      "Documentation layout with sidebar navigation and content area.",
    blocks: ["footer"],
    component: "DocsSiteTemplate",
  },
  blog: {
    title: "Blog",
    description: "Blog layout with newsletter capture and footer.",
    blocks: ["newsletter", "footer"],
    component: "BlogTemplate",
  },
}

export async function generateStaticParams() {
  return Object.keys(TEMPLATES).map((name) => ({ name }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ name: string }>
}): Promise<Metadata> {
  const { name } = await params
  const t = TEMPLATES[name]
  if (!t) return { title: "Not found" }
  return { title: `${t.title} Template — ParticleUI` }
}

export default async function TemplatePage({
  params,
}: {
  params: Promise<{ name: string }>
}) {
  const { name } = await params
  const t = TEMPLATES[name]
  if (!t) notFound()

  const installCmd = `npx particleui-cli add ${t.blocks.join(" ")}`

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <nav className="mb-8 flex items-center gap-1.5 text-[11px] text-text-4">
        <Link
          href="/docs"
          className="hover:text-text-2 transition-colors"
        >
          Docs
        </Link>
        <span className="opacity-40">/</span>
        <Link
          href="/docs/components"
          className="hover:text-text-2 transition-colors"
        >
          Templates
        </Link>
        <span className="opacity-40">/</span>
        <span className="text-text-3">{t.title}</span>
      </nav>

      <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-accent">
        Template
      </div>
      <h1 className="mb-5 text-[2.5rem] font-bold tracking-[-0.04em] leading-[1.1] text-text-1">
        {t.title}
      </h1>
      <p className="mb-8 text-text-2 leading-[1.75] text-[0.9375rem]">
        {t.description}
      </p>

      <section className="mb-10">
        <h2 className="mb-4 text-xl font-semibold tracking-[-0.03em] text-text-1">
          Install all blocks
        </h2>
        <CodeBlock code={installCmd} />
        <p className="mt-3 text-sm text-text-3">
          This installs all {t.blocks.length} blocks in one command. Each block
          is added to your <code>src/components/ui/</code> directory.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-xl font-semibold tracking-[-0.03em] text-text-1">
          Included blocks
        </h2>
        <div className="flex flex-col gap-2">
          {t.blocks.map((block) => (
            <Link
              key={block}
              href={`/docs/components/${block}`}
              className="flex items-center justify-between rounded-xl border border-border bg-surface-1 px-4 py-3 text-sm hover:border-border-hover hover:bg-surface-2 transition-all"
            >
              <code className="text-text-1">{block}</code>
              <span className="text-text-4 text-xs">View →</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-xl font-semibold tracking-[-0.03em] text-text-1">
          Compose it
        </h2>
        <CodeBlock
          code={`import { ${t.component} } from "@/components/templates/${name}"

export default function Page() {
  return <${t.component} />
}`}
        />
      </section>
    </div>
  )
}
