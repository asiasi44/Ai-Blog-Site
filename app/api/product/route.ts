// app/api/product/route.ts
import { NextResponse } from "next/server";
import clientPromise from "@/lib/db";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();

    const analysis_col = db.collection("analysis");

    // Fetch only asin, rating, and title
    const analyzedProducts = await analysis_col
      .find(
        {},
        {
          projection: {
            _id: 0,
            asin: 1,
            avg_rating: 1,
            title: 1,
            gemini_output: 1,
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
