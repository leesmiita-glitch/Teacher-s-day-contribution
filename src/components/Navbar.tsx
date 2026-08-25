import React from 'react';
import { RefreshCw } from 'lucide-react';
import { ViewTab } from '../types';

interface NavbarProps {
  currentTab: ViewTab;
  onSelectTab: (tab: ViewTab) => void;
  isRefreshing: boolean;
  onRefresh: () => void;
  lastUpdated: Date | null;
}

export function Navbar({
  currentTab,
  onSelectTab,
  isRefreshing,
  onRefresh,
  lastUpdated,
}: NavbarProps) {
  const handleTabClick = (tab: ViewTab) => {
    onSelectTab(tab);
  };

  return (
    <header className="fixed top-0 left-0 right-0 w-full z-50 bg-white/90 backdrop-blur-md shadow-sm border-b border-[#E8E6DF]">
      <div className="flex justify-between items-center px-4 sm:px-8 lg:px-12 max-w-6xl mx-auto w-full h-20 relative z-50">
        {/* Brand Logo */}
        <div
          onClick={() => handleTabClick('home')}
          className="cursor-pointer flex items-center gap-3 group"
        >
          <div className="w-10 h-10 bg-[#5A6F54] rounded-full flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
            <div className="w-4 h-4 border-2 border-white rounded-sm rotate-45" />
          </div>
          <div>
            <span className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#3D3D3D] transition-colors group-hover:text-[#5A6F54]">
              Teacher's Day
            </span>
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#8C897E] font-semibold leading-none mt-0.5">
              1st Year CSE Collection
            </p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-2 lg:gap-3">
          <button
            onClick={() => handleTabClick('home')}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
              currentTab === 'home'
                ? 'text-[#5A6F54] bg-[#5A6F54]/10 font-semibold'
                : 'text-[#8C897E] hover:text-[#3D3D3D] hover:bg-[#F5F4EF]'
            }`}
          >
            Dashboard
          </button>


        </nav>

        {/* Right Actions: Live Sheet Status & Refresh */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Live G-Sheets Indicator */}
          <div
            onClick={onRefresh}
            title={lastUpdated ? `Live synced at ${lastUpdated.toLocaleTimeString()} (Click to refresh)` : 'Sync with Google Sheet'}
            className="flex px-3.5 py-1.5 bg-[#F5F4EF] hover:bg-[#E5EADF] border border-[#E8E6DF] rounded-full items-center gap-2 cursor-pointer transition-colors"
          >
            <div className={`w-2 h-2 rounded-full ${isRefreshing ? 'bg-[#D4A373] animate-spin' : 'bg-emerald-600 animate-pulse'}`} />
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#5A6F54]">
              {isRefreshing ? 'Syncing...' : 'Live G-Sheets'}
            </span>
            <RefreshCw className={`w-3 h-3 text-[#8C897E] ml-0.5 ${isRefreshing ? 'animate-spin text-[#5A6F54]' : ''}`} />
          </div>
        </div>
      </div>

    </header>
  );
}
