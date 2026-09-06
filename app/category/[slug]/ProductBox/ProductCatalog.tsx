"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

type Product = {
  id: string;
  slug: string;
  name: string;
  brand: string;
  asin: string;
  analysis?: {
    image?: string;
    overall_rating?: number;
    reviewCount?: number;
    price?: string;
  } | null;
};

export default function ProductCatalog({ products, slug, initialBrand }: { products: Product[]; slug: string; initialBrand?: string }) {
  const [query, setQuery] = useState("");
  const [brand, setBrand] = useState(initialBrand || "all");
  const [analysis, setAnalysis] = useState("all");
  const [sort, setSort] = useState("rating");
  const [hideUnconfidentRatings, setHideUnconfidentRatings] = useState(true);

  const brands = useMemo(
    () => Array.from(new Set(products.map((product) => product.brand).filter(Boolean))).sort(),
    [products],
  );

  const visibleProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return products
      .filter((product) => {
        const matchesQuery = !normalizedQuery || `${product.name} ${product.brand}`.toLowerCase().includes(normalizedQuery);
        const matchesBrand = brand === "all" || product.brand === brand;
        const matchesAnalysis = analysis === "all" || (analysis === "available" ? Boolean(product.analysis) : !product.analysis);
        const matchesConfidence =
          !hideUnconfidentRatings ||
          (product.analysis?.reviewCount != null && product.analysis.reviewCount >= 20);
        return matchesQuery && matchesBrand && matchesAnalysis && matchesConfidence;
      })
      .sort((left, right) => {
        if (sort === "rating") return (right.analysis?.overall_rating ?? -1) - (left.analysis?.overall_rating ?? -1);
        if (sort === "reviews") return (right.analysis?.reviewCount ?? -1) - (left.analysis?.reviewCount ?? -1);
        return left.name.localeCompare(right.name);
      });
  }, [analysis, brand, hideUnconfidentRatings, products, query, sort]);

  return (
    <main className="min-h-screen bg-[#FFFDF5] px-4 py-8 text-slate-900 md:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 border-4 border-slate-900 bg-slate-900 p-6 text-white shadow-[8px_8px_0px_0px_rgba(15,23,42,1)]">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-[#FFE7A2]">Product catalog</p>
            <Link href="/category" className="border-2 border-[#FFE7A2] px-3 py-2 font-mono text-[10px] font-black uppercase tracking-widest text-[#FFE7A2] transition-colors hover:bg-[#FFE7A2] hover:text-slate-900">
              All categories
            </Link>
          </div>
          <h1 className="mt-3 font-anton text-4xl uppercase tracking-wide sm:text-5xl">Browse products</h1>
          <p className="mt-3 text-sm text-slate-300">{visibleProducts.length} of {products.length} products shown</p>
        </div>

        <section className="mb-8 grid gap-3 border-4 border-slate-900 bg-[#FFE7A2] p-4 sm:grid-cols-2 lg:grid-cols-4">
          <label className="flex flex-col gap-2 font-mono text-[10px] font-black uppercase tracking-widest">
            Search
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Name or brand" className="border-2 border-slate-900 bg-white px-3 py-3 font-sans text-sm font-normal normal-case tracking-normal outline-none" />
          </label>
          <label className="flex flex-col gap-2 font-mono text-[10px] font-black uppercase tracking-widest">
            Brand
            <select value={brand} onChange={(event) => setBrand(event.target.value)} className="border-2 border-slate-900 bg-white px-3 py-3 font-sans text-sm font-normal normal-case tracking-normal">
              <option value="all">All brands</option>
              {brands.map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
          </label>
          <label className="flex flex-col gap-2 font-mono text-[10px] font-black uppercase tracking-widest">
            Analysis
            <select value={analysis} onChange={(event) => setAnalysis(event.target.value)} className="border-2 border-slate-900 bg-white px-3 py-3 font-sans text-sm font-normal normal-case tracking-normal">
              <option value="all">All products</option>
              <option value="available">Analysis available</option>
              <option value="missing">Analysis pending</option>
            </select>
          </label>
          <label className="flex flex-col gap-2 font-mono text-[10px] font-black uppercase tracking-widest">
            Sort by
            <select value={sort} onChange={(event) => setSort(event.target.value)} className="border-2 border-slate-900 bg-white px-3 py-3 font-sans text-sm font-normal normal-case tracking-normal">
              <option value="name">Name</option>
              <option value="rating">Rating</option>
              <option value="reviews">Review count</option>
            </select>
          </label>
          <button
            type="button"
            aria-pressed={hideUnconfidentRatings}
            onClick={() => setHideUnconfidentRatings((isHidden) => !isHidden)}
            className={`border-2 border-slate-900 px-3 py-3 text-left font-mono text-[10px] font-black uppercase tracking-widest transition-colors ${hideUnconfidentRatings ? "bg-slate-900 text-white" : "bg-white text-slate-900 hover:bg-slate-100"}`}
          >
            {hideUnconfidentRatings ? "Show ratings under 20 reviews" : "Hide ratings under 20 reviews"}
          </button>
        </section>

        {visibleProducts.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {visibleProducts.map((product) => (
              <Link href={`/${slug}/${product.slug}`} key={product.id} className="border-4 border-slate-900 bg-white p-5 shadow-[5px_5px_0px_0px_rgba(15,23,42,1)] transition-transform hover:-translate-y-1">
                <div className="relative mb-5 aspect-[4/3] overflow-hidden border-2 border-slate-900 bg-[#FFFDF5]">
                  {product.analysis?.image ? (
                    <Image src={product.analysis.image} alt={product.name} fill unoptimized className="object-contain p-4" />
                  ) : (
                    <div className="flex h-full items-center justify-center p-4 text-center font-mono text-[10px] font-black uppercase tracking-widest text-slate-400">Image unavailable</div>
                  )}
                </div>
                <div className="flex items-start justify-between gap-3">
                  <h2 className="font-anton text-xl uppercase leading-tight">{product.name}</h2>
                  <span className={`shrink-0 border border-slate-900 px-2 py-1 font-mono text-[9px] font-black uppercase ${product.analysis ? "bg-[#D3F9D8]" : "bg-[#FFD8D8]"}`}>
                    {product.analysis ? "Analyzed" : "Pending"}
                  </span>
                </div>
                <p className="mt-3 font-mono text-xs uppercase tracking-widest text-slate-500">{product.brand || "Brand unavailable"}</p>
                <div className="mt-5 border-t-2 border-slate-900 pt-4 text-sm">
                  <p>Rating: {product.analysis?.overall_rating ?? "Not available"}</p>
                  <p>Reviews: {product.analysis?.reviewCount?.toLocaleString() ?? "Not available"}</p>
                  {product.analysis?.price && <p>Price: {product.analysis.price}</p>}
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="border-4 border-slate-900 bg-white p-8 text-center shadow-[5px_5px_0px_0px_rgba(15,23,42,1)]">
            <h2 className="font-anton text-2xl uppercase">No matching products</h2>
            <p className="mt-2 text-sm text-slate-600">Try clearing a filter or using a broader search.</p>
          </div>
        )}
      </div>
    </main>
  );
}