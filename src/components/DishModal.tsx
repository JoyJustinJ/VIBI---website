import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowLeft } from 'lucide-react';
import type { Dish, SizeOption } from '../types';

interface DishModalProps {
  dish: Dish | null;
  initialSize?: SizeOption;
  onClose: () => void;
}

export const DishModal: React.FC<DishModalProps> = ({
  dish,
  initialSize,
  onClose,
}) => {
  const [selectedSize, setSelectedSize] = useState<SizeOption | undefined>(initialSize);

  useEffect(() => {
    if (dish?.sizes && dish.sizes.length > 0) {
      setSelectedSize(initialSize || dish.sizes[0]);
    } else {
      setSelectedSize(undefined);
    }
  }, [dish, initialSize]);

  // Lock background scroll when modal is open
  useEffect(() => {
    if (dish) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [dish]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!dish) return null;

  const currentPrice = selectedSize ? selectedSize.price : dish.price;
  const currentOriginalPrice = selectedSize?.originalPrice || dish.originalPrice;

  const ingredientPositions = [
    'left-2 top-1/4',
    'right-2 top-1/3',
    'bottom-6 left-1/4',
    'bottom-2 right-1/4',
  ];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 z-50 overflow-y-auto bg-background p-4 sm:p-6 md:p-10 flex items-center justify-center"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close dish preview"
          className="fixed right-4 top-4 sm:right-6 sm:top-6 z-30 rounded-full border border-white/20 p-3.5 sm:p-3 text-white/80 transition-all hover:border-white hover:text-white hover:rotate-90 bg-black/50 backdrop-blur-md"
        >
          <X size={20} />
        </button>

        <div className="mx-auto grid min-h-full max-w-6xl items-center gap-8 py-10 md:grid-cols-2 md:py-0 w-full">
          {/* Dish Image + Floating Badges */}
          <div className="relative flex flex-col sm:flex-row min-h-[300px] sm:min-h-[380px] md:min-h-[480px] items-center justify-center">
            <div className="absolute inset-4 md:inset-8 rounded-full border border-accent/30 animate-pulse pointer-events-none hidden sm:block" />
            <img
              src={dish.image}
              alt={dish.name}
              className="relative h-[220px] sm:h-[340px] md:h-[460px] w-full object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.9)]"
            />

            {dish.ingredients.map((ingredient, idx) => (
              <span
                key={ingredient}
                className={`hidden sm:inline-block absolute rounded-full border border-white/20 bg-black/80 px-3 sm:px-4 py-1.5 font-mono text-[10px] sm:text-xs text-white/90 backdrop-blur-md shadow-lg ${
                  ingredientPositions[idx] || 'top-10 left-10'
                }`}
              >
                {ingredient}
              </span>
            ))}
            
            {/* Mobile Ingredients List */}
            <div className="mt-4 flex sm:hidden flex-wrap justify-center gap-1.5 w-full">
              {dish.ingredients.map((ingredient) => (
                <span key={ingredient} className="rounded-full border border-white/20 bg-black/40 px-3 py-1 font-mono text-[10px] text-white/90">
                  {ingredient}
                </span>
              ))}
            </div>
          </div>

          {/* Dish Info & Price Display */}
          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs tracking-[.3em] text-accent uppercase">
                {dish.itemNumber ? `ITEM NO. ${dish.itemNumber}` : 'FRESH MENU ITEM'}
              </span>
              {dish.badge && (
                <span className="rounded-full bg-accent/20 border border-accent/40 px-2.5 py-0.5 font-mono text-[9px] font-bold text-accent uppercase">
                  {dish.badge}
                </span>
              )}
            </div>

            <h2 className="mt-3 font-serif text-3xl sm:text-5xl md:text-7xl leading-tight text-white">
              {dish.name}
            </h2>

            <p className="mt-4 sm:mt-6 max-w-xl text-sm sm:text-base md:text-lg leading-relaxed text-white/60">
              {dish.description}
            </p>

            {/* Box Size Selector if available */}
            {dish.sizes && dish.sizes.length > 0 && (
              <div className="mt-6">
                <span className="font-mono text-[10px] tracking-widest text-white/40 block mb-2 uppercase">
                  SELECT PORTION / BOX SIZE:
                </span>
                <div className="flex flex-wrap gap-2">
                  {dish.sizes.map((size) => (
                    <button
                      key={size.name}
                      onClick={() => setSelectedSize(size)}
                      className={`rounded-full px-4 py-2 font-mono text-xs tracking-wider transition-all ${
                        selectedSize?.name === size.name
                          ? 'bg-accent text-black font-bold shadow-[0_0_15px_var(--color-accent)]'
                          : 'border border-white/20 bg-black/40 text-white/70 hover:border-white/40 hover:text-white'
                      }`}
                    >
                      {size.name} (₹{size.price})
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Price & Back to Menu Action */}
            <div className="mt-8 flex items-center justify-between border-t border-white/15 pt-6">
              <div className="flex flex-col font-mono">
                {currentOriginalPrice && (
                  <span className="text-xs sm:text-sm text-white/40 line-through">
                    ₹{currentOriginalPrice}
                  </span>
                )}
                <b className="font-serif text-3xl sm:text-4xl text-accent">
                  ₹{currentPrice}
                </b>
              </div>

              <button
                onClick={onClose}
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 sm:px-7 py-3 sm:py-3.5 font-mono text-xs font-bold tracking-widest text-white transition-all hover:bg-white/20 hover:border-white/40 active:scale-95"
              >
                <ArrowLeft size={14} />
                <span>BACK TO MENU</span>
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
