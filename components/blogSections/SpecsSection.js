import React from 'react';
import { Zap } from 'lucide-react';
import AmazonButton from '../common/AmazonButton';

// The content for the "Specifications" tab.
const SpecsSection = ({ productData }) => (
  <div className="space-y-8">
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold flex items-center">
          <Zap className="w-6 h-6 mr-2 text-blue-600" />
          Technical Specifications
        </h2>
        <AmazonButton asin={productData.asin} size="small" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {Object.entries(productData.specs).map(([key, value], index) => (
          <div key={index} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
            <span className="font-medium text-gray-700 capitalize">
              {key.replace(/([A-Z])/g, ' $1').trim()}
            </span>
            <span className="font-semibold text-gray-900">{value}</span>
          </div>
        ))}
      </div>
    </div>
    
    {/* Call to Action */}
    <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl p-8 border border-orange-200">
      <div className="text-center">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Ready to Purchase?</h3>
        <p className="text-gray-600 mb-6">Check current pricing and availability on Amazon</p>
        <AmazonButton asin={productData.asin} size="large" />
      </div>
    </div>
  </div>
);

export default SpecsSection;
