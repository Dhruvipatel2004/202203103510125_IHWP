import React from 'react';

export default function DailySchedule({ prakriti, onBack }) {
  const schedules = {
    Vata: {
      wake: '6:00 AM',
      meditation: '6:15 AM - 6:45 AM',
      exercise: '7:00 AM - 8:00 AM (Yoga)',
      breakfast: '8:30 AM',
      lunch: '12:30 PM',
      exercise2: '4:00 PM - 5:00 PM (Walking)',
      dinner: '6:30 PM',
      sleep: '10:00 PM'
    },
    Pitta: {
      wake: '5:30 AM',
      meditation: '5:45 AM - 6:15 AM',
      exercise: '6:30 AM - 7:30 AM (Moderate)',
      breakfast: '8:00 AM',
      lunch: '12:00 PM',
      exercise2: '3:00 PM - 4:00 PM (Swim)',
      dinner: '7:00 PM',
      sleep: '10:30 PM'
    },
    Kapha: {
      wake: '6:00 AM',
      meditation: '6:15 AM - 6:45 AM',
      exercise: '7:00 AM - 8:30 AM (Vigorous)',
      breakfast: '9:00 AM',
      lunch: '12:00 PM',
      exercise2: '5:00 PM - 6:00 PM (Running)',
      dinner: '6:00 PM',
      sleep: '9:30 PM'
    }
  };

  const getPrakritiBase = () => prakriti?.split('-')[0] || 'Vata';
  const schedule = schedules[getPrakritiBase()];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-amber-900 mb-8">Daily Routine for {prakriti}</h2>

        <div className="space-y-4">
          {Object.entries(schedule).map(([key, time]) => (
            <div key={key} className="flex items-center p-4 bg-amber-50 rounded-lg">
              <div className="w-24 font-bold text-amber-900 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</div>
              <div className="text-gray-700 font-semibold">{time}</div>
            </div>
          ))}
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="font-bold text-blue-900 mb-3">Morning Tips</h3>
            <ul className="text-sm text-gray-700 space-y-2">
              <li>• Oil massage before shower</li>
              <li>• Tongue scraping</li>
              <li>• Hydrate well</li>
            </ul>
          </div>
          <div className="bg-green-50 p-6 rounded-lg">
            <h3 className="font-bold text-green-900 mb-3">Midday Tips</h3>
            <ul className="text-sm text-gray-700 space-y-2">
              <li>• Main meal at lunch</li>
              <li>• Rest after meals</li>
              <li>• Stay hydrated</li>
            </ul>
          </div>
          <div className="bg-purple-50 p-6 rounded-lg">
            <h3 className="font-bold text-purple-900 mb-3">Evening Tips</h3>
            <ul className="text-sm text-gray-700 space-y-2">
              <li>• Light dinner</li>
              <li>• Relaxation exercises</li>
              <li>• Early sleep</li>
            </ul>
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
