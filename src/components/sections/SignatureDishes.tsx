import { motion, useScroll, useTransform, useMotionTemplate, useMotionValue } from 'framer-motion';
import { useRef } from 'react';
import { MagicCard } from '../magicui/magic-card';

const signatureItems = [
  {
    name: "Treehouse Mixed Grill",
    description: "Assortment of grilled meats: chicken, succulent beef, and spicy pork, served with house-made suya spice",
    price: "GHS 280",
    dietary: "Chef's Special",
    image: "https://lh3.googleusercontent.com/gps-cs-s/APNQkAEuuAY5xiGnBHUX7sv3_f0kVU-cNokS_cS_J3HTcZseZgJEibTovQ8IT98rWs0Szp8s7vpTnx_bhfgE6VDzU_L3VkI-RVgWgrkT636nt5drXl3WtmEov5YNxZ71_odNCN7t0EJY=w640-h640-n-k-no"
  },
  {
    name: "Lobster Thermidor",
    description: "Creamy lobster baked in shell with mushrooms, herbs, and Gruyere cheese, served with garden salad",
    price: "GHS 450",
    dietary: "Premium Seafood",
    image: "https://lh3.googleusercontent.com/gps-cs-s/APNQkAFnTQ4INIzKlxPffW59yTMaZN5v718HG_COBMwIxiLgYBzKH5QXlhvejDlxrfMfQCPERryOWd_AbMyrMEzqHl9oa42As8rzi-mwjgM5rZIvp5Tn4uuCNXV8Np9GQSV5Q5GqM7HX=w640-h640-n-k-no"
  },
  {
    name: "Beef Teriyaki",
    description: "Tender strips of beef glazed in a savory-sweet teriyaki sauce, served with steamed jasmine rice and stir-fried vegetables",
    price: "GHS 180",
    dietary: "Asian Fusion",
    image: "/beef_teriyaki_dish_1777594361588.png"
  },
  {
    name: "Squid Salad",
    description: "Refreshing grilled calamari tossed with citrus-marinated greens, cherry tomatoes, and a light herb vinaigrette",
    price: "GHS 120",
    dietary: "Light & Fresh",
    image: "/squid_salad_dish_1777594381780.png"
  },
  {
    name: "Ribeye Steak with Plantain",
    description: "Tender aged ribeye grilled to order, served with mashed sweet plantains and peppercorn sauce",
    price: "GHS 380",
    dietary: "House Favorite",
    image: "https://lh3.googleusercontent.com/gps-cs-s/APNQkAEIgi2MeXGztIVg6f-QfnuZWQ0Ae3F_bH0KRpZRyWQvJq-rDFGYaerzV6kSEJ9z6hK3QI2rTG-y56xSbXNYtxlcnlEeUDk2M3l8h7EWEh8CyHsy73-BdSgJh_6ve-dn80iXoMqr=w640-h640-n-k-no"
  },
  {
    name: "Grilled Prawns with Jollof",
    description: "Jumbo prawns marinated in garlic and ginger, served with authentic smoky Ghanaian jollof rice",
    price: "GHS 220",
    dietary: "Local Fusion",
    image: "https://lh3.googleusercontent.com/gps-cs-s/APNQkAH3KX94xcxIG92uD_TT-F307M5_WhCtB-3ebtgOelqRTQT-S92TIQyTSIkHOOtpZLJ2sLVC-SflPx7ksPbi6phnzS7oycLOSoNx8dGUkukjKqPhKgJpNGqvYTuf043sYWQxh026cA=w640-h640-n-k-no"
  },
  {
    name: "Sticky Toffee Pudding",
    description: "Warm date sponge cake drenched in a rich toffee sauce, served with a scoop of vanilla bean ice cream",
    price: "GHS 90",
    dietary: "Sweet Finale",
    image: "/sticky_toffee_pudding_dish_1777594404654.png"
  }
];

interface DishCardProps {
  item: {
    name: string;
    description: string;
    price: string;
    dietary: string;
    image: string;
  };
  index: number;
  scrollYProgress: any;
}

function DishCard({ item, index, scrollYProgress }: DishCardProps) {
  const imageX = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <div 
      className="w-[85vw] sm:w-[60vw] md:w-[45vw] lg:w-[32vw] h-[60vh] relative group shrink-0 overflow-hidden rounded-2xl border border-[#B6915E]/20 bg-[#141414] cursor-pointer"
    >
      {/* Background Image */}
      <motion.div 
        style={{ x: imageX }}
        className="absolute top-0 left-0 w-[140%] h-full transform-gpu z-0"
      >
        <img 
          src={item.image} 
          alt={item.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
          loading="eager"
        />
      </motion.div>

      {/* Dark Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#141414]/20 to-[#141414]/90 z-10 pointer-events-none" />
      <div className="absolute inset-0 bg-[#141414]/20 group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none" />
      
      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-8 z-30">
        <span className="inline-block px-3 py-1 mb-4 font-sans text-[10px] uppercase tracking-wider border border-[#F5F1EA]/20 rounded-full text-[#F5F1EA]/60 backdrop-blur-sm">
          {item.dietary}
        </span>
        <h3 className="font-serif text-3xl mb-2 text-[#F5F1EA]">{item.name}</h3>
        <p className="font-sans text-sm text-[#F5F1EA]/60 mb-4 line-clamp-2 max-w-[90%]">{item.description}</p>
        <span className="font-sans tracking-widest text-[#B6915E] font-medium">{item.price}</span>
      </div>
    </div>
  );
}

export default function SignatureDishes({ data }: { data?: any }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const displayItems = data?.menu?.flatMap((c: any) => c.items).map((item: any, i: number) => ({
    ...item,
    description: item.description || "Experimental and delightful Afro-fusion creation.",
    dietary: item.dietary || "Chef's Special",
    image: signatureItems[i % signatureItems.length].image // Fallback images
  })) || signatureItems;

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-82%"]);

  return (
    <section id="menu" ref={containerRef} className="h-[600vh] bg-[#141414] relative">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center">
        


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
            className="flex gap-8 px-6 md:px-12 w-max h-[50vh] min-h-[400px] items-center"
          >
            {displayItems.map((item: any, index: number) => (
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
