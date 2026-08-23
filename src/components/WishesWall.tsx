import React, { useState } from 'react';
import { Sparkles, Quote, Shuffle, MessageCircleHeart } from 'lucide-react';
import { Contribution } from '../types';

interface WishesWallProps {
  contributions: Contribution[];
}

export function WishesWall({ contributions }: WishesWallProps) {
  const [featuredIndex, setFeaturedIndex] = useState(0);

  const quotesList = contributions.filter((c) => c.quote && c.quote.length > 5);

  const handleRandomize = () => {
    if (quotesList.length <= 1) return;
    let next = Math.floor(Math.random() * quotesList.length);
    if (next === featuredIndex) {
      next = (next + 1) % quotesList.length;
    }
    setFeaturedIndex(next);
  };

  const featured = quotesList[featuredIndex] || contributions[0];

  return (
    <section className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto py-10 relative z-20">
      {/* Title */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#E5EADF] text-[#5A6F54] text-xs font-bold uppercase tracking-wider mb-3">
          <MessageCircleHeart className="w-4 h-4 text-[#5A6F54]" />
          <span>Wishes & Gratitude Wall</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-5xl text-[#3D3D3D] font-bold italic">
          Voices of <span className="text-[#5A6F54]">Gratitude</span>
        </h2>
        <p className="text-sm sm:text-base text-[#8C897E] mt-2 max-w-md mx-auto">
          Read the touching words and messages dedicated to our esteemed teachers and mentors.
        </p>
      </div>

      {/* Featured Quote Spotlight Card */}
      {featured && (
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-[#E8E6DF] border-t-4 border-t-[#D4A373] mb-10 relative overflow-hidden">
          <Quote className="w-12 h-12 text-[#D4A373]/20 absolute top-4 left-4 pointer-events-none" />
          <div className="relative z-10 text-center max-w-xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D4A373] mb-2 block">
              Spotlight Tribute
            </span>
            <p className="font-serif italic text-xl sm:text-2xl text-[#3D3D3D] leading-relaxed my-4">
              "{featured.quote}"
            </p>
            <div className="flex items-center justify-center gap-2 mt-4">
              <div className="w-8 h-8 rounded-full bg-[#E5EADF] text-[#5A6F54] font-bold text-xs flex items-center justify-center">
                {featured.name.charAt(0)}
              </div>
              <p className="font-semibold text-sm text-[#5A6F54]">{featured.name}</p>
              <span className="text-xs text-[#8C897E]">• {featured.branch || 'Student'}</span>
            </div>

            <button
              onClick={handleRandomize}
              className="mt-6 inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#F5F4EF] border border-[#E8E6DF] text-xs font-semibold text-[#3D3D3D] hover:text-[#5A6F54] hover:border-[#5A6F54] shadow-sm transition-all cursor-pointer"
            >
              <Shuffle className="w-3.5 h-3.5" />
              <span>Shuffle Tribute</span>
            </button>
          </div>
        </div>
      )}

      {/* Grid of Student Quotes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {quotesList.map((item, index) => (
          <div
            key={item.id || index}
            className="bg-white p-5 sm:p-6 rounded-2xl shadow-sm border border-[#E8E6DF] hover:-translate-y-0.5 hover:border-[#D4A373] transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <Quote className="w-6 h-6 text-[#5A6F54]/20 mb-2" />
              <p className="font-serif italic text-sm sm:text-base text-[#3D3D3D] leading-relaxed">
                "{item.quote}"
              </p>
            </div>

            <div className="flex items-center justify-between mt-5 pt-3 border-t border-[#E8E6DF]">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-[#E5EADF] text-[#5A6F54] font-bold text-xs flex items-center justify-center">
                  {item.name.charAt(0)}
                </div>
                <span className="text-xs font-semibold text-[#3D3D3D]">{item.name}</span>
              </div>
              <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-[#F5F4EF] text-[#8C897E] border border-[#E8E6DF]/60">
                {item.branch || 'General'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

