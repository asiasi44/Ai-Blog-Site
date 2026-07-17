import Link from "next/link";

const sections = [
  {
    title: "Use of the Site",
    body:
      "You may use this website for personal, non-commercial purposes and agree not to misuse, scrape, or interfere with the service or the experience of other visitors.",
  },
  {
    title: "Affiliate and Recommendation Disclosure",
    body:
      "Some of the products and services featured on this site may be affiliate links. If you choose to purchase through them, we may earn a commission at no additional cost to you.",
  },
  {
    title: "Content Accuracy",
    body:
      "We aim to provide accurate, helpful, and current information, but product availability, pricing, features, and recommendations can change over time. Please verify details before purchasing.",
  },
  {
    title: "Limitation of Liability",
    body:
      "We are not liable for any indirect, special, incidental, or consequential damages arising from your use of the site or reliance on any content presented here.",
  },
];

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#FFFDF5] text-slate-900 selection:bg-slate-900 selection:text-[#FFFDF5]">
      <section className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 md:px-8 lg:px-10">
        <div className="border-4 border-slate-900 bg-slate-900 p-6 text-white shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] md:p-8">
          <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-amber-300">
            Terms & Conditions
          </p>
          <h1 className="mt-3 font-anton text-4xl uppercase leading-none tracking-[0.04em] sm:text-5xl">
            Terms & Conditions
          </h1>
          <p className="mt-3 max-w-2xl font-sans text-sm leading-7 text-slate-300 sm:text-base">
            These terms guide how the site is used, how content is shared, and what you can expect from our recommendations and editorial experience.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <aside className="border-4 border-slate-900 bg-[#FFE7A2] p-6 shadow-[6px_6px_0px_0px_rgba(15,23,42,1)]">
            <h2 className="font-anton text-xl uppercase tracking-[0.16em] text-slate-900">
              Quick note
            </h2>
            <p className="mt-3 font-sans text-sm leading-7 text-slate-800">
              We aim to be transparent about our recommendations. If a product is linked through an affiliate partnership, that relationship is clearly disclosed in our content.
            </p>
            <div className="mt-6 border-t-2 border-slate-900 pt-4">
              <Link
                href="/privacy"
                className="inline-flex items-center border-2 border-slate-900 bg-white px-3 py-2 font-anton text-sm uppercase tracking-[0.2em] text-slate-900 transition-transform duration-200 hover:-translate-y-1"
              >
                Read Privacy Policy
              </Link>
            </div>
          </aside>

          <div className="space-y-4">
            {sections.map((section, index) => (
              <article
                key={section.title}
                className="group border-4 border-slate-900 bg-white p-5 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] transition-transform duration-200 hover:-translate-y-1"
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
