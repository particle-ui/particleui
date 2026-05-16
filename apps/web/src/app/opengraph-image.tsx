import { ImageResponse } from "next/og"

export const runtime = "edge"
export const alt = "ParticleUI — 100+ UI components with particle effects"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#080604",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          fontFamily: "system-ui, sans-serif",
          padding: "80px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background glow */}
        <div style={{
          position: "absolute",
          top: "-120px",
          right: "-80px",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(245,240,232,0.06) 0%, transparent 70%)",
        }} />
        <div style={{
          position: "absolute",
          bottom: "-100px",
          left: "200px",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(245,240,232,0.03) 0%, transparent 70%)",
        }} />

        {/* Dots grid (decorative) */}
        <div style={{
          position: "absolute",
          right: "80px",
          top: "80px",
          display: "flex",
          flexDirection: "column",
          gap: "18px",
        }}>
          {Array.from({ length: 6 }).map((_, row) => (
            <div key={row} style={{ display: "flex", gap: "18px" }}>
              {Array.from({ length: 8 }).map((_, col) => (
                <div key={col} style={{
                  width: "3px",
                  height: "3px",
                  borderRadius: "50%",
                  background: `rgba(245,240,232,${0.04 + ((row + col) % 3) * 0.02})`,
                }} />
              ))}
            </div>
          ))}
        </div>

        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 56 }}>
          <div style={{ width: 9, height: 9, borderRadius: "50%", background: "#f5f0e8" }} />
          <span style={{ fontSize: 18, fontWeight: 700, color: "#9a9390", letterSpacing: "-0.02em" }}>
            ParticleUI
          </span>
        </div>

        {/* Headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: 4, marginBottom: 32 }}>
          <span style={{ fontSize: 88, fontWeight: 800, color: "#f5f0e8", letterSpacing: "-0.055em", lineHeight: 1 }}>
            Components so good
          </span>
          <span style={{ fontSize: 88, fontWeight: 800, color: "#3d3830", letterSpacing: "-0.055em", lineHeight: 1 }}>
            your users stop scrolling.
          </span>
        </div>

        {/* Stats row */}
        <div style={{ display: "flex", alignItems: "center", gap: 40, marginBottom: 40 }}>
          {[
            { value: "100+", label: "Components" },
            { value: "3", label: "Frameworks" },
            { value: "MIT", label: "License" },
            { value: "$0", label: "To start" },
          ].map(({ value, label }) => (
            <div key={label} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <span style={{ fontSize: 28, fontWeight: 800, color: "#f5f0e8", letterSpacing: "-0.04em" }}>{value}</span>
              <span style={{ fontSize: 12, color: "#4a4540", letterSpacing: "0.1em", textTransform: "uppercase" }}>{label}</span>
            </div>
          ))}
        </div>

        {/* Tag pills */}
        <div style={{ display: "flex", gap: 10 }}>
          {["React", "Vue", "Svelte", "One-command install"].map((tag) => (
            <div key={tag} style={{
              padding: "6px 14px",
              borderRadius: "100px",
              border: "1px solid rgba(245,240,232,0.12)",
              background: "rgba(245,240,232,0.04)",
              fontSize: 13,
              color: "#6b6560",
              letterSpacing: "-0.01em",
            }}>
              {tag}
            </div>
          ))}
        </div>

        {/* Domain */}
        <div style={{
          position: "absolute",
          bottom: 40,
          right: 80,
          fontSize: 14,
          color: "#2e2a26",
          letterSpacing: "0.02em",
        }}>
          particleui.dev
        </div>
      </div>
    ),
    { ...size }
  )
}
