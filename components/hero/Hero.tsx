import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative w-full h-[80vh] min-h-[580px] flex flex-col md:flex-row border-b-4 border-slate-900 bg-slate-900 overflow-hidden">
      {/* COLUMN 1: THE PICTURE */}
      <Link
        href="/the-picture"
        className="relative flex-1 flex flex-col items-center justify-center p-6 text-center group bg-cyan-400 border-b-4 md:border-b-0 md:border-r-4 border-slate-900 transition-all duration-500 ease-out md:hover:flex-[1.6] cursor-pointer overflow-hidden text-slate-900"
      >
        <div className="absolute inset-0 opacity-0 group-hover:opacity-15 transition-opacity duration-300 bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:1.5rem_1.5rem]" />
        <span className="z-10 font-mono text-xs font-black uppercase tracking-widest bg-white border-2 border-slate-900 px-3 py-1 rounded-full shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]">
        01
        </span>

        {/* Retro Image Frame Container */}
        <div className="relative w-40 h-40 my-4 bg-white border-4 border-slate-900 rounded-xl shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] overflow-hidden transform transition-all duration-500 ease-out group-hover:scale-105 group-hover:-translate-y-2 group-hover:shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] group-hover:rotate-2">
          <img src="/lens.jpg" alt="The Picture" className="w-full h-full object-cover" />
        </div>

        <h2 className="z-10 font-anton text-4xl uppercase tracking-tight mb-2 transform group-hover:scale-105 transition-all duration-300">
          The Picture
        </h2>
        <p className="z-10 font-sans font-bold max-w-xs text-xs md:opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 text-slate-800">
          Projectors, screen math, and fighting ambient light washout.
        </p>
        <div className="absolute -bottom-20 group-hover:bottom-4 transition-all duration-500 cubic-bezier(0.175, 0.885, 0.32, 1.275) hidden md:block z-10">
          <span className="bg-white border-2 border-slate-900 px-4 py-2 font-anton text-xs uppercase tracking-wider shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]">
            CHECKOUT
          </span>
        </div>
      </Link>

      {/* COLUMN 2: THE SOUND */}
      <Link
        href="/the-sound"
        className="relative flex-1 flex flex-col items-center justify-center p-6 text-center group bg-amber-400 border-b-4 md:border-b-0 md:border-r-4 border-slate-900 transition-all duration-500 ease-out md:hover:flex-[1.6] cursor-pointer overflow-hidden text-slate-900"
      >
        <div className="absolute inset-0 opacity-0 group-hover:opacity-15 transition-opacity duration-300 bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:1.5rem_1.5rem]" />
        <span className="z-10 font-mono text-xs font-black uppercase tracking-widest bg-white border-2 border-slate-900 px-3 py-1 rounded-full shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]">
        02
        </span>

        <div className="relative w-40 h-40 my-4 bg-white border-4 border-slate-900 rounded-xl shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] overflow-hidden transform transition-all duration-500 ease-out group-hover:scale-105 group-hover:-translate-y-2 group-hover:shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] group-hover:-rotate-2">
          <img src="/sound.avif" alt="The Sound" className="w-full h-full object-cover" />
        </div>

        <h2 className="z-10 font-anton text-4xl uppercase tracking-tight mb-2 transform group-hover:scale-105 transition-all duration-300">
          The Sound
        </h2>
        <p className="z-10 font-sans font-bold max-w-xs text-xs md:opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 text-slate-800">
          Razor-sharp dialogue, speaker placement, and clean bass setup.
        </p>
        <div className="absolute -bottom-20 group-hover:bottom-4 transition-all duration-500 cubic-bezier(0.175, 0.885, 0.32, 1.275) hidden md:block z-10">
          <span className="bg-white border-2 border-slate-900 px-4 py-2 font-anton text-xs uppercase tracking-wider shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]">
            CHECKOUT
          </span>
        </div>
      </Link>

      {/* COLUMN 3: THE COMFORT */}
      <Link
        href="/the-comfort"
        className="relative flex-1 flex flex-col items-center justify-center p-6 text-center group bg-rose-400 border-slate-900 transition-all duration-500 ease-out md:hover:flex-[1.6] cursor-pointer overflow-hidden text-slate-900"
      >
        <div className="absolute inset-0 opacity-0 group-hover:opacity-15 transition-opacity duration-300 bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:1.5rem_1.5rem]" />
        <span className="z-10 font-mono text-xs font-black uppercase tracking-widest bg-white border-2 border-slate-900 px-3 py-1 rounded-full shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]">
        03
        </span>

        <div className="relative w-40 h-40 my-4 bg-white border-4 border-slate-900 rounded-xl shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] overflow-hidden transform transition-all duration-500 ease-out group-hover:scale-105 group-hover:-translate-y-2 group-hover:shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] group-hover:rotate-1">
          <img src="/sofa.avif" alt="The Comfort" className="w-full h-full object-cover" />
        </div>

        <h2 className="z-10 font-anton text-4xl uppercase tracking-tight mb-2 transform group-hover:scale-105 transition-all duration-300">
          The Comfort
        </h2>
        <p className="z-10 font-sans font-bold max-w-xs text-xs md:opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 text-slate-800">
          Seating distance physics, room blackouts, and acoustic panels.
        </p>
        <div className="absolute -bottom-20 group-hover:bottom-4 transition-all duration-500 cubic-bezier(0.175, 0.885, 0.32, 1.275) hidden md:block z-10">
          <span className="bg-white border-2 border-slate-900 px-4 py-2 font-anton text-xs uppercase tracking-wider shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]">
            CHECKOUT
          </span>
        </div>
      </Link>
    </section>
  );
}
