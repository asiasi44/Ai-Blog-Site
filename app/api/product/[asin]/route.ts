// app/api/product/[asin]/route.ts
import { NextResponse } from "next/server";
import clientPromise from "@/lib/db";

export async function GET(
  _req: Request,
  ctx: RouteContext<"/api/product/[asin]">
) {
  const { asin } = await ctx.params;

  try {
    const client = await clientPromise;
    const db = client.db();
    const blogAnalysisCol = db.collection("blogAnalysis");

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

    if (!analyzedProduct) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ asin, product: analyzedProduct });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
