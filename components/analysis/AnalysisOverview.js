import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/Cards";
export const AnalysisOverview = ({ analysis }) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{analysis.avg_rating}</div>
            <p className="text-xs text-gray-500">Average Rating</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{analysis.total_reviews}</div>
            <p className="text-xs text-gray-500">Total Reviews</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">
              {analysis.confidence_score}%
            </div>
            <p className="text-xs text-gray-500">Confidence</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{analysis.product_type}</div>
            <p className="text-xs text-gray-500">Product Type</p>
          </CardContent>
        </Card>
      </div>

      {analysis.gemini_output && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-green-600">Pros</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-4 space-y-1">
                {analysis.gemini_output.pros?.map((pro, index) => (
                  <li key={index} className="text-sm">
                    {pro.feature}: {pro.reason}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-red-600">Cons</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-4 space-y-1">
                {analysis.gemini_output.cons?.map((con, index) => (
                  <li key={index} className="text-sm">
                    {con.feature}: {con.reason}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-green-600">Best For</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-700">
              {analysis.gemini_output.best_for}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-red-600">Not Ideal For</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-700">
              {analysis.gemini_output.not_ideal_for}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Verdict</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-700">
              {analysis.gemini_output.verdict}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
