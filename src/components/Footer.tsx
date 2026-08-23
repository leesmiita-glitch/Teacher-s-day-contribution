import React, { useState } from 'react';
import { ExternalLink, Mail, Phone, ShieldCheck, X, Leaf } from 'lucide-react';
import { SHEET_CSV_URL } from '../services/sheetService';
import { ViewTab } from '../types';

interface FooterProps {
  onSelectTab: (tab: ViewTab) => void;
}

export function Footer({ onSelectTab }: FooterProps) {
  const [showContactModal, setShowContactModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);

  return (
    <>
      <footer className="w-full mt-auto border-t border-[#E8E6DF] bg-[#FDFCF8] relative z-20">
        <div className="flex flex-col md:flex-row justify-between items-center py-8 sm:py-10 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto relative z-10 gap-6 md:gap-0">
          {/* Logo */}
          <div
            onClick={() => onSelectTab('home')}
            className="cursor-pointer font-serif text-2xl text-[#3D3D3D] font-bold flex items-center gap-2 italic"
          >
            <span>Teacher's Day</span>
            <Leaf className="w-4 h-4 text-[#5A6F54]" />
          </div>

          {/* Center text */}
          <p className="text-sm text-[#8C897E] text-center font-medium flex items-center gap-1.5 justify-center">
            <span>Made with gratitude by Students</span>
            <span className="text-[#5A6F54]">🌿</span>
          </p>

          {/* Links */}
          <nav className="flex flex-wrap justify-center gap-5 text-xs font-semibold uppercase tracking-wider text-[#8C897E]">
            <button
              onClick={() => setShowContactModal(true)}
              className="hover:text-[#5A6F54] transition-colors cursor-pointer"
            >
              Contact
            </button>
            <button
              onClick={() => setShowPrivacyModal(true)}
              className="hover:text-[#5A6F54] transition-colors cursor-pointer"
            >
              Privacy
            </button>
            <button
              onClick={() => onSelectTab('hall-of-fame')}
              className="hover:text-[#5A6F54] transition-colors cursor-pointer"
            >
              Hall of Fame
            </button>
            <a
              href={SHEET_CSV_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#5A6F54] transition-colors inline-flex items-center gap-1 text-[#D4A373]"
            >
              <span>Live Sheet</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </nav>
        </div>
      </footer>

      {/* Contact Modal */}
      {showContactModal && (
        <div
          onClick={() => setShowContactModal(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#3D3D3D]/40 backdrop-blur-sm p-4 animate-in fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full shadow-2xl relative border border-[#E8E6DF]"
          >
            <button
              onClick={() => setShowContactModal(false)}
              className="absolute top-4 right-4 text-[#8C897E] hover:text-[#3D3D3D] p-1.5 rounded-full bg-[#F5F4EF] cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
            <h4 className="font-serif text-2xl text-[#3D3D3D] font-bold mb-3 italic">
              Student Organizing <span className="text-[#5A6F54]">Committee</span>
            </h4>
            <p className="text-xs text-[#8C897E] mb-4">
              Have questions regarding gifts, celebration schedule, or receipt verification? Reach out to the student coordinators:
            </p>
            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-[#F5F4EF] border border-[#E8E6DF] flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#5A6F54]" />
                <div>
                  <p className="font-semibold text-[#3D3D3D]">General Inquiries</p>
                  <p className="text-[#8C897E]">teachersday.committee@college.edu</p>
                </div>
              </div>
              <div className="p-3 rounded-xl bg-[#F5F4EF] border border-[#E8E6DF] flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#5A6F54]" />
                <div>
                  <p className="font-semibold text-[#3D3D3D]">Student Coordinator Desk</p>
                  <p className="text-[#8C897E]">+91 98765 43210</p>
                </div>
              </div>
            </div>
            <button
              onClick={() => setShowContactModal(false)}
              className="w-full mt-5 py-2.5 rounded-full bg-[#5A6F54] text-white text-xs font-semibold hover:bg-[#475943] transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Privacy Modal */}
      {showPrivacyModal && (
        <div
          onClick={() => setShowPrivacyModal(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#3D3D3D]/40 backdrop-blur-sm p-4 animate-in fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative border border-[#E8E6DF]"
          >
            <button
              onClick={() => setShowPrivacyModal(false)}
              className="absolute top-4 right-4 text-[#8C897E] hover:text-[#3D3D3D] p-1.5 rounded-full bg-[#F5F4EF] cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-2 mb-2">
              <ShieldCheck className="w-5 h-5 text-[#5A6F54]" />
              <h4 className="font-serif text-2xl text-[#3D3D3D] font-bold italic">
                Contribution <span className="text-[#5A6F54]">Transparency</span>
              </h4>
            </div>
            <p className="text-xs text-[#8C897E] leading-relaxed mb-4">
              All contributions made are dedicated 100% towards Teacher's Day celebrations, faculty gifts, greeting plaques, and felicitation events organized by the student body. Data shown is dynamically rendered directly from the published class Google Sheet.
            </p>
            <button
              onClick={() => setShowPrivacyModal(false)}
              className="w-full py-2.5 rounded-full bg-[#5A6F54] text-white text-xs font-semibold hover:bg-[#475943] transition-colors cursor-pointer"
            >
              Understood
            </button>
          </div>
        </div>
      )}
    </>
  );
}
