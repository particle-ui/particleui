export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="animate-page-in" style={{ backgroundColor: "var(--color-bg)", minHeight: "100vh" }}>
      <div
        className="relative mx-auto"
        style={{
          maxWidth: "1400px",
          borderLeft: "1px solid var(--color-border)",
          borderRight: "1px solid var(--color-border)",
        }}
      >
        {children}
      </div>
    </div>
  )
}
