import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Footer — scroll-triggered reveal animations.
 *
 * Animations:
 *  1. Brand title  : slides up from y:60 and fades in on viewport entry.
 *  2. Description  : same, slightly delayed.
 *  3. Link columns : staggered y:20 → 0 fade-in (0.06s between each).
 *  4. Bottom border: scaleX 0 → 1 draw effect (left-to-right line reveal).
 *
 * All animations use toggleActions:'play none none reverse' so they
 * replay cleanly if the user scrolls back up past the footer.
 */
const Footer = () => {
  const footerRef   = useRef(null);
  const titleRef    = useRef(null);
  const descRef     = useRef(null);
  const borderRef   = useRef(null);

  useGSAP(() => {
    const commonTrigger = {
      trigger:       footerRef.current,
      start:         'top 82%',
      toggleActions: 'play none none reverse',
    };

    // 1. Brand title slides up
    gsap.from(titleRef.current, {
      y: 70,
      opacity: 0,
      duration: 1.2,
      ease: 'power3.out',
      scrollTrigger: commonTrigger,
    });

    // 2. Description fades in after title
    gsap.from(descRef.current, {
      y: 30,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      delay: 0.12,
      scrollTrigger: commonTrigger,
    });

    // 3. All footer links stagger in
    const links = gsap.utils.toArray('.footer-link', footerRef.current);
    gsap.from(links, {
      y: 20,
      opacity: 0,
      stagger: 0.06,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger:       footerRef.current,
        start:         'top 76%',
        toggleActions: 'play none none reverse',
      },
    });

    // 4. Bottom border draws left → right
    gsap.from(borderRef.current, {
      scaleX: 0,
      transformOrigin: 'left center',
      duration: 1.6,
      ease: 'power2.out',
      scrollTrigger: {
        trigger:       borderRef.current,
        start:         'top 90%',
        toggleActions: 'play none none reverse',
      },
    });
  }, { scope: footerRef });

  return (
    <footer
      ref={footerRef}
      className="bg-black text-white pt-24 pb-12 border-t border-zinc-900"
    >
      <div className="container mx-auto px-6 md:px-12 flex flex-col gap-16">

        {/* ── Top section: brand + links ─────────────────────────── */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-12">

          <div className="max-w-md">
            <div ref={titleRef} className="text-3xl font-bold tracking-tighter mb-6">
              FELIDES<span className="text-zinc-500">.</span>
            </div>
            <p ref={descRef} className="text-zinc-400 text-lg">
              Sınırları aşan dijital deneyimler tasarlıyoruz. Fikriniz mi var? Hadi konuşalım.
            </p>
          </div>

          <div className="flex flex-wrap gap-16">
            <div className="flex flex-col gap-4">
              <h4 className="footer-link font-semibold text-zinc-300 uppercase tracking-wider text-sm mb-2">
                İletişim
              </h4>
              <a
                href="mailto:hello@felides.com"
                className="footer-link text-zinc-400 hover:text-white transition-colors"
              >
                hello@felides.com
              </a>
              <p className="footer-link text-zinc-400">+90 (555) 123 45 67</p>
            </div>

            <div className="flex flex-col gap-4">
              <h4 className="footer-link font-semibold text-zinc-300 uppercase tracking-wider text-sm mb-2">
                Sosyal
              </h4>
              <a href="#" className="footer-link text-zinc-400 hover:text-white transition-colors flex items-center gap-1">
                Instagram <ArrowUpRight size={14} />
              </a>
              <a href="#" className="footer-link text-zinc-400 hover:text-white transition-colors flex items-center gap-1">
                Twitter <ArrowUpRight size={14} />
              </a>
              <a href="#" className="footer-link text-zinc-400 hover:text-white transition-colors flex items-center gap-1">
                LinkedIn <ArrowUpRight size={14} />
              </a>
              <a href="#" className="footer-link text-zinc-400 hover:text-white transition-colors flex items-center gap-1">
                Awwwards <ArrowUpRight size={14} />
              </a>
            </div>
          </div>
        </div>

        {/* ── Bottom: copyright + policy links ───────────────────── */}
        <div className="relative">
          {/* Animated border line — scaleX draw effect */}
          <div
            ref={borderRef}
            className="absolute top-0 left-0 right-0 h-px bg-zinc-800"
            aria-hidden="true"
          />
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-zinc-600 text-sm pt-8">
            <p>© {new Date().getFullYear()} Felides Agency. Tüm hakları saklıdır.</p>
            <div className="flex gap-6">
              <a href="#" className="footer-link hover:text-zinc-400 transition-colors">
                Gizlilik Politikası
              </a>
              <a href="#" className="footer-link hover:text-zinc-400 transition-colors">
                Kullanım Şartları
              </a>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
