"use client"

import { NewsletterSection } from "@/components/blocks/newsletter"
import { Footer } from "@/components/blocks/footer"

const posts = [
  {
    tag: "Tutorial",
    title: "Getting started with React Server Components",
    excerpt: "Learn how to leverage React Server Components in Next.js 15 to ship faster, more efficient applications with less client-side JavaScript.",
    author: "Alex Rivera",
    date: "May 12, 2026",
    readTime: "8 min read",
  },
  {
    tag: "Deep Dive",
    title: "Building a design system with CSS custom properties",
    excerpt: "A practical guide to creating a scalable, token-driven design system using modern CSS — no preprocessor required.",
    author: "Priya Nair",
    date: "May 8, 2026",
    readTime: "12 min read",
  },
  {
    tag: "Release",
    title: "ParticleUI v2.0: Tailwind v4 and React 19 support",
    excerpt: "We've rebuilt the entire component pipeline from the ground up. Here's what's new, what changed, and how to migrate.",
    author: "James Okafor",
    date: "May 1, 2026",
    readTime: "5 min read",
  },
]

export function BlogTemplate() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="border-b border-[var(--color-border)] bg-[var(--color-bg)] px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-bold text-sm tracking-tight text-[var(--color-text-1)]">The Particle Blog</span>
        </div>
        <nav className="hidden md:flex items-center gap-5 text-sm text-[var(--color-text-2)]">
          <a href="#" className="hover:text-[var(--color-text-1)] transition-colors">Articles</a>
          <a href="#" className="hover:text-[var(--color-text-1)] transition-colors">Tutorials</a>
          <a href="#" className="hover:text-[var(--color-text-1)] transition-colors">Newsletter</a>
        </nav>
      </header>

      {/* Hero */}
      <section className="px-4 py-16 text-center border-b border-[var(--color-border)]">
        <div className="mx-auto max-w-2xl">
          <h1 className="text-5xl font-bold tracking-tight leading-tight text-[var(--color-text-1)] mb-4">
            Ideas, tutorials &amp; releases
          </h1>
          <p className="text-lg text-[var(--color-text-2)]">
            The latest from the ParticleUI team — design system thinking, component patterns, and engineering deep dives.
          </p>
        </div>
      </section>

      {/* Post list */}
      <main className="flex-1 px-4 py-16">
        <div className="mx-auto max-w-3xl flex flex-col gap-10">
          {posts.map((post) => (
            <article
              key={post.title}
              className="group flex flex-col gap-3 border-b border-[var(--color-border)] pb-10 last:border-b-0 last:pb-0"
            >
              <div className="flex items-center gap-3">
                <span className="rounded-full border border-[var(--color-accent-border)] bg-[var(--color-accent-dim)] px-2.5 py-0.5 text-[11px] font-semibold text-[var(--color-accent-text)]">
                  {post.tag}
                </span>
                <span className="text-xs text-[var(--color-text-3)]">{post.date}</span>
                <span className="text-xs text-[var(--color-text-4)]">·</span>
                <span className="text-xs text-[var(--color-text-3)]">{post.readTime}</span>
              </div>
              <a href="#" className="group/link">
                <h2 className="text-2xl font-bold tracking-tight text-[var(--color-text-1)] group-hover/link:text-[var(--color-accent)] transition-colors">
                  {post.title}
                </h2>
              </a>
              <p className="text-[var(--color-text-2)] leading-relaxed">{post.excerpt}</p>
              <div className="flex items-center gap-2 mt-1">
                <div className="h-7 w-7 rounded-full bg-[var(--color-accent-dim)] border border-[var(--color-accent-border)] flex items-center justify-center text-[10px] font-bold text-[var(--color-accent-text)]">
                  {post.author.split(" ").map((n) => n[0]).join("")}
                </div>
                <span className="text-sm text-[var(--color-text-2)]">{post.author}</span>
              </div>
            </article>
          ))}
        </div>
      </main>

      {/* Newsletter */}
      <NewsletterSection
        heading="Get articles in your inbox"
        description="New posts, component releases, and design system ideas — delivered weekly. No spam, unsubscribe any time."
      />

      <Footer />
    </div>
  )
}

export default BlogTemplate
