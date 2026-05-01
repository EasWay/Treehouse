import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { AnimatedShinyText } from '../magicui/animated-shiny-text';
import { ShimmerButton } from '../magicui/shimmer-button';
import { CoolMode } from '../magicui/cool-mode';
import { MorphingVideoText } from '../magicui/morphing-video-text';

interface HeroProps {
  onReserve: () => void;
  data?: any;
}

export default function Hero({ onReserve, data }: HeroProps) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-screen w-full flex flex-col items-center overflow-hidden bg-[#141414] pt-32 pb-24">
      {/* Background Atmosphere */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1E3328]/40 via-[#141414]/60 to-[#141414]"></div>
      </div>

      {/* Main Content Layer */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 w-full mx-auto text-center">
        <motion.div 
          style={{ y: textY, opacity: textOpacity }}
          className="space-y-8 flex flex-col items-center"
        >
          <motion.div
             initial={{ opacity: 0, scale: 0.9 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
             className="relative"
          >
            <AnimatedShinyText className="mb-4">
              <span className="text-[#B6915E] uppercase tracking-[0.4em] text-xs font-semibold">
                {data?.name ? data.name : "Treehouse Restaurant"}
              </span>
            </AnimatedShinyText>
            
            <div className="h-[40vh] md:h-[60vh] w-screen">
              <MorphingVideoText
                src="https://www.shutterstock.com/shutterstock/videos/3956866807/preview/stock-footage-close-view-of-steaming-moelas-in-tomato-sauce-at-a-portuguese-buffet.mp4"
                texts={["Dine", "Relax", "Escape", "Savor"]}
                fontSize="20vw"
              />
            </div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 1 }}
              className="text-4xl md:text-6xl font-serif italic text-[#F5F1EA]/80 -mt-12 md:-mt-20 relative z-20"
            >
              Under the Canopy
            </motion.h2>
          </motion.div>
          
          <motion.p
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 1 }}
             className="text-lg md:text-xl text-[#F5F1EA]/70 leading-relaxed max-w-2xl font-light font-sans"
          >
            Accra's premier botanical dining escape. A vibrant fusion of culinary excellence and tropical serenity.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="flex flex-col sm:flex-row gap-8 items-center"
          >
            <CoolMode>
              <ShimmerButton 
                onClick={onReserve} 
                background="#B6915E"
                shimmerColor="#ffffff"
                className="px-16 py-5 font-bold uppercase text-xs tracking-[0.3em] text-[#141414] hover:scale-105 transition-transform shadow-2xl"
              >
                Reserve a Table
              </ShimmerButton>
            </CoolMode>
            <a href="#menu" className="group flex items-center gap-4 text-[#F5F1EA] hover:text-[#B6915E] transition-all py-4">
              <span className="text-xs uppercase tracking-[0.3em] font-semibold">Discover Flavors</span>
              <div className="w-16 h-[1px] bg-[#B6915E]/40 group-hover:w-24 group-hover:bg-[#B6915E] transition-all duration-500"></div>
            </a>
          </motion.div>
        </motion.div>

        {/* Signature Special Floating Card */}
        <motion.div
           initial={{ opacity: 0, x: -50, y: 50, rotateZ: -10 }}
           animate={{ opacity: 1, x: 0, y: 0, rotateZ: 0 }}
           transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 1.5 }} 
           className="absolute bottom-12 left-4 sm:left-12 w-56 p-6 bg-[#141414]/80 border border-[#B6915E]/30 shadow-2xl backdrop-blur-md z-30 transform-gpu hidden lg:block"
        >
          <p className="text-[10px] uppercase tracking-widest text-[#B6915E] mb-3">Signature Special</p>
          <p className="text-sm font-serif mb-2 text-[#F5F1EA]">{data?.menu?.[1]?.items?.[0]?.name || "Lobster Thermidor"}</p>
          <p className="text-[11px] opacity-60 leading-tight mb-4 text-[#F5F1EA]">Experimental and delightful creation.</p>
          <p className="text-sm font-bold text-[#B6915E]">{data?.menu?.[1]?.items?.[0]?.price || "GHS 450"}</p>
        </motion.div>

        {/* Ambient Botanical Glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none -z-10">
          <div className="absolute top-1/4 left-1/4 w-[30vw] h-[30vw] bg-[#1E3328] rounded-full blur-[150px] opacity-40"></div>
          <div className="absolute bottom-1/4 right-1/4 w-[25vw] h-[25vw] bg-[#B6915E] rounded-full blur-[120px] opacity-10"></div>
        </div>
      </main>

      {/* Scroll Indicator */}
      <motion.div 
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         transition={{ delay: 2.5, duration: 1 }}
         className="hidden lg:flex absolute bottom-12 right-12 opacity-30 flex-col gap-4 items-center"
      >
        <motion.div 
           animate={{ height: ["0px", "64px", "0px"], y: [0, 0, 64] }}
           transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
           className="w-[1px] bg-gradient-to-b from-transparent to-[#F5F1EA]"
           style={{ height: '64px' }}
        ></motion.div>
        <span style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }} className="text-[10px] uppercase tracking-widest font-light text-[#F5F1EA] mt-4">Scroll to Discover</span>
      </motion.div>
    </section>
  );
}

