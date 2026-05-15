import Link from "next/link"

export default function NotFound() {
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
      <p
        style={{
          fontSize: "clamp(6rem, 20vw, 10rem)",
          fontWeight: 800,
          lineHeight: 1,
          letterSpacing: "-0.04em",
          background:
            "linear-gradient(135deg, var(--color-accent), var(--color-text-2))",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          margin: 0,
        }}
      >
        404
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        <h1
          style={{
            fontSize: "clamp(1.25rem, 4vw, 1.75rem)",
            fontWeight: 600,
            margin: 0,
            color: "var(--color-text-1)",
          }}
        >
          Page not found
        </h1>
        <p
          style={{
            fontSize: "1rem",
            color: "var(--color-text-2)",
            margin: 0,
            maxWidth: "36ch",
          }}
        >
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
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
        <Link
          href="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.375rem",
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
        <Link
          href="/docs/components/button"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.375rem",
            padding: "0.5rem 1.25rem",
            borderRadius: "var(--radius)",
            border: "1px solid var(--color-accent)",
            color: "var(--color-accent)",
            textDecoration: "none",
            fontSize: "0.875rem",
            fontWeight: 500,
            backgroundColor: "transparent",
            transition: "background-color 0.15s ease, opacity 0.15s ease",
          }}
        >
          Browse components
        </Link>
      </div>
    </div>
  )
}
