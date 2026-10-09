'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/store';
import Sidebar from '@/components/Sidebar';
import SetupWizard from '@/components/SetupWizard';
import Dashboard from '@/components/Dashboard';
import GrowthTracker from '@/components/GrowthTracker';
import StabilityFund from '@/components/StabilityFund';
import EssentialsManager from '@/components/EssentialsManager';
import JoyJar from '@/components/JoyJar';
import ImpulseDecisionTree from '@/components/ImpulseDecisionTree';
import Insights from '@/components/Insights';
import Settings from '@/components/Settings';
import LandingPage from '@/components/LandingPage';

export default function Home() {
  const { state } = useApp();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showLanding, setShowLanding] = useState(true);

  // Still loading from localStorage
  if (!state.isLoaded) {
    return (
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ animation: 'pulse 1.5s infinite', fontSize: '2rem' }}>💰</div>
      </div>
    );
  }

  // Not set up yet
  if (!state.user.isSetupComplete) {
    if (showLanding) {
      return <LandingPage onEnter={() => setShowLanding(false)} />;
    }
    return (
      <main className="app-container" style={{ background: 'var(--bg-primary)' }}>
        <SetupWizard />
      </main>
    );
  }

  // Render active tab
  const renderContent = () => {
    switch (state.activeTab) {
      case 'dashboard': return <Dashboard />;
      case 'growth': return <GrowthTracker />;
      case 'stability': return <StabilityFund />;
      case 'essentials': return <EssentialsManager />;
      case 'rewards': return <JoyJar />;
      case 'compound': return <GrowthTracker />; // We just show the growth tab for this since it's there
      case 'impulse': return <ImpulseDecisionTree />;
      case 'insights': return <Insights />;
      case 'settings': return <Settings />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="app-container">
      {/* Mobile overlay */}
      {isSidebarOpen && (
        <div 
          className="modal-overlay" 
          style={{ zIndex: 90 }} 
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <Sidebar 
        isOpen={isSidebarOpen} 
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)} 
      />

      <main className="main-content">
        {renderContent()}
      </main>
    </div>
  );
}
