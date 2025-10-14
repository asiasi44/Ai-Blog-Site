// lib/fetchBlogData.ts
import clientPromise from "@/lib/db";

export type UserSegment = {
  segment: string;
  satisfaction: number;
  percentage: number;
};

export type FeatureScore = {
  name: string;
  score: number;
  mentions: number;
  confidence: number;
};

export type ProsCons = {
  feature: string;
  reason: string;
};

export type ProductBlogData = {
  asin: string;
  title: string;
  image: string;
  rating: number;
  totalReviews: number;
  analyzedReviews: number;
  confidenceScore: number;
  specs: Record<string, string>;
  sentimentDistribution: Record<string, number>;
  featureScores: FeatureScore[];
  commonIssues: string[];
  pros: ProsCons[];
  cons: ProsCons[];
  verdict: string;
  bestFor: string;
  notIdealFor: string;
  blogTitle: string;
  userSegments: UserSegment[];
};

export async function fetchBlogDataByAsin(
  asin: string
): Promise<ProductBlogData | null> {
  const client = await clientPromise;
  const db = client.db();

  const products_col = db.collection("products");
  const analysis_col = db.collection("analysis");

  const product = await products_col.findOne(
    { asin },
    {
      projection: { _id: 0, reviews: 0, aplus_text: 0, details_text: 0, feature_bullets: 0 },
    }
  );

  if (!product || !product.is_analyzed) return null;

  const analysis_data = await analysis_col.findOne({ asin }, { projection: { _id: 0 } });
  if (!analysis_data) return null;

  const featureScores: FeatureScore[] = Object.entries(analysis_data.feature_scores || {}).map(
    ([key, value]) => {
      const f = value as any;
      return {
        name: key.replace("_", " ").replace(/\b\w/g, c => c.toUpperCase()),
        score: f.score || 0,
        mentions: f.mentions || 0,
        confidence: f.confidence || 0,
      };
    }
  );

  const userSegments: UserSegment[] = Object.entries(analysis_data.user_segments || {}).map(
    ([key, value]) => {
      const s = value as any;
      return {
        segment: key.replace("_", " ").replace(/\b\w/g, c => c.toUpperCase()),
        satisfaction: s.satisfaction || 0,
        percentage: s.percentage || 0,
      };
    }
  );

  return {
    asin,
    title: product.title || "",
    image: product.image || "",
    rating: parseFloat(analysis_data.avg_rating || 0),
    totalReviews: parseInt(product.review_count || 0),
    analyzedReviews: parseInt(product.review_count || 0),
    confidenceScore: analysis_data.confidence_score || 0,
    specs: analysis_data.specifications || {},
    sentimentDistribution: analysis_data.sentiment_distribution || {},
    featureScores,
    commonIssues: analysis_data.common_issues || [],
    pros: analysis_data.gemini_output?.pros || [],
    cons: analysis_data.gemini_output?.cons || [],
    verdict: analysis_data.gemini_output?.verdict || "",
    bestFor: analysis_data.gemini_output?.best_for || "",
    notIdealFor: analysis_data.gemini_output?.not_ideal_for || "",
    blogTitle: analysis_data.gemini_output?.title || "",
    userSegments,
  };
}