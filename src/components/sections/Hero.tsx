import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

interface HeroProps {
  onReserve: () => void;
}

export default function Hero({ onReserve }: HeroProps) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-screen w-full flex flex-col items-center overflow-hidden bg-[#141414] pt-32 pb-24">
      {/* Background Atmosphere: Simulating the Garden Depth */}
      <div className="absolute inset-0 opacity-40 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-[#1E3328] rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#B6915E] opacity-20 rounded-full blur-[120px]"></div>
      </div>

      {/* Main Content Layer */}
      <main className="relative z-10 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-12 px-6 md:px-12 w-full max-w-7xl mx-auto items-center">
        {/* Left: Storytelling */}
        <motion.div style={{ y: textY, opacity: textOpacity }} className="lg:col-span-6 space-y-8 flex flex-col text-left">
          <motion.div
             initial={{ opacity: 0, y: 50, rotateX: 20 }}
             animate={{ opacity: 1, y: 0, rotateX: 0 }}
             transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
             className="space-y-4 perspective-[1000px]"
          >
            <p className="text-[#B6915E] uppercase tracking-[0.3em] text-xs font-semibold">Accra's Hidden Sanctuary</p>
            <h1 className="text-6xl md:text-8xl font-serif leading-[0.9] font-light text-[#F5F1EA] tracking-tighter">
              Dine Under <br/>
              <span className="italic block mt-2 text-7xl md:text-9xl">the Canopy</span>
            </h1>
          </motion.div>
          
          <motion.p
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
             className="text-lg text-[#F5F1EA]/70 leading-relaxed max-w-md font-light"
          >
            Nyaniba Estates' premier botanical dining escape. A vibrant mix of great food, chill ambiance, and eclectic cocktails in the heart of Accra.
          </motion.p>
          
          <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.8 }}
             className="flex flex-col sm:flex-row gap-6 items-start sm:items-center pt-4"
          >
             <button 
                onClick={onReserve}
                className="px-10 py-5 bg-[#B6915E] text-[#141414] font-bold uppercase text-xs tracking-[0.2em] shadow-lg shadow-[#B6915E]/20 hover:scale-105 transition-transform"
              >
                Reserve a Table
              </button>
             <div className="flex gap-4 items-center">
               <div className="h-[1px] w-12 bg-[#B6915E]"></div>
               <p className="text-xs uppercase tracking-widest opacity-60 text-[#F5F1EA]">Open Daily 12PM — Late</p>
             </div>
          </motion.div>
        </motion.div>

        {/* Right: Immersive Visuals */}
        <div className="lg:col-span-6 h-full relative flex items-center justify-center lg:justify-end mt-12 lg:mt-0 perspective-[1000px]">
          {/* Large Featured Image Slot */}
          <motion.div
             style={{ scale: bgScale }}
             initial={{ opacity: 0, rotateY: 15, scale: 0.8, x: 50 }}
             animate={{ opacity: 1, rotateY: 0, scale: 1, x: 0 }}
             transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.4 }} 
             className="w-[90%] sm:w-[400px] h-[550px] bg-[#1E3328] rounded-t-full relative overflow-hidden shadow-2xl border border-[#B6915E]/20"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent z-10"></div>
            <motion.img 
               style={{ scale: bgScale, y: imgY }}
               src="https://lh4.googleusercontent.com/-2wgmPs2uCT8/AAAAAAAAAAI/AAAAAAAAAAA/KNHh6_5cH7E/s1000-p-k-no-ns-nd/photo.jpg" 
               alt="Treehouse Restaurant Accra" 
               className="absolute inset-0 w-full h-full object-cover opacity-80 mix-blend-overlay"
               crossOrigin="anonymous"
            />
            <div className="absolute bottom-8 left-0 right-0 text-center px-6 z-20">
              <p className="text-xs uppercase tracking-widest text-[#B6915E] mb-2">Evening Atmosphere</p>
              <p className="font-serif text-xl italic font-light text-[#F5F1EA]">"The city's most romantic corner."</p>
            </div>
          </motion.div>
          
          {/* Overlaying Mini Card */}
          <motion.div
             initial={{ opacity: 0, x: -50, y: 50, rotateZ: -10 }}
             animate={{ opacity: 1, x: 0, y: 0, rotateZ: 0 }}
             transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 1 }} 
             className="absolute bottom-12 -left-4 sm:left-4 lg:right-[320px] lg:left-auto w-56 p-6 bg-[#141414]/80 border border-[#B6915E]/30 shadow-2xl backdrop-blur-md z-30 transform-gpu"
          >
            <p className="text-[10px] uppercase tracking-widest text-[#B6915E] mb-3">Signature Special</p>
            <p className="text-sm font-serif mb-2 text-[#F5F1EA]">Lobster Thermidor</p>
            <p className="text-[11px] opacity-60 leading-tight mb-4 text-[#F5F1EA]">Classic preparation with mushrooms, herbs, and Gruyere cheese.</p>
            <p className="text-sm font-bold text-[#B6915E]">GHS 450</p>
          </motion.div>
        </div>
      </main>

      {/* Ambient Corner Elements */}
      <motion.div 
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         transition={{ delay: 2, duration: 1 }}
         className="hidden lg:flex absolute bottom-32 left-12 opacity-30 flex-col gap-4 items-center"
      >
        <motion.div 
           animate={{ height: ["0px", "96px", "0px"], y: [0, 0, 96] }}
           transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
           className="w-[1px] bg-gradient-to-b from-transparent to-[#F5F1EA]"
           style={{ height: '96px' }}
        ></motion.div>
        <span style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }} className="text-[10px] uppercase tracking-widest font-light text-[#F5F1EA] mt-4">Scroll for Journey</span>
      </motion.div>
    </section>
  );
}
