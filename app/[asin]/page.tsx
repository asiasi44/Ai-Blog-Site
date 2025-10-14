// app/[asin]/page.tsx
import ProductReviewBlog from "./ProductReviewBlog";
import { fetchBlogDataByAsin, ProductBlogData } from "@/lib/fetchBlogData";
import { fetchProducts } from "@/lib/fetchProducts";

type Props = { params: Promise<{ asin: string }> };

// ISR: rebuild every hour
export const revalidate = 3600;

export default async function ProductPage({ params }: Props) {
  const { asin } = await params;

  const productData: ProductBlogData | null = await fetchBlogDataByAsin(asin);

  if (!productData) {
    return (
      <div className="p-8 text-center text-gray-600">Product not found.</div>
    );
  }

  // ProductReviewBlog can be a "use client" component
  return <ProductReviewBlog productData={productData} />;
}

export async function generateStaticParams() {
  const products = await fetchProducts();
  return products.slice(0, 100).map(p => ({ asin: p.asin }));
}