// This file contains all the reusable helper functions.

/**
 * Determines the confidence level and corresponding styles based on a given score.
 * @param {number} score - The confidence score (0-100).
 * @returns {{level: string, color: string, textColor: string, bgColor: string}} - An object with level, color, and Tailwind classes.
 */
export const getConfidenceLevel = (score) => {
  if (score >= 80)
    return {
      level: "Excellent",
      color: "bg-green-500",
      textColor: "text-green-700",
      bgColor: "bg-green-100",
    };
  if (score >= 65)
    return {
      level: "Good",
      color: "bg-blue-500",
      textColor: "text-blue-700",
      bgColor: "bg-blue-100",
    };
  if (score >= 50)
    return {
      level: "Fair",
      color: "bg-yellow-500",
      textColor: "text-yellow-700",
      bgColor: "bg-yellow-100",
    };
  if (score >= 30)
    return {
      level: "Limited",
      color: "bg-orange-500",
      textColor: "text-orange-700",
      bgColor: "bg-orange-100",
    };
  return {
    level: "Poor",
    color: "bg-red-500",
    textColor: "text-red-700",
    bgColor: "bg-red-100",
  };
};

/**
 * Generates an Amazon affiliate link for a given ASIN.
 * @param {string} asin - The Amazon Standard Identification Number.
 * @returns {string} - The full Amazon product link.
 */
export const getAmazonLink = (asin) => `https://amazon.com/dp/${asin}`;
