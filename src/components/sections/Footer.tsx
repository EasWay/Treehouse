import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { RestaurantData } from '../../services/dataService';
import { DottedMap } from '../magicui/dotted-map';

interface FooterProps {
  onReserve: () => void;
  data: RestaurantData | null;
}

export default function Footer({ onReserve, data }: FooterProps) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"]
  });

  const footerY = useTransform(scrollYProgress, [0, 1], ["50%", "0%"]);

  return (
    <motion.footer style={{ y: footerY }} ref={ref} className="bg-[#101010] relative pt-16 md:pt-24 pb-8 md:pb-12 px-6 md:px-12 border-t border-[#F5F1EA]/5 overflow-hidden">
      <DottedMap />
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-16 mb-16 md:mb-24 relative z-10">
        
        {/* Brand */}
        <div className="lg:col-span-1">
          <h2 className="font-serif text-3xl tracking-widest text-[#F5F1EA] mb-6">{data?.name || 'TREEHOUSE'}</h2>
          <p className="font-sans text-sm text-[#F5F1EA]/50 leading-relaxed mb-8">
            An elevated botanical dining escape in the heart of Accra.
          </p>
          <button 
            onClick={onReserve}
            className="px-6 py-3 font-sans text-[10px] tracking-widest uppercase border border-[#B6915E] text-[#B6915E] hover:bg-[#B6915E] hover:text-[#101010] transition-colors rounded-full"
          >
            Reserve Now
          </button>
        </div>

        {/* Location */}
        <div>
          <h3 className="font-sans text-xs tracking-[0.2em] uppercase text-[#B6915E] mb-6">Location</h3>
          <address className="not-italic font-sans text-sm text-[#F5F1EA]/60 leading-loose whitespace-pre-line">
            {data?.address || 'Plot 1, West Light Industrial Area\nNyaniba Estates, Osu\nAccra, Ghana'}
          </address>
          <a href="https://maps.app.goo.gl/ffXgKPvFvyK4BjrS6" target="_blank" rel="noopener noreferrer" className="font-sans text-xs text-[#F5F1EA]/40 hover:text-[#F5F1EA] transition-colors mt-4 inline-block tracking-wider uppercase border-b border-[#F5F1EA]/20 pb-1">
            Open in Google Maps
          </a>
        </div>

        {/* Hours */}
        <div>
           <h3 className="font-sans text-xs tracking-[0.2em] uppercase text-[#B6915E] mb-6">Hours</h3>
           <ul className="font-sans text-sm text-[#F5F1EA]/60 space-y-4">
             {data ? (
               Object.entries(data.hours).slice(0, 7).map(([day, time]) => (
                 <li key={day} className="flex justify-between gap-4 text-[13px]">
                   <span>{day}</span>
                   <span className="text-right">{time as string}</span>
                 </li>
               ))
             ) : (
               <li className="text-xs opacity-40 italic">Loading hours...</li>
             )}
           </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-sans text-xs tracking-[0.2em] uppercase text-[#B6915E] mb-6">Concierge</h3>
          <ul className="font-sans text-sm text-[#F5F1EA]/60 space-y-4 mb-8">
            <li>
              <a href={`tel:${data?.phone}`} className="hover:text-[#F5F1EA] transition-colors">{data?.phone || '+233 20 891 4333'}</a>
            </li>
            <li>
              <a href="mailto:info@treehouseaccra.com" className="hover:text-[#F5F1EA] transition-colors">info@treehouseaccra.com</a>
            </li>
          </ul>
          <a 
            href={`https://wa.me/${data?.phone?.replace(/\s+/g, '')}`} 
            className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-[#1E3328]/30 border border-[#1E3328] text-green-400 rounded-full hover:bg-[#1E3328]/80 hover:text-green-300 transition-colors"
          >
            <span className="font-sans text-xs tracking-widest uppercase">WhatsApp Concierge</span>
          </a>
        </div>

      </div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center pt-8 border-t border-[#F5F1EA]/10 text-[#F5F1EA]/30 font-sans text-xs tracking-wider relative z-10">
        <p>&copy; {new Date().getFullYear()} {data?.name || 'Treehouse Restaurant'}. All Rights Reserved.</p>
        <div className="flex gap-6 mt-4 md:mt-0">
          <a href={data?.socials[0] || "#"} target="_blank" rel="noopener noreferrer" className="hover:text-[#F5F1EA] transition-colors">Instagram</a>
          <a href="#" className="hover:text-[#F5F1EA] transition-colors">Booking Policies</a>
          <a href="#" className="hover:text-[#F5F1EA] transition-colors">Dress Code</a>
        </div>
      </div>
    </motion.footer>
  );
}
