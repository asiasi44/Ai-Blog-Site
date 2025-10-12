"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/Cards";
import { Loader2, BarChart3 } from "lucide-react";
import { AnalysisTable } from "./AnalysisTable";
import { AnalysisDetailsModal } from "./AnalysisDetailsModal";
import { useAnalysis, useDeleteAnalysis } from "@/lib/hooks/useAnalysis";

const AnalysisResults = () => {
  const [currentAsin, setCurrentAsin] = useState(null);

  const {
    data: analyzedData,
    isLoading: isAnalyzedDataLoading,
    isError: isAnalyzedDataError,
  } = useAnalysis();

  const deleteMutation = useDeleteAnalysis();

  const handleDelete = (asin) => {
    if (confirm("Are you sure you want to delete this analysis?")) {
      deleteMutation.mutate(asin);
    }
  };

  if (isAnalyzedDataLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (isAnalyzedDataError) {
    return <div className="text-red-500">Error loading analysis data</div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Analysis Results
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isAnalyzedDataLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-8 h-8 animate-spin" />
            </div>
          ) : analyzedData?.analysis.length > 0 ? (
            <AnalysisTable
              analyses={analyzedData?.analysis}
              onViewAnalysis={(asin) => setCurrentAsin(asin)}
              onDeleteAnalysis={handleDelete}
            />
          ) : (
            <p className="text-center text-gray-500 py-8">
              No analyses available
            </p>
          )}
        </CardContent>
      </Card>

      <AnalysisDetailsModal
        currentAsin={currentAsin}
        onClose={() => setCurrentAsin(null)}
      />
    </div>
  );
};

export default AnalysisResults;
