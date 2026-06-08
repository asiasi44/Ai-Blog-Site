import dbConnect from "@/lib/mongoose";
import BlogAnalysis from "@/models/BlogAnalysis";
import Category from "@/models/Category";
import { unstable_cache } from "next/cache"; // <-- Import the cache wrapper

// 1. Keep your DB logic in an internal helper function
async function fetchRawProductsByCategory(slug: string) {
  await dbConnect();

  const currentCategoryDoc = await Category.findOne({ slug })
    .select("category features")
    .lean();

  if (!currentCategoryDoc) {
    return { productsByCategory: [], currentCategory: { features: [] } };
  }

  const currentCategory = {
    ...currentCategoryDoc,
    _id: currentCategoryDoc._id.toString(),
    features:
      currentCategoryDoc.features?.map((feature: any) => ({
        ...feature,
        _id: feature._id.toString(),
        keywords: Array.isArray(feature.keywords) ? feature.keywords : [],
      })) || [],
  };

  const categoryName = currentCategory?.category || "";

  // Highly Recommended Optimization: Only select what your list component needs
  const productsByCategoryRaw = await BlogAnalysis.find({
    category: categoryName,
  })
    .lean();

  const productsByCategory = productsByCategoryRaw.map((product: any) => ({
    ...product,
    _id: product._id.toString(),
  }));

  return { productsByCategory, currentCategory };
}

// 2. Wrap and export the cached version
export const getProductsByCategory = (slug: string) => {
  return unstable_cache(
    async () => fetchRawProductsByCategory(slug),
    [`products-category-${slug}`], // Unique cache key per slug
    {
      revalidate: 86400, // Cache for 24 hours
      tags: [`category-${slug}`], // Allows manual cache purging later
    },
  )();
};
