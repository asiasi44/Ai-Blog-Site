// app/api/product/route.ts
import { NextResponse } from "next/server";
import clientPromise from "@/lib/db";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();

    const analysis_col = db.collection("blogAnalysis");

    // Fetch only asin, rating, and title
    const analyzedProducts = await analysis_col
      .find(
        {},
        {
          projection: {
            _id: 0,
            asin: 1,
            overall_rating: 1,
            slug: 1,
            title: 1,
            highlights: 1,
            reviewCount: 1,
            category: 1,
            image: 1,
          },
        }
      )
      .toArray();

    return NextResponse.json({ analyzedProducts });
  } catch (error: unknown) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
