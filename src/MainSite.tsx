import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Lenis from 'lenis';
import { Utensils } from 'lucide-react';
import Navbar from './components/Navbar';
import Hero from './components/sections/Hero';
import Story from './components/sections/Story';
import SignatureDishes from './components/sections/SignatureDishes';
import Gallery from './components/sections/Gallery';
import Events from './components/sections/Events';
import Testimonials from './components/sections/Testimonials';
import Footer from './components/sections/Footer';
import ReservationModal from './components/ReservationModal';
import MenuSidebar from './components/MenuSidebar';
import { getRestaurantData, RestaurantData } from './services/dataService';

function FloatingMenuButton({ onClick }: { onClick: () => void }) {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      className="fixed right-6 top-1/2 -translate-y-1/2 z-40 w-14 h-14 bg-[#B6915E] text-[#141414] rounded-full shadow-2xl flex items-center justify-center border-4 border-[#141414]"
      title="View Menu"
    >
      <Utensils className="w-6 h-6" />
    </motion.button>
  );
}

function StickyBottomBar({ onReserve }: { onReserve: () => void }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#1E3328] border-t border-[#B6915E]/30 px-6 md:px-12 py-4 md:py-6 flex flex-col md:flex-row justify-between items-center gap-4">
      <div className="hidden md:flex gap-12 items-center">
        <div className="flex flex-col text-tree-ivory">
          <span className="text-[10px] uppercase tracking-widest opacity-50 mb-1">Live Music</span>
          <span className="text-sm font-medium">Jazz & Afrobeat Duo — 8PM</span>
        </div>
        <div className="w-[1px] h-8 bg-[#B6915E]/20"></div>
        <div className="flex flex-col text-tree-ivory">
          <span className="text-[10px] uppercase tracking-widest opacity-50 mb-1">Dress Code</span>
          <span className="text-sm font-medium">Elegant Casual</span>
        </div>
      </div>

      <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end">
        <div className="hidden sm:flex items-center gap-4">
          <div className="flex -space-x-2">
            <div className="w-8 h-8 rounded-full border-2 border-[#1E3328] bg-gray-400"></div>
            <div className="w-8 h-8 rounded-full border-2 border-[#1E3328] bg-gray-500"></div>
            <div className="w-8 h-8 rounded-full border-2 border-[#1E3328] bg-gray-600"></div>
            <div className="w-8 h-8 rounded-full border-2 border-[#1E3328] bg-[#B6915E] flex items-center justify-center text-[10px] font-bold text-tree-ivory">+12</div>
          </div>
          <p className="text-xs opacity-60 text-tree-ivory">12 Guests Booking Now</p>
        </div>
        <button 
          onClick={onReserve}
          className="w-full sm:w-auto px-10 py-4 bg-[#B6915E] text-[#141414] font-bold uppercase text-xs tracking-[0.2em] shadow-lg shadow-[#B6915E]/20 hover:scale-105 transition-transform"
        >
          Reserve a Table
        </button>
      </div>
    </div>
  );
}

export default function MainSite() {
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [data, setData] = useState<RestaurantData | null>(null);

  useEffect(() => {
    getRestaurantData().then(setData).catch(console.error);
    
    document.body.classList.add('bg-noise');
    const lenis = new Lenis({
      lerp: 0.05,
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-tree-charcoal text-tree-ivory selection:bg-tree-brass selection:text-tree-charcoal pb-24 md:pb-32 bg-noise">
      <Navbar onReserve={() => setIsReservationOpen(true)} data={data} />
      
      <main>
        <Hero onReserve={() => setIsReservationOpen(true)} data={data} />
        <Story />
        <SignatureDishes data={data} />
        <Gallery />
        <Events />
        <Testimonials data={data} />
      </main>

      <Footer onReserve={() => setIsReservationOpen(true)} data={data} />
      
      <StickyBottomBar onReserve={() => setIsReservationOpen(true)} />

      <FloatingMenuButton onClick={() => setIsMenuOpen(true)} />

      <AnimatePresence>
        {isReservationOpen && (
          <ReservationModal onClose={() => setIsReservationOpen(false)} />
        )}
      </AnimatePresence>

      <MenuSidebar isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} menu={data?.menu || []} />
    </div>
  );
}
