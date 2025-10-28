import React, { useState } from 'react';

export default function FollowUps({ currentUser, updateUser }) {
  const [newFollowUp, setNewFollowUp] = useState('');

  const addFollowUp = () => {
    if (!newFollowUp.trim()) return;

    const followUp = {
      id: Date.now(),
      text: newFollowUp.trim(),
      status: 'pending',
      createdDate: new Date().toLocaleDateString()
    };

    const updatedUser = {
      ...currentUser,
      followUps: [...(currentUser.followUps || []), followUp]
    };
    updateUser(updatedUser);
    setNewFollowUp('');
  };

  const toggleStatus = (id) => {
    const updatedUser = {
      ...currentUser,
      followUps: currentUser.followUps.map(f =>
        f.id === id ? { ...f, status: f.status === 'pending' ? 'done' : 'pending' } : f
      )
    };
    updateUser(updatedUser);
  };

  const deleteFollowUp = (id) => {
    const updatedUser = {
      ...currentUser,
      followUps: currentUser.followUps.filter(f => f.id !== id)
    };
    updateUser(updatedUser);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <h2 className="text-2xl font-bold text-amber-900 mb-4">Your Follow-ups</h2>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Add a follow-up..."
          value={newFollowUp}
          onChange={(e) => setNewFollowUp(e.target.value)}
          className="flex-1 px-4 py-2 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600"
        />
        <button
          onClick={addFollowUp}
          className="bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 font-semibold"
        >
          Add
        </button>
      </div>

      {(!currentUser.followUps || currentUser.followUps.length === 0) ? (
        <p className="text-gray-500">No follow-ups yet.</p>
      ) : (
        <ul className="space-y-2">
          {currentUser.followUps.map(f => (
            <li
              key={f.id}
              className={`flex justify-between items-center p-3 rounded-lg border ${
                f.status === 'done' ? 'bg-green-100 border-green-300' : 'bg-amber-50 border-amber-200'
              }`}
            >
              <span className={`${f.status === 'done' ? 'line-through text-gray-600' : 'text-gray-800'}`}>
                {f.text}
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => toggleStatus(f.id)}
                  className="px-2 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  {f.status === 'pending' ? 'Mark Done' : 'Mark Pending'}
                </button>
                <button
                  onClick={() => deleteFollowUp(f.id)}
                  className="px-2 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
