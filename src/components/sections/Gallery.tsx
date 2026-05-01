import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';

export default function Gallery() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const headingY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  
  // Parallax values for different columns
  const col1Y = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);
  const col2Y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
  const col3Y = useTransform(scrollYProgress, [0, 1], ["30%", "-30%"]);
  const col4Y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  const images = [
    "https://lh3.googleusercontent.com/gps-cs-s/APNQkAEfKbsYyjL_qI53L8cZXocHovgNhNeJT25_Zm6Dxl8SX0tSyC7b0Y4meDoXBa00EGWw3YHmoJZdcGY_xSo62BbipCxUmY6qIqEVNcT6jHSQJwhJz4b0DPnHLJK1O6aoWXdaBHA=w640-h640-n-k-no",
    "https://lh3.googleusercontent.com/gps-cs-s/APNQkAGB1_7iwrPaOO7f70QK120J6AoPU2LUDaSFk8Ty06xRnY5rVacJyKkNmP1bxxZtLdn4tbfqtyfSC7fYYDvk75TmdvEW9g0i_1JJUpOscZ0M9N0Q6ZPuMYxpjz0sKzkYIjsisVgZ=w640-h640-n-k-no",
    "https://lh3.googleusercontent.com/gps-cs-s/APNQkAE6ZAuN9BnA3enPT6YZVKls_BwtVbmJEDlyl8Fa0_MDBBhyumHv9uTfV8usicxUciFMgG-lgtviqunPag-L4Ri9LUMjHAWn0K6y0XK8t2TdQ3TZdWFlUIXtczW7SYREFtbdlQc=w640-h640-n-k-no",
    "https://lh3.googleusercontent.com/gps-cs-s/APNQkAFLZF7YZlJ5vqivCtT8KPFtfTbLZRbaKvfsa_ELbgbfaSM6f1-njwQ7DSpzjSMGCNzOAr_LlYpHIWX_207CWRy56v60nQJWOVk3dw0uyj1JZRVEjTgv8JhJR9yqD7lVhFe_vNN1=w640-h640-n-k-no",
    "https://lh3.googleusercontent.com/gps-cs-s/APNQkAHBrzyoUe4KQcOiBwuUD1IV2xiwMSemYR5DL4wzCUBbi6HS1UHzihH0nnobRdyDIcNUKRICHKSzJWFvLfFLAUpaIBBbOXBJrn2yEMDr39U6_yX4IS3jTZ4tNXA0qciTMnXmORGuUw=w640-h640-n-k-no",
    "https://lh3.googleusercontent.com/gps-cs-s/APNQkAElCaADgnKPSS1bqRQaHqgB4SbfLXP31B9Krc6sPSww258mSzeLBzQxB7U3XCswFAzxqK9lty-0ZPiCy8IdHHOh1jvYqOx2miQJw7CGiWXBV3xiIFYZNR8yNppN3LG8998RxwZJJg=w640-h640-n-k-no",
    "https://lh3.googleusercontent.com/gps-cs-s/APNQkAFFtGUkCQYqeiiTnf5YZTq3zXToRvG6eS4TUjxZkcsw44BVfFb2i1EJIuqsIHU-JZD2LqHAx8HLQ8UESZsM3kcYyS8PZTgBcTxPXcXO0CLgrlU9uLrW2qlkFX-jbRQiIL5LK0VW=w640-h640-n-k-no",
    "https://lh3.googleusercontent.com/gps-cs-s/APNQkAGJ8wtoCrMdPkrAXowSIi0p3IoEMDk4sAqscbCfSdgO2VNg8OziVvjI3e1c1nz6oOFHuhKOVzAn3aqrEaAeDusKjKPekPOXjo-2zXSBvOSaZXe2l_lD8HsNCAC68FCJcNDxIWn2Wg=w640-h640-n-k-no"
  ];

  return (
    <section id="gallery" ref={ref} className="py-20 md:py-32 bg-[#141414] overflow-hidden relative">
      <div className="absolute inset-0 bg-[#1E3328]/5 z-0" />
      
      <motion.div style={{ y: headingY }} className="flex flex-col items-center justify-center px-6 md:px-12 mb-12 md:mb-20 max-w-7xl mx-auto relative z-10 text-center">
        <span className="font-sans text-[10px] tracking-[0.4em] uppercase text-[#B6915E] block mb-3 md:mb-4">See & Be Seen</span>
        <h2 className="font-serif text-4xl md:text-7xl font-light text-[#F5F1EA]">Atmosphere</h2>
      </motion.div>
      
      <div className="flex w-full h-[60vh] md:h-[80vh] overflow-hidden relative z-10 gap-3 md:gap-4 px-4 sm:px-8">
        {[col1Y, col2Y, col3Y, col4Y].map((yVal, i) => (
          <motion.div 
            key={i}
            style={{ y: yVal }}
            className={`w-1/2 md:w-1/4 h-[120%] flex flex-col gap-3 md:gap-4 ${i % 2 !== 0 ? '-translate-y-12 md:-translate-y-24' : 'translate-y-6 md:translate-y-12'} ${i >= 2 ? 'hidden md:flex' : 'flex'}`}
          >
             <div className="w-full h-full relative rounded-2xl overflow-hidden group">
               <div className="absolute inset-0 bg-[#141414]/30 group-hover:bg-transparent transition-colors z-10 duration-700" />
               <img 
                 src={images[i * 2]} 
                 alt={`Gallery Atmosphere ${i * 2 + 1}`} 
                 className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out grayscale-[30%] group-hover:grayscale-0"
               />
             </div>
             <div className="w-full h-full relative rounded-2xl overflow-hidden group">
               <div className="absolute inset-0 bg-[#141414]/30 group-hover:bg-transparent transition-colors z-10 duration-700" />
               <img 
                 src={images[i * 2 + 1]} 
                 alt={`Gallery Atmosphere ${i * 2 + 2}`} 
                 className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out grayscale-[30%] group-hover:grayscale-0"
               />
             </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-24 flex justify-center relative z-20">
        <Link 
          to="/gallery"
          className="px-12 py-5 font-sans text-xs tracking-[0.3em] uppercase border border-[#B6915E] text-[#B6915E] hover:bg-[#B6915E] hover:text-[#141414] transition-all rounded-full"
        >
          Explore Full Gallery
        </Link>
      </div>
    </section>
  );
}
