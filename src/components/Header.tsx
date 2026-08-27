import React, { useState } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { CATEGORIES } from '../data/menu';

export const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-background/80 backdrop-blur-xl transition-all duration-300 ${
        isOpen ? 'pb-6' : ''
      }`}
    >
      <div className="mx-auto flex h-16 sm:h-20 max-w-[1440px] items-center justify-between px-4 sm:px-6 md:px-10">
        <a
          href="#top"
          className="flex items-center transition-opacity hover:opacity-80"
        >
          <img src="/logo.png" alt="Vibi Logo" className="h-12 w-12 sm:h-14 sm:w-14 object-contain rounded-full mix-blend-lighten" />
        </a>

        <div className="flex items-center gap-3">
          <a
            href="#menu"
            className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-4 py-2 font-mono text-[11px] tracking-widest text-white/80 transition-all hover:border-accent hover:text-accent"
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
        <nav className="mx-auto flex flex-col max-w-[1440px] gap-2 sm:gap-4 px-5 text-right font-serif text-3xl uppercase sm:text-5xl md:text-6xl animate-in fade-in slide-in-from-top-4 duration-300 overflow-y-auto max-h-[80vh] pb-8">
          {CATEGORIES.map((cat) => (
            <a
              key={cat.id}
              onClick={() => setIsOpen(false)}
              href={`#cat-${cat.id}`}
              className="text-white/80 hover:text-accent transition-colors py-1.5 sm:py-2"
            >
              {cat.label}
            </a>
          ))}
          <a
            onClick={() => setIsOpen(false)}
            href="#top"
            className="text-white/40 hover:text-accent transition-colors py-2 mt-2 sm:mt-4 text-xl sm:text-3xl"
          >
            Top ↑
          </a>
        </nav>
      )}
    </header>
  );
};
