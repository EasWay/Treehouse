import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Instagram, Facebook } from 'lucide-react';
import { getRestaurantData, RestaurantData } from '../services/dataService';

export default function About() {
  const [data, setData] = useState<RestaurantData | null>(null);

  useEffect(() => {
    getRestaurantData().then(setData).catch(console.error);
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#141414] pt-24 md:pt-32 pb-16 md:pb-24 px-6 md:px-12 bg-noise">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-serif text-4xl md:text-7xl text-[#F5F1EA] mb-6 md:mb-8 tracking-tight">Our Story</h1>
            <div className="space-y-4 md:space-y-6 font-sans text-[#F5F1EA]/70 leading-relaxed text-base md:text-lg">
              {data ? data.story.split('\n\n').map((para, i) => (
                <p key={i}>{para}</p>
              )) : (
                <div className="space-y-4">
                  <div className="h-4 bg-white/5 rounded w-full animate-pulse" />
                  <div className="h-4 bg-white/5 rounded w-5/6 animate-pulse" />
                  <div className="h-4 bg-white/5 rounded w-4/6 animate-pulse" />
                </div>
              )}
            </div>

            <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="font-sans text-xs tracking-[0.2em] uppercase text-[#B6915E]">Contact</h3>
                <div className="flex items-center gap-3 text-[#F5F1EA]/80">
                  <Phone className="w-4 h-4 text-[#B6915E]" />
                  <span>{data?.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-[#F5F1EA]/80">
                  <MapPin className="w-4 h-4 text-[#B6915E]" />
                  <span className="text-sm">{data?.address}</span>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="font-sans text-xs tracking-[0.2em] uppercase text-[#B6915E]">Socials</h3>
                <div className="flex items-center gap-4">
                  {data?.socials[0] && <a href={data.socials[0]} target="_blank" rel="noopener noreferrer" className="text-[#F5F1EA]/60 hover:text-[#B6915E] transition-colors"><Instagram className="w-6 h-6" /></a>}
                  {data?.socials[1] && <a href={data.socials[1]} target="_blank" rel="noopener noreferrer" className="text-[#F5F1EA]/60 hover:text-[#B6915E] transition-colors"><Facebook className="w-6 h-6" /></a>}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Business Info / Map */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8 md:space-y-12"
          >
            {/* Map Placeholder/Embed */}
            <div className="aspect-video w-full bg-white/5 rounded-2xl overflow-hidden border border-[#F5F1EA]/10 relative group">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3971.0116812836!2d-0.17937372391060417!3d5.565297394415!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdf91435a310c15%3A0x3c7c14eef2e15d4c!2sTreehouse%20Restaurant!5e0!3m2!1sen!2sgh!4v1714500000000!5m2!1sen!2sgh" 
                width="100%" 
                height="100%" 
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) brightness(0.6)' }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
              <div className="absolute top-4 left-4 px-4 py-2 bg-[#141414]/90 backdrop-blur-md rounded-lg border border-[#B6915E]/30 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#B6915E]" />
                <span className="text-xs uppercase tracking-widest text-[#F5F1EA]">Nyaniba, Accra</span>
              </div>
            </div>

            {/* Opening Hours */}
            <div className="p-8 border border-[#F5F1EA]/10 bg-white/5 rounded-2xl">
              <h3 className="font-sans text-xs tracking-[0.2em] uppercase text-[#B6915E] mb-8 flex items-center gap-2">
                <Clock className="w-4 h-4" /> Opening Hours
              </h3>
              <div className="space-y-4">
                {data ? Object.entries(data.hours).map(([day, time]) => (
                  <div key={day} className="flex justify-between items-center pb-4 border-b border-[#F5F1EA]/5 last:border-0 last:pb-0">
                    <span className="font-sans text-sm text-[#F5F1EA]/60 uppercase tracking-widest">{day}</span>
                    <span className="font-sans text-sm text-[#F5F1EA] font-medium">{time}</span>
                  </div>
                )) : <p className="text-sm opacity-40">Loading hours...</p>}
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
