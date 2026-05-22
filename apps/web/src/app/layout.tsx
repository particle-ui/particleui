import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono, Lexend } from "next/font/google"
import { ClerkProvider } from "@clerk/nextjs"
import { ThemeProvider } from "@/components/theme-provider"
import "@/styles/globals.css"

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" })
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" })
const lexend = Lexend({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  variable: "--font-lexend",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://particleui.dev"),
  title: {
    default: "ParticleUI — Premium UI components",
    template: "%s | ParticleUI",
  },
  description:
    "85+ free, open-source components — particles, motion, and premium UI blocks for React, Vue, and Svelte. One command install.",
  icons: { icon: "/favicon.ico" },
  openGraph: {
    type: "website",
    siteName: "ParticleUI",
    locale: "en_US",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/opengraph-image"],
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0a0906" },
    { media: "(prefers-color-scheme: light)", color: "#faf8f5" },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={`${geist.variable} ${geistMono.variable} ${lexend.variable} font-sans antialiased`}>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-black focus:shadow-lg focus:outline-none"
          >
            Skip to main content
          </a>
          <ThemeProvider>{children}</ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
