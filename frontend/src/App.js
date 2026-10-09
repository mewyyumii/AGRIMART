import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Marketplace from './pages/Marketplace';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem('user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const [token, setToken] = useState(() => localStorage.getItem('token'));

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
    <div className="app-shell min-h-screen flex flex-col bg-offwhite text-ink antialiased">
      <ScrollToTop />
      <Navbar user={user} logout={logout} />
      <main className="flex-1 w-full">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={
              !user ? (
                <Login login={login} />
              ) : (
                <Navigate to={user.role === 'farmer' ? '/dashboard' : '/marketplace'} replace />
              )
            }
          />
          <Route
            path="/register"
            element={
              !user ? (
                <Register login={login} />
              ) : (
                <Navigate to={user.role === 'farmer' ? '/dashboard' : '/marketplace'} replace />
              )
            }
          />
          <Route path="/marketplace" element={<Marketplace token={token} />} />
          <Route
            path="/dashboard"
            element={
              user && user.role === 'farmer' ? (
                <Dashboard token={token} />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          {/* Catch-all fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
