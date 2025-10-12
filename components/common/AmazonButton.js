import React from 'react';
import { ShoppingCart, ExternalLink } from 'lucide-react';
import { getAmazonLink } from '../../lib/utils'; // Import the helper function

// A reusable button component for Amazon links.
const AmazonButton = ({ asin, className = "", size = "normal", variant = "primary" }) => {
  const baseClasses = "inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-lg";
  
  const sizeClasses = {
    small: "px-4 py-2 text-sm",
    normal: "px-6 py-3 text-base",
    large: "px-8 py-4 text-lg"
  };
  
  const variantClasses = {
    primary: "bg-gradient-to-r from-orange-500 to-yellow-500 text-white hover:from-orange-600 hover:to-yellow-600",
    secondary: "bg-blue-600 text-white hover:bg-blue-700",
    outline: "border-2 border-orange-500 text-orange-600 hover:bg-orange-50"
  };

  return (
    <a
      href={getAmazonLink(asin)}
      target="_blank"
      rel="noopener noreferrer"
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
    >
      <ShoppingCart className="w-5 h-5 mr-2" />
      View on Amazon
      <ExternalLink className="w-4 h-4 ml-2" />
    </a>
  );
};

export default AmazonButton;
