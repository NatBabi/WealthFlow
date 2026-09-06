// ============================================
// WealthFlow — Joy Jar (10%)
// ============================================

'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/store';
import { formatCurrency, formatDate } from '@/lib/utils';
import { PartyPopper, Plane, Palette, Wine, Gift, Ticket, Trash2 } from 'lucide-react';

export default function JoyJar() {
  const { state, dispatch } = useApp();
  const { user, joyJar } = state;
  const sym = user.currencySymbol;
  
  // The budget is strictly 10% of income, per month
  const monthlyBudget = user.monthlyIncome * (user.allocations.rewards / 100);
  
  const [showSpend, setShowSpend] = useState(false);
  const [spendCategory, setSpendCategory] = useState<'vacations' | 'hobbies' | 'nights-out' | 'gifts'>('vacations');
  const [spendAmount, setSpendAmount] = useState('');
  const [spendDesc, setSpendDesc] = useState('');

  const categories = [
    { id: 'vacations', label: 'Vacations', icon: <Plane className="w-5 h-5" />, desc: 'Buy memories that last forever' },
    { id: 'hobbies', label: 'Hobbies', icon: <Palette className="w-5 h-5" />, desc: 'Keep yourself passionate' },
    { id: 'nights-out', label: 'Nights Out', icon: <Wine className="w-5 h-5" />, desc: 'Maintain strong social networks' },
    { id: 'gifts', label: 'Gifts', icon: <Gift className="w-5 h-5" />, desc: 'Strengthen relationships' },
  ];

  const handleSpend = () => {
    dispatch({
      type: 'ADD_JOY_SPENDING',
      payload: {
        category: spendCategory,
        amount: parseFloat(spendAmount) || 0,
        description: spendDesc,
        date: new Date().toISOString(),
      },
    });
    setSpendAmount('');
    setSpendDesc('');
    setShowSpend(false);
  };

  const isLowBalance = joyJar.balance < monthlyBudget * 0.2;
  const isEmpty = joyJar.balance <= 0;

  return (
    <>
      <div className="page-header">
        <div className="page-header-content">
          <div>
            <h1 className="page-title flex items-center gap-2"><PartyPopper className="w-8 h-8 text-[#ec4899]" /> Joy Jar</h1>
            <p className="page-subtitle">10% of income — Guilt-free rewards that keep you sane</p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '1px' }}>Monthly Drop</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '1.1rem', color: 'var(--rewards)' }}>
              {formatCurrency(monthlyBudget, sym)}
            </div>
          </div>
        </div>
      </div>

      <div className="page-body">
        {/* Balance Hero */}
        <div className="card" style={{ 
          background: 'linear-gradient(135deg, rgba(236,72,153,0.05), rgba(139,92,246,0.05))',
          borderColor: 'rgba(236,72,153,0.15)',
          marginBottom: '24px',
          textAlign: 'center',
          padding: '40px 24px'
        }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '8px' }}>
            Available to Spend
          </div>
          <div style={{ 
            fontFamily: 'var(--font-mono)', 
            fontWeight: 900, 
            fontSize: '3.5rem', 
            color: isEmpty ? 'var(--danger)' : 'var(--rewards)',
            lineHeight: 1,
            marginBottom: '16px'
          }}>
            {formatCurrency(joyJar.balance, sym)}
          </div>
          
          {isEmpty ? (
            <div className="tag" style={{ background: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger)' }}>
              Wait until next month to reload. Do not cheat.
            </div>
          ) : isLowBalance ? (
            <div className="tag" style={{ background: 'rgba(245, 158, 11, 0.1)', color: 'var(--warning)' }}>
              Balance is running low
            </div>
          ) : (
            <div className="tag rewards">
              100% Guilt-Free Spending
            </div>
          )}

          <div style={{ marginTop: '32px' }}>
            <button 
              className="btn btn-primary btn-lg" 
              onClick={() => setShowSpend(!showSpend)}
              disabled={isEmpty}
              style={{ background: 'var(--gradient-rewards)', boxShadow: 'var(--shadow-glow-rewards)' }}
            >
              {showSpend ? '✕ Cancel' : 'Spend from Jar'}
            </button>
          </div>
        </div>

        {/* Spend Form */}
        {showSpend && (
          <div className="card" style={{ marginBottom: '24px', animation: 'fadeIn 0.3s ease-out' }}>
            <div className="card-header">
              <span className="card-title">Log Reward Purchase</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                <label className="form-label">Category (Prioritize Experiences)</label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
                  {categories.map((c) => (
                    <div 
                      key={c.id}
                      onClick={() => setSpendCategory(c.id as any)}
                      style={{
                        padding: '12px',
                        borderRadius: '12px',
                        border: `1px solid ${spendCategory === c.id ? 'var(--rewards)' : 'var(--surface-border)'}`,
                        background: spendCategory === c.id ? 'var(--rewards-dim)' : 'var(--bg-tertiary)',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        textAlign: 'center'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '8px', color: spendCategory === c.id ? 'var(--rewards)' : 'inherit' }}>{c.icon}</div>
                      <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>{c.label}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">What did you buy?</label>
                <input className="form-input" placeholder="e.g. Ski trip, Dinner, Concert" value={spendDesc} onChange={(e) => setSpendDesc(e.target.value)} />
              </div>
              <div className="form-group">
                <label className="form-label">Amount</label>
                <input className="form-input form-input-mono" type="number" placeholder="0.00" value={spendAmount} onChange={(e) => setSpendAmount(e.target.value)} />
                {parseFloat(spendAmount) > joyJar.balance && (
                  <div style={{ fontSize: '0.75rem', color: 'var(--danger)', marginTop: '4px' }}>
                    Warning: Exceeds available balance
                  </div>
                )}
              </div>
            </div>
            <button 
              className="btn" 
              style={{ background: 'var(--rewards)', color: '#fff' }}
              onClick={handleSpend} 
              disabled={!spendDesc || !spendAmount || parseFloat(spendAmount) <= 0}
            >
              Log Purchase
            </button>
          </div>
        )}

        {/* Categories Explained */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
          {categories.map((cat) => (
            <div key={cat.id} className="card" style={{ padding: '20px' }}>
              <div style={{ fontWeight: 700, marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>{cat.icon} {cat.label}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)', lineHeight: 1.5 }}>
                {cat.desc}
              </div>
            </div>
          ))}
        </div>

        {/* Spending History */}
        <div className="card">
          <div className="card-header">
            <span className="card-title">Reward History</span>
          </div>
          
          {joyJar.spending.length === 0 ? (
             <div className="empty-state">
             <div className="empty-state-icon"><Ticket className="w-8 h-8 opacity-50" /></div>
             <div className="empty-state-title">No rewards logged yet</div>
             <div className="empty-state-text">
               Remember to reward yourself. 92% of people overspend after intensive saving sprints because saving without joy feels like punishment.
             </div>
           </div>
          ) : (
            <div>
              {joyJar.spending.map((s) => {
                const catLabel = categories.find(c => c.id === s.category)?.label || s.category;
                return (
                  <div key={s.id} className="transaction-item">
                    <div className="transaction-icon" style={{ background: 'var(--rewards-dim)', color: 'var(--rewards)' }}>
                      {categories.find(c => c.id === s.category)?.icon || <PartyPopper className="w-4 h-4" />}
                    </div>
                    <div className="transaction-details">
                      <div className="transaction-name">{s.description}</div>
                      <div className="transaction-category">{catLabel} · {formatDate(s.date)}</div>
                    </div>
                    <div className="transaction-amount expense">
                      -{formatCurrency(s.amount, sym)}
                    </div>
                    <button className="btn btn-sm btn-ghost" onClick={() => dispatch({ type: 'DELETE_JOY_SPENDING', payload: s.id })}>
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
