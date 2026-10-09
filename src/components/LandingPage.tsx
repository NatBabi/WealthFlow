// ============================================
// WealthFlow — Landing Page
// ============================================

'use client';

import React from 'react';

interface Props {
  onGetStarted: () => void;
}

export default function LandingPage({ onGetStarted }: Props) {
  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'var(--bg-primary)', 
      color: 'var(--text-primary)',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Navbar */}
      <nav style={{ padding: '24px 48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--surface-border)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '40px', height: '40px', background: 'var(--gradient-growth)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, color: 'var(--bg-primary)' }}>
            W
          </div>
          <span style={{ fontSize: '1.2rem', fontWeight: 700, letterSpacing: '0.5px' }}>WealthFlow</span>
        </div>
        <div>
          <button className="btn btn-primary" onClick={onGetStarted}>Launch App →</button>
        </div>
      </nav>

      {/* Hero Section */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '80px 24px', textAlign: 'center' }}>
        <div className="tag" style={{ background: 'var(--surface-glass)', border: '1px solid var(--surface-border)', padding: '6px 16px', marginBottom: '24px', color: 'var(--growth)' }}>
          Manage your money like the 1%
        </div>
        
        <h1 style={{ fontSize: '4.5rem', fontWeight: 900, lineHeight: 1.1, maxWidth: '900px', marginBottom: '24px', background: 'linear-gradient(135deg, #fff 30%, #8a8a9a 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
          If you don't own something, you are what's owned.
        </h1>
        
        <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', maxWidth: '700px', marginBottom: '48px', lineHeight: 1.6 }}>
          The richest people are 75% entrepreneurs, 15% investors, and <strong>0% employees who just earn a salary</strong>. Discover the exact 25/15/50/10 system to buy back your freedom.
        </p>
        
        <div style={{ display: 'flex', gap: '16px' }}>
          <button className="btn btn-primary btn-lg" style={{ padding: '16px 32px', fontSize: '1.1rem' }} onClick={onGetStarted}>
            Start Building Wealth
          </button>
          <a href="#how-it-works" className="btn btn-secondary btn-lg" style={{ padding: '16px 32px', fontSize: '1.1rem' }}>
            Learn the System
          </a>
        </div>

        {/* Video / Graphic Placeholder */}
        <div style={{ 
          marginTop: '80px', 
          width: '100%', 
          maxWidth: '1000px', 
          height: '500px', 
          background: 'var(--bg-secondary)', 
          borderRadius: '24px',
          border: '1px solid var(--surface-border)',
          boxShadow: 'var(--shadow-xl)',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div style={{ position: 'absolute', inset: 0, background: 'var(--gradient-card)', opacity: 0.5 }}></div>
          <div style={{ textAlign: 'center', zIndex: 10 }}>
            <div style={{ fontSize: '4rem', marginBottom: '16px' }}>💎</div>
            <h3 style={{ fontSize: '1.5rem', color: 'var(--text-secondary)' }}>The 25/15/50/10 Dashboard</h3>
          </div>
        </div>

        {/* Features / How it works */}
        <section id="how-it-works" style={{ marginTop: '120px', width: '100%', maxWidth: '1200px', textAlign: 'left' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '16px' }}>The Blueprint to Freedom</h2>
            <p style={{ color: 'var(--text-tertiary)', fontSize: '1.1rem' }}>It's not about how much you make. It's about how you manage what you make.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
            <div className="card" style={{ padding: '32px 24px' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '16px' }}>🚀</div>
              <h3 style={{ color: 'var(--growth)', fontSize: '1.5rem', marginBottom: '12px' }}>25% Growth</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                Money that works for you. Invest in index funds, skills, and businesses. Start early—compound interest is the eighth wonder of the world.
              </p>
            </div>
            <div className="card" style={{ padding: '32px 24px' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '16px' }}>🛡️</div>
              <h3 style={{ color: 'var(--stability)', fontSize: '1.5rem', marginBottom: '12px' }}>15% Stability</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                Keeps you in the game. Build a 5-month safety net in a high-yield savings account. Don't let one unexpected bill ruin your progress.
              </p>
            </div>
            <div className="card" style={{ padding: '32px 24px' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '16px' }}>🏠</div>
              <h3 style={{ color: 'var(--essentials)', fontSize: '1.5rem', marginBottom: '12px' }}>50% Essentials</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                Feeds you, not your ego. Cap your lifestyle to avoid modern slavery. Use the 7-day rule to combat impulse purchases.
              </p>
            </div>
            <div className="card" style={{ padding: '32px 24px' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '16px' }}>🎉</div>
              <h3 style={{ color: 'var(--rewards)', fontSize: '1.5rem', marginBottom: '12px' }}>10% Rewards</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                Keeps you sane. Saving without joy feels like punishment. Spend this guilt-free on experiences, vacations, and relationships.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ marginTop: '120px', padding: '80px 24px', background: 'var(--bg-secondary)', width: '100%', borderRadius: '24px', textAlign: 'center', border: '1px solid var(--surface-border)' }}>
          <h2 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '24px' }}>Ready to escape the system?</h2>
          <button className="btn btn-primary btn-lg" style={{ padding: '20px 40px', fontSize: '1.2rem', borderRadius: '50px' }} onClick={onGetStarted}>
            Create Your Wealth Plan Now →
          </button>
        </section>

      </main>

      <footer style={{ padding: '32px 48px', borderTop: '1px solid var(--surface-border)', textAlign: 'center', color: 'var(--text-tertiary)' }}>
        © {new Date().getFullYear()} WealthFlow. Based on the 25-15-50-10 principle.
      </footer>
    </div>
  );
}
