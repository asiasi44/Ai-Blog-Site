import React from 'react';
import { Award, CheckCircle, XCircle } from 'lucide-react';

// The content for the "Final Verdict" tab.
const VerdictSection = ({ productData }) => (
  <div className="space-y-8">
    <div className="bg-white rounded-xl shadow-lg p-8">
      <h2 className="text-2xl font-bold mb-6 flex items-center">
        <Award className="w-6 h-6 mr-2 text-blue-600" />
        Final Verdict
      </h2>
      <div className="text-lg text-gray-700 mb-8 leading-relaxed">
        {productData.verdict}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-green-50 p-6 rounded-lg border border-green-200">
          <h3 className="text-lg font-semibold text-green-800 mb-3 flex items-center">
            <CheckCircle className="w-5 h-5 mr-2" />
            Best For
          </h3>
          <p className="text-green-700">{productData.bestFor}</p>
        </div>
        
        <div className="bg-red-50 p-6 rounded-lg border border-red-200">
          <h3 className="text-lg font-semibold text-red-800 mb-3 flex items-center">
            <XCircle className="w-5 h-5 mr-2" />
            Not Ideal For
          </h3>
          <p className="text-red-700">{productData.notIdealFor}</p>
        </div>
      </div>
    </div>
  </div>
);

export default VerdictSection;
