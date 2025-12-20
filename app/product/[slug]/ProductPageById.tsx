import { ProductType } from "@/types";
import Link from "next/link";
import { getAmazonLink } from "@/lib/utils"; // Import the helper function

const FeatureCard = ({
  name,
  rating,
  verdict,
}: {
  name: string;
  rating: string;
  verdict: string;
}) => {
  const rounded = Math.round(Number(rating) || 0);
  const stars = "★".repeat(rounded) + "☆".repeat(5 - rounded);
  return (
    <div className="bg-white rounded-2xl p-8 transition-all duration-300 border border-gray-200 hover:-translate-y-1 hover:shadow-xl hover:border-gray-300 cursor-pointer">
      <div className="flex justify-between items-start mb-4 gap-4">
        <h3 className="text-xl font-semibold text-gray-900 capitalize">
          {name}
        </h3>
        <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full whitespace-nowrap">
          <span className="text-orange-500 text-sm">{stars}</span>
          <span className="font-bold text-gray-900">
            {Number(rating ?? 0).toFixed(2)}
          </span>
        </div>
      </div>
      <p className="text-gray-600 leading-relaxed">{verdict}</p>
    </div>
  );
};

/* ---------------- Spec Card ---------------- */

const SpecCard = ({ label, value }: { label: string; value: string }) => {
  return (
    <div className="bg-white p-6 transition-colors duration-200 hover:bg-gray-50">
      <div className="text-xs text-gray-500 uppercase tracking-wider mb-2 font-medium">
        {label}
      </div>
      <div className="text-base text-gray-900 font-semibold leading-snug">
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
  // sort features by rating (array-safe)
  const sortedFeatures = [...productData.features].sort(
    (a, b) => Number(b.rating) - Number(a.rating)
  );

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* ---------------- Hero Section ---------------- */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="lg:pr-8">
            <h1 className="text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-tight">
              {productData.title}
            </h1>

            <p className="text-xl text-gray-600 mb-10 leading-relaxed">
              {productData.introduction}
            </p>

            <div className="flex gap-4 items-center flex-wrap">
              <div className="inline-flex items-center gap-4 bg-gray-100 px-7 py-4 rounded-full">
                <span className="text-orange-500 text-2xl tracking-wider">
                  {"★".repeat(Math.round(productData.overall_rating)) +
                    "☆".repeat(5 - Math.round(productData.overall_rating))}
                </span>
                <span className="text-3xl font-semibold text-gray-900">
                  {productData.overall_rating}
                </span>
              </div>

              <Link
                href={getAmazonLink(productData.asin)}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 text-white px-10 py-4 text-center rounded-full text-lg font-medium transition-all duration-300 shadow-lg hover:bg-blue-700 hover:-translate-y-0.5 hover:shadow-xl"
              >
                View on Amazon
              </Link>
            </div>
          </div>

          <div
            className="w-full h-96 lg:h-[600px] rounded-3xl flex items-center justify-center overflow-hidden shadow-2xl bg-gray-100"
            style={{
              backgroundImage: `url(${productData.image})`,
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
          />
        </div>
      </div>

      {/* ---------------- Features Section ---------------- */}
      <div className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold tracking-tight mb-3">
              What Customers Are Saying
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl">
              Real feedback from verified usersocky users about their experience
            </p>
          </div>

          <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {sortedFeatures.map((feature, i) => (
              <FeatureCard
                key={i}
                name={feature.name}
                rating={feature.rating}
                verdict={feature.verdict}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ---------------- Specifications Section ---------------- */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold tracking-tight mb-3">
              Technical Specifications
            </h2>
            <p className="text-xl text-gray-600">
              All the details you need to know
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-px bg-gray-200 border border-gray-200 rounded-xl overflow-hidden">
            {productData.specifications.map((spec, i) => (
              <SpecCard key={i} label={spec.name} value={spec.value} />
            ))}
          </div>
        </div>
      </div>

      {/* ---------------- Verdict Section ---------------- */}
      <div className="bg-gray-900 text-gray-100 py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold tracking-tight mb-3">
              The Bottom Line
            </h2>
            <p className="text-xl text-gray-400">Our comprehensive analysis</p>
          </div>

          <p className="text-2xl leading-relaxed max-w-4xl mb-8">
            {productData.final_verdict}
          </p>

          <a
            href={`https://www.amazon.com/dp/${productData.asin}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-orange-500 text-lg font-medium transition-all duration-300 hover:gap-4"
          >
            Read all reviews on Amazon →
          </a>
        </div>
      </div>
    </div>
  );
}
