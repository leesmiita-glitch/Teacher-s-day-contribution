import React, { useState, useEffect, useCallback } from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { StatsGrid } from './components/StatsGrid';
import { ReceiverBreakdown } from './components/ReceiverBreakdown';
import { CollectiveGift } from './components/CollectiveGift';
import { RecentLove } from './components/RecentLove';
import { HallOfFame } from './components/HallOfFame';
import { WishesWall } from './components/WishesWall';
import { Footer } from './components/Footer';
import { PetalCanvas } from './components/PetalCanvas';
import {
  fetchContributionsFromSheet,
  getLocalContributions,
  computeStats,
} from './services/sheetService';
import { Contribution, SheetStats, ViewTab } from './types';

export default function App() {
  const [sheetData, setSheetData] = useState<Contribution[]>([]);
  const [localData, setLocalData] = useState<Contribution[]>([]);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isFromCache, setIsFromCache] = useState(false);
  const [currentTab, setCurrentTab] = useState<ViewTab>('home');
  const [fetchError, setFetchError] = useState<string | null>(null);

  // Load local contributions from storage if any
  useEffect(() => {
    const saved = getLocalContributions();
    setLocalData(saved);
  }, []);

  // Fetch sheet data
  const loadSheetData = useCallback(async () => {
    setIsRefreshing(true);
    setFetchError(null);
    try {
      const res = await fetchContributionsFromSheet();
      setSheetData(res.contributions);
      setLastUpdated(res.lastUpdated);
      setIsFromCache(res.isFromCache);
      if (res.error && res.contributions.length === 0) {
        setFetchError(res.error);
      }
    } catch (e) {
      console.error('Failed to load sheet data:', e);
      setFetchError('Network error connecting to Google Sheet');
    } finally {
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadSheetData();

    // Auto-refresh sheet data every 60s
    const interval = setInterval(() => {
      loadSheetData();
    }, 60000);

    return () => clearInterval(interval);
  }, [loadSheetData]);

  // Combined list of contributions
  const allContributions = [...localData, ...sheetData];
  const stats: SheetStats = computeStats(sheetData, localData);

  const handleViewContributions = () => {
    if (currentTab === 'home') {
      const el = document.getElementById('recent-love-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else {
        setCurrentTab('contributions');
      }
    } else {
      setCurrentTab('contributions');
    }
  };

  const handleViewReceivers = () => {
    if (currentTab === 'home') {
      const el = document.getElementById('receivers-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      setCurrentTab('home');
      setTimeout(() => {
        const el = document.getElementById('receivers-section');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <div className="bg-[#FDFCF8] text-[#3D3D3D] font-sans antialiased min-h-screen flex flex-col relative overflow-x-hidden">
      {/* Falling Flower Petals Canvas */}
      <PetalCanvas />

      {/* Top Navigation Bar */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        isRefreshing={isRefreshing}
        onRefresh={loadSheetData}
        lastUpdated={lastUpdated}
      />

      {/* Main Content Area */}
      <main className="flex-grow pt-24 pb-16 relative z-10">
        {/* Subtle geometric pattern */}
        <div className="absolute inset-0 geo-pattern opacity-40 z-0 pointer-events-none" />

        {/* Network Error / Offline Notice */}
        {fetchError && (
          <div className="max-w-4xl mx-auto px-4 mb-4 relative z-20">
            <div className="bg-[#FBF4E8] border border-[#D4A373]/50 rounded-2xl p-4 flex items-center justify-between gap-3 text-sm text-[#8B6E4E]">
              <div className="flex items-center gap-2.5">
                <AlertCircle className="w-5 h-5 text-[#D4A373] shrink-0" />
                <span>{fetchError}. Showing cached/local records.</span>
              </div>
              <button
                onClick={loadSheetData}
                disabled={isRefreshing}
                className="px-3.5 py-1.5 rounded-full bg-white border border-[#D4A373]/60 text-xs font-bold text-[#8B6E4E] hover:bg-[#D4A373] hover:text-white transition-colors flex items-center gap-1.5 shadow-sm shrink-0 cursor-pointer disabled:opacity-50"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
                <span>Retry</span>
              </button>
            </div>
          </div>
        )}

        {currentTab === 'home' && (
          <div className="relative z-10 space-y-6">
            <Hero
              onViewContributions={handleViewContributions}
              onViewReceivers={handleViewReceivers}
            />

            <StatsGrid stats={stats} isFromCache={isFromCache} />

            {/* Khushi & Aditya Money Received Section */}
            <ReceiverBreakdown stats={stats} contributions={allContributions} />

            <CollectiveGift stats={stats} />

            <RecentLove contributions={allContributions} />
          </div>
        )}

        {currentTab === 'contributions' && (
          <div className="relative z-10 pt-4">
            <div className="max-w-4xl mx-auto px-4 mb-2 text-center">
              <h2 className="font-serif text-3xl sm:text-4xl text-[#3D3D3D] font-bold italic">
                All <span className="text-[#5A6F54]">Contributions</span>
              </h2>
              <p className="text-sm text-[#8C897E] mt-1">
                Showing live records synced directly from our Google Sheet.
              </p>
            </div>
            <RecentLove contributions={allContributions} />
          </div>
        )}

        {currentTab === 'hall-of-fame' && (
          <div className="relative z-10">
            <HallOfFame contributions={allContributions} stats={stats} />
          </div>
        )}

        {currentTab === 'wishes' && (
          <div className="relative z-10">
            <WishesWall contributions={allContributions} />
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer onSelectTab={setCurrentTab} />
    </div>
  );
}

