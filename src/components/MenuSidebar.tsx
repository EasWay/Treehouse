import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface MenuSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  menu: {
    category: string;
    items: { name: string; price: string }[];
  }[];
}

export default function MenuSidebar({ isOpen, onClose, menu }: MenuSidebarProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#141414]/80 backdrop-blur-sm z-[60]"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-[#1E3328] z-[70] shadow-2xl overflow-y-auto border-l border-[#B6915E]/20"
          >
            <div className="p-8 md:p-12">
              <div className="flex justify-between items-center mb-12">
                <div>
                  <h2 className="font-serif text-4xl text-[#F5F1EA] mb-2">Our Menu</h2>
                  <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#B6915E]">Culinarily Curated</p>
                </div>
                <button 
                  onClick={onClose}
                  className="p-3 rounded-full border border-[#F5F1EA]/10 text-[#F5F1EA] hover:bg-[#B6915E] hover:text-[#141414] transition-all"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {menu?.map((category, catIndex) => (
                <div key={catIndex} className="mb-12">
                  <h3 className="font-serif text-2xl text-[#B6915E] border-b border-[#B6915E]/20 pb-4 mb-8">
                    {category.category}
                  </h3>
                  <div className="space-y-8">
                    {category.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex justify-between items-start gap-4">
                        <div className="flex-1">
                          <h4 className="font-sans text-sm font-bold text-[#F5F1EA] uppercase tracking-wider mb-1">
                            {item.name}
                          </h4>
                        </div>
                        <span className="font-serif text-[#B6915E] whitespace-nowrap">
                          {item.price}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              <div className="mt-20 pt-12 border-t border-[#F5F1EA]/10">
                <p className="font-sans text-xs text-[#F5F1EA]/40 text-center leading-relaxed italic">
                  All prices are inclusive of 18.1% VAT, NHIL, GETFund, and Tourism Levy.
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
