import React from 'react';

// A visual component to display sentiment distribution.
const SentimentChart = ({ distribution }) => {
  const total = distribution.positive + distribution.neutral + distribution.negative;
  return (
    <div className="flex w-full h-4 rounded-lg overflow-hidden">
      <div 
        className="bg-green-500 transition-all duration-500"
        style={{ width: `${(distribution.positive / total) * 100}%` }}
      ></div>
      <div 
        className="bg-yellow-500 transition-all duration-500"
        style={{ width: `${(distribution.neutral / total) * 100}%` }}
      ></div>
      <div 
        className="bg-red-500 transition-all duration-500"
        style={{ width: `${(distribution.negative / total) * 100}%` }}
      ></div>
    </div>
  );
};

export default SentimentChart;
