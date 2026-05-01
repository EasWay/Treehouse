import React, { useState, useEffect } from 'react';
import Hero from '../components/sections/Hero';
import Story from '../components/sections/Story';
import SignatureDishes from '../components/sections/SignatureDishes';
import Gallery from '../components/sections/Gallery';
import Events from '../components/sections/Events';
import Reviews from '../components/sections/Reviews';
import { getRestaurantData, RestaurantData } from '../services/dataService';
import ReservationModal from '../components/ReservationModal';
import { AnimatePresence } from 'framer-motion';

export default function Home() {
  const [data, setData] = useState<RestaurantData | null>(null);
  const [isReservationOpen, setIsReservationOpen] = useState(false);

  useEffect(() => {
    getRestaurantData().then(setData).catch(console.error);
  }, []);

  return (
    <>
      <Hero onReserve={() => setIsReservationOpen(true)} data={data} />
      <Story />
      <SignatureDishes data={data} />
      <Gallery />
      <Events />
      <div id="reviews">
        <Reviews />
      </div>

      <AnimatePresence>
        {isReservationOpen && (
          <ReservationModal onClose={() => setIsReservationOpen(false)} />
        )}
      </AnimatePresence>
    </>
  );
}
