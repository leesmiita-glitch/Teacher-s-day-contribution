import React, { useState, useMemo } from 'react';
import { Search, MessageSquareHeart, X, CheckCircle2 } from 'lucide-react';
import { Contribution } from '../types';

interface RecentLoveProps {
  contributions: Contribution[];
}

export function RecentLove({ contributions }: RecentLoveProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedContribution, setSelectedContribution] = useState<Contribution | null>(null);

  // Filter contributions by search query
  const filtered = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return contributions;
    return contributions.filter((item) => {
      return (
        item.name.toLowerCase().includes(q) ||
        (item.rollNo && item.rollNo.toLowerCase().includes(q)) ||
        (item.receiver && item.receiver.toLowerCase().includes(q)) ||
        (item.quote && item.quote.toLowerCase().includes(q))
      );
    });
  }, [contributions, searchQuery]);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN').format(val);
  };

  const getInitial = (name: string) => {
    if (!name) return 'S';
    return name.trim().charAt(0).toUpperCase();
  };

  const getReceiverBadgeStyle = (receiver?: string) => {
    const r = (receiver || '').toLowerCase();
    if (r === 'khushi') {
      return 'bg-[#E5EADF] text-[#5A6F54] border-[#5A6F54]/30';
    }
    if (r === 'aditya') {
      return 'bg-[#F5E6DA] text-[#8B6E4E] border-[#D4A373]/40';
    }
    return 'bg-[#F5F4EF] text-[#8C897E] border-[#E8E6DF]';
  };

  return (
    <section className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto py-10 relative z-20" id="recent-love-section">
      {/* Title with Earth/Sage Lines */}
      <div className="flex items-center justify-center gap-4 mb-8">
        <div className="h-[1px] w-12 sm:w-16 bg-[#D4A373]/60" />
        <h3 className="font-serif text-3xl sm:text-4xl text-[#3D3D3D] text-center italic font-bold tracking-tight">
          Recent <span className="text-[#5A6F54]">Love</span>
        </h3>
        <div className="h-[1px] w-12 sm:w-16 bg-[#D4A373]/60" />
      </div>

      {/* Search & Batch Tag Bar */}
      <div className="mb-6 flex flex-col sm:flex-row gap-3 items-center justify-between">
        {/* Search */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-[#8C897E] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search student, roll, or coordinator..."
            className="w-full pl-9 pr-4 py-2.5 rounded-full border border-[#E8E6DF] bg-white focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#5A6F54]/30 text-sm transition-all shadow-sm text-[#3D3D3D]"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#8C897E] hover:text-[#5A6F54] cursor-pointer"
            >
              Clear
            </button>
          )}
        </div>

        {/* 1st Year CSE Batch Tag */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <span className="px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[#E5EADF] text-[#5A6F54] border border-[#E8E6DF]">
            1st Year CSE (52 Students)
          </span>
        </div>
      </div>

      {/* Contributions List */}
      <div className="space-y-3.5">
        {filtered.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 text-center text-[#8C897E] border border-[#E8E6DF]">
            <MessageSquareHeart className="w-10 h-10 mx-auto text-[#5A6F54]/40 mb-3" />
            <p className="font-serif text-lg text-[#3D3D3D]">No contributions found</p>
            <p className="text-sm mt-1">
              {searchQuery ? 'Try a different search term.' : 'Records will appear as synced from the Google Sheet.'}
            </p>
          </div>
        ) : (
          filtered.map((item, index) => (
            <div
              key={item.id || index}
              onClick={() => setSelectedContribution(item)}
              className="bg-white p-4 sm:p-5 rounded-2xl shadow-sm hover:shadow-md flex justify-between items-center hover:-translate-y-0.5 transition-all duration-300 border border-[#E8E6DF] hover:border-[#D4A373] group cursor-pointer"
            >
              <div className="flex items-center gap-3.5 sm:gap-4 min-w-0 pr-3">
                {/* Initial Avatar */}
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-[#E5EADF] flex items-center justify-center text-[#5A6F54] font-bold text-sm sm:text-base shrink-0 group-hover:scale-105 transition-transform">
                  {getInitial(item.name)}
                </div>

                {/* Name, Roll & Receiver Badge */}
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-semibold text-sm sm:text-base text-[#3D3D3D] group-hover:text-[#5A6F54] transition-colors truncate">
                      {item.name}
                    </p>
                    <span className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-[#F5F4EF] text-[#8C897E] border border-[#E8E6DF]/60">
                      1st Year • CSE {item.rollNo ? `(Roll: ${item.rollNo})` : ''}
                    </span>
                    {item.receiver && item.receiver !== 'Unassigned' && (
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border flex items-center gap-1 ${getReceiverBadgeStyle(
                          item.receiver
                        )}`}
                      >
                        <CheckCircle2 className="w-2.5 h-2.5" />
                        <span>Recv: {item.receiver}</span>
                      </span>
                    )}
                    {item.isLocal && (
                      <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-[#E5EADF] text-[#5A6F54]">
                        Local
                      </span>
                    )}
                  </div>
                  <p className="text-xs sm:text-sm text-[#8C897E] italic mt-0.5 line-clamp-1 group-hover:text-[#3D3D3D] transition-colors">
                    "{item.quote || 'Thank you for your guidance!'}"
                  </p>
                </div>
              </div>

              {/* Amount Pill */}
              <div className="shrink-0 font-semibold text-xs sm:text-sm text-[#5A6F54] bg-[#F5F4EF] px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full border border-[#E8E6DF] group-hover:bg-[#5A6F54] group-hover:text-white transition-colors duration-300">
                ₹{formatCurrency(item.amount)}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Message Detail Modal when a card is clicked */}
      {selectedContribution && (
        <div
          onClick={() => setSelectedContribution(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#3D3D3D]/40 backdrop-blur-sm p-4 animate-in fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-xl relative border border-[#E8E6DF] animate-in zoom-in-95 duration-200"
          >
            <button
              onClick={() => setSelectedContribution(null)}
              className="absolute right-4 top-4 text-[#8C897E] hover:text-[#3D3D3D] p-1.5 rounded-full bg-[#F5F4EF] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-[#E5EADF] flex items-center justify-center text-[#5A6F54] font-bold text-lg">
                {getInitial(selectedContribution.name)}
              </div>
              <div>
                <h4 className="font-serif text-xl font-bold text-[#3D3D3D]">
                  {selectedContribution.name}
                </h4>
                <p className="text-xs text-[#8C897E]">
                  1st Year • CSE {selectedContribution.rollNo ? `(Roll: ${selectedContribution.rollNo})` : ''} • Date:{' '}
                  {selectedContribution.date}
                </p>
                {selectedContribution.receiver && (
                  <p className="text-xs font-semibold text-[#5A6F54] mt-0.5">
                    Received & Confirmed by: {selectedContribution.receiver}
                  </p>
                )}
              </div>
            </div>

            <div className="my-5 p-4 rounded-2xl bg-[#F5F4EF] border border-[#E8E6DF]">
              <p className="font-serif italic text-base sm:text-lg text-[#3D3D3D] leading-relaxed">
                "{selectedContribution.quote || 'Thank you teachers for your guidance!'}"
              </p>
            </div>

            <div className="flex justify-between items-center pt-2">
              <div className="text-xs font-semibold uppercase tracking-wider text-[#8C897E]">
                Contribution:{' '}
                <span className="text-[#5A6F54] font-bold text-base">
                  ₹{formatCurrency(selectedContribution.amount)}
                </span>
              </div>
              <button
                onClick={() => setSelectedContribution(null)}
                className="px-5 py-2 rounded-full bg-[#5A6F54] text-white text-xs font-semibold hover:bg-[#475943] transition-all cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

