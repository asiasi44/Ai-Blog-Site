"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const destinationLinks = [
  { href: "/the-picture", label: "Picture" },
  { href: "/the-sound", label: "Sound" },
  { href: "/the-comfort", label: "Comfort" },
];

export default function Navbar() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  return (
    <header className="sticky top-0 z-50 border-b-4 border-slate-900 bg-[#FFFDF5] px-4 py-4 md:px-8">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="font-anton text-3xl uppercase tracking-wider text-slate-900 transition-colors hover:text-rose-500"
          >
            Rank<span className="text-rose-500">Nest</span>
          </Link>
          <span className="hidden -rotate-2 font-caveat text-xl font-bold text-slate-500 sm:inline-block">
            make your own theater
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2 text-xs font-black uppercase tracking-wider text-slate-600 sm:gap-3">
          {!isHomePage && (
            <div className="flex flex-wrap items-center gap-1 rounded-full border border-slate-900 bg-white px-2 py-1 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]">
              {destinationLinks.map((item) => {
                const isActive =
                  pathname === item.href ||
                  (item.href === "/the-sound" && pathname.startsWith("/the-sound")) ||
                  (item.href === "/the-picture" && pathname.startsWith("/the-picture")) ||
                  (item.href === "/the-comfort" && pathname.startsWith("/the-comfort"));
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`rounded-full px-2.5 py-1 transition-colors ${
                      isActive
                        ? "bg-slate-900 text-[#FFFDF5]"
                        : "text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          )}

          <Link href="/about" className="hover:underline">
            About
          </Link>
          <span className="text-slate-300">/</span>
          <Link href="/methodology" className="hover:underline">
            Methodology
          </Link>
        </div>
      </div>
    </header>
  );
}
