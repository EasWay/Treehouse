import { motion } from 'motion/react';
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
  return (
    <section className="py-32 bg-tree-charcoal">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {reviews.map((rev, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.2 }}
              className="flex flex-col items-center text-center p-8 bg-[#1E3328]/20 rounded-3xl border border-tree-brass/10"
            >
              <div className="flex gap-1 mb-6 text-tree-brass">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="font-serif italic text-lg leading-relaxed text-white/80 mb-8 flex-grow">
                "{rev.text}"
              </p>
              <div>
                <span className="font-sans text-xs tracking-widest uppercase text-tree-ivory block mb-1">
                  {rev.author}
                </span>
                <span className="font-sans text-[10px] tracking-wider uppercase text-tree-brass/70">
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
