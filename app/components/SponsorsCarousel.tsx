'use client';

import { useEffect, useRef } from 'react';

const sponsors = [
  '/sponsors/joola.jpeg',
  '/sponsors/mormaii.png',
  '/sponsors/masasport.png',
  '/sponsors/cbp.jpg',
];

export default function SponsorsCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let scrollAmount = 0;

    const interval = setInterval(() => {
      scrollAmount += 1;
      container.scrollLeft = scrollAmount;

      if (scrollAmount >= container.scrollWidth / 2) {
        scrollAmount = 0;
      }
    }, 25);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="overflow-hidden pt-4 pb-0 bg-white">
      <div
        ref={scrollRef}
        className="flex gap-10 whitespace-nowrap overflow-hidden"
      >
        {[...sponsors, ...sponsors].map((logo, index) => (
          <img
            key={index}
            src={logo}
            alt="Patrocinador"
            className="h-6 object-contain"
          />
        ))}
      </div>
    </div>
  );
}
