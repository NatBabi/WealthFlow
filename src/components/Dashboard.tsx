// ============================================
// WealthFlow — Dashboard Page
// ============================================

'use client';

import React from 'react';
import { useApp, useAllocations } from '@/lib/store';
import { CATEGORY_CONFIG, type Category } from '@/lib/types';
import { formatCurrency, getCurrentMonth, getDaysRemaining, getMonthProgress, calculateWealthScore } from '@/lib/utils';

export default function Dashboard() {
  const { state, dispatch } = useApp();
  const allocations = useAllocations();
  const { user, transactions } = state;
  const sym = user.currencySymbol;

  // Current month transactions by category
  const now = new Date();
  const currentMonthTx = transactions.filter((t) => {
    const d = new Date(t.date);
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  });

  const categorySpending: Record<Category, number> = {
    growth: 0,
    stability: 0,
    essentials: 0,
    rewards: 0,
  };

  currentMonthTx.forEach((t) => {
    categorySpending[t.category] += t.amount;
  });

  const wealthScore = calculateWealthScore(
    user.monthlyIncome,
    categorySpending.growth,
    categorySpending.stability,
    categorySpending.essentials,
    categorySpending.rewards,
    user.allocations
  );

  const monthProgress = getMonthProgress();
  const daysLeft = getDaysRemaining();

  // Donut chart calculations
  const categories: Category[] = ['growth', 'stability', 'essentials', 'rewards'];
  const radius = 85;
  const circumference = 2 * Math.PI * radius;
  let cumulativePercent = 0;

  const scoreColor = wealthScore >= 75 ? 'var(--growth)' : wealthScore >= 50 ? 'var(--essentials)' : 'var(--danger)';
  const scoreCircumference = 2 * Math.PI * 65;
  const scoreOffset = scoreCircumference - (wealthScore / 100) * scoreCircumference;

  return (
    <>
      <div className="page-header">
        <div className="page-header-content">
          <div>
            <h1 className="page-title">Dashboard</h1>
            <p className="page-subtitle">{getCurrentMonth()} · {daysLeft} days remaining</p>
          </div>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '1px' }}>Monthly Income</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '1.1rem' }}>
                {formatCurrency(user.monthlyIncome, sym)}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="page-body">
        {/* Stats Grid */}
        <div className="stats-grid">
          {categories.map((cat, index) => {
            const config = CATEGORY_CONFIG[cat];
            const allocated = user.monthlyIncome * (user.allocations[cat] / 100);
            const spent = categorySpending[cat];
            const remaining = allocated - spent;
            const percentUsed = allocated > 0 ? Math.round((spent / allocated) * 100) : 0;

            return (
              <div
                key={cat}
                className={`card stat-card ${cat}`}
                style={{ animationDelay: `${index * 0.1}s`, cursor: 'pointer' }}
                onClick={() => dispatch({ type: 'SET_TAB', payload: cat === 'rewards' ? 'rewards' : cat })}
              >
                <div className={`stat-icon ${cat}`}>{config.emoji}</div>
                <div className="stat-label">{config.label} ({user.allocations[cat]}%)</div>
                <div className="stat-amount" style={{ color: config.color }}>
                  {formatCurrency(allocated, sym)}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px' }}>
                  <span className="stat-percent">Spent: {formatCurrency(spent, sym)}</span>
                  <span className={`card-change ${remaining >= 0 ? 'positive' : 'negative'}`}>
                    {remaining >= 0 ? '✓' : '!'} {formatCurrency(Math.abs(remaining), sym)}
                  </span>
                </div>
                {/* Mini progress bar */}
                <div className="progress-bar-track" style={{ marginTop: '10px', height: '4px' }}>
                  <div
                    className={`progress-bar-fill ${cat}`}
                    style={{ width: `${Math.min(percentUsed, 100)}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Charts Row */}
        <div className="charts-grid">
          {/* Allocation Donut */}
          <div className="card chart-container">
            <div className="card-header">
              <span className="card-title">Income Allocation</span>
              <span className="tag growth">25/15/50/10</span>
            </div>
            <div className="donut-chart-wrapper">
              <div className="donut-chart">
                <svg viewBox="0 0 200 200">
                  {categories.map((cat) => {
                    const percent = user.allocations[cat];
                    const config = CATEGORY_CONFIG[cat];
                    const dashLength = (percent / 100) * circumference;
                    const dashOffset = -(cumulativePercent / 100) * circumference;
                    cumulativePercent += percent;

                    const colorMap: Record<string, string> = {
                      growth: '#00d4aa',
                      stability: '#6366f1',
                      essentials: '#f59e0b',
                      rewards: '#ec4899',
                    };

                    return (
                      <circle
                        key={cat}
                        cx="100"
                        cy="100"
                        r={radius}
                        stroke={colorMap[cat]}
                        strokeDasharray={`${dashLength} ${circumference - dashLength}`}
                        strokeDashoffset={dashOffset}
                        strokeLinecap="round"
                        opacity="0.9"
                      />
                    );
                  })}
                </svg>
                <div className="donut-center">
                  <div className="donut-center-value">{formatCurrency(user.monthlyIncome, sym)}</div>
                  <div className="donut-center-label">Monthly</div>
                </div>
              </div>
              <div className="donut-legend">
                {categories.map((cat) => {
                  const config = CATEGORY_CONFIG[cat];
                  const colorMap: Record<string, string> = {
                    growth: '#00d4aa',
                    stability: '#6366f1',
                    essentials: '#f59e0b',
                    rewards: '#ec4899',
                  };
                  return (
                    <div key={cat} className="legend-item">
                      <div className="legend-dot" style={{ background: colorMap[cat] }} />
                      <span>{config.label}</span>
                      <span className="legend-value">{user.allocations[cat]}%</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Wealth Score */}
          <div className="card chart-container">
            <div className="card-header">
              <span className="card-title">Wealth Score</span>
              <span className={`card-change ${wealthScore >= 50 ? 'positive' : 'negative'}`}>
                {wealthScore >= 75 ? 'Excellent' : wealthScore >= 50 ? 'Good' : 'Needs Work'}
              </span>
            </div>
            <div className="wealth-score">
              <div className="score-ring">
                <svg viewBox="0 0 150 150">
                  <circle className="track" cx="75" cy="75" r="65" />
                  <circle
                    className="progress"
                    cx="75"
                    cy="75"
                    r="65"
                    stroke={scoreColor}
                    strokeDasharray={scoreCircumference}
                    strokeDashoffset={scoreOffset}
                  />
                </svg>
                <div className="score-center">
                  <div className="score-number" style={{ color: scoreColor }}>{wealthScore}</div>
                  <div className="score-label">Score</div>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  Your wealth score measures how closely you follow the 25/15/50/10 allocation rule. 
                  Add transactions to track your progress!
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
                    <span style={{ color: 'var(--text-tertiary)' }}>Month Progress</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 600 }}>{monthProgress}%</span>
                  </div>
                  <div className="progress-bar-track">
                    <div className="progress-bar-fill growth" style={{ width: `${monthProgress}%` }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Ownership Quote */}
        <div className="card" style={{ 
          background: 'linear-gradient(135deg, rgba(0,212,170,0.05), rgba(99,102,241,0.05))',
          borderColor: 'rgba(0,212,170,0.15)',
          textAlign: 'center',
          padding: '32px',
          marginBottom: '24px'
        }}>
          <div style={{ fontSize: '2rem', marginBottom: '12px' }}>💎</div>
          <blockquote style={{ 
            fontSize: '1.1rem', 
            fontWeight: 600, 
            color: 'var(--text-primary)',
            fontStyle: 'italic',
            maxWidth: '600px',
            margin: '0 auto 12px',
            lineHeight: 1.7
          }}>
            &quot;If you don&apos;t own something, you are what&apos;s owned.&quot;
          </blockquote>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)' }}>
            The richest people are 75% entrepreneurs, 15% investors, 7% inheritors, 3% artists — 0% salary employees.
          </p>
        </div>

        {/* Recent Transactions */}
        <div className="card">
          <div className="card-header">
            <span className="card-title">Recent Transactions</span>
            <button className="btn btn-sm btn-secondary" onClick={() => dispatch({ type: 'SET_TAB', payload: 'essentials' })}>
              View All
            </button>
          </div>

          {currentMonthTx.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">📝</div>
              <div className="empty-state-title">No transactions yet</div>
              <div className="empty-state-text">
                Start logging your spending to see how you&apos;re tracking against the 25/15/50/10 rule.
              </div>
            </div>
          ) : (
            <div>
              {currentMonthTx.slice(0, 8).map((tx) => {
                const config = CATEGORY_CONFIG[tx.category];
                return (
                  <div key={tx.id} className="transaction-item">
                    <div className={`transaction-icon`} style={{ background: `var(--${tx.category}-dim)`, color: `var(--${tx.category})` }}>
                      {config.emoji}
                    </div>
                    <div className="transaction-details">
                      <div className="transaction-name">{tx.description}</div>
                      <div className="transaction-category">{config.label} · {tx.subcategory}</div>
                    </div>
                    <div className="transaction-amount expense">
                      -{formatCurrency(tx.amount, sym)}
                    </div>
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
