import { Utensils, CalendarDays, MapPin, Phone, Music, Shirt } from 'lucide-react';
import { Dock, DockIcon, DockSeparator } from './magicui/dock';

interface StickyBottomBarProps {
  onReserve: () => void;
}

export default function StickyBottomBar({ onReserve }: StickyBottomBarProps) {
  const handleReserve = () => {
    // This is the default handler, but we can override it if needed
    onReserve();
  };

  return (
    <div className="fixed bottom-4 md:bottom-6 left-0 right-0 z-40 flex justify-center pointer-events-none">
      <div className="pointer-events-auto">
        <Dock distance={100} magnification={40} className="p-2 md:p-3 bg-[#141414]/80 backdrop-blur-lg border border-white/10">
          <DockIcon label="Music" onClick={() => window.location.hash = "#events"} className="hidden sm:flex">
            <Music className="w-4 h-4 md:w-5 md:h-5" />
          </DockIcon>
          <DockIcon label="Dress Code" onClick={() => window.location.hash = "#footer"} className="hidden sm:flex">
            <Shirt className="w-4 h-4 md:w-5 md:h-5" />
          </DockIcon>
          <DockIcon label="Menu" onClick={() => window.location.pathname = "/menu"}>
            <Utensils className="w-4 h-4 md:w-5 md:h-5" />
          </DockIcon>
          
          <DockSeparator className="hidden sm:block" />
 
          <DockIcon label="Reserve" onClick={handleReserve}>
            <CalendarDays className="w-4 h-4 md:w-5 md:h-5" />
          </DockIcon>
          <DockIcon label="Map" onClick={() => window.open("https://maps.app.goo.gl/ffXgKPvFvyK4BjrS6", "_blank")}>
            <MapPin className="w-4 h-4 md:w-5 md:h-5" />
          </DockIcon>
          <DockIcon label="Call" onClick={() => window.location.href = "tel:+233208914333"}>
            <Phone className="w-4 h-4 md:w-5 md:h-5" />
          </DockIcon>
        </Dock>
      </div>
    </div>
  );
}
