import React, { useEffect, useState } from 'react';
import { Users, ShieldCheck, CheckCircle2, Award, ArrowUpRight } from 'lucide-react';
import { SheetStats, Contribution } from '../types';

interface ReceiverBreakdownProps {
  stats: SheetStats;
  contributions: Contribution[];
  onSelectContribution?: (contribution: Contribution) => void;
}

export function ReceiverBreakdown({ stats, contributions, onSelectContribution }: ReceiverBreakdownProps) {
  const [khushiDisplay, setKhushiDisplay] = useState(0);
  const [adityaDisplay, setAdityaDisplay] = useState(0);

  const khushiStats = stats.receiverBreakdown?.khushi || {
    name: 'Khushi',
    displayName: 'Khushi',
    totalAmount: 0,
    count: 0,
    percentage: 0,
    recentContributions: [],
  };

  const adityaStats = stats.receiverBreakdown?.aditya || {
    name: 'Aditya',
    displayName: 'Aditya',
    totalAmount: 0,
    count: 0,
    percentage: 0,
    recentContributions: [],
  };

  // Filter contributions by receiver
  const khushiList = contributions.filter(
    (c) => (c.receiver || '').toLowerCase() === 'khushi'
  );
  const adityaList = contributions.filter(
    (c) => (c.receiver || '').toLowerCase() === 'aditya'
  );

  // Animated counters
  useEffect(() => {
    let startTimestamp: number | null = null;
    const duration = 1000;
    const targetKhushi = khushiStats.totalAmount;
    const targetAditya = adityaStats.totalAmount;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3);

      setKhushiDisplay(Math.floor(targetKhushi * easeProgress));
      setAdityaDisplay(Math.floor(targetAditya * easeProgress));

      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setKhushiDisplay(targetKhushi);
        setAdityaDisplay(targetAditya);
      }
    };

    window.requestAnimationFrame(step);
  }, [khushiStats.totalAmount, adityaStats.totalAmount]);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN').format(val);
  };

  const totalCollected = stats.totalAmount || 0;
  const khushiPercent = totalCollected > 0 ? (khushiStats.totalAmount / totalCollected) * 100 : 0;
  const adityaPercent = totalCollected > 0 ? (adityaStats.totalAmount / totalCollected) * 100 : 0;

  return (
    <section className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto py-8 relative z-20" id="receivers-section">
      {/* Header Tag and Title */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#E5EADF] text-[#5A6F54] text-xs font-bold uppercase tracking-wider mb-2.5 shadow-sm">
          <ShieldCheck className="w-3.5 h-3.5 text-[#5A6F54]" />
          <span>Verified Student Coordinators</span>
        </div>
        <h3 className="font-serif text-3xl sm:text-4xl text-[#3D3D3D] font-bold italic tracking-tight">
          Money Received <span className="text-[#5A6F54]">Breakdown</span>
        </h3>
        <p className="text-sm text-[#8C897E] mt-1.5 max-w-md mx-auto">
          Total contributions collected by <strong className="text-[#3D3D3D]">Khushi</strong> and{' '}
          <strong className="text-[#3D3D3D]">Aditya</strong> for our Teacher's Day celebration.
        </p>
      </div>

      {/* Main 2-Column Coordinator Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 mb-6">
        {/* Khushi's Collection Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E8E6DF] border-t-4 border-t-[#5A6F54] shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden flex flex-col justify-between group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#5A6F54]/5 rounded-bl-full pointer-events-none -mr-4 -mt-4 transition-transform group-hover:scale-110" />

          <div>
            {/* Top Coordinator Badge */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#E5EADF] text-[#5A6F54] flex items-center justify-center font-serif font-bold text-xl shadow-inner">
                  K
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="font-serif text-xl font-bold text-[#3D3D3D]">Khushi</h4>
                    <CheckCircle2 className="w-4 h-4 text-[#5A6F54]" />
                  </div>
                  <p className="text-xs text-[#8C897E] font-medium">Batch Coordinator</p>
                </div>
              </div>

              <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-[#E5EADF] text-[#5A6F54] border border-[#5A6F54]/20">
                {khushiPercent.toFixed(0)}% Share
              </span>
            </div>

            {/* Total Amount Received Display */}
            <div className="my-5 p-4 rounded-2xl bg-[#FDFCF8] border border-[#E8E6DF] flex items-center justify-between">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-[#8C897E] mb-0.5">
                  Total Money Received
                </p>
                <p className="font-serif text-3xl sm:text-4xl font-bold text-[#5A6F54] tracking-tight">
                  ₹ {formatCurrency(khushiDisplay)}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs font-semibold text-[#3D3D3D] flex items-center gap-1 justify-end">
                  <Users className="w-3.5 h-3.5 text-[#5A6F54]" />
                  <span>{khushiStats.count} Students</span>
                </p>
                <p className="text-[11px] text-[#8C897E] mt-0.5">Verified in Sheet</p>
              </div>
            </div>

            {/* Recent Contributions List by Khushi */}
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[#8C897E] mb-2 flex items-center gap-1">
                <span>Recent Records by Khushi</span>
              </p>
              {khushiList.length === 0 ? (
                <p className="text-xs text-[#8C897E] italic py-2">No records assigned yet</p>
              ) : (
                <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                  {khushiList.map((item, idx) => (
                    <div
                      key={item.id || idx}
                      className="flex items-center justify-between p-2.5 rounded-xl bg-[#F5F4EF]/70 hover:bg-[#E5EADF]/50 transition-colors text-xs border border-[#E8E6DF]/60"
                    >
                      <div className="min-w-0 pr-2">
                        <p className="font-semibold text-[#3D3D3D] truncate">{item.name}</p>
                        <p className="text-[10px] text-[#8C897E]">{item.date}</p>
                      </div>
                      <span className="font-bold text-[#5A6F54] shrink-0 bg-white px-2.5 py-0.5 rounded-lg border border-[#E8E6DF] shadow-2xs">
                        ₹{formatCurrency(item.amount)}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Aditya's Collection Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E8E6DF] border-t-4 border-t-[#D4A373] shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden flex flex-col justify-between group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4A373]/5 rounded-bl-full pointer-events-none -mr-4 -mt-4 transition-transform group-hover:scale-110" />

          <div>
            {/* Top Coordinator Badge */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#F5E6DA] text-[#8B6E4E] flex items-center justify-center font-serif font-bold text-xl shadow-inner">
                  A
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="font-serif text-xl font-bold text-[#3D3D3D]">Aditya</h4>
                    <CheckCircle2 className="w-4 h-4 text-[#D4A373]" />
                  </div>
                  <p className="text-xs text-[#8C897E] font-medium">Batch Coordinator</p>
                </div>
              </div>

              <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-[#F5E6DA] text-[#8B6E4E] border border-[#D4A373]/30">
                {adityaPercent.toFixed(0)}% Share
              </span>
            </div>

            {/* Total Amount Received Display */}
            <div className="my-5 p-4 rounded-2xl bg-[#FDFCF8] border border-[#E8E6DF] flex items-center justify-between">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-[#8C897E] mb-0.5">
                  Total Money Received
                </p>
                <p className="font-serif text-3xl sm:text-4xl font-bold text-[#8B6E4E] tracking-tight">
                  ₹ {formatCurrency(adityaDisplay)}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs font-semibold text-[#3D3D3D] flex items-center gap-1 justify-end">
                  <Users className="w-3.5 h-3.5 text-[#D4A373]" />
                  <span>{adityaStats.count} Students</span>
                </p>
                <p className="text-[11px] text-[#8C897E] mt-0.5">Verified in Sheet</p>
              </div>
            </div>

            {/* Recent Contributions List by Aditya */}
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[#8C897E] mb-2 flex items-center gap-1">
                <span>Recent Records by Aditya</span>
              </p>
              {adityaList.length === 0 ? (
                <p className="text-xs text-[#8C897E] italic py-2">No records assigned yet</p>
              ) : (
                <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                  {adityaList.map((item, idx) => (
                    <div
                      key={item.id || idx}
                      className="flex items-center justify-between p-2.5 rounded-xl bg-[#F5F4EF]/70 hover:bg-[#F5E6DA]/50 transition-colors text-xs border border-[#E8E6DF]/60"
                    >
                      <div className="min-w-0 pr-2">
                        <p className="font-semibold text-[#3D3D3D] truncate">{item.name}</p>
                        <p className="text-[10px] text-[#8C897E]">{item.date}</p>
                      </div>
                      <span className="font-bold text-[#8B6E4E] shrink-0 bg-white px-2.5 py-0.5 rounded-lg border border-[#E8E6DF] shadow-2xs">
                        ₹{formatCurrency(item.amount)}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Visual Balance Split Bar */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#E8E6DF] shadow-sm">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-3">
          <div>
            <h5 className="font-serif font-bold text-base text-[#3D3D3D]">
              Collection Distribution Ratio
            </h5>
            <p className="text-xs text-[#8C897E]">
              Comparative split of ₹{formatCurrency(totalCollected)} collected across coordinators
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs font-semibold">
            <span className="flex items-center gap-1.5 text-[#5A6F54]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#5A6F54]" />
              Khushi: ₹{formatCurrency(khushiStats.totalAmount)} ({khushiPercent.toFixed(1)}%)
            </span>
            <span className="flex items-center gap-1.5 text-[#8B6E4E]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#D4A373]" />
              Aditya: ₹{formatCurrency(adityaStats.totalAmount)} ({adityaPercent.toFixed(1)}%)
            </span>
          </div>
        </div>

        {/* Dual Progress Bar */}
        <div className="w-full bg-[#F5F4EF] rounded-full h-4 overflow-hidden flex p-0.5 border border-[#E8E6DF]">
          <div
            className="bg-[#5A6F54] h-full rounded-l-full transition-all duration-1000 ease-out"
            style={{ width: `${Math.max(khushiPercent, totalCollected > 0 ? 3 : 50)}%` }}
            title={`Khushi: ₹${formatCurrency(khushiStats.totalAmount)}`}
          />
          <div
            className="bg-[#D4A373] h-full rounded-r-full transition-all duration-1000 ease-out"
            style={{ width: `${Math.max(adityaPercent, totalCollected > 0 ? 3 : 50)}%` }}
            title={`Aditya: ₹${formatCurrency(adityaStats.totalAmount)}`}
          />
        </div>
      </div>
    </section>
  );
}
