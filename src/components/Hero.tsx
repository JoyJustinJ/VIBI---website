import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDownRight, Sparkles } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section
      id="top"
      className="relative flex min-h-[92vh] md:min-h-screen flex-col items-center justify-between overflow-hidden px-4 pt-32 pb-8 md:px-10 isolate"
    >
      {/* Full Background Video */}
      <video
        src="/videos/hero_video.mp4?v=2"
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover -z-20"
      />
      {/* Dark Overlay for Text Readability */}
      <div className="absolute inset-0 bg-black/60 -z-10" />

      {/* Top Banner Tagline */}
      <motion.div
        initial={{ opacity: 0, y: -25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-20 flex items-center gap-2 font-mono text-[10px] sm:text-xs tracking-[.3em] text-white/80 select-none"
      >
        <Sparkles size={13} className="text-accent" />
        <span>DAILY FRESH · EXPLOSIVE TASTE · CRAFTED WITH PASSION</span>
      </motion.div>

      {/* Main Centered Typography */}
      <div className="relative z-20 flex flex-col items-center justify-center my-auto w-full max-w-5xl py-2">
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            type: 'spring',
            damping: 20,
            stiffness: 70,
            delay: 0.2,
            duration: 1.2,
          }}
          className="relative text-center select-none z-10 pointer-events-none"
        >
          <h1 className="font-serif text-[24vw] sm:text-[18vw] md:text-[14vw] lg:text-[12vw] font-bold leading-none tracking-[-0.05em] text-white drop-shadow-[0_25px_60px_rgba(0,0,0,0.95)]">
            Vibi<span className="text-accent drop-shadow-[0_0_35px_var(--color-accent)]">.</span>
          </h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.7 }}
            className="font-mono text-[10px] sm:text-xs md:text-sm tracking-[0.35em] text-white/80 uppercase mt-2"
          >
            Taste That Connects
          </motion.p>
        </motion.div>
      </div>

      {/* Bottom Bar Action */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.7 }}
        className="relative z-20 flex w-full flex-col sm:flex-row items-center justify-center sm:justify-between gap-4 pt-2 select-none"
      >
        <a
          href="#menu"
          className="group flex items-center gap-2.5 font-mono text-xs tracking-widest text-white/90 hover:text-white transition-colors"
        >
          <ArrowDownRight
            className="text-accent transition-transform duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5"
            size={17}
          />
          <span>EXPLORE THE FULL MENU</span>
        </a>

        <div className="hidden sm:flex items-center gap-4 font-mono text-[10px] tracking-[.25em] text-white/60">
          <span>100% FRESH CHICKEN</span>
          <span>·</span>
          <span>FAST & HYGIENIC SERVICE</span>
        </div>
      </motion.div>
    </section>
  );
};
