import React from "react";
import {
  AlertTriangle,
  CheckCircle,
  XCircle,
  Target,
} from "lucide-react";
import AmazonButton from "@/components/common/AmazonButton";
import ScoreBar from "@/components/common/ScoreBar";

const ReviewAnalysisSection = ({ productData }) => (
  <div className="space-y-12">
    {/* Common Issues */}
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold flex items-center">
          <AlertTriangle className="w-6 h-6 mr-2 text-red-600" />
          Most Common Issues
        </h2>
        <AmazonButton asin={productData.asin} size="small" />
      </div>
      <div className="space-y-4">
        {productData.commonIssues.map((issue, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 bg-red-50 rounded-lg border-l-4 border-red-500"
          >
            <div>
              <div className="font-semibold text-red-800">{issue.issue}</div>
              <div className="text-sm text-red-600">Severity: {issue.severity}</div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-red-700">{issue.frequency}%</div>
              <div className="text-sm text-red-600">of reviews</div>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Pros and Cons */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h3 className="text-xl font-bold mb-4 flex items-center text-green-700">
          <CheckCircle className="w-5 h-5 mr-2" />
          What Users Love
        </h3>
        <ul className="space-y-3">
          {productData.pros.map((pro, index) => (
            <li key={index} className="flex items-start">
              <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">{pro}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-8">
        <h3 className="text-xl font-bold mb-4 flex items-center text-red-700">
          <XCircle className="w-5 h-5 mr-2" />
          Common Complaints
        </h3>
        <ul className="space-y-3">
          {productData.cons.map((con, index) => (
            <li key={index} className="flex items-start">
              <XCircle className="w-5 h-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">{con}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>

    {/* User Segments */}
    <div className="bg-white rounded-xl shadow-lg p-8">
      <h2 className="text-2xl font-bold mb-6 flex items-center">
        <Target className="w-6 h-6 mr-2 text-blue-600" />
        User Segment Analysis
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {productData.userSegments.map((segment, index) => (
          <div
            key={index}
            className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200"
          >
            <h3 className="text-lg font-semibold text-blue-800 mb-2">
              {segment.segment}
            </h3>
            <div className="flex justify-between items-center mb-3">
              <span className="text-gray-600">Satisfaction Score</span>
              <span className="text-2xl font-bold text-blue-700">
                {segment.satisfaction}/5
              </span>
            </div>
            <ScoreBar score={segment.satisfaction} />
            <div className="text-sm text-gray-600 mt-2">
              {segment.percentage}% of analyzed users
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default ReviewAnalysisSection;