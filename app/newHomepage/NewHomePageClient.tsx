"use client";
import Link from "next/link";
import { THEME } from "@/lib/design/theme";
import HeroButton from "@/components/HeroButton";
import { getIconsByName } from "@/lib/functions/getIconsByName";
import { slugify } from "@/lib/functions/slugify";
import {
  Zap,
  Trophy,
  Users,
  TrendingUp,
  ArrowRight,
  Star,
  Shield,
} from "lucide-react";

interface Category {
  _id: string;
  category: string;
}

interface NewHomePageClientProps {
  categories: Category[];
}

export default function NewHomePageClient({
  categories,
}: NewHomePageClientProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-amber-50 opacity-60" />
        <div className="absolute top-20 right-10 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-amber-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-2000" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-20 sm:py-32">
          <div className="text-center">
            {/* Badge */}
            <div className="inline-block mb-6 px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold">
              🎯 Smart Product Recommendations
            </div>

            {/* Main Headline */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-tight">
              <span className="text-gray-900">Find Your Perfect</span>
              <br />
              <span
                style={{ color: THEME.primary[600] }}
                className="bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent"
              >
                Product Match
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-xl sm:text-2xl text-gray-600 max-w-2xl mx-auto mb-12 leading-relaxed">
              Get AI-powered product rankings tailored to{" "}
              <span className="font-semibold text-gray-900">
                YOUR priorities
              </span>
              . Stop scrolling through reviews. Start making smarter buying
              decisions in seconds.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <HeroButton
                href="/#categories"
                variant="primary"
                baseColor={THEME.primary[600]}
                hoverColor={THEME.primary[700]}
              >
                Explore Products <ArrowRight className="inline ml-2 w-5 h-5" />
              </HeroButton>
              <HeroButton
                href="/subscribe-to-newsletter?utm_source=hero"
                variant="secondary"
                baseColor={THEME.accent[600]}
                hoverColor={THEME.accent[100]}
                backgroundColor={THEME.accent[50]}
                borderColor={THEME.accent[500]}
              >
                Get Recommendations <Zap className="inline ml-2 w-5 h-5" />
              </HeroButton>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-600 mb-12">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-green-600" />
                <span>Real Product Data</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-600" />
                <span>Thousands of Users</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-amber-500" />
                <span>Amazon Verified</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========== HOW IT WORKS ========== */}
      <div className="py-20 sm:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              How RankNest Works
            </h2>
            <p className="text-xl text-gray-600">
              Get personalized recommendations in 3 simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "🎯",
                title: "Pick Your Category",
                description:
                  "Choose from electronics, home, sports, and more. Browse the products in your favorite categories.",
              },
              {
                icon: "⚙️",
                title: "Set Your Priorities",
                description:
                  "Tell us what matters most - price, quality, features, durability, or design. Adjust weights as needed.",
              },
              {
                icon: "⭐",
                title: "Get Rankings",
                description:
                  "See products ranked by YOUR priorities with detailed comparisons and real customer feedback.",
              },
            ].map((step, i) => (
              <div
                key={i}
                className="p-8 rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-100 hover:border-blue-200 transition-all duration-300 hover:shadow-lg"
              >
                <div className="text-5xl mb-4">{step.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ========== CATEGORIES SECTION ========== */}
      <div
        className="py-20 sm:py-32"
        id="categories"
        style={{ backgroundColor: THEME.neutral[50] }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="text-center mb-16">
            <div className="inline-block mb-4 px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold">
              📦 Popular Categories
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              What Are You Looking For Today?
            </h2>
            <p className="text-xl text-gray-600">
              Start ranking products by your priorities
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {categories.slice(0, 8).map((category, index) => {
              const Icon = getIconsByName(category.category || "");
              const slug = slugify(category.category);
              return (
                <Link
                  key={`${category._id}-${index}`}
                  href={`/priorityRanker/${slug}`}
                  className="group p-6 sm:p-8 rounded-2xl bg-white border-2 border-gray-100 hover:border-blue-300 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                >
                  <div className="flex flex-col items-center text-center gap-4">
                    <div
                      className="p-4 rounded-xl text-4xl group-hover:scale-110 transition-transform duration-300"
                      style={{ backgroundColor: THEME.primary[50] }}
                    >
                      <Icon className="w-8 h-8 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 capitalize group-hover:text-blue-600 transition-colors">
                        {category.category}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        Find your perfect match
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ArrowRight className="w-5 h-5 text-blue-600" />
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/#categories"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-blue-600 font-semibold border-2 border-blue-200 hover:border-blue-600 hover:bg-blue-50 transition-all duration-300"
            >
              View All Categories
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* ========== FEATURES SECTION ========== */}
      <div className="py-20 sm:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
                Why You&apos;ll Love RankNest
              </h2>
              <div className="space-y-6">
                {[
                  {
                    icon: Trophy,
                    title: "Smart Rankings",
                    desc: "AI-powered rankings based on your specific priorities, not generic ratings.",
                  },
                  {
                    icon: TrendingUp,
                    title: "Real Data",
                    desc: "Verified customer reviews and specifications from Amazon to ensure accuracy.",
                  },
                  {
                    icon: Zap,
                    title: "Save Time",
                    desc: "Stop comparing 100+ reviews. Get actionable insights in seconds.",
                  },
                  {
                    icon: Users,
                    title: "Community Trusted",
                    desc: "Thousands of buyers trust RankNest for smarter purchasing decisions.",
                  },
                ].map((feature, i) => {
                  const Icon = feature.icon;
                  return (
                    <div key={i} className="flex gap-4">
                      <div
                        className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: THEME.primary[100] }}
                      >
                        <Icon
                          className="w-6 h-6"
                          style={{ color: THEME.primary[600] }}
                        />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {feature.title}
                        </h3>
                        <p className="text-gray-600">{feature.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div
              className="rounded-2xl p-8 sm:p-12 text-white text-center"
              style={{ backgroundColor: THEME.primary[600] }}
            >
              <div className="text-6xl font-bold mb-4">🎯</div>
              <h3 className="text-2xl font-bold mb-4">
                Get Your Perfect Product Today
              </h3>
              <p className="text-blue-100 mb-8 text-lg leading-relaxed">
                Stop wasting time on generic product reviews. Get{" "}
                <span className="font-semibold">personalized rankings</span>{" "}
                that match your exact needs.
              </p>
              <Link
                href="/#categories"
                className="inline-block px-8 py-3 rounded-full bg-white text-blue-600 font-bold hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                Start Ranking Now
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ========== CTA FOOTER ========== */}
      <div
        className="py-16 sm:py-20"
        style={{ backgroundColor: THEME.accent[50] }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-12 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Never Miss Product Recommendations
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Get early access to new categories and personalized buying guides
            delivered to your inbox.
          </p>
          <Link
            href="/subscribe-to-newsletter?utm_source=cta_footer"
            className="inline-block px-8 py-4 rounded-full font-bold text-lg text-white transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            style={{ backgroundColor: THEME.accent[500] }}
          >
            Subscribe Now (It&apos;s Free!)
          </Link>
        </div>
      </div>
    </div>
  );
}
