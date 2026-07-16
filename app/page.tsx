import Hero from "@/components/hero/Hero";

export default function HomePage() {
  return (
    <>
      <Hero />
      <div className="max-w-3xl mx-auto text-center px-4 pt-16 pb-20">
        <span className="font-caveat text-3xl text-rose-500 font-bold block -rotate-2 mb-2">
          Pick your destination above...
        </span>
        <p className="font-sans text-lg text-slate-600 font-medium">
          A high-end theater is a delicate balance. Hover and jump straight into
          our deep technical data logs mapped clearly for human spaces.
        </p>
      </div>
    </>
  );
}
