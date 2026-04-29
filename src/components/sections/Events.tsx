import { motion } from 'motion/react';

const events = [
  {
    day: "Thursdays",
    title: "Acoustic & Wine",
    desc: "Unwind with live acoustic sets and half-priced select wines. The perfect preamble to the weekend.",
    time: "7:00 PM - 10:00 PM"
  },
  {
    day: "Fridays",
    title: "Twilight Sessions",
    desc: "Our resident DJ blends deep house with Afro-lounge beats as the evening transitions to night.",
    time: "8:00 PM - Late"
  },
  {
    day: "Sundays",
    title: "Botany Brunch",
    desc: "An extended daytime affair featuring bottomless mimosas, live sax, and a curated brunch menu.",
    time: "11:00 AM - 4:00 PM"
  }
];

export default function Events() {
  return (
    <section id="events" className="py-32 bg-tree-charcoal border-t border-tree-ivory/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        <div className="text-center mb-20">
           <h2 className="font-serif text-4xl md:text-5xl font-light mb-6">
              The <span className="italic text-tree-ivory/70">Experience</span>
           </h2>
           <p className="font-sans text-sm text-tree-ivory/50 max-w-xl mx-auto leading-relaxed">
             Join us for our signature weekly events designed to elevate your social rhythm. 
             Reservations are highly recommended for event nights.
           </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {events.map((evt, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: idx * 0.2 }}
              className="p-8 border border-tree-brass/10 rounded-2xl bg-[#1E3328]/30 hover:bg-[#1E3328]/50 transition-colors group flex flex-col h-full shadow-lg"
            >
              <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-tree-brass mb-4 block">
                {evt.day}
              </span>
              <h3 className="font-serif text-2xl mb-4 group-hover:text-tree-ivory transition-colors">
                {evt.title}
              </h3>
              <p className="font-sans text-sm text-white/50 leading-relaxed mb-8 flex-grow">
                {evt.desc}
              </p>
              <div className="pt-6 border-t border-white/10 mt-auto">
                <span className="font-sans text-xs text-white/40 tracking-wider">
                  {evt.time}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
