import React from 'react';

export default function Card({ title, description, icon, onClick, disabled, status }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`p-6 rounded-lg shadow-lg text-center transition ${
        disabled
          ? 'bg-gray-100 cursor-not-allowed text-gray-500'
          : 'bg-white hover:shadow-xl hover:scale-105 text-gray-800'
      }`}>
      <div className="text-4xl mb-3">{icon}</div>
      <h3 className="font-bold text-lg mb-2">{title}</h3>
      <p className="text-sm mb-3">{description}</p>
      <span className={`text-xs font-semibold ${disabled ? 'text-gray-400' : 'text-amber-600'}`}>{status}</span>
    </button>
  );
}
