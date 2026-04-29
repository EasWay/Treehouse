interface FooterProps {
  onReserve: () => void;
}

export default function Footer({ onReserve }: FooterProps) {
  return (
    <footer className="bg-tree-charcoal pt-24 pb-12 px-6 md:px-12 border-t border-tree-ivory/5">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
        
        {/* Brand */}
        <div className="lg:col-span-1">
          <h2 className="font-serif text-3xl tracking-widest text-tree-ivory mb-6">TREEHOUSE</h2>
          <p className="font-sans text-sm text-white/50 leading-relaxed mb-8">
            An elevated botanical dining escape in the heart of Accra.
          </p>
          <button 
            onClick={onReserve}
            className="px-6 py-3 font-sans text-[10px] tracking-widest uppercase border border-tree-brass text-tree-brass hover:bg-tree-brass hover:text-[#050505] transition-colors rounded-full"
          >
            Reserve Now
          </button>
        </div>

        {/* Location */}
        <div>
          <h3 className="font-sans text-xs tracking-[0.2em] uppercase text-tree-brass mb-6">Location</h3>
          <address className="not-italic font-sans text-sm text-white/60 leading-loose">
            12 Independence Avenue<br />
            Cantonments, Accra<br />
            Ghana
          </address>
          <a href="#" className="font-sans text-xs text-white/40 hover:text-tree-ivory transition-colors mt-4 inline-block tracking-wider uppercase border-b border-white/20 pb-1">
            Get Directions
          </a>
        </div>

        {/* Hours */}
        <div>
           <h3 className="font-sans text-xs tracking-[0.2em] uppercase text-tree-brass mb-6">Hours</h3>
           <ul className="font-sans text-sm text-white/60 space-y-4">
             <li className="flex justify-between">
               <span>Tue - Thu</span>
               <span>5pm - 11pm</span>
             </li>
             <li className="flex justify-between">
               <span>Fri - Sat</span>
               <span>5pm - 1am</span>
             </li>
             <li className="flex justify-between">
               <span>Sunday</span>
               <span>11am - 4pm<br/><span className="text-xs text-white/40">(Brunch Only)</span></span>
             </li>
             <li className="flex justify-between text-white/40">
               <span>Monday</span>
               <span>Closed</span>
             </li>
           </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-sans text-xs tracking-[0.2em] uppercase text-tree-brass mb-6">Concierge</h3>
          <ul className="font-sans text-sm text-white/60 space-y-4 mb-8">
            <li>
              <a href="tel:+233240000000" className="hover:text-tree-ivory transition-colors">+233 24 000 0000</a>
            </li>
            <li>
              <a href="mailto:reservations@treehouse.com" className="hover:text-tree-ivory transition-colors">reservations@treehouse.com</a>
            </li>
          </ul>
          <a 
            href="#" 
            className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-[#1e2a24] text-[#25d366] rounded-full hover:bg-[#25603a] hover:text-white transition-colors"
          >
            <span className="font-sans text-xs tracking-widest uppercase">WhatsApp Concierge</span>
          </a>
        </div>

      </div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10 text-white/30 font-sans text-xs tracking-wider">
        <p>&copy; {new Date().getFullYear()} Treehouse Restaurant. All Rights Reserved.</p>
        <div className="flex gap-6 mt-4 md:mt-0">
          <a href="#" className="hover:text-white/70 transition-colors">Instagram</a>
          <a href="#" className="hover:text-white/70 transition-colors">Booking Policies</a>
          <a href="#" className="hover:text-white/70 transition-colors">Dress Code</a>
        </div>
      </div>
    </footer>
  );
}
