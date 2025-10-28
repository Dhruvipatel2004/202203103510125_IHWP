import React, { useState } from 'react';
import { Edit2, Trash2, LogOut } from 'lucide-react';

const ADMIN_DEFAULT_PIN = 'admin123'; // Default admin PIN

export default function AdminPanel({ users, deleteUserById, setCurrentUser, setPage, onLogout }) {
  const [pin, setPin] = useState('');
  const [accessGranted, setAccessGranted] = useState(false);
  const [error, setError] = useState('');

  // Handle PIN submission
  const handlePinSubmit = (e) => {
    e.preventDefault();
    if (pin === ADMIN_DEFAULT_PIN) {
      setAccessGranted(true);
      setError('');
    } else {
      setError('Incorrect PIN!');
      setPin('');
    }
  };

  if (!accessGranted) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-amber-50">
        <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-sm text-center">
          <h2 className="text-2xl font-bold text-amber-900 mb-4">Enter Admin PIN</h2>
          <form onSubmit={handlePinSubmit} className="space-y-4">
            <input
              type="password"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              placeholder="Enter PIN"
              className="w-full px-4 py-2 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600"
            />
            {error && <p className="text-red-600 text-sm">{error}</p>}
            <button
              type="submit"
              className="w-full bg-amber-600 text-white py-2 rounded-lg hover:bg-amber-700 font-semibold">
              Unlock
            </button>
            <button
              type="button"
              onClick={() => setPage('home')}
              className="w-full bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400">
              Cancel
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Admin access granted, render the panel
  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-amber-900">Admin Panel - Total Users: {users.length}</h2>
        <button
          onClick={onLogout}
          className="flex items-center gap-2 bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600"
        >
          <LogOut className="w-4 h-4" /> Logout
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-8">
        {users.length === 0 ? (
          <p className="text-center text-gray-500 py-8">No users registered yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-amber-100 border-b-2 border-amber-300">
                  <th className="px-6 py-3 text-left text-amber-900 font-bold">Name</th>
                  <th className="px-6 py-3 text-left text-amber-900 font-bold">Prakriti</th>
                  <th className="px-6 py-3 text-left text-amber-900 font-bold">Created</th>
                  <th className="px-6 py-3 text-left text-amber-900 font-bold">Follow-ups</th>
                  <th className="px-6 py-3 text-center text-amber-900 font-bold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user.id} className="border-b border-amber-100 hover:bg-amber-50">
                    <td className="px-6 py-4 text-gray-800">{user.name}</td>
                    <td className="px-6 py-4">
                      <span className="bg-amber-200 px-3 py-1 rounded">{user.prakriti || 'Not analyzed'}</span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{user.createdDate}</td>
                    <td className="px-6 py-4">
                      {user.followUps && user.followUps.length > 0 ? (
                        <ul className="space-y-1 text-sm">
                          {user.followUps.map(f => (
                            <li key={f.id} className={f.status === 'done' ? 'line-through text-gray-500' : ''}>
                              {f.text} ({f.status})
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <span className="text-gray-400">No follow-ups</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => deleteUserById(user.id)}
                        className="text-red-600 hover:text-red-800 inline-flex items-center gap-1">
                        <Trash2 className="w-4 h-4" /> Delete User
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
