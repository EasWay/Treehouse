import React from 'react';
import { Marquee } from '../magicui/marquee';

const reviews = [
  {
    name: "Kaylin M",
    body: "This is not food it is art! Each ingredient complements each other well. My squid salad was very refreshing.",
    img: "https://avatar.vercel.sh/kaylin",
  },
  {
    name: "Sandra Dery",
    body: "This place is a solid 10/10 from the customer service to the food. The perfect place for an intimate fine dining experience.",
    img: "https://avatar.vercel.sh/sandra",
  },
  {
    name: "Margeli J",
    body: "The food tastes great — no notes on flavor. Everything is well-cooked, well-seasoned, and clearly made with love.",
    img: "https://avatar.vercel.sh/margeli",
  },
  {
    name: "Emerge Enterprises",
    body: "Treehouse has the best cuisine and amazing vibes! Absolutely love it! It’s a must-have while you’re in town!",
    img: "https://avatar.vercel.sh/emerge",
  },
  {
    name: "Joshua Armstrong",
    body: "Peaceful and beautiful under the big tree. My steak was cooked perfectly and the wine was lovely.",
    img: "https://avatar.vercel.sh/joshua",
  },
  {
    name: "N Ade",
    body: "I truly enjoyed the service here. It was at a relaxed pace, but very attentive. Food was delicious.",
    img: "https://avatar.vercel.sh/nade",
  },
];

const ReviewCard = ({
  img,
  name,
  body,
}: {
  img: string;
  name: string;
  body: string;
}) => {
  return (
    <figure className="relative w-80 cursor-pointer overflow-hidden rounded-xl border p-6 border-[#F5F1EA]/10 bg-[#1E3328]/20 hover:bg-[#1E3328]/40 transition-colors">
      <div className="flex flex-row items-center gap-4">
        <img className="rounded-full" width="48" height="48" alt="" src={img} />
        <div className="flex flex-col">
          <figcaption className="text-lg font-serif font-medium text-[#F5F1EA]">
            {name}
          </figcaption>
          <div className="flex text-[#B6915E] text-xs mt-1">
            {"★".repeat(5)}
          </div>
        </div>
      </div>
      <blockquote className="mt-4 text-sm text-[#F5F1EA]/70 leading-relaxed font-sans">{body}</blockquote>
    </figure>
  );
};

export default function Reviews() {
  return (
    <section className="relative w-full py-24 bg-[#141414] overflow-hidden border-t border-[#F5F1EA]/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-16 text-center">
        <h2 className="text-4xl md:text-5xl font-serif font-light tracking-wide mb-6">
          Whispers from the <span className="text-[#B6915E] italic">Canopy</span>
        </h2>
        <p className="text-[#F5F1EA]/70 max-w-2xl mx-auto font-sans tracking-wide">
          What our guests are saying about their dining experience.
        </p>
      </div>

      <div className="relative flex w-full flex-col items-center justify-center overflow-hidden gap-4">
        <Marquee pauseOnHover className="[--duration:40s]">
          {reviews.slice(0, 3).map((review) => (
            <ReviewCard key={review.name} {...review} />
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover className="[--duration:45s]">
          {reviews.slice(3, 6).map((review) => (
            <ReviewCard key={review.name} {...review} />
          ))}
        </Marquee>
        
        {/* Gradients to fade out the edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-[#141414]"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-[#141414]"></div>
      </div>
    </section>
  );
}
