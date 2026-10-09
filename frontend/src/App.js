import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Marketplace from './pages/Marketplace';

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const [token, setToken] = useState(localStorage.getItem('token'));

  const login = (userData, authToken) => {
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', authToken);
    setUser(userData);
    setToken(authToken);
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    setToken(null);
  };

  return (
    <div className="app-shell min-h-screen flex flex-col">
      <Navbar user={user} logout={logout} />
      <main className="page-shell">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={!user ? <Login login={login} /> : <Navigate to={user.role === 'farmer' ? '/dashboard' : '/marketplace'} />} />
          <Route path="/register" element={!user ? <Register login={login} /> : <Navigate to={user.role === 'farmer' ? '/dashboard' : '/marketplace'} />} />
          <Route path="/marketplace" element={<Marketplace token={token} />} />
          <Route path="/dashboard" element={user && user.role === 'farmer' ? <Dashboard token={token} /> : <Navigate to="/login" />} />
        </Routes>
      </main>
    </div>
  );
}
export default App;
