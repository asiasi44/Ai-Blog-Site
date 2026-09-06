import dbConnect from "@/lib/mongoose";
import AllProduct from "@/models/AllProduct";
import CompareWith from "./Compare/CompareWith";
import BlogAnalysisComponent from "./BlogAnalysis/BlogAnalysis";
import Link from "next/link";
import { Metadata } from "next";
import { checkAsin } from "@/lib/functions/checkAsin";
import BlogAnalysis from "@/models/BlogAnalysis";
import GeneratedArticle from "@/models/GeneratedArticle";

function toPlain<T>(value: T): T {
  return JSON.parse(JSON.stringify(value));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ product_slug: string }>;
}): Promise<Metadata> {
  await dbConnect();
  const { product_slug } = await params;
  const product = await AllProduct.findOne({ slug: product_slug }).lean();
  if (!product?.asin) return {};

  const [article, analysis] = await Promise.all([
    GeneratedArticle.findOne({ asin: product.asin }).lean(),
    BlogAnalysis.findOne({ asin: product.asin }).lean(),
  ]);
  const articleData = article?.articleData;
  const title = article?.title || analysis?.title || `${product.name} review`;

  return {
    title: articleData?.seo?.metaTitle || title,
    description:
      articleData?.seo?.metaDescription ||
      analysis?.introduction ||
      `Customer analysis and specifications for ${product.name}.`,
    alternates: {
      canonical:
        articleData?.seo?.canonicalUrl ||
        `${process.env.NEXT_PUBLIC_SITE_URL || "https://ranknest.tech"}/${product_slug}`,
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ product_slug: string }>;
}) {
  await dbConnect();
  const { product_slug } = await params;
  const allProductRaw = await AllProduct.findOne({
    slug: product_slug,
  }).populate("category_id", "slug category");

  if (!allProductRaw) {
    return (
      <EmptyProductState
        title="Product Not Found"
        message="This product is no longer available in the catalog."
        categorySlug="unknown"
      />
    );
  }

  const categorySlug = allProductRaw?.category_id?.slug || "unknown";
  const isAsin = checkAsin(allProductRaw?.asin || "NOT_ON_AMAZON");
  if (!isAsin) {
    return (
      <EmptyProductState
        title={allProductRaw.name}
        message="This product does not have an Amazon listing yet, but it is still part of this category."
        categorySlug={categorySlug}
        productId={allProductRaw._id.toString()}
      />
    );
  }
  const [blogAnalysisRaw, generatedArticleRaw] = await Promise.all([
    BlogAnalysis.findOne({ asin: allProductRaw.asin }).lean(),
    GeneratedArticle.findOne({ asin: allProductRaw.asin }).lean(),
  ]);
  if (!blogAnalysisRaw) {
    return (
      <EmptyProductState
        title={allProductRaw.name}
        message="Customer analysis is not available for this product yet. You can continue browsing the category."
        categorySlug={categorySlug}
        productId={allProductRaw._id.toString()}
      />
    );
  }
  const blogAnalysis = toPlain(blogAnalysisRaw);
  const generatedArticle = generatedArticleRaw
    ? toPlain(generatedArticleRaw)
    : null;
  const brandSpec = blogAnalysis.specifications?.find(
    (spec: { name: string }) => spec.name?.toLowerCase() === "brand",
  );
  const productMeta = generatedArticle?.productMeta;
  const title =
    generatedArticle?.title || blogAnalysis.title || allProductRaw.name;
  const affiliateUrl =
    productMeta?.affiliateUrl ||
    `https://www.amazon.com/dp/${allProductRaw.asin}?tag=ranknest-20`;
  return (
    <div className="min-h-screen bg-[#FFFDF5] text-slate-900">
      <BlogAnalysisComponent
        blogAnalysis={blogAnalysis}
        generatedArticle={generatedArticle}
        product={{
          name: allProductRaw.name,
          title,
          brand: allProductRaw.brand || brandSpec?.value,
          category:
            allProductRaw.category_id?.category || blogAnalysis.category,
          asin: allProductRaw.asin,
          affiliateUrl,
          categorySlug,
        }}
      />
      <div className="mx-auto max-w-6xl px-4 pb-12">
        <CompareWith id={allProductRaw._id.toString()} />
      </div>
    </div>
  );
}

function EmptyProductState({
  title,
  message,
  categorySlug,
  productId,
}: {
  title: string;
  message: string;
  categorySlug: string;
  productId?: string;
}) {
  return (
    <main className="min-h-screen bg-[#FFFDF5] px-4 py-12 text-slate-900">
      <div className="mx-auto max-w-4xl">
        <section className="border-4 border-slate-900 bg-[#FFE7A2] p-8 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)]">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-slate-600">Product catalog</p>
          <h1 className="mt-3 font-anton text-4xl uppercase tracking-wide">{title}</h1>
          <p className="mt-4 max-w-xl text-base leading-7 text-slate-700">{message}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            {categorySlug !== "unknown" && (
              <Link href={`/category/${categorySlug}`} className="border-2 border-slate-900 bg-slate-900 px-4 py-3 font-anton text-sm uppercase tracking-widest text-white shadow-[3px_3px_0px_0px_rgba(15,23,42,1)]">
                Back to Category
              </Link>
            )}
            <Link href="/category" className="border-2 border-slate-900 bg-white px-4 py-3 font-anton text-sm uppercase tracking-widest shadow-[3px_3px_0px_0px_rgba(15,23,42,1)]">
              View All Categories
            </Link>
          </div>
        </section>
        {productId && (
          <div className="mt-8 border-4 border-slate-900 bg-white p-6 shadow-[6px_6px_0px_0px_rgba(15,23,42,1)]">
            <CompareWith id={productId} />
          </div>
        )}
      </div>
    </main>
  );
}
