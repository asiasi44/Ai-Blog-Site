import { ProductType } from "@/lib/types/product";
import { FeatureWithPriority } from "./type";

export function rankProductByPriority(
  products: ProductType[],
  featureWithPriority: FeatureWithPriority[],
): ProductType[] {
  // Cache scores once before sorting — avoids recomputing per comparison
  const scoreCache = new Map<string, number>();

  for (const product of products) {
    scoreCache.set(product.asin, getWeightedScore(product, featureWithPriority));
  }

  return [...products].sort((a, b) => {
    return (scoreCache.get(b.asin) ?? 0) - (scoreCache.get(a.asin) ?? 0);
  });
}

function getWeightedScore(
  product: ProductType,
  priorities: FeatureWithPriority[],
): number {
  let weightedSum = 0;
  let prioritySum = 0;

  for (const priorityFeature of priorities) {
    const productFeature = product.features.find(
      (f) => f.name === priorityFeature.name,
    );

    const rating = productFeature ? Number(productFeature.rating) : 0; // 0 if missing
    const weight = priorityFeature.priority;

    weightedSum += rating * weight; // 0 * weight = 0, pulls score down
    prioritySum += weight;          // weight still counts — penalizes the missing feature
  }

  return prioritySum > 0 ? weightedSum / prioritySum : 0;
}