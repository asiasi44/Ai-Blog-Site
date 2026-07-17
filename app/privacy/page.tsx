import Link from "next/link";

const sections = [
  {
    title: "Information We Collect",
    body:
      "We collect the information you share with us directly, such as your email address when you subscribe, plus technical details that help us improve our site experience, including browser type, device information, and interaction data.",
  },
  {
    title: "How We Use Your Information",
    body:
      "Your information helps us deliver the content you requested, send email updates when you opt in, understand how visitors use our site, and improve our product recommendations and editorial experience.",
  },
  {
    title: "Cookies and Analytics",
    body:
      "We use cookies and analytics tools to understand traffic patterns, improve site performance, and personalize your experience. You can manage or disable cookies through your browser settings.",
  },
  {
    title: "Your Choices",
    body:
      "You can unsubscribe from email communications at any time, request access to your personal data, or ask that we delete it where applicable by contacting us through the site.",
  },
];

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-[#FFFDF5] text-slate-900 selection:bg-slate-900 selection:text-[#FFFDF5]">
      <section className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 md:px-8 lg:px-10">
        <div className="border-4 border-slate-900 bg-slate-900 p-6 text-white shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] md:p-8">
          <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-amber-300">
            Privacy Policy
          </p>
          <h1 className="mt-3 font-anton text-4xl uppercase leading-none tracking-[0.04em] sm:text-5xl">
            Privacy Policy
          </h1>
          <p className="mt-3 max-w-2xl font-sans text-sm leading-7 text-slate-300 sm:text-base">
            We believe simple, transparent policies belong in the same world as great home theater design: clear, practical, and easy to understand.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <aside className="border-4 border-slate-900 bg-[#FFE7A2] p-6 shadow-[6px_6px_0px_0px_rgba(15,23,42,1)]">
            <h2 className="font-anton text-xl uppercase tracking-[0.16em] text-slate-900">
              What this means
            </h2>
            <p className="mt-3 font-sans text-sm leading-7 text-slate-800">
              We respect your privacy and aim to keep this page as straightforward as our product recommendations. The key idea is simple: you stay in control of your data.
            </p>
            <div className="mt-6 border-t-2 border-slate-900 pt-4">
              <Link
                href="/terms"
                className="inline-flex items-center border-2 border-slate-900 bg-white px-3 py-2 font-anton text-sm uppercase tracking-[0.2em] text-slate-900 transition-transform duration-200 hover:-translate-y-1"
              >
                Read Terms & Conditions
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
