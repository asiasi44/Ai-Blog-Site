import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 px-4 py-4 md:px-8 bg-[#FFFDF5] border-b-4 border-slate-900">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="font-anton text-3xl uppercase tracking-wider text-slate-900 hover:text-rose-500 transition-colors"
          >
            Rank<span className="text-rose-500">Nest</span>
          </Link>
          <span className="font-caveat text-xl text-slate-500 font-bold hidden sm:inline-block -rotate-2">
            make your own theater
          </span>
        </div>
        <div className="flex items-center gap-6 text-xs font-black uppercase tracking-wider text-slate-600">
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
