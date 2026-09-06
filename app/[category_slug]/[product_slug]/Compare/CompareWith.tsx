import Image from "next/image";
import { checkAsin } from "@/lib/functions/checkAsin";
import AllProduct from "@/models/AllProduct";
import BlogAnalysis from "@/models/BlogAnalysis";
import "@/models/Category";
import Comparison from "@/models/Comparisons";
import { Types } from "mongoose";
import Link from "next/link";

// 1. Define populated product sub-document shape
interface PopulatedProduct {
  _id: Types.ObjectId | string;
  name: string;
  slug?: string;
  brand?: string;
  asin?: string;
  image?: string;
}

// 2. Define the populated Comparison document shape
export interface PopulatedComparison {
  _id: Types.ObjectId | string;
  base_product: PopulatedProduct;
  compared_product: PopulatedProduct;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

export default async function CompareWith({ id }: { id: string }) {
  const comparisons = (await Comparison.find({ base_product: id })
    .populate("base_product", "name slug brand asin parent_id")
    .populate("compared_product", "name slug brand asin")
    .lean()) as unknown as PopulatedComparison[];

  const allProductRaw = await AllProduct.findById(id)
    .select("name parent_id")
    .populate("category_id", "slug")
    .lean();

  let parentProduct = null;
  if (allProductRaw.parent_id) {
    parentProduct = await AllProduct.findOne({
      slug: allProductRaw.parent_id,
    }).select("name slug asin");
  }
  const categorySlug = allProductRaw.category_id?.slug || "unknown";
  const relatedAsins = [
    parentProduct?.asin,
    ...comparisons.map((comparison) => comparison.compared_product.asin),
  ].filter(Boolean);
  const relatedAnalyses = await BlogAnalysis.find({
    asin: { $in: relatedAsins },
  })
    .select("asin image")
    .lean();
  const imageByAsin = new Map(
    relatedAnalyses.map((analysis) => [
      analysis.asin,
      analysis.image ? String(analysis.image) : undefined,
    ]),
  );

  return (
    <section className="border-4 border-slate-900 bg-[#FFE7A2] p-6 text-slate-900 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)]">
      <header className="border-4 border-slate-900 bg-slate-900 p-5 text-white">
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#FFE7A2]">
          Keep exploring
        </p>
        <h2 className="mt-2 font-anton text-3xl uppercase tracking-wide">
          Related products
        </h2>
        <p className="mt-2 text-sm text-slate-300">
          Explore more products in this category.
        </p>
      </header>

      {parentProduct !== null ? (
        <div className="mt-5 border-2 border-slate-900 bg-white p-4 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex min-w-0 items-center gap-4">
              <ProductImage
                src={imageByAsin.get(parentProduct?.asin)}
                alt={parentProduct?.name || "Related product"}
              />
              <h3 className="font-anton text-xl uppercase">
                {parentProduct?.name}
              </h3>
            </div>
            <Link
              href={`/${categorySlug}/${parentProduct?.slug}`}
              className="border-2 border-slate-900 bg-slate-900 px-3 py-2 text-center font-anton text-xs uppercase tracking-widest text-white shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] transition-transform hover:-translate-y-0.5"
            >
              Review
            </Link>
          </div>
        </div>
      ) : null}

      {comparisons.length > 0 && (
        <div className="mt-5 space-y-3">
          {comparisons.map((eachComparison) => {
            const asin = checkAsin(eachComparison.compared_product.asin);
            return (
              <div
                key={eachComparison._id.toString()}
                className="border-2 border-slate-900 bg-white p-4 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)]"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex min-w-0 items-center gap-4">
                    <ProductImage
                      src={imageByAsin.get(
                        eachComparison.compared_product.asin,
                      )}
                      alt={eachComparison.compared_product.name}
                    />
                    <h3 className="font-anton text-lg uppercase leading-tight">
                      {eachComparison.compared_product.name}
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Link
                      href={`/${categorySlug}/${eachComparison.compared_product.slug}`}
                      className="border-2 border-slate-900 bg-white px-3 py-2 font-anton text-xs uppercase tracking-widest shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] transition-colors hover:bg-[#FFE7A2]"
                    >
                      Review
                    </Link>
                    {asin && (
                      <Link
                        href={`/${categorySlug}/compare/${eachComparison.base_product.slug}--vs--${eachComparison.compared_product.slug}`}
                        className="border-2 border-slate-900 bg-[#93E9BE] px-3 py-2 font-anton text-xs uppercase tracking-widest shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] transition-transform hover:-translate-y-0.5"
                      >
                        Compare
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}

function ProductImage({ src, alt }: { src?: string; alt: string }) {
  return (
    <div className="relative h-20 w-20 shrink-0 overflow-hidden border-2 border-slate-900 bg-[#FFFDF5]">
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          unoptimized
          className="object-contain p-2"
        />
      ) : (
        <div className="flex h-full items-center justify-center p-2 text-center font-mono text-[8px] font-black uppercase leading-tight text-slate-400">
          No image
        </div>
      )}
    </div>
  );
}
