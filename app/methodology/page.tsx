const sections = [
  {
    title: "What we score",
    body: "We look at real product details, review patterns, and usefulness so people can compare offers without getting lost in marketing language.",
  },
  {
    title: "How we rank",
    body: "Our rankings help people focus on what matters most: value, trust, clarity, and overall fit for the use case.",
  },
  {
    title: "What we avoid",
    body: "We avoid hype, shallow summaries, and fake-looking consensus. The goal is a more honest and practical buying experience.",
  },
];

export default function MethodologyPage() {
  return (
    <main className="min-h-screen bg-[#FFFDF5] text-slate-900 selection:bg-slate-900 selection:text-[#FFFDF5]">
      <section className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 md:px-8 lg:px-10">
        <div className="border-4 border-slate-900 bg-slate-900 p-6 text-white shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] md:p-8">
          <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-amber-300">
            Methodology
          </p>
          <h1 className="mt-3 font-anton text-4xl uppercase leading-none tracking-[0.04em] sm:text-5xl">
            How we think about rankings
          </h1>
          <p className="mt-3 max-w-2xl font-sans text-sm leading-7 text-slate-300 sm:text-base">
            We keep the process simple: look at what matters, remove noise, and make the recommendation clearer for real people.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.75fr_1.25fr]">
          <aside className="border-4 border-slate-900 bg-[#FFE7A2] p-6 shadow-[6px_6px_0px_0px_rgba(15,23,42,1)]">
            <h2 className="font-anton text-xl uppercase tracking-[0.16em] text-slate-900">
              The idea
            </h2>
            <p className="mt-3 font-sans text-sm leading-7 text-slate-800">
              The best comparison page should feel calm, clear, and honest. That is what we are trying to build here.
            </p>
          </aside>

          <div className="space-y-4">
            {sections.map((section, index) => (
              <article
                key={section.title}
                className="border-4 border-slate-900 bg-white p-5 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]"
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center border-2 border-slate-900 bg-[#FFFDF5] font-anton text-sm uppercase tracking-[0.2em] text-slate-900">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="font-anton text-xl uppercase tracking-[0.12em] text-slate-900">
                      {section.title}
                    </h3>
                    <p className="mt-2 font-sans text-sm leading-7 text-slate-700">
                      {section.body}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
