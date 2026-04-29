import { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'motion/react';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  onReserve: () => void;
}

export default function Navbar({ onReserve }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  const navLinks = [
    { name: 'Story', href: '#story' },
    { name: 'Menu', href: '#menu' },
    { name: 'Events', href: '#events' },
    { name: 'Gallery', href: '#gallery' },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b border-[#F5F1EA]/10 ${
          isScrolled ? 'bg-[#141414]/90 backdrop-blur-md py-6' : 'bg-transparent py-8'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between w-full">
          <div className="flex items-center gap-12">
            <a href="#" className="font-serif text-2xl tracking-widest uppercase font-bold text-[#B6915E]">
              Treehouse
            </a>
            <div className="hidden md:flex gap-8 text-xs uppercase tracking-[0.2em] font-medium opacity-70">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="hover:text-[#B6915E] transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <button 
              onClick={onReserve}
              className="px-6 py-3 border border-[#B6915E] text-[#B6915E] text-xs uppercase tracking-widest font-bold bg-transparent hover:bg-[#B6915E] hover:text-[#141414] transition-all"
            >
              Inquiry
            </button>
          </div>

          <button 
            className="md:hidden text-[#B6915E]"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <motion.div 
        initial={{ opacity: 0, x: '100%' }}
        animate={{ opacity: isMobileMenuOpen ? 1 : 0, x: isMobileMenuOpen ? 0 : '100%' }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-0 z-50 bg-[#141414] flex flex-col pointer-events-none data-[open=true]:pointer-events-auto"
        data-open={isMobileMenuOpen}
      >
        <div className="p-6 flex justify-between items-center border-b border-[#F5F1EA]/10">
          <span className="font-serif text-2xl tracking-widest uppercase font-bold text-[#B6915E]">TREEHOUSE</span>
          <button onClick={() => setIsMobileMenuOpen(false)}>
            <X className="w-8 h-8 opacity-70 hover:opacity-100" />
          </button>
        </div>
        <div className="flex flex-col items-center justify-center flex-1 gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="font-serif text-4xl tracking-wide opacity-80 hover:opacity-100 transition-opacity"
            >
              {link.name}
            </a>
          ))}
          <button 
            onClick={() => {
              setIsMobileMenuOpen(false);
              onReserve();
            }}
            className="mt-8 px-8 py-4 font-sans text-sm tracking-[0.1em] uppercase bg-tree-brass text-[#141414] rounded-full"
          >
            Reserve a Table
          </button>
        </div>
      </motion.div>
    </>
  );
}
