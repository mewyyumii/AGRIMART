import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { productsAPI } from '../services/api';
import { getProduceImage, getProduceTag, handleImageError } from '../utils/productImages';

export default function Marketplace() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeContactModal, setActiveContactModal] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await productsAPI.getAll();
      setProducts(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error('Error fetching marketplace products:', err);
      setError('Unable to load marketplace listings at this moment. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  // Client-side search filtering
  const filteredProducts = products.filter((p) => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return true;
    return (
      p.name?.toLowerCase().includes(query) ||
      p.farmerName?.toLowerCase().includes(query)
    );
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Header Banner */}
      <div className="mb-8 sm:mb-10 text-center max-w-2xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-wider text-leaf">Direct Marketplace</span>
        <h1 className="font-display text-3xl sm:text-5xl font-bold text-forest mt-2 mb-3">
          Fresh Local Produce
        </h1>
        <p className="text-ink-secondary text-sm sm:text-base leading-relaxed">
          Browse seasonal harvests listed directly by regional farmers. Clear prices, honest weights, and zero
          middleman markups.
        </p>

        {/* Search Bar */}
        <div className="mt-6 max-w-md mx-auto">
          <div className="relative flex items-center">
            <span className="absolute left-4 text-ink-muted text-sm" aria-hidden="true">
              🔍
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search produce or farmer name..."
              className="w-full pl-11 pr-4 py-3 bg-white rounded-full border border-sage-border shadow-sm text-sm text-ink placeholder:text-ink-muted focus:outline-none focus:ring-2 focus:ring-leaf focus:border-leaf transition"
              aria-label="Search produce by name or farmer"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 text-xs font-bold text-ink-muted hover:text-ink"
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Loading Skeleton */}
      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="bg-white rounded-2xl border border-sage-border p-4 animate-pulse">
              <div className="h-44 bg-sage-light rounded-xl mb-4"></div>
              <div className="h-4 bg-sage-light rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-sage-light rounded w-1/2 mb-4"></div>
              <div className="flex justify-between items-center pt-2">
                <div className="h-6 bg-sage-light rounded w-1/3"></div>
                <div className="h-8 bg-sage-light rounded-full w-1/3"></div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Error Alert State */}
      {!loading && error && (
        <div className="bg-white rounded-3xl border border-red-200 p-8 sm:p-12 text-center max-w-lg mx-auto shadow-sm">
          <div className="w-14 h-14 rounded-full bg-red-50 text-red-600 flex items-center justify-center text-2xl mx-auto mb-4">
            ⚠️
          </div>
          <h3 className="font-display text-lg font-bold text-forest mb-2">Connection Issue</h3>
          <p className="text-ink-secondary text-sm mb-6 leading-relaxed">{error}</p>
          <button
            onClick={fetchProducts}
            className="inline-flex items-center gap-2 bg-forest hover:bg-forest-light text-white text-xs font-semibold px-6 py-2.5 rounded-full transition"
          >
            Retry Fetching Produce
          </button>
        </div>
      )}

      {/* Empty State: No Products in DB */}
      {!loading && !error && products.length === 0 && (
        <div className="bg-white rounded-3xl border border-sage-border p-12 text-center max-w-lg mx-auto shadow-sm">
          <div className="w-16 h-16 rounded-full bg-sage flex items-center justify-center text-3xl mx-auto mb-4">
            🌾
          </div>
          <h3 className="font-display text-xl font-bold text-forest mb-2">No produce available right now</h3>
          <p className="text-ink-secondary text-sm leading-relaxed mb-6">
            Farmers have not posted any active harvests yet. If you are a producer, sign in and list your produce
            today!
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/register"
              className="bg-cta hover:bg-cta-hover text-white text-xs font-semibold px-5 py-2.5 rounded-full transition"
            >
              Register as Farmer
            </Link>
          </div>
        </div>
      )}

      {/* Empty State: Search Query Returns 0 */}
      {!loading && !error && products.length > 0 && filteredProducts.length === 0 && (
        <div className="bg-white rounded-3xl border border-sage-border p-10 text-center max-w-md mx-auto shadow-sm">
          <span className="text-2xl mb-2 block">🔍</span>
          <h3 className="font-display text-base font-bold text-forest mb-1">No matching produce found</h3>
          <p className="text-ink-secondary text-xs mb-4">
            No harvests match "{searchQuery}". Try a different keyword or view all listings.
          </p>
          <button
            onClick={() => setSearchQuery('')}
            className="text-xs font-semibold text-leaf hover:underline"
          >
            Clear search filter
          </button>
        </div>
      )}

      {/* Product Grid */}
      {!loading && !error && filteredProducts.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4 px-1 text-xs text-ink-secondary">
            <span>
              Showing <strong className="text-forest">{filteredProducts.length}</strong> available{' '}
              {filteredProducts.length === 1 ? 'item' : 'items'}
            </span>
            {searchQuery && (
              <span className="bg-sage px-2 py-0.5 rounded text-forest font-medium">
                Filtered by: "{searchQuery}"
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((p) => {
              const imgSrc = getProduceImage(p.name);
              const tag = getProduceTag(p.name);

              return (
                <article
                  key={p._id}
                  className="bg-white rounded-2xl border border-sage-border p-4 shadow-card card-hover-lift flex flex-col justify-between"
                >
                  <div>
                    {/* Produce Image Card */}
                    <div className="relative h-44 rounded-xl overflow-hidden mb-4 bg-sage-light">
                      <img
                        src={imgSrc}
                        alt={`${p.name} from farmer ${p.farmerName}`}
                        onError={handleImageError}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-forest/85 backdrop-blur-sm text-white text-[10px] font-semibold tracking-wide">
                        {tag}
                      </span>
                    </div>

                    {/* Information */}
                    <div className="mb-2">
                      <h3 className="font-display text-lg font-bold text-forest capitalize mb-0.5">
                        {p.name}
                      </h3>
                      <p className="text-xs text-ink-secondary flex items-center gap-1">
                        <span>Farmer:</span>
                        <strong className="text-forest font-semibold">{p.farmerName}</strong>
                      </p>
                    </div>
                  </div>

                  {/* Pricing, Stock, and Contact Button */}
                  <div className="pt-3 border-t border-sage-border/60">
                    <div className="flex items-baseline justify-between mb-2">
                      <span className="font-display text-lg font-extrabold text-leaf">
                        ₹{p.price}{' '}
                        <span className="text-xs font-normal text-ink-secondary">/ {p.unit}</span>
                      </span>
                      <span className="text-[11px] font-medium text-ink-muted">
                        Stock: <strong className="text-forest">{p.quantityInStock}</strong> {p.unit}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => setActiveContactModal(p)}
                      className="w-full bg-forest hover:bg-forest-light active:bg-forest-deep text-white text-xs font-semibold py-2 px-3 rounded-full transition-colors duration-150 flex items-center justify-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-leaf"
                      aria-label={`Contact farmer ${p.farmerName} regarding ${p.name}`}
                    >
                      <span>Contact Farmer</span>
                      <span aria-hidden="true">→</span>
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      )}

      {/* Contact Farmer Interactive Modal */}
      {activeContactModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-forest-deep/80 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="contact-modal-title"
        >
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-sage-border relative animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setActiveContactModal(null)}
              className="absolute top-5 right-5 text-ink-muted hover:text-forest p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-leaf"
              aria-label="Close dialog"
            >
              ✕
            </button>

            <div className="w-12 h-12 rounded-2xl bg-sage flex items-center justify-center text-forest text-xl mb-4 font-bold">
              👨‍🌾
            </div>

            <h3 id="contact-modal-title" className="font-display text-xl font-bold text-forest mb-1">
              Contact {activeContactModal.farmerName}
            </h3>
            <p className="text-xs text-ink-secondary mb-4">
              Direct producer inquiry for <strong className="text-forest capitalize">{activeContactModal.name}</strong>
            </p>

            <div className="bg-sage-light rounded-2xl p-4 border border-sage-border space-y-2.5 text-xs text-ink mb-5">
              <div className="flex justify-between">
                <span className="text-ink-secondary">Listed Rate:</span>
                <span className="font-bold text-forest">₹{activeContactModal.price} per {activeContactModal.unit}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-ink-secondary">Current Stock:</span>
                <span className="font-bold text-forest">{activeContactModal.quantityInStock} {activeContactModal.unit}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-ink-secondary">Direct Producer:</span>
                <span className="font-bold text-forest">{activeContactModal.farmerName}</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-offwhite border border-sage-border text-[11px] text-ink-secondary leading-relaxed mb-6">
              💡 <strong>Direct Connect MVP:</strong> In this release, produce transactions are arranged directly between
              the buyer and the farmer without intermediary fees. Reach out to coordinate quantities and pickup/delivery.
            </div>

            <button
              onClick={() => setActiveContactModal(null)}
              className="w-full bg-forest text-white font-semibold text-xs sm:text-sm py-3 rounded-full hover:bg-forest-light transition"
            >
              Got It, Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
