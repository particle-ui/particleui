import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { ClerkProvider } from "@clerk/nextjs"
import { ThemeProvider } from "@/components/theme-provider"
import "@/styles/globals.css"

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" })
const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://particleui.dev"),
  title: {
    default: "ParticleUI — Premium shadcn components",
    template: "%s | ParticleUI",
  },
  description:
    "85+ free, open-source components built on shadcn/ui. Particles, motion, and premium UI blocks for React, Vue, and Svelte.",
  icons: { icon: "/favicon.ico" },
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0a0906" },
    { media: "(prefers-color-scheme: light)", color: "#faf8f5" },
  ],
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={`${geist.variable} ${geistMono.variable} font-sans antialiased`}>
          <ThemeProvider>{children}</ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
