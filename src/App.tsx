import { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { MenuSection } from './components/MenuSection';
import { PromiseSection } from './components/PromiseSection';
import { Footer } from './components/Footer';
import { DishModal } from './components/DishModal';
import type { Dish, SizeOption } from './types';

export function App() {
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null);
  const [initialSize, setInitialSize] = useState<SizeOption | undefined>(undefined);

  const handleOpenDish = (dish: Dish, activeSize?: SizeOption) => {
    setSelectedDish(dish);
    setInitialSize(activeSize);
  };

  return (
    <main className="min-h-screen bg-[#0F0F0F] text-[#F2F2F2] selection:bg-[#D1FF00] selection:text-black">
      {/* Fixed Top Header */}
      <Header />

      {/* Centered Hero Section with Transparent Dropping Burger Video */}
      <Hero />

      {/* Full Menu Grid (2 products per column on mobile) */}
      <MenuSection onOpenDish={handleOpenDish} />

      {/* Our Promise Statement */}
      <PromiseSection />

      {/* Footer */}
      <Footer />

      {/* Dish Preview Modal Overlay */}
      <DishModal
        dish={selectedDish}
        initialSize={initialSize}
        onClose={() => setSelectedDish(null)}
      />
    </main>
  );
}

export default App;
