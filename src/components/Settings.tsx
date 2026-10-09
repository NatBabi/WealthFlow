// ============================================
// WealthFlow — Settings
// ============================================

'use client';

import React from 'react';
import { useApp } from '@/lib/store';
import { CURRENCIES } from '@/lib/types';

export default function Settings() {
  const { state, dispatch } = useApp();
  const { user } = state;

  const handleReset = () => {
    if (confirm('Are you sure you want to completely reset all your data? This cannot be undone.')) {
      dispatch({ type: 'RESET_DATA' });
    }
  };

  const handleUpdateIncome = (val: string) => {
    const num = parseFloat(val);
    if (!isNaN(num)) {
      dispatch({ type: 'UPDATE_INCOME', payload: num });
    }
  };

  const handleUpdateCurrency = (code: string) => {
    const cur = CURRENCIES.find(c => c.code === code);
    if (cur) {
      dispatch({ 
        type: 'SETUP_USER', 
        payload: { currency: cur.code, currencySymbol: cur.symbol } 
      });
    }
  };

  return (
    <>
      <div className="page-header">
        <div className="page-header-content">
          <div>
            <h1 className="page-title">⚙️ Settings</h1>
            <p className="page-subtitle">Manage your profile and data</p>
          </div>
        </div>
      </div>

      <div className="page-body">
        <div className="card" style={{ maxWidth: '600px', marginBottom: '24px' }}>
          <div className="card-header">
            <span className="card-title">Profile</span>
          </div>
          <div className="form-group">
            <label className="form-label">Name</label>
            <input 
              className="form-input" 
              value={user.name} 
              onChange={(e) => dispatch({ type: 'SETUP_USER', payload: { name: e.target.value } })} 
            />
          </div>
          <div className="form-group">
            <label className="form-label">Monthly Income</label>
            <input 
              className="form-input form-input-mono" 
              type="number" 
              value={user.monthlyIncome} 
              onChange={(e) => handleUpdateIncome(e.target.value)} 
            />
          </div>
          <div className="form-group">
            <label className="form-label">Currency</label>
            <select 
              className="form-input form-select" 
              value={user.currency} 
              onChange={(e) => handleUpdateCurrency(e.target.value)}
            >
              {CURRENCIES.map(c => (
                <option key={c.code} value={c.code}>{c.symbol} — {c.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="card" style={{ maxWidth: '600px', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
          <div className="card-header">
            <span className="card-title" style={{ color: 'var(--danger)' }}>Danger Zone</span>
          </div>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>
            This will permanently delete all your transactions, assets, and settings.
          </p>
          <button className="btn btn-danger" onClick={handleReset}>
            Reset All Data
          </button>
        </div>
      </div>
    </>
  );
}
