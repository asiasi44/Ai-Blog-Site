"use client";
import { ProductType } from "@/lib/types/product";
import { FeatureWithPriority } from "./type";
import { useMemo, useState, useRef, useEffect } from "react";
import { rankProductByPriority } from "./rankProductsByPriority";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import AffiliateLink from "@/components/AffiliateLink";
import { getAmazonLink } from "@/lib/functions/utils";

const DANGER_THRESHOLD = 10;

export default function ProductsList({
  products,
  featureWithPriority,
}: {
  products: ProductType[];
  featureWithPriority: FeatureWithPriority[];
}) {
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const [flashKeys, setFlashKeys] = useState<Set<string>>(new Set());
  const prevOrderRef = useRef<string[]>([]);

  const toggle = (asin: string) =>
    setExpanded((prev) => {
      const next = new Set(prev);

      if (next.has(asin)) {
        next.delete(asin);
      } else {
        next.add(asin);
      }

      return next;
    });

  const rankedProducts = useMemo(
    () => rankProductByPriority(products, featureWithPriority),
    [featureWithPriority, products],
  );

  // Flash cards that changed rank position
  useEffect(() => {
    const newOrder = rankedProducts.map((p) => p.asin);
    const moved = newOrder.filter(
      (asin, i) =>
        prevOrderRef.current[i] !== asin && prevOrderRef.current.includes(asin),
    );
    if (moved.length > 0) {
      setFlashKeys(new Set(moved));
      setTimeout(() => setFlashKeys(new Set()), 600);
    }
    prevOrderRef.current = newOrder;
  }, [rankedProducts]);

  const scores = useMemo(() => {
    const map = new Map<string, number>();
    for (const p of rankedProducts) {
      let wSum = 0,
        pSum = 0;
      for (const pf of featureWithPriority) {
        const feat = p.features.find((f) => f.name === pf.name);
        wSum += (feat ? Number(feat.rating) : 0) * pf.priority;
        pSum += pf.priority;
      }
      map.set(p.asin, pSum > 0 ? wSum / pSum : 0);
    }
    return map;
  }, [rankedProducts, featureWithPriority]);

  const maxScore = Math.max(...Array.from(scores.values()), 1);

  const boostedFeatures = new Set(
    featureWithPriority.filter((f) => f.priority > 1).map((f) => f.name),
  );
  const dangerFeatures = new Set(
    featureWithPriority
      .filter((f) => f.priority > DANGER_THRESHOLD)
      .map((f) => f.name),
  );

  const previewFeatures = featureWithPriority.slice(0, 3);

  const getRankColor = (index: number) => {
    if (index === 0) return "#f59e0b";
    if (index === 1) return "#94a3b8";
    if (index === 2) return "#cd7c3a";
    if (index < 7) return "#22c55e";
    return "#94a3b8";
  };

  const getRankBadge = (index: number) => {
    if (index === 0) return "🥇";
    if (index === 1) return "🥈";
    if (index === 2) return "🥉";
    return null;
  };

  return (
    <div className="flex flex-col gap-2">
      {/* Desktop header */}
      <div className="hidden sm:grid grid-cols-[36px_1fr_76px_64px_64px_36px] gap-3 px-3 py-2 rounded-lg text-[10px] uppercase tracking-widest text-gray-400 font-semibold bg-gray-50">
        <span></span>
        <span>Product</span>
        <span className="text-right">Score</span>
        <span className="text-right">Rating</span>
        <span className="text-right">Price</span>
        <span></span>
      </div>

      {rankedProducts.map((product, index) => {
        const score = scores.get(product.asin) ?? 0;
        const barPct = Math.round((score / maxScore) * 100);
        const isOpen = expanded.has(product.asin);
        const badge = getRankBadge(index);
        const rankColor = getRankColor(index);
        const isFlashing = flashKeys.has(product.asin);

        return (
          <div
            key={product.asin}
            className={`bg-white border rounded-xl overflow-hidden transition-all duration-300 ${
              isOpen
                ? "border-blue-300 shadow-sm shadow-blue-100"
                : "border-gray-100 hover:border-blue-200 hover:-translate-y-px hover:shadow-sm"
            } ${isFlashing ? "animate-pulse" : ""}`}
          >
            {/* Desktop row */}
            <button
              onClick={() => toggle(product.asin)}
              className="w-full text-left hidden sm:grid grid-cols-[36px_1fr_76px_64px_64px_36px] gap-3 items-center px-3 py-3 hover:bg-gray-50/60 transition-colors"
            >
              {/* Rank */}
              <div className="flex items-center justify-center">
                {badge ? (
                  <span className="text-lg leading-none">{badge}</span>
                ) : (
                  <span
                    className="inline-flex items-center justify-center w-6 h-6 rounded-full text-[11px] font-bold text-white"
                    style={{ backgroundColor: rankColor }}
                  >
                    {index + 1}
                  </span>
                )}
              </div>

              {/* Title + feature tags */}
              <div className="min-w-0">
                <div className="text-[13px] font-semibold text-gray-900 truncate mb-1.5">
                  {product.title}
                </div>
                <div className="flex flex-wrap gap-1">
                  {previewFeatures.map((tf) => {
                    const feat = product.features.find(
                      (f) => f.name === tf.name,
                    );
                    const isDanger = dangerFeatures.has(tf.name);
                    const isHot = boostedFeatures.has(tf.name);
                    if (!feat)
                      return (
                        <span
                          key={tf.name}
                          className="text-[10px] px-1.5 py-0.5 rounded text-gray-300 bg-gray-50 line-through"
                        >
                          {tf.name}
                        </span>
                      );
                    return (
                      <span
                        key={tf.name}
                        className={`text-[10px] px-1.5 py-0.5 rounded font-medium transition-colors ${
                          isDanger
                            ? "bg-red-50 text-red-600"
                            : isHot
                              ? "bg-blue-50 text-blue-700"
                              : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {tf.name}: {Number(feat.rating).toFixed(1)}
                      </span>
                    );
                  })}
                  {featureWithPriority.length > 3 && (
                    <span className="text-[10px] px-1.5 py-0.5 text-gray-400">
                      +{featureWithPriority.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              {/* Score */}
              <div className="text-right">
                <div className="text-base font-bold text-gray-900">
                  {score.toFixed(2)}
                </div>
                <div className="h-1 bg-gray-100 rounded-full overflow-hidden mt-1.5">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${barPct}%`, backgroundColor: rankColor }}
                  />
                </div>
              </div>

              {/* Rating */}
              <div className="text-right">
                <div className="text-[13px] font-semibold text-gray-900">
                  <span className="text-amber-400">★</span>{" "}
                  {product.overall_rating}
                </div>
                <div className="text-[10px] text-gray-400 mt-0.5">
                  {product.reviewCount ?? "—"}
                </div>
              </div>

              {/* Price */}
              <div className="text-right text-[13px] font-bold text-gray-900">
                {product.price || "—"}
              </div>

              {/* Chevron */}
              <div className="flex justify-end">
                <ChevronDown
                  className={`w-4 h-4 text-gray-300 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                />
              </div>
            </button>

            {/* Mobile layout */}
            <div className="sm:hidden p-4">
              <div className="flex items-start gap-3">
                <div className="shrink-0 mt-0.5">
                  {badge ? (
                    <span className="text-xl">{badge}</span>
                  ) : (
                    <span
                      className="inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold text-white"
                      style={{ backgroundColor: rankColor }}
                    >
                      {index + 1}
                    </span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-gray-900 text-[14px] truncate mb-1">
                    {product.title}
                  </div>
                  <div className="flex items-center gap-2 text-[12px] text-gray-500 mb-2">
                    <span className="text-amber-400 font-semibold">
                      ★ {product.overall_rating}
                    </span>
                    <span>·</span>
                    <span>{product.reviewCount} reviews</span>
                    <span>·</span>
                    <span className="font-bold text-gray-900">
                      {product.price}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div>
                      <span className="text-[10px] text-gray-400">Score</span>
                      <div className="text-xl font-bold text-gray-900">
                        {score.toFixed(2)}
                      </div>
                    </div>
                    <div className="flex-1 ml-2">
                      <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${barPct}%`,
                            backgroundColor: rankColor,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => toggle(product.asin)}
                  className="shrink-0 p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <ChevronDown
                    className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>
              </div>
              {!isOpen && (
                <div className="mt-3">
                  <AffiliateLink
                    href={product.asin ? getAmazonLink(product.asin) : "#"}
                    variant="button"
                    className="w-full justify-center"
                  >
                    View on Amazon
                  </AffiliateLink>
                </div>
              )}
            </div>

            {/* Expanded panel */}
            {isOpen && (
              <div className="border-t border-gray-100 bg-gray-50/60 px-3 py-3">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 mb-3">
                  {featureWithPriority.map((tf) => {
                    const feat = product.features.find(
                      (f) => f.name === tf.name,
                    );
                    const isDanger = dangerFeatures.has(tf.name);
                    const isHot = boostedFeatures.has(tf.name);

                    if (!feat)
                      return (
                        <div
                          key={tf.name}
                          className="p-2.5 rounded-lg bg-gray-100 opacity-40"
                        >
                          <div className="text-[10px] text-gray-400 font-medium mb-1">
                            {tf.name}
                          </div>
                          <div className="text-xs text-gray-400 italic">
                            Not rated
                          </div>
                        </div>
                      );

                    const r = Number(feat.rating);
                    return (
                      <div
                        key={tf.name}
                        className={`p-2.5 rounded-lg border transition-colors ${
                          isDanger
                            ? "bg-red-50 border-red-100"
                            : isHot
                              ? "bg-blue-50 border-blue-100"
                              : "bg-white border-gray-100"
                        }`}
                      >
                        <div
                          className={`text-[10px] font-semibold mb-1.5 flex items-center gap-1 ${
                            isDanger
                              ? "text-red-500"
                              : isHot
                                ? "text-blue-600"
                                : "text-gray-500"
                          }`}
                        >
                          {tf.name}
                          {isHot && (
                            <span
                              className={`text-[9px] ${isDanger ? "text-red-400" : "text-blue-400"}`}
                            >
                              ×{tf.priority}
                            </span>
                          )}
                        </div>
                        <div className="h-1 bg-gray-200 rounded-full overflow-hidden mb-1.5">
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${Math.round((r / 5) * 100)}%`,
                              background: isDanger
                                ? "#ef4444"
                                : isHot
                                  ? "#3b82f6"
                                  : "#9ca3af",
                            }}
                          />
                        </div>
                        <div className="text-[13px] font-bold text-gray-900">
                          {r.toFixed(1)}
                          <span className="text-[10px] font-normal text-gray-400">
                            /5
                          </span>
                        </div>
                        {feat.verdict && (
                          <p className="text-[10px] text-gray-500 mt-1 line-clamp-2">
                            {feat.verdict}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>

                <div className="flex gap-2">
                  <AffiliateLink
                    href={product.asin ? getAmazonLink(product.asin) : "#"}
                    variant="button"
                    className="flex-1 justify-center"
                  >
                    View on Amazon
                  </AffiliateLink>
                  <Link
                    href={`/product/${product.slug || product.asin}`}
                    className="px-3 py-2 rounded-lg bg-white border border-gray-200 text-gray-600 font-medium hover:border-blue-200 hover:bg-blue-50 transition-colors text-[12px] whitespace-nowrap"
                  >
                    Full analysis →
                  </Link>
                </div>
              </div>
            )}
          </div>
        );
      })}

      {rankedProducts.length === 0 && (
        <div className="text-center py-16 text-gray-400 text-sm">
          No products found. Try adjusting your priorities.
        </div>
      )}
    </div>
  );
}
