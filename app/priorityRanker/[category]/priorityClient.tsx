"use client";
import { ProductType } from "@/lib/types/product";
import AdjustFilters from "./filter/adjustFilter";
import ProductsList from "./list";
import { useState } from "react";
import { FeatureType, FeatureWithPriority } from "./type";

export default function PriorityClient({
  currentCategory,
  productsByCategory,
}: {
  currentCategory: { category: string; _id: string; features: FeatureType[] };
  productsByCategory: ProductType[];
}) {
  const [featureWithPriority, setFeatureWithPriority] = useState<FeatureWithPriority[]>(
    currentCategory.features?.map((f) => ({ ...f, priority: 1 })),
  );

  const anyBoosted = featureWithPriority.some((f) => f.priority > 1);

  return (
    <div className="flex flex-col lg:flex-row gap-6 items-start">
      <div className="w-full lg:w-52 lg:shrink-0 lg:sticky lg:top-32 bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="px-4 pt-3 pb-2.5 border-b border-gray-100 flex items-center justify-between">
          <span className="text-[11px] font-semibold uppercase tracking-widest text-gray-400">
            Priorities
          </span>
          {anyBoosted && (
            <span className="inline-flex items-center gap-1 text-[10px] font-medium text-green-700 bg-green-50 px-2 py-0.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              live
            </span>
          )}
        </div>
        <div className="overflow-y-auto max-h-64 lg:max-h-[calc(100vh-11rem)] px-3 py-2">
          <AdjustFilters
            featureWithPriority={featureWithPriority}
            setFeatureWithPriority={setFeatureWithPriority}
          />
        </div>
      </div>

      <div className="flex-1 min-w-0 w-full">
        <ProductsList
          products={productsByCategory}
          featureWithPriority={featureWithPriority}
        />
      </div>
    </div>
  );
}