import { motion } from 'motion/react';

const signatureItems = [
  {
    name: "Truffle Lobster Mac & Cheese",
    description: "Maine lobster, aged gruyère, black truffle shaving, toasted herb crust",
    price: "₵450",
    dietary: "Seafood"
  },
  {
    name: "Wagyu Ribeye (8oz)",
    description: "Charcoal grilled, compound butter, roasted garlic, chimichurri",
    price: "₵950",
    dietary: "Gluten-Free"
  },
  {
    name: "Smoked Plantain Gnocchi",
    description: "Hand-rolled gnocchi, wild mushrooms, sage brown butter, parmesan",
    price: "₵280",
    dietary: "Vegetarian"
  },
  {
    name: "Golden Silk Snapper",
    description: "Pan-seared local snapper, coconut lemongrass broth, heirloom tomatoes",
    price: "₵320",
    dietary: "Seafood"
  }
];

export default function SignatureDishes() {
  return (
    <section id="menu" className="py-32 px-6 md:px-12 bg-tree-charcoal relative">
      {/* Decorative vertical line */}
      <div className="absolute top-0 bottom-0 left-6 md:left-12 w-px bg-white/5 hidden lg:block" />
      
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24">
        
        {/* Left column: Sticky Title */}
        <div className="lg:w-1/3 relative">
          <div className="sticky top-40">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-8 h-px bg-tree-brass" />
              <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-tree-brass">Curated Menu</span>
            </div>
            <h2 className="font-serif text-4xl leading-tight mb-6">
              A Symphony of <br/><span className="italic text-white/70">Flavors</span>
            </h2>
            <p className="font-sans text-sm text-white/50 leading-relaxed mb-8 max-w-sm">
              Our culinary philosophy merges global inspiration with refined execution. 
              Explore a preview of our current seasonal highlights.
            </p>
            <button className="font-sans text-xs tracking-[0.1em] uppercase border-b border-tree-brass text-tree-brass pb-1 hover:text-tree-amber hover:border-tree-amber transition-colors">
              View Full Menu
            </button>
          </div>
        </div>

        {/* Right column: Menu Items */}
        <div className="lg:w-2/3 flex flex-col gap-12">
          {signatureItems.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group border-b border-white/10 pb-8 last:border-0"
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-serif text-2xl group-hover:text-tree-brass transition-colors">{item.name}</h3>
                <span className="font-sans tracking-wider text-tree-brass">{item.price}</span>
              </div>
              <p className="font-sans text-sm text-white/50 mb-4">{item.description}</p>
              <span className="inline-block px-3 py-1 font-sans text-[10px] uppercase tracking-wider border border-white/20 rounded-full text-white/40">
                {item.dietary}
              </span>
            </motion.div>
          ))}

          {/* Chef Note */}
          <div className="mt-12 p-8 bg-[#1E3328]/20 border border-white/5 rounded-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-6 opacity-10">
              <span className="font-serif text-8xl">"</span>
            </div>
            <p className="font-serif italic text-xl leading-relaxed text-white/80 relative z-10 mb-4">
              "We source our ingredients daily, allowing the seasons to dictate our culinary narrative. 
              Every dish is an exploration of texture, balance, and memory."
            </p>
            <p className="font-sans text-xs tracking-[0.1em] uppercase text-tree-brass">— Executive Chef</p>
          </div>
        </div>

      </div>
    </section>
  );
}
