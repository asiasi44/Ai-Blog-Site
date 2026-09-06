"use client";

export default function BackButton() {
  return (
    <button
      type="button"
      onClick={() => window.history.back()}
      className="mt-6 border-2 border-slate-900 bg-slate-900 px-4 py-3 font-anton text-sm uppercase tracking-widest text-white shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] transition-transform hover:-translate-y-0.5"
    >
      Go back
    </button>
  );
}
