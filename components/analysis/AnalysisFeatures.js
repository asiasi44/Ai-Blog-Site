import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/Cards";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/Tables";
import Badge from "../ui/Badge";

export const AnalysisFeatures = ({ analysis }) => {
  return (
    <div className="space-y-4">
      {analysis.feature_scores && (
        <Card>
          <CardHeader>
            <CardTitle>Feature Scores</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Feature</TableHead>
                  <TableHead>Score</TableHead>
                  <TableHead>Mentions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Object.entries(analysis.feature_scores).map(
                  ([featureName, feature], index) => (
                    <TableRow key={index}>
                      <TableCell>{featureName.replace(/_/g, " ")}</TableCell>
                      <TableCell>
                        <Badge
                          variant={feature.score > 3 ? "default" : "secondary"}
                        >
                          {feature.score}/5
                        </Badge>
                      </TableCell>
                      <TableCell>{feature.mentions}</TableCell>
                    </TableRow>
                  )
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
};