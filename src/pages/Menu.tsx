import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Utensils, CalendarDays, ChevronRight, ChevronLeft, Search, Leaf, Flame, Sparkles, Coffee } from 'lucide-react';
import { getRestaurantData, RestaurantData } from '../services/dataService';
import { CoolMode } from '../components/magicui/cool-mode';
import ReservationModal from '../components/ReservationModal';

export default function Menu() {
  const [data, setData] = useState<RestaurantData | null>(null);
  const [pageIndex, setPageIndex] = useState(0);
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    getRestaurantData().then(setData).catch(console.error);
    window.scrollTo(0, 0);
  }, []);

  if (!data) return (
    <div className="min-h-screen flex items-center justify-center bg-[#141414] text-[#B6915E]">
      <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }}>
        <Sparkles className="w-12 h-12" />
      </motion.div>
    </div>
  );

  const categories = data.menu;
  const totalPages = Math.ceil(categories.length / 2);

  const paginate = (newDirection: number) => {
    if (pageIndex + newDirection >= 0 && pageIndex + newDirection < totalPages) {
      setDirection(newDirection);
      setPageIndex(pageIndex + newDirection);
    }
  };

  const getCategoryIcon = (category: string) => {
    const cat = category.toLowerCase();
    if (cat.includes('starter')) return <Leaf className="w-5 h-5" />;
    if (cat.includes('main')) return <Flame className="w-5 h-5" />;
    if (cat.includes('dessert')) return <Sparkles className="w-5 h-5" />;
    return <Coffee className="w-5 h-5" />;
  };

  const variants = {
    enter: (direction: number) => ({
      rotateY: direction > 0 ? 90 : -90,
      opacity: 0,
      transformOrigin: direction > 0 ? "left" : "right"
    }),
    center: {
      rotateY: 0,
      opacity: 1,
      zIndex: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    },
    exit: (direction: number) => ({
      rotateY: direction < 0 ? 90 : -90,
      opacity: 0,
      transformOrigin: direction < 0 ? "left" : "right",
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    })
  };

  return (
    <div className="min-h-screen bg-[#141414] flex items-center justify-center py-12 md:py-24 px-4 overflow-hidden bg-noise">
      <div className="relative w-full max-w-7xl aspect-[1/1.4] md:aspect-[1.4/1] perspective-[2000px]">
        
        {/* Book Container */}
        <div className="absolute inset-0 flex flex-col md:flex-row">
          {/* Mobile Single Page or Desktop Side-by-Side */}
          <div className="flex-1 md:w-1/2 h-full bg-[#1E3328] rounded-t-[30px] md:rounded-t-none md:rounded-l-[40px] shadow-2xl border-b md:border-b-0 md:border-r border-[#141414]/50 relative overflow-hidden">
             <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]" />
          </div>
          
          <div className="hidden md:block md:w-1/2 h-full bg-[#1E3328] rounded-r-[40px] shadow-2xl relative overflow-hidden">
             <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]" />
          </div>

          {/* Central Gutter (Desktop Only) */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-8 -translate-x-1/2 bg-gradient-to-r from-black/40 via-black/10 to-black/40 z-20" />
        </div>

        {/* Animated Pages */}
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={pageIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0 flex flex-col md:flex-row z-10"
          >
            {/* Left Content Page (or Top Page on Mobile) */}
            <div className="w-full md:w-1/2 h-1/2 md:h-full p-6 md:p-12 lg:p-20 flex flex-col border-b md:border-b-0 border-white/5">
              {categories[pageIndex * 2] && (
                <>
                  <div className="mb-4 md:mb-12">
                    <div className="flex items-center gap-3 text-[#B6915E] mb-2 md:mb-4">
                      {getCategoryIcon(categories[pageIndex * 2].category)}
                      <span className="font-sans text-[8px] md:text-[10px] tracking-[0.4em] uppercase">Selection 0{pageIndex * 2 + 1}</span>
                    </div>
                    <h2 className="font-serif text-2xl md:text-5xl text-[#F5F1EA] mb-1 md:mb-2">{categories[pageIndex * 2].category}</h2>
                    <div className="w-10 md:w-12 h-0.5 bg-[#B6915E]" />
                  </div>
                  <div className="space-y-4 md:space-y-8 overflow-y-auto custom-scrollbar pr-2 md:pr-4">
                    {categories[pageIndex * 2].items.map((item, i) => (
                      <div key={i} className="group">
                        <div className="flex justify-between items-baseline gap-2 md:gap-4 mb-1">
                          <h3 className="font-serif text-base md:text-xl text-[#F5F1EA] group-hover:text-[#B6915E] transition-colors flex items-center gap-2">
                            {item.name}
                            {item.dietary && <span className="font-sans text-[6px] md:text-[8px] uppercase tracking-widest px-1 md:px-2 py-0.5 border border-[#B6915E]/30 rounded text-[#B6915E]/60">{item.dietary}</span>}
                          </h3>
                          <span className="font-serif text-[#B6915E] text-xs md:text-base">{item.price}</span>
                        </div>
                        <p className="font-sans text-[9px] md:text-xs text-[#F5F1EA]/30 italic leading-relaxed line-clamp-2 md:line-clamp-none">{item.description}</p>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Right Content Page (or Bottom Page on Mobile) */}
            <div className="flex w-full md:w-1/2 h-1/2 md:h-full p-6 md:p-12 lg:p-20 flex-col md:border-l border-white/5">
              {categories[pageIndex * 2 + 1] ? (
                <>
                  <div className="mb-4 md:mb-12 text-right flex flex-col items-end">
                    <div className="flex items-center gap-4 text-[#B6915E] mb-2 md:mb-4">
                      <span className="font-sans text-[8px] md:text-[10px] tracking-[0.4em] uppercase">Selection 0{pageIndex * 2 + 2}</span>
                      {getCategoryIcon(categories[pageIndex * 2 + 1].category)}
                    </div>
                    <h2 className="font-serif text-2xl md:text-5xl text-[#F5F1EA] mb-1 md:mb-2">{categories[pageIndex * 2 + 1].category}</h2>
                    <div className="w-12 h-0.5 bg-[#B6915E]" />
                  </div>
                  <div className="space-y-4 md:space-y-8 overflow-y-auto custom-scrollbar pl-2 md:pl-4">
                    {categories[pageIndex * 2 + 1].items.map((item, i) => (
                      <div key={i} className="group text-right">
                        <div className="flex justify-between flex-row-reverse items-baseline gap-2 md:gap-4 mb-1">
                          <h3 className="font-serif text-base md:text-xl text-[#F5F1EA] group-hover:text-[#B6915E] transition-colors flex flex-row-reverse items-center gap-2">
                            {item.name}
                            {item.dietary && <span className="font-sans text-[6px] md:text-[8px] uppercase tracking-widest px-1 md:px-2 py-0.5 border border-[#B6915E]/30 rounded text-[#B6915E]/60">{item.dietary}</span>}
                          </h3>
                          <span className="font-serif text-[#B6915E] text-xs md:text-base">{item.price}</span>
                        </div>
                        <p className="font-sans text-[9px] md:text-xs text-[#F5F1EA]/30 italic line-clamp-2 md:line-clamp-none">{item.description}</p>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-center">
                  <Utensils className="w-16 h-16 text-[#B6915E]/20 mb-6" />
                  <p className="font-serif text-[#F5F1EA]/20 italic">More flavors awaiting your arrival...</p>
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-8 z-30 pointer-events-none">
          <button 
            onClick={() => paginate(-1)}
            disabled={pageIndex === 0}
            className={`w-12 h-12 rounded-full border border-white/10 bg-[#141414]/50 backdrop-blur-md flex items-center justify-center transition-all pointer-events-auto ${pageIndex === 0 ? 'opacity-0 scale-90' : 'opacity-100 hover:bg-[#B6915E] hover:text-[#141414] hover:border-[#B6915E]'}`}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button 
            onClick={() => paginate(1)}
            disabled={pageIndex >= totalPages - 1}
            className={`w-12 h-12 rounded-full border border-white/10 bg-[#141414]/50 backdrop-blur-md flex items-center justify-center transition-all pointer-events-auto ${pageIndex >= totalPages - 1 ? 'opacity-0 scale-90' : 'opacity-100 hover:bg-[#B6915E] hover:text-[#141414] hover:border-[#B6915E]'}`}
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Page Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-30">
          {Array.from({ length: totalPages }).map((_, i) => (
            <div 
              key={i}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${pageIndex === i ? 'w-8 bg-[#B6915E]' : 'bg-white/20'}`}
            />
          ))}
        </div>
      </div>

      {/* Floating Reservation Action */}
      <div className="fixed right-8 bottom-32 z-50">
        <CoolMode>
          <motion.button
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsReservationOpen(true)}
            className="w-20 h-20 bg-[#B6915E] text-[#141414] rounded-full shadow-[0_20px_50px_rgba(182,145,94,0.3)] flex flex-col items-center justify-center border-4 border-[#141414]"
          >
            <CalendarDays className="w-8 h-8" />
            <span className="text-[10px] font-bold uppercase mt-1">Book</span>
          </motion.button>
        </CoolMode>
      </div>

      <AnimatePresence>
        {isReservationOpen && (
          <ReservationModal onClose={() => setIsReservationOpen(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}
