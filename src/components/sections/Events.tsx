import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { BorderBeam } from '../magicui/border-beam';

const events = [
  {
    day: "Thursdays",
    title: "Acoustic & Wine",
    desc: "Unwind with live acoustic sets and half-priced select wines. The perfect preamble to the weekend.",
    time: "7:00 PM - 10:00 PM",
    image: "https://lh3.googleusercontent.com/gps-cs-s/APNQkAH4M_4C0DfN9k-sIxROovYz8J_jAoO9PwOvLcVPeLb3NF8BAmgqiLmf7hJfhvr9U0Aly0OZaWLLT6UdwPjWH2wfpgWoxgw4IcxQATBuJVL8HDZtZquMHaEkntVCBF8wX4D2Z7J_Kw=w640-h640-n-k-no"
  },
  {
    day: "Fridays",
    title: "Twilight Sessions",
    desc: "Our resident DJ blends deep house with Afro-lounge beats as the evening transitions to night.",
    time: "8:00 PM - Late",
    image: "https://lh3.googleusercontent.com/gps-cs-s/APNQkAF-lMYlrpIVOz-BnUoJOMUbnas35YjOenbtOw93cYY2NTFd61sdEBxJ6HqGVL4FsCUYJ5FNKRzJ4T62oExsb8MtTMuDBGgSMbinDqFU3ImbRxC6VuYr2Cc1FNXsrz0VQEo3t3XyaA=w640-h640-n-k-no"
  },
  {
    day: "Sundays",
    title: "Botany Brunch",
    desc: "An extended daytime affair featuring bottomless mimosas, live sax, and a curated brunch menu.",
    time: "11:00 AM - 4:00 PM",
    image: "https://lh3.googleusercontent.com/gps-cs-s/APNQkAGXtcoDXPLXUDqzIr9KO0NEbg7UgbrySVAlE_roMc-MDMp7vnzgMuaDtI-G5RbNhi2R1KKtiGVLwOOaWGxcjJNwa_4SKvFkHEHY2q52XchhDGGynoPYqwKQRz6HeAhma6HuyG-5=w640-h640-n-k-no"
  }
];

export default function Events() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const titleScale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  return (
    <section id="events" ref={ref} className="py-40 bg-[#141414] border-t border-[#F5F1EA]/5 relative overflow-hidden perspective-[1000px]">
      <div className="absolute top-[-50%] left-[20%] w-[60%] h-[60%] bg-[#1E3328] opacity-10 rounded-full blur-[150px] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        <div className="text-center mb-24">
           <motion.h2 
              style={{ scale: titleScale, opacity: titleOpacity }}
              className="font-serif text-6xl md:text-8xl font-light mb-6 text-[#F5F1EA] tracking-tighter"
           >
              The <span className="italic text-[#F5F1EA]/70">Experience</span>
           </motion.h2>
           <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-sans text-base text-[#F5F1EA]/50 max-w-xl mx-auto leading-relaxed font-light"
           >
             Join us for our signature weekly events designed to elevate your social rhythm. 
             Reservations are highly recommended.
           </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8">
          {events.map((evt, idx) => (
            <EventCard key={idx} evt={evt} idx={idx} />
          ))}
        </div>

      </div>
    </section>
  );
}

const EventCard: React.FC<{ evt: any, idx: number }> = ({ evt, idx }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "center center"]
  });

  const rotateX = useTransform(scrollYProgress, [0, 1], [45, 0]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [100, 0]);

  return (
    <motion.div 
      ref={cardRef}
      style={{ rotateX, opacity, y }}
      className="relative rounded-3xl overflow-hidden group h-[500px] shadow-2xl border border-[#B6915E]/20"
    >
      <div className="absolute inset-0 bg-[#141414]/60 group-hover:bg-[#141414]/30 transition-colors duration-700 z-10" />
      <img src={evt.image} alt={evt.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out" />
      
      <BorderBeam size={250} duration={12} delay={9} colorFrom="#B6915E" colorTo="rgba(182, 145, 94, 0)" className="z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      
      <div className="relative z-20 h-full p-8 flex flex-col justify-end">
        <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-[#B6915E] mb-4 block translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
          {evt.day}
        </span>
        <h3 className="font-serif text-4xl mb-4 text-[#F5F1EA] translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
          {evt.title}
        </h3>
        <p className="font-sans text-sm text-[#F5F1EA]/70 leading-relaxed mb-6 flex-grow opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100 font-light">
          {evt.desc}
        </p>
        <div className="pt-6 border-t border-[#F5F1EA]/20 mt-auto translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-150">
          <span className="font-sans text-xs text-[#F5F1EA]/60 tracking-wider">
            {evt.time}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
