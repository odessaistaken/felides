import { useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Menu, X } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Navbar — GSAP-driven hide/show on scroll direction.
 *
 * Design decisions:
 *  - No React state for scroll position → zero re-renders during scroll.
 *  - A separate "bgLayerRef" div handles the glassmorphism bg so we can
 *    GSAP-fade it independently from the hide/show yPercent animation.
 *  - overwrite: true prevents queued tweens from fighting each other when
 *    the user rapidly reverses scroll direction.
 */
const Navbar = () => {
  const navRef    = useRef(null);
  const bgLayerRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useGSAP(() => {
    // Set initial transform state explicitly so GSAP has a baseline
    gsap.set(navRef.current, { yPercent: 0 });

    ScrollTrigger.create({
      start: 'top top-=1',
      end: 'max',
      onUpdate(self) {
        const scrolled = self.scroll() > 80;

        // ── Background glass layer fades in once user has scrolled 80px ──
        gsap.to(bgLayerRef.current, {
          opacity: scrolled ? 1 : 0,
          duration: 0.4,
          overwrite: true,
        });

        // ── Hide/show based on scroll direction ──
        if (scrolled) {
          if (self.direction === 1) {
            // Scrolling DOWN → slide navbar out above viewport
            gsap.to(navRef.current, {
              yPercent: -110,
              duration: 0.38,
              ease: 'power2.in',
              overwrite: true,
            });
          } else {
            // Scrolling UP → bring navbar back in
            gsap.to(navRef.current, {
              yPercent: 0,
              duration: 0.5,
              ease: 'power3.out',
              overwrite: true,
            });
          }
        } else {
          // Always visible at the top of the page
          gsap.to(navRef.current, {
            yPercent: 0,
            duration: 0.3,
            overwrite: true,
          });
        }
      },
    });
  }, { scope: navRef });

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 w-full z-50 py-6"
      style={{ willChange: 'transform' }}
    >
      {/* ── GSAP-controlled glassmorphism background ── */}
      <div
        ref={bgLayerRef}
        className="absolute inset-0 bg-black/50 backdrop-blur-md opacity-0 pointer-events-none"
        aria-hidden="true"
      />

      {/* ── Nav content ── */}
      <div className="relative container mx-auto px-6 md:px-12 flex justify-between items-center">
        <div className="text-2xl font-bold tracking-tighter">
          FELIDES<span className="text-zinc-500">.</span>
        </div>

        {/* Desktop links */}
        <div className="hidden md:flex gap-8 text-sm font-medium tracking-wide">
          <a href="#services" className="hover:text-zinc-400 transition-colors">HİZMETLER</a>
          <a href="#"         className="hover:text-zinc-400 transition-colors">REFERANSLAR</a>
          <a href="#"         className="hover:text-zinc-400 transition-colors">İLETİŞİM</a>
        </div>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menüyü aç/kapat"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-black/90 backdrop-blur-lg border-t border-zinc-800 flex flex-col p-6 gap-6">
          <a href="#services" className="text-lg font-medium tracking-wide">HİZMETLER</a>
          <a href="#"         className="text-lg font-medium tracking-wide">REFERANSLAR</a>
          <a href="#"         className="text-lg font-medium tracking-wide">İLETİŞİM</a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
