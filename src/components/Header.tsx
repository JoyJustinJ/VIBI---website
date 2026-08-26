import React, { useState } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

export const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-[#0F0F0F]/80 backdrop-blur-xl transition-all duration-300 ${
        isOpen ? 'pb-6' : ''
      }`}
    >
      <div className="mx-auto flex h-16 sm:h-20 max-w-[1440px] items-center justify-between px-4 sm:px-6 md:px-10">
        <a
          href="#top"
          className="font-serif text-2xl sm:text-3xl italic tracking-tight text-white transition-opacity hover:opacity-80"
        >
          Vibi<span className="text-[#D1FF00]">.</span>
        </a>

        <div className="flex items-center gap-3">
          <a
            href="#menu"
            className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-4 py-2 font-mono text-[11px] tracking-widest text-white/80 transition-all hover:border-[#D1FF00] hover:text-[#D1FF00]"
          >
            <span>FULL MENU</span>
            <ArrowUpRight size={13} />
          </a>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 font-mono text-[11px] sm:text-xs tracking-[.24em] text-white/80 hover:text-white transition-colors uppercase px-2 py-1"
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={18} /> : <Menu size={18} />} MENU
          </button>
        </div>
      </div>

      {isOpen && (
        <nav className="mx-auto grid max-w-[1440px] gap-2 px-5 text-right font-serif text-4xl uppercase sm:text-6xl md:text-7xl animate-in fade-in slide-in-from-top-4 duration-300">
          <a
            onClick={() => setIsOpen(false)}
            href="#menu"
            className="text-white/80 hover:text-[#D1FF00] transition-colors py-2"
          >
            Explore Menu
          </a>
          <a
            onClick={() => setIsOpen(false)}
            href="#top"
            className="text-white/80 hover:text-[#D1FF00] transition-colors py-2"
          >
            Top ↑
          </a>
        </nav>
      )}
    </header>
  );
};
