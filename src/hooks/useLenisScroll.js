import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * useLenisScroll — React 19 compatible smooth scroll bridge.
 *
 * Uses @studio-freight/lenis directly (NOT react-lenis wrapper, which
 * has React 17/18 peer deps that crash on React 19).
 *
 * Strategy:
 *   1. Create a Lenis instance manually.
 *   2. Run it through GSAP's ticker so both share the same RAF frame.
 *      This gives pixel-perfect sync between scrub animations and smooth scroll.
 *   3. Call ScrollTrigger.update() on every Lenis scroll event.
 *   4. Disable lagSmoothing so GSAP never skips frames during fast scroll.
 *   5. Destroy and remove the ticker fn on unmount — no memory leaks.
 */
export function useLenisScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      lerp:           0.1,   // 0–1 interpolation speed (lower = silkier)
      smoothWheel:    true,
      smoothTouch:    false, // keep touch native to avoid mobile jank
      normalizeWheel: true,  // prevent huge deltas on some trackpads
    });

    // Route Lenis through GSAP's ticker for frame-perfect scrub sync.
    // GSAP provides `time` in seconds → Lenis.raf expects milliseconds.
    const onTick = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(onTick);

    // Prevent GSAP from auto-skipping "lagged" frames; Lenis handles that.
    gsap.ticker.lagSmoothing(0);

    // Keep ScrollTrigger in sync with every Lenis scroll frame.
    lenis.on('scroll', ScrollTrigger.update);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(onTick);
    };
  }, []);
}
