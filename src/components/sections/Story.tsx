import { motion } from 'motion/react';

export default function Story() {
  return (
    <section id="story" className="py-32 px-6 md:px-12 bg-[#1E3328]/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative aspect-[3/4] md:aspect-[4/5] w-full max-w-md mx-auto lg:max-w-none"
          >
            <div className="absolute inset-0 bg-tree-green/10 z-10 mix-blend-overlay rounded-tl-[100px] rounded-br-[100px]" />
            <img 
              src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2670&auto=format&fit=crop" 
              alt="Treehouse Ambience"
              className="w-full h-full object-cover rounded-tl-[100px] rounded-br-[100px] shadow-2xl"
            />
            {/* Decorative badge */}
            <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-tree-charcoal border border-white/10 rounded-full flex items-center justify-center z-20">
              <p className="font-sans text-[10px] uppercase tracking-widest text-center text-tree-brass leading-relaxed">
                Est.<br/>Accra
              </p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="flex flex-col justify-center"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-px bg-tree-brass" />
              <span className="font-sans text-xs tracking-[0.2em] uppercase text-tree-brass">Our Philosophy</span>
            </div>
            
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light leading-tight mb-8">
              An Oasis <span className="italic text-white/70">Above</span> The City
            </h2>
            
            <div className="font-sans text-sm md:text-base leading-relaxed text-white/60 space-y-6">
              <p>
                Nestled within the vibrant heart of Accra, Treehouse is more than a restaurant—it's an immersive 
                escape. We've curated an environment where the boundaries between indoor luxury and outdoor serenity blur.
              </p>
              <p>
                Surrounded by verdant foliage and illuminated by warm, cascading lights, every corner is designed 
                to evoke a sense of quiet exclusivity. Our menu offers a sophisticated take on international cuisine, 
                blending bold, familiar flavors with elegant presentation.
              </p>
              <p>
                Whether it is an intimate date night or a lively weekend gathering, Treehouse provides the perfect 
                backdrop for unforgettable evenings.
              </p>
            </div>

            <div className="mt-12 flex items-center gap-8">
              <div className="flex flex-col">
                <span className="font-serif text-3xl text-tree-ivory mb-1">Evening</span>
                <span className="font-sans text-xs tracking-wider uppercase text-tree-ivory/40">Atmosphere</span>
              </div>
              <div className="w-px h-12 bg-white/10" />
              <div className="flex flex-col">
                <span className="font-serif text-3xl text-tree-ivory mb-1">Global</span>
                <span className="font-sans text-xs tracking-wider uppercase text-tree-ivory/40">Cuisine</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
