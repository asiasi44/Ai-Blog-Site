"use client";
import { ProductType } from "@/types";
import { getAmazonLink } from "@/lib/functions/utils";
import { THEME } from "@/lib/design/theme";
import AffiliateLink, { AffiliateDisclosure } from "@/components/AffiliateLink";
import { Check } from "lucide-react";

const FeatureCard = ({
  name,
  rating,
  verdict,
}: {
  name: string;
  rating: string;
  verdict: string;
}) => {
  const ratingNum = Number(rating ?? 0);

  return (
    <div className="bg-white rounded-2xl p-6 sm:p-8 transition-all duration-300 border border-gray-200 hover:border-blue-300 hover:shadow-lg hover:-translate-y-1">
      <div className="flex justify-between items-start mb-4 gap-4 flex-wrap">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-900 capitalize flex-1 min-w-0">
          {name}
        </h3>
        <div className="flex items-center gap-2 bg-gradient-to-r from-amber-50 to-orange-50 px-4 py-2 rounded-full whitespace-nowrap flex-shrink-0">
          <span className="text-amber-500 text-lg">★</span>
          <span className="font-bold text-gray-900">
            {ratingNum.toFixed(1)}
          </span>
        </div>
      </div>
      <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
        {verdict}
      </p>
    </div>
  );
};

const SpecCard = ({ label, value }: { label: string; value: string }) => {
  return (
    <div className="bg-white p-4 sm:p-6 transition-colors duration-200 hover:bg-blue-50">
      <div className="text-xs text-gray-500 uppercase tracking-wider mb-2 font-medium">
        {label}
      </div>
      <div className="text-sm sm:text-base text-gray-900 font-semibold leading-snug break-words">
        {value}
      </div>
    </div>
  );
};

export default function ProductPageById({
  productData,
}: {
  productData: ProductType;
}) {
  const sortedFeatures = [...(productData.features ?? [])].sort(
    (a, b) => Number(b.rating ?? 0) - Number(a.rating ?? 0),
  );
  const ratingValue = Number(productData.overall_rating ?? 0);

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Sticky CTA for Mobile */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-3 shadow-lg z-40">
        <AffiliateLink
          href={productData.asin ? getAmazonLink(productData.asin) : "#"}
          variant="button"
          className="w-full justify-center text-base"
        >
          Buy on Amazon Now
        </AffiliateLink>
      </div>

      {/* Mobile padding to account for sticky CTA */}
      <div className="md:hidden h-24" />

      {/* ========== HERO SECTION ========== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-12 sm:py-20">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-16 items-start">
          {/* Left: Product Info */}
          <div>
            {/* Product Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-tight">
              {productData.title ?? "Untitled Product"}
            </h1>

            {/* Rating & Reviews */}
            <div className="flex items-center gap-4 mb-6 flex-wrap">
              <div
                className="inline-flex items-center gap-3 px-6 py-3 rounded-full"
                style={{
                  backgroundColor: THEME.accent[50],
                  borderColor: THEME.accent[200],
                }}
              >
                <span className="text-amber-500 text-xl">★</span>
                <span className="font-bold text-gray-900 text-xl">
                  {ratingValue.toFixed(1)}
                </span>
                <span className="text-gray-600 text-sm">
                  ({productData.reviewCount ?? "N/A"} reviews)
                </span>
              </div>
            </div>

            {/* Introduction/Description */}
            <p className="text-lg sm:text-xl text-gray-600 mb-8 leading-relaxed">
              {productData.introduction ?? ""}
            </p>

            {/* Key Highlights */}
            {productData.highlights && productData.highlights.length > 0 && (
              <div className="mb-10 p-4 sm:p-6 bg-blue-50 rounded-xl border border-blue-200">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Check className="w-5 h-5 text-blue-600" /> Key Highlights
                </h3>
                <ul className="space-y-2">
                  {productData.highlights.slice(0, 5).map((highlight, i) => (
                    <li
                      key={i}
                      className="text-sm sm:text-base text-gray-700 flex gap-2"
                    >
                      <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Main CTA - Desktop */}
            <div className="hidden md:flex gap-3 flex-wrap">
              <AffiliateLink
                href={productData.asin ? getAmazonLink(productData.asin) : "#"}
                variant="button"
                showIcon={true}
                disclosure="full"
              >
                Check Price on Amazon
              </AffiliateLink>
            </div>
          </div>

          {/* Right: Product Image */}
          <div className="w-full flex items-center justify-center">
            <div
              className="w-full aspect-square rounded-2xl flex items-center justify-center overflow-hidden shadow-lg bg-gradient-to-br from-gray-100 to-gray-50"
              style={{
                backgroundImage: `url(${productData.image ?? "/icon.png"})`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
              }}
            />
          </div>
        </div>
      </section>

      {/* ========== AFFILIATE DISCLOSURE ========== */}
      <section className="bg-amber-50 py-6 sm:py-8 px-4 sm:px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <AffiliateDisclosure />
        </div>
      </section>

      {/* ========== FEATURES SECTION ========== */}
      <section className="bg-white py-16 sm:py-24 px-4 sm:px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-3 sm:mb-4">
              What Customers Are Saying
            </h2>
            <p className="text-lg sm:text-xl text-gray-600">
              Real feedback from verified users about their experience with this
              product
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedFeatures.map((feature, i) => (
              <FeatureCard
                key={i}
                name={feature.name}
                rating={feature.rating}
                verdict={feature.verdict}
              />
            ))}
          </div>

          {sortedFeatures.length > 6 && (
            <div className="mt-8 text-center">
              <p className="text-gray-600 text-sm sm:text-base">
                +{sortedFeatures.length - 6} more feature reviews available on
                Amazon
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ========== SPECIFICATIONS SECTION ========== */}
      <section
        className="py-16 sm:py-24 px-4 sm:px-6 lg:px-12"
        style={{ backgroundColor: THEME.neutral[50] }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-3 sm:mb-4">
              Technical Specifications
            </h2>
            <p className="text-lg sm:text-xl text-gray-600">
              Complete details to help you make an informed decision
            </p>
          </div>

          {(productData.specifications ?? []).length > 0 ? (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-px bg-gray-300 border border-gray-300 rounded-xl overflow-hidden">
              {(productData.specifications ?? []).map((spec, i) => (
                <SpecCard
                  key={i}
                  label={spec.name ?? ""}
                  value={spec.value ?? ""}
                />
              ))}
            </div>
          ) : (
            <div className="p-8 text-center bg-white rounded-lg border border-gray-200">
              <p className="text-gray-600">
                Full specifications available on Amazon
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ========== VERDICT SECTION ========== */}
      <section
        className="py-16 sm:py-24 px-4 sm:px-6 lg:px-12"
        style={{ backgroundColor: THEME.primary[600] }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-white">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6 sm:mb-8">
              Our Final Verdict
            </h2>
            <p className="text-lg sm:text-xl mb-8 leading-relaxed opacity-95">
              {productData.final_verdict ?? ""}
            </p>

            <AffiliateLink
              href={productData.asin ? getAmazonLink(productData.asin) : "#"}
              variant="button"
              disclosure="compact"
              className="!text-base sm:!text-lg"
            >
              View on Amazon to See All Reviews
            </AffiliateLink>
          </div>
        </div>
      </section>

      {/* ========== COMPARISON/RECOMMENDATION CTA ========== */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-12 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
            Need Help Comparing Products?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Use our priority ranker to compare this product with others in the
            same category
          </p>
          <button
            className="px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold text-white transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            style={{ backgroundColor: THEME.primary[600] }}
            onClick={() => window.history.back()}
          >
            ← Back to Rankings
          </button>
        </div>
      </section>
    </div>
  );
}
