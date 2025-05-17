import type { ReactNode } from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import Link from "next/link"
import "./globals.css"

// Initialize the Inter font with optimized loading
const inter = Inter({ 
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter"
})

// Define metadata for better SEO and social sharing
export const metadata: Metadata = {
  title: {
    template: "%s | AI Feeds by Matthews Wong",
    default: "AI Feeds - Discover the Latest AI Models and Repositories"
  },
  description: "Explore AI repositories and models in a TikTok-style interface. Find trending GitHub repositories and cutting-edge Hugging Face models in one place.",
  keywords: ["AI", "artificial intelligence", "models", "repositories", "GitHub", "Hugging Face", "machine learning"],
  authors: [{ name: "Matthews Wong", url: "https://matthewswong.tech" }],
  creator: "Matthews Wong",
  publisher: "Matthews Wong",
  generator: "Next.js",
  applicationName: "AI Feeds",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://aifeeds.matthewswong.tech"),
  alternates: {
    canonical: "/",
  },
  // Favicon and icon configurations
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      { url: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
    ],
  },
  // Web app manifest
  manifest: "/site.webmanifest",
  openGraph: {
    title: "AI Feeds - Discover the Latest AI Models and Repositories",
    description: "Explore AI repositories and models in a TikTok-style interface. Find trending GitHub repositories and cutting-edge Hugging Face models in one place.",
    url: "https://aifeeds.matthewswong.tech",
    siteName: "AI Feeds",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/android-chrome-512x512.png",
        width: 512,
        height: 512,
        alt: "AI Feeds Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Feeds - Discover the Latest AI Models and Repositories",
    description: "Explore AI repositories and models in a TikTok-style interface. Find trending GitHub repositories and cutting-edge Hugging Face models in one place.",
    creator: "@matthewswong",
    images: ["/android-chrome-512x512.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

// Define viewport settings for better mobile experience
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#111111" }
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={`${inter.className} antialiased`}>
        <main>{children}</main>
      </body>
    </html>
  )
}