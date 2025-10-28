import React from 'react';
import Card from './Card';
import FollowUps from './FollowUps';

export default function HomePage({ currentUser, setPage, updateUser }) {
  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow-lg p-8 text-center">
        <h1 className="text-4xl font-bold text-amber-900 mb-4">Welcome, {currentUser.name}!</h1>
        <p className="text-gray-600 text-lg">Discover your Prakriti and achieve holistic wellness</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card
          title="Analyze Prakriti"
          description="Take the Prakriti questionnaire"
          icon="📋"
          onClick={() => setPage('prakriti')}
          status={currentUser.prakriti ? '✓ Complete' : 'Pending'}
        />
        <Card
          title="Diet Chart"
          description="Personalized diet recommendations"
          icon="🍎"
          onClick={() => setPage('diet')}
          disabled={!currentUser.prakriti}
          status={currentUser.prakriti ? '✓ Available' : 'Complete Prakriti first'}
        />
        <Card
          title="Daily Schedule"
          description="Routine suggestions"
          icon="⏰"
          onClick={() => setPage('schedule')}
          disabled={!currentUser.prakriti}
          status={currentUser.prakriti ? '✓ Available' : 'Complete Prakriti first'}
        />
      </div>

      {/* User Follow-ups */}
      <FollowUps currentUser={currentUser} updateUser={updateUser} />
    </div>
  );
}
