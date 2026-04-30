import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function Gallery() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const headingY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  
  // Parallax values for different columns
  const col1Y = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);
  const col2Y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
  const col3Y = useTransform(scrollYProgress, [0, 1], ["30%", "-30%"]);
  const col4Y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  const images = [
    "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=2670&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2670&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=2574&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?q=80&w=2670&auto=format&fit=crop"
  ];

  return (
    <section id="gallery" ref={ref} className="py-32 bg-[#141414] overflow-hidden relative">
      <div className="absolute inset-0 bg-[#1E3328]/5 z-0" />
      
      <motion.div style={{ y: headingY }} className="flex flex-col items-center justify-center px-6 md:px-12 mb-20 max-w-7xl mx-auto relative z-10 text-center">
        <span className="font-sans text-[10px] tracking-[0.4em] uppercase text-[#B6915E] block mb-4">See & Be Seen</span>
        <h2 className="font-serif text-5xl md:text-7xl font-light text-[#F5F1EA]">Atmosphere</h2>
      </motion.div>
      
      <div className="flex w-full h-[80vh] overflow-hidden relative z-10 gap-4 px-4 sm:px-8">
        {[col1Y, col2Y, col3Y, col4Y].map((yVal, i) => (
          <motion.div 
            key={i}
            style={{ y: yVal }}
            className={`w-1/4 h-[120%] flex flex-col gap-4 ${i % 2 !== 0 ? '-translate-y-24' : 'translate-y-12'}`}
          >
             <div className="w-full h-full relative rounded-2xl overflow-hidden group">
               <div className="absolute inset-0 bg-[#141414]/30 group-hover:bg-transparent transition-colors z-10 duration-700" />
               <img 
                 src={images[i]} 
                 alt="Gallery Atmosphere" 
                 className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out grayscale-[30%] group-hover:grayscale-0"
               />
             </div>
             <div className="w-full h-full relative rounded-2xl overflow-hidden group">
               <div className="absolute inset-0 bg-[#141414]/30 group-hover:bg-transparent transition-colors z-10 duration-700" />
               <img 
                 src={images[(i + 1) % 4]} 
                 alt="Gallery Atmosphere" 
                 className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out grayscale-[30%] group-hover:grayscale-0"
               />
             </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
