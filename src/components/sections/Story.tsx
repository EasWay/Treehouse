import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { BlurFade } from '../magicui/blur-fade';

import { PixelImage } from '../magicui/pixel-image';

export default function Story() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const imgRotateY = useTransform(scrollYProgress, [0, 1], [15, -15]);
  const imgZ = useTransform(scrollYProgress, [0, 1], [-100, 50]);
  const textTranslate = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const badgeRotate = useTransform(scrollYProgress, [0, 1], [0, 180]);
  
  // Opacity variations for a text reveal effect
  const textOpacity = useTransform(scrollYProgress, [0, 0.3, 0.6, 1], [0, 1, 1, 0]);

  return (
    <section id="story" ref={ref} className="py-24 px-6 md:px-12 bg-[#141414] relative overflow-hidden">
      
      {/* Huge background text */}
      <motion.div 
        style={{ x: textTranslate }}
        className="absolute top-[20%] left-0 whitespace-nowrap opacity-[0.03] font-serif text-[25vw] leading-none z-0 pointer-events-none text-[#F5F1EA]"
      >
        HIDDEN OASIS 
      </motion.div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-center">
          
          <div className="relative aspect-[3/4] md:aspect-[4/5] w-full max-w-md mx-auto lg:max-w-none overflow-hidden group rounded-t-[200px] border border-[#B6915E]/20">
            <motion.div 
              style={{ scale: imgScale, rotateY: imgRotateY, z: imgZ }}
              className="w-full h-full transform-gpu"
            >
              <div className="absolute inset-0 bg-[#1E3328]/30 z-10 mix-blend-overlay pointer-events-none" />
              <PixelImage 
                src="https://lh3.googleusercontent.com/gps-cs-s/APNQkAHpohZ1i6ca4eSWrVDrLfXUlMkiuUKhdG4q6Cr89rdTDuZh5wrmzbFBXU3AaSnpQhZnfQztTWeHh5kMYt_YuuiDtx9oxrb70eMP9QZTAKc83BBJlc-VgAc9YJGkaXZvyGRS4DBCcPbrJWS9=w1200-h800-k-no"
                grid="8x8"
                className="w-full h-full"
              />
            </motion.div>
            
            {/* Decorative badge */}
            <motion.div 
              style={{ rotate: badgeRotate }}
              className="absolute bottom-8 right-8 w-32 h-32 bg-[#141414] border border-[#B6915E]/30 rounded-full flex items-center justify-center z-20 backdrop-blur-md shadow-xl"
            >
              <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-center text-[#B6915E] leading-relaxed">
                Est.<br/>Accra
              </p>
            </motion.div>
          </div>

          <motion.div 
            style={{ opacity: textOpacity }}
            className="flex flex-col justify-center perspective-[1000px]"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-px bg-[#B6915E]" />
              <span className="font-sans text-xs tracking-[0.2em] uppercase text-[#B6915E] font-medium">Our Philosophy</span>
            </div>
            
            <BlurFade delay={0.25} inView>
              <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl font-light leading-tight mb-8 tracking-tight text-[#F5F1EA]">
                An Oasis <br/>
                <span className="italic text-[#F5F1EA]/70">Above</span> The City
              </h2>
            </BlurFade>
            
            <div className="font-sans text-sm md:text-base leading-relaxed text-[#F5F1EA]/60 space-y-6 font-light">
              <BlurFade delay={0.25 * 2} inView>
                <p>
                  Nestled within the vibrant heart of Accra, Treehouse is more than a restaurant—it's an immersive 
                  escape. We've curated an environment where the boundaries between indoor luxury and outdoor serenity blur.
                </p>
              </BlurFade>
              <BlurFade delay={0.25 * 3} inView>
                <p>
                  Surrounded by verdant foliage and illuminated by warm, cascading lights, every corner is designed 
                  to evoke a sense of quiet exclusivity. Our menu offers a sophisticated take on international cuisine, 
                  blending bold, familiar flavors with elegant presentation.
                </p>
              </BlurFade>
              <BlurFade delay={0.25 * 4} inView>
                <p>
                  Whether it is an intimate date night or a lively weekend gathering, Treehouse provides the perfect 
                  backdrop for unforgettable evenings.
                </p>
              </BlurFade>
            </div>

            <div className="mt-12 flex items-center gap-8">
              <BlurFade delay={0.25 * 5} inView className="flex flex-col">
                <span className="font-serif text-3xl text-[#F5F1EA] mb-1 italic">Evening</span>
                <span className="font-sans text-[10px] tracking-widest uppercase text-[#F5F1EA]/40">Atmosphere</span>
              </BlurFade>
              <BlurFade delay={0.25 * 5.5} inView>
                <div className="w-px h-12 bg-white/10" />
              </BlurFade>
              <BlurFade delay={0.25 * 6} inView className="flex flex-col">
                <span className="font-serif text-3xl text-[#F5F1EA] mb-1 italic">Global</span>
                <span className="font-sans text-[10px] tracking-widest uppercase text-[#F5F1EA]/40">Cuisine</span>
              </BlurFade>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
