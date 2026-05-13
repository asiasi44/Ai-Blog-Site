// app/products/page.tsx
import "./styles.css";
import { ProductType } from "@/types";
import ProductsClient from "@/components/ProductPage";
import clientPromise from "@/lib/db";

async function getProducts(): Promise<ProductType[]> {
  const client = await clientPromise;
  const db = client.db();
  const analysis_col = db.collection("blogAnalysis");

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
      },
    )
    .toArray();

  return analyzedProducts.map((doc) => ({
    asin: doc.asin,
    overall_rating: doc.overall_rating,
    slug: doc.slug,
    title: doc.title,
    highlights: doc.highlights,
    reviewCount: doc.reviewCount,
    category: doc.category,
    image: doc.image,
  })) as ProductType[];
}

export default async function ProductsPage() {
  const products = await getProducts();
  return <ProductsClient products={products} />;
}

export const revalidate = 3600;
