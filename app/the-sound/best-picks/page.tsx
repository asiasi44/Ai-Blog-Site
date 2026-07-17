import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Best Soundbar for Home Theater",
  description:
    "A cinematic, easy-to-scan guide for picking the best soundbar for home theater setups, from budget to premium picks.",
};

const quickFacts = [
  "Best for dialogue clarity",
  "Great for compact rooms",
  "Ideal for cinematic evenings",
];

const picks = [
  {
    category: "The heavyweight champion",
    title: "Samsung Q990D 11.1.4ch System",
    price: "Best cinema package",
    summary:
      "If you want a true cinematic experience that mimics a complicated wired theater setup without the messy construction work, this is the absolute pinnacle. Its physical side-firing and upward-firing drivers deliver immersive Dolby Atmos height tracking that feels deeply authentic.",
    tags: ["Immersive", "Dolby Atmos", "High-end"],
  },
  {
    category: "The architectural all-in-one",
    title: "Sonos Arc Ultra",
    price: "Best standalone elegance",
    summary:
      "A beautifully curved 46-inch bar that creates a breathtaking spatial audio experience from a single elegant unit. Dialogue clarity is sharpened by AI, making voices feel razor-sharp even in chaotic scenes.",
    tags: ["Minimalist", "Wireless", "Smart"],
  },
  {
    category: "The smart minimalist",
    title: "Bose Smart Dolby Atmos Soundbar",
    price: "Best compact design",
    summary:
      "Ideal for smaller rooms and apartments, this compact bar packs an impressive spatial punch with smart dialogue optimization and a low-profile form that fits effortlessly into modern setups.",
    tags: ["Compact", "A.I. Dialogue", "Apartment-ready"],
  },
  {
    category: "The spatial illusionist",
    title: "Sony BRAVIA Theater Bar 9",
    price: "Best tech innovation",
    summary:
      "For rooms where rear speakers are impractical, Sony creates the illusion of a massive soundstage using advanced virtual speaker mapping and object tracking that feels uncannily precise.",
    tags: ["Virtual surround", "Imax Enhanced", "Premium"],
  },
  {
    category: "The modern modular marvel",
    title: "JBL Bar 1300X",
    price: "Best modular flexibility",
    summary:
      "With detachable battery-powered rear speakers and a huge main bar, JBL offers a clean look that can shift from everyday TV sound to full movie-night mode in seconds.",
    tags: ["Modular", "Detachable rears", "Flexible"],
  },
];

const checklist = [
  {
    title: "Center channel clarity",
    body: "Dialogue should stay crisp even when explosions and music swell in the mix.",
  },
  {
    title: "Room size fit",
    body: "A compact room needs less power than a larger space with open walls and hard surfaces.",
  },
  {
    title: "Easy setup",
    body: "The best soundbar should feel like a guest star, not a plumbing project.",
  },
  {
    title: "HDMI eARC",
    body: "Always use HDMI eARC if possible so your soundbar can receive uncompressed Dolby Atmos tracks and reach its full cinematic potential.",
  },
];

export default function BestPicksPage() {
  return (
    <main className="min-h-screen bg-[#FFFDF5] text-slate-900 selection:bg-slate-900 selection:text-[#FFFDF5]">
      <section className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 md:px-8 lg:px-10">
        <div className="overflow-hidden border-4 border-slate-900 bg-slate-900 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)]">
          <div className="grid gap-0 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="p-6 text-white md:p-8">
              <div className="inline-flex border border-white/40 bg-white/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.35em] text-slate-100">
                The Sound / Best Picks
              </div>
              <h1 className="mt-4 font-anton text-4xl uppercase leading-none tracking-[0.04em] sm:text-5xl lg:text-6xl">
                Best Soundbar for Home Theater
              </h1>
              <p className="mt-4 max-w-2xl font-sans text-sm leading-7 text-slate-300 sm:text-base">
                If your movie nights deserve more than a flat TV speaker, this guide helps you pick a soundbar that feels cinematic, clear, and easy to live with.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {quickFacts.map((fact) => (
                  <span
                    key={fact}
                    className="border border-white/30 bg-white/10 px-3 py-1 font-mono text-[10px] font-black uppercase tracking-[0.3em] text-slate-100"
                  >
                    {fact}
                  </span>
                ))}
              </div>
              <div className="mt-6">
                <Link
                  href="/the-sound"
                  className="inline-flex border border-white/60 bg-white px-3 py-2 font-anton text-[11px] uppercase tracking-[0.2em] text-slate-900 transition-transform duration-200 hover:-translate-y-0.5"
                >
                  Back to the sound hub
                </Link>
              </div>
            </div>

            <div className="border-t-4 border-slate-900 bg-[#FFE7A2] p-4 md:p-6 lg:border-l-4 lg:border-t-0">
              <div className="relative overflow-hidden border-2 border-slate-900 bg-[#FFFDF5] shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.7),_transparent_60%)]" />
                <Image
                  src="/soundbar.avif"
                  alt="A stylized soundbar setup that feels cinematic and modern"
                  width={900}
                  height={900}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
          <article className="space-y-6">
            <section className="border-4 border-slate-900 bg-white p-6 shadow-[6px_6px_0px_0px_rgba(15,23,42,1)]">
              <h2 className="font-anton text-2xl uppercase tracking-[0.16em] text-slate-900">
                Why this matters
              </h2>
              <p className="mt-4 font-sans text-sm leading-7 text-slate-700 sm:text-[15px]">
                The ultimate home theater experience comes down to one absolute truth: a stunning 4K image is only as good as the sound that backs it up. Modern televisions are thinner than ever, which means their built-in speakers lack the physical depth to create meaningful cinema audio. If you want true theatrical immersion without tearing up your walls for a custom wired installation, a modern soundbar setup is the definitive way to go.
              </p>
              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                <div className="border border-slate-900 bg-[#FFFDF5] p-3">
                  <div className="font-mono text-[10px] font-black uppercase tracking-[0.35em] text-slate-500">
                    Scene
                  </div>
                  <p className="mt-2 font-sans text-sm text-slate-700">
                    Better dialogue in action scenes and quieter moments.
                  </p>
                </div>
                <div className="border border-slate-900 bg-[#FFFDF5] p-3">
                  <div className="font-mono text-[10px] font-black uppercase tracking-[0.35em] text-slate-500">
                    Mood
                  </div>
                  <p className="mt-2 font-sans text-sm text-slate-700">
                    More depth without turning the setup into a science project.
                  </p>
                </div>
                <div className="border border-slate-900 bg-[#FFFDF5] p-3">
                  <div className="font-mono text-[10px] font-black uppercase tracking-[0.35em] text-slate-500">
                    Fit
                  </div>
                  <p className="mt-2 font-sans text-sm text-slate-700">
                    A better match for your room, budget, and viewing distance.
                  </p>
                </div>
              </div>
            </section>

            <section className="border-4 border-slate-900 bg-[#FFFDF5] p-6 shadow-[6px_6px_0px_0px_rgba(15,23,42,1)]">
              <h2 className="font-anton text-2xl uppercase tracking-[0.16em] text-slate-900">
                Best picks by budget
              </h2>
              <div className="mt-5 grid gap-4">
                {picks.map((pick) => (
                  <div
                    key={pick.category}
                    className="border-2 border-slate-900 bg-white p-4 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)]"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <div className="font-mono text-[10px] font-black uppercase tracking-[0.35em] text-slate-500">
                          {pick.category}
                        </div>
                        <h3 className="mt-2 font-anton text-xl uppercase leading-tight tracking-[0.04em] text-slate-900">
                          {pick.title}
                        </h3>
                      </div>
                      <span className="border border-slate-900 bg-[#FFE7A2] px-3 py-1 font-mono text-[10px] font-black uppercase tracking-[0.3em] text-slate-900">
                        {pick.price}
                      </span>
                    </div>
                    <p className="mt-3 font-sans text-sm leading-7 text-slate-700">
                      {pick.summary}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {pick.tags.map((tag) => (
                        <span
                          key={tag}
                          className="border border-slate-900 px-2.5 py-1 font-mono text-[9px] font-black uppercase tracking-[0.3em] text-slate-600"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </article>

          <aside className="space-y-6">
            <section className="border-4 border-slate-900 bg-[#DDF3FF] p-6 shadow-[6px_6px_0px_0px_rgba(15,23,42,1)]">
              <h2 className="font-anton text-2xl uppercase tracking-[0.16em] text-slate-900">
                Quick scan
              </h2>
              <ol className="mt-4 space-y-3">
                <li className="border border-slate-900 bg-white p-3 font-sans text-sm text-slate-700">
                  <span className="mr-2 font-black uppercase tracking-[0.3em] text-slate-500">
                    01
                  </span>
                  Prioritize dialogue clarity first.
                </li>
                <li className="border border-slate-900 bg-white p-3 font-sans text-sm text-slate-700">
                  <span className="mr-2 font-black uppercase tracking-[0.3em] text-slate-500">
                    02
                  </span>
                  Match the soundbar to your room size.
                </li>
                <li className="border border-slate-900 bg-white p-3 font-sans text-sm text-slate-700">
                  <span className="mr-2 font-black uppercase tracking-[0.3em] text-slate-500">
                    03
                  </span>
                  Keep setup simple and future-proof.
                </li>
                <li className="border border-slate-900 bg-white p-3 font-sans text-sm text-slate-700">
                  <span className="mr-2 font-black uppercase tracking-[0.3em] text-slate-500">
                    04
                  </span>
                  Connection matters: use HDMI eARC for full Dolby Atmos support.
                </li>
              </ol>
            </section>

            <section className="border-4 border-slate-900 bg-[#FFE3E8] p-6 shadow-[6px_6px_0px_0px_rgba(15,23,42,1)]">
              <h2 className="font-anton text-2xl uppercase tracking-[0.16em] text-slate-900">
                What to look for
              </h2>
              <div className="mt-4 space-y-3">
                {checklist.map((item) => (
                  <div key={item.title} className="border border-slate-900 bg-white p-3">
                    <h3 className="font-anton text-lg uppercase tracking-[0.04em] text-slate-900">
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
