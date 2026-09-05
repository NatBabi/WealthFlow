// ============================================
// WealthFlow — Growth Tracker (25%)
// ============================================

'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/store';
import { GROWTH_ASSET_TYPES, type GrowthAssetType } from '@/lib/types';
import { formatCurrency, calculateCompoundGrowth } from '@/lib/utils';
import { Rocket, Sprout, CircleAlert, CircleSlash, Flame, Star, Trash2 } from 'lucide-react';

export default function GrowthTracker() {
  const { state, dispatch } = useApp();
  const { user, growthAssets } = state;
  const sym = user.currencySymbol;
  const growthBudget = user.monthlyIncome * (user.allocations.growth / 100);

  const [showAddAsset, setShowAddAsset] = useState(false);
  const [assetName, setAssetName] = useState('');
  const [assetType, setAssetType] = useState<GrowthAssetType>('index-fund');
  const [assetAmount, setAssetAmount] = useState('');
  const [assetMonthly, setAssetMonthly] = useState('');

  // Compound calculator state
  const [compMonthly, setCompMonthly] = useState('200');
  const [compYears, setCompYears] = useState('30');
  const [compReturn, setCompReturn] = useState('10');

  const totalInvested = growthAssets.reduce((s, a) => s + a.investedAmount, 0);
  const totalValue = growthAssets.reduce((s, a) => s + a.currentValue, 0);
  const totalMonthly = growthAssets.reduce((s, a) => s + a.monthlyContribution, 0);
  const totalGrowth = totalValue - totalInvested;

  const compResults = calculateCompoundGrowth(
    parseFloat(compMonthly) || 0,
    parseInt(compYears) || 0,
    (parseFloat(compReturn) || 0) / 100
  );
  const finalResult = compResults[compResults.length - 1];

  const riskLevels = [
    { level: 1, label: 'Safe', color: '#00d4aa', height: 40 },
    { level: 2, label: 'Low', color: '#22c55e', height: 60 },
    { level: 3, label: 'Medium', color: '#f59e0b', height: 80 },
    { level: 4, label: 'High', color: '#f97316', height: 100 },
    { level: 5, label: 'Moon', color: '#ef4444', height: 120 },
  ];

  const handleAddAsset = () => {
    const typeInfo = GROWTH_ASSET_TYPES[assetType];
    dispatch({
      type: 'ADD_GROWTH_ASSET',
      payload: {
        name: assetName,
        type: assetType,
        riskLevel: typeInfo.riskLevel as 1 | 2 | 3 | 4 | 5,
        investedAmount: parseFloat(assetAmount) || 0,
        currentValue: parseFloat(assetAmount) || 0,
        monthlyContribution: parseFloat(assetMonthly) || 0,
      },
    });
    setShowAddAsset(false);
    setAssetName('');
    setAssetAmount('');
    setAssetMonthly('');
  };

  return (
    <>
      <div className="page-header">
        <div className="page-header-content">
          <div>
            <h1 className="page-title flex items-center gap-2"><Rocket className="w-8 h-8 text-[#00d4aa]" /> Growth Tracker</h1>
            <p className="page-subtitle">25% of income — Money that works for you</p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '1px' }}>Monthly Budget</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '1.1rem', color: 'var(--growth)' }}>
              {formatCurrency(growthBudget, sym)}
            </div>
          </div>
        </div>
      </div>

      <div className="page-body">
        {/* Overview Cards */}
        <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
          <div className="card stat-card growth">
            <div className="stat-label">Total Invested</div>
            <div className="stat-amount" style={{ color: 'var(--growth)' }}>{formatCurrency(totalInvested, sym)}</div>
          </div>
          <div className="card stat-card growth">
            <div className="stat-label">Current Value</div>
            <div className="stat-amount" style={{ color: 'var(--text-primary)' }}>{formatCurrency(totalValue, sym)}</div>
            <span className={`card-change ${totalGrowth >= 0 ? 'positive' : 'negative'}`}>
              {totalGrowth >= 0 ? '+' : ''}{formatCurrency(totalGrowth, sym)}
            </span>
          </div>
          <div className="card stat-card growth">
            <div className="stat-label">Monthly Contributions</div>
            <div className="stat-amount" style={{ color: 'var(--growth)' }}>{formatCurrency(totalMonthly, sym)}</div>
            <span className="stat-percent">{growthBudget > 0 ? Math.round((totalMonthly / growthBudget) * 100) : 0}% of budget</span>
          </div>
        </div>

        {/* Risk Scale */}
        <div className="card" style={{ marginBottom: '24px' }}>
          <div className="card-header">
            <span className="card-title">Investment Risk Scale</span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)' }}>Safe → Moonshot</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '12px', padding: '16px 0' }}>
            {riskLevels.map((risk) => {
              const assetsAtRisk = growthAssets.filter(a => a.riskLevel === risk.level);
              const totalAtRisk = assetsAtRisk.reduce((s, a) => s + a.currentValue, 0);

              return (
                <div key={risk.level} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                  <div style={{ fontSize: '0.7rem', fontFamily: 'var(--font-mono)', fontWeight: 600, color: risk.color }}>
                    {formatCurrency(totalAtRisk, sym)}
                  </div>
                  <div style={{
                    width: '100%',
                    height: `${risk.height}px`,
                    background: `${risk.color}20`,
                    borderRadius: '8px 8px 0 0',
                    border: `1px solid ${risk.color}30`,
                    position: 'relative',
                    overflow: 'hidden',
                  }}>
                    <div style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: totalInvested > 0 ? `${(totalAtRisk / totalInvested) * 100}%` : '0%',
                      background: `${risk.color}60`,
                      transition: 'height 0.5s ease-out',
                      borderRadius: '8px 8px 0 0',
                    }} />
                  </div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>{risk.label}</div>
                </div>
              );
            })}
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', paddingTop: '12px', borderTop: '1px solid var(--surface-border)' }}>
            {Object.entries(GROWTH_ASSET_TYPES).map(([key, info]) => (
              <div key={key} style={{
                padding: '4px 10px',
                background: 'var(--bg-tertiary)',
                borderRadius: '20px',
                fontSize: '0.72rem',
                color: 'var(--text-secondary)',
              }}>
                <info.icon className="w-3 h-3 inline-block mr-1" /> {info.label}
              </div>
            ))}
          </div>
        </div>

        {/* Assets List */}
        <div className="card" style={{ marginBottom: '24px' }}>
          <div className="card-header">
            <span className="card-title">Your Growth Assets</span>
            <button className="btn btn-sm btn-primary" onClick={() => setShowAddAsset(!showAddAsset)}>
              {showAddAsset ? '✕ Cancel' : '+ Add Asset'}
            </button>
          </div>

          {showAddAsset && (
            <div style={{ padding: '16px', background: 'var(--bg-tertiary)', borderRadius: '12px', marginBottom: '16px', animation: 'fadeIn 0.3s ease-out' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div className="form-group">
                  <label className="form-label">Asset Name</label>
                  <input className="form-input" placeholder="e.g. Vanguard S&P 500" value={assetName} onChange={(e) => setAssetName(e.target.value)} />
                </div>
                <div className="form-group">
                  <label className="form-label">Type</label>
                  <select className="form-input form-select" value={assetType} onChange={(e) => setAssetType(e.target.value as GrowthAssetType)}>
                    {Object.entries(GROWTH_ASSET_TYPES).map(([key, info]) => (
                      <option key={key} value={key}>{info.label}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Amount Invested</label>
                  <input className="form-input form-input-mono" type="number" placeholder="0" value={assetAmount} onChange={(e) => setAssetAmount(e.target.value)} />
                </div>
                <div className="form-group">
                  <label className="form-label">Monthly Contribution</label>
                  <input className="form-input form-input-mono" type="number" placeholder="0" value={assetMonthly} onChange={(e) => setAssetMonthly(e.target.value)} />
                </div>
              </div>
              <button className="btn btn-primary" onClick={handleAddAsset} disabled={!assetName}>
                Add Asset
              </button>
            </div>
          )}

          {growthAssets.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon"><Sprout className="w-8 h-8 opacity-50" /></div>
              <div className="empty-state-title">No assets yet</div>
              <div className="empty-state-text">
                Start with index funds — buy a slice of the whole market. You don&apos;t need to pick winners.
              </div>
            </div>
          ) : (
            <div className="table-wrapper">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Asset</th>
                    <th>Type</th>
                    <th>Invested</th>
                    <th>Value</th>
                    <th>Monthly</th>
                    <th>Risk</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {growthAssets.map((asset) => {
                    const typeInfo = GROWTH_ASSET_TYPES[asset.type];
                    const gain = asset.currentValue - asset.investedAmount;
                    return (
                      <tr key={asset.id}>
                        <td style={{ fontWeight: 600 }} className="flex items-center gap-2"><typeInfo.icon className="w-4 h-4 text-[#00d4aa]" /> {asset.name}</td>
                        <td><span className="tag growth">{typeInfo.label}</span></td>
                        <td className="mono">{formatCurrency(asset.investedAmount, sym)}</td>
                        <td className="mono">
                          {formatCurrency(asset.currentValue, sym)}
                          <span style={{ color: gain >= 0 ? 'var(--success)' : 'var(--danger)', fontSize: '0.75rem', marginLeft: '6px' }}>
                            {gain >= 0 ? '+' : ''}{formatCurrency(gain, sym)}
                          </span>
                        </td>
                        <td className="mono">{formatCurrency(asset.monthlyContribution, sym)}</td>
                        <td>
                          {asset.riskLevel === 1 && <div className="w-3 h-3 rounded-full bg-[#00d4aa]" />}
                          {asset.riskLevel === 2 && <div className="w-3 h-3 rounded-full bg-[#22c55e]" />}
                          {asset.riskLevel === 3 && <div className="w-3 h-3 rounded-full bg-[#f59e0b]" />}
                          {asset.riskLevel === 4 && <div className="w-3 h-3 rounded-full bg-[#f97316]" />}
                          {asset.riskLevel === 5 && <div className="w-3 h-3 rounded-full bg-[#ef4444]" />}
                        </td>
                        <td>
                          <button className="btn btn-sm btn-ghost" onClick={() => dispatch({ type: 'DELETE_GROWTH_ASSET', payload: asset.id })}>
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Compound Growth Calculator */}
        <div className="card">
          <div className="card-header">
            <span className="card-title">📈 Compound Growth Calculator</span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>Billy vs Phil — The power of starting early</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginBottom: '24px' }}>
            <div className="form-group">
              <label className="form-label">Monthly Investment</label>
              <input className="form-input form-input-mono" type="number" value={compMonthly} onChange={(e) => setCompMonthly(e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">Years</label>
              <input className="form-input form-input-mono" type="number" value={compYears} onChange={(e) => setCompYears(e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">Annual Return %</label>
              <input className="form-input form-input-mono" type="number" value={compReturn} onChange={(e) => setCompReturn(e.target.value)} />
            </div>
          </div>

          {finalResult && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', padding: '20px', background: 'var(--bg-tertiary)', borderRadius: '12px' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>Total Invested</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '1.3rem' }}>
                  {formatCurrency(finalResult.totalInvested, sym)}
                </div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>Final Value</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '1.3rem', color: 'var(--growth)' }}>
                  {formatCurrency(finalResult.totalValue, sym)}
                </div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>Pure Growth</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '1.3rem', color: 'var(--success)' }}>
                  +{formatCurrency(finalResult.growth, sym)}
                </div>
              </div>
            </div>
          )}

          {/* Mini bar chart */}
          {compResults.length > 0 && (
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '2px', height: '120px', marginTop: '24px', padding: '0 4px' }}>
              {compResults.filter((_, i) => i % Math.max(1, Math.floor(compResults.length / 30)) === 0 || i === compResults.length - 1).map((r, i) => {
                const maxVal = finalResult?.totalValue || 1;
                const investedHeight = (r.totalInvested / maxVal) * 100;
                const growthHeight = (r.growth / maxVal) * 100;

                return (
                  <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', height: '100%' }}>
                    <div style={{ height: `${growthHeight}%`, background: 'var(--growth)', borderRadius: '2px 2px 0 0', minHeight: '1px', opacity: 0.7 }} />
                    <div style={{ height: `${investedHeight}%`, background: 'var(--stability)', borderRadius: 0, minHeight: '1px', opacity: 0.5 }} />
                  </div>
                );
              })}
            </div>
          )}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px' }}>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Year 1</span>
            <div style={{ display: 'flex', gap: '16px' }}>
              <span style={{ fontSize: '0.7rem', color: 'var(--stability)' }}>■ Invested</span>
              <span style={{ fontSize: '0.7rem', color: 'var(--growth)' }}>■ Growth</span>
            </div>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Year {compYears}</span>
          </div>
        </div>
      </div>
    </>
  );
}
