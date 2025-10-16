// useProduct.tsx
"use client";

import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { Product } from "@/types";

export default function ProductList({ products }: { products: Product[] }) {
  const [sortByRating, setSortByRating] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = products.filter((product) =>
    (product.gemini_output?.title ?? product.title)
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  const displayedProducts = sortByRating
    ? [...filteredProducts].sort((a, b) => b.avg_rating - a.avg_rating)
    : filteredProducts;

  if (!products.length) {
    return (
      <div className="text-center py-16">
        <div className="inline-block p-8 bg-white rounded-2xl shadow-lg">
          <svg
            className="w-16 h-16 text-gray-400 mx-auto mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
            />
          </svg>
          <p className="text-gray-600 text-lg">No products available yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Controls Bar */}
      <div className="bg-white rounded-xl shadow-sm p-4 flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
        {/* Search Bar */}
        <div className="relative flex-1 max-w-md">
          <svg
            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
          />
        </div>

        {/* Sort Button */}
        <button
          onClick={() => setSortByRating((prev) => !prev)}
          className="px-5 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg transform hover:scale-105 transition-all flex items-center gap-2 justify-center"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"
            />
          </svg>
          {sortByRating ? "Default Order" : "Sort by Rating"}
        </button>
      </div>

      {/* Product Count */}
      <div className="text-gray-600 text-sm">
        Showing <span className="font-semibold">{displayedProducts.length}</span> products
        {searchQuery && ` for "${searchQuery}"`}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedProducts.map((product) => (
          <Link
            key={product.asin}
            href={`/${product.asin}`}
            className="group"
          >
            <div className="bg-white rounded-xl border border-gray-200 hover:border-blue-300 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 h-full flex flex-col">
              {/* Product Image */}
              <div className="relative bg-gray-50 aspect-square overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.gemini_output?.title ?? product.title}
                  className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                />
                {/* Rating Badge - Positioned over image */}
                <div className="absolute top-3 left-3">
                  <span className="inline-flex items-center gap-1 bg-gradient-to-r from-amber-400 to-orange-400 text-white px-3 py-1.5 rounded-full text-sm font-bold shadow-lg">
                    ⭐ {product.avg_rating.toFixed(1)}
                  </span>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-6 flex flex-col flex-1">
                {/* Product Title */}
                <h2 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 flex-1 mb-4">
                  {product.gemini_output?.title ?? product.title}
                </h2>

                {/* View Details Link */}
                <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-blue-600 text-sm font-medium group-hover:underline">
                    View Full Review
                  </span>
                  <svg
                    className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Empty State for Search */}
      {displayedProducts.length === 0 && searchQuery && (
        <div className="text-center py-16">
          <div className="inline-block p-8 bg-white rounded-2xl shadow-lg">
            <svg
              className="w-16 h-16 text-gray-400 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <p className="text-gray-600 text-lg mb-2">No products found</p>
            <p className="text-gray-500 text-sm">
              Try adjusting your search terms
            </p>
          </div>
        </div>
      )}
    </div>
  );
}