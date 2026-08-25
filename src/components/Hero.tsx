import React from 'react';
import { Leaf, ArrowRight, ShieldCheck } from 'lucide-react';

interface HeroProps {
  onViewContributions: () => void;
  onViewReceivers?: () => void;
}

export function Hero({ onViewContributions, onViewReceivers }: HeroProps) {
  const handleScrollToReceivers = () => {
    if (onViewReceivers) {
      onViewReceivers();
    } else {
      const el = document.getElementById('receivers-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 pb-14 overflow-hidden flex flex-col items-center text-center z-20">


      {/* Main Content */}
      <div className="relative z-10 max-w-2xl mx-auto space-y-4">
        {/* Subtle pill tag */}
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#E5EADF] text-[#5A6F54] text-xs font-semibold uppercase tracking-wider mb-1 shadow-xs">
          <Leaf className="w-3.5 h-3.5" />
          <span>1st Year CSE (52 Students) • Appreciation Tribute</span>
        </div>

        <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#3D3D3D] font-bold italic tracking-tight leading-[1.15]">
          Happy <span className="text-[#5A6F54]">Teacher's Day</span>
        </h2>

        <p className="text-base sm:text-lg md:text-xl text-[#8C897E] max-w-lg mx-auto font-normal leading-relaxed pt-1">
          A small contribution. A big expression of gratitude for the mentors who guide us.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6 max-w-md mx-auto w-full">
          <button
            onClick={onViewContributions}
            className="w-full sm:w-auto bg-[#5A6F54] text-white text-base font-semibold px-8 py-3.5 rounded-full hover:bg-[#475943] hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 shadow-md active:scale-95 active:translate-y-0 flex items-center justify-center gap-2 group cursor-pointer"
          >
            <span>View Contributions</span>
            <ArrowRight className="w-4 h-4 text-white/90 group-hover:translate-x-0.5 transition-transform" />
          </button>

          <button
            onClick={handleScrollToReceivers}
            className="w-full sm:w-auto border border-[#E8E6DF] text-[#3D3D3D] text-base font-medium px-7 py-3.5 rounded-full bg-white hover:bg-[#F5F4EF] hover:border-[#D4A373] hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 relative overflow-hidden group cursor-pointer"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#D4A373] group-hover:text-[#5A6F54] transition-colors" />
              <span>Khushi & Aditya Collection</span>
            </span>
            <div className="absolute inset-0 shimmer-effect opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        </div>
      </div>
    </section>
  );
}

