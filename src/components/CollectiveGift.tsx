import React from 'react';
import { Gift, Award, CheckCircle2 } from 'lucide-react';
import { SheetStats } from '../types';

interface CollectiveGiftProps {
  stats: SheetStats;
  onOpenContribute: () => void;
}

export function CollectiveGift({ stats, onOpenContribute }: CollectiveGiftProps) {
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN').format(val);
  };

  const percentage = Math.min(100, stats.progressPercent);

  const milestones = [
    { target: 10000, label: 'Grand Floral Bouquets & Sweets', achieved: stats.totalAmount >= 10000 },
    { target: 25000, label: 'Personalized Mementos & Plaque', achieved: stats.totalAmount >= 25000 },
    { target: 50000, label: 'Celebration Lunch & Department Gift', achieved: stats.totalAmount >= 50000 },
  ];

  return (
    <section className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto py-6 relative z-20">
      <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-[#E8E6DF] text-center relative overflow-hidden group">
        {/* Background decorative flower watermark */}
        <div
          className="absolute top-0 right-0 w-36 sm:w-48 h-36 sm:h-48 opacity-10 pointer-events-none float-animation"
          style={{
            backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDXQzI9zOM3J7d4MuspO8eQ6xmVy5E2LGGvehmV7KDpAmBz71vmRDVVuty_vLqRTAeFDPooYYE6VZDtKzirRM1pMLRdaNN2cMHX12lqYPsDt186lcqY6bZa6vTpsylG--18eu3APGaI0LLTTSP4uwopOvA6u1n-WjEyFADA6-zOdl9zP2NDN4A7iQYY19HXWNWWnZ4McWG3i8JCwe52CsO540uhD6WTZckgrAoAEoxdH1BBJzG5UdY')`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
          }}
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E5EADF] text-[#5A6F54] text-xs font-semibold uppercase tracking-wider mb-2">
            <Gift className="w-3.5 h-3.5" />
            <span>Faculty Appreciation Goal</span>
          </div>

          <h3 className="font-serif text-3xl sm:text-4xl text-[#3D3D3D] font-bold mb-2">
            Our Collective Gift
          </h3>

          <p className="text-sm sm:text-base text-[#8C897E] mb-6 font-medium">
            Target Goal: <span className="text-[#3D3D3D] font-bold">₹ {formatCurrency(stats.targetAmount)}</span>
          </p>

          {/* Progress Bar Container */}
          <div className="w-full bg-[#F5F4EF] rounded-full h-5 sm:h-6 mb-3.5 overflow-hidden relative border border-[#E8E6DF] p-0.5">
            <div
              className="bg-gradient-to-r from-[#5A6F54] via-[#D4A373] to-[#5A6F54] h-full rounded-full transition-all duration-1000 ease-out relative overflow-hidden"
              style={{ width: `${Math.max(percentage, 3)}%` }}
            >
              <div className="absolute inset-0 shimmer-effect opacity-75" />
            </div>
          </div>

          {/* Progress Labels */}
          <div className="flex justify-between items-center text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#8C897E] px-1">
            <span className="text-[#3D3D3D] font-bold">
              ₹ {formatCurrency(stats.totalAmount)} Raised
            </span>
            <span className="text-[#5A6F54] font-bold text-sm sm:text-base">
              {stats.progressPercent.toFixed(1)}%
            </span>
          </div>

          {/* Milestones Preview */}
          <div className="mt-8 pt-6 border-t border-[#E8E6DF] grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
            {milestones.map((m, idx) => (
              <div
                key={idx}
                className={`p-3.5 rounded-xl border text-xs transition-all ${
                  m.achieved
                    ? 'bg-[#E5EADF]/60 border-[#5A6F54]/30 text-[#5A6F54]'
                    : 'bg-[#FDFCF8] border-[#E8E6DF] text-[#8C897E]'
                }`}
              >
                <div className="flex items-center gap-1.5 font-bold mb-1">
                  {m.achieved ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#5A6F54] shrink-0" />
                  ) : (
                    <Award className="w-3.5 h-3.5 text-[#D4A373] shrink-0" />
                  )}
                  <span className={m.achieved ? 'text-[#3D3D3D]' : 'text-[#8C897E]'}>₹ {formatCurrency(m.target)}</span>
                </div>
                <p className="line-clamp-2 leading-relaxed opacity-90">{m.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
