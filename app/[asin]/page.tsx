"use client";
import React, { useState } from "react";
import { CheckCircle, XCircle } from "lucide-react";
import { renderStars, getConfidenceLevel } from "./ReviewUtility";
import { useParams } from "next/navigation";
import { useBlogByAsin } from "@/lib/hooks/useBlog";
import { ExpandableText } from "./ExpandableText";
import {
  Battery,
  Zap,
  Users,
  Hammer,
  Package,
  Shield,
  Circle,
  DollarSign,
} from "lucide-react";
import { Segment } from "next/dist/server/app-render/types";

type UserSegment = {
  segment: string;
  satisfaction: number;
  percentage: number;
};

type Feature = {
  name: string;
  score: number;
  mentions: number;
  confidence: number;
};

type ProsCons = {
  feature: string;
  reason: string;
};
export default function ProductReviewBlog() {
  const [showAll, setShowAll] = useState(false);
  const { asin } = useParams();
  const { data, error, isLoading } = useBlogByAsin(asin as string);

  const productData = data?.data;
  const entries = Object.entries(productData?.specs || {}) as [
    string,
    string
  ][];
  const hasMore = entries.length > 8;
  const visibleEntries = hasMore && !showAll ? entries.slice(0, 8) : entries;

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading product data.</p>;
  if (!productData) return <p>No product data available.</p>;

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
            {productData.blogTitle}
          </h1>

          <div className="flex items-center gap-6 mb-6">
            {renderStars(productData.rating)}
            <span className="text-sm text-gray-600">
              {productData.totalReviews} reviews analyzed
            </span>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                getConfidenceLevel(productData.confidenceScore).color
              }`}
            >
              {getConfidenceLevel(productData.confidenceScore).text} confidence
            </span>
          </div>
        </header>

        {/* Hero Image */}
        <div className="mb-8 flex justify-center">
          <img
            src={productData.image}
            alt={productData.title}
            className="w-1/3 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg object-contain rounded-lg shadow-sm bg-gray-50"
          />
        </div>

        {/* Quick Verdict */}
        <section className="mb-8 p-6 bg-gray-50 rounded-lg">
          <h2 className="text-xl font-semibold mb-3 text-gray-900">Our Take</h2>
          <p className="text-gray-700 leading-relaxed">{productData.verdict}</p>
        </section>

        {/* Specifications Table */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-900">
            Specifications
          </h2>
          <div className="overflow-hidden rounded-lg border border-gray-200">
            {visibleEntries.map(([key, value], index) => (
              <div
                key={key}
                className={`flex justify-between px-4 py-3 ${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                } ${
                  index === visibleEntries.length - 1
                    ? ""
                    : "border-b border-gray-200"
                }`}
              >
                <span className="text-gray-700">{key}</span>
                <span className="font-medium text-gray-900 text-right max-w-md">
                  {value}
                </span>
              </div>
            ))}
          </div>

          {hasMore && !showAll && (
            <button
              onClick={() => setShowAll(true)}
              className="mt-3 text-blue-600 font-medium hover:underline"
            >
              See More
            </button>
          )}

          {/* Overlay Modal */}
          {showAll && (
            <div
              className="fixed inset-0 bg-black/30 flex items-center justify-center z-50"
              onClick={() => setShowAll(false)}
            >
              <div
                className="bg-white w-full max-w-2xl rounded-lg shadow-lg p-6 relative"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setShowAll(false)}
                  className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
                >
                  ✕
                </button>
                <h3 className="text-lg font-semibold mb-4">
                  All Specifications
                </h3>
                <div className="max-h-[70vh] overflow-y-auto rounded-lg border border-gray-200">
                  {entries.map(([key, value], index) => (
                    <div
                      key={key}
                      className={`flex justify-between px-4 py-3 ${
                        index % 2 === 0 ? "bg-white" : "bg-gray-50"
                      } ${
                        index === entries.length - 1
                          ? ""
                          : "border-b border-gray-200"
                      }`}
                    >
                      <span className="text-gray-700">{key}</span>
                      <span className="font-medium text-gray-900 text-right max-w-md">
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Performance Scores - Iconic Box Style */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-900">
            Performance Breakdown
          </h2>
          <div className="flex flex-wrap gap-4 justify-center">
            {productData.featureScores
              .filter((feature: Feature) => feature.score > 0)
              .map((feature: Feature) => {
                let FeatureIcon: React.ElementType;
                switch (feature.name.toLowerCase()) {
                  case "battery range":
                    FeatureIcon = Battery;
                    break;
                  case "speed performance":
                    FeatureIcon = Zap;
                    break;
                  case "ride comfort":
                    FeatureIcon = Users;
                    break;
                  case "build quality":
                    FeatureIcon = Hammer;
                    break;
                  case "portability":
                    FeatureIcon = Package;
                    break;
                  case "safety features":
                    FeatureIcon = Shield;
                    break;
                  case "tire wheels":
                    FeatureIcon = Circle;
                    break;
                  case "value for money":
                    FeatureIcon = DollarSign;
                    break;
                  default:
                    FeatureIcon = CheckCircle;
                }

                return (
                  <div
                    key={feature.name}
                    className="flex flex-col items-start justify-between p-4 w-[220px] bg-gray-50 rounded-lg shadow-sm"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <FeatureIcon className="text-blue-600" size={18} />
                      <span className="font-medium text-gray-900 capitalize">
                        {feature.name.replaceAll("_", " ")}
                      </span>
                    </div>
                    <div className="flex items-center justify-between w-full">
                      <span
                        className={`font-bold text-lg px-2 py-1 rounded shadow-sm ${
                          feature.score >= 4
                            ? "text-green-700 bg-green-50"
                            : feature.score >= 2
                            ? "text-yellow-700 bg-yellow-50"
                            : "text-red-700 bg-red-50"
                        }`}
                      >
                        {feature.score} / 5
                      </span>
                      <span className="px-2 py-0.5 bg-gray-200 rounded-full text-sm">
                        {feature.mentions} mentions
                      </span>
                    </div>
                  </div>
                );
              })}
          </div>
        </section>

        {/* Pros and Cons */}
        <section className="mb-8">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Pros */}
            <div className="bg-green-50 rounded-lg p-6">
              <h3 className="flex items-center gap-2 text-lg font-semibold text-green-800 mb-4">
                <CheckCircle size={20} />
                What We Like
              </h3>
              <ul className="space-y-3">
                {productData.pros.map((pro: ProsCons, index: number) => (
                  <li
                    key={index}
                    className="text-green-700 text-sm leading-relaxed"
                  >
                    <span className="font-semibold">{pro.feature}</span>
                    <ExpandableText text={pro.reason} maxLength={120} />
                  </li>
                ))}
              </ul>
            </div>

            {/* Cons */}
            <div className="bg-red-50 rounded-lg p-6">
              <h3 className="flex items-center gap-2 text-lg font-semibold text-red-800 mb-4">
                <XCircle size={20} />
                What Could Be Better
              </h3>
              <ul className="space-y-3">
                {productData.cons.map((con: ProsCons, index: number) => (
                  <li
                    key={index}
                    className="text-red-700 text-sm leading-relaxed"
                  >
                    <span className="font-semibold">{con.feature}</span>
                    <ExpandableText text={con.reason} maxLength={120} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* User Segments */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-900">
            Who This Is For
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {productData.userSegments.map((segment: Segment) => (
              <div
                key={segment.segment}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <Users size={20} className="text-blue-600" />
                  <span className="font-medium text-gray-900">
                    {segment.segment}
                  </span>
                  <span className="text-sm text-gray-600">
                    ({segment.percentage}% of users)
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {renderStars(segment.satisfaction)}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
