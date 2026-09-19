"use client";

import { FormEvent, useEffect, useState, useTransition } from "react";
import { subscribeToNewsletter } from "@/app/subscribe-to-newsletter/actions";
import { UTMSource } from "@/app/subscribe-to-newsletter/types";

const DISMISSAL_KEY = "ranknest-youtube-newsletter-dismissed";

export default function YouTubeNewsletterPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const ref = new URLSearchParams(window.location.search).get("ref");
    if (ref?.toLowerCase() !== "youtube") return;

    try {
      if (window.sessionStorage.getItem(DISMISSAL_KEY) === "true") return;
    } catch {
      // The popup can still work when storage is unavailable.
    }

    setIsOpen(true);
  }, []);

  const dismiss = () => {
    try {
      window.sessionStorage.setItem(DISMISSAL_KEY, "true");
    } catch {
      // Dismissal remains valid for the current render when storage is unavailable.
    }
    setIsOpen(false);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const normalizedEmail = email.trim();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      setIsSuccess(false);
      setMessage("Please enter a valid email address.");
      return;
    }

    startTransition(async () => {
      const response = await subscribeToNewsletter({
        email: normalizedEmail,
        source: UTMSource.YOUTUBE,
        campaign: "youtube-product-page-popup",
      });

      setIsSuccess(response.success);
      setMessage(
        response.success
          ? "You are in. Watch your inbox for the next weekly picks."
          : response.message || "Something went wrong. Please try again.",
      );

      if (response.success) {
        try {
          window.sessionStorage.setItem(DISMISSAL_KEY, "true");
        } catch {
          // The success state still closes the popup when storage is unavailable.
        }
        setEmail("");
      }
    });
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/75 px-4 py-6 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="youtube-newsletter-title"
    >
      <div className="relative w-full max-w-lg border-4 border-slate-900 bg-[#FFFDF5] p-6 text-slate-900 shadow-[10px_10px_0px_0px_rgba(15,23,42,1)] sm:p-9">
        <button
          type="button"
          onClick={dismiss}
          aria-label="Close newsletter popup"
          className="absolute right-4 top-3 border-2 border-slate-900 bg-white px-3 py-1 font-mono text-lg font-black leading-none hover:bg-[#FFE7A2]"
        >
          x
        </button>

        <p className="font-mono text-[10px] font-black uppercase tracking-[0.3em] text-slate-600">
          From RankNest
        </p>
        <h2
          id="youtube-newsletter-title"
          className="mt-4 max-w-md font-anton text-4xl uppercase leading-none tracking-wide sm:text-5xl"
        >
          Better picks. Every week.
        </h2>
        <p className="mt-4 max-w-md text-sm leading-6 text-slate-700">
          Get useful deals, new reviews, and buying advice in one short weekly email.
        </p>

        {isSuccess ? (
          <div className="mt-7 border-2 border-slate-900 bg-[#93E9BE] p-4 text-sm font-bold leading-6">
            {message}
            <button
              type="button"
              onClick={dismiss}
              className="mt-4 block border-2 border-slate-900 bg-slate-900 px-4 py-2 font-mono text-[10px] font-black uppercase tracking-widest text-white hover:bg-slate-700"
            >
              Continue reading
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-7">
            <label
              htmlFor="youtube-newsletter-email"
              className="font-mono text-[10px] font-black uppercase tracking-widest"
            >
              Your email address
            </label>
            <div className="mt-2 flex flex-col gap-3 sm:flex-row">
              <input
                id="youtube-newsletter-email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                className="min-w-0 flex-1 border-2 border-slate-900 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#F59E0B]"
              />
              <button
                type="submit"
                disabled={isPending}
                className="border-2 border-slate-900 bg-[#FFE7A2] px-5 py-3 font-mono text-[10px] font-black uppercase tracking-widest shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] hover:bg-[#ffd86b] disabled:cursor-wait disabled:opacity-60"
              >
                {isPending ? "Joining..." : "Join free"}
              </button>
            </div>
            {message && <p className="mt-3 text-sm font-semibold text-red-700">{message}</p>}
            <p className="mt-4 text-xs leading-5 text-slate-500">
              No spam. Unsubscribe anytime, instantly.
            </p>
          </form>
        )}

        {!isSuccess && (
          <button
            type="button"
            onClick={dismiss}
            className="mt-5 font-mono text-[10px] font-black uppercase tracking-widest text-slate-500 underline underline-offset-4 hover:text-slate-900"
          >
            No thanks, I&apos;ll keep reading
          </button>
        )}
      </div>
    </div>
  );
}
