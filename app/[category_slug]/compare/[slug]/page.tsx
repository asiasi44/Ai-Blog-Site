import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import dbConnect from "@/lib/mongoose";
import { getAmazonLink } from "@/lib/functions/utils";
import AllProduct from "@/models/AllProduct";
import BlogAnalysis from "@/models/BlogAnalysis";
import ComparisonVoiceover from "@/models/ComparisonVoiceover";
import BackButton from "./BackButton";

export const metadata: Metadata = {
  title: "Product Comparison | RankNest",
  description:
    "Compare product ratings, key features, specifications, and recommendations to choose the right product for you.",
};

type ComparisonSpec = {
  label: string;
  value: string;
  isHighlighted?: boolean;
};

type ComparisonProduct = {
  name: string;
  rating: number;
  isWinner: boolean;
  badgeText: string;
  specs: ComparisonSpec[];
  image: string;
};

type ComparisonSection = {
  title: string;
  isVerdict: boolean;
  productA: ComparisonProduct;
  productB: ComparisonProduct;
};

type ComparisonRecord = {
  base_asin: string;
  compared_asin: string;
  sections: ComparisonSection[];
};

type AllProductRecord = {
  name: string;
  asin: string;
  slug: string;
};

type ProductLinks = {
  reviewHref: string;
  amazonHref: string;
};

export default async function CompareProducts({
  params,
}: {
  params: Promise<{ category_slug: string; slug: string }>;
}) {
  await dbConnect();
  const { category_slug: categorySlug, slug } = await params;
  const [baseSlug, comparedSlug] = slug.split("--vs--", 2);

  const products = await AllProduct.find({
    slug: { $in: [baseSlug, comparedSlug] },
  })
    .select("name asin slug")
    .lean();

  const asins = products.map((product) => product.asin).filter(Boolean);
  if (asins.length < 2) {
    return <ComparisonMessage message="One or both products were not found." />;
  }

  const [asinA, asinB] = asins;
  const comparisonData = await ComparisonVoiceover.findOne({
    $or: [
      { base_asin: asinA, compared_asin: asinB },
      { base_asin: asinB, compared_asin: asinA },
    ],
  }).lean();

  if (!comparisonData) {
    return <ComparisonMessage message="This comparison is not available yet." />;
  }

  const comparison = comparisonData as unknown as ComparisonRecord;
  const analyses = await BlogAnalysis.find({ asin: { $in: [asinA, asinB] } })
    .select("asin image")
    .lean();
  const imageByAsin = new Map(
    analyses.map((analysis) => [analysis.asin, analysis.image ? String(analysis.image) : undefined]),
  );
  const sections = comparison.sections || [];
  const firstSection = sections[0];
  const finalSection =
    sections.find((section) => section.isVerdict) || sections[sections.length - 1];

  if (!firstSection) {
    return <ComparisonMessage message="This comparison does not have any sections yet." />;
  }

  const allProducts = products as unknown as AllProductRecord[];
  const productARecord = allProducts.find((product) => product.asin === comparison.base_asin);
  const productBRecord = allProducts.find((product) => product.asin === comparison.compared_asin);
  const productA = withProductImage(firstSection.productA, imageByAsin.get(comparison.base_asin));
  const productB = withProductImage(firstSection.productB, imageByAsin.get(comparison.compared_asin));
  const linksA = getProductLinks(categorySlug, productARecord, productARecord?.asin || comparison.base_asin);
  const linksB = getProductLinks(categorySlug, productBRecord, productBRecord?.asin || comparison.compared_asin);
  const winningProduct = finalSection?.productA.isWinner
    ? finalSection.productA
    : finalSection?.productB;
  const winningImage = finalSection?.productA.isWinner
    ? imageByAsin.get(comparison.base_asin)
    : imageByAsin.get(comparison.compared_asin);
  const winningLinks = finalSection?.productA.isWinner ? linksA : linksB;

  return (
    <main className="min-h-screen bg-[#FFFDF5] px-4 py-8 text-slate-900 md:px-8">
      <div className="mx-auto max-w-7xl">
        <Link
          href={`/category/${categorySlug}`}
          className="font-mono text-[10px] font-black uppercase tracking-[0.25em] text-slate-600 underline underline-offset-4"
        >
          Back to categories
        </Link>

        <header className="mt-5 overflow-hidden border-4 border-slate-900 bg-slate-900 text-white shadow-[10px_10px_0px_0px_rgba(15,23,42,1)]">
          <div className="p-6 md:p-10">
            <p className="font-mono text-xs uppercase tracking-[0.35em] text-[#FFE7A2]">
              RankNest comparison
            </p>
            <h1 className="mt-4 max-w-4xl font-anton text-4xl uppercase leading-none tracking-wide sm:text-6xl">
              {productA.name} <span className="text-[#FFE7A2]">vs</span> {productB.name}
            </h1>
            <p className="mt-5 max-w-2xl text-sm leading-6 text-slate-300">
              A focused look at how these products compare across the features that matter most.
            </p>
          </div>
          <div className="grid border-t-4 border-slate-900 bg-[#FFE7A2] text-slate-900 md:grid-cols-2">
            <WinnerSummary product={productA} links={linksA} side="A" />
            <WinnerSummary product={productB} links={linksB} side="B" />
          </div>
        </header>

        <section className="mt-10 space-y-8">
          {sections.map((section, index) => (
            <ComparisonSectionCard
              key={`${section.title}-${index}`}
              section={section}
              index={index}
              productAImage={imageByAsin.get(comparison.base_asin)}
              productBImage={imageByAsin.get(comparison.compared_asin)}
              linksA={linksA}
              linksB={linksB}
            />
          ))}
        </section>

        {winningProduct && (
          <section className="mt-10 border-4 border-slate-900 bg-[#93E9BE] p-6 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] md:p-8">
            <p className="font-mono text-xs font-black uppercase tracking-[0.3em]">
              The recommendation
            </p>
            <div className="mt-3 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <div className="relative h-24 w-24 shrink-0 overflow-hidden border-2 border-slate-900 bg-white">
                  <Image src={winningImage || winningProduct.image} alt={winningProduct.name} fill unoptimized className="object-contain p-2" />
                </div>
                <div>
                <h2 className="font-anton text-4xl uppercase leading-none sm:text-5xl">
                  {winningProduct.name}
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-6">
                  The strongest overall choice in this comparison, based on the final evaluation.
                </p>
                </div>
              </div>
              <div className="flex shrink-0 flex-col items-start gap-3 sm:items-end">
                <span className="border-2 border-slate-900 bg-white px-4 py-3 font-mono text-sm font-black uppercase tracking-widest shadow-[3px_3px_0px_0px_rgba(15,23,42,1)]">
                  {winningProduct.rating.toFixed(2)} / 5
                </span>
                <div className="flex flex-wrap gap-2">
                  <Link href={winningLinks.reviewHref} className="border-2 border-slate-900 bg-slate-900 px-3 py-2 font-mono text-[10px] font-black uppercase tracking-widest text-white">
                    Read review
                  </Link>
                  <Link href={winningLinks.amazonHref} target="_blank" rel="noreferrer" className="border-2 border-slate-900 bg-white px-3 py-2 font-mono text-[10px] font-black uppercase tracking-widest">
                    Amazon ↗
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}

function WinnerSummary({
  product,
  links,
  side,
}: {
  product: ComparisonProduct;
  links: ProductLinks;
  side: string;
}) {
  return (
    <div
      className={`flex items-center gap-4 p-5 md:p-6 ${
        side === "B" ? "border-t-4 border-slate-900 md:border-l-4 md:border-t-0" : ""
      }`}
    >
      <div className="relative h-24 w-24 shrink-0 overflow-hidden border-2 border-slate-900 bg-white sm:h-28 sm:w-28">
        <Image src={product.image} alt={product.name} fill unoptimized className="object-contain p-2" />
      </div>
      <div className="min-w-0">
        <p className="font-mono text-[10px] font-black uppercase tracking-widest text-slate-600">
          {product.isWinner ? "Leading choice" : "Alternative"}
        </p>
        <h2 className="mt-1 font-anton text-2xl uppercase leading-tight">{product.name}</h2>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <span className="border-2 border-slate-900 bg-white px-2 py-1 font-mono text-xs font-black">
            {product.rating.toFixed(2)} / 5
          </span>
          <span className="font-mono text-[10px] font-black uppercase">{product.badgeText}</span>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          <Link href={links.reviewHref} className="border-2 border-slate-900 bg-slate-900 px-2 py-1 font-mono text-[10px] font-black uppercase tracking-widest text-white">
            Review
          </Link>
          <Link href={links.amazonHref} target="_blank" rel="noreferrer" className="border-2 border-slate-900 bg-white px-2 py-1 font-mono text-[10px] font-black uppercase tracking-widest">
            Amazon ↗
          </Link>
        </div>
      </div>
    </div>
  );
}

function ComparisonSectionCard({
  section,
  index,
  productAImage,
  productBImage,
  linksA,
  linksB,
}: {
  section: ComparisonSection;
  index: number;
  productAImage?: string;
  productBImage?: string;
  linksA: ProductLinks;
  linksB: ProductLinks;
}) {
  const productA = withProductImage(section.productA, productAImage);
  const productB = withProductImage(section.productB, productBImage);

  return (
    <article
      className={`border-4 border-slate-900 bg-white shadow-[7px_7px_0px_0px_rgba(15,23,42,1)] ${
        section.isVerdict ? "bg-[#FFE7A2]" : ""
      }`}
    >
      <header className="flex flex-col gap-2 border-b-4 border-slate-900 bg-slate-900 px-5 py-4 text-white sm:flex-row sm:items-center sm:justify-between md:px-6">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs font-black text-[#FFE7A2]">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h2 className="font-anton text-2xl uppercase tracking-wide">{section.title}</h2>
        </div>
        {section.isVerdict && (
          <span className="w-fit border border-[#FFE7A2] px-2 py-1 font-mono text-[10px] font-black uppercase tracking-widest text-[#FFE7A2]">
            Final verdict
          </span>
        )}
      </header>
      <div className="grid md:grid-cols-2">
        <ProductComparisonPanel product={productA} links={linksA} />
        <ProductComparisonPanel product={productB} links={linksB} alternate />
      </div>
    </article>
  );
}

function ProductComparisonPanel({
  product,
  links,
  alternate = false,
}: {
  product: ComparisonProduct;
  links: ProductLinks;
  alternate?: boolean;
}) {
  return (
    <div
      className={`p-5 md:p-6 ${
        alternate ? "border-t-4 border-slate-900 md:border-l-4 md:border-t-0" : ""
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-mono text-[10px] font-black uppercase tracking-widest text-slate-500">
            {product.badgeText}
          </p>
          <h3 className="mt-1 font-anton text-2xl uppercase leading-tight">{product.name}</h3>
        </div>
        <span
          className={`shrink-0 border-2 border-slate-900 px-2 py-1 font-mono text-sm font-black ${
            product.isWinner ? "bg-[#93E9BE]" : "bg-slate-100"
          }`}
        >
          {product.rating.toFixed(2)}
        </span>
      </div>
      <div className="mt-5 grid gap-2">
        {product.specs.map((spec) => (
          <div
            key={`${spec.label}-${spec.value}`}
            className={`flex items-start justify-between gap-4 border-2 border-slate-900 p-3 text-sm ${
              spec.isHighlighted ? "bg-[#FFE7A2]" : "bg-slate-50"
            }`}
          >
            <span className="font-mono text-[10px] font-black uppercase tracking-wider text-slate-600">
              {spec.label}
            </span>
            <span className="max-w-[60%] text-right font-bold">{spec.value}</span>
          </div>
        ))}
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <Link href={links.reviewHref} className="border-2 border-slate-900 bg-slate-900 px-3 py-2 font-mono text-[10px] font-black uppercase tracking-widest text-white">
          Read review
        </Link>
        <Link href={links.amazonHref} target="_blank" rel="noreferrer" className="border-2 border-slate-900 bg-[#FFE7A2] px-3 py-2 font-mono text-[10px] font-black uppercase tracking-widest">
          View on Amazon ↗
        </Link>
      </div>
      {product.isWinner && (
        <p className="mt-4 font-mono text-[10px] font-black uppercase tracking-[0.2em] text-emerald-700">
          Winner in this category
        </p>
      )}
    </div>
  );
}

function withProductImage(
  product: ComparisonProduct,
  image?: string,
): ComparisonProduct {
  return { ...product, image: image || product.image };
}

function getProductLinks(
  categorySlug: string,
  product: AllProductRecord | undefined,
  asin: string,
): ProductLinks {
  return {
    reviewHref: product?.slug ? `/${categorySlug}/${product.slug}` : "/category",
    amazonHref: getAmazonLink(asin),
  };
}

function ComparisonMessage({ message }: { message: string }) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#FFFDF5] px-4 text-slate-900">
      <section className="border-4 border-slate-900 bg-[#FFE7A2] p-8 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)]">
        <h1 className="font-anton text-3xl uppercase">{message}</h1>
        <BackButton />
      </section>
    </main>
  );
}
