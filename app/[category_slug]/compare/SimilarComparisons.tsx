import Image from "next/image";
import Link from "next/link";
import dbConnect from "@/lib/mongoose";
import AllProduct from "@/models/AllProduct";
import BlogAnalysis from "@/models/BlogAnalysis";
import ComparisonVoiceover from "@/models/ComparisonVoiceover";
import { checkAsin } from "@/lib/functions/checkAsin";

type ProductRecord = {
  asin: string;
  slug: string;
  name: string;
  root_id?: string;
};

type SimilarComparison = {
  base_asin: string;
  compared_asin: string;
};

export default async function SimilarComparisons({
  asins,
  categorySlug,
}: {
  asins: string[];
  categorySlug: string;
}) {
  await dbConnect();
  const currentProducts = (await AllProduct.find({ asin: { $in: asins } })
    .select("asin root_id")
    .lean()) as { asin: string; root_id?: string }[];
  const firstRoot = currentProducts.find((product) => product.asin === asins[0])?.root_id;
  const secondRoot = currentProducts.find((product) => product.asin === asins[1])?.root_id;

  if (!firstRoot || !secondRoot) return null;

  const [firstFamily, secondFamily] = await Promise.all([
    AllProduct.find({ root_id: firstRoot, asin: { $type: "string" } })
      .select("asin slug name root_id")
      .lean(),
    AllProduct.find({ root_id: secondRoot, asin: { $type: "string" } })
      .select("asin slug name root_id")
      .lean(),
  ]);
  const firstFamilyProducts = firstFamily.filter(
    (product) => product.asin && checkAsin(product.asin),
  ) as ProductRecord[];
  const secondFamilyProducts = secondFamily.filter(
    (product) => product.asin && checkAsin(product.asin),
  ) as ProductRecord[];
  const firstFamilyAsins = [...new Set(firstFamilyProducts.map((product) => product.asin))];
  const secondFamilyAsins = [...new Set(secondFamilyProducts.map((product) => product.asin))];

  if (!firstFamilyAsins.length || !secondFamilyAsins.length) return null;

  const comparisons = (await ComparisonVoiceover.find({
    status: "completed",
    sections: { $exists: true, $ne: [] },
    $or: [
      {
        base_asin: { $in: firstFamilyAsins },
        compared_asin: { $in: secondFamilyAsins },
      },
      {
        base_asin: { $in: secondFamilyAsins },
        compared_asin: { $in: firstFamilyAsins },
      },
    ],
  })
    .select("base_asin compared_asin updatedAt")
    .sort({ updatedAt: -1 })
    .limit(20)
    .lean()) as SimilarComparison[];

  const currentPair = new Set(asins);
  const productByAsin = new Map<string, ProductRecord>();
  for (const product of [...firstFamilyProducts, ...secondFamilyProducts]) {
    productByAsin.set(product.asin, product);
  }

  const seenPairs = new Set<string>();
  const related = comparisons.flatMap((comparison) => {
    const baseProduct = productByAsin.get(comparison.base_asin);
    const comparedProduct = productByAsin.get(comparison.compared_asin);
    if (!baseProduct?.slug || !comparedProduct?.slug) return [];

    const pairKey = [comparison.base_asin, comparison.compared_asin].sort().join("::");
    if (currentPair.has(comparison.base_asin) && currentPair.has(comparison.compared_asin)) return [];
    if (seenPairs.has(pairKey)) return [];
    seenPairs.add(pairKey);

    return [{ baseProduct, comparedProduct }];
  }).slice(0, 6);

  if (!related.length) return null;

  const relatedAsins = related.flatMap(({ baseProduct, comparedProduct }) => [
    baseProduct.asin,
    comparedProduct.asin,
  ]);
  const analyses = await BlogAnalysis.find({ asin: { $in: relatedAsins } })
    .select("asin image")
    .lean();
  const imageByAsin = new Map(
    analyses.map((analysis) => [analysis.asin, analysis.image ? String(analysis.image) : undefined]),
  );

  return (
    <section className="mt-10 border-4 border-slate-900 bg-[#FFE7A2] p-5 text-slate-900 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] md:p-6">
      <header className="border-4 border-slate-900 bg-slate-900 p-5 text-white">
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#FFE7A2]">
          Keep exploring
        </p>
        <h2 className="mt-2 font-anton text-3xl uppercase tracking-wide">
          Similar Comparisons
        </h2>
        <p className="mt-2 text-sm text-slate-300">
          More matchups featuring products from these product families.
        </p>
      </header>

      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        {related.map(({ baseProduct, comparedProduct }) => (
          <article
            key={`${baseProduct.asin}--${comparedProduct.asin}`}
            className="border-2 border-slate-900 bg-white p-4 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]"
          >
            <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 sm:gap-4">
              <RelatedProduct product={baseProduct} image={imageByAsin.get(baseProduct.asin)} />
              <span className="font-anton text-sm uppercase text-slate-500">vs</span>
              <RelatedProduct product={comparedProduct} image={imageByAsin.get(comparedProduct.asin)} />
            </div>
            <Link
              href={`/${categorySlug}/compare/${baseProduct.slug}--vs--${comparedProduct.slug}`}
              className="mt-4 block border-2 border-slate-900 bg-[#93E9BE] px-4 py-3 text-center font-anton text-xs uppercase tracking-widest shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] transition-transform hover:-translate-y-0.5"
            >
              View Comparison
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}

function RelatedProduct({
  product,
  image,
}: {
  product: ProductRecord;
  image?: string;
}) {
  return (
    <div className="min-w-0 text-center">
      <div className="relative mx-auto aspect-square w-full max-w-28 overflow-hidden border-2 border-slate-900 bg-[#FFFDF5]">
        {image ? (
          <Image src={image} alt={product.name} fill unoptimized className="object-contain p-2" />
        ) : (
          <div className="flex h-full items-center justify-center p-2 font-mono text-[8px] font-black uppercase text-slate-400">
            No image
          </div>
        )}
      </div>
      <h3 className="mt-2 line-clamp-2 font-anton text-sm uppercase leading-tight sm:text-base">
        {product.name}
      </h3>
    </div>
  );
}
