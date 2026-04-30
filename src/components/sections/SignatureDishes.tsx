import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const signatureItems = [
  {
    name: "Treehouse Mixed Grill",
    description: "Assortment of grilled meats: chicken, succulent beef, and spicy pork, served with house-made suya spice",
    price: "GHS 280",
    dietary: "Chef's Special",
    image: "https://images.unsplash.com/photo-1544148103-0773bf10d330?q=80&w=2670&auto=format&fit=crop"
  },
  {
    name: "Lobster Thermidor",
    description: "Creamy lobster baked in shell with mushrooms, herbs, and Gruyere cheese, served with garden salad",
    price: "GHS 450",
    dietary: "Premium Seafood",
    image: "https://images.unsplash.com/photo-1551326844-4df70f78d0e9?q=80&w=2626&auto=format&fit=crop"
  },
  {
    name: "Ribeye Steak with Plantain",
    description: "Tender aged ribeye grilled to order, served with mashed sweet plantains and peppercorn sauce",
    price: "GHS 380",
    dietary: "House Favorite",
    image: "https://images.unsplash.com/photo-1546241072-48010ad28c2c?q=80&w=2574&auto=format&fit=crop"
  },
  {
    name: "Grilled Prawns with Jollof",
    description: "Jumbo prawns marinated in garlic and ginger, served with authentic smoky Ghanaian jollof rice",
    price: "GHS 220",
    dietary: "Local Fusion",
    image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=2674&auto=format&fit=crop"
  }
];

interface DishCardProps {
  item: typeof signatureItems[0];
  index: number;
  scrollYProgress: any;
}

function DishCard({ item, index, scrollYProgress }: DishCardProps) {
  const imageX = useTransform(scrollYProgress, [0, 1], [-100 + index * 20, 100 - index * 20]);

  return (
    <div className="w-[85vw] sm:w-[60vw] md:w-[45vw] lg:w-[30vw] h-full relative group shrink-0">
      <div className="w-full h-full rounded-2xl overflow-hidden relative border border-[#B6915E]/10">
        <div className="absolute inset-0 bg-[#141414]/40 group-hover:bg-[#141414]/10 transition-colors duration-500 z-10" />
        <motion.img 
          style={{ x: imageX }}
          src={item.image} 
          alt={item.name} 
          className="absolute inset-0 w-[120%] h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
        />
        <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-[#141414] via-[#141414]/80 to-transparent z-20">
          <span className="inline-block px-3 py-1 mb-4 font-sans text-[10px] uppercase tracking-wider border border-[#F5F1EA]/20 rounded-full text-[#F5F1EA]/60 backdrop-blur-sm">
            {item.dietary}
          </span>
          <h3 className="font-serif text-3xl mb-2 text-[#F5F1EA]">{item.name}</h3>
          <p className="font-sans text-sm text-[#F5F1EA]/60 mb-4">{item.description}</p>
          <span className="font-sans tracking-widest text-[#B6915E]">{item.price}</span>
        </div>
      </div>
    </div>
  );
}

export default function SignatureDishes() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Pinning and horizontal scroll logic
  // We make the container wide/tall enough to scroll, and shift the content horizontally.
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

  return (
    <section id="menu" ref={containerRef} className="h-[400vh] bg-[#141414] relative">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center">
        
        {/* Background ambient lighting */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-[20%] left-[-10%] w-[40%] h-[40%] bg-[#B6915E] rounded-full blur-[150px]"></div>
        </div>

        {/* Content Wrapper */}
        <div className="relative z-10 w-full h-full flex flex-col justify-center pt-24">
          <div className="max-w-7xl mx-auto w-full px-6 md:px-12 mb-12 flex justify-between items-end shrink-0">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-8 h-px bg-[#B6915E]" />
                <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-[#B6915E]">Curated Menu</span>
              </div>
              <h2 className="font-serif text-5xl md:text-7xl font-light leading-tight text-[#F5F1EA]">
                Symphony of <br/><span className="italic text-[#F5F1EA]/70">Flavors</span>
              </h2>
            </div>
            <p className="hidden md:block font-sans text-xs tracking-[0.2em] uppercase text-[#F5F1EA]/40 rotate-90 origin-right translate-y-8">
              Scroll to explore
            </p>
          </div>

          <motion.div 
            style={{ x }} 
            className="flex gap-8 px-6 md:px-12 w-[400vw] h-[50vh] min-h-[400px] items-center"
          >
            {signatureItems.map((item, index) => (
              <DishCard key={index} item={item} index={index} scrollYProgress={scrollYProgress} />
            ))}
            
            {/* Final Card: Call to action */}
            <div className="w-[85vw] sm:w-[60vw] md:w-[45vw] lg:w-[30vw] h-full flex flex-col justify-center items-center text-center px-12 shrink-0 border border-[#B6915E]/20 rounded-2xl bg-[#1E3328]/20 backdrop-blur-sm">
               <h3 className="font-serif text-4xl mb-6 text-[#F5F1EA]">Discover More</h3>
               <p className="font-sans text-sm text-[#F5F1EA]/60 mb-8 max-w-sm">
                 Explore our full culinary offerings, curated wine list, and seasonal specials.
               </p>
               <button className="px-8 py-4 font-sans text-xs tracking-[0.1em] uppercase border border-[#B6915E] text-[#B6915E] hover:bg-[#B6915E] hover:text-[#141414] transition-colors rounded-full">
                 View Full Menu
               </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
