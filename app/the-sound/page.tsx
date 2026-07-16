const BEST_PRODUCTS = [
  {
    id: '01',
    title: 'Best Soundbar for Home Theater',
    summary: 'A clean roundup for people who want immersive sound without overcomplicating the setup.',
    href: '/the-sound/guide-1',
  },
  {
    id: '02',
    title: 'Best Soundbar Under $300',
    summary: 'Balanced picks for smaller rooms, tighter budgets, and clearer dialogue.',
    href: '/the-sound/guide-2',
  },
  {
    id: '03',
    title: 'Best Soundbar for Dialogue',
    summary: 'A focused list for viewers who care most about speech clarity and center channel performance.',
    href: '/the-sound/guide-3',
  },
];

const GUIDES = [
  {
    id: 'A',
    title: 'How to Place a Soundbar for Better Surround Sound',
    summary: 'Simple positioning rules that make a big difference once the room is in play.',
    href: '/the-sound/guide-1',
  },
  {
    id: 'B',
    title: 'How to Improve Soundbar Dialogue Clarity',
    summary: 'A practical guide for making voices feel more direct and less buried.',
    href: '/the-sound/guide-2',
  },
  {
    id: 'C',
    title: 'What to Know Before Buying a Soundbar',
    summary: 'A more useful comparison guide for people deciding between setup styles and budgets.',
    href: '/the-sound/guide-3',
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
            Product roundups and setup guides for people building a better home theater experience.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <section className="border-4 border-slate-900 bg-white p-6 shadow-[6px_6px_0px_0px_rgba(15,23,42,1)]">
            <h2 className="font-anton text-2xl uppercase tracking-[0.16em] text-slate-900">
              Best Sound Picks
            </h2>
            <div className="mt-5 space-y-4">
              {BEST_PRODUCTS.map((post) => (
                <a
                  key={post.id}
                  href={post.href}
                  className="group relative block overflow-hidden border-2 border-slate-900 bg-[#FFFDF5] p-4 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[5px_5px_0px_0px_rgba(15,23,42,1)]"
                >
                  <div className="absolute inset-y-0 left-0 w-1 bg-slate-900 transition-all duration-200 group-hover:w-2" />
                  <div className="ml-3">
                    <div className="text-[10px] font-black uppercase tracking-[0.35em] text-slate-500">
                      {post.id}
                    </div>
                    <h3 className="mt-2 font-anton text-xl uppercase leading-tight tracking-[0.04em] text-slate-900">
                      {post.title}
                    </h3>
                    <p className="mt-2 font-sans text-sm leading-6 text-slate-700">
                      {post.summary}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </section>

          <section className="border-4 border-slate-900 bg-[#FFE7A2] p-6 shadow-[6px_6px_0px_0px_rgba(15,23,42,1)]">
            <h2 className="font-anton text-2xl uppercase tracking-[0.16em] text-slate-900">
              Setup Guides
            </h2>
            <div className="mt-5 space-y-4">
              {GUIDES.map((guide) => (
                <a
                  key={guide.id}
                  href={guide.href}
                  className="group relative block overflow-hidden border-2 border-slate-900 bg-white p-4 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[5px_5px_0px_0px_rgba(15,23,42,1)]"
                >
                  <div className="absolute inset-y-0 left-0 w-1 bg-slate-900 transition-all duration-200 group-hover:w-2" />
                  <div className="ml-3">
                    <div className="text-[10px] font-black uppercase tracking-[0.35em] text-slate-500">
                      {guide.id}
                    </div>
                    <h3 className="mt-2 font-anton text-xl uppercase leading-tight tracking-[0.04em] text-slate-900">
                      {guide.title}
                    </h3>
                    <p className="mt-2 font-sans text-sm leading-6 text-slate-700">
                      {guide.summary}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}