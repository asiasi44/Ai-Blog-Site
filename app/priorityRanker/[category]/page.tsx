import { getProductsByCategory } from "@/lib/fetches/productByCategory";
import PriorityClient from "./priorityClient";
import { THEME } from "@/lib/design/theme";
import Breadcrumb from "@/components/Breadcrumb";
import Link from "next/link";
import dbConnect from "@/lib/mongoose";
import Category from "@/models/Category";
import { ArrowLeft } from "lucide-react";
import { Metadata } from "next";
import { capitalizeWords } from "@/lib/functions/capitalize";

export const revalidate = 86400;

export async function generateStaticParams() {
  await dbConnect();
  const categories = await Category.find({ show: true }).select("slug").lean();
  return categories.map((c) => ({
    category: c.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;

  await dbConnect();

  const categoryDoc = await Category.findOne({ slug: category })
    .select("category")
    .lean();

  const name = categoryDoc?.category
    ? capitalizeWords(categoryDoc.category)
    : "Products";
  return {
    title: `${name} - Smart Product Rankings | RankNest`,

    description: `Compare and rank the best ${name.toLowerCase()} based on your priorities like price, quality, features, and reviews.`,

    openGraph: {
      title: `${name} - Smart Product Rankings`,

      description: `Find the best ${name.toLowerCase()} tailored to your needs.`,

      type: "website",
    },
  };
}

export default async function RankCategory({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const { productsByCategory, currentCategory } =
    await getProductsByCategory(category);

  return (
    <>
      {/* Breadcrumb Navigation */}
      <Breadcrumb
        items={[
          {
            label: "Categories",
            href: "/#categories",
          },
          {
            label: currentCategory?.category || "Products",
          },
        ]}
      />

      <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-gray-50">
        <div className="py-8 sm:py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
            {/* Header */}
            <div className="mb-12 sm:mb-16 text-center">
              <div className="inline-block mb-4 px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold">
                🔍 Smart Product Ranking
              </div>
              <h1
                className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight capitalize mb-4 leading-tight"
                style={{ color: THEME.primary[900] }}
              >
                {currentCategory?.category || "Products"}
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
                Rank these products by YOUR priorities. Adjust the sliders below
                to see products reordered in real-time.
              </p>

              {/* Secondary Navigation */}
              <div className="flex flex-wrap gap-3 justify-center mt-8">
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 text-gray-700 hover:border-blue-300 hover:text-blue-600 transition-colors text-sm font-medium"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Home
                </Link>
                <Link
                  href="/#categories"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-gray-700 hover:text-blue-600 transition-colors text-sm font-medium"
                >
                  Browse All
                </Link>
              </div>
            </div>

            {/* Priority Ranker Component */}
            <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 lg:p-12 border border-gray-100">
              <PriorityClient
                currentCategory={currentCategory}
                productsByCategory={productsByCategory}
              />
            </div>

            {/* Info Section */}
            <div className="mt-12 sm:mt-16 grid md:grid-cols-3 gap-6 sm:gap-8">
              {[
                {
                  icon: "📊",
                  title: "Real Data",
                  desc: "Rankings based on verified Amazon reviews and specifications",
                },
                {
                  icon: "⚙️",
                  title: "Your Control",
                  desc: "Adjust priorities to match exactly what matters to you",
                },
                {
                  icon: "⭐",
                  title: "Instant Results",
                  desc: "See product rankings update as you change your preferences",
                },
              ].map((info, i) => (
                <div
                  key={i}
                  className="p-6 sm:p-8 rounded-xl bg-white border border-gray-100 hover:border-blue-200 transition-all duration-300 hover:shadow-md"
                >
                  <div className="text-4xl mb-3">{info.icon}</div>
                  <h3 className="font-bold text-lg text-gray-900 mb-2">
                    {info.title}
                  </h3>
                  <p className="text-gray-600 text-sm sm:text-base">
                    {info.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
