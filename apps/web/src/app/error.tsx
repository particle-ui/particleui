"use client"

import Link from "next/link"

export default function Error({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div
      style={{
        minHeight: "100svh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "1.5rem",
        padding: "2rem",
        backgroundColor: "var(--color-bg)",
        color: "var(--color-text-1)",
        textAlign: "center",
      }}
    >
      <span style={{ fontSize: "3rem", lineHeight: 1 }}>⚠</span>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        <h1
          style={{
            fontSize: "clamp(1.25rem, 4vw, 1.75rem)",
            fontWeight: 600,
            margin: 0,
            color: "var(--color-text-1)",
          }}
        >
          Something went wrong
        </h1>
        <p
          style={{
            fontSize: "1rem",
            color: "var(--color-text-2)",
            margin: 0,
            maxWidth: "40ch",
          }}
        >
          An unexpected error occurred. You can try again or return to the home
          page.
        </p>
      </div>

      <div
        style={{
          display: "flex",
          gap: "0.75rem",
          flexWrap: "wrap",
          justifyContent: "center",
          marginTop: "0.5rem",
        }}
      >
        <button
          onClick={reset}
          style={{
            display: "inline-flex",
            alignItems: "center",
            padding: "0.5rem 1.25rem",
            borderRadius: "var(--radius)",
            border: "1px solid var(--color-accent)",
            color: "var(--color-accent)",
            background: "transparent",
            fontSize: "0.875rem",
            fontWeight: 500,
            cursor: "pointer",
            transition: "opacity 0.15s ease",
          }}
        >
          Try again
        </button>
        <Link
          href="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            padding: "0.5rem 1.25rem",
            borderRadius: "var(--radius)",
            border: "1px solid var(--color-border)",
            color: "var(--color-text-1)",
            textDecoration: "none",
            fontSize: "0.875rem",
            fontWeight: 500,
            backgroundColor: "var(--color-surface-1)",
            transition: "background-color 0.15s ease, border-color 0.15s ease",
          }}
        >
          Go home
        </Link>
      </div>
    </div>
  )
}
