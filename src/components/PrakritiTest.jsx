import React, { useState } from 'react';
import { CheckCircle } from 'lucide-react';

export default function PrakritiTest({ currentUser, updateUser, setPage, onBack }) {
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);

  const questions = [
    { id: 1, text: 'Your body frame is:', options: { vata: 'Thin, light', pitta: 'Medium, muscular', kapha: 'Heavy, sturdy' } },
    { id: 2, text: 'Your skin tends to be:', options: { vata: 'Dry, rough', pitta: 'Sensitive, prone to rashes', kapha: 'Oily, smooth' } },
    { id: 3, text: 'Your hair is:', options: { vata: 'Thin, dry', pitta: 'Fine, graying early', kapha: 'Thick, oily' } },
    { id: 4, text: 'Your eyes are:', options: { vata: 'Small, dark', pitta: 'Sharp, intense', kapha: 'Large, calm' } },
    { id: 5, text: 'Your appetite is:', options: { vata: 'Variable', pitta: 'Strong, regular', kapha: 'Slow, steady' } },
    { id: 6, text: 'Your digestion is:', options: { vata: 'Irregular, bloating', pitta: 'Strong, quick', kapha: 'Slow but steady' } },
    { id: 7, text: 'Your sleep is:', options: { vata: 'Light, disturbed', pitta: 'Moderate, can wake early', kapha: 'Deep, heavy' } },
    { id: 8, text: 'You prefer:', options: { vata: 'Warm environments', pitta: 'Cool environments', kapha: 'Warm, dry conditions' } },
    { id: 9, text: 'Your mind tends to be:', options: { vata: 'Active, creative', pitta: 'Sharp, critical', kapha: 'Calm, steady' } },
    { id: 10, text: 'Under stress, you tend to:', options: { vata: 'Feel anxious, scattered', pitta: 'Get angry, irritable', kapha: 'Feel sluggish, withdrawn' } }
  ];

  const handleAnswer = (questionId, dosha) => {
    setAnswers(prev => ({ ...prev, [questionId]: dosha }));
  };

  const calculatePrakriti = () => {
    const counts = { vata: 0, pitta: 0, kapha: 0 };
    Object.values(answers).forEach(dosha => counts[dosha]++);

    let prakriti = Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b);
    const dominant = counts[prakriti];

    if (dominant >= 4 && dominant <= 6) {
      const second = Object.keys(counts).filter(k => k !== prakriti).sort((a, b) => counts[b] - counts[a])[0];
      prakriti = `${prakriti.charAt(0).toUpperCase() + prakriti.slice(1)}-${second.charAt(0).toUpperCase() + second.slice(1)}`;
    } else {
      prakriti = prakriti.charAt(0).toUpperCase() + prakriti.slice(1);
    }

    setResult(prakriti);
  };

  const handleSave = () => {
    if (result) {
      updateUser({ ...currentUser, prakriti: result });
      setPage('home');
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
        <h2 className="text-3xl font-bold text-amber-900 mb-6">Prakriti Analysis Questionnaire</h2>

        {!result ? (
          <div className="space-y-6">
            {questions.map((q, idx) => (
              <div key={q.id} className="pb-6 border-b border-amber-100">
                <p className="font-semibold text-gray-800 mb-4">{idx + 1}. {q.text}</p>
                <div className="space-y-2">
                  {Object.entries(q.options).map(([dosha, label]) => (
                    <label key={dosha} className="flex items-center p-3 bg-amber-50 hover:bg-amber-100 rounded cursor-pointer">
                      <input
                        type="radio"
                        name={`q${q.id}`}
                        value={dosha}
                        checked={answers[q.id] === dosha}
                        onChange={() => handleAnswer(q.id, dosha)}
                        className="mr-3"
                      />
                      <span className="capitalize">{label}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}

            <div className="flex gap-4 mt-8">
              <button
                onClick={calculatePrakriti}
                disabled={Object.keys(answers).length < questions.length}
                className="flex-1 bg-amber-600 text-white py-3 rounded-lg hover:bg-amber-700 disabled:bg-gray-300 font-semibold">
                Calculate Prakriti
              </button>
              <button
                onClick={onBack}
                className="px-6 bg-gray-400 text-white py-3 rounded-lg hover:bg-gray-500 font-semibold">
                Back
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center space-y-8">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
            <div>
              <h3 className="text-2xl font-bold text-amber-900 mb-2">Your Prakriti</h3>
              <p className="text-5xl font-bold text-amber-600 mb-6">{result}</p>
              <p className="text-gray-600 mb-6">Your unique constitutional type has been identified!</p>
            </div>
            <button
              onClick={handleSave}
              className="bg-amber-600 text-white px-8 py-3 rounded-lg hover:bg-amber-700 font-semibold">
              Save & Continue
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
