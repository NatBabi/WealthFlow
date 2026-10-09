// ============================================
// WealthFlow — Onboarding Setup
// ============================================

'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/store';
import { CURRENCIES, type AllocationConfig } from '@/lib/types';

export default function SetupWizard() {
  const { dispatch } = useApp();
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [income, setIncome] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [allocations, setAllocations] = useState<AllocationConfig>({
    growth: 25,
    stability: 15,
    essentials: 50,
    rewards: 10,
  });

  const totalSteps = 3;
  const currencyObj = CURRENCIES.find((c) => c.code === currency)!;

  const handleComplete = () => {
    dispatch({
      type: 'SETUP_USER',
      payload: {
        name,
        monthlyIncome: parseFloat(income) || 0,
        currency,
        currencySymbol: currencyObj.symbol,
        allocations,
      },
    });
  };

  const updateAllocation = (key: keyof AllocationConfig, value: number) => {
    const remaining = 100 - value;
    const otherKeys = (Object.keys(allocations) as (keyof AllocationConfig)[]).filter((k) => k !== key);
    const otherTotal = otherKeys.reduce((s, k) => s + allocations[k], 0);

    if (otherTotal === 0) return;

    const newAllocations = { ...allocations, [key]: value };
    otherKeys.forEach((k) => {
      newAllocations[k] = Math.round((allocations[k] / otherTotal) * remaining);
    });

    // Fix rounding errors
    const diff = 100 - Object.values(newAllocations).reduce((s, v) => s + v, 0);
    if (diff !== 0) {
      newAllocations[otherKeys[0]] += diff;
    }

    setAllocations(newAllocations);
  };

  return (
    <div className="setup-container">
      {/* Progress */}
      <div className="setup-progress">
        {Array.from({ length: totalSteps }, (_, i) => (
          <div
            key={i}
            className={`setup-progress-dot ${
              i + 1 === step ? 'active' : i + 1 < step ? 'completed' : ''
            }`}
          />
        ))}
      </div>

      {/* Step 1: Profile */}
      {step === 1 && (
        <div className="setup-step">
          <h2 className="setup-title">Welcome to WealthFlow 💰</h2>
          <p className="setup-subtitle">
            Let&apos;s set up your financial dashboard using the 25/15/50/10 rule. 
            If you don&apos;t own something, you are what&apos;s owned.
          </p>

          <div className="card" style={{ marginBottom: '24px' }}>
            <div className="form-group">
              <label className="form-label">Your Name</label>
              <input
                type="text"
                className="form-input"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Currency</label>
              <select
                className="form-input form-select"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
              >
                {CURRENCIES.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.symbol} — {c.name} ({c.code})
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Monthly Income (After Tax)</label>
              <div className="form-prefix">
                <span className="prefix">{currencyObj.symbol}</span>
                <input
                  type="number"
                  className="form-input form-input-mono"
                  placeholder="0.00"
                  value={income}
                  onChange={(e) => setIncome(e.target.value)}
                  min="0"
                  step="100"
                />
              </div>
            </div>
          </div>

          <button
            className="btn btn-primary btn-lg"
            style={{ width: '100%' }}
            disabled={!name || !income || parseFloat(income) <= 0}
            onClick={() => setStep(2)}
          >
            Continue →
          </button>
        </div>
      )}

      {/* Step 2: Allocation */}
      {step === 2 && (
        <div className="setup-step">
          <h2 className="setup-title">Your Money Split 📐</h2>
          <p className="setup-subtitle">
            The default 25/15/50/10 split is recommended, but you can customize it. 
            Total must equal 100%.
          </p>

          <div className="card" style={{ marginBottom: '24px' }}>
            {/* Preview bars */}
            <div style={{ display: 'flex', height: '8px', borderRadius: '8px', overflow: 'hidden', marginBottom: '32px' }}>
              <div style={{ width: `${allocations.growth}%`, background: 'var(--gradient-growth)', transition: 'width 0.3s' }} />
              <div style={{ width: `${allocations.stability}%`, background: 'var(--gradient-stability)', transition: 'width 0.3s' }} />
              <div style={{ width: `${allocations.essentials}%`, background: 'var(--gradient-essentials)', transition: 'width 0.3s' }} />
              <div style={{ width: `${allocations.rewards}%`, background: 'var(--gradient-rewards)', transition: 'width 0.3s' }} />
            </div>

            <div className="allocation-slider">
              <label>🚀 Growth</label>
              <input
                type="range"
                min="5"
                max="60"
                value={allocations.growth}
                onChange={(e) => updateAllocation('growth', parseInt(e.target.value))}
                style={{ accentColor: 'var(--growth)' }}
              />
              <span className="slider-value" style={{ color: 'var(--growth)' }}>
                {allocations.growth}%
              </span>
            </div>

            <div className="allocation-slider">
              <label>🛡️ Stability</label>
              <input
                type="range"
                min="5"
                max="40"
                value={allocations.stability}
                onChange={(e) => updateAllocation('stability', parseInt(e.target.value))}
                style={{ accentColor: 'var(--stability)' }}
              />
              <span className="slider-value" style={{ color: 'var(--stability)' }}>
                {allocations.stability}%
              </span>
            </div>

            <div className="allocation-slider">
              <label>🏠 Essentials</label>
              <input
                type="range"
                min="20"
                max="70"
                value={allocations.essentials}
                onChange={(e) => updateAllocation('essentials', parseInt(e.target.value))}
                style={{ accentColor: 'var(--essentials)' }}
              />
              <span className="slider-value" style={{ color: 'var(--essentials)' }}>
                {allocations.essentials}%
              </span>
            </div>

            <div className="allocation-slider">
              <label>🎉 Rewards</label>
              <input
                type="range"
                min="5"
                max="30"
                value={allocations.rewards}
                onChange={(e) => updateAllocation('rewards', parseInt(e.target.value))}
                style={{ accentColor: 'var(--rewards)' }}
              />
              <span className="slider-value" style={{ color: 'var(--rewards)' }}>
                {allocations.rewards}%
              </span>
            </div>

            {/* Dollar amounts preview */}
            <div style={{ 
              marginTop: '24px', 
              padding: '16px', 
              background: 'var(--bg-tertiary)', 
              borderRadius: '12px',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '12px'
            }}>
              <div>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '1px' }}>Growth</span>
                <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--growth)' }}>
                  {currencyObj.symbol}{((parseFloat(income) || 0) * allocations.growth / 100).toFixed(0)}
                </div>
              </div>
              <div>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '1px' }}>Stability</span>
                <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--stability)' }}>
                  {currencyObj.symbol}{((parseFloat(income) || 0) * allocations.stability / 100).toFixed(0)}
                </div>
              </div>
              <div>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '1px' }}>Essentials</span>
                <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--essentials)' }}>
                  {currencyObj.symbol}{((parseFloat(income) || 0) * allocations.essentials / 100).toFixed(0)}
                </div>
              </div>
              <div>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '1px' }}>Rewards</span>
                <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--rewards)' }}>
                  {currencyObj.symbol}{((parseFloat(income) || 0) * allocations.rewards / 100).toFixed(0)}
                </div>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button className="btn btn-secondary btn-lg" onClick={() => setStep(1)}>
              ← Back
            </button>
            <button
              className="btn btn-primary btn-lg"
              style={{ flex: 1 }}
              onClick={() => setStep(3)}
            >
              Continue →
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Summary */}
      {step === 3 && (
        <div className="setup-step">
          <h2 className="setup-title">You&apos;re All Set! 🎯</h2>
          <p className="setup-subtitle">
            Here&apos;s your personalized wealth plan. Remember: it&apos;s not about how much money you make — it&apos;s about how you manage what you make.
          </p>

          <div className="card" style={{ marginBottom: '24px' }}>
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '8px' }}>
                Monthly Income
              </div>
              <div style={{ fontSize: '2.5rem', fontWeight: 900, fontFamily: 'var(--font-mono)', background: 'linear-gradient(135deg, var(--growth), var(--stability))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                {currencyObj.symbol}{parseFloat(income).toLocaleString()}
              </div>
            </div>

            <div style={{ display: 'grid', gap: '12px' }}>
              {[
                { key: 'growth' as const, emoji: '🚀', label: 'Growth', color: 'var(--growth)', dim: 'var(--growth-dim)' },
                { key: 'stability' as const, emoji: '🛡️', label: 'Stability', color: 'var(--stability)', dim: 'var(--stability-dim)' },
                { key: 'essentials' as const, emoji: '🏠', label: 'Essentials', color: 'var(--essentials)', dim: 'var(--essentials-dim)' },
                { key: 'rewards' as const, emoji: '🎉', label: 'Rewards', color: 'var(--rewards)', dim: 'var(--rewards-dim)' },
              ].map((cat) => (
                <div key={cat.key} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', background: cat.dim, borderRadius: '12px' }}>
                  <span style={{ fontSize: '1.5rem' }}>{cat.emoji}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{cat.label}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>{allocations[cat.key]}% of income</div>
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: cat.color }}>
                    {currencyObj.symbol}{((parseFloat(income) || 0) * allocations[cat.key] / 100).toFixed(0)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button className="btn btn-secondary btn-lg" onClick={() => setStep(2)}>
              ← Back
            </button>
            <button
              className="btn btn-primary btn-lg"
              style={{ flex: 1 }}
              onClick={handleComplete}
            >
              Start Building Wealth 🚀
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
