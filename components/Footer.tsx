import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t-4 border-slate-900 bg-[#FFFDF5]">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-6 text-sm text-slate-700 md:flex-row md:items-center md:justify-between md:px-8 lg:px-10">
        <div>
          <p className="font-anton text-lg uppercase tracking-[0.2em] text-slate-900">
            RankNest
          </p>
          <p className="mt-1 font-sans text-sm leading-6 text-slate-600">
            Honest setup guidance and product picks for a better home theater.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-4 font-sans text-sm font-semibold uppercase tracking-[0.2em] text-slate-700">
          <Link href="/terms" className="transition-colors hover:text-rose-500">
            Terms & Conditions
          </Link>
          <Link href="/privacy" className="transition-colors hover:text-rose-500">
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}
