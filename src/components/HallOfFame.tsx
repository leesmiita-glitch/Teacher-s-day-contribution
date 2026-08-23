import React, { useMemo } from 'react';
import { Trophy, Sparkles, Leaf, CheckCircle2, AlertCircle } from 'lucide-react';
import { Contribution, SheetStats } from '../types';

interface HallOfFameProps {
  contributions: Contribution[];
  stats: SheetStats;
}

export function HallOfFame({ contributions, stats }: HallOfFameProps) {
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN').format(val);
  };

  // Top contributors by amount
  const topContributors = useMemo(() => {
    return [...contributions]
      .sort((a, b) => (b.amount || 0) - (a.amount || 0))
      .slice(0, 10);
  }, [contributions]);

  const cseTotal = stats.totalClassStrength || 52;
  const csePaid = stats.paidStudentsCount || contributions.length;
  const csePercent = stats.participationPercent || Math.min(100, parseFloat(((csePaid / cseTotal) * 100).toFixed(1)));
  const remainingStudents = Math.max(0, cseTotal - csePaid);

  // SVG Circular Gauge calculations
  const circleRadius = 50;
  const circumference = 2 * Math.PI * circleRadius;
  const strokeOffset = circumference - (circumference * Math.min(csePaid / cseTotal, 1));

  const getRankBadge = (index: number) => {
    if (index === 0) {
      return (
        <div className="w-8 h-8 rounded-full bg-[#D4A373] text-white flex items-center justify-center font-bold text-sm shadow-sm shrink-0">
          🥇
        </div>
      );
    }
    if (index === 1) {
      return (
        <div className="w-8 h-8 rounded-full bg-[#C8C6BD] text-[#3D3D3D] flex items-center justify-center font-bold text-sm shadow-sm shrink-0">
          🥈
        </div>
      );
    }
    if (index === 2) {
      return (
        <div className="w-8 h-8 rounded-full bg-[#C89D7C] text-white flex items-center justify-center font-bold text-sm shadow-sm shrink-0">
          🥉
        </div>
      );
    }
    return (
      <div className="w-8 h-8 rounded-full bg-[#F5F4EF] text-[#8C897E] flex items-center justify-center font-bold text-xs shrink-0">
        #{index + 1}
      </div>
    );
  };

  return (
    <section className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto py-10 relative z-20">
      {/* Title */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#E5EADF] text-[#5A6F54] text-xs font-bold uppercase tracking-wider mb-3">
          <Trophy className="w-4 h-4 text-[#D4A373]" />
          <span>1st Year CSE • Hall of Fame</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-5xl text-[#3D3D3D] font-bold italic">
          Honor Roll of <span className="text-[#5A6F54]">Gratitude</span>
        </h2>
        <p className="text-sm sm:text-base text-[#8C897E] mt-2 max-w-md mx-auto">
          Celebrating 1st Year Computer Science & Engineering (52 Students) leading our Teacher's Day tribute.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* 1st Year CSE Students Paid Circle Card */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#E8E6DF] lg:col-span-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#E8E6DF]">
              <span className="font-serif text-base font-bold text-[#3D3D3D]">
                1st Year CSE Batch
              </span>
              <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#E5EADF] text-[#5A6F54]">
                CSE Only
              </span>
            </div>

            {/* Circular Gauge */}
            <div className="flex flex-col items-center justify-center my-4">
              <div className="relative w-36 h-36 flex items-center justify-center">
                <svg className="w-36 h-36 transform -rotate-90" viewBox="0 0 120 120">
                  <circle
                    cx="60"
                    cy="60"
                    r={circleRadius}
                    stroke="#F5F4EF"
                    strokeWidth="10"
                    fill="transparent"
                  />
                  <circle
                    cx="60"
                    cy="60"
                    r={circleRadius}
                    stroke="#5A6F54"
                    strokeWidth="10"
                    fill="transparent"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeOffset}
                    strokeLinecap="round"
                    className="transition-all duration-1000 ease-out"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="font-serif text-2xl font-bold text-[#3D3D3D]">
                    {csePaid}<span className="text-sm font-sans font-normal text-[#8C897E]">/{cseTotal}</span>
                  </span>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#5A6F54]">
                    Paid ({csePercent}%)
                  </span>
                </div>
              </div>

              <p className="text-xs text-[#8C897E] text-center mt-3 font-medium">
                <strong className="text-[#3D3D3D]">{csePaid} of {cseTotal}</strong> students in 1st Year CSE have contributed.
              </p>
            </div>

            {/* Detailed metrics breakdown */}
            <div className="space-y-2.5 pt-2 border-t border-[#E8E6DF] text-xs">
              <div className="flex justify-between items-center text-[#8C897E]">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#5A6F54]" />
                  <span>Paid Students:</span>
                </span>
                <strong className="text-[#5A6F54] font-bold">{csePaid} / {cseTotal}</strong>
              </div>

              <div className="flex justify-between items-center text-[#8C897E]">
                <span className="flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5 text-[#D4A373]" />
                  <span>Pending Students:</span>
                </span>
                <strong className="text-[#3D3D3D] font-bold">{remainingStudents} remaining</strong>
              </div>

              <div className="flex justify-between items-center text-[#8C897E]">
                <span>Total CSE Collection:</span>
                <strong className="text-[#5A6F54] font-bold">₹{formatCurrency(stats.totalAmount)}</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Top Contributors Honor Roll */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#E8E6DF] lg:col-span-2">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#E8E6DF]">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#D4A373]" />
              <h3 className="font-serif text-lg font-bold text-[#3D3D3D]">1st Year CSE Top Contributors</h3>
            </div>
            <span className="text-xs text-[#8C897E] font-semibold uppercase tracking-wider">
              {contributions.length} Contributions
            </span>
          </div>

          {topContributors.length === 0 ? (
            <div className="py-12 text-center text-[#8C897E]">
              <Leaf className="w-8 h-8 mx-auto text-[#5A6F54]/40 mb-2" />
              <p className="font-serif text-base text-[#3D3D3D]">No contributions recorded yet</p>
              <p className="text-xs mt-1">Records will appear live from the Google Sheet.</p>
            </div>
          ) : (
            <div className="space-y-2.5">
              {topContributors.map((c, idx) => (
                <div
                  key={c.id || idx}
                  className="flex items-center justify-between p-3 rounded-2xl bg-[#FDFCF8] hover:bg-[#F5F4EF] border border-[#E8E6DF] transition-all"
                >
                  <div className="flex items-center gap-3 min-w-0 pr-2">
                    {getRankBadge(idx)}
                    <div className="min-w-0">
                      <p className="font-semibold text-sm text-[#3D3D3D] truncate">{c.name}</p>
                      <div className="flex items-center gap-2 text-xs text-[#8C897E]">
                        <span>1st Year • CSE {c.rollNo ? `(Roll: ${c.rollNo})` : ''}</span>
                        {c.receiver && (
                          <span className="text-[10px] text-[#5A6F54] font-medium bg-[#E5EADF] px-1.5 py-0.2 rounded">
                            {c.receiver}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="font-bold text-sm text-[#5A6F54] px-3 py-1 rounded-full bg-[#E5EADF] border border-[#E8E6DF] shrink-0">
                    ₹{formatCurrency(c.amount)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

