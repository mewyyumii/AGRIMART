import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { productsAPI } from '../services/api';
import { getProduceImage, getProduceTag, handleImageError } from '../utils/productImages';

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [infoModalOpen, setInfoModalOpen] = useState(false);

  useEffect(() => {
    fetchFeatured();
  }, []);

  const fetchFeatured = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await productsAPI.getAll();
      // Show up to 4 featured products
      setFeaturedProducts(Array.isArray(res.data) ? res.data.slice(0, 4) : []);
    } catch (err) {
      console.error('Failed to load featured products', err);
      setError('Unable to load current harvests right now.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home-page min-h-screen">
      {/* ========================================================
          1. MAIN HERO FRAME (Inspired by Reference Composition)
         ======================================================== */}
      <section className="px-3 sm:px-6 lg:px-8 pt-2 sm:pt-4 pb-12 sm:pb-16 max-w-7xl mx-auto">
        <div
          className="relative min-h-[640px] sm:min-h-[720px] lg:min-h-[760px] rounded-3xl sm:rounded-[36px] overflow-hidden shadow-2xl flex flex-col justify-between p-6 sm:p-10 lg:p-16 text-white"
          style={{
            backgroundImage: "url('/assets/hero-tea-aerial.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center 45%',
          }}
        >
          {/* Deep Forest Green Gradient Overlay for Maximum Text Readability */}
          <div
            className="absolute inset-0 bg-gradient-to-r from-forest-deep/90 via-forest/80 to-forest-deep/60 sm:to-transparent"
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-forest-deep/90 via-transparent to-black/30"
            aria-hidden="true"
          />

          {/* Top Whitespace Buffer (accommodates floating pill navbar) */}
          <div className="relative z-10 pt-16 sm:pt-20"></div>

          {/* Hero Main Content (Two-Column on Desktop) */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end my-auto">
            {/* Left Headline & Main CTAs */}
            <div className="lg:col-span-8 max-w-2xl">
              {/* Eyebrow Pill Badge */}
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6 sm:mb-8 text-xs font-semibold tracking-wider text-sage uppercase">
                <span className="w-2 h-2 rounded-full bg-highlightYellow shadow-[0_0_8px_#EAB308]"></span>
                A Better Way to Buy Local
              </div>

              {/* Confident Headline (Manrope typography) */}
              <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.08] mb-6">
                Good food starts <br className="hidden sm:inline" />
                with good farms.
              </h1>

              {/* Supporting Copy */}
              <p className="text-sage text-base sm:text-lg lg:text-xl font-normal leading-relaxed max-w-xl mb-8">
                Discover fresh produce directly from local farmers, with clear prices, zero hidden fees, and a more
                direct connection to the people who grow your food.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4">
                <Link
                  to="/marketplace"
                  className="inline-flex items-center gap-2 bg-cta hover:bg-cta-hover active:bg-cta-active text-white text-sm sm:text-base font-semibold px-6 sm:px-7 py-3 sm:py-3.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5"
                >
                  <span>Explore Marketplace</span>
                  <span aria-hidden="true">→</span>
                </Link>
                <Link
                  to="/register"
                  className="inline-flex items-center gap-2 bg-white/15 hover:bg-white/25 active:bg-white/30 text-white border border-white/30 backdrop-blur-md text-sm sm:text-base font-semibold px-6 sm:px-7 py-3 sm:py-3.5 rounded-full transition-all duration-200 transform hover:-translate-y-0.5"
                >
                  Join as a Farmer
                </Link>
              </div>
            </div>
          </div>

          {/* Hero Bottom Layer: Feature Card (Lower-Left) & Supporting Note (Lower-Right) */}
          <div className="relative z-10 pt-10 sm:pt-14 grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
            {/* Supporting Feature Card (Lower-Left) */}
            <div className="md:col-span-6 lg:col-span-5">
              <button
                type="button"
                onClick={() => setInfoModalOpen(true)}
                className="group text-left flex items-center gap-3.5 bg-forest-deep/80 hover:bg-forest-deep/95 backdrop-blur-md border border-white/20 p-2.5 sm:p-3 rounded-2xl shadow-xl transition-all duration-200 max-w-sm focus:outline-none focus:ring-2 focus:ring-leaf"
                aria-label="Learn more about our local sourcing model"
              >
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden flex-shrink-0 border border-white/15">
                  <img
                    src="/assets/feature-field.jpg"
                    alt="Farmers harvesting crops directly in field"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/25 flex items-center justify-center">
                    <span className="w-6 h-6 rounded-full bg-white/80 text-forest flex items-center justify-center text-xs font-bold shadow">
                      ✦
                    </span>
                  </div>
                </div>
                <div className="flex-1 pr-1">
                  <span className="text-[10px] font-semibold tracking-wider text-highlightYellow uppercase block mb-0.5">
                    Local Sourcing Model
                  </span>
                  <h4 className="text-white text-xs sm:text-sm font-semibold font-display group-hover:text-sage transition-colors">
                    Closer to the source
                  </h4>
                  <p className="text-sage/80 text-[11px] leading-tight mt-0.5 line-clamp-2">
                    Direct harvest connection with verified local growers.
                  </p>
                </div>
                <span className="text-sage group-hover:translate-x-1 transition-transform text-sm pr-2">↗</span>
              </button>
            </div>

            {/* Supporting Sustainability / Trust Message (Lower-Right) */}
            <div className="md:col-span-6 lg:col-span-7 flex flex-col md:items-end text-left md:text-right">
              <div className="max-w-md bg-forest-deep/60 md:bg-transparent backdrop-blur-sm md:backdrop-blur-none p-3 md:p-0 rounded-2xl border border-white/10 md:border-none">
                <p className="text-sage text-xs sm:text-sm leading-relaxed mb-3">
                  Empowering farming communities with direct fair pricing and transparent sourcing that supports
                  long-term agricultural sustainability.
                </p>
                <a
                  href="#how-it-works"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-cta/90 hover:bg-cta px-4 py-2 rounded-full transition shadow-sm"
                >
                  <span>How it works</span>
                  <span>↓</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          2. TRUST & VALUE PILLARS SECTION
         ======================================================== */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto" id="about">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-leaf">Core Values</span>
          <h2 className="font-display text-2xl sm:text-4xl font-bold text-forest mt-2 mb-4">
            Built on trust, freshness, and fairness.
          </h2>
          <p className="text-ink-secondary text-sm sm:text-base leading-relaxed">
            AGRIMART is designed to shorten the distance between where food is grown and where it is enjoyed.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {/* Pillar 1 */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-sage-border shadow-card card-hover-lift">
            <div className="w-12 h-12 rounded-xl bg-sage flex items-center justify-center text-forest mb-5 font-bold text-lg">
              🌱
            </div>
            <h3 className="font-display text-lg sm:text-xl font-bold text-forest mb-2">Local Farmers</h3>
            <p className="text-ink-secondary text-sm leading-relaxed">
              Every listing connects directly to genuine local farmers who harvest seasonal crops in your region,
              keeping agriculture vibrant.
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-sage-border shadow-card card-hover-lift">
            <div className="w-12 h-12 rounded-xl bg-sage flex items-center justify-center text-forest mb-5 font-bold text-lg">
              ⚖️
            </div>
            <h3 className="font-display text-lg sm:text-xl font-bold text-forest mb-2">Transparent Pricing</h3>
            <p className="text-ink-secondary text-sm leading-relaxed">
              Farmers determine their own rates with zero commission deduction. Buyers see exactly what their money pays
              for without inflated distributor margins.
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-sage-border shadow-card card-hover-lift">
            <div className="w-12 h-12 rounded-xl bg-sage flex items-center justify-center text-forest mb-5 font-bold text-lg">
              🥬
            </div>
            <h3 className="font-display text-lg sm:text-xl font-bold text-forest mb-2">Peak Freshness</h3>
            <p className="text-ink-secondary text-sm leading-relaxed">
              Produce moves straight from farm fields without spending weeks in cold storage warehouses, preserving
              taste, nutrition, and natural quality.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================
          3. FEATURED HARVEST SECTION (API-Powered)
         ======================================================== */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-sage-border/60">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-10 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-leaf">Live Listings</span>
            <h2 className="font-display text-2xl sm:text-4xl font-bold text-forest mt-1">
              Fresh Harvest from the Fields
            </h2>
            <p className="text-ink-secondary text-sm mt-1">
              Explore currently available produce listed by verified regional producers.
            </p>
          </div>
          <Link
            to="/marketplace"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-forest hover:text-leaf transition-colors self-start sm:self-auto"
          >
            <span>View All in Marketplace</span>
            <span>→</span>
          </Link>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white rounded-2xl border border-sage-border p-4 animate-pulse">
                <div className="h-44 bg-sage-light rounded-xl mb-4"></div>
                <div className="h-4 bg-sage-light rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-sage-light rounded w-1/2 mb-4"></div>
                <div className="flex justify-between items-center pt-2">
                  <div className="h-5 bg-sage-light rounded w-1/3"></div>
                  <div className="h-8 bg-sage-light rounded-full w-1/3"></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="bg-white rounded-2xl border border-red-200 p-8 text-center max-w-md mx-auto">
            <span className="text-2xl mb-2 block">⚠️</span>
            <p className="text-ink font-medium text-sm mb-3">{error}</p>
            <button
              onClick={fetchFeatured}
              className="text-xs font-semibold px-4 py-2 bg-forest text-white rounded-full hover:bg-forest-light transition"
            >
              Retry Loading
            </button>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && featuredProducts.length === 0 && (
          <div className="bg-white rounded-3xl border border-sage-border p-10 text-center max-w-lg mx-auto shadow-sm">
            <div className="w-16 h-16 rounded-full bg-sage flex items-center justify-center text-3xl mx-auto mb-4">
              🌾
            </div>
            <h3 className="font-display text-lg font-bold text-forest mb-2">No Produce Listed Yet</h3>
            <p className="text-ink-secondary text-sm leading-relaxed mb-6">
              Be the first local grower to showcase your produce, or check back soon as seasonal harvests are added.
            </p>
            <div className="flex items-center justify-center gap-3">
              <Link
                to="/register"
                className="bg-cta hover:bg-cta-hover text-white text-xs font-semibold px-5 py-2.5 rounded-full transition"
              >
                List Produce as Farmer
              </Link>
            </div>
          </div>
        )}

        {/* Loaded Product Grid */}
        {!loading && !error && featuredProducts.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((p) => {
              const imgSrc = getProduceImage(p.name);
              const tag = getProduceTag(p.name);
              return (
                <article
                  key={p._id}
                  className="bg-white rounded-2xl border border-sage-border p-4 shadow-card card-hover-lift flex flex-col justify-between"
                >
                  <div>
                    {/* Produce Image */}
                    <div className="relative h-44 rounded-xl overflow-hidden mb-4 bg-sage-light">
                      <img
                        src={imgSrc}
                        alt={`${p.name} grown by ${p.farmerName}`}
                        onError={handleImageError}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <span className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full bg-forest/85 backdrop-blur-sm text-white text-[10px] font-semibold tracking-wide">
                        {tag}
                      </span>
                    </div>

                    {/* Produce Info */}
                    <h3 className="font-display text-lg font-bold text-forest capitalize mb-1 line-clamp-1">
                      {p.name}
                    </h3>
                    <p className="text-xs text-ink-secondary mb-3 flex items-center gap-1.5">
                      <span>Grown by</span>
                      <strong className="text-forest font-semibold">{p.farmerName}</strong>
                    </p>
                  </div>

                  {/* Pricing and Action */}
                  <div className="pt-3 border-t border-sage-border/60 flex items-center justify-between">
                    <div>
                      <span className="text-xs text-ink-muted block">Price</span>
                      <span className="font-display text-base sm:text-lg font-extrabold text-leaf">
                        ₹{p.price}
                        <span className="text-xs font-normal text-ink-secondary"> / {p.unit}</span>
                      </span>
                    </div>
                    <Link
                      to="/marketplace"
                      className="text-xs font-semibold px-3.5 py-1.5 rounded-full bg-sage hover:bg-leaf hover:text-white text-forest transition-colors duration-150"
                    >
                      View Details
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      {/* ========================================================
          4. HOW IT WORKS SECTION
         ======================================================== */}
      <section className="py-14 sm:py-20 bg-sage-light border-y border-sage-border" id="how-it-works">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-leaf">Simple Process</span>
            <h2 className="font-display text-2xl sm:text-4xl font-bold text-forest mt-2 mb-4">
              How AGRIMART works for you
            </h2>
            <p className="text-ink-secondary text-sm sm:text-base leading-relaxed">
              Whether you are buying wholesome food or listing your farm's harvest, the marketplace makes direct trade
              effortless.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {/* For Consumers */}
            <div className="bg-white rounded-3xl p-8 border border-sage-border shadow-sm">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sage text-forest text-xs font-semibold mb-6">
                <span>🛒</span> For Consumers
              </div>
              <ol className="space-y-6">
                <li className="flex gap-4">
                  <span className="w-8 h-8 rounded-full bg-forest text-white flex items-center justify-center font-display font-bold text-sm flex-shrink-0">
                    1
                  </span>
                  <div>
                    <h4 className="font-display font-bold text-forest text-base mb-1">Browse Regional Listings</h4>
                    <p className="text-ink-secondary text-xs sm:text-sm leading-relaxed">
                      Discover vegetables, grains, and staples listed by real farmers in your area with verified batch
                      availability.
                    </p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="w-8 h-8 rounded-full bg-forest text-white flex items-center justify-center font-display font-bold text-sm flex-shrink-0">
                    2
                  </span>
                  <div>
                    <h4 className="font-display font-bold text-forest text-base mb-1">Review Transparent Pricing</h4>
                    <p className="text-ink-secondary text-xs sm:text-sm leading-relaxed">
                      See rates set directly by the producer per kg, dozen, or piece without distributor markups.
                    </p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="w-8 h-8 rounded-full bg-forest text-white flex items-center justify-center font-display font-bold text-sm flex-shrink-0">
                    3
                  </span>
                  <div>
                    <h4 className="font-display font-bold text-forest text-base mb-1">Connect Directly</h4>
                    <p className="text-ink-secondary text-xs sm:text-sm leading-relaxed">
                      Coordinate directly with the grower to arrange fresh pickup or delivery, knowing your money supports
                      their farm.
                    </p>
                  </div>
                </li>
              </ol>
            </div>

            {/* For Farmers */}
            <div className="bg-white rounded-3xl p-8 border border-sage-border shadow-sm">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sage text-forest text-xs font-semibold mb-6">
                <span>🚜</span> For Farmers
              </div>
              <ol className="space-y-6">
                <li className="flex gap-4">
                  <span className="w-8 h-8 rounded-full bg-cta text-white flex items-center justify-center font-display font-bold text-sm flex-shrink-0">
                    1
                  </span>
                  <div>
                    <h4 className="font-display font-bold text-forest text-base mb-1">Register in Seconds</h4>
                    <p className="text-ink-secondary text-xs sm:text-sm leading-relaxed">
                      Create your free farmer account with your name and email to access your personal management
                      dashboard.
                    </p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="w-8 h-8 rounded-full bg-cta text-white flex items-center justify-center font-display font-bold text-sm flex-shrink-0">
                    2
                  </span>
                  <div>
                    <h4 className="font-display font-bold text-forest text-base mb-1">Post Your Harvest</h4>
                    <p className="text-ink-secondary text-xs sm:text-sm leading-relaxed">
                      Enter the produce name, your chosen unit (kg, dozen, or piece), price, and in-stock quantity with
                      instant publishing.
                    </p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="w-8 h-8 rounded-full bg-cta text-white flex items-center justify-center font-display font-bold text-sm flex-shrink-0">
                    3
                  </span>
                  <div>
                    <h4 className="font-display font-bold text-forest text-base mb-1">Keep 100% of Your Earnings</h4>
                    <p className="text-ink-secondary text-xs sm:text-sm leading-relaxed">
                      Sell directly to community buyers without intermediary cuts, taking home the fair value of your
                      honest labor.
                    </p>
                  </div>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          5. CALL TO ACTION BANNER FOR FARMERS
         ======================================================== */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="relative rounded-3xl sm:rounded-[32px] overflow-hidden bg-forest p-8 sm:p-12 lg:p-16 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl">
            <span className="text-xs font-bold uppercase tracking-wider text-highlightYellow block mb-2">
              Empowering Growers
            </span>
            <h2 className="font-display text-2xl sm:text-4xl font-bold mb-4 leading-tight">
              Are you a farmer? <br />
              Start listing your produce today.
            </h2>
            <p className="text-sage text-sm sm:text-base leading-relaxed">
              Connect directly with customers who care about locally grown food. Free registration, no commission, and
              complete control over your prices.
            </p>
          </div>
          <div className="flex-shrink-0">
            <Link
              to="/register"
              className="inline-flex items-center gap-2 bg-cta hover:bg-cta-hover active:bg-cta-active text-white font-semibold text-sm sm:text-base px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5"
            >
              <span>Join as a Farmer</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================
          MODAL: Direct Sourcing Information
         ======================================================== */}
      {infoModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-forest-deep/80 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="info-modal-title"
        >
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-sage-border relative animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setInfoModalOpen(false)}
              className="absolute top-5 right-5 text-ink-muted hover:text-forest p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-leaf"
              aria-label="Close dialog"
            >
              ✕
            </button>
            <div className="w-12 h-12 rounded-2xl bg-sage flex items-center justify-center text-forest text-xl mb-4 font-bold">
              ✦
            </div>
            <h3 id="info-modal-title" className="font-display text-xl font-bold text-forest mb-2">
              Direct Sourcing at AGRIMART
            </h3>
            <p className="text-ink-secondary text-sm leading-relaxed mb-4">
              Our sourcing model connects buyers directly to independent growers. When you browse produce on AGRIMART,
              the listing comes straight from the producer with full visibility into their name, stock, and exact price.
            </p>
            <div className="bg-sage-light rounded-xl p-4 border border-sage-border text-xs text-ink-secondary space-y-2 mb-6">
              <div className="flex items-center gap-2">
                <span className="text-leaf font-bold">✓</span> No middleman depot markups
              </div>
              <div className="flex items-center gap-2">
                <span className="text-leaf font-bold">✓</span> Direct farmer compensation
              </div>
              <div className="flex items-center gap-2">
                <span className="text-leaf font-bold">✓</span> Harvested at peak ripeness
              </div>
            </div>
            <button
              onClick={() => setInfoModalOpen(false)}
              className="w-full bg-forest text-white font-semibold text-sm py-3 rounded-full hover:bg-forest-light transition"
            >
              Close and Explore
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
