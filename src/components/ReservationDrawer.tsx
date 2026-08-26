import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import type { ReservationData } from '../types';

interface ReservationDrawerProps {
  open: boolean;
  onClose: () => void;
}

export const ReservationDrawer: React.FC<ReservationDrawerProps> = ({ open, onClose }) => {
  const [formData, setFormData] = useState<ReservationData>({
    guest_name: '',
    phone: '',
    reservation_date: new Date().toISOString().split('T')[0],
    reservation_time: '19:00',
    guest_count: 2,
  });

  const [status, setStatus] = useState<'idle' | 'saving' | 'done'>('idle');

  // Reset state when opening/closing
  useEffect(() => {
    if (!open) {
      const timer = setTimeout(() => setStatus('idle'), 300);
      return () => clearTimeout(timer);
    }
  }, [open]);

  // Lock background scroll
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('saving');

    // Simulate reservation persistence
    await new Promise((resolve) => setTimeout(resolve, 800));

    try {
      const existing = JSON.parse(localStorage.getItem('vibi_reservations') || '[]');
      existing.push({
        ...formData,
        id: 'RES-' + Date.now(),
        createdAt: new Date().toISOString(),
      });
      localStorage.setItem('vibi_reservations', JSON.stringify(existing));
    } catch {
      // ignore storage errors
    }

    setStatus('done');
  };

  const todayStr = new Date().toISOString().split('T')[0];

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.button
            aria-label="Close reservation"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm"
          />

          {/* Slide-over Drawer */}
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="fixed right-0 top-0 z-50 h-full w-full overflow-y-auto bg-[#D1FF00] p-6 text-black md:w-[560px] md:p-12 shadow-2xl flex flex-col justify-between"
          >
            <div>
              {/* Header Close button */}
              <button
                onClick={onClose}
                aria-label="Close reservation modal"
                className="float-right rounded-full border border-black/30 p-3 hover:bg-black/10 transition-colors"
              >
                <X size={20} />
              </button>

              <p className="font-mono text-xs tracking-[.3em] uppercase">
                RESERVATION NEXUS
              </p>

              <h2 className="mt-10 font-serif text-6xl md:text-7xl leading-[.85]">
                Your table
                <br />
                <i className="italic">awaits.</i>
              </h2>

              {status === 'done' ? (
                <div className="mt-20 border-t border-black/30 pt-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
                  <p className="font-serif text-4xl md:text-5xl">
                    Request received.
                  </p>
                  <p className="mt-3 text-lg text-black/80">
                    We’ll confirm your table shortly for <strong>{formData.guest_name}</strong> ({formData.guest_count} guests) on {formData.reservation_date} at {formData.reservation_time}.
                  </p>
                  <button
                    onClick={onClose}
                    className="mt-8 rounded-full bg-black px-8 py-4 font-mono text-xs font-bold tracking-widest text-white hover:bg-black/80 transition-transform active:scale-95"
                  >
                    BACK TO MENU
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-12 space-y-7">
                  {/* Name Input */}
                  <label className="block font-mono text-xs tracking-widest">
                    YOUR NAME
                    <input
                      required
                      type="text"
                      placeholder="e.g. Maya Lin"
                      value={formData.guest_name}
                      onChange={(e) =>
                        setFormData({ ...formData, guest_name: e.target.value })
                      }
                      className="mt-2 w-full border-b border-black/40 bg-transparent py-3 text-xl font-sans outline-none focus:border-black placeholder:text-black/30"
                    />
                  </label>

                  {/* Phone Input */}
                  <label className="block font-mono text-xs tracking-widest">
                    PHONE
                    <input
                      required
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="mt-2 w-full border-b border-black/40 bg-transparent py-3 text-xl font-sans outline-none focus:border-black placeholder:text-black/30"
                    />
                  </label>

                  {/* Date Input */}
                  <label className="block font-mono text-xs tracking-widest">
                    DATE
                    <input
                      required
                      type="date"
                      min={todayStr}
                      value={formData.reservation_date}
                      onChange={(e) =>
                        setFormData({ ...formData, reservation_date: e.target.value })
                      }
                      className="mt-2 w-full border-b border-black/40 bg-transparent py-3 text-xl font-sans outline-none focus:border-black cursor-pointer"
                    />
                  </label>

                  {/* Time & Guests Row */}
                  <div className="grid grid-cols-2 gap-5 pt-2">
                    <label className="font-mono text-xs tracking-widest block">
                      TIME
                      <select
                        value={formData.reservation_time}
                        onChange={(e) =>
                          setFormData({ ...formData, reservation_time: e.target.value })
                        }
                        className="mt-2 w-full rounded-full border border-black/30 bg-transparent p-4 text-base font-sans outline-none focus:border-black cursor-pointer"
                      >
                        <option value="18:30" className="bg-[#D1FF00] text-black">18:30</option>
                        <option value="19:00" className="bg-[#D1FF00] text-black">19:00</option>
                        <option value="20:00" className="bg-[#D1FF00] text-black">20:00</option>
                        <option value="21:00" className="bg-[#D1FF00] text-black">21:00</option>
                      </select>
                    </label>

                    <label className="font-mono text-xs tracking-widest block">
                      GUESTS
                      <input
                        type="number"
                        min="1"
                        max="12"
                        value={formData.guest_count}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            guest_count: Math.max(1, Math.min(12, Number(e.target.value) || 1)),
                          })
                        }
                        className="mt-2 w-full rounded-full border border-black/30 bg-transparent p-4 text-base font-sans outline-none focus:border-black"
                      />
                    </label>
                  </div>

                  {/* Submit CTA */}
                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={status === 'saving'}
                      className="w-full rounded-full bg-black py-5 font-mono text-xs font-bold tracking-[.2em] text-white disabled:opacity-50 hover:bg-black/90 active:scale-[0.99] transition-all shadow-xl"
                    >
                      {status === 'saving' ? 'SAVING YOUR TABLE…' : 'REQUEST THIS TABLE'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};
