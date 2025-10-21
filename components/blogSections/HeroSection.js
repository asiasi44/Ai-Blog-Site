import { Star } from "lucide-react";
import AmazonButton from "../common/AmazonButton";
import { getConfidenceLevel } from "../../lib/utils";
import Image from "next/image";
// The main hero section of the product page.
const HeroSection = ({ productData }) => {
  const confidenceInfo = getConfidenceLevel(productData.confidenceScore);

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700">
      <div className="absolute inset-0 bg-black opacity-20"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-white">
            <h1 className="text-5xl font-bold leading-tight mb-6 animate-fade-in">
              {productData.title}
            </h1>
            <div className="flex items-center mb-6 space-x-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-6 h-6 ${
                      i < Math.floor(productData.rating)
                        ? "text-yellow-400 fill-current"
                        : "text-gray-300"
                    }`}
                  />
                ))}
                <span className="ml-2 text-lg font-semibold">
                  {productData.rating}
                </span>
              </div>
              <span className="text-blue-200">
                ({productData.totalReviews} reviews)
              </span>
            </div>
            <div className="mb-8">
              <AmazonButton asin={productData.asin} size="large" />
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 mb-6">
              <div className="flex items-center justify-between text-sm mb-2">
                <span>Analysis Quality</span>
                <div
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${confidenceInfo.bgColor} ${confidenceInfo.textColor}`}
                >
                  {confidenceInfo.level}
                </div>
              </div>
              <div className="text-xs text-blue-200">
                Based on {productData.analyzedReviews} review analysis •{" "}
                {productData.confidenceScore}% confidence
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="relative z-10 bg-white rounded-2xl shadow-2xl p-4 transform rotate-3 hover:rotate-0 transition-transform duration-300">
              <Image
                src={productData.image}
                alt={productData.title}
                className="w-full h-auto rounded-lg object-contain"
              />
              <div className="mt-4 text-center">
                <AmazonButton
                  asin={productData.asin}
                  size="small"
                  variant="outline"
                  className="bg-white/90"
                />
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl blur-xl opacity-30 transform rotate-6"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
