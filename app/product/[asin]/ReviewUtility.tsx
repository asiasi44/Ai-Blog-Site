import { Star } from "lucide-react";

export const renderStars = (rating: number) => {
  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={16}
          className={
            i < Math.floor(rating)
              ? "fill-yellow-400 text-yellow-400"
              : "text-gray-300"
          }
        />
      ))}
      <span className="ml-2 text-sm text-gray-600">({rating}/5)</span>
    </div>
  );
};

export const getConfidenceLevel = (score: number) => {
  if (score >= 80)
    return { text: "Excellent", color: "bg-green-100 text-green-800" };
  if (score >= 60) return { text: "Good", color: "bg-blue-100 text-blue-800" };
  if (score >= 40)
    return { text: "Fair", color: "bg-yellow-100 text-yellow-800" };
  return { text: "Limited", color: "bg-red-100 text-red-800" };
};
