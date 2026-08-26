import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-white/10 px-5 py-16 md:px-10">
      <div className="mx-auto max-w-[1440px]">
        {/* Large Interactive Callout */}
        <a
          href="#menu"
          className="group flex w-full items-center justify-between border-b border-white/20 pb-8 text-left transition-colors hover:border-accent/60 outline-none"
        >
          <span className="font-serif text-5xl md:text-8xl text-white leading-none">
            Freshness in
            <br />
            <i className="italic">every single bite.</i>
          </span>
          <ArrowUpRight className="h-14 w-14 text-accent transition-transform duration-500 group-hover:rotate-45 shrink-0 ml-4" />
        </a>

        {/* Bottom Metadata Bar */}
        <div className="mt-8 flex flex-col justify-between gap-5 font-mono text-[10px] tracking-[.2em] text-white/45 md:flex-row items-center">
          <span>VIBI · DAILY FRESH FRIED CHICKEN</span>
          <a
            href="#top"
            className="text-accent hover:text-white transition-colors uppercase"
          >
            BACK TO TOP ↑
          </a>
          <span>100% FRESH INGREDIENTS · AUDIBLY CRISP</span>
        </div>
      </div>
    </footer>
  );
};
