import Image from "next/image";
import Link from "next/link";

type ProductIdentity = {
  name: string;
  title: string;
  brand?: string;
  category?: string;
  categorySlug: string;
  asin: string;
  affiliateUrl: string;
};

export default function BlogAnalysisComponent({
  blogAnalysis,
  generatedArticle,
  product,
}: {
  blogAnalysis: any;
  generatedArticle: any;
  product: ProductIdentity;
}) {
  const articleData = generatedArticle?.articleData;
  const productMeta = generatedArticle?.productMeta;
  const rating = Number(blogAnalysis.overall_rating ?? 0);
  const reviewCount = Number(blogAnalysis.reviewCount ?? 0);
  const specs = productMeta?.specs?.length ? productMeta.specs : blogAnalysis.specifications;
  const pros = productMeta?.pros ?? [];
  const cons = productMeta?.cons ?? [];
  const sections = articleData?.sections ?? [];
  const faqs = articleData?.faqs ?? [];

  return (
    <main className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 md:px-8">
      <header className="grid overflow-hidden border-4 border-slate-900 bg-slate-900 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] lg:grid-cols-[1.1fr_0.9fr]">
        <div className="p-6 text-white md:p-10">
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#FFE7A2]">
            {product.brand ? (
              <Link href={`/category/${product.categorySlug}?brand=${encodeURIComponent(product.brand)}`} className="underline underline-offset-4 hover:text-white">
                {product.brand}
              </Link>
            ) : (
              "Product analysis"
            )} / {product.category ? (
              <Link href={`/category/${product.categorySlug}`} className="underline underline-offset-4 hover:text-white">
                {product.category}
              </Link>
            ) : (
              "Review"
            )}
          </div>
          <h1 className="mt-4 font-anton text-4xl uppercase leading-tight tracking-wide sm:text-5xl">
            {product.title}
          </h1>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span className="border border-white/40 bg-white/10 px-3 py-2 font-mono text-xs uppercase tracking-widest">
              ★ {rating.toFixed(2)} / 5
            </span>
            <span className="font-mono text-xs uppercase tracking-widest text-slate-300">
              {reviewCount.toLocaleString()} customer reviews
            </span>
          </div>
          <p className="mt-8 max-w-2xl text-base leading-7 text-slate-200">
            {articleData?.summaryVerdict || blogAnalysis.introduction || blogAnalysis.final_verdict}
          </p>
        </div>
        <div className="border-t-4 border-slate-900 bg-[#FFE7A2] p-4 lg:border-l-4 lg:border-t-0">
          <div className="relative aspect-square overflow-hidden border-2 border-slate-900 bg-white shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]">
            {blogAnalysis.image ? (
              <Image src={blogAnalysis.image} alt={product.name} fill unoptimized className="object-contain p-4" />
            ) : (
              <div className="flex h-full items-center justify-center p-8 text-center font-anton text-2xl uppercase">Image unavailable</div>
            )}
          </div>
          <Link href={product.affiliateUrl} target="_blank" className="mt-4 block border-2 border-slate-900 bg-[#93E9BE] px-4 py-3 text-center font-anton text-sm uppercase tracking-widest shadow-[3px_3px_0px_0px_rgba(15,23,42,1)]">
            Check Current Price on Amazon ↗
          </Link>
        </div>
      </header>

      <section className="border-4 border-slate-900 bg-[#FFE7A2] p-6 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)]">
        <span className="border-2 border-slate-900 bg-slate-900 px-3 py-1 font-mono text-xs font-black uppercase tracking-widest text-white">
          {productMeta?.badge || "Customer analysis"}
        </span>
        <h2 className="mt-3 font-anton text-3xl uppercase tracking-wide">{product.name}</h2>
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {specs?.slice(0, 8).map((spec: { label?: string; name?: string; value: string }, index: number) => (
            <div key={index} className="border-2 border-slate-900 bg-white p-3 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]">
              <span className="block font-mono text-[10px] font-black uppercase text-slate-500">{spec.label || spec.name}</span>
              <span className="text-xs font-bold">{spec.value}</span>
            </div>
          ))}
        </div>
        {!generatedArticle && blogAnalysis.features?.length > 0 && (
          <div className="mt-6 border-2 border-slate-900 bg-white p-4 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]">
            <h3 className="border-b-2 border-slate-900 pb-2 font-anton text-xl uppercase tracking-wide">Feature ratings</h3>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {blogAnalysis.features.map((feature: { name?: string; rating?: number; verdict?: string }, index: number) => (
                <div key={index} className="border-b border-slate-300 py-2 text-sm">
                  <div className="flex items-center justify-between gap-3">
                    <span>{feature.name || "Feature"}</span>
                    <span className="font-bold">
                      {feature.rating == null ? "Not available" : Number(feature.rating).toFixed(2)}
                    </span>
                  </div>
                  {feature.verdict && <p className="mt-1 text-xs leading-5 text-slate-600">{feature.verdict}</p>}
                </div>
              ))}
            </div>
          </div>
        )}
        {(pros.length > 0 || cons.length > 0) && (
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <List title="What We Liked" items={pros} tone="bg-[#D3F9D8]" marker="+" />
            <List title="What Needs Work" items={cons} tone="bg-[#FFD8D8]" marker="-" />
          </div>
        )}
      </section>

      {(sections.length > 0 || faqs.length > 0) && (
        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <article className="space-y-6">
            {sections.map((section: { h2Title: string; contentMarkdown: string }, index: number) => (
              <section key={index} className="border-4 border-slate-900 bg-white p-6 shadow-[6px_6px_0px_0px_rgba(15,23,42,1)]">
                <h2 className="border-b-2 border-slate-900 pb-3 font-anton text-2xl uppercase tracking-widest">{section.h2Title}</h2>
                <div className="mt-4 space-y-4 text-sm leading-7 text-slate-700">
                  {section.contentMarkdown.split(/\n\s*\n/).map((paragraph: string, paragraphIndex: number) => (
                    <p key={paragraphIndex}>{paragraph.replace(/^>\s?/, "")}</p>
                  ))}
                </div>
              </section>
            ))}
          </article>
          {faqs.length > 0 && (
            <aside className="h-fit border-4 border-slate-900 bg-white p-6 shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] lg:sticky lg:top-6">
              <h2 className="font-anton text-2xl uppercase tracking-widest">FAQ</h2>
              <div className="mt-4 space-y-5">
                {faqs.map((faq: { question: string; answer: string }, index: number) => (
                  <div key={index} className="border-t-2 border-slate-900 pt-4">
                    <h3 className="font-bold">{faq.question}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </aside>
          )}
        </div>
      )}
    </main>
  );
}

function List({ title, items, tone, marker }: { title: string; items: string[]; tone: string; marker: string }) {
  return (
    <div className={`${tone} border-2 border-slate-900 p-4 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]`}>
      <h3 className="border-b-2 border-slate-900 pb-2 font-anton text-base uppercase">{title}</h3>
      <ul className="mt-3 space-y-2 text-xs font-medium">
        {items.map((item, index) => (
          <li key={index} className="flex gap-2"><span>{marker}</span><span>{item}</span></li>
        ))}
      </ul>
    </div>
  );
}
