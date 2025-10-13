import ProductList from "./ProductList";
import { Product } from "@/types";
import clientPromise from "@/lib/db";

async function fetchProducts(): Promise<Product[]> {
  const client = await clientPromise;
  const db = client.db();
  const rawProducts = await db
    .collection("analysis")
    .find(
      {},
      { projection: { _id: 0, asin: 1, avg_rating: 1, title: 1, gemini_output: 1 } }
    )
    .toArray();

  // Map to Product[]
  const products: Product[] = rawProducts.map(p => ({
    asin: p.asin,
    title: p.title,
    avg_rating: p.avg_rating,
    gemini_output: p.gemini_output,
  }));

  return products;
}

export default async function HomePage() {
  const products = await fetchProducts();

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <div className="max-w-4xl mx-auto p-6">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Product Reviews</h1>
        </header>
        <ProductList products={products} />
      </div>
    </div>
  );
}

// ISR: rebuild page every hour
export const revalidate = 3600;