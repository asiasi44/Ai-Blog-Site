import type { Metadata } from "next";
import {
  Geist,
  Inter,
  Manrope,
  Anton,
  Caveat,
  Nunito_Sans,
} from "next/font/google";
import "./globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Toaster } from "@/components/ui/sonner";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/Footer";

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton-font",
});

const caveat = Caveat({
  variable: "--font-caveat-font",
  subsets: ["latin"],
});

const nunito = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-nunito-font",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const interFont = Inter({
  variable: "--font-inter-font",
  subsets: ["latin"],
});

const manropeFont = Manrope({
  variable: "--font-manrope-font",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.SITE_URL || "https://ranknest.tech"),
  applicationName: "RankNest",
  title: {
    default: "RankNest | Complete Home Theater Guides & Tech Reviews",
    template: "%s | RankNest",
  },
  description:
    "RankNest provides comprehensive home theater buying advice, expert audio gear reviews, and honest product comparisons to help you build the ultimate entertainment setup.",
  keywords: [
    "home theater setup",
    "home audio reviews",
    "best home theater gear",
    "surround sound systems",
    "audio visual equipment",
    "product comparison guides",
    "honest product reviews",
    "smart buying advice",
    "consumer electronics reviews",
  ],
  alternates: {
    canonical: "/",
  },
  other: {
    "google-site-verification": "eHK4gnsSuDp43s322_h3gU5BWtKhQBRgj4Bd7wyWT0A",
  },
  appleWebApp: {
    title: "RankNest",
    capable: true,
  },
  openGraph: {
    title: "RankNest | Complete Home Theater Guides & Tech Reviews",
    description:
      "Discover the best home theater gear, smart electronics, and audio setups through comprehensive reviews, curated roundups, and practical buying advice.",
    url: process.env.SITE_URI || "https://ranknest.tech/",
    siteName: "RankNest",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/icon.png",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "RankNest | Complete Home Theater Guides & Tech Reviews",
    description:
      "Discover the best home theater gear, smart electronics, and audio setups through comprehensive reviews, curated roundups, and practical buying advice.",
    images: ["/icon.png"],
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
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
    other: [
      {
        rel: "manifest",
        url: "/site.webmanifest",
      },
    ],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "RankNest",
  alternateName: ["RankNest Tech", "RankNest.tech"],
  url: "https://ranknest.tech/",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <GoogleAnalytics gaId="G-Y7BM9SJFY9" />
      <SpeedInsights />
      <Analytics />
      <body
        className={`${nunito.variable} ${anton.variable} ${caveat.variable} ${geistSans.variable} ${interFont.variable} ${manropeFont.variable} font-geist antialiased`}
      >
        <Navbar />
        {children}
        <Footer />
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
