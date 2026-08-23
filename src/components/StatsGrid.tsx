import React, { useEffect, useState } from 'react';
import { Leaf, Users, Calendar } from 'lucide-react';
import { SheetStats } from '../types';

interface StatsGridProps {
  stats: SheetStats;
  isFromCache: boolean;
}

export function StatsGrid({ stats, isFromCache }: StatsGridProps) {
  const [displayTotal, setDisplayTotal] = useState(0);
  const [displayToday, setDisplayToday] = useState(0);

  // Animated counter effect
  useEffect(() => {
    let startTimestamp: number | null = null;
    const duration = 1200; // ms
    const startTotal = 0;
    const startToday = 0;
    const targetTotal = stats.totalAmount;
    const targetToday = stats.todayAmount;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // Ease out cubic
      const easeProgress = 1 - Math.pow(1 - progress, 3);

      setDisplayTotal(Math.floor(startTotal + (targetTotal - startTotal) * easeProgress));
      setDisplayToday(Math.floor(startToday + (targetToday - startToday) * easeProgress));

      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setDisplayTotal(targetTotal);
        setDisplayToday(targetToday);
      }
    };

    window.requestAnimationFrame(step);
  }, [stats.totalAmount, stats.todayAmount]);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN').format(val);
  };

  const cseTotal = stats.totalClassStrength || 52;
  const csePaid = stats.paidStudentsCount || 0;
  const csePercent = stats.participationPercent || Math.min(100, parseFloat(((csePaid / cseTotal) * 100).toFixed(1)));
  const circleRadius = 24;
  const circumference = 2 * Math.PI * circleRadius;
  const strokeOffset = circumference - (circumference * Math.min(csePaid / cseTotal, 1));

  return (
    <section className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto py-3 relative z-20 -mt-6 sm:-mt-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {/* Total Collection Card */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#E8E6DF] border-t-4 border-t-[#5A6F54] shadow-sm hover:shadow-md transition-all duration-300 flex items-center justify-between relative overflow-hidden group">
          <div className="absolute inset-x-0 top-0 h-[2px] shimmer-effect opacity-70" />
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8C897E] mb-1.5 transition-colors group-hover:text-[#5A6F54]">
              Total Collection
            </p>
            <p className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#5A6F54] tracking-tight">
              ₹ {formatCurrency(displayTotal)}
            </p>
            <p className="text-xs text-[#8C897E] mt-1 flex items-center gap-1.5 font-medium">
              <Users className="w-3.5 h-3.5 text-[#5A6F54]" />
              <span><strong className="text-[#3D3D3D]">{stats.totalContributors}</strong> Contributions</span>
            </p>
          </div>

          <div className="w-12 h-12 rounded-2xl bg-[#E5EADF] text-[#5A6F54] flex items-center justify-center group-hover:scale-105 transition-transform duration-300 shrink-0">
            <Leaf className="w-6 h-6" />
          </div>
        </div>

        {/* 1st Year CSE Students Paid Circle Card */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#E8E6DF] border-t-4 border-t-[#5A6F54] shadow-sm hover:shadow-md transition-all duration-300 flex items-center justify-between relative overflow-hidden group">
          <div className="absolute inset-x-0 top-0 h-[2px] shimmer-effect opacity-70" />
          <div>
            <div className="flex items-center gap-1.5 mb-1.5">
              <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#5A6F54] bg-[#E5EADF] px-2 py-0.5 rounded-full">
                1st Year CSE
              </span>
            </div>
            <p className="font-serif text-2xl sm:text-3xl font-bold text-[#3D3D3D] tracking-tight">
              {csePaid} <span className="text-sm font-sans font-normal text-[#8C897E]">/ {cseTotal}</span>
            </p>
            <p className="text-xs text-[#8C897E] mt-1 font-medium">
              <strong className="text-[#5A6F54]">{csePercent}%</strong> of batch contributed
            </p>
          </div>

          {/* Circular Progress Gauge */}
          <div className="relative w-14 h-14 shrink-0 flex items-center justify-center">
            <svg className="w-14 h-14 transform -rotate-90" viewBox="0 0 60 60">
              <circle
                cx="30"
                cy="30"
                r={circleRadius}
                stroke="#E8E6DF"
                strokeWidth="5"
                fill="transparent"
              />
              <circle
                cx="30"
                cy="30"
                r={circleRadius}
                stroke="#5A6F54"
                strokeWidth="5"
                fill="transparent"
                strokeDasharray={circumference}
                strokeDashoffset={strokeOffset}
                strokeLinecap="round"
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            <span className="absolute text-[11px] font-bold text-[#5A6F54]">
              {Math.round(csePercent)}%
            </span>
          </div>
        </div>

        {/* Today's Collection Card */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#E8E6DF] border-t-4 border-t-[#D4A373] shadow-sm hover:shadow-md transition-all duration-300 flex items-center justify-between relative overflow-hidden group sm:col-span-2 lg:col-span-1">
          <div className="absolute inset-x-0 top-0 h-[2px] shimmer-effect opacity-70" />
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8C897E] mb-1.5 transition-colors group-hover:text-[#8B6E4E]">
              Today's Collection
            </p>
            <p className="font-serif text-2xl sm:text-3xl font-bold text-[#8B6E4E] tracking-tight">
              ₹ {formatCurrency(displayToday)}
            </p>
            <p className="text-xs text-[#8C897E] mt-1 flex items-center gap-1.5 font-medium">
              <Calendar className="w-3.5 h-3.5 text-[#D4A373]" />
              <span>Latest: <strong className="text-[#3D3D3D]">{stats.latestDate}</strong></span>
            </p>
          </div>

          <div className="w-12 h-12 rounded-2xl bg-[#F5E6DA] text-[#D4A373] flex items-center justify-center group-hover:scale-105 transition-transform duration-300 shrink-0">
            <span className="text-xl">🌱</span>
          </div>
        </div>
      </div>
    </section>
  );
}
