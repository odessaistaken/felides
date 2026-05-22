import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

const clients = [
  'Acme Corp', 'GlobalTech', 'Nexus Industries', 'Stark Industries',
  'Wayne Enterprises', 'Oscorp', 'Cyberdyne', 'Umbrella Corp',
];

/**
 * Clients — infinite marquee powered by GSAP (replaces CSS @keyframes).
 *
 * Advantages over CSS animation:
 *  - Hover slows down the marquee via timeScale tween (not possible in CSS)
 *  - GSAP manages the RAF, so it can be paused/reversed programmatically
 *  - Perfectly smooth because GSAP uses the same RAF loop as all other animations
 *
 * The track is duplicated in the DOM (two sets of items).
 * xPercent: -50 moves it exactly one full copy width, creating a seamless loop.
 */
const Clients = () => {
  const containerRef = useRef(null);
  const trackRef     = useRef(null);

  useGSAP(() => {
    // Infinite marquee: moves exactly 50% of track width (= one set of items)
    const marquee = gsap.to(trackRef.current, {
      xPercent: -50,
      repeat:   -1,
      ease:     'none',
      duration: 30,
    });

    // Hover: slow the marquee to 30% speed
    const slowDown = () =>
      gsap.to(marquee, { timeScale: 0.3, duration: 0.5, overwrite: true });
    // Leave: restore full speed with a gentle ease-in
    const speedUp  = () =>
      gsap.to(marquee, { timeScale: 1,   duration: 0.8, overwrite: true });

    const el = containerRef.current;
    el.addEventListener('mouseenter', slowDown);
    el.addEventListener('mouseleave', speedUp);

    return () => {
      el.removeEventListener('mouseenter', slowDown);
      el.removeEventListener('mouseleave', speedUp);
    };
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      className="py-24 bg-zinc-950 overflow-hidden relative border-y border-zinc-900"
      aria-label="Referanslarımız"
    >
      {/* Edge gradient fades */}
      <div className="absolute top-0 bottom-0 left-0  w-32 bg-gradient-to-r from-zinc-950 to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 bottom-0 right-0 w-32 bg-gradient-to-l from-zinc-950 to-transparent z-10 pointer-events-none" />

      <div className="flex w-full">
        {/*
         * Track — NO animate-marquee CSS class.
         * GSAP's xPercent animation takes full ownership of the transform.
         */}
        <div ref={trackRef} className="flex whitespace-nowrap">
          {clients.map((client, i) => (
            <div key={i} className="flex items-center justify-center min-w-[250px] mx-8">
              <span className="text-2xl md:text-4xl font-black text-zinc-800 uppercase tracking-widest hover:text-white transition-colors duration-500 cursor-default">
                {client}
              </span>
            </div>
          ))}
          {/* Duplicate set for seamless loop */}
          {clients.map((client, i) => (
            <div key={`dup-${i}`} className="flex items-center justify-center min-w-[250px] mx-8">
              <span className="text-2xl md:text-4xl font-black text-zinc-800 uppercase tracking-widest hover:text-white transition-colors duration-500 cursor-default">
                {client}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Clients;
