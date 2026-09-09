// ============================================
// WealthFlow — Stability Fund (15%)
// ============================================

'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/store';
import { formatCurrency } from '@/lib/utils';
import { Shield, Coins, Zap, Lock, TrendingUp, ClipboardList, Package, Trash2, Home, ShoppingCart, Lightbulb, Car, Umbrella, Wifi, Activity } from 'lucide-react';

export default function StabilityFund() {
  const { state, dispatch } = useApp();
  const { user, stabilityFund } = state;
  const sym = user.currencySymbol;
  const stabilityBudget = user.monthlyIncome * (user.allocations.stability / 100);

  const [showAddExpense, setShowAddExpense] = useState(false);
  const [expenseName, setExpenseName] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');
  const [expenseCategory, setExpenseCategory] = useState('housing');
  const [depositAmount, setDepositAmount] = useState('');
  const [showDeposit, setShowDeposit] = useState(false);

  const progress = stabilityFund.targetAmount > 0
    ? Math.min(100, (stabilityFund.currentAmount / stabilityFund.targetAmount) * 100)
    : 0;

  const monthsCovered = stabilityFund.monthlyBaseline > 0
    ? (stabilityFund.currentAmount / stabilityFund.monthlyBaseline).toFixed(1)
    : '0';

  const isFunded = progress >= 100;

  const expenseCategories = [
    { value: 'housing', label: 'Rent / Mortgage', icon: <Home className="w-4 h-4" /> },
    { value: 'groceries', label: 'Groceries', icon: <ShoppingCart className="w-4 h-4" /> },
    { value: 'utilities', label: 'Utilities', icon: <Lightbulb className="w-4 h-4" /> },
    { value: 'transport', label: 'Transportation', icon: <Car className="w-4 h-4" /> },
    { value: 'insurance', label: 'Insurance', icon: <Umbrella className="w-4 h-4" /> },
    { value: 'internet', label: 'Internet', icon: <Wifi className="w-4 h-4" /> },
    { value: 'healthcare', label: 'Healthcare', icon: <Activity className="w-4 h-4" /> },
    { value: 'other', label: 'Other Essential', icon: <Package className="w-4 h-4" /> },
  ];

  const handleAddExpense = () => {
    dispatch({
      type: 'ADD_CORE_EXPENSE',
      payload: {
        name: expenseName,
        amount: parseFloat(expenseAmount) || 0,
        category: expenseCategory,
      },
    });
    setExpenseName('');
    setExpenseAmount('');
    setShowAddExpense(false);
  };

  const handleDeposit = () => {
    const amount = parseFloat(depositAmount) || 0;
    if (amount > 0) {
      dispatch({ type: 'DEPOSIT_STABILITY', payload: amount });
      setDepositAmount('');
      setShowDeposit(false);
    }
  };

  return (
    <>
      <div className="page-header">
        <div className="page-header-content">
          <div>
            <h1 className="page-title flex items-center gap-2"><Shield className="w-8 h-8 text-[#6366f1]" /> Stability Fund</h1>
            <p className="page-subtitle">15% of income — Keeps you in the game</p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '1px' }}>Monthly Budget</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '1.1rem', color: 'var(--stability)' }}>
              {formatCurrency(stabilityBudget, sym)}
            </div>
          </div>
        </div>
      </div>

      <div className="page-body">
        {/* Fund Status Hero */}
        <div className="card" style={{
          background: isFunded
            ? 'linear-gradient(135deg, rgba(34,197,94,0.05), rgba(99,102,241,0.05))'
            : 'linear-gradient(135deg, rgba(99,102,241,0.05), rgba(236,72,153,0.05))',
          borderColor: isFunded ? 'rgba(34,197,94,0.15)' : 'rgba(99,102,241,0.15)',
          marginBottom: '24px',
          padding: '32px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
            <div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>
                Current Fund
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 900, fontSize: '2.5rem', color: isFunded ? 'var(--success)' : 'var(--stability)' }}>
                {formatCurrency(stabilityFund.currentAmount, sym)}
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>
                Target ({stabilityFund.targetMonths} months)
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '1.5rem', color: 'var(--text-secondary)' }}>
                {formatCurrency(stabilityFund.targetAmount, sym)}
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="progress-bar-header">
            <span className="progress-bar-label">{isFunded ? '✅ Fully Funded!' : `${progress.toFixed(1)}% Complete`}</span>
            <span className="progress-bar-value">{monthsCovered} months covered</span>
          </div>
          <div className="progress-bar-track" style={{ height: '12px' }}>
            <div className="progress-bar-fill stability" style={{ width: `${progress}%` }} />
          </div>

          <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
            <button className="btn btn-primary flex items-center gap-2" onClick={() => setShowDeposit(!showDeposit)}>
              {showDeposit ? '✕ Cancel' : <><Coins className="w-4 h-4" /> Deposit</>}
            </button>
            {stabilityFund.currentAmount > 0 && (
              <button className="btn btn-secondary" onClick={() => {
                const amt = prompt(`How much to withdraw? (Current: ${formatCurrency(stabilityFund.currentAmount, sym)})`);
                if (amt && parseFloat(amt) > 0) dispatch({ type: 'WITHDRAW_STABILITY', payload: parseFloat(amt) });
              }}>
                Withdraw
              </button>
            )}
          </div>

          {showDeposit && (
            <div style={{ marginTop: '16px', padding: '16px', background: 'var(--bg-tertiary)', borderRadius: '12px', animation: 'fadeIn 0.3s ease-out' }}>
              <div style={{ display: 'flex', gap: '12px' }}>
                <input
                  className="form-input form-input-mono"
                  type="number"
                  placeholder="Amount to deposit"
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(e.target.value)}
                  style={{ flex: 1 }}
                />
                <button className="btn btn-primary" onClick={handleDeposit} disabled={!depositAmount || parseFloat(depositAmount) <= 0}>
                  Deposit
                </button>
              </div>
            </div>
          )}
        </div>

        {/* The 3 Rules */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}>
          {[
            { icon: <Zap className="w-8 h-8 mx-auto" />, title: 'Easy to Access', desc: 'Available within 24 hours. Don\'t lock it up in penalty accounts.' },
            { icon: <Lock className="w-8 h-8 mx-auto" />, title: 'Zero Risk', desc: 'Never invest this in stocks or crypto. When emergency hits, market might be down.' },
            { icon: <TrendingUp className="w-8 h-8 mx-auto" />, title: 'Always Earning', desc: 'Use a high-yield savings account (4-5% interest). Don\'t let inflation eat it.' },
          ].map((rule, i) => (
            <div key={i} className="card" style={{ textAlign: 'center' }}>
              <div style={{ marginBottom: '8px', color: 'var(--stability)' }}>{rule.icon}</div>
              <div style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: '6px' }}>{rule.title}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)', lineHeight: 1.5 }}>{rule.desc}</div>
            </div>
          ))}
        </div>

        {/* Core Expenses Calculator */}
        <div className="card" style={{ marginBottom: '24px' }}>
          <div className="card-header">
            <span className="card-title">Core Expenses (Monthly Baseline)</span>
            <button className="btn btn-sm btn-primary" onClick={() => setShowAddExpense(!showAddExpense)}>
              {showAddExpense ? '✕ Cancel' : '+ Add Expense'}
            </button>
          </div>

          {showAddExpense && (
            <div style={{ padding: '16px', background: 'var(--bg-tertiary)', borderRadius: '12px', marginBottom: '16px', animation: 'fadeIn 0.3s ease-out' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
                <div className="form-group">
                  <label className="form-label">Expense Name</label>
                  <input className="form-input" placeholder="e.g. Rent" value={expenseName} onChange={(e) => setExpenseName(e.target.value)} />
                </div>
                <div className="form-group">
                  <label className="form-label">Category</label>
                  <select className="form-input form-select" value={expenseCategory} onChange={(e) => setExpenseCategory(e.target.value)}>
                    {expenseCategories.map((c) => (
                      <option key={c.value} value={c.value}>{c.label}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Monthly Amount</label>
                  <input className="form-input form-input-mono" type="number" placeholder="0" value={expenseAmount} onChange={(e) => setExpenseAmount(e.target.value)} />
                </div>
              </div>
              <button className="btn btn-primary" onClick={handleAddExpense} disabled={!expenseName || !expenseAmount}>
                Add Expense
              </button>
            </div>
          )}

          {stabilityFund.expenses.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon"><ClipboardList className="w-8 h-8 opacity-50" /></div>
              <div className="empty-state-title">List your core expenses</div>
              <div className="empty-state-text">
                Add groceries, rent, utilities, transport, and essential services. This calculates your monthly baseline for the 5-month safety net.
              </div>
            </div>
          ) : (
            <>
              {stabilityFund.expenses.map((expense) => {
                const catInfo = expenseCategories.find(c => c.value === expense.category);
                return (
                  <div key={expense.id} className="transaction-item">
                    <div className="transaction-icon" style={{ background: 'var(--stability-dim)', color: 'var(--stability)' }}>
                      {catInfo?.icon || <Package className="w-4 h-4" />}
                    </div>
                    <div className="transaction-details">
                      <div className="transaction-name">{expense.name}</div>
                      <div className="transaction-category">{catInfo?.label || expense.category}</div>
                    </div>
                    <div className="transaction-amount" style={{ color: 'var(--text-primary)' }}>
                      {formatCurrency(expense.amount, sym)}/mo
                    </div>
                    <button className="btn btn-sm btn-ghost" onClick={() => dispatch({ type: 'DELETE_CORE_EXPENSE', payload: expense.id })}>
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                );
              })}
              <div style={{ marginTop: '16px', padding: '16px', background: 'var(--bg-tertiary)', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '1px' }}>Monthly Baseline</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '1.3rem' }}>
                    {formatCurrency(stabilityFund.monthlyBaseline, sym)}
                  </div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '1px' }}>× {stabilityFund.targetMonths} months</div>
                  <div style={{ fontSize: '1.5rem' }}>=</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '1px' }}>Target Fund</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '1.3rem', color: 'var(--stability)' }}>
                    {formatCurrency(stabilityFund.targetAmount, sym)}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Stacking Tactics */}
        <div className="card">
          <div className="card-header">
            <span className="card-title flex items-center gap-2"><Zap className="w-5 h-5 text-yellow-400" /> Stack It Quickly — 3 Tactics</span>
          </div>
          <div style={{ display: 'grid', gap: '16px' }}>
            {[
              { num: '01', title: 'Paycheck Sweep', desc: 'Automate 15% of your income the second it lands. Set up a direct debit — completely hands off.', color: 'var(--growth)' },
              { num: '02', title: 'Replacement Promise', desc: 'If you dip into the fund, immediately replace it next payday. $250 fix? Top it back up like it never happened.', color: 'var(--stability)' },
              { num: '03', title: 'Save by Spending', desc: 'Use roundup apps to save the difference on every purchase. $3.60 rounds to $4 — that 40¢ adds up fast.', color: 'var(--rewards)' },
            ].map((tactic) => (
              <div key={tactic.num} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', padding: '16px', background: 'var(--bg-tertiary)', borderRadius: '12px' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 900, fontSize: '1.5rem', color: tactic.color, opacity: 0.5, minWidth: '36px' }}>
                  {tactic.num}
                </div>
                <div>
                  <div style={{ fontWeight: 700, marginBottom: '4px' }}>{tactic.title}</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{tactic.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
