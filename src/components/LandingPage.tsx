import React from 'react';
import { Playfair_Display, Inter } from 'next/font/google';
import { ArrowRight, Plus } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';

const playfair = Playfair_Display({ subsets: ['latin'], style: ['normal', 'italic'] });
const inter = Inter({ subsets: ['latin'] });

export default function LandingPage({ onEnter }: { onEnter: () => void }) {
  return (
    <div className={`min-h-screen bg-[#F4F1ED] text-[#1A1A1A] overflow-hidden ${inter.className}`}>
      
      {/* Navigation */}
      <nav className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
        <button className="text-2xl font-light hover:rotate-90 transition-transform duration-300">
          <Plus strokeWidth={1} />
        </button>
        <div className={`${playfair.className} text-3xl font-bold tracking-tight italic`}>
          WealthFlow
        </div>
        <button 
          onClick={onEnter}
          className="text-sm font-semibold tracking-widest uppercase hover:text-[#E83A14] transition-colors"
        >
          Enter App
        </button>
      </nav>

      {/* Hero Section */}
      <main className="relative max-w-7xl mx-auto px-8 pt-12 pb-24 flex flex-col items-center">
        
        {/* Main Typography Header (Inspiration 1: Art that keeps speaking) */}
        <div className="relative w-full text-center z-10 select-none">
          
          <div className="flex justify-between items-end absolute top-12 left-0 right-0 px-24 z-20 text-[#6B6B6B] text-xs font-semibold uppercase tracking-widest">
            <span className="text-left w-32">The 1% <br/> Blueprint</span>
            <span className="text-right w-32">Since <br/> 2024</span>
          </div>

          <h1 className={`${playfair.className} text-[10vw] leading-[0.8] tracking-tighter text-[#E83A14] uppercase font-bold relative z-10 mix-blend-multiply`}>
            The System
          </h1>
          
          <div className="relative inline-block mt-[-4vw]">
            {/* Center "Painting/Card" element acting as the focal point */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[35vw] h-[25vw] bg-white rounded-3xl shadow-2xl z-0 overflow-hidden border border-[#E5E0D8]">
               {/* Elegant internal layout for the center card (Inspiration 2) */}
               <div className="w-full h-full p-8 flex flex-col justify-between relative bg-gradient-to-br from-white to-[#F9F7F3]">
                 <div className="flex justify-between items-center z-10">
                   <div className="flex gap-2">
                     <span className="px-3 py-1 bg-white border rounded-full text-xs font-medium">Growth</span>
                     <span className="px-3 py-1 bg-[#1A1A1A] text-white rounded-full text-xs font-medium">25%</span>
                   </div>
                   <div className="text-xl">📈</div>
                 </div>
                 
                 <div className="z-10 mt-auto">
                   <h3 className={`${playfair.className} text-3xl mb-2 text-[#1A1A1A]`}>Unique precision &<br/>allocation</h3>
                   <p className="text-sm text-[#6B6B6B]">From paychecks to portfolios.</p>
                 </div>
                 
                 {/* Abstract geometric shapes mimicking architecture/modern art */}
                 <div className="absolute right-0 bottom-0 w-2/3 h-2/3 bg-gradient-to-tl from-[#F4F1ED] to-transparent rounded-tl-3xl opacity-50" />
               </div>
            </div>

            <h1 className={`${playfair.className} text-[10vw] leading-[0.8] tracking-tighter text-[#E83A14] uppercase font-bold relative z-20 mix-blend-multiply`}>
              That Builds
            </h1>
          </div>
          
          <h1 className={`${playfair.className} text-[10vw] leading-[0.8] tracking-tighter text-[#E83A14] uppercase font-bold relative z-10 mix-blend-multiply mt-[-2vw]`}>
            Wealth
          </h1>
        </div>

        {/* Lower Info Banner */}
        <div className="w-full mt-24 flex items-stretch">
          <div className="w-1/3 bg-[#E83A14] p-8 text-white flex flex-col justify-center rounded-l-xl">
             <h2 className={`${playfair.className} text-3xl mb-4`}>The 25/15/50/10 Rule</h2>
             <p className="text-sm opacity-90 mb-8 max-w-sm">
               A carefully selected framework presenting influential habits and essential financial languages. Overcome the modern slavery of living paycheck to paycheck.
             </p>
             <div className="flex items-center gap-4">
               <Button onClick={onEnter} variant="secondary" className="bg-white text-[#E83A14] hover:bg-[#F4F1ED] rounded-none px-8 py-6 text-xs uppercase tracking-widest font-semibold border-none">
                 Start Now
               </Button>
               <ArrowRight strokeWidth={1} className="w-8 h-8 opacity-80" />
             </div>
          </div>
          
          <div className="w-2/3 grid grid-cols-2 gap-4 pl-4">
             {/* Sub-cards showcasing principles */}
             <Card className="bg-white border-none shadow-xl rounded-xl p-6 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div className="w-10 h-10 rounded-full bg-[#E83A14]/10 flex items-center justify-center text-[#E83A14]">
                    <span>1</span>
                  </div>
                </div>
                <div>
                  <h3 className={`${playfair.className} text-xl mb-2`}>Stability Fund</h3>
                  <p className="text-sm text-[#6B6B6B]">15% to build a 5-month fortress. Zero risk, always accessible.</p>
                </div>
             </Card>
             
             <Card className="bg-[#1A1A1A] text-white border-none shadow-xl rounded-r-xl p-6 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white">
                    <span>2</span>
                  </div>
                </div>
                <div>
                  <h3 className={`${playfair.className} text-xl mb-2`}>Guilt-Free Joy</h3>
                  <p className="text-sm text-gray-400">10% for experiences. Saving without joy feels like punishment.</p>
                </div>
             </Card>
          </div>
        </div>

      </main>
      
      {/* Footer style floating corner elements */}
      <div className="fixed bottom-8 left-8 text-xs font-mono uppercase tracking-widest text-[#6B6B6B] vertical-text transform -rotate-90 origin-bottom-left">
        Rule / 01
      </div>
    </div>
  );
}
