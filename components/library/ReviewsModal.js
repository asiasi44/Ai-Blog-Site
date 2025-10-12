import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../ui/Dialogs";
import Button from "../ui/Button";
import Badge from "../ui/Badge";
import { Star, X } from "lucide-react";
import { useProductByAsin } from "@/lib/hooks/useProducts";

export const ReviewsModal = ({ currentAsin, setCurrentAsin }) => {
  const {
    data: productByAsin = {},
  } = useProductByAsin(currentAsin);

  return (
    <Dialog
      open={currentAsin !== null}
      onOpenChange={(open) => {
        if (!open) setCurrentAsin(null);
      }}
    >
      <DialogContent>
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>Reviews for {currentAsin}</DialogTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCurrentAsin(null)}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </DialogHeader>
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {productByAsin.data?.reviews.length > 0 ? (
            productByAsin.data.reviews.map((review, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-2">
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < review.rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <Badge variant="outline">{review.rating}/5</Badge>
                </div>
                <h4 className="font-medium">{review.title}</h4>
                <p className="text-sm text-gray-600">{review.body}</p>
                <div className="text-xs text-gray-400">
                  By {review.author} on {review.date}
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No reviews available</p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
