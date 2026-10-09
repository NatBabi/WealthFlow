// ============================================
// WealthFlow — Impulse Purchase Decision Tree
// ============================================

'use client';

import React, { useState } from 'react';
import { type ImpulseCheck } from '@/lib/types';

export default function ImpulseDecisionTree() {
  const [check, setCheck] = useState<ImpulseCheck>({ step: 'start' });

  const reset = () => setCheck({ step: 'start' });

  return (
    <>
      <div className="page-header">
        <div className="page-header-content">
          <div>
            <h1 className="page-title">🤔 Purchase Decision Tool</h1>
            <p className="page-subtitle">Use rules, not willpower</p>
          </div>
          <button className="btn btn-secondary" onClick={reset}>
            Reset Tool
          </button>
        </div>
      </div>

      <div className="page-body">
        <div className="card" style={{ maxWidth: '600px', margin: '0 auto' }}>
          
          {check.step === 'start' && (
            <div className="decision-node">
              <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🛒</div>
              <h3 className="decision-question">Is this an impulse purchase?</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '24px' }}>
                Something you just saw and suddenly wanted to buy, rather than a planned expense.
              </p>
              <div className="decision-options">
                <button className="decision-btn yes" onClick={() => setCheck({ step: 'impulse' })}>
                  Yes, it is
                </button>
                <button className="decision-btn no" onClick={() => setCheck({ 
                  step: 'result', 
                  result: 'buy', 
                  reason: "It's a planned purchase. If it fits your budget, go ahead." 
                })}>
                  No, I planned this
                </button>
              </div>
            </div>
          )}

          {check.step === 'impulse' && (
            <div className="decision-node">
              <div style={{ fontSize: '3rem', marginBottom: '16px' }}>⏳</div>
              <h3 className="decision-question">The 7-Day Rule</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '24px' }}>
                Wait exactly 7 days. Often the excitement fades and you forget about it entirely. Have 7 days passed?
              </p>
              <div className="decision-options">
                <button className="decision-btn yes" onClick={() => setCheck({ step: 'seven-day' })}>
                  Yes, 7 days passed
                </button>
                <button className="decision-btn no" onClick={() => setCheck({ 
                  step: 'result', 
                  result: 'dont-buy', 
                  reason: "Wait 7 days before making this decision." 
                })}>
                  No, I just saw it
                </button>
              </div>
            </div>
          )}

          {check.step === 'seven-day' && (
            <div className="decision-node">
              <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🤔</div>
              <h3 className="decision-question">Do you still want it?</h3>
              <div className="decision-options" style={{ marginTop: '24px' }}>
                <button className="decision-btn yes" onClick={() => setCheck({ step: 'brand-value' })}>
                  Yes, I still want it
                </button>
                <button className="decision-btn no" onClick={() => setCheck({ 
                  step: 'result', 
                  result: 'dont-buy', 
                  reason: "The dopamine hit faded. Good thing you waited." 
                })}>
                  No, I lost interest
                </button>
              </div>
            </div>
          )}

          {check.step === 'brand-value' && (
            <div className="decision-node">
              <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🏷️</div>
              <h3 className="decision-question">Are you buying for the brand or the value?</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '24px', textAlign: 'left' }}>
                <strong>Value:</strong> A $60 pair of boots worn 100 times = $0.60 per wear.<br/><br/>
                <strong>Brand:</strong> $200 designer trainers worn twice = $100 per wear.
              </p>
              <div className="decision-options">
                <button className="decision-btn yes" onClick={() => setCheck({ step: 'improve-life' })}>
                  Value (Quality/Use)
                </button>
                <button className="decision-btn no" onClick={() => setCheck({ 
                  step: 'result', 
                  result: 'dont-buy', 
                  reason: "You're paying for marketing, not utility. Look for an unbranded alternative." 
                })}>
                  Brand (Status/Logo)
                </button>
              </div>
            </div>
          )}

          {check.step === 'improve-life' && (
            <div className="decision-node">
              <div style={{ fontSize: '3rem', marginBottom: '16px' }}>✨</div>
              <h3 className="decision-question">Will this truly improve your life?</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '24px' }}>
                Be honest. Is it a conscious, intentional purchase, or just killing boredom / chasing a dopamine hit?
              </p>
              <div className="decision-options">
                <button className="decision-btn yes" onClick={() => setCheck({ 
                  step: 'result', 
                  result: 'buy', 
                  reason: "It's a conscious, intentional purchase. You've vetted it thoroughly." 
                })}>
                  Yes, it adds value
                </button>
                <button className="decision-btn no" onClick={() => setCheck({ 
                  step: 'result', 
                  result: 'dont-buy', 
                  reason: "Save the money. It's not worth it." 
                })}>
                  No, probably not
                </button>
              </div>
            </div>
          )}

          {check.step === 'result' && (
            <div className={`decision-result ${check.result}`}>
              <div style={{ fontSize: '4rem', marginBottom: '16px' }}>
                {check.result === 'buy' ? '✅' : '❌'}
              </div>
              <h2 style={{ marginBottom: '8px' }}>
                {check.result === 'buy' ? 'Go ahead and buy it' : 'Do not buy it'}
              </h2>
              <p style={{ opacity: 0.9 }}>{check.reason}</p>
              <button 
                className="btn btn-secondary" 
                style={{ marginTop: '24px' }}
                onClick={reset}
              >
                Evaluate another item
              </button>
            </div>
          )}

        </div>
      </div>
    </>
  );
}
