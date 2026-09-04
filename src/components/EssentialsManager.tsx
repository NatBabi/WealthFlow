// ============================================
// WealthFlow — Essentials Manager (50%)
// ============================================

'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/store';
import { CATEGORY_CONFIG, type Category } from '@/lib/types';
import { formatCurrency, formatDate } from '@/lib/utils';
import { Home, AlertTriangle, ClipboardList, Trash2 } from 'lucide-react';

const SUBCATEGORIES: Record<Category, string[]> = {
  growth: ['Index Fund', 'Real Estate', 'Skills', 'Stock', 'Crypto', 'Other Investment'],
  stability: ['Emergency Fund', 'Savings'],
  essentials: ['Housing', 'Groceries', 'Utilities', 'Transport', 'Insurance', 'Clothes', 'Internet', 'Healthcare', 'Other'],
  rewards: ['Vacation', 'Hobbies', 'Dining Out', 'Entertainment', 'Gifts', 'Other Fun'],
};

export default function EssentialsManager() {
  const { state, dispatch } = useApp();
  const { user, transactions } = state;
  const sym = user.currencySymbol;

  const [showAdd, setShowAdd] = useState(false);
  const [txCategory, setTxCategory] = useState<Category>('essentials');
  const [txSubcategory, setTxSubcategory] = useState('Housing');
  const [txDescription, setTxDescription] = useState('');
  const [txAmount, setTxAmount] = useState('');
  const [txDate, setTxDate] = useState(new Date().toISOString().split('T')[0]);
  const [filterCategory, setFilterCategory] = useState<Category | 'all'>('all');

  // Current month stats
  const now = new Date();
  const currentMonthTx = transactions.filter((t) => {
    const d = new Date(t.date);
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  });

  const essentialsBudget = user.monthlyIncome * (user.allocations.essentials / 100);
  const essentialsSpent = currentMonthTx.filter(t => t.category === 'essentials').reduce((s, t) => s + t.amount, 0);
  const essentialsRemaining = essentialsBudget - essentialsSpent;

  // Subcategory breakdown
  const subcategoryBreakdown = currentMonthTx
    .filter(t => t.category === 'essentials')
    .reduce((acc, t) => {
      acc[t.subcategory] = (acc[t.subcategory] || 0) + t.amount;
      return acc;
    }, {} as Record<string, number>);

  const filteredTransactions = filterCategory === 'all'
    ? transactions
    : transactions.filter(t => t.category === filterCategory);

  const handleAdd = () => {
    dispatch({
      type: 'ADD_TRANSACTION',
      payload: {
        amount: parseFloat(txAmount) || 0,
        category: txCategory,
        subcategory: txSubcategory,
        description: txDescription,
        date: txDate,
        isRecurring: false,
      },
    });
    setTxDescription('');
    setTxAmount('');
    setShowAdd(false);
  };

  return (
    <>
      <div className="page-header">
        <div className="page-header-content">
          <div>
            <h1 className="page-title flex items-center gap-2"><Home className="w-8 h-8 text-[#38bdf8]" /> Essentials & Transactions</h1>
            <p className="page-subtitle">50% of income — Feeds you, not your ego</p>
          </div>
          <button className="btn btn-primary" onClick={() => setShowAdd(!showAdd)}>
            {showAdd ? '✕ Cancel' : '+ Add Transaction'}
          </button>
        </div>
      </div>

      <div className="page-body">
        {/* Quick Stats */}
        <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', marginBottom: '24px' }}>
          <div className="card stat-card essentials">
            <div className="stat-label">Essentials Budget</div>
            <div className="stat-amount" style={{ color: 'var(--essentials)' }}>{formatCurrency(essentialsBudget, sym)}</div>
          </div>
          <div className="card stat-card essentials">
            <div className="stat-label">Spent This Month</div>
            <div className="stat-amount">{formatCurrency(essentialsSpent, sym)}</div>
            <div className="progress-bar-track" style={{ marginTop: '8px', height: '4px' }}>
              <div className="progress-bar-fill essentials" style={{ width: `${Math.min(100, (essentialsSpent / essentialsBudget) * 100)}%` }} />
            </div>
          </div>
          <div className="card stat-card essentials">
            <div className="stat-label">Remaining</div>
            <div className="stat-amount" style={{ color: essentialsRemaining >= 0 ? 'var(--success)' : 'var(--danger)' }}>
              {formatCurrency(essentialsRemaining, sym)}
            </div>
          </div>
        </div>

        {/* Add Transaction Form */}
        {showAdd && (
          <div className="card" style={{ marginBottom: '24px', animation: 'fadeIn 0.3s ease-out' }}>
            <div className="card-header">
              <span className="card-title">Add Transaction</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div className="form-group">
                <label className="form-label">Description</label>
                <input className="form-input" placeholder="What did you spend on?" value={txDescription} onChange={(e) => setTxDescription(e.target.value)} />
              </div>
              <div className="form-group">
                <label className="form-label">Amount</label>
                <input className="form-input form-input-mono" type="number" placeholder="0.00" value={txAmount} onChange={(e) => setTxAmount(e.target.value)} />
              </div>
              <div className="form-group">
                <label className="form-label">Category</label>
                <select className="form-input form-select" value={txCategory} onChange={(e) => {
                  const cat = e.target.value as Category;
                  setTxCategory(cat);
                  setTxSubcategory(SUBCATEGORIES[cat][0]);
                }}>
                  {(['growth', 'stability', 'essentials', 'rewards'] as Category[]).map((cat) => (
                    <option key={cat} value={cat}>{CATEGORY_CONFIG[cat].label}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Subcategory</label>
                <select className="form-input form-select" value={txSubcategory} onChange={(e) => setTxSubcategory(e.target.value)}>
                  {SUBCATEGORIES[txCategory].map((sub) => (
                    <option key={sub} value={sub}>{sub}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Date</label>
                <input className="form-input" type="date" value={txDate} onChange={(e) => setTxDate(e.target.value)} />
              </div>
            </div>
            <button className="btn btn-primary" onClick={handleAdd} disabled={!txDescription || !txAmount}>
              Add Transaction
            </button>
          </div>
        )}

        {/* Subcategory Breakdown */}
        {Object.keys(subcategoryBreakdown).length > 0 && (
          <div className="card" style={{ marginBottom: '24px' }}>
            <div className="card-header">
              <span className="card-title">Essentials Breakdown (This Month)</span>
            </div>
            {Object.entries(subcategoryBreakdown)
              .sort(([, a], [, b]) => b - a)
              .map(([subcat, amount]) => (
                <div key={subcat} className="progress-bar-container">
                  <div className="progress-bar-header">
                    <span className="progress-bar-label">{subcat}</span>
                    <span className="progress-bar-value">{formatCurrency(amount, sym)}</span>
                  </div>
                  <div className="progress-bar-track">
                    <div className="progress-bar-fill essentials" style={{ width: `${(amount / essentialsBudget) * 100}%` }} />
                  </div>
                </div>
              ))}
          </div>
        )}

        {/* Lifestyle Creep Warning */}
        {essentialsSpent > essentialsBudget * 0.85 && (
          <div className="card" style={{
            background: 'rgba(239, 68, 68, 0.05)',
            borderColor: 'rgba(239, 68, 68, 0.15)',
            marginBottom: '24px',
            padding: '20px',
          }}>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <div className="text-red-500"><AlertTriangle className="w-8 h-8" /></div>
              <div>
                <div style={{ fontWeight: 700, marginBottom: '4px', color: 'var(--danger)' }}>Lifestyle Creep Alert</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  You&apos;ve used {Math.round((essentialsSpent / essentialsBudget) * 100)}% of your essentials budget. 
                  Remember: over 60% of Americans earning $100k+ still live paycheck to paycheck. 
                  Cap lifestyle at 50% — it forces you to eliminate what you don&apos;t need.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Transaction History */}
        <div className="card">
          <div className="card-header">
            <span className="card-title">All Transactions</span>
            <div className="tabs" style={{ marginBottom: 0 }}>
              {(['all', 'growth', 'stability', 'essentials', 'rewards'] as const).map((cat) => (
                <button
                  key={cat}
                  className={`tab flex items-center gap-2 ${filterCategory === cat ? 'active' : ''}`}
                  onClick={() => setFilterCategory(cat)}
                >
                  {cat === 'all' ? 'All' : (() => { const Icon = CATEGORY_CONFIG[cat].icon; return <Icon className="w-4 h-4" />; })()}
                </button>
              ))}
            </div>
          </div>

          {filteredTransactions.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon"><ClipboardList className="w-8 h-8 opacity-50" /></div>
              <div className="empty-state-title">No transactions</div>
              <div className="empty-state-text">
                Add your first transaction to start tracking spending against the 25/15/50/10 rule.
              </div>
            </div>
          ) : (
            <div>
              {filteredTransactions.slice(0, 50).map((tx) => {
                const config = CATEGORY_CONFIG[tx.category];
                return (
                  <div key={tx.id} className="transaction-item">
                    <div className="transaction-icon" style={{ background: `var(--${tx.category}-dim)`, color: `var(--${tx.category})` }}>
                      <config.icon className="w-5 h-5" />
                    </div>
                    <div className="transaction-details">
                      <div className="transaction-name">{tx.description}</div>
                      <div className="transaction-category">{config.label} · {tx.subcategory} · {formatDate(tx.date)}</div>
                    </div>
                    <div className="transaction-amount expense">
                      -{formatCurrency(tx.amount, sym)}
                    </div>
                    <button className="btn btn-sm btn-ghost" onClick={() => dispatch({ type: 'DELETE_TRANSACTION', payload: tx.id })}>
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
