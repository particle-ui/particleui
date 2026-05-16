import Link from "next/link"
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr"
import type { Metadata } from "next"
import { Nav } from "../_components/nav"

export const metadata: Metadata = {
  title: "Blog — ParticleUI",
  description: "Design systems, component engineering, and building beautiful UI.",
}

const POSTS = [
  {
    slug: "oklch-color-space",
    title: "OKLCH: The color space your design system has been waiting for",
    description:
      "Why we abandoned hex and HSL for perceptual color, and how OKLCH gave us a dark mode that actually works across every screen.",
    category: "Design Systems",
    date: "May 12, 2026",
    readTime: "6 min read",
    featured: true,
  },
  {
    slug: "shadcn-registry-architecture",
    title: "Building a multi-framework component registry in 2026",
    description:
      "The architecture behind ParticleUI's multi-framework registry: how one JSON schema powers React, Vue, and Svelte components from a single source of truth.",
    category: "Engineering",
    date: "May 8, 2026",
    readTime: "8 min read",
    featured: false,
  },
  {
    slug: "particle-layer-design",
    title: "The particle layer: adding motion without chaos",
    description:
      "How we designed the animated component layer to be drop-in replacements for their static counterparts — same props, same API, zero breaking changes.",
    category: "Design",
    date: "April 28, 2026",
    readTime: "5 min read",
    featured: false,
  },
]

const CATEGORY_COLORS: Record<string, string> = {
  "Design Systems": "border-accent-border bg-accent-dim text-accent-text",
  "Engineering": "border-[oklch(40%_0.1_140/30%)] bg-[oklch(25%_0.05_140/20%)] text-[oklch(72%_0.2_140)]",
  "Design": "border-[oklch(40%_0.1_280/30%)] bg-[oklch(25%_0.05_280/20%)] text-[oklch(72%_0.15_280)]",
}

export default function BlogPage() {
  const [featured, ...rest] = POSTS

  return (
    <div className="min-h-svh bg-bg text-text-1">
      <Nav />

      <main id="main-content" tabIndex={-1} className="mx-auto max-w-5xl px-6 pt-32 pb-24 outline-none">
        {/* Header */}
        <div className="mb-16">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent mb-3">
            Blog
          </p>
          <h1 className="text-[clamp(2.25rem,4vw,3.5rem)] font-bold tracking-[-0.04em] leading-[1.1] mb-4">
            Writing on design,<br />components, and craft.
          </h1>
          <p className="text-text-2 text-lg leading-[1.7] max-w-xl">
            Thoughts on design systems, component engineering, and what it means
            to build UI that people actually love using.
          </p>
        </div>

        {/* Featured post */}
        <Link
          href={`/blog/${featured.slug}`}
          className="group block mb-5 rounded-2xl border border-border bg-surface-1 p-8 hover:border-border-hover hover:bg-surface-2 hover:-translate-y-1 transition-all duration-200"
        >
          <div className="flex items-center gap-3 mb-5">
            <span className={`text-xs font-semibold uppercase tracking-widest rounded-full border px-2.5 py-1 ${CATEGORY_COLORS[featured.category]}`}>
              {featured.category}
            </span>
            <span className="text-xs text-text-2">{featured.date}</span>
            <span className="text-xs text-text-2">·</span>
            <span className="text-xs text-text-2">{featured.readTime}</span>
          </div>
          <div className="flex items-start justify-between gap-6">
            <div>
              <h2 className="text-[1.375rem] font-bold tracking-[-0.03em] leading-[1.25] text-text-1 mb-3 group-hover:text-accent transition-colors">
                {featured.title}
              </h2>
              <p className="text-text-2 leading-[1.7] text-[15px]">
                {featured.description}
              </p>
            </div>
            <ArrowUpRight
              size={20}
              className="shrink-0 mt-1 text-text-4 opacity-0 group-hover:opacity-100 group-hover:text-accent transition-all"
            />
          </div>
        </Link>

        {/* Post grid */}
        <div className="grid sm:grid-cols-2 gap-4">
          {rest.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block rounded-2xl border border-border bg-surface-1 p-6 hover:border-border-hover hover:bg-surface-2 hover:-translate-y-1 transition-all duration-200"
            >
              <div className="flex items-center gap-2 mb-4">
                <span className={`text-xs font-semibold uppercase tracking-widest rounded-full border px-2.5 py-1 ${CATEGORY_COLORS[post.category]}`}>
                  {post.category}
                </span>
                <span className="text-xs text-text-2">{post.readTime}</span>
              </div>
              <h2 className="text-base font-semibold tracking-[-0.02em] leading-[1.35] text-text-1 mb-2 group-hover:text-accent transition-colors">
                {post.title}
              </h2>
              <p className="text-[15px] text-text-2 leading-[1.65] line-clamp-3">
                {post.description}
              </p>
              <p className="mt-4 text-xs text-text-2">{post.date}</p>
            </Link>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border px-6 py-10">
        <div className="mx-auto max-w-5xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-text-2">© {new Date().getFullYear()} ParticleUI</p>
          <nav className="flex items-center gap-6 text-xs text-text-2">
            {["Components", "Docs", "Pricing"].map((l) => (
              <Link key={l} href={`/${l.toLowerCase()}`} className="hover:text-text-2 transition-colors">
                {l}
              </Link>
            ))}
          </nav>
        </div>
      </footer>
    </div>
  )
}
