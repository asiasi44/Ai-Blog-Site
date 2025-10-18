import { Product } from "@/types";
import clientPromise from "@/lib/db";

export async function fetchProducts(): Promise<Product[]> {
  const client = await clientPromise;
  const db = client.db();
  const rawProducts = await db
    .collection("analysis")
    .find(
      {},
      {
        projection: {
          _id: 0,
          asin: 1,
          avg_rating: 1,
          title: 1,
          gemini_output: 1,
          image: 1,
        },
      }
    )
    .toArray();

  // Map to Product[]
  const products: Product[] = rawProducts.map((p) => ({
    asin: p.asin,
    title: p.title,
    avg_rating: p.avg_rating,
    gemini_output: p.gemini_output,
    image: p.image,
  }));

  return products;
}
