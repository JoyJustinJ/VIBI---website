import React, { useState } from 'react';
import { motion } from 'framer-motion';
import type { Dish, SizeOption } from '../types';

interface DishCardProps {
  dish: Dish;
  index: number;
  onOpen: (dish: Dish, activeSize?: SizeOption) => void;
}

export const DishCard: React.FC<DishCardProps> = ({ dish, index, onOpen }) => {
  const [selectedSize, setSelectedSize] = useState<SizeOption | undefined>(
    dish.sizes && dish.sizes.length > 0 ? dish.sizes[0] : undefined
  );

  const currentPrice = selectedSize ? selectedSize.price : dish.price;
  const currentOriginalPrice = selectedSize?.originalPrice || dish.originalPrice;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ delay: (index % 4) * 0.04, duration: 0.35 }}
      className="group relative flex flex-col justify-between h-full overflow-hidden rounded-xl border border-white/10 bg-black/40 p-3 sm:p-4 md:p-5 text-left transition-all duration-300 hover:border-[#D1FF00]/60 hover:bg-black/60 shadow-lg"
    >
      <div>
        {/* Top Header: Price & Badge */}
        <div className="flex items-center justify-between gap-1 mb-2">
          <div className="flex items-baseline gap-1.5 font-mono">
            {currentOriginalPrice && (
              <span className="text-[10px] sm:text-xs text-white/35 line-through">
                ₹{currentOriginalPrice}
              </span>
            )}
            <span className="text-xs sm:text-sm md:text-base font-bold text-[#D1FF00]">
              ₹{currentPrice}
            </span>
          </div>

          {dish.badge && (
            <span className="rounded-full bg-[#D1FF00]/15 border border-[#D1FF00]/30 px-1.5 sm:px-2 py-0.5 font-mono text-[7.5px] sm:text-[9px] font-bold tracking-wider text-[#D1FF00] uppercase truncate max-w-[90px] sm:max-w-[120px]">
              {dish.badge}
            </span>
          )}
        </div>

        {/* Dish Image */}
        <button
          onClick={() => onOpen(dish, selectedSize)}
          className="relative my-1 sm:my-2 flex h-28 sm:h-36 md:h-44 w-full items-center justify-center overflow-hidden cursor-pointer outline-none"
        >
          <div className="orbital-mini absolute h-24 sm:h-32 md:h-40 w-24 sm:w-32 md:w-40 rounded-full border border-white/10" />
          <img
            src={dish.image}
            alt={dish.name}
            className="relative h-full w-full object-contain transition-transform duration-500 group-hover:scale-105 group-hover:-rotate-1"
            loading="lazy"
          />
        </button>

        {/* Title and Description */}
        <div className="mt-2">
          {dish.itemNumber && (
            <span className="font-mono text-[8px] sm:text-[9px] text-[#D1FF00]/70 tracking-widest block mb-0.5 uppercase">
              NO. {dish.itemNumber}
            </span>
          )}
          <h3
            onClick={() => onOpen(dish, selectedSize)}
            className="font-serif text-sm sm:text-base md:text-xl font-medium leading-snug text-white group-hover:text-[#D1FF00] transition-colors cursor-pointer line-clamp-2"
          >
            {dish.name}
          </h3>

          <p className="mt-1 hidden sm:block text-[11px] md:text-xs leading-relaxed text-white/50 line-clamp-2">
            {dish.description}
          </p>
        </div>
      </div>

      {/* Bottom Section: Size Pills & Action Button */}
      <div className="mt-3 pt-2 border-t border-white/5 flex flex-col gap-2">
        {dish.sizes && dish.sizes.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {dish.sizes.map((size) => (
              <button
                key={size.name}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedSize(size);
                }}
                className={`rounded px-1.5 sm:px-2 py-0.5 font-mono text-[8px] sm:text-[9px] tracking-tight transition-colors ${
                  selectedSize?.name === size.name
                    ? 'bg-[#D1FF00] text-black font-bold'
                    : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
                }`}
              >
                {size.name.replace(' Box', '')}
              </button>
            ))}
          </div>
        )}

        <button
          onClick={() => onOpen(dish, selectedSize)}
          className="inline-flex items-center gap-1 font-mono text-[9px] sm:text-[10px] tracking-[.2em] text-[#D1FF00] transition-transform group-hover:translate-x-1"
        >
          <span>VIEW</span>
          <span>→</span>
        </button>
      </div>
    </motion.div>
  );
};
