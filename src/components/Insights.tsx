// ============================================
// WealthFlow — Insights & Philosophy
// ============================================

'use client';

import React from 'react';

export default function Insights() {
  return (
    <>
      <div className="page-header">
        <div className="page-header-content">
          <div>
            <h1 className="page-title">💡 The 1% Philosophy</h1>
            <p className="page-subtitle">Understand how wealth is actually built</p>
          </div>
        </div>
      </div>

      <div className="page-body">
        
        {/* The Ownership Divide */}
        <div className="card" style={{ marginBottom: '24px' }}>
          <div className="card-header">
            <span className="card-title">The Wealth Ownership Divide</span>
          </div>
          
          <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '16px' }}>
                "If you don't own something, you are what's owned."
              </div>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '16px', lineHeight: 1.6 }}>
                The richest people in the world all have one thing in common: they own things. Employees who just earn a salary make up 0% of this group.
              </p>
              
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <li style={{ display: 'flex', gap: '12px' }}>
                  <span style={{ width: '40px', fontWeight: 700, color: 'var(--growth)' }}>75%</span>
                  <span><strong>Entrepreneurs</strong> own businesses</span>
                </li>
                <li style={{ display: 'flex', gap: '12px' }}>
                  <span style={{ width: '40px', fontWeight: 700, color: 'var(--stability)' }}>15%</span>
                  <span><strong>Investors</strong> own assets (stocks, real estate)</span>
                </li>
                <li style={{ display: 'flex', gap: '12px' }}>
                  <span style={{ width: '40px', fontWeight: 700, color: 'var(--essentials)' }}>7%</span>
                  <span><strong>Inheritors</strong> own trusts</span>
                </li>
                <li style={{ display: 'flex', gap: '12px' }}>
                  <span style={{ width: '40px', fontWeight: 700, color: 'var(--rewards)' }}>3%</span>
                  <span><strong>Athletes/Artists</strong> own rare skills</span>
                </li>
                <li style={{ display: 'flex', gap: '12px', marginTop: '8px', paddingTop: '8px', borderTop: '1px solid var(--surface-border)' }}>
                  <span style={{ width: '40px', fontWeight: 700, color: 'var(--text-muted)' }}>0%</span>
                  <span style={{ color: 'var(--text-tertiary)' }}><strong>Employees</strong> who just earn a salary</span>
                </li>
              </ul>
            </div>
            
            <div style={{ width: '200px', height: '200px', borderRadius: '50%', background: 'conic-gradient(var(--growth) 0% 75%, var(--stability) 75% 90%, var(--essentials) 90% 97%, var(--rewards) 97% 100%)', boxShadow: '0 0 30px rgba(0,0,0,0.5)', position: 'relative' }}>
              <div style={{ position: 'absolute', inset: '20px', background: 'var(--bg-card)', borderRadius: '50%' }}></div>
            </div>
          </div>
        </div>

        {/* The System Design */}
        <div className="card" style={{ marginBottom: '24px', background: 'rgba(239, 68, 68, 0.05)', borderColor: 'rgba(239, 68, 68, 0.15)' }}>
          <div className="card-header">
            <span className="card-title" style={{ color: 'var(--danger)' }}>The System is by Design</span>
          </div>
          <p style={{ color: 'var(--text-primary)', marginBottom: '16px', lineHeight: 1.6, fontSize: '1.05rem' }}>
            "The system wants us rich for a week, then skint by the end of the month waiting for the next payday, so we've got no breathing room and then we're forced to work even harder next month just to keep up. This is effectively modern day slavery."
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginTop: '24px' }}>
            <div style={{ padding: '16px', background: 'var(--bg-card)', borderRadius: '8px', border: '1px solid var(--surface-border)' }}>
              <h4 style={{ marginBottom: '8px', color: 'var(--text-secondary)' }}>The Past</h4>
              <p style={{ fontSize: '0.85rem' }}>Slaves worked every day with no pay, but they got free food, shelter, and water.</p>
            </div>
            <div style={{ padding: '16px', background: 'var(--bg-card)', borderRadius: '8px', border: '1px solid var(--surface-border)' }}>
              <h4 style={{ marginBottom: '8px', color: 'var(--text-secondary)' }}>The Present</h4>
              <p style={{ fontSize: '0.85rem' }}>People work nearly every day and get paid. However, their money is mostly spent on food, shelter, and water.</p>
            </div>
          </div>
          <div style={{ textAlign: 'center', marginTop: '24px', fontWeight: 600, color: 'var(--danger)' }}>
            The only thing that has changed is the illusion of freedom.
          </div>
        </div>

        {/* How to fight back */}
        <div className="card">
          <div className="card-header">
            <span className="card-title">How to Fight Back (The Blueprint)</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div style={{ padding: '20px', background: 'var(--growth-dim)', borderRadius: '12px', border: '1px solid rgba(0, 212, 170, 0.2)' }}>
              <div style={{ fontSize: '2rem', marginBottom: '12px' }}>1</div>
              <h4 style={{ fontSize: '1.1rem', marginBottom: '8px', color: 'var(--growth)' }}>Take 25% Immediately</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                Before paying bills, put 25% straight into assets. While you work, these assets work for you in the background. Eventually, they replace your day job.
              </p>
            </div>
            <div style={{ padding: '20px', background: 'var(--stability-dim)', borderRadius: '12px', border: '1px solid rgba(99, 102, 241, 0.2)' }}>
              <div style={{ fontSize: '2rem', marginBottom: '12px' }}>2</div>
              <h4 style={{ fontSize: '1.1rem', marginBottom: '8px', color: 'var(--stability)' }}>Build a 15% Shield</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                One unexpected bill ruins progress. Build a 5-month stability fund so you are never forced to sell investments at a bad time.
              </p>
            </div>
            <div style={{ padding: '20px', background: 'var(--essentials-dim)', borderRadius: '12px', border: '1px solid rgba(245, 158, 11, 0.2)' }}>
              <div style={{ fontSize: '2rem', marginBottom: '12px' }}>3</div>
              <h4 style={{ fontSize: '1.1rem', marginBottom: '8px', color: 'var(--essentials)' }}>Cap Lifestyle at 50%</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                Capping forces you to eliminate waste. Change your mindset from wanting to spend more of what you earn, to wanting to earn more.
              </p>
            </div>
            <div style={{ padding: '20px', background: 'var(--rewards-dim)', borderRadius: '12px', border: '1px solid rgba(236, 72, 153, 0.2)' }}>
              <div style={{ fontSize: '2rem', marginBottom: '12px' }}>4</div>
              <h4 style={{ fontSize: '1.1rem', marginBottom: '8px', color: 'var(--rewards)' }}>Protect Sanity with 10%</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                Saving without joy feels like punishment. Spend 10% guilt-free on experiences, hobbies, and gifts to keep yourself in the game long-term.
              </p>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}
