import React from 'react';
import { ArrowRight, Plus } from 'lucide-react';
import Image from 'next/image';

export default function LandingPage({ onEnter }: { onEnter: () => void }) {
  return (
    <main className="bg-wealth-cream text-wealth-dark overflow-x-hidden font-sans">
      
      {/* HERO SECTION */}
      <div className="min-h-screen flex flex-col md:flex-row">
        
        {/* LEFT COLUMN: Editorial Typography */}
        <div className="w-full md:w-[55%] flex flex-col justify-between p-6 sm:p-8 md:p-16 min-h-screen relative z-10">
          
          {/* Nav / Header */}
          <nav className="flex justify-between items-center" style={{ animation: 'fadeIn 1s ease-out' }}>
            <div className="font-playfair text-xl sm:text-2xl font-bold italic tracking-tighter">
              WealthFlow.
            </div>
            <div className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-wealth-dark/50 text-right leading-tight">
              Vol. 01 <br/> The Blueprint
            </div>
          </nav>

          {/* Main Headline */}
          <div className="my-auto py-8 md:py-0" style={{ animation: 'slideUp 1.2s ease-out' }}>
            <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
              <div className="h-[1px] w-8 sm:w-12 bg-wealth-red" />
              <span className="text-[10px] sm:text-xs font-semibold tracking-widest uppercase text-wealth-red">Systematic Wealth</span>
            </div>
            
            <h1 className="font-playfair text-5xl sm:text-7xl md:text-[90px] lg:text-[110px] leading-[0.85] tracking-tighter uppercase font-bold text-wealth-dark">
              Precision
            </h1>
            <h1 className="font-playfair text-5xl sm:text-7xl md:text-[90px] lg:text-[110px] leading-[0.85] tracking-tighter uppercase font-bold text-wealth-dark/30 mt-1 sm:mt-2">
              Allocation
            </h1>
            
            <p className="mt-8 sm:mt-12 text-sm md:text-base text-wealth-gray max-w-md font-light leading-relaxed">
              A meticulously curated framework introducing influential habits and essential financial structures. Escape the gravity of living paycheck to paycheck through the 25/15/50/10 rule.
            </p>

            {/* Unified CTA: button + arrow as a single interactive row */}
            <button 
              onClick={onEnter}
              className="mt-10 sm:mt-16 flex items-center gap-4 group cursor-pointer"
            >
              <span className="bg-wealth-dark text-wealth-cream group-hover:bg-wealth-red group-hover:text-white rounded-full px-6 sm:px-8 py-4 sm:py-5 text-[10px] sm:text-xs uppercase tracking-widest font-semibold transition-all duration-500 ease-out group-hover:px-10 sm:group-hover:px-12 inline-flex items-center gap-3">
                Enter The System
                <ArrowRight strokeWidth={1.5} className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
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
                className="object-cover object-center"
                priority
              />
            </div>
          </div>
          
          {/* Subtle overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />

          {/* Floating Data Card */}
          <div className="absolute bottom-6 sm:bottom-12 md:bottom-16 left-4 sm:left-8 bg-wealth-card p-5 sm:p-8 rounded-xl shadow-2xl max-w-[260px] sm:max-w-xs transition-transform duration-700 hover:-translate-y-2 z-20">
            <div className="flex justify-between items-start mb-4 sm:mb-6">
              <h3 className="font-playfair text-lg sm:text-xl font-bold text-wealth-dark italic">The Blueprint</h3>
              <span className="text-[10px] sm:text-xs font-mono text-wealth-red ml-3">25/15/50/10</span>
            </div>
            
            <div className="space-y-3 sm:space-y-4">
              <div className="flex justify-between items-center border-b border-wealth-dark/10 pb-2">
                <span className="text-[10px] sm:text-xs text-wealth-gray uppercase tracking-wider">Growth</span>
                <span className="text-xs sm:text-sm font-semibold text-wealth-dark">25%</span>
              </div>
              <div className="flex justify-between items-center border-b border-wealth-dark/10 pb-2">
                <span className="text-[10px] sm:text-xs text-wealth-gray uppercase tracking-wider">Stability</span>
                <span className="text-xs sm:text-sm font-semibold text-wealth-dark">15%</span>
              </div>
              <div className="flex justify-between items-center border-b border-wealth-dark/10 pb-2">
                <span className="text-[10px] sm:text-xs text-wealth-gray uppercase tracking-wider">Essentials</span>
                <span className="text-xs sm:text-sm font-semibold text-wealth-dark">50%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[10px] sm:text-xs text-wealth-gray uppercase tracking-wider">Rewards</span>
                <span className="text-xs sm:text-sm font-semibold text-wealth-dark">10%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* PERSUASIVE INFO SECTION */}
      <section className="px-6 sm:px-8 md:px-16 py-24 md:py-32 max-w-7xl mx-auto border-t border-wealth-dark/10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
          
          {/* Left side: The Manifesto */}
          <div>
            <h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-12 text-wealth-dark">
              Not a budget.<br/>A <span className="italic text-wealth-red">blueprint.</span>
            </h2>
            <div className="space-y-10 text-wealth-gray font-light text-sm md:text-base leading-relaxed">
              <div>
                <strong className="text-wealth-dark font-semibold tracking-wide uppercase text-xs block mb-3">What it is for</strong>
                <p>The 25/15/50/10 system is engineered for one purpose: escape velocity. It is a mathematical framework designed to break the modern slavery of living paycheck to paycheck, allowing you to build aggressive wealth while permanently insulating yourself from financial shocks.</p>
              </div>
              <div>
                <strong className="text-wealth-dark font-semibold tracking-wide uppercase text-xs block mb-3">Why it is effective</strong>
                <p>It relies on automated discipline rather than human willpower. By pre-allocating your capital into strict percentage buckets the exact moment you are paid, it removes the emotional friction from financial decisions. The math works identically regardless of your income level.</p>
              </div>
              <div>
                <strong className="text-wealth-dark font-semibold tracking-wide uppercase text-xs block mb-3">What it doesn't do</strong>
                <p>It does not micromanage your morning coffee. It does not demand extreme, miserable frugality. It is an anti-budget that manages ratios, not receipts. As long as your lifestyle fits inside the 50% bucket, the rest of your wealth essentially builds itself.</p>
              </div>
            </div>
          </div>

          {/* Right side: The Mechanics breakdown */}
          <div className="flex flex-col justify-center space-y-12 mt-8 md:mt-0">
            
            <div className="border-l-[3px] border-wealth-red pl-6 relative hover:translate-x-2 transition-transform duration-300">
              <div className="flex items-baseline gap-4 mb-2">
                <span className="font-playfair text-4xl font-bold text-wealth-dark">25%</span>
                <span className="text-xs uppercase tracking-widest font-semibold text-wealth-red">Growth</span>
              </div>
              <p className="text-sm text-wealth-gray leading-relaxed">Your economic engine. Aggressively routed into investments, index funds, and assets that compound silently while you sleep.</p>
            </div>

            <div className="border-l-[3px] border-wealth-dark/20 pl-6 hover:border-wealth-dark/60 hover:translate-x-2 transition-all duration-300">
              <div className="flex items-baseline gap-4 mb-2">
                <span className="font-playfair text-4xl font-bold text-wealth-dark">15%</span>
                <span className="text-xs uppercase tracking-widest font-semibold text-wealth-dark/60">Stability</span>
              </div>
              <p className="text-sm text-wealth-gray leading-relaxed">Your fortress. A highly liquid emergency fund built to cover 5 months of total runway. Zero risk, always accessible.</p>
            </div>

            <div className="border-l-[3px] border-wealth-dark/20 pl-6 hover:border-wealth-dark/60 hover:translate-x-2 transition-all duration-300">
              <div className="flex items-baseline gap-4 mb-2">
                <span className="font-playfair text-4xl font-bold text-wealth-dark">50%</span>
                <span className="text-xs uppercase tracking-widest font-semibold text-wealth-dark/60">Essentials</span>
              </div>
              <p className="text-sm text-wealth-gray leading-relaxed">The strict cap on your lifestyle. Rent, groceries, transport, and utilities must fit here. If they don't, you are living above your station.</p>
            </div>

            <div className="border-l-[3px] border-wealth-dark/20 pl-6 hover:border-wealth-dark/60 hover:translate-x-2 transition-all duration-300">
              <div className="flex items-baseline gap-4 mb-2">
                <span className="font-playfair text-4xl font-bold text-wealth-dark">10%</span>
                <span className="text-xs uppercase tracking-widest font-semibold text-wealth-dark/60">Rewards</span>
              </div>
              <p className="text-sm text-wealth-gray leading-relaxed">Guilt-free joy. Experiences, dining, and luxury. Because wealth building without actually living feels like a punishment.</p>
            </div>

          </div>
        </div>
      </section>

      {/* TYPOGRAPHIC BREAK: The Philosophy */}
      <section className="px-6 sm:px-8 md:px-16 py-24 md:py-32 bg-wealth-dark text-wealth-cream">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-8 text-wealth-red">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.7 10.3a2.41 2.41 0 0 0 0 3.41l7.59 7.59a2.41 2.41 0 0 0 3.41 0l7.59-7.59a2.41 2.41 0 0 0 0-3.41l-7.59-7.59a2.41 2.41 0 0 0-3.41 0Z"/></svg>
          </div>
          <h2 className="font-playfair text-3xl md:text-5xl leading-tight font-bold italic mb-6">
            &quot;If you don&apos;t own something, you are what&apos;s owned.&quot;
          </h2>
          <p className="text-wealth-cream/60 text-sm md:text-base font-light tracking-wide">
            The richest people are 75% entrepreneurs, 15% investors, 7% inheritors, 3% artists — 0% salary employees.
          </p>
        </div>
      </section>

      {/* THE TOOL / EXPERIENCE SECTION */}
      <section className="px-6 sm:px-8 md:px-16 py-24 md:py-32 max-w-7xl mx-auto border-b border-wealth-dark/10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left: Software copy */}
          <div>
            <div className="flex items-center gap-3 sm:gap-4 mb-6">
              <div className="h-[1px] w-8 sm:w-12 bg-wealth-red" />
              <span className="text-[10px] sm:text-xs font-semibold tracking-widest uppercase text-wealth-red">The Software</span>
            </div>
            <h2 className="font-playfair text-4xl md:text-5xl font-bold tracking-tight mb-8 text-wealth-dark">
              A philosophy requires a <span className="italic text-wealth-gray">control center.</span>
            </h2>
            <p className="text-wealth-gray font-light text-sm md:text-base leading-relaxed mb-8">
              WealthFlow isn&apos;t just a spreadsheet. It is a beautifully engineered, client-side dashboard that maps your exact income to the 25/15/50/10 blueprint. 
              Track your allocations, measure your Wealth Score, and log transactions without your financial data ever leaving your device.
            </p>
            <ul className="space-y-4">
              <li className="flex items-start gap-4">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-wealth-red flex-shrink-0" />
                <span className="text-sm text-wealth-dark"><strong className="font-semibold">Local-First Security:</strong> Your numbers stay strictly on your machine. No cloud sync, no tracking.</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-wealth-dark/40 flex-shrink-0" />
                <span className="text-sm text-wealth-dark"><strong className="font-semibold">Dynamic Wealth Score:</strong> Get real-time, mathematical feedback on how closely your spending matches the blueprint.</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-wealth-dark/40 flex-shrink-0" />
                <span className="text-sm text-wealth-dark"><strong className="font-semibold">Automated Math:</strong> Input your income, and the system instantly generates your hard financial limits.</span>
              </li>
            </ul>
          </div>

          {/* Right: Abstract UI representation */}
          <div className="relative bg-wealth-card p-8 sm:p-10 rounded-2xl shadow-2xl border border-wealth-dark/5 group overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-wealth-cream/50 to-transparent pointer-events-none" />
            
            <div className="relative z-10 flex justify-between items-end border-b border-wealth-dark/10 pb-4 mb-8">
              <div>
                <div className="text-[10px] uppercase tracking-widest text-wealth-gray mb-1">Monthly Income</div>
                <div className="font-mono text-xl sm:text-2xl font-bold text-wealth-dark">Br20,000</div>
              </div>
              <div className="bg-emerald-500/10 text-emerald-600 px-3 py-1 rounded-full text-xs font-semibold">
                Score: 85
              </div>
            </div>

            <div className="relative z-10 space-y-8">
              {[
                { label: 'Growth Target', val: 'Br5,000', percent: '25%', color: 'bg-[#00d4aa]' },
                { label: 'Stability Target', val: 'Br3,000', percent: '15%', color: 'bg-[#6366f1]' },
                { label: 'Essentials Target', val: 'Br10,000', percent: '50%', color: 'bg-[#f59e0b]' },
              ].map((item, i) => (
                <div key={i} className="relative">
                  <div className="flex justify-between text-xs mb-3">
                    <span className="text-wealth-gray uppercase tracking-wider">{item.label}</span>
                    <span className="font-mono font-semibold text-wealth-dark">{item.val}</span>
                  </div>
                  <div className="h-1.5 w-full bg-wealth-dark/5 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${item.color} rounded-full transform origin-left transition-transform duration-1000 group-hover:scale-x-105`} 
                      style={{ width: item.percent }}
                    />
                  </div>
                </div>
              ))}
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-wealth-red/5 rounded-full blur-3xl group-hover:bg-wealth-red/10 transition-colors duration-700 pointer-events-none" />
          </div>

        </div>
      </section>
        
      {/* Bottom CTA */}
        <div className="mt-32 text-center flex flex-col items-center">
           <h2 className="font-playfair text-3xl font-bold text-wealth-dark mb-8">Ready to architect your wealth?</h2>
           <button 
              onClick={onEnter}
              className="group flex items-center gap-4 bg-wealth-red text-white hover:bg-wealth-dark rounded-full px-8 py-5 text-xs uppercase tracking-widest font-semibold transition-all duration-500"
            >
              Start Implementing
              <ArrowRight strokeWidth={2} className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
        </div>
      </section>

    </main>
  );
}
