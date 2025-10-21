// app/[asin]/page.tsx
import ProductReviewBlog from "./ProductReviewBlog";
import { fetchBlogDataByAsin, ProductBlogData } from "@/lib/fetchBlogData";
import { fetchProducts } from "@/lib/fetchProducts";
import type { Metadata } from "next";

type Props = { params: Promise<{ asin: string }> };

// ISR: rebuild every hour
export const revalidate = 3600;

// ✅ Generate SEO metadata for each product
export async function generateMetadata({
  params,
}: {
  params: Promise<{ asin: string }>;
}): Promise<Metadata> {
  const { asin } = await params;
  const productData: ProductBlogData | null = await fetchBlogDataByAsin(asin);

  if (!productData) {
    return {
      title: "Product Not Found | Asim Reviews",
      description: "This product review could not be found on Asim Reviews.",
    };
  }

  const title = `${productData.title} Review || "Product"} Analysis`;
  const description = `Read a detailed review of ${
    productData.title
  }, including pros, cons, features, and real-world insights. Discover whether this product is worth buying in ${new Date().getFullYear()}.`;
  const keywords = [
    productData.title,
    `${new Date().getFullYear()}`,
    "electric scooter reviews",
    "Asim Reviews",
    "AI product analysis",
    "best gadgets 2025",
  ];

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      url: `https://asimreviews.netlify.app/${asin}`,
      siteName: "Asim Reviews",
      type: "article",
      images: productData.image
        ? [
            {
              url: productData.image,
              width: 800,
              height: 600,
              alt: productData.title,
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: productData.image ? [productData.image] : undefined,
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { asin } = await params;
  const productData: ProductBlogData | null = await fetchBlogDataByAsin(asin);

  if (!productData) {
    return (
      <div className="p-8 text-center text-gray-600">Product not found.</div>
    );
  }

  return <ProductReviewBlog productData={productData} />;
}

// Generate static params for up to 100 products
export async function generateStaticParams() {
  const products = await fetchProducts();
  return products.slice(0, 100).map((p) => ({ asin: p.asin }));
}
