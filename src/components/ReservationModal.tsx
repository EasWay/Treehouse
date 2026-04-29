import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, Clock, Users, ArrowRight } from 'lucide-react';

interface ReservationModalProps {
  onClose: () => void;
}

export default function ReservationModal({ onClose }: ReservationModalProps) {
  const [step, setStep] = useState(1);
  const [guests, setGuests] = useState(2);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 sm:px-0">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <motion.div 
        initial={{ y: 50, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 20, opacity: 0, scale: 0.95 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="relative w-full max-w-2xl bg-[#0a0a0a] border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-white/5 bg-[#0a0a0a] shrink-0">
          <h2 className="font-serif text-2xl tracking-wide text-tree-ivory">Reserve a Table</h2>
          <button 
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5 text-tree-ivory" />
          </button>
        </div>

        {/* Content */}
        <div className="p-8 md:p-12 overflow-y-auto custom-scrollbar">
          
          <div className="flex items-center justify-center gap-4 mb-12">
            <div className={`w-2 h-2 rounded-full ${step >= 1 ? 'bg-tree-brass' : 'bg-white/20'}`} />
            <div className={`w-16 h-px ${step >= 2 ? 'bg-tree-brass' : 'bg-white/10'}`} />
            <div className={`w-2 h-2 rounded-full ${step >= 2 ? 'bg-tree-brass' : 'bg-white/20'}`} />
            <div className={`w-16 h-px ${step >= 3 ? 'bg-tree-brass' : 'bg-white/10'}`} />
            <div className={`w-2 h-2 rounded-full ${step >= 3 ? 'bg-tree-brass' : 'bg-white/20'}`} />
          </div>

          <AnimateStep step={step} currentStep={1}>
            <div className="space-y-8">
              <h3 className="font-serif text-3xl font-light text-center mb-8">When will you join us?</h3>
              
              <div className="space-y-6">
                <div>
                  <label className="font-sans text-[10px] tracking-widest uppercase text-tree-brass mb-3 block">Guest Count</label>
                  <div className="flex items-center justify-between border border-white/20 rounded-2xl p-4">
                    <button 
                      onClick={() => setGuests(Math.max(1, guests - 1))}
                      className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:border-tree-brass transition-colors"
                    >-</button>
                    <span className="font-serif text-2xl flex items-center gap-2">
                      <Users className="w-5 h-5 text-tree-brass" /> {guests}
                    </span>
                    <button 
                      onClick={() => setGuests(Math.min(10, guests + 1))}
                      className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:border-tree-brass transition-colors"
                    >+</button>
                  </div>
                </div>

                <div>
                   <label className="font-sans text-[10px] tracking-widest uppercase text-tree-brass mb-3 block">Date & Time</label>
                   <div className="grid grid-cols-2 gap-4">
                     <button className="flex items-center gap-3 p-4 border border-white/20 rounded-2xl hover:border-white/50 transition-colors text-left">
                       <Calendar className="w-5 h-5 text-tree-brass shrink-0" />
                       <span className="font-sans text-sm text-white/80">Today</span>
                     </button>
                     <button className="flex items-center gap-3 p-4 border border-white/20 rounded-2xl hover:border-white/50 transition-colors text-left">
                       <Clock className="w-5 h-5 text-tree-brass shrink-0" />
                       <span className="font-sans text-sm text-white/80">19:30</span>
                     </button>
                   </div>
                </div>
              </div>

              <button 
                onClick={() => setStep(2)}
                className="w-full py-5 bg-tree-brass text-[#141414] font-sans text-xs tracking-widest uppercase rounded-full mt-8 hover:bg-tree-amber transition-colors flex items-center justify-center gap-2"
              >
                Continue <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </AnimateStep>

          <AnimateStep step={step} currentStep={2}>
             <div className="space-y-8">
               <h3 className="font-serif text-3xl font-light text-center mb-8">Personal Details</h3>
               <div className="space-y-5">
                 <div>
                   <input type="text" placeholder="Full Name" className="w-full bg-transparent border-b border-white/20 px-0 py-3 text-lg font-sans text-white focus:outline-none focus:border-tree-brass placeholder:text-white/30" />
                 </div>
                 <div>
                   <input type="email" placeholder="Email Address" className="w-full bg-transparent border-b border-white/20 px-0 py-3 text-lg font-sans text-white focus:outline-none focus:border-tree-brass placeholder:text-white/30" />
                 </div>
                 <div>
                   <input type="tel" placeholder="Phone Number" className="w-full bg-transparent border-b border-white/20 px-0 py-3 text-lg font-sans text-white focus:outline-none focus:border-tree-brass placeholder:text-white/30" />
                 </div>
               </div>
               
               <div className="flex gap-4 mt-8">
                 <button onClick={() => setStep(1)} className="w-1/3 py-5 font-sans text-xs tracking-widest uppercase border border-white/20 rounded-full hover:bg-white/5">
                   Back
                 </button>
                 <button onClick={() => setStep(3)} className="w-2/3 py-5 bg-tree-brass text-[#141414] font-sans text-xs tracking-widest uppercase rounded-full hover:bg-tree-amber transition-colors">
                   Confirm details
                 </button>
               </div>
             </div>
          </AnimateStep>

          <AnimateStep step={step} currentStep={3}>
             <div className="text-center space-y-6 flex flex-col items-center justify-center py-8">
               <div className="w-20 h-20 bg-tree-green/20 rounded-full flex items-center justify-center mb-4">
                 <div className="w-10 h-10 border-t-2 border-r-2 border-tree-brass rounded-full animate-spin" />
               </div>
               <h3 className="font-serif text-2xl">Confirming your space</h3>
               <p className="font-sans text-sm text-white/50 max-w-sm">
                 Please wait while we secure your table under the canopy. We'll send a confirmation to your email shortly.
               </p>
             </div>
          </AnimateStep>

        </div>
      </motion.div>
    </div>
  );
}

function AnimateStep({ children, step, currentStep }: { children: React.ReactNode, step: number, currentStep: number }) {
  if (step !== currentStep) return null;
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
}
