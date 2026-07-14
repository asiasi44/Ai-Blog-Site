// app/product/[slug]/page.tsx
import { ProductType } from "@/types";
import ProductPageById from "./ProductPageById";
import clientPromise from "@/lib/db";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { slugify } from "@/lib/functions/slugify";
import { Metadata } from "next";
import { notFound } from "next/navigation";

// Revalidate every 1 hour
export const revalidate = 3600;

export const dynamicParams = false;

const PUBLIC_STATUSES = ["legacy", "published"];

// Fetch a single product from MongoDB
async function getProduct(slug: string): Promise<ProductType> {
  const client = await clientPromise;
  const db = client.db();

  const product = await db.collection<ProductType>("blogAnalysis").findOne(
    {
      slug,
      status: { $in: PUBLIC_STATUSES },
    },
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
    },
  );

  if (!product) notFound();

  return product;
}

// Pre-generate pages for all ASINs at build time
export async function generateStaticParams() {
  const client = await clientPromise;
  const db = client.db();

  const products = await db
    .collection("blogAnalysis")
    .find(
      { status: { $in: PUBLIC_STATUSES } },
      { projection: { slug: 1, _id: 0 } },
    )
    .toArray();

  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const client = await clientPromise;

  const db = client.db();

  const { slug } = await params;
  const product = await db.collection("blogAnalysis").findOne(
    {
      slug,
      status: { $in: PUBLIC_STATUSES },
    },
    {
      projection: {
        title: 1,
        category: 1,
        overall_rating: 1,
        image: 1,
        status: 1,
      },
    },
  );

  if (!product) {
    return {
      title: "Product Not Found | RankNest",
    };
  }

  const title = product.title;

  const category =
    product.category?.charAt(0).toUpperCase() + product.category?.slice(1);

  return {
    title: `${title} - ${category} Review `,

    description: `Detailed review and AI-powered analysis of ${title}. Compare ratings, features, and real user insights before you buy.`,

    openGraph: {
      title: `${title} Review`,

      description: `Check performance, reviews, and rankings for ${title}.`,

      images: product.image ? [product.image] : [],
    },
    robots: {
      index: product.status === "published",
      follow: true,
    },
  };
}

// Dynamic page component
export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProduct(slug);

  const categorySlug = product.category ? slugify(product.category) : "";

  return (
    <>
      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b border-gray-200 sticky top-20 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-3 sm:py-4">
          <div className="flex items-center gap-2 text-sm overflow-x-auto">
            <Link
              href="/"
              className="flex items-center gap-1 text-gray-600 hover:text-blue-600 transition-colors flex-shrink-0"
            >
              <Home className="w-4 h-4" />
              <span className="hidden sm:inline">Home</span>
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
            {categorySlug && (
              <>
                <Link
                  href={`/priorityRanker/${categorySlug}`}
                  className="text-gray-600 hover:text-blue-600 transition-colors truncate"
                >
                  {product.category}
                </Link>
                <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
              </>
            )}
            <span className="text-blue-600 font-semibold truncate">
              {product.title}
            </span>
          </div>
        </div>
      </div>

      <ProductPageById productData={product} />
    </>
  );
}
