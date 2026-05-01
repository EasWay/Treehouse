import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Lenis from 'lenis';
import { Utensils, CalendarDays, MapPin, Phone, Music, Shirt } from 'lucide-react';
import Navbar from './components/Navbar';
import Hero from './components/sections/Hero';
import Story from './components/sections/Story';
import SignatureDishes from './components/sections/SignatureDishes';
import Gallery from './components/sections/Gallery';
import Events from './components/sections/Events';
import Reviews from './components/sections/Reviews';
import Footer from './components/sections/Footer';
import ReservationModal from './components/ReservationModal';
import MenuSidebar from './components/MenuSidebar';
import { getRestaurantData, RestaurantData } from './services/dataService';
import { CoolMode } from './components/magicui/cool-mode';
import { Dock, DockIcon, DockSeparator } from './components/magicui/dock';

function FloatingMenuButton({ onClick }: { onClick: () => void }) {
  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40">
      <CoolMode>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onClick}
          className="w-14 h-14 bg-[#B6915E] text-[#141414] rounded-full shadow-2xl flex items-center justify-center border-4 border-[#141414]"
          title="View Menu"
        >
          <Utensils className="w-6 h-6" />
        </motion.button>
      </CoolMode>
    </div>
  );
}

function StickyBottomBar({ onReserve }: { onReserve: () => void }) {
  return (
    <div className="fixed bottom-6 left-0 right-0 z-40 flex justify-center pointer-events-none">
      <div className="pointer-events-auto">
        <Dock distance={140} magnification={50}>
          <DockIcon label="Live Music (8PM)" onClick={() => window.location.hash = "#events"}>
            <Music className="w-5 h-5" />
          </DockIcon>
          <DockIcon label="Dress Code" onClick={() => window.location.hash = "#footer"}>
            <Shirt className="w-5 h-5" />
          </DockIcon>
          <DockIcon label="View Menu" onClick={() => {
            const menuBtn = document.querySelector('button[title="View Menu"]') as HTMLButtonElement;
            if (menuBtn) menuBtn.click();
          }}>
            <Utensils className="w-5 h-5" />
          </DockIcon>
          
          <DockSeparator />

          <DockIcon label="Reservations" onClick={onReserve}>
            <CalendarDays className="w-5 h-5" />
          </DockIcon>
          <DockIcon label="Location" onClick={() => window.open("https://maps.app.goo.gl/ffXgKPvFvyK4BjrS6", "_blank")}>
            <MapPin className="w-5 h-5" />
          </DockIcon>
          <DockIcon label="Concierge" onClick={() => window.location.href = "tel:+233208914333"}>
            <Phone className="w-5 h-5" />
          </DockIcon>
        </Dock>
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
        <div id="reviews">
          <Reviews />
        </div>
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
