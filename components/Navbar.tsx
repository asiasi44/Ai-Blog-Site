import Link from "next/link";
import { Search, ShoppingCart } from "lucide-react";
import { THEME } from "@/lib/design/theme";

export default function Navbar({
  searchTerm,
  setSearchTerm,
}: {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}) {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo & Brand */}
          <Link
            href="/"
            className="flex items-center gap-2 flex-shrink-0 group"
            aria-label="RankNest Home"
          >
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-lg text-white"
              style={{ backgroundColor: THEME.primary[600] }}
            >
              ⭐
            </div>
            <span className="hidden sm:inline text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
              RankNest
            </span>
            <span className="text-xs font-semibold text-blue-600 px-2 py-1 rounded-full bg-blue-50 hidden md:inline">
              Smart Buying Guide
            </span>
          </Link>

          {/* Center - Search (hidden on mobile) */}
          <div className="hidden md:flex flex-1 mx-8 max-w-md relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-gray-50 hover:bg-white"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Right - CTAs */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Mobile Search Button */}
            <button
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
              onClick={() =>
                (
                  document.querySelector(
                    'input[type="text"]',
                  ) as HTMLInputElement | null
                )?.focus()
              }
              aria-label="Search"
            >
              <Search className="w-5 h-5 text-gray-600" />
            </button>

            {/* Browse Link */}
            <Link
              href="/#categories"
              className="hidden sm:flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
            >
              <ShoppingCart className="w-4 h-4" />
              <span className="hidden md:inline">Browse</span>
            </Link>

            {/* Newsletter CTA */}
            <Link
              href="/subscribe-to-newsletter?utm_source=navbar"
              className="px-3 sm:px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200"
              style={{
                backgroundColor: THEME.accent[500],
                color: "white",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor =
                  THEME.accent[600];
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor =
                  THEME.accent[500];
              }}
            >
              <span className="hidden sm:inline">Subscribe</span>
              <span className="sm:hidden">Join</span>
            </Link>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden mt-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-gray-50"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>
    </header>
  );
}
