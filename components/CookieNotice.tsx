"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const COOKIE_KEY = "ranknest-cookie-consent";

export default function CookieNotice() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_KEY);
    if (!consent) {
      setVisible(true);
    }
  }, []);

  const accept = () => {
    localStorage.setItem(COOKIE_KEY, "accepted");
    setVisible(false);
  };

  if (!visible) {
    return null;
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 px-3 pb-3 sm:px-4">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 rounded-2xl border border-slate-900 bg-[#FFFDF5] p-3 shadow-[0_10px_30px_rgba(15,23,42,0.18)] md:p-4">
        <div className="flex-1 min-w-0">
          <p className="font-sans text-sm font-semibold text-slate-900">
            We use a small cookie to understand traffic and improve the site.
          </p>
          <p className="mt-1 text-xs text-slate-600">
            Learn more in our <Link href="/privacy" className="font-semibold underline underline-offset-2">Privacy Policy</Link>.
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={accept}
            className="rounded-full border border-slate-900 bg-slate-900 px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white transition-transform duration-200 hover:-translate-y-0.5"
          >
            Accept
          </button>
          <Link
            href="/privacy"
            className="rounded-full border border-slate-300 bg-white px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-700 transition-colors hover:border-slate-900 hover:text-slate-900"
          >
            More info
          </Link>
        </div>
      </div>
    </div>
  );
}
