import { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface NavbarProps {
  onReserve: () => void;
  data?: any;
}

export default function Navbar({ onReserve, data }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const location = useLocation();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Menu', href: '/menu' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'About', href: '/about' },
  ];

  const isHome = location.pathname === '/';

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b border-[#F5F1EA]/10 overflow-hidden ${
          isScrolled || !isHome ? 'bg-[#141414]/90 backdrop-blur-md py-4 md:py-6' : 'bg-transparent py-6 md:py-8'
        }`}
      >
        {/* Green Ambience */}
        <div className={`absolute inset-0 pointer-events-none transition-opacity duration-700 ${isScrolled || !isHome ? 'opacity-100' : 'opacity-0'}`}>
          <div className="absolute top-[-100%] left-[10%] w-[30%] h-[300%] bg-[#1E3328] rounded-full blur-[40px] opacity-80"></div>
          <div className="absolute top-[-100%] right-[20%] w-[20%] h-[300%] bg-[#1E3328] rounded-full blur-[40px] opacity-60"></div>
        </div>

        <div className="relative z-10 w-full px-6 md:px-12 flex items-center justify-between">
          <div className="flex items-center gap-12">
            <Link to="/" className="flex items-center">
              <img src="/logo.png" alt="Treehouse Logo" className="h-10 md:h-16 w-auto object-contain" />
            </Link>
            <div className="hidden md:flex gap-8 text-xs uppercase tracking-[0.2em] font-medium opacity-70">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`hover:text-[#B6915E] transition-colors ${location.pathname === link.href ? 'text-[#B6915E] opacity-100' : ''}`}
                >
                  {link.name}
                </Link>
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
            className="md:hidden text-[#B6915E] p-2"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <motion.div 
        initial={{ opacity: 0, x: '100%' }}
        animate={{ opacity: isMobileMenuOpen ? 1 : 0, x: isMobileMenuOpen ? 0 : '100%' }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-0 z-[60] bg-[#141414] flex flex-col pointer-events-none data-[open=true]:pointer-events-auto"
        data-open={isMobileMenuOpen}
      >
        <div className="p-4 flex justify-between items-center border-b border-[#F5F1EA]/10">
          <img src="/logo.png" alt="Treehouse Logo" className="h-10 w-auto object-contain" />
          <button onClick={() => setIsMobileMenuOpen(false)} className="p-2">
            <X className="w-6 h-6 opacity-70 hover:opacity-100" />
          </button>
        </div>
        <div className="flex flex-col items-center justify-center flex-1 gap-6">
          {navLinks.map((link, idx) => (
            <motion.div
              key={link.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: isMobileMenuOpen ? 1 : 0, y: isMobileMenuOpen ? 0 : 10 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Link
                to={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`font-serif text-3xl tracking-wide opacity-80 hover:opacity-100 transition-opacity ${location.pathname === link.href ? 'text-[#B6915E] opacity-100' : ''}`}
              >
                {link.name}
              </Link>
            </motion.div>
          ))}
          <motion.button 
            initial={{ opacity: 0 }}
            animate={{ opacity: isMobileMenuOpen ? 1 : 0 }}
            transition={{ delay: 0.5 }}
            onClick={() => {
              setIsMobileMenuOpen(false);
              onReserve();
            }}
            className="mt-6 px-6 py-3 font-sans text-xs tracking-[0.1em] uppercase bg-[#B6915E] text-[#141414] rounded-full"
          >
            Reserve a Table
          </motion.button>
        </div>
      </motion.div>
    </>
  );
}
