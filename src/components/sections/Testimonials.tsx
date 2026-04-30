import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Star } from 'lucide-react';

const reviews = [
  {
    text: "The perfect date night spot in Accra. The lighting, the trees, the subtle music—it feels incredibly exclusive yet totally welcoming. The Truffle Mac & Cheese is unbelievable.",
    author: "KWAME A.",
    role: "Local Guide"
  },
  {
    text: "Escaped the noise of the city and found this little oasis. It really feels like dining in an upscale treehouse. Service was attentive without being hovering.",
    author: "SARAH L.",
    role: "Business Traveler"
  },
  {
    text: "Their Thursday acoustic nights are unmatched. It has that sultry, relaxed luxury vibe that is so hard to find. A must-visit if you appreciate ambiance.",
    author: "MICHAEL D.",
    role: "Resident"
  }
];

export default function Testimonials() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const cardsY = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);

  return (
    <section ref={ref} className="py-32 bg-[#141414] relative overflow-hidden">
      <motion.div style={{ y: cardsY }} className="absolute inset-0 opacity-10 pointer-events-none flex justify-center items-center">
         <span className="font-serif text-[40vw] text-[#F5F1EA]/5 select-none align-middle leading-none">"</span>
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {reviews.map((rev, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.15 }}
              className="flex flex-col items-center text-center p-8 bg-[#1E3328]/10 rounded-3xl border border-[#B6915E]/10 shadow-xl backdrop-blur-sm"
            >
              <div className="flex gap-1 mb-6 text-[#B6915E]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="font-serif italic text-lg leading-relaxed text-[#F5F1EA]/80 mb-8 flex-grow">
                "{rev.text}"
              </p>
              <div>
                <span className="font-sans text-xs tracking-widest uppercase text-[#F5F1EA] block mb-1">
                  {rev.author}
                </span>
                <span className="font-sans text-[10px] tracking-wider uppercase text-[#B6915E]/70">
                  {rev.role}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
