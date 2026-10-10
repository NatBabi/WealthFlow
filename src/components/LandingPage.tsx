import React from 'react';
import { ArrowRight, Plus } from 'lucide-react';
import Image from 'next/image';

export default function LandingPage({ onEnter }: { onEnter: () => void }) {
  return (
    <main className="bg-background text-foreground overflow-x-hidden font-sans">
      
      {/* HERO SECTION */}
      <div className="min-h-screen flex flex-col md:flex-row">
        
        {/* LEFT COLUMN: Editorial Typography */}
        <div className="w-full md:w-[55%] flex flex-col justify-between p-6 sm:p-8 md:p-16 min-h-screen relative z-10">
          
          {/* Nav / Header */}
          <nav className="flex justify-between items-center" style={{ animation: 'fadeIn 1s ease-out' }}>
            <div className="font-sans text-xl sm:text-2xl font-normal tracking-tight">
              WealthFlow.
            </div>
            <div className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-wealth-gray text-right leading-tight">
              Vol. 01 <br/> The Blueprint
            </div>
          </nav>

          {/* Main Headline */}
          <div className="my-auto py-8 md:py-0" style={{ animation: 'slideUp 1.2s ease-out' }}>
            <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
              <div className="h-[1px] w-8 sm:w-12 bg-wealth-dark" />
              <span className="text-[10px] sm:text-xs font-normal tracking-widest uppercase text-wealth-dark">Systematic Wealth</span>
            </div>
            
            <h1 className="font-sans text-5xl sm:text-7xl md:text-[90px] lg:text-[110px] leading-[0.85] tracking-tighter uppercase font-normal text-wealth-dark">
              Precision
            </h1>
            <h1 className="font-sans text-5xl sm:text-7xl md:text-[90px] lg:text-[110px] leading-[0.85] tracking-tighter uppercase font-normal text-wealth-gray mt-1 sm:mt-2">
              Allocation
            </h1>
            
            <p className="mt-8 sm:mt-12 text-sm md:text-base text-wealth-gray max-w-md font-normal leading-relaxed">
              A meticulously curated framework introducing influential habits and essential financial structures. Escape the gravity of living paycheck to paycheck through the 25/15/50/10 rule.
            </p>

            {/* Unified CTA: button + arrow as a single interactive row */}
            <button 
              onClick={onEnter}
              className="mt-10 sm:mt-16 flex items-center gap-4 group cursor-pointer"
            >
              <span className="bg-transparent text-wealth-dark border border-wealth-dark/30 group-hover:border-wealth-dark/60 rounded-full px-6 sm:px-8 py-4 sm:py-5 text-[10px] sm:text-xs uppercase tracking-widest font-normal transition-all duration-500 ease-out inline-flex items-center gap-3">
                Enter The System
                <ArrowRight strokeWidth={1} className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </button>
          </div>

          {/* Footer / Meta */}
          <div className="flex justify-between items-end border-t border-wealth-dark/10 pt-4 sm:pt-6" style={{ animation: 'fadeIn 2s ease-out' }}>
            <div className="text-[10px] sm:text-xs text-wealth-gray">
              Scroll to explore
            </div>
            <button className="text-xl sm:text-2xl font-light hover:rotate-90 transition-transform duration-500 text-wealth-dark">
              <Plus strokeWidth={1} />
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: Abstract Art & Data */}
        <div className="w-full md:w-[45%] h-[50vh] sm:h-[60vh] md:min-h-screen relative overflow-visible group">
          
          {/* Background Image with slow zoom on hover */}
          <div className="absolute inset-0 w-full h-full overflow-hidden">
            <div className="absolute inset-0 w-full h-full transform scale-100 group-hover:scale-105 transition-transform duration-[3000ms] ease-out">
              <Image 
                src="/editorial-art.jpg" 
                alt="Abstract architecture representing wealth structure" 
                fill
                className="object-cover object-center grayscale opacity-80 mix-blend-screen"
                priority
              />
            </div>
          </div>
          
          {/* Floating Data Card */}
          <div className="absolute bottom-6 sm:bottom-12 md:bottom-16 left-4 sm:left-8 bg-transparent border border-wealth-dark/20 p-5 sm:p-8 rounded-[29px] max-w-[260px] sm:max-w-xs transition-transform duration-700 hover:-translate-y-2 z-20 backdrop-blur-md">
            <div className="flex justify-between items-start mb-4 sm:mb-6">
              <h3 className="font-sans text-lg sm:text-xl font-normal tracking-tight text-wealth-dark">The Blueprint</h3>
              <span className="text-[10px] sm:text-xs font-mono text-wealth-gray ml-3">25/15/50/10</span>
            </div>
            
            <div className="space-y-3 sm:space-y-4">
              <div className="flex justify-between items-center border-b border-wealth-dark/10 pb-2">
                <span className="text-[10px] sm:text-xs text-wealth-gray uppercase tracking-wider">Growth</span>
                <span className="text-xs sm:text-sm font-normal text-wealth-dark">25%</span>
              </div>
              <div className="flex justify-between items-center border-b border-wealth-dark/10 pb-2">
                <span className="text-[10px] sm:text-xs text-wealth-gray uppercase tracking-wider">Stability</span>
                <span className="text-xs sm:text-sm font-normal text-wealth-dark">15%</span>
              </div>
              <div className="flex justify-between items-center border-b border-wealth-dark/10 pb-2">
                <span className="text-[10px] sm:text-xs text-wealth-gray uppercase tracking-wider">Essentials</span>
                <span className="text-xs sm:text-sm font-normal text-wealth-dark">50%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[10px] sm:text-xs text-wealth-gray uppercase tracking-wider">Rewards</span>
                <span className="text-xs sm:text-sm font-normal text-wealth-dark">10%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="px-6 sm:px-8 md:px-16 py-24 md:py-32 max-w-[1440px] mx-auto border-t border-wealth-dark/10">
          
          {/* Left side: The Manifesto */}
          <div>
            <h2 className="font-sans text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight mb-12 text-wealth-dark">
              Not a budget.<br/>A <span className="text-wealth-gray">blueprint.</span>
            </h2>
            <div className="space-y-10 text-wealth-gray font-normal text-sm md:text-base leading-relaxed">
              <div>
                <strong className="text-wealth-dark font-normal tracking-wide uppercase text-xs block mb-3">What it is for</strong>
                <p>The 25/15/50/10 system is engineered for one purpose: escape velocity. It is a mathematical framework designed to break the modern slavery of living paycheck to paycheck, allowing you to build aggressive wealth while permanently insulating yourself from financial shocks.</p>
              </div>
              <div>
                <strong className="text-wealth-dark font-normal tracking-wide uppercase text-xs block mb-3">Why it is effective</strong>
                <p>It relies on automated discipline rather than human willpower. By pre-allocating your capital into strict percentage buckets the exact moment you are paid, it removes the emotional friction from financial decisions. The math works identically regardless of your income level.</p>
              </div>
              <div>
                <strong className="text-wealth-dark font-normal tracking-wide uppercase text-xs block mb-3">What it doesn't do</strong>
                <p>It does not micromanage your morning coffee. It does not demand extreme, miserable frugality. It is an anti-budget that manages ratios, not receipts. As long as your lifestyle fits inside the 50% bucket, the rest of your wealth essentially builds itself.</p>
              </div>
            </div>
          </div>

          {/* Right side: The Mechanics breakdown */}
          <div className="flex flex-col justify-center space-y-12 mt-8 md:mt-0">
            
            <div className="border-l border-wealth-dark/30 pl-6 relative hover:translate-x-2 transition-transform duration-300">
              <div className="flex items-baseline gap-4 mb-2">
                <span className="font-sans text-4xl font-normal text-wealth-dark">25%</span>
                <span className="text-xs uppercase tracking-widest font-normal text-wealth-dark/80">Growth</span>
              </div>
              <p className="text-sm text-wealth-gray leading-relaxed">Your economic engine. Aggressively routed into investments, index funds, and assets that compound silently while you sleep.</p>
            </div>

            <div className="border-l border-wealth-dark/10 pl-6 hover:border-wealth-dark/30 hover:translate-x-2 transition-all duration-300">
              <div className="flex items-baseline gap-4 mb-2">
                <span className="font-sans text-4xl font-normal text-wealth-dark">15%</span>
                <span className="text-xs uppercase tracking-widest font-normal text-wealth-dark/60">Stability</span>
              </div>
              <p className="text-sm text-wealth-gray leading-relaxed">Your fortress. A highly liquid emergency fund built to cover 5 months of total runway. Zero risk, always accessible.</p>
            </div>

            <div className="border-l border-wealth-dark/10 pl-6 hover:border-wealth-dark/30 hover:translate-x-2 transition-all duration-300">
              <div className="flex items-baseline gap-4 mb-2">
                <span className="font-sans text-4xl font-normal text-wealth-dark">50%</span>
                <span className="text-xs uppercase tracking-widest font-normal text-wealth-dark/60">Essentials</span>
              </div>
              <p className="text-sm text-wealth-gray leading-relaxed">The strict cap on your lifestyle. Rent, groceries, transport, and utilities must fit here. If they don't, you are living above your station.</p>
            </div>

            <div className="border-l border-wealth-dark/10 pl-6 hover:border-wealth-dark/30 hover:translate-x-2 transition-all duration-300">
              <div className="flex items-baseline gap-4 mb-2">
                <span className="font-sans text-4xl font-normal text-wealth-dark">10%</span>
                <span className="text-xs uppercase tracking-widest font-normal text-wealth-dark/60">Rewards</span>
              </div>
              <p className="text-sm text-wealth-gray leading-relaxed">Guilt-free joy. Experiences, dining, and luxury. Because wealth building without actually living feels like a punishment.</p>
            </div>

          </div>
        </div>
      </section>

      {/* TYPOGRAPHIC BREAK: The Philosophy */}
      <section className="px-6 sm:px-8 md:px-16 py-24 md:py-32 bg-transparent text-wealth-dark border-y border-wealth-dark/10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-8 text-wealth-dark/40">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M2.7 10.3a2.41 2.41 0 0 0 0 3.41l7.59 7.59a2.41 2.41 0 0 0 3.41 0l7.59-7.59a2.41 2.41 0 0 0 0-3.41l-7.59-7.59a2.41 2.41 0 0 0-3.41 0Z"/></svg>
          </div>
          <h2 className="font-sans text-3xl md:text-5xl leading-tight font-normal mb-6 tracking-tight">
            "If you don't own something, you are what's owned."
          </h2>
          <p className="text-wealth-gray text-sm md:text-base font-normal tracking-wide">
            The richest people are 75% entrepreneurs, 15% investors, 7% inheritors, 3% artists — 0% salary employees.
          </p>
        </div>
      </section>

      {/* THE TOOL / EXPERIENCE SECTION */}
      <section className="px-6 sm:px-8 md:px-16 py-24 md:py-32 max-w-[1440px] mx-auto border-b border-wealth-dark/10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left: Software copy */}
          <div>
            <div className="flex items-center gap-3 sm:gap-4 mb-6">
              <div className="h-[1px] w-8 sm:w-12 bg-wealth-dark" />
              <span className="text-[10px] sm:text-xs font-normal tracking-widest uppercase text-wealth-dark">The Software</span>
            </div>
            <h2 className="font-sans text-4xl md:text-5xl font-normal tracking-tight mb-8 text-wealth-dark">
              A philosophy requires a <span className="text-wealth-gray">control center.</span>
            </h2>
            <p className="text-wealth-gray font-normal text-sm md:text-base leading-relaxed mb-8">
              WealthFlow isn't just a spreadsheet. It is a beautifully engineered, client-side dashboard that maps your exact income to the 25/15/50/10 blueprint. 
              Track your allocations, measure your Wealth Score, and log transactions without your financial data ever leaving your device.
            </p>
            <ul className="space-y-4">
              <li className="flex items-start gap-4">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-wealth-dark/40 flex-shrink-0" />
                <span className="text-sm text-wealth-dark"><strong className="font-normal">Local-First Security:</strong> Your numbers stay strictly on your machine. No cloud sync, no tracking.</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-wealth-dark/40 flex-shrink-0" />
                <span className="text-sm text-wealth-dark"><strong className="font-normal">Dynamic Wealth Score:</strong> Get real-time, mathematical feedback on how closely your spending matches the blueprint.</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-wealth-dark/40 flex-shrink-0" />
                <span className="text-sm text-wealth-dark"><strong className="font-normal">Automated Math:</strong> Input your income, and the system instantly generates your hard financial limits.</span>
              </li>
            </ul>
          </div>

          {/* Right: Abstract UI representation */}
          <div className="relative bg-transparent p-8 sm:p-10 rounded-[29px] border border-wealth-dark/20 group overflow-hidden">
            
            <div className="relative z-10 flex justify-between items-end border-b border-wealth-dark/10 pb-4 mb-8">
              <div>
                <div className="text-[10px] uppercase tracking-widest text-wealth-gray mb-1">Monthly Income</div>
                <div className="font-mono text-xl sm:text-2xl font-normal text-wealth-dark">Br20,000</div>
              </div>
              <div className="border border-wealth-dark/20 text-wealth-dark px-3 py-1 rounded-full text-xs font-normal">
                Score: 85
              </div>
            </div>

            <div className="relative z-10 space-y-8">
              {[
                { label: 'Growth Target', val: 'Br5,000', percent: '25%', color: 'bg-wealth-dark/60' },
                { label: 'Stability Target', val: 'Br3,000', percent: '15%', color: 'bg-wealth-dark/40' },
                { label: 'Essentials Target', val: 'Br10,000', percent: '50%', color: 'bg-wealth-dark/20' },
              ].map((item, i) => (
                <div key={i} className="relative">
                  <div className="flex justify-between text-xs mb-3">
                    <span className="text-wealth-gray uppercase tracking-wider">{item.label}</span>
                    <span className="font-mono font-normal text-wealth-dark">{item.val}</span>
                  </div>
                  <div className="h-[1px] w-full bg-wealth-dark/10 overflow-hidden">
                    <div 
                      className={`h-full ${item.color} transform origin-left transition-transform duration-1000 group-hover:scale-x-105`} 
                      style={{ width: item.percent }}
                    />
                  </div>
                </div>
              ))}
            </div>
            
          </div>

        </div>
      </section>
        
      {/* Bottom CTA */}
        <div className="mt-32 mb-32 text-center flex flex-col items-center">
           <h2 className="font-sans text-3xl font-normal text-wealth-dark mb-8 tracking-tight">Ready to architect your wealth?</h2>
           <button 
              onClick={onEnter}
              className="group flex items-center gap-4 bg-transparent border border-wealth-dark/30 hover:border-wealth-dark/60 text-wealth-dark rounded-full px-8 py-5 text-xs uppercase tracking-widest font-normal transition-all duration-500"
            >
              Start Implementing
              <ArrowRight strokeWidth={1} className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
        </div>
    </main>
  );
}
