import dbConnect from "@/lib/mongoose";
import AllProduct from "@/models/AllProduct";
import Category from "@/models/Category";
import ProductBox from "./ProductBox/ProductBox";
import Link from "next/link";

export default async function SpecificCategory({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ brand?: string }>;
}) {
  await dbConnect();

  const { slug } = await params;
  const { brand } = await searchParams;

  const givenCategory = await Category.findOne({ slug }).select(
    "_id category imageUrl",
  );

  if (!givenCategory) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#FFFDF5] px-4 text-slate-900">
        <section className="border-4 border-slate-900 bg-[#FFE7A2] p-8 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)]">
          <h1 className="font-anton text-4xl uppercase">Category not found</h1>
          <Link href="/category" className="mt-6 inline-block border-2 border-slate-900 bg-slate-900 px-4 py-3 font-anton text-sm uppercase tracking-widest text-white">
            Back to Categories
          </Link>
        </section>
      </main>
    );
  }

  const categoryId = givenCategory._id.toString();

  const allProducts = await AllProduct.find({ category_id: categoryId })
    .select("_id slug name brand asin")
    .lean();

  const productWithAsinRaw = allProducts.filter(
    (eachProduct) =>
      eachProduct.asin &&
      !["NOT_ON_AMAZON", "DUPLICATE_ASIN"].includes(eachProduct.asin),
  );

  const productWithAsin = productWithAsinRaw.map((eachProduct) => {
    const eachProductIdString = eachProduct._id.toString();
    delete eachProduct._id;
    return {
      ...eachProduct,
      id: eachProductIdString,
    };
  });
  if (productWithAsin.length === 0) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#FFFDF5] px-4 text-slate-900">
        <section className="border-4 border-slate-900 bg-[#FFE7A2] p-8 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)]">
          <h1 className="font-anton text-4xl uppercase">No products found</h1>
          <Link href="/category" className="mt-6 inline-block border-2 border-slate-900 bg-slate-900 px-4 py-3 font-anton text-sm uppercase tracking-widest text-white">
            View All Categories
          </Link>
        </section>
      </main>
    );
  }
  return (
    <div>
      <ProductBox products={productWithAsin} slug={slug} initialBrand={brand} />
    </div>
  );
}
