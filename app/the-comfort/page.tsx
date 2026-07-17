export default function TheComfortPage() {
  return (
    <main className="min-h-screen bg-[#FFFDF5] text-slate-900 selection:bg-slate-900 selection:text-[#FFFDF5]">
      <section className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-8 md:px-8 lg:px-10">
        <div className="border-4 border-slate-900 bg-slate-900 p-6 text-white shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] md:p-8">
          <h1 className="font-anton text-4xl uppercase leading-none tracking-[0.04em] sm:text-5xl lg:text-6xl">
            The Comfort
          </h1>
          <p className="mt-3 max-w-2xl font-sans text-sm leading-7 text-slate-300 sm:text-base">
            Comfort and layout ideas for people who want their home theater to feel as good as it looks.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <section className="border-4 border-slate-900 bg-white p-6 shadow-[6px_6px_0px_0px_rgba(15,23,42,1)]">
            <div className="relative overflow-hidden border-2 border-slate-900 bg-[#FFFDF5] p-4 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)]">
              <div className="absolute inset-y-0 left-0 w-1 bg-slate-900" />
              <div className="absolute left-0 top-1/2 h-5 w-5 -translate-y-1/2 rounded-full border-r-2 border-slate-900 bg-[#FFFDF5]" />
              <div className="absolute right-0 top-1/2 h-5 w-5 -translate-y-1/2 rounded-full border-l-2 border-slate-900 bg-[#FFFDF5]" />
              <div className="ml-3 mr-3">
                <div className="text-[10px] font-black uppercase tracking-[0.35em] text-slate-500">
                  COMING SOON
                </div>
                <h3 className="mt-2 font-anton text-xl uppercase leading-tight tracking-[0.04em] text-slate-900">
                  More comfort guides are on the way
                </h3>
                <p className="mt-2 font-sans text-sm leading-6 text-slate-700">
                  We will add more practical guides soon for seating layout, lounge setup, and room flow.
                </p>
                {/* Future ideas: recliner recommendations, sofa spacing, lamp warmth */}
              </div>
            </div>
          </section>

          <section className="border-4 border-slate-900 bg-[#FFE3E8] p-6 shadow-[6px_6px_0px_0px_rgba(15,23,42,1)]">
            <div className="relative overflow-hidden border-2 border-slate-900 bg-white p-4 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)]">
              <div className="absolute inset-y-0 left-0 w-1 bg-slate-900" />
              <div className="absolute left-0 top-1/2 h-5 w-5 -translate-y-1/2 rounded-full border-r-2 border-slate-900 bg-white" />
              <div className="absolute right-0 top-1/2 h-5 w-5 -translate-y-1/2 rounded-full border-l-2 border-slate-900 bg-white" />
              <div className="ml-3 mr-3">
                <div className="text-[10px] font-black uppercase tracking-[0.35em] text-slate-500">
                  COMING SOON
                </div>
                <h3 className="mt-2 font-anton text-xl uppercase leading-tight tracking-[0.04em] text-slate-900">
                  More comfort guides are on the way
                </h3>
                <p className="mt-2 font-sans text-sm leading-6 text-slate-700">
                  We will add more practical guides soon for seating layout, lounge setup, and room flow.
                </p>
              </div>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
