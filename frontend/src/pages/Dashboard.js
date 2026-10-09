import React, { useState, useEffect } from 'react';
import { productsAPI } from '../services/api';
import { getProduceImage, handleImageError } from '../utils/productImages';

export default function Dashboard({ token }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [fetchError, setFetchError] = useState(null);
  const [formError, setFormError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const [form, setForm] = useState({
    name: '',
    price: '',
    unit: 'kg',
    quantityInStock: '',
  });

  const fetchMyProducts = async () => {
    setLoading(true);
    setFetchError(null);
    try {
      const res = await productsAPI.getFarmerProducts(token);
      setProducts(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error('Error fetching farmer products:', err);
      setFetchError('Failed to load your listings. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyProducts();
  }, []);

  const addProduct = async (e) => {
    e.preventDefault();
    setFormError(null);
    setSuccessMessage(null);
    setSubmitting(true);

    try {
      await productsAPI.createProduct(
        {
          name: form.name.trim(),
          price: Number(form.price),
          unit: form.unit,
          quantityInStock: Number(form.quantityInStock),
        },
        token
      );

      setSuccessMessage(`"${form.name}" has been published to the AGRIMART marketplace!`);
      setForm({ name: '', price: '', unit: 'kg', quantityInStock: '' });
      fetchMyProducts();
    } catch (err) {
      console.error('Error adding product:', err);
      setFormError(err.response?.data?.msg || 'Failed to add produce. Please verify all fields.');
    } finally {
      setSubmitting(false);
    }
  };

  // Quick summary numbers
  const totalUnits = products.reduce((acc, curr) => acc + (Number(curr.quantityInStock) || 0), 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Header Banner */}
      <div className="mb-8">
        <span className="text-xs font-bold uppercase tracking-wider text-leaf">Farmer Workspace</span>
        <h1 className="font-display text-2xl sm:text-4xl font-bold text-forest mt-1">
          Produce Management Dashboard
        </h1>
        <p className="text-ink-secondary text-sm mt-1">
          List your harvest, update your inventory, and connect directly with regional consumers.
        </p>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
        <div className="bg-white rounded-2xl p-5 border border-sage-border shadow-card flex items-center justify-between">
          <div>
            <span className="text-xs text-ink-muted uppercase font-semibold">Active Listings</span>
            <p className="font-display text-3xl font-extrabold text-forest mt-1">{products.length}</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-sage flex items-center justify-center text-xl">
            📦
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-sage-border shadow-card flex items-center justify-between">
          <div>
            <span className="text-xs text-ink-muted uppercase font-semibold">Total Produce in Stock</span>
            <p className="font-display text-3xl font-extrabold text-leaf mt-1">{totalUnits}</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-sage flex items-center justify-center text-xl">
            🌾
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-sage-border shadow-card flex items-center justify-between sm:col-span-2 lg:col-span-1">
          <div>
            <span className="text-xs text-ink-muted uppercase font-semibold">Platform Fee</span>
            <p className="font-display text-3xl font-extrabold text-forest mt-1">0%</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-sage flex items-center justify-center text-xl">
            🤝
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* ========================================================
            ADD NEW PRODUCE FORM (Left Column)
           ======================================================== */}
        <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-sage-border shadow-float">
          <div className="flex items-center gap-2 mb-6">
            <span className="text-2xl">🌱</span>
            <h2 className="font-display text-xl font-bold text-forest">Add New Harvest</h2>
          </div>

          {successMessage && (
            <div
              className="mb-5 p-3.5 rounded-xl bg-sage-light border border-leaf/40 text-leaf text-xs font-medium flex items-center gap-2"
              role="alert"
            >
              <span>✓</span>
              <span>{successMessage}</span>
            </div>
          )}

          {formError && (
            <div
              className="mb-5 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium flex items-center gap-2"
              role="alert"
            >
              <span>⚠️</span>
              <span>{formError}</span>
            </div>
          )}

          <form onSubmit={addProduct} className="space-y-4">
            <div>
              <label
                htmlFor="dash-prod-name"
                className="block text-xs font-semibold text-ink uppercase tracking-wider mb-1.5"
              >
                Produce Name
              </label>
              <input
                id="dash-prod-name"
                type="text"
                placeholder="e.g. Organic Tomatoes, Fresh Spinach, Basmati Rice"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-sage-border text-sm text-ink placeholder:text-ink-muted focus:outline-none focus:ring-2 focus:ring-leaf focus:border-leaf transition"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label
                  htmlFor="dash-prod-price"
                  className="block text-xs font-semibold text-ink uppercase tracking-wider mb-1.5"
                >
                  Price (₹)
                </label>
                <input
                  id="dash-prod-price"
                  type="number"
                  placeholder="50"
                  min="0"
                  step="any"
                  required
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-sage-border text-sm text-ink placeholder:text-ink-muted focus:outline-none focus:ring-2 focus:ring-leaf focus:border-leaf transition"
                />
              </div>

              <div>
                <label
                  htmlFor="dash-prod-unit"
                  className="block text-xs font-semibold text-ink uppercase tracking-wider mb-1.5"
                >
                  Unit
                </label>
                <select
                  id="dash-prod-unit"
                  value={form.unit}
                  onChange={(e) => setForm({ ...form, unit: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl border border-sage-border text-sm text-ink bg-white focus:outline-none focus:ring-2 focus:ring-leaf focus:border-leaf transition"
                >
                  <option value="kg">per kg</option>
                  <option value="dozen">per dozen</option>
                  <option value="piece">per piece</option>
                </select>
              </div>
            </div>

            <div>
              <label
                htmlFor="dash-prod-stock"
                className="block text-xs font-semibold text-ink uppercase tracking-wider mb-1.5"
              >
                Quantity in Stock
              </label>
              <input
                id="dash-prod-stock"
                type="number"
                placeholder="100"
                min="1"
                required
                value={form.quantityInStock}
                onChange={(e) => setForm({ ...form, quantityInStock: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-sage-border text-sm text-ink placeholder:text-ink-muted focus:outline-none focus:ring-2 focus:ring-leaf focus:border-leaf transition"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full mt-2 bg-cta hover:bg-cta-hover active:bg-cta-active disabled:bg-gray-300 text-white font-semibold text-sm py-3 px-4 rounded-full shadow transition-all duration-200 flex items-center justify-center gap-2"
            >
              {submitting ? (
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
                  <span>Publishing Listing...</span>
                </>
              ) : (
                <span>Publish to Marketplace</span>
              )}
            </button>
          </form>
        </div>

        {/* ========================================================
            MY ACTIVE LISTINGS (Right Column)
           ======================================================== */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-sage-border shadow-float">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <span className="text-2xl">📋</span>
              <h2 className="font-display text-xl font-bold text-forest">My Active Listings</h2>
            </div>
            <button
              onClick={fetchMyProducts}
              className="text-xs font-semibold text-leaf hover:text-forest transition"
              aria-label="Refresh listings"
            >
              ↻ Refresh
            </button>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="p-4 rounded-2xl bg-sage-light animate-pulse flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-sage"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-sage rounded w-1/3"></div>
                    <div className="h-3 bg-sage rounded w-1/4"></div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Error State */}
          {!loading && fetchError && (
            <div className="p-6 rounded-2xl bg-red-50 border border-red-200 text-center text-xs">
              <p className="text-red-700 font-medium mb-3">{fetchError}</p>
              <button
                onClick={fetchMyProducts}
                className="bg-forest text-white px-4 py-1.5 rounded-full hover:bg-forest-light transition"
              >
                Retry
              </button>
            </div>
          )}

          {/* Empty State */}
          {!loading && !fetchError && products.length === 0 && (
            <div className="p-10 text-center rounded-2xl border border-dashed border-sage-border">
              <span className="text-3xl mb-2 block">🌾</span>
              <h3 className="font-display font-bold text-forest text-sm mb-1">No products listed yet</h3>
              <p className="text-ink-secondary text-xs max-w-xs mx-auto">
                Fill in the form on the left to list your first batch of produce on AGRIMART!
              </p>
            </div>
          )}

          {/* Loaded List */}
          {!loading && !fetchError && products.length > 0 && (
            <div className="divide-y divide-sage-border">
              {products.map((p) => {
                const imgSrc = getProduceImage(p.name);
                return (
                  <div key={p._id} className="py-4 first:pt-0 last:pb-0 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3.5">
                      <div className="w-14 h-14 rounded-xl overflow-hidden bg-sage-light flex-shrink-0 border border-sage-border">
                        <img
                          src={imgSrc}
                          alt={p.name}
                          onError={handleImageError}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-display font-bold text-forest capitalize text-sm sm:text-base">
                          {p.name}
                        </h4>
                        <p className="text-xs text-ink-secondary mt-0.5">
                          In Stock: <strong className="text-forest">{p.quantityInStock}</strong> {p.unit}
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="font-display text-base sm:text-lg font-bold text-leaf block">
                        ₹{p.price}
                      </span>
                      <span className="text-[11px] text-ink-muted">per {p.unit}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
