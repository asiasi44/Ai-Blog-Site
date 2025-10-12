import React from "react";
import { TrendingUp, Users, Award, CheckCircle } from "lucide-react";
import AmazonButton from "@/components/common/AmazonButton";
import ScoreBar from "@/components/common/ScoreBar";
import SentimentChart from "@/components/common/SentimentChart";

const OverviewSection = ({ productData }) => (
  <div className="space-y-12">
    {/* Quick Stats */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
        <div className="flex items-center">
          <CheckCircle className="w-8 h-8 text-green-500 mr-3" />
          <div>
            <div className="text-2xl font-bold text-gray-800">
              {productData.sentimentDistribution.positive}%
            </div>
            <div className="text-gray-600">Positive Reviews</div>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
        <div className="flex items-center">
          <TrendingUp className="w-8 h-8 text-blue-500 mr-3" />
          <div>
            <div className="text-2xl font-bold text-gray-800">
              {productData.specs.maxSpeed}
            </div>
            <div className="text-gray-600">Max Speed</div>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Users className="w-8 h-8 text-purple-500 mr-3" />
            <div>
              <div className="text-2xl font-bold text-gray-800">
                {productData.analyzedReviews}
              </div>
              <div className="text-gray-600">Reviews Analyzed</div>
            </div>
          </div>
          <AmazonButton asin={productData.asin} size="small" />
        </div>
      </div>
    </div>

    {/* Sentiment Overview */}
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold flex items-center">
          <TrendingUp className="w-6 h-6 mr-2 text-blue-600" />
          Customer Sentiment Overview
        </h2>
        <AmazonButton asin={productData.asin} size="small" />
      </div>
      <div className="space-y-6">
        <SentimentChart distribution={productData.sentimentDistribution} />
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-green-600">
              {productData.sentimentDistribution.positive}%
            </div>
            <div className="text-gray-600">Positive</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-yellow-600">
              {productData.sentimentDistribution.neutral}%
            </div>
            <div className="text-gray-600">Neutral</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-red-600">
              {productData.sentimentDistribution.negative}%
            </div>
            <div className="text-gray-600">Negative</div>
          </div>
        </div>
      </div>
    </div>

    {/* Feature Scores */}
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold flex items-center">
          <Award className="w-6 h-6 mr-2 text-blue-600" />
          Feature Performance Scores
        </h2>
        <AmazonButton asin={productData.asin} size="small" />
      </div>
      <div className="space-y-6">
        {productData.featureScores.map((feature, index) => (
          <div
            key={index}
            className="border-b border-gray-100 pb-4 last:border-b-0"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold text-gray-800">{feature.name}</span>
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold text-gray-800">
                  {feature.score}/5
                </span>
                <span className="text-sm text-gray-500">
                  ({feature.mentions} mentions)
                </span>
              </div>
            </div>
            <ScoreBar score={feature.score} />
            <div className="text-xs text-gray-500 mt-1">
              Confidence: {(feature.confidence * 100).toFixed(0)}%
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default OverviewSection;