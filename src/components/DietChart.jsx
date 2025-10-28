import React from 'react';

export default function DietChart({ prakriti, onBack }) {
  const dietRecommendations = {
    Vata: {
      include: ['Warm soups', 'Ghee', 'Sesame oil', 'Whole grains', 'Warm milk'],
      avoid: ['Cold foods', 'Raw vegetables', 'Dry fruits', 'Caffeine', 'Too many spices'],
      mealtimes: 'Regular, warm meals at consistent times'
    },
    Pitta: {
      include: ['Cooling foods', 'Coconut', 'Cucumber', 'Green vegetables', 'Cooling drinks'],
      avoid: ['Spicy foods', 'Alcohol', 'Sour fruits', 'Fried foods', 'Excessive salt'],
      mealtimes: 'Moderate portions, cooling foods'
    },
    Kapha: {
      include: ['Light foods', 'Spices', 'Bitter greens', 'Warm drinks', 'Beans'],
      avoid: ['Dairy', 'Sweet foods', 'Heavy oils', 'Cold drinks', 'Processed foods'],
      mealtimes: 'Light meals, avoid snacking'
    }
  };

  const getPrakritiBase = () => prakriti?.split('-')[0] || 'Vata';
  const diet = dietRecommendations[getPrakritiBase()];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-amber-900 mb-8">Personalized Diet for {prakriti}</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-bold text-amber-800 mb-4">Foods to Include</h3>
            <ul className="space-y-3">
              {diet.include.map((food, idx) => (
                <li key={idx} className="flex items-center text-gray-700">
                  <span className="text-green-500 mr-3">✓</span>{food}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold text-amber-800 mb-4">Foods to Avoid</h3>
            <ul className="space-y-3">
              {diet.avoid.map((food, idx) => (
                <li key={idx} className="flex items-center text-gray-700">
                  <span className="text-red-500 mr-3">✕</span>{food}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 bg-amber-50 p-6 rounded-lg">
          <h3 className="font-bold text-amber-900 mb-2">Meal Timing</h3>
          <p className="text-gray-700">{diet.mealtimes}</p>
        </div>

        <div className="mt-8 bg-blue-50 p-6 rounded-lg">
          <h3 className="font-bold text-blue-900 mb-3">Sample Daily Menu</h3>
          <div className="space-y-3 text-gray-700">
            <p><strong>Breakfast:</strong> Warm oatmeal with ghee and fruit</p>
            <p><strong>Lunch:</strong> Rice with seasonal vegetables and dal</p>
            <p><strong>Dinner:</strong> Light soup with whole grain bread</p>
            <p><strong>Snacks:</strong> Warm herbal tea with seasonal fruits</p>
          </div>
        </div>

        <button
          onClick={onBack}
          className="mt-8 w-full bg-gray-400 text-white py-3 rounded-lg hover:bg-gray-500 font-semibold">
          ← Back to Home
        </button>
      </div>
    </div>
  );
}
