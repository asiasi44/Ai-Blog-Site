import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../ui/Dialogs";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/Tabs";
import Button from "../ui/Button";
import { X } from "lucide-react";
import { AnalysisOverview } from "./AnalysisOverview";
import { AnalysisSentiment } from "./AnalysisSentiment";
import { AnalysisFeatures } from "./AnalysisFeatures";
import { AnalysisInsights } from "./AnalysisInsights";
import { useAnalysisByAsin } from "@/lib/hooks/useAnalysis";
import { toast } from "react-toastify";

export const AnalysisDetailsModal = ({ currentAsin, onClose }) => {
  const {
    data: analyzedDataByAsin = {},
    isLoading: isAnalyzedDataByAsinLoading,
    isError: isAnalyzedDataByAsinError,
  } = useAnalysisByAsin(currentAsin);

  const analysis = analyzedDataByAsin.data;

  if (!analysis) {
    return null;
  }
  if (isAnalyzedDataByAsinError) {
    toast.error("Error loading analysis details", {
      toastId: "analysis-details-error",
    });
    return null;
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>Analysis Details - {analysis.asin}</DialogTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </DialogHeader>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="sentiment">Sentiment</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
          </TabsList>
          <TabsContent value="overview">
            <AnalysisOverview analysis={analysis} />
          </TabsContent>
          <TabsContent value="sentiment">
            <AnalysisSentiment analysis={analysis} />
          </TabsContent>
          <TabsContent value="features">
            <AnalysisFeatures analysis={analysis} />
          </TabsContent>
          <TabsContent value="insights">
            <AnalysisInsights analysis={analysis} />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
