import React from 'react';
import { Github, Linkedin, Mail, Leaf } from 'lucide-react';
import { ViewTab } from '../types';

interface FooterProps {
  onSelectTab: (tab: ViewTab) => void;
}

export function Footer({ onSelectTab }: FooterProps) {
  return (
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
          <span>Made  by Jaysmita</span>
          <span className="text-[#5A6F54]">🌿</span>
        </p>

        {/* Social Links */}
        <nav className="flex flex-wrap justify-center gap-6 text-[#8C897E]">
          <a
            href="https://www.linkedin.com/in/jaysmita-das-803a6b385"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#5A6F54] transition-colors cursor-pointer"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-5 h-5" />
          </a>
          <a
            href="https://github.com/leesmiita-glitch"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#5A6F54] transition-colors cursor-pointer"
            aria-label="GitHub"
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            href="mailto:lee.smiita@gmail.com"
            className="hover:text-[#5A6F54] transition-colors cursor-pointer"
            aria-label="Email"
          >
            <Mail className="w-5 h-5" />
          </a>
        </nav>
      </div>
    </footer>
  );
}
