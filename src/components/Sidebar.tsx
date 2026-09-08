// ============================================
// WealthFlow — Sidebar Navigation
// ============================================

'use client';

import React from 'react';
import { useApp } from '@/lib/store';
import { LayoutDashboard, Rocket, Shield, Home, PartyPopper, TrendingUp, HelpCircle, Lightbulb, Settings } from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
  badge?: string;
}

const mainNavItems: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'growth', label: 'Growth (25%)', icon: Rocket },
  { id: 'stability', label: 'Stability (15%)', icon: Shield },
  { id: 'essentials', label: 'Essentials (50%)', icon: Home },
  { id: 'rewards', label: 'Joy Jar (10%)', icon: PartyPopper },
];

const toolsNavItems: NavItem[] = [
  { id: 'compound', label: 'Compound Calculator', icon: TrendingUp },
  { id: 'impulse', label: 'Purchase Decision', icon: HelpCircle },
  { id: 'insights', label: 'Insights', icon: Lightbulb },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export default function Sidebar({ isOpen, onToggle }: { isOpen: boolean; onToggle: () => void }) {
  const { state, dispatch } = useApp();
  const activeTab = state.activeTab;

  const handleNav = (id: string) => {
    dispatch({ type: 'SET_TAB', payload: id });
    if (window.innerWidth < 768) {
      onToggle();
    }
  };

  const initials = state.user.name
    ? state.user.name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
    : 'WF';

  return (
    <>
      <button className="mobile-menu-btn" onClick={onToggle}>
        {isOpen ? '✕' : '☰'}
      </button>
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <div className="sidebar-logo-icon">W</div>
            <div>
              <h1>WealthFlow</h1>
              <span>25 / 15 / 50 / 10</span>
            </div>
          </div>
        </div>

        <nav className="sidebar-nav">
          <div className="nav-section-title">Overview</div>
          {mainNavItems.map((item) => (
            <div
              key={item.id}
              className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
              onClick={() => handleNav(item.id)}
            >
              <span className="nav-icon"><item.icon className="w-5 h-5" /></span>
              <span>{item.label}</span>
              {item.badge && <span className="nav-badge">{item.badge}</span>}
            </div>
          ))}

          <div className="nav-section-title" style={{ marginTop: '24px' }}>
            Tools
          </div>
          {toolsNavItems.map((item) => (
            <div
              key={item.id}
              className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
              onClick={() => handleNav(item.id)}
            >
              <span className="nav-icon"><item.icon className="w-5 h-5" /></span>
              <span>{item.label}</span>
            </div>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="sidebar-user">
            <div className="sidebar-avatar">{initials}</div>
            <div className="sidebar-user-info">
              <div className="sidebar-user-name">{state.user.name || 'Set Up Profile'}</div>
              <div className="sidebar-user-plan">
                {state.user.isSetupComplete ? 'Pro Wealth Builder' : 'Getting Started'}
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
