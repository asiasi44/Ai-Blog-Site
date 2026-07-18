import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "The Sound | RankNest",
  description:
    "Explore RankNes's sound and home theater guides, including expert picks for the best soundbar for your room and setup.",
  alternates: {
    canonical: "/the-sound",
  },
  openGraph: {
    title: "The Sound | RankNest",
    description:
      "Discover soundbar roundups and home theater guides that help you choose a better setup with less confusion.",
    url: "https://ranknest.tech/the-sound",
    type: "website",
  },
};

const BEST_PRODUCTS = [
  {
    title: "Best Soundbar for Home Theater",
    summary:
      "A clean roundup for people who want immersive sound without overcomplicating the setup.",
    href: "/the-sound/guide-1",
    priceLabel: "FREE ENTRY",
    image: "/soundbar.avif",
    imageAlt: "Soundbar featured in the home theater roundup",
  },
];

const GUIDES = [
  {
    id: "A",
    title: "How to Place a Soundbar for Better Surround Sound",
    summary:
      "Simple positioning rules that make a big difference once the room is in play.",
    status: "Coming soon",
  },
  {
    id: "B",
    title: "How to Improve Soundbar Dialogue Clarity",
    summary:
      "A practical guide for making voices feel more direct and less buried.",
    status: "Coming soon",
  },
  {
    id: "C",
    title: "What to Know Before Buying a Soundbar",
    summary:
      "A more useful comparison guide for people deciding between setup styles and budgets.",
    status: "Coming soon",
  },
];

export default function TheSoundPage() {
  return (
    <main className="min-h-screen bg-[#FFFDF5] text-slate-900 selection:bg-slate-900 selection:text-[#FFFDF5]">
      <section className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-8 md:px-8 lg:px-10">
        <div className="border-4 border-slate-900 bg-slate-900 p-6 text-white shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] md:p-8">
          <h1 className="font-anton text-4xl uppercase leading-none tracking-[0.04em] sm:text-5xl lg:text-6xl">
            The Sound
          </h1>
          <p className="mt-3 max-w-2xl font-sans text-sm leading-7 text-slate-300 sm:text-base">
            Product roundups and setup guides for people building a better home
            theater experience.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <section className="border-4 border-slate-900 bg-white p-6 shadow-[6px_6px_0px_0px_rgba(15,23,42,1)]">
            <h2 className="font-anton text-2xl uppercase tracking-[0.16em] text-slate-900">
              Best Sound Picks
            </h2>
            <div className="mt-5">
              {BEST_PRODUCTS.map((post) => (
                <Link
                  key={post.title}
                  href="/the-sound/best-picks/best-soundbar-for-home-theater"
                  className="group relative block overflow-hidden border-2 border-slate-900 bg-[#FFFDF5] p-4 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[5px_5px_0px_0px_rgba(15,23,42,1)]"
                >
                  <div className="absolute inset-y-0 left-0 w-1 bg-slate-900 transition-all duration-200 group-hover:w-2" />
                  <div className="absolute left-0 top-1/2 h-5 w-5 -translate-y-1/2 rounded-full border-r-2 border-slate-900 bg-[#FFFDF5]" />
                  <div className="absolute right-0 top-1/2 h-5 w-5 -translate-y-1/2 rounded-full border-l-2 border-slate-900 bg-[#FFFDF5]" />
                  <div className="ml-3 mr-3 flex flex-col gap-3">
                    <div className="flex items-start gap-3">
                      <div className="h-14 w-14 shrink-0 overflow-hidden border-2 border-slate-900 bg-[#FFE7A2]">
                        <Image
                          src={post.image}
                          alt={post.imageAlt}
                          width={56}
                          height={56}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-anton text-xl uppercase leading-tight tracking-[0.04em] text-slate-900">
                          {post.title}
                        </h3>
                        <p className="mt-2 font-sans text-sm leading-6 text-slate-700">
                          {post.summary}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between border-t border-dashed border-slate-900 pt-3">
                      <span className="font-mono text-[10px] font-black uppercase tracking-[0.3em] text-slate-600">
                        {post.priceLabel}
                      </span>
                      <span className="font-anton text-[11px] uppercase tracking-[0.2em] text-slate-900 transition-transform duration-200 group-hover:-translate-y-0.5">
                        Open
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          <section className="border-4 border-slate-900 bg-[#FFE7A2] p-6 shadow-[6px_6px_0px_0px_rgba(15,23,42,1)]">
            <h2 className="font-anton text-2xl uppercase tracking-[0.16em] text-slate-900">
              Setup Guides
            </h2>
            <div className="mt-5">
              <div className="relative overflow-hidden border-2 border-slate-900 bg-white p-4 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)]">
                <div className="absolute inset-y-0 left-0 w-1 bg-slate-900" />
                <div className="absolute left-0 top-1/2 h-5 w-5 -translate-y-1/2 rounded-full border-r-2 border-slate-900 bg-white" />
                <div className="absolute right-0 top-1/2 h-5 w-5 -translate-y-1/2 rounded-full border-l-2 border-slate-900 bg-white" />
                <div className="ml-3 mr-3">
                  <div className="text-[10px] font-black uppercase tracking-[0.35em] text-slate-500">
                    COMING SOON
                  </div>
                  <h3 className="mt-2 font-anton text-xl uppercase leading-tight tracking-[0.04em] text-slate-900">
                    More setup guides are on the way
                  </h3>
                  <p className="mt-2 font-sans text-sm leading-6 text-slate-700">
                    We will add more practical guides soon for placement,
                    calibration, and room setup.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
