import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="home-page">
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-shade" />
        <div className="hero-content">
          <div className="eyebrow"><span className="eyebrow-dot" /> FARM FRESH. FAIR PRICES.</div>
          <h1 id="hero-title">Growing a better<br />future for <em>everyone.</em></h1>
          <p className="hero-copy">A smarter way to bring farmers and communities together. Discover fresh local produce, support the people who grow it, and make every harvest count.</p>
          <div className="hero-actions">
            <Link to="/marketplace" className="button button-green">Explore marketplace <span>→</span></Link>
            <Link to="/register" className="button button-glass">Join as a farmer</Link>
          </div>
          <div className="hero-proof"><div className="avatar-stack"><span>🌾</span><span>🥬</span><span>🌱</span></div><div><strong>Rooted in local communities</strong><small>Fresh produce. Real people. Better trade.</small></div></div>
        </div>
        <div className="hero-note"><span className="note-icon">✦</span><div><strong>Good food starts here</strong><p>Connecting growers directly with the people they feed.</p><Link to="/marketplace">See what’s fresh <span>↗</span></Link></div></div>
        <div className="hero-bottom-label"><span /> FROM OUR FIELDS TO YOUR TABLE</div>
      </section>

      <section className="intro-strip" id="about">
        <div><span className="section-kicker">A MORE CONNECTED HARVEST</span><h2>Good for farmers.<br /><em>Better for all.</em></h2></div>
        <p>KisanBazar makes local agriculture more accessible by helping growers showcase their produce and helping buyers discover fresh goods straight from the source.</p>
        <Link to="/marketplace" className="text-link">Discover the marketplace <span>↗</span></Link>
      </section>

      <section className="benefits" id="benefits">
        <article className="benefit-card"><span className="benefit-number">01</span><span className="benefit-icon">🌿</span><h3>Fresh from the source</h3><p>Find seasonal produce listed by the people who grow it.</p></article>
        <article className="benefit-card"><span className="benefit-number">02</span><span className="benefit-icon">🤝</span><h3>Trade more directly</h3><p>Build stronger connections between local farms and buyers.</p></article>
        <article className="benefit-card"><span className="benefit-number">03</span><span className="benefit-icon">🌍</span><h3>Grow sustainably</h3><p>Support local communities and a more resilient food system.</p></article>
      </section>
      <footer className="site-footer"><Link to="/" className="footer-brand">✳ KisanBazar</Link><span>Growing together, one harvest at a time.</span><Link to="/marketplace">Browse produce →</Link></footer>
    </div>
  );
}
