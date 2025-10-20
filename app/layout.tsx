import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { GoogleAnalytics } from "@next/third-parties/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Asim Reviews - Honest Product Reviews & Smart Recommendations",
  description:
    "Discover in-depth, data-driven product reviews powered by AI. Explore gadgets, headphones, home essentials, and more — with insights that help you buy smarter.",
  keywords:
    "product reviews, amazon affiliate, best gadgets 2025, honest reviews, AI review analysis",
  openGraph: {
    title: "Asim Reviews - Honest Product Reviews & Smart Recommendations",
    description:
      "AI-powered product reviews and insights. Make better buying decisions with data, not hype.",
    url: "https://asimreviews.netlify.app/",
    siteName: "Asim Reviews",
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <GoogleAnalytics gaId="G-Y7BM9SJFY9"/>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
