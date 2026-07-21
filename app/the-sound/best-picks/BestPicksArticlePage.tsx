"use client";
import Image from "next/image";
import Link from "next/link";
import AffiliateLink from "@/components/AffiliateLink";

const article = {
  slug: "best-soundbar-for-home-theater",
  title: "Best Soundbar for Home Theater",
  description:
    "A cinematic, easy-to-scan guide for picking the best soundbar for home theater setups, from budget to premium picks.",
  heroLabel: "The Sound / Best Picks",
  intro:
    "The ideal home theater soundbar should make movies feel bigger, voices clearer, and the setup simpler. This guide cuts through the noise and helps you choose the right fit fast.",
  quickFacts: [
    "Best for dialogue clarity",
    "Great for compact rooms",
    "Ideal for cinematic evenings",
  ],
  picks: [
    {
      category: "The heavyweight champion",
      title: "Samsung Q990D 11.1.4ch System",
      price: "Best cinema package",
      summary:
        "The most complete theater-style setup here, with dense Atmos coverage and a genuinely cinematic sense of scale.",
      tags: ["Immersive", "Dolby Atmos", "High-end"],
      accent: "bg-[#FFF3D6]",
      bar: "bg-[#F2B64D]",
      productSlug:
        "samsung-q990d-1114ch-dolby-atmos-soundbar-system-B0CTKV9DRP",
      amazonHref: "https://amzn.to/4pnLPoE",
      image: "https://m.media-amazon.com/images/I/81SvovFzDjL._AC_SL1500_.jpg",
    },
    {
      category: "The architectural all-in-one",
      title: "Sonos Arc Ultra",
      price: "Best standalone elegance",
      summary:
        "Clean, polished, and easy to live with, with strong dialogue performance and a beautifully restrained footprint.",
      tags: ["Minimalist", "Wireless", "Smart"],
      accent: "bg-[#EAF4FF]",
      bar: "bg-[#5FA8FF]",
      productSlug: "sonos-arc-ultra-soundbar-with-dolby-atmos-B0DFK28LBB",
      amazonHref: "https://amzn.to/4psQGFi",
      image: "https://m.media-amazon.com/images/I/81x7GSoUZnL._AC_SL1500_.jpg",
    },
    {
      category: "The smart minimalist",
      title: "Bose Smart Dolby Atmos Soundbar",
      price: "Best compact design",
      summary:
        "A more compact choice that still feels rich and spacious, especially for apartments and smaller viewing rooms.",
      tags: ["Compact", "A.I. Dialogue", "Apartment-ready"],
      accent: "bg-[#FEEEF2]",
      bar: "bg-[#F08FA7]",
      productSlug: "bose-smart-ultra-dolby-atmos-soundbar-B0C548MYF3",
      amazonHref: "https://amzn.to/4w9cW9w",
      image: "https://m.media-amazon.com/images/I/61Xt4sFgwdL._AC_SL1500_.jpg",
    },
    {
      category: "The spatial illusionist",
      title: "Sony BRAVIA Theater Bar 9",
      price: "Best tech innovation",
      summary:
        "A clever virtual-surround approach that makes a wide soundstage feel surprisingly immersive without extra speakers.",
      tags: ["Virtual surround", "IMAX Enhanced", "Premium"],
      accent: "bg-[#EEF8EA]",
      bar: "bg-[#7DBB62]",
      productSlug: "sony-bravia-theater-system-6-51ch-soundbar-B0DYWTWN8R",
      amazonHref: "https://amzn.to/4fp6cNQ",
      image: "https://m.media-amazon.com/images/I/71E8u0yLgjL._AC_SL1500_.jpg",
    },
    {
      category: "The modern modular marvel",
      title: "JBL Bar 1300X",
      price: "Best modular flexibility",
      summary:
        "A flexible, modern setup that can shift from everyday TV listening to bigger movie-night energy when you want it.",
      tags: ["Modular", "Detachable rears", "Flexible"],
      accent: "bg-[#F3EEFF]",
      bar: "bg-[#9B84FF]",
      productSlug: "jbl-bar-1300xmk2-soundbar-system-B0FN1JLNCN",
      amazonHref: "https://amzn.to/4vx5Zhv",
      image: "https://m.media-amazon.com/images/I/61z6BL5eRHL._AC_SL1500_.jpg",
    },
  ],
  checklist: [
    {
      title: "Dialogue clarity",
      body: "If you watch a lot of movies, this matters more than raw volume.",
    },
    {
      title: "Room fit",
      body: "A compact room needs a different shape of power than a larger open room.",
    },
    {
      title: "Simple setup",
      body: "The best soundbar should feel effortless, not like a weekend project.",
    },
  ],
};

export default function BestPicksArticlePage() {
  return (
    <main className="min-h-screen bg-[#FFFDF5] text-slate-900 selection:bg-slate-900 selection:text-[#FFFDF5]">
      <section className="mx-auto flex max-w-6xl flex-col gap-5 px-4 py-8 md:px-8 lg:px-10">
        <div className="overflow-hidden border-[3px] border-slate-900 bg-slate-900 shadow-[6px_6px_0px_0px_rgba(15,23,42,1)]">
          <div className="grid gap-0 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="p-6 text-white md:p-8 lg:p-10">
              <div className="inline-flex border border-white/40 bg-white/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.35em] text-slate-100">
                {article.heroLabel}
              </div>
              <h1 className="mt-4 font-anton text-4xl uppercase leading-none tracking-[0.04em] sm:text-5xl lg:text-6xl">
                {article.title}
              </h1>
              <p className="mt-4 max-w-2xl font-sans text-sm leading-7 text-slate-300 sm:text-base">
                {article.intro}
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {article.quickFacts.map((fact) => (
                  <span
                    key={fact}
                    className="border border-white/30 bg-white/10 px-3 py-1 font-mono text-[10px] font-black uppercase tracking-[0.3em] text-slate-100"
                  >
                    {fact}
                  </span>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Link
                  href="/the-sound"
                  className="inline-flex border border-white/60 bg-white px-3 py-2 font-anton text-[11px] uppercase tracking-[0.2em] text-slate-900 transition-transform duration-200 hover:-translate-y-0.5"
                >
                  Back to the sound hub
                </Link>
              </div>
            </div>

            <div className="border-t-[3px] border-slate-900 bg-[#F0E6C2] p-3 md:p-5 lg:border-l-[3px] lg:border-t-0">
              <div className="relative overflow-hidden border-[3px] border-slate-900 bg-[#FFFDF5] shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.7),_transparent_60%)]" />
                <Image
                  src="/images/bestpicks/home-theater-soundbar.png"
                  alt="A stylized soundbar setup that feels cinematic and modern"
                  width={900}
                  height={900}
                  className="h-full w-full object-fit"
                />
              </div>
            </div>
          </div>
        </div>
        <section className="border-[3px] border-slate-900 bg-white p-5 shadow-[5px_5px_0px_0px_rgba(15,23,42,1)] md:p-6">
          <div className="flex flex-wrap items-end justify-between gap-3 border-b border-slate-900 pb-4">
            <div>
              <p className="font-mono text-[10px] font-black uppercase tracking-[0.35em] text-slate-500">
                Watch
              </p>
              <h2 className="mt-1 font-anton text-2xl uppercase tracking-[0.16em] text-slate-900">
                The Full Breakdown
              </h2>
            </div>
          </div>
          <div className="mt-5 overflow-hidden border border-slate-900">
            <div
              className="relative w-full"
              style={{ paddingBottom: "56.25%" }}
            >
              <iframe
                className="absolute inset-0 h-full w-full"
                src="https://www.youtube.com/embed/W82tH7bIkdU?start=20"
                title="Best Soundbar for Home Theater — Full Breakdown"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </section>
        <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
          <section className="border-[3px] border-slate-900 bg-white p-5 shadow-[5px_5px_0px_0px_rgba(15,23,42,1)] md:p-6">
            <div className="flex flex-wrap items-end justify-between gap-3 border-b border-slate-900 pb-4">
              <div>
                <p className="font-mono text-[10px] font-black uppercase tracking-[0.35em] text-slate-500">
                  Shortlist
                </p>
                <h2 className="mt-1 font-anton text-2xl uppercase tracking-[0.16em] text-slate-900">
                  The strongest fits
                </h2>
              </div>
              <div className="border border-slate-900 bg-[#FFE7A2] px-3 py-1 font-mono text-[10px] font-black uppercase tracking-[0.3em] text-slate-900">
                Pick by room
              </div>
            </div>

            <div className="mt-5 space-y-3">
              {article.picks.map((pick) => (
                <div
                  key={pick.category}
                  className={`overflow-hidden border border-slate-900 ${pick.accent}`}
                >
                  <div className={`h-1.5 w-full ${pick.bar}`} />
                  <div className="grid gap-4 p-4 md:grid-cols-[1fr_140px]">
                    <div>
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div className="min-w-0">
                          <div className="font-mono text-[10px] font-black uppercase tracking-[0.35em] text-slate-500">
                            {pick.category}
                          </div>
                          <h3 className="mt-2 font-anton text-xl uppercase leading-[0.95] tracking-[0.06em] text-slate-900 sm:text-2xl">
                            {pick.title}
                          </h3>
                        </div>
                        <span className="shrink-0 border border-slate-900 bg-white px-3 py-1 font-mono text-[10px] font-black uppercase tracking-[0.3em] text-slate-900">
                          {pick.price}
                        </span>
                      </div>
                      <p className="mt-3 font-sans text-sm leading-6 text-slate-700">
                        {pick.summary}
                      </p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {pick.tags.map((tag) => (
                          <span
                            key={tag}
                            className="border border-slate-900 bg-white px-2.5 py-1 font-mono text-[9px] font-black uppercase tracking-[0.3em] text-slate-600"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="mt-4 flex flex-wrap gap-2">
                        <AffiliateLink
                          href={pick.amazonHref || "#"}
                          variant="button"
                          className="px-3 py-2 text-[11px] font-anton uppercase tracking-[0.2em]"
                          disclosure="compact"
                        >
                          Amazon
                        </AffiliateLink>
                        <Link
                          href={`/product/${pick.productSlug}`}
                          className="inline-flex items-center border border-slate-900 bg-white px-3 py-2 font-anton text-[11px] uppercase tracking-[0.2em] text-slate-900 transition-transform duration-200 hover:-translate-y-0.5"
                        >
                          More details
                        </Link>
                      </div>
                    </div>

                    <div className="flex items-start justify-end md:justify-center">
                      <div className="relative h-28 w-full overflow-hidden border border-slate-900 bg-white md:h-32 md:w-32">
                        <Image
                          src={pick.image}
                          alt={pick.title}
                          width={128}
                          height={128}
                          className="h-full w-full object-contain"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <aside className="space-y-4 lg:sticky lg:top-24 self-start">
            <section className="border-[3px] border-slate-900 bg-[#DDF3FF] p-5 shadow-[5px_5px_0px_0px_rgba(15,23,42,1)]">
              <h2 className="font-anton text-xl uppercase tracking-[0.16em] text-slate-900">
                What matters most
              </h2>
              <div className="mt-4 space-y-2">
                {article.checklist.map((item) => (
                  <div
                    key={item.title}
                    className="border border-slate-900 bg-white p-3"
                  >
                    <h3 className="font-anton text-sm uppercase tracking-[0.14em] text-slate-900">
                      {item.title}
                    </h3>
                    <p className="mt-2 font-sans text-sm leading-6 text-slate-700">
                      {item.body}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </aside>
        </div>
      </section>
    </main>
  );
}
