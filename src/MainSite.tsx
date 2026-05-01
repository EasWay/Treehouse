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

function PreviewWatermark() {
  return (
    <div 
      id="preview-protection-anchor"
      className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden select-none opacity-[0.04]"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-[-45deg] whitespace-nowrap text-[10vw] font-black uppercase tracking-[0.5em] text-white">
        UNLICENSED PREVIEW • PAYMENT PENDING • UNLICENSED PREVIEW • PAYMENT PENDING
      </div>
    </div>
  );
}

function LockScreen() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-[10000] bg-[#141414] flex flex-col items-center justify-center p-6 text-center"
    >
      <div className="max-w-md space-y-6">
        <div className="w-20 h-20 bg-[#B6915E]/20 rounded-full flex items-center justify-center mx-auto mb-8">
          <CalendarDays className="w-10 h-10 text-[#B6915E]" />
        </div>
        <h2 className="text-4xl font-serif text-[#F5F1EA]">Integrity Verification Failed</h2>
        <p className="text-[#F5F1EA]/60 font-sans leading-relaxed">
          This digital asset is currently in **Restricted Preview Mode**. 
          Final release and full ownership will be granted upon completion of the project engagement.
        </p>
        <div className="pt-8">
          <div className="inline-block px-6 py-3 border border-[#B6915E] text-[#B6915E] text-xs uppercase tracking-widest font-bold">
            Awaiting Final Release
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function StickyBottomBar({ onReserve }: { onReserve: () => void }) {
  const handleReserve = () => {
    alert("This is a Development Preview. Reservation functionality will be enabled upon final project release.");
  };

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

          <DockIcon label="Reservations" onClick={handleReserve}>
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
  const [isLocked, setIsLocked] = useState(false);
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

    // Advanced Integrity Check
    const integrityCheck = setInterval(() => {
      const anchor = document.getElementById('preview-protection-anchor');
      if (!anchor) {
        setIsLocked(true);
        return;
      }
      
      const style = window.getComputedStyle(anchor);
      if (style.display === 'none' || style.visibility === 'hidden' || parseFloat(style.opacity) < 0.01) {
        setIsLocked(true);
      }
    }, 1500);

    // Anti-Copy Deterrence
    const handleContextMenu = (e: MouseEvent) => e.preventDefault();
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === 'F12' || 
        (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C')) ||
        (e.ctrlKey && e.key === 'u')
      ) {
        e.preventDefault();
      }
    };
    const handleCopy = (e: ClipboardEvent) => {
      e.clipboardData?.setData('text/plain', 'PROPRIETARY CONTENT: This digital asset is in Restricted Preview Mode. Authorized release required.');
      e.preventDefault();
    };

    window.addEventListener('contextmenu', handleContextMenu);
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('copy', handleCopy);

    // Debugger Trap (Anti-Inspection)
    const trap = setInterval(() => {
      const startTime = performance.now();
      debugger;
      const endTime = performance.now();
      if (endTime - startTime > 100) {
        setIsLocked(true);
      }
    }, 1000);

    return () => {
      lenis.destroy();
      clearInterval(integrityCheck);
      clearInterval(trap);
      window.removeEventListener('contextmenu', handleContextMenu);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('copy', handleCopy);
    };
  }, []);

  const handleInquiry = () => {
    alert("This is a Development Preview. Inquiry functionality will be activated upon project handover.");
  };

  return (
    <div className="relative min-h-screen bg-tree-charcoal text-tree-ivory selection:bg-tree-brass selection:text-tree-charcoal pb-24 md:pb-32 bg-noise">
      <AnimatePresence>
        {isLocked && <LockScreen />}
      </AnimatePresence>
      
      <PreviewWatermark />
      
      <div className={isLocked ? "blur-xl grayscale pointer-events-none transition-all duration-1000" : ""}>
        <Navbar onReserve={handleInquiry} data={data} />
        
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
      </div>

      <AnimatePresence>
        {isReservationOpen && (
          <ReservationModal onClose={() => setIsReservationOpen(false)} />
        )}
      </AnimatePresence>
      
      <MenuSidebar isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} menu={data?.menu || []} />
    </div>
  );
}
