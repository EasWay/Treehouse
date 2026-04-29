import { motion } from 'motion/react';

export default function Gallery() {
  return (
    <section id="gallery" className="py-24 bg-[#1E3328]/10">
      <div className="flex items-center justify-between px-6 md:px-12 mb-12 max-w-7xl mx-auto">
        <h2 className="font-serif text-3xl font-light">Atmosphere</h2>
        <span className="font-sans text-xs tracking-[0.2em] uppercase text-tree-brass block">See & Be Seen</span>
      </div>
      
      <div className="flex w-full overflow-hidden">
        <motion.div 
          className="flex gap-4 px-4"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ ease: "linear", duration: 30, repeat: Infinity }}
        >
          {/* Double the images for seamless infinite scroll */}
          {[1, 2, 3, 4, 1, 2, 3, 4].map((item, idx) => (
            <div key={idx} className="relative w-[80vw] sm:w-[50vw] md:w-[35vw] flex-shrink-0 aspect-[4/5] rounded-xl overflow-hidden group">
               <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10 duration-500" />
               <img 
                 src={
                   idx % 4 === 0 ? "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=2670&auto=format&fit=crop" :
                   idx % 4 === 1 ? "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2670&auto=format&fit=crop" :
                   idx % 4 === 2 ? "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=2574&auto=format&fit=crop" :
                   "https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?q=80&w=2670&auto=format&fit=crop"
                 }
                 alt="Atmosphere showcase"
                 className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
               />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
