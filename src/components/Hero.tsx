import React, { useRef } from 'react';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import { ArrowDownRight, Sparkles } from 'lucide-react';
import { TransparentVideo } from './TransparentVideo';

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { amount: 0.25 });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 45, damping: 20 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    mouseX.set(((clientX / innerWidth) - 0.5) * 24);
    mouseY.set(((clientY / innerHeight) - 0.5) * 24);
  };

  return (
    <section
      id="top"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative flex min-h-[92vh] md:min-h-screen flex-col items-center justify-between overflow-hidden px-4 pt-24 pb-8 md:px-10"
    >
      {/* Background Animated Rings and Ambient Glow */}
      <div className="orbital absolute left-1/2 top-1/2 h-[75vw] max-h-[840px] w-[75vw] max-w-[840px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 pointer-events-none" />
      <div className="absolute left-1/2 top-1/2 h-[54vw] max-h-[580px] w-[54vw] max-w-[580px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#D1FF00]/15 pointer-events-none" />
      <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#D1FF00]/12 blur-[160px] pointer-events-none" />

      {/* Floating Sparks */}
      {[
        { id: 1, top: '22%', left: '24%', size: 4, delay: 0 },
        { id: 2, top: '35%', left: '78%', size: 3, delay: 0.7 },
        { id: 3, top: '68%', left: '16%', size: 5, delay: 1.2 },
        { id: 4, top: '75%', left: '84%', size: 4, delay: 1.8 },
      ].map((p) => (
        <motion.div
          key={p.id}
          animate={{
            y: [0, -16, 0],
            opacity: [0.3, 0.9, 0.3],
            scale: [1, 1.25, 1],
          }}
          transition={{
            duration: 3.5 + p.id,
            repeat: Infinity,
            delay: p.delay,
            ease: 'easeInOut',
          }}
          style={{
            top: p.top,
            left: p.left,
            width: p.size,
            height: p.size,
          }}
          className="absolute rounded-full bg-[#D1FF00] pointer-events-none shadow-[0_0_10px_#D1FF00]"
        />
      ))}

      {/* Top Banner Tagline */}
      <motion.div
        initial={{ opacity: 0, y: -25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-20 flex items-center gap-2 font-mono text-[10px] sm:text-xs tracking-[.3em] text-white/50 select-none"
      >
        <Sparkles size={13} className="text-[#D1FF00]" />
        <span>DAILY FRESH · EXPLOSIVE TASTE · CRAFTED WITH PASSION</span>
      </motion.div>

      {/* Main Centered Stage: VIBI Typography + True Transparent Video */}
      <div className="relative z-10 flex flex-col items-center justify-center my-auto w-full max-w-5xl py-2">
        {/* Descending VIBI Typography */}
        <motion.div
          initial={{ opacity: 0, y: -160, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            type: 'spring',
            damping: 18,
            stiffness: 70,
            delay: 0.1,
            duration: 1.2,
          }}
          className="relative text-center select-none z-10 pointer-events-none mb-[-4vw] sm:mb-[-3vw] md:mb-[-2.5vw]"
        >
          <h1 className="font-serif text-[24vw] sm:text-[18vw] md:text-[14vw] lg:text-[12vw] font-bold leading-none tracking-[-0.05em] text-white drop-shadow-[0_25px_60px_rgba(0,0,0,0.95)]">
            Vibi<span className="text-[#D1FF00] drop-shadow-[0_0_35px_rgba(209,255,0,0.95)]">.</span>
          </h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.7 }}
            className="font-mono text-[10px] sm:text-xs md:text-sm tracking-[0.35em] text-white/65 uppercase mt-[-8px]"
          >
            Taste That Connects
          </motion.p>
        </motion.div>

        {/* 100% Transparent Video with Hardware Acceleration & Smooth Parallax */}
        <motion.div
          style={{ x, y }}
          className="relative flex items-center justify-center w-full z-20"
        >
          <div className="relative w-[310px] sm:w-[420px] md:w-[540px] lg:w-[620px] h-[360px] sm:h-[480px] md:h-[580px] flex items-center justify-center">
            <TransparentVideo
              srcMp4="/videos/hero_burger_drop.mp4"
              srcWebm="/videos/hero_burger_drop.webm"
              isInView={isInView}
              className="w-full h-full"
            />

            {/* Glowing Aura Ring Underneath */}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-10 bg-[#D1FF00]/25 rounded-full blur-2xl pointer-events-none" />
          </div>
        </motion.div>
      </div>

      {/* Bottom Bar Action */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.7 }}
        className="relative z-20 flex w-full items-center justify-between pt-2 select-none"
      >
        <a
          href="#menu"
          className="group flex items-center gap-2.5 font-mono text-xs tracking-widest text-white/80 hover:text-white transition-colors"
        >
          <ArrowDownRight
            className="text-[#D1FF00] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5"
            size={17}
          />
          <span>EXPLORE THE FULL MENU</span>
        </a>

        <div className="hidden sm:flex items-center gap-4 font-mono text-[10px] tracking-[.25em] text-white/40">
          <span>100% FRESH CHICKEN</span>
          <span>·</span>
          <span>FAST & HYGIENIC SERVICE</span>
        </div>
      </motion.div>
    </section>
  );
};
