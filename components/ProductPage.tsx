// app/ProductsClient.tsx
"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ProductType } from "@/types";

function generateCategories(products: ProductType[]) {
  const unique = Array.from(new Set(products.map((p) => p.category)));

  return [
    { id: "all", label: "All Products" },
    ...unique.map((cat) => ({
      id: cat,
      label: cat.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
    })),
  ];
}

export default function ProductsClient({
  products,
}: {
  products: ProductType[];
}) {
  const [currentCategory, setCurrentCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const categories = generateCategories(products);
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        currentCategory === "all" || product.category === currentCategory;
      const matchesSearch = product.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [products, currentCategory, searchTerm]);

  const getStars = (rating: number) => {
    const fullStars = Math.round(rating);
    return "★".repeat(fullStars) + "☆".repeat(5 - fullStars);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-gray-50/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Link href="/" className="text-2xl font-bold text-gray-900">
              ProductReviews
            </Link>
            <div className="flex-1 max-w-xl order-3 lg:order-2 w-full lg:w-auto mx-0 lg:mx-8">
              <input
                type="text"
                className="w-full px-5 py-3 border border-gray-300 rounded-full text-base focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-20 text-center">
        <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-gray-900 mb-4">
          Discover Quality Products
        </h1>
        <p className="text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto">
          Honest reviews and detailed analysis to help you make informed
          decisions
        </p>
      </div>

      {/* Categories */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-16">
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`px-7 py-3 border rounded-full text-base font-medium whitespace-nowrap transition-all ${
                currentCategory === cat.id
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-900 border-gray-300 hover:border-blue-600 hover:bg-gray-50"
              }`}
              onClick={() => setCurrentCategory(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Products Section */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pb-20">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8">
          <h2 className="text-3xl font-bold text-gray-900">
            {categories.find((c) => c.id === currentCategory)?.label}
          </h2>
          <div className="flex gap-2">
            <button
              className={`px-4 py-2 border rounded-lg text-xl transition-all ${
                viewMode === "grid"
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-700 border-gray-300"
              }`}
              onClick={() => setViewMode("grid")}
              title="Grid view"
            >
              ⊞
            </button>
            <button
              className={`px-4 py-2 border rounded-lg text-xl transition-all ${
                viewMode === "list"
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-700 border-gray-300"
              }`}
              onClick={() => setViewMode("list")}
              title="List view"
            >
              ☰
            </button>
          </div>
        </div>

        {/* Products Grid */}
        <div
          className={`grid gap-8 ${
            viewMode === "list"
              ? "grid-cols-1"
              : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          }`}
        >
          {filteredProducts.length === 0 ? (
            <div className="col-span-full text-center py-20">
              <div className="text-6xl mb-4 opacity-30">🔍</div>
              <div className="text-2xl text-gray-600">No products found</div>
            </div>
          ) : (
            filteredProducts.map((product) => {
              return (
                <Link
                  key={product.slug}
                  href={`/product/${product.slug}`}
                  className={`bg-white border border-gray-200 rounded-2xl overflow-hidden transition-all hover:-translate-y-2 hover:shadow-2xl hover:border-gray-300 ${
                    viewMode === "list"
                      ? "grid grid-cols-1 md:grid-cols-[300px_1fr]"
                      : "block"
                  }`}
                >
                  {/* Product Image */}
                  <div
                    className="relative h-72 bg-gray-100 flex items-center justify-center text-5xl"
                    style={{
                      backgroundImage: `url(${product.image})`,
                      backgroundSize: "contain",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center",
                    }}
                  ></div>

                  {/* Product Content */}
                  <div className="p-6">
                    <div className="text-xs text-gray-500 uppercase tracking-wider font-medium mb-2">
                      {product.category}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3 leading-tight">
                      {product.title}
                    </h3>

                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-yellow-500 text-base">
                        {getStars(product.overall_rating)}
                      </span>
                      <span className="font-semibold text-gray-900">
                        {product.overall_rating.toFixed(1)}
                      </span>
                      <span className="text-gray-500 text-sm">
                        ({product.reviewCount.toLocaleString()})
                      </span>
                    </div>

                    {/* Highlights */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {product.highlights.map((highlight, idx) => (
                        <span
                          key={idx}
                          className="bg-gray-100 text-gray-900 px-3 py-1.5 rounded-xl text-sm"
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>

                    {/* Footer */}
                    <div className="pt-4 border-t border-gray-200">
                      <span className="text-blue-600 font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                        View Details →
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
