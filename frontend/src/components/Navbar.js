import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import Logo from './Logo';

export default function Navbar({ user, logout }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Close menu on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navLinkClasses = ({ isActive }) =>
    `text-sm font-medium transition-colors duration-200 px-1 py-1 rounded focus:outline-none focus:ring-2 focus:ring-leaf/50 ${
      isActive ? 'text-leaf font-semibold' : 'text-ink hover:text-leaf'
    }`;

  return (
    <header className="sticky top-3 sm:top-5 z-50 w-full px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto pointer-events-none">
      <nav
        aria-label="Main Navigation"
        className="pointer-events-auto bg-white/95 backdrop-blur-md border border-sage-border shadow-pill rounded-full px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between transition-all duration-300"
      >
        {/* Brand / Logo */}
        <Link
          to="/"
          className="focus:outline-none focus:ring-2 focus:ring-leaf/50 rounded-full"
          aria-label="AGRIMART Home"
        >
          <Logo variant="dark" />
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-7 lg:gap-8">
          <NavLink to="/" end className={navLinkClasses}>
            Home
          </NavLink>
          <NavLink to="/marketplace" className={navLinkClasses}>
            Marketplace
          </NavLink>
          <a
            href="/#how-it-works"
            className="text-sm font-medium text-ink hover:text-leaf transition-colors duration-200 px-1 py-1 rounded focus:outline-none focus:ring-2 focus:ring-leaf/50"
          >
            How It Works
          </a>
          <a
            href="/#about"
            className="text-sm font-medium text-ink hover:text-leaf transition-colors duration-200 px-1 py-1 rounded focus:outline-none focus:ring-2 focus:ring-leaf/50"
          >
            About
          </a>
        </div>

        {/* Desktop Actions & Auth */}
        <div className="hidden md:flex items-center gap-3 lg:gap-4">
          {user ? (
            <div className="flex items-center gap-3">
              {user.role === 'farmer' && (
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) =>
                    `text-xs font-semibold px-3 py-1.5 rounded-full border transition-all ${
                      isActive
                        ? 'bg-forest text-white border-forest'
                        : 'bg-sage/50 text-forest border-sage hover:bg-sage'
                    }`
                  }
                >
                  Farmer Dashboard
                </NavLink>
              )}
              <span className="text-xs text-ink-secondary bg-offwhite px-2.5 py-1 rounded-full border border-sage-border hidden lg:inline-block">
                {user.name} <span className="text-leaf">({user.role})</span>
              </span>
              <button
                onClick={logout}
                className="text-xs font-semibold text-ink-secondary hover:text-forest border border-transparent hover:border-sage-border hover:bg-sage-light px-3 py-1.5 rounded-full transition duration-150"
                aria-label="Log out of account"
              >
                Log out
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                to="/login"
                className="text-sm font-medium text-ink hover:text-forest px-3 py-1.5 rounded-full transition-colors duration-150"
              >
                Log in
              </Link>
              <Link
                to="/marketplace"
                className="inline-flex items-center gap-1.5 bg-cta hover:bg-cta-hover active:bg-cta-active text-white text-xs font-semibold px-4 sm:px-5 py-2.5 rounded-full shadow-sm hover:shadow transition duration-200 group"
              >
                <span>Explore Marketplace</span>
                <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden inline-flex items-center justify-center p-2 rounded-full text-ink hover:text-forest hover:bg-sage focus:outline-none focus:ring-2 focus:ring-leaf"
          aria-expanded={mobileMenuOpen}
          aria-label="Toggle navigation menu"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="pointer-events-auto md:hidden mt-2 bg-white rounded-3xl border border-sage-border shadow-float p-5 transition-all">
          <div className="flex flex-col gap-3">
            <NavLink to="/" end className={navLinkClasses} onClick={() => setMobileMenuOpen(false)}>
              Home
            </NavLink>
            <NavLink to="/marketplace" className={navLinkClasses} onClick={() => setMobileMenuOpen(false)}>
              Marketplace
            </NavLink>
            <a
              href="/#how-it-works"
              className="text-sm font-medium text-ink hover:text-leaf py-1"
              onClick={() => setMobileMenuOpen(false)}
            >
              How It Works
            </a>
            <a
              href="/#about"
              className="text-sm font-medium text-ink hover:text-leaf py-1"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </a>

            <hr className="border-sage-border my-1" />

            {user ? (
              <div className="flex flex-col gap-2 pt-1">
                <div className="text-xs text-ink-secondary py-1">
                  Signed in as <strong className="text-forest">{user.name}</strong> ({user.role})
                </div>
                {user.role === 'farmer' && (
                  <Link
                    to="/dashboard"
                    className="text-xs font-semibold text-center bg-sage text-forest py-2 rounded-full"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Farmer Dashboard
                  </Link>
                )}
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="text-xs font-semibold text-red-600 hover:text-red-700 py-2 text-left"
                >
                  Log out
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-2 pt-2">
                <Link
                  to="/login"
                  className="text-center text-sm font-medium text-ink py-2 rounded-full border border-sage-border hover:bg-sage-light"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Log in
                </Link>
                <Link
                  to="/register"
                  className="text-center text-sm font-semibold text-white bg-cta hover:bg-cta-hover py-2.5 rounded-full"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Join AGRIMART
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
