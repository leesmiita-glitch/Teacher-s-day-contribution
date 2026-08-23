import React from 'react';
import { Leaf, ArrowRight } from 'lucide-react';

interface HeroProps {
  onOpenContribute: () => void;
  onViewContributions: () => void;
}

export function Hero({ onOpenContribute, onViewContributions }: HeroProps) {
  return (
    <section className="relative px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 pb-16 overflow-hidden flex flex-col items-center text-center z-20">
      {/* Decorative Natural Watercolor / Botanical Elements */}
      <div
        className="absolute -top-10 -left-10 w-48 sm:w-64 h-48 sm:h-64 opacity-40 float-animation pointer-events-none mix-blend-multiply select-none"
        style={{
          backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuCEyp6NcazZc7U2NIDxkJ8-WaE0O1XXSXN3LNuaPQY6aPnIhs3cwWbjBY1joElcJJQbk9DPddRxWUjHh6S2u79W4Zke8uU9W2hpJ66gHAMpE2VdNLBXbASO_DbktVfCQTfQBiBZQfAMqUEYGCVEjPTjG08r4nc4Aq1AU-3_wO8CQaM8ExLuFzkJpI82mQWS5PmCxbuliNCvpLq3uGxUSwkFJICSzFV288FM07W0L0XXX7Mvr_zbR3M')`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
        aria-hidden="true"
      />

      <div
        className="absolute top-10 -right-16 w-56 sm:w-80 h-56 sm:h-80 opacity-35 float-animation pointer-events-none mix-blend-multiply select-none"
        style={{
          animationDelay: '-3.5s',
          backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDXQzI9zOM3J7d4MuspO8eQ6xmVy5E2LGGvehmV7KDpAmBz71vmRDVVuty_vLqRTAeFDPooYYE6VZDtKzirRM1pMLRdaNN2cMHX12lqYPsDt186lcqY6bZa6vTpsylG--18eu3APGaI0LLTTSP4uwopOvA6u1n-WjEyFADA6-zOdl9zP2NDN4A7iQYY19HXWNWWnZ4McWG3i8JCwe52CsO540uhD6WTZckgrAoAEoxdH1BBJzG5UdY')`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
        aria-hidden="true"
      />

      {/* Main Content */}
      <div className="relative z-10 max-w-2xl mx-auto space-y-4">
        {/* Subtle pill tag */}
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#E5EADF] text-[#5A6F54] text-xs font-semibold uppercase tracking-wider mb-1">
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
            onClick={onOpenContribute}
            className="w-full sm:w-auto bg-[#5A6F54] text-white text-base font-semibold px-8 py-3.5 rounded-full hover:bg-[#475943] hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 shadow-md active:scale-95 active:translate-y-0 flex items-center justify-center gap-2 group cursor-pointer"
          >
            <span>Contribute Now</span>
            <Leaf className="w-4 h-4 group-hover:rotate-12 transition-transform" />
          </button>

          <button
            onClick={onViewContributions}
            className="w-full sm:w-auto border border-[#E8E6DF] text-[#3D3D3D] text-base font-medium px-8 py-3.5 rounded-full bg-white hover:bg-[#F5F4EF] hover:border-[#D4A373] hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 relative overflow-hidden group cursor-pointer"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              <span>View Contributions</span>
              <ArrowRight className="w-4 h-4 text-[#8C897E] group-hover:text-[#5A6F54] group-hover:translate-x-0.5 transition-all" />
            </span>
            <div className="absolute inset-0 shimmer-effect opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        </div>
      </div>
    </section>
  );
}
