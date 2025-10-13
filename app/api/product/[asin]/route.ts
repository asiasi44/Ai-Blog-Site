// app/api/product/[asin]/route.ts
import { NextResponse, NextRequest } from "next/server";
import clientPromise from "@/lib/db";

type RawUserSegment = {
  satisfaction: number;
  percentage: number;
};

type UserSegment = {
  segment: string;
  satisfaction: number;
  percentage: number;
};

type RawFeatureScore = {
  score: number;
  mentions: number;
  confidence: number;
};

type FeatureScore = {
  name: string;
  score: number;
  mentions: number;
  confidence: number;
};

export async function GET(req: NextRequest) {
  // Extract params using Next.js new way
  const asin = req.nextUrl.pathname.split("/").pop() || "";

  try {
    const client = await clientPromise;
    const db = client.db();

    const products_col = db.collection("products");
    const analysis_col = db.collection("analysis");

    const product = await products_col.findOne(
      { asin },
      {
        projection: {
          _id: 0,
          reviews: 0,
          aplus_text: 0,
          details_text: 0,
          feature_bullets: 0,
        },
      }
    );

    if (!product) return NextResponse.json({ error: "Product not found" });

    if (!product.is_analyzed)
      return NextResponse.json({
        message:
          "Product not analyzed yet. Please analyze to get blog details.",
      });

    const analysis_data = await analysis_col.findOne(
      { asin },
      { projection: { _id: 0 } }
    );

    if (!analysis_data)
      return NextResponse.json({ error: "Analysis not found" });

    const featureScores: FeatureScore[] = Object.entries(
      analysis_data.feature_scores || {}
    ).map(([key, value]) => {
      const feature = value as RawFeatureScore;
      return {
        name: key.replace("_", " ").replace(/\b\w/g, (c) => c.toUpperCase()),
        score: feature.score || 0,
        mentions: feature.mentions || 0,
        confidence: feature.confidence || 0,
      };
    });

    const userSegments: UserSegment[] = Object.entries(
      analysis_data.user_segments || {}
    ).map(([key, value]) => {
      const segment = value as RawUserSegment;
      return {
        segment: key.replace("_", " ").replace(/\b\w/g, (c) => c.toUpperCase()),
        satisfaction: segment.satisfaction || 0,
        percentage: segment.percentage || 0,
      };
    });

    const response = {
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

    return NextResponse.json({ asin, data: response });
  } catch (error: unknown) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
