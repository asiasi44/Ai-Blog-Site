import React from 'react';

// A visual component to display a score out of a maximum value.
const ScoreBar = ({ score, max = 5 }) => (
  <div className="w-full bg-gray-200 rounded-full h-2.5">
    <div 
      className={`h-2.5 rounded-full transition-all duration-500 ${
        score >= 4 ? 'bg-green-500' : 
        score >= 3 ? 'bg-yellow-500' : 
        score >= 2 ? 'bg-orange-500' : 'bg-red-500'
      }`}
      style={{ width: `${(score / max) * 100}%` }}
    ></div>
  </div>
);

export default ScoreBar;
