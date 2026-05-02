import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Lenis from 'lenis';
import { CalendarDays } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './sections/Footer';
import ReservationModal from './ReservationModal';
import { getRestaurantData, RestaurantData } from '../services/dataService';
import StickyBottomBar from './StickyBottomBar';

interface LayoutProps {
  children: React.ReactNode;
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
        <h2 className="text-4xl font-serif text-[#F5F1EA]">Project Paused</h2>
        <p className="text-[#F5F1EA]/60 font-sans leading-relaxed">
          This project has been paused by **Alpha Group LLC**. 
          For more information or to re-activate the service, please contact **0247173819**.
        </p>
        <div className="pt-8">
          <div className="inline-block px-6 py-3 border border-[#B6915E] text-[#B6915E] text-xs uppercase tracking-widest font-bold">
            Awaiting Reactivation
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Layout({ children }: LayoutProps) {
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [data, setData] = useState<RestaurantData | null>(null);

  useEffect(() => {
    getRestaurantData().then(data => {
      setData(data);
      if (data.suspended) {
        setIsLocked(true);
      }
    }).catch(console.error);
    
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
          {children}
        </main>

        <Footer onReserve={() => setIsReservationOpen(true)} data={data} />
        <StickyBottomBar onReserve={() => setIsReservationOpen(true)} />
      </div>

      <AnimatePresence>
        {isReservationOpen && (
          <ReservationModal onClose={() => setIsReservationOpen(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}
