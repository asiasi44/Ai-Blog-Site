import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/Cards";
import Badge from "../ui/Badge";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export const AnalysisInsights = ({ analysis }) => {
  return (
    <div className="space-y-4">
      {analysis.common_issues && (
        <Card>
          <CardHeader>
            <CardTitle>Common Issues</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {analysis.common_issues.map((issue, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-2 border rounded"
                >
                  <span>{issue.issue}</span>
                  <div className="flex gap-2">
                    <Badge variant="outline">
                      Mentions:{" "}
                      {Math.round(
                        (issue.frequency * analysis.total_reviews) / 100
                      )}
                    </Badge>
                    <Badge variant="outline">
                      Negative Mentions:{" "}
                      {Math.round(
                        (issue.negative_ratio *
                          issue.frequency *
                          analysis.total_reviews) /
                          100 /
                          100
                      )}
                    </Badge>

                    <Badge
                      variant={
                        issue.severity === "high" ? "destructive" : "secondary"
                      }
                    >
                      {issue.severity}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {analysis.rating_trends && (
        <Card>
          <CardHeader>
            <CardTitle>Rating Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={analysis.rating_trends.data.map((rating, index) => ({
                  date: analysis.rating_trends.labels[index],
                  rating,
                }))}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="rating" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
