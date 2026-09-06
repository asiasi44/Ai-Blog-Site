import dbConnect from "@/lib/mongoose";
import Category from "@/models/Category";
import Link from "next/link";

export default async function AllCategoryPage() {
  await dbConnect();
  const categories = await Category.find({
    slug: { $exists: true, $ne: null },
  })
    .sort({ category: 1 })
    .lean();
  return (
    <main className="min-h-screen bg-[#FFFDF5] px-4 py-8 text-slate-900 md:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="border-4 border-slate-900 bg-slate-900 p-6 text-white shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] md:p-10">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-[#FFE7A2]">
            RankNest catalog
          </p>
          <h1 className="mt-3 font-anton text-4xl uppercase tracking-wide sm:text-6xl">
            All Categories
          </h1>
          <p className="mt-3 text-sm text-slate-300">
            Browse products, customer analysis, and pending reviews.
          </p>
        </header>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((eachCategory) => {
            return (
              <Link
                href={`/category/${eachCategory.slug}`}
                key={eachCategory._id.toString()}
                className="border-4 border-slate-900 bg-[#FFE7A2] p-5 font-anton text-2xl uppercase shadow-[5px_5px_0px_0px_rgba(15,23,42,1)] transition-transform hover:-translate-y-1"
              >
                {eachCategory.category}
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}
