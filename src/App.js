import React, { useState, useEffect } from 'react';
import { Users, LogOut, Menu, X } from 'lucide-react';

import LoginPage from './components/LoginPage';
import HomePage from './components/HomePage';
import PrakritiTest from './components/PrakritiTest';
import DietChart from './components/DietChart';
import DailySchedule from './components/DailySchedule';
import AdminPanel from './components/AdminPanel';

export default function App() {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const [page, setPage] = useState('home');
  const [isLoading, setIsLoading] = useState(true);

  // Load users on mount
  useEffect(() => {
    const savedUsers = JSON.parse(localStorage.getItem('prakritiUsers') || '[]');
    setUsers(savedUsers);
    setIsLoading(false);
  }, []);

  // Save users whenever they change
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('prakritiUsers', JSON.stringify(users));
    }
  }, [users, isLoading]);

  const addUser = (newUserData) => {
    const newUser = {
      id: Date.now(),
      ...newUserData,
      createdDate: new Date().toLocaleDateString()
    };
    setUsers([...users, newUser]);
    setCurrentUser(newUser);
    return newUser;
  };

  const updateUser = (updatedUser) => {
    setUsers(users.map(u => u.id === updatedUser.id ? updatedUser : u));
    setCurrentUser(updatedUser);
  };

  const deleteUserById = (id) => {
    setUsers(users.filter(u => u.id !== id));
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setPage('home');
    setShowMenu(false);
  };

  if (isLoading) return <div className="flex items-center justify-center min-h-screen">Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
      {/* Navigation */}
      <nav className="bg-amber-900 text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Users className="w-6 h-6" />
            <span className="font-bold text-lg">Prakriti Wellness</span>
          </div>
          <button onClick={() => setShowMenu(!showMenu)} className="md:hidden">
            {showMenu ? <X /> : <Menu />}
          </button>
          {currentUser && (
            <div className="hidden md:flex items-center gap-4">
              <span className="text-sm">{currentUser.name}</span>
              <button onClick={handleLogout} className="flex items-center gap-2 bg-amber-800 hover:bg-amber-700 px-3 py-2 rounded">
                <LogOut className="w-4 h-4" /> Logout
              </button>
            </div>
          )}
        </div>
        {showMenu && currentUser && (
          <div className="md:hidden bg-amber-800 px-4 py-3 border-t border-amber-700">
            <button onClick={handleLogout} className="w-full flex items-center gap-2 bg-amber-700 hover:bg-amber-600 px-3 py-2 rounded text-white">
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </div>
        )}
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {page === 'admin' ? (
          <AdminPanel
            users={users}
            deleteUserById={deleteUserById}
            setCurrentUser={setCurrentUser}
            setPage={setPage}
            onLogout={() => setPage('home')}
          />
        ) : !currentUser ? (
          <>
            <LoginPage
              users={users}
              addUser={addUser}
              setCurrentUser={setCurrentUser}
              setPage={setPage}
            />
            <div className="mt-8 text-center">
              <button
                onClick={() => setPage('admin')}
                className="bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 font-semibold"
              >
                Admin Login
              </button>
            </div>
          </>
        ) : page === 'home' ? (
          <HomePage currentUser={currentUser} setPage={setPage} updateUser={updateUser} />
        ) : page === 'prakriti' ? (
          <PrakritiTest currentUser={currentUser} updateUser={updateUser} setPage={setPage} onBack={() => setPage('home')} />
        ) : page === 'diet' ? (
          <DietChart prakriti={currentUser.prakriti} onBack={() => setPage('home')} />
        ) : page === 'schedule' ? (
          <DailySchedule prakriti={currentUser.prakriti} onBack={() => setPage('home')} />
        ) : null}
      </div>
    </div>
  );
}
