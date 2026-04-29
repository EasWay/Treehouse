import { motion } from 'motion/react';
import { ArrowDown } from 'lucide-react';

interface HeroProps {
  onReserve: () => void;
}

export default function Hero({ onReserve }: HeroProps) {
  return (
    <section className="relative min-h-screen w-full flex flex-col items-center overflow-hidden bg-[#141414] pt-32 pb-24">
      {/* Background Atmosphere: Simulating the Garden Depth */}
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-[#1E3328] rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#B6915E] opacity-20 rounded-full blur-[120px]"></div>
      </div>

      {/* Main Content Layer */}
      <main className="relative z-10 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-12 px-6 md:px-12 w-full max-w-7xl mx-auto items-center">
        {/* Left: Storytelling */}
        <div className="lg:col-span-6 space-y-8 flex flex-col text-left">
          <motion.div
             initial={{ opacity: 0, y: 30 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
             className="space-y-4"
          >
            <p className="text-[#B6915E] uppercase tracking-[0.3em] text-xs font-semibold">Accra's Hidden Sanctuary</p>
            <h1 className="text-5xl md:text-7xl font-serif leading-[0.95] font-light text-[#F5F1EA]">
              Dine Under <br/>
              <span className="italic">the Canopy</span>
            </h1>
          </motion.div>
          
          <motion.p
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
             className="text-lg text-[#F5F1EA]/70 leading-relaxed max-w-md font-light"
          >
            An elevated garden experience where nature meets upscale hospitality. Experience the pulse of Accra through curated international cuisine and moonlit ambiance.
          </motion.p>
          
          <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
             className="flex flex-col sm:flex-row gap-6 items-start sm:items-center pt-4"
          >
             <button 
                onClick={onReserve}
                className="px-10 py-4 bg-[#B6915E] text-[#141414] font-bold uppercase text-xs tracking-[0.2em] shadow-lg shadow-[#B6915E]/20 hover:scale-105 transition-transform"
              >
                Reserve a Table
              </button>
             <div className="flex gap-4 items-center">
               <div className="h-[1px] w-12 bg-[#B6915E]"></div>
               <p className="text-xs uppercase tracking-widest opacity-60 text-[#F5F1EA]">Open Daily 12PM — Late</p>
             </div>
          </motion.div>
        </div>

        {/* Right: Immersive Visuals */}
        <div className="lg:col-span-6 h-full relative flex items-center justify-center lg:justify-end mt-12 lg:mt-0">
          {/* Large Featured Image Slot */}
          <motion.div
             initial={{ opacity: 0, scale: 0.95 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.6 }} 
             className="w-[90%] sm:w-[400px] h-[500px] bg-[#1E3328] rounded-t-full relative overflow-hidden shadow-2xl border border-[#B6915E]/20"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent z-10"></div>
            <img 
               src="https://images.unsplash.com/photo-1544148103-0773bf10d330?q=80&w=2670&auto=format&fit=crop" 
               alt="Treehouse Restaurant Environment" 
               className="absolute inset-0 w-full h-full object-cover opacity-80 mix-blend-overlay"
            />
            <div className="absolute bottom-8 left-0 right-0 text-center px-6 z-20">
              <p className="text-xs uppercase tracking-widest text-[#B6915E] mb-2">Evening Atmosphere</p>
              <p className="font-serif text-xl italic font-light text-[#F5F1EA]">"The city's most romantic corner."</p>
            </div>
          </motion.div>
          
          {/* Overlaying Mini Card */}
          <motion.div
             initial={{ opacity: 0, x: 20 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 1 }} 
             className="absolute bottom-12 -left-4 sm:left-4 lg:right-[320px] lg:left-auto w-56 p-6 bg-[#1E3328] border border-[#B6915E]/30 shadow-2xl backdrop-blur-md z-30"
          >
            <p className="text-[10px] uppercase tracking-widest text-[#B6915E] mb-3">Tonight's Special</p>
            <p className="text-sm font-serif mb-2 text-[#F5F1EA]">Atlantic Lobster Tail</p>
            <p className="text-[11px] opacity-60 leading-tight mb-4 text-[#F5F1EA]">Herb butter, roasted garden vegetables, citrus zest.</p>
            <p className="text-sm font-bold text-[#B6915E]">GHS 480</p>
          </motion.div>
        </div>
      </main>

      {/* Ambient Corner Elements */}
      <div className="hidden lg:flex absolute bottom-32 left-12 opacity-30 flex-col gap-4 items-center">
        <div className="w-[1px] h-24 bg-gradient-to-b from-transparent to-[#F5F1EA]"></div>
        <span style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }} className="text-[10px] uppercase tracking-widest font-light text-[#F5F1EA] mt-4">Scroll for Journey</span>
      </div>
    </section>
  );
}
