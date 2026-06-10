import type { Metadata } from "next";
import { Geist, Inter, Manrope } from "next/font/google";
import "./globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Toaster } from "@/components/ui/sonner";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";

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
  applicationName: "Ranknest",
  title: {
    default: "Ranknest — Rank Products by YOUR Priorities",
    template: "%s | Ranknest",
  },
  description:
    "Set your own priorities and see products ranked instantly for what YOU care about. Free, no signup.",
  other: {
    "google-site-verification": "eHK4gnsSuDp43s322_h3gU5BWtKhQBRgj4Bd7wyWT0A",
  },
  appleWebApp: {
    title: "Ranknest",
    capable: true,
  },
  keywords:
    "product reviews, amazon affiliate, best gadgets 2025, honest reviews, AI review analysis",
  openGraph: {
    title: "Ranknest - Honest Product Reviews & Smart Recommendations",
    description:
      "AI-powered product reviews and insights. Make better buying decisions with data, not hype.",
    url: process.env.SITE_URI || "https://ranknest.tech/",
    siteName: "Ranknest",
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
  metadataBase: new URL("https://ranknest.tech"),
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <GoogleAnalytics gaId="G-Y7BM9SJFY9" />
      <SpeedInsights />
      <Analytics />
      <body
        className={`${geistSans.variable} ${interFont.variable} ${manropeFont.variable} font-geist antialiased`}
      >
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
