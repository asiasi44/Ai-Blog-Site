"use client";

import { useState } from "react";
import Link from "next/link";
import { Product } from "@/types";

export default function ProductListClient({
  products,
}: {
  products: Product[];
}) {
  const [sortByRating, setSortByRating] = useState(false);

  const displayedProducts = sortByRating
    ? [...products].sort((a, b) => b.avg_rating - a.avg_rating)
    : products;

  if (!products.length)
    return <p className="p-6 text-gray-700">No products available.</p>;

  return (
    <div className="space-y-4">
      <button
        onClick={() => setSortByRating((prev) => !prev)}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        {sortByRating ? "Default Order" : "Sort by Rating"}
      </button>

      {displayedProducts.map((product) => (
        <Link key={product.asin} href={`/${product.asin}`}>
          <div className="flex justify-between items-center p-4 border border-gray-200 rounded-lg hover:shadow-lg transition">
            <h2 className="text-lg font-semibold">
              {product.gemini_output?.title ?? product.title}
            </h2>
            <span className="text-sm font-medium bg-gray-100 px-3 py-1 rounded">
              ⭐ {product.avg_rating.toFixed(1)}
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
