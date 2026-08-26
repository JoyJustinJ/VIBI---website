import React from 'react';
import { CATEGORIES, DISHES } from '../data/menu';
import { DishCard } from './DishCard';
import type { Dish, SizeOption } from '../types';

interface MenuSectionProps {
  onOpenDish: (dish: Dish, activeSize?: SizeOption) => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({ onOpenDish }) => {
  return (
    <section id="menu" className="border-t border-white/10 py-16 md:py-24">
      {/* Main Section Heading */}
      <div className="px-4 sm:px-6 md:px-10">
        <p className="font-mono text-xs tracking-[.3em] text-[#D1FF00] uppercase">
          AUTHENTIC MENU · 100% FRESH INGREDIENTS
        </p>
        <h2 className="mt-3 max-w-4xl font-serif text-4xl sm:text-6xl md:text-8xl leading-[.95] text-white">
          Explore our
          <br />
          <i className="italic">freshly crafted</i> menu.
        </h2>
      </div>

      {/* Category Sections */}
      <div className="mt-12 md:mt-20 space-y-16 md:space-y-28">
        {CATEGORIES.map((cat) => {
          const categoryDishes = DISHES.filter((d) => d.category === cat.id);
          if (categoryDishes.length === 0) return null;

          return (
            <div
              key={cat.id}
              id={`cat-${cat.id}`}
              className="scroll-mt-24 px-4 sm:px-6 md:px-10"
            >
              {/* Category Header */}
              <div className="mb-6 md:mb-10 flex items-end justify-between border-b border-white/10 pb-4 md:pb-6">
                <div>
                  <h3 className="font-serif text-3xl sm:text-5xl md:text-7xl text-white">
                    {cat.label}
                  </h3>
                  <p className="mt-1 md:mt-2 font-mono text-[9px] sm:text-[10px] md:text-xs tracking-[.25em] text-white/40 uppercase">
                    {cat.note}
                  </p>
                </div>
                <span className="font-mono text-[10px] sm:text-xs tracking-[.2em] text-[#D1FF00] uppercase font-bold shrink-0 ml-2">
                  {categoryDishes.length} ITEMS
                </span>
              </div>

              {/* 2 Products Per Column on Mobile Responsive Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
                {categoryDishes.map((dish, idx) => (
                  <DishCard
                    key={dish.id}
                    dish={dish}
                    index={idx}
                    onOpen={onOpenDish}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
