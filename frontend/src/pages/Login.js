import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { authAPI } from '../services/api';
import Logo from '../components/Logo';

export default function Login({ login }) {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await authAPI.login(formData);
      login(res.data.user, res.data.token);
    } catch (err) {
      setError(
        err.response?.data?.msg ||
          'Unable to sign in. Please check your email and password.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-10 border border-sage-border shadow-float">
        <div className="text-center mb-8">
          <div className="inline-block mb-3">
            <Logo variant="dark" />
          </div>
          <h1 className="font-display text-2xl font-bold text-forest mt-2">Welcome Back</h1>
          <p className="text-ink-secondary text-xs sm:text-sm mt-1">
            Sign in to access your AGRIMART account
          </p>
        </div>

        {error && (
          <div
            className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm flex items-start gap-2.5"
            role="alert"
          >
            <span className="text-base flex-shrink-0" aria-hidden="true">
              ⚠️
            </span>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="login-email"
              className="block text-xs font-semibold text-ink uppercase tracking-wider mb-1.5"
            >
              Email Address
            </label>
            <input
              id="login-email"
              type="email"
              required
              autoComplete="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="name@example.com"
              className="w-full px-4 py-3 rounded-xl border border-sage-border text-sm text-ink placeholder:text-ink-muted focus:outline-none focus:ring-2 focus:ring-leaf focus:border-leaf transition"
            />
          </div>

          <div>
            <label
              htmlFor="login-password"
              className="block text-xs font-semibold text-ink uppercase tracking-wider mb-1.5"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="login-password"
                type={showPassword ? 'text' : 'password'}
                required
                autoComplete="current-password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl border border-sage-border text-sm text-ink placeholder:text-ink-muted focus:outline-none focus:ring-2 focus:ring-leaf focus:border-leaf transition pr-11"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-muted hover:text-ink text-xs font-medium p-1 rounded"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 bg-cta hover:bg-cta-hover active:bg-cta-active disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold text-sm py-3.5 px-4 rounded-full shadow-md hover:shadow transition-all duration-200 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin h-4 w-4 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  />
                </svg>
                <span>Signing in...</span>
              </>
            ) : (
              <span>Sign In</span>
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-sage-border text-center text-xs text-ink-secondary">
          Don't have an account yet?{' '}
          <Link to="/register" className="font-semibold text-leaf hover:underline">
            Create an account
          </Link>
        </div>
      </div>
    </div>
  );
}
