// app/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

type Product = {
  asin: string;
  title: string;
  avg_rating: number;
  gemini_output: GeminiOutput;
};

type GeminiOutput = {
  title: string;
};

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortByRating, setSortByRating] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/product");
        const data = await res.json();
        setProducts(data.analyzedProducts || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const displayedProducts = sortByRating
    ? [...products].sort((a, b) => b.avg_rating - a.avg_rating)
    : products;

  if (loading) return <p className="p-6 text-gray-700">Loading...</p>;
  if (!products.length)
    return <p className="p-6 text-gray-700">No products available.</p>;

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <div className="max-w-4xl mx-auto p-6">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Product Reviews</h1>
          <button
            onClick={() => setSortByRating((prev) => !prev)}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            {sortByRating ? "Default Order" : "Sort by Rating"}
          </button>
        </header>

        <div className="space-y-4">
          {displayedProducts.map((product) => (
            <Link
              key={product.asin}
              href={`/${product.asin}`}
              className="block p-4 border border-gray-200 rounded-lg hover:shadow-lg transition"
            >
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">
                  {product.gemini_output?.title ?? product.title}
                </h2>
                <span className="text-sm font-medium bg-gray-100 px-3 py-1 rounded">
                  ⭐ {product.avg_rating.toFixed(1)}
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-1">ASIN: {product.asin}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
