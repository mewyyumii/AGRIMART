import React from 'react';
import { Link, NavLink } from 'react-router-dom';

export default function Navbar({ user, logout }) {
  return (
    <header className="site-header">
      <nav className="nav-pill" aria-label="Main navigation">
        <Link to="/" className="brand" aria-label="KisanBazar home">
          <span className="brand-mark">✳</span><span>Kisan<span className="brand-light">Bazar</span></span>
        </Link>
        <div className="nav-links">
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/marketplace">Marketplace</NavLink>
          <a href="/#about">About</a>
          <a href="/#benefits">Why KisanBazar</a>
        </div>
        <div className="nav-actions">
          {user ? (
            <>
              {user.role === 'farmer' && <Link className="nav-quiet" to="/dashboard">Dashboard</Link>}
              <button className="nav-cta" onClick={logout}>Logout <span aria-hidden="true">↗</span></button>
            </>
          ) : (
            <>
              <Link className="nav-quiet login-link" to="/login">Log in</Link>
              <Link className="nav-cta" to="/register">Get Started <span aria-hidden="true">→</span></Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
