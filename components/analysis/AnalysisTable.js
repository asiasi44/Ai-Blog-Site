import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/Tables";
import Button from "../ui/Button";
import Badge from "../ui/Badge";
import { Eye, Trash, Star } from "lucide-react";
import Link from "next/link";

export const AnalysisTable = ({
  analyses,
  onViewAnalysis,
  onDeleteAnalysis,
}) => {
  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ASIN</TableHead>
            <TableHead>Product Title</TableHead>
            <TableHead>Avg Rating</TableHead>
            <TableHead>Total Reviews</TableHead>
            <TableHead>Confidence Score</TableHead>
            <TableHead>Product Type</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {analyses.map((analysis) => (
            <TableRow key={analysis.asin}>
              <TableCell className="font-mono text-sm">
                {analysis.asin}
              </TableCell>
              <TableCell className="max-w-xs truncate">
                {analysis.gemini_output.title || analysis.title}
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  {analysis.avg_rating}
                </div>
              </TableCell>
              <TableCell>{analysis.total_reviews}</TableCell>
              <TableCell>
                <Badge variant="outline">{analysis.confidence_score}%</Badge>
              </TableCell>
              <TableCell>{analysis.product_type}</TableCell>
              <TableCell>
                <Button size="sm" onClick={() => onViewAnalysis(analysis.asin)}>
                  <Eye className="w-4 h-4 mr-1" />
                  View Details
                </Button>
                <Link href={`/product-review/${analysis.asin}`} passHref>
                  <Button size="sm">
                    <Eye className="w-4 h-4 mr-1" />
                    View Blog
                  </Button>
                </Link>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => onDeleteAnalysis(analysis.asin)}
                >
                  <Trash className="w-4 h-4 mr-1" />
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
