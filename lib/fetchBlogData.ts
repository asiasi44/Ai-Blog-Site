// lib/fetchBlogData.ts
import clientPromise from "@/lib/db";
import { ProductType } from "@/types";

export async function fetchBlogDataByAsin(
  asin: string
): Promise<ProductType | null> {
  try {
    const client = await clientPromise;
    const db = client.db();
    const blogAnalysisCol = db.collection<ProductType>("blogAnalysis");

    const analyzedProduct = await blogAnalysisCol.findOne(
      { asin },
      {
        projection: {
          _id: 0,
          title: 1,
          asin: 1,
          overall_rating: 1,
          highlights: 1,
          reviewCount: 1,
          category: 1,
          features: 1,
          specifications: 1,
          introduction: 1,
          image: 1,
          final_verdict: 1,
        },
      }
    );

    return analyzedProduct; // directly return the product or null
  } catch (error) {
    console.error(error);
    return null; // always return ProductType | null
  }
}