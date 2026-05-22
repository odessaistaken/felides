import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navbar    from './components/Navbar';
import Hero      from './components/Hero';
import Services  from './components/Services';
import Clients   from './components/Clients';
import Footer    from './components/Footer';
import { useLenisScroll } from './hooks/useLenisScroll';
import './index.css';

// Register ScrollTrigger once at module level — every component can
// import { ScrollTrigger } from 'gsap/ScrollTrigger' without re-registering.
gsap.registerPlugin(ScrollTrigger);

/**
 * App — no longer wraps in <ReactLenis> (crashes on React 19).
 * useLenisScroll() creates a bare Lenis instance wired to gsap.ticker.
 */
function App() {
  useLenisScroll();

  return (
    <div className="bg-black text-white min-h-screen font-sans selection:bg-white selection:text-black">
      <Navbar />
      <main>
        {/*
         * z-index stacking: each section visually "covers" the one before
         * as the user scrolls — the gsap.com curtain-cover effect.
         */}
        <div className="relative" style={{ zIndex: 10 }}>
          <Hero />
        </div>
        <div className="relative" style={{ zIndex: 20 }}>
          <Services />
        </div>
        <div className="relative" style={{ zIndex: 30 }}>
          <Clients />
          <Footer />
        </div>
      </main>
    </div>
  );
}

export default App;
