import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';

export default function Footer() {
  return (
    <footer className="bg-forest text-white mt-auto border-t border-forest-surface" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">Footer</h2>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="md:col-span-2 space-y-4">
            <Logo variant="light" showTagline={true} />
            <p className="text-sage text-sm max-w-md leading-relaxed mt-3">
              AGRIMART connects local agricultural producers directly with consumers. We eliminate unfair middlemen
              markups, ensure fair prices for farmers, and deliver transparent, fresh harvest to local communities.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest-surface text-sage text-xs font-medium border border-white/10">
                <span className="w-2 h-2 rounded-full bg-cta animate-pulse"></span>
                Direct from verified growers
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest-surface text-sage text-xs font-medium border border-white/10">
                0% Middleman cuts
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h3 className="text-white font-display text-sm font-semibold tracking-wider uppercase">Marketplace</h3>
            <ul className="space-y-2 text-sm text-sage">
              <li>
                <Link to="/marketplace" className="hover:text-white transition-colors duration-150">
                  Browse All Produce
                </Link>
              </li>
              <li>
                <a href="/#how-it-works" className="hover:text-white transition-colors duration-150">
                  How AGRIMART Works
                </a>
              </li>
              <li>
                <a href="/#about" className="hover:text-white transition-colors duration-150">
                  About Our Network
                </a>
              </li>
            </ul>
          </div>

          {/* For Farmers */}
          <div className="space-y-3">
            <h3 className="text-white font-display text-sm font-semibold tracking-wider uppercase">For Farmers</h3>
            <ul className="space-y-2 text-sm text-sage">
              <li>
                <Link to="/register" className="hover:text-white transition-colors duration-150">
                  Join as a Farmer
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-white transition-colors duration-150">
                  Farmer Sign In
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-white transition-colors duration-150">
                  Manage Listings
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-sage/75">
          <p>© {new Date().getFullYear()} AGRIMART. Fresh from farms. Fair for everyone.</p>
          <div className="flex items-center gap-6">
            <span className="text-sage/60">Local Sustainable Agriculture Initiative</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
