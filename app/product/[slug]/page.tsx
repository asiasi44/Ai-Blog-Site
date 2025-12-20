// app/product/[asin]/page.tsx
import { ProductType } from "@/types";
import ProductPageById from "./ProductPageById";
import clientPromise from "@/lib/db";

// Revalidate every 1 hour
export const revalidate = 3600;

// Fetch a single product from MongoDB
async function getProduct(slug: string): Promise<ProductType> {
  const client = await clientPromise;
  const db = client.db();

  const product = await db.collection<ProductType>("blogAnalysis").findOne(
    { slug },
    {
      projection: {
        _id: 0,
        asin: 1,
        title: 1,
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

  if (!product) throw new Error("Product not found");

  return product;
}

// Pre-generate pages for all ASINs at build time
export async function generateStaticParams() {
  const client = await clientPromise;
  const db = client.db();

  const products = await db
    .collection("blogAnalysis")
    .find({}, { projection: { slug: 1, _id: 0 } })
    .toArray();

  return products.map((p) => ({ slug: p.slug }));
}

// Dynamic page component
export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProduct(slug);

  return <ProductPageById productData={product} />;
}