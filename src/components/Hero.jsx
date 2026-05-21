import { useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

/* ── Unsplash kaynak URL'leri (doğrudan erişim, API key gerektirmez) ── */
const HERO_BG = 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=1920&q=80&auto=format&fit=crop';

const Hero = () => {
  const containerRef  = useRef(null);
  const bgRef         = useRef(null);
  const badgeRef      = useRef(null);
  const titleRef      = useRef(null);
  const subtitleRef   = useRef(null);
  const ctaRef        = useRef(null);
  const scrollRef     = useRef(null);
  const [imgLoaded, setImgLoaded]   = useState(false);

  useGSAP(() => {
    const tl = gsap.timeline({ delay: 0.1 });

    /* Arka plan parallax (mouse ile) */
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const xPct = (clientX / innerWidth  - 0.5) * 2;
      const yPct = (clientY / innerHeight - 0.5) * 2;
      gsap.to(bgRef.current, {
        x: xPct * -18,
        y: yPct * -12,
        duration: 1.8,
        ease: 'power2.out',
      });
    };
    window.addEventListener('mousemove', handleMouseMove);

    /* Badge giriş animasyonu */
    tl.from(badgeRef.current, {
      y: -20,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
    });

    /* Başlık — harf harf */
    tl.from('.hero-char', {
      y: 120,
      opacity: 0,
      stagger: 0.045,
      duration: 1.1,
      ease: 'power4.out',
    }, '-=0.4');

    /* Alt başlık */
    tl.from(subtitleRef.current, {
      y: 30,
      opacity: 0,
      duration: 0.9,
      ease: 'power3.out',
    }, '-=0.5');

    /* CTA butonu */
    tl.from(ctaRef.current, {
      y: 20,
      opacity: 0,
      scale: 0.95,
      duration: 0.8,
      ease: 'back.out(1.5)',
    }, '-=0.4');

    /* Scroll indicator */
    tl.from(scrollRef.current, {
      opacity: 0,
      duration: 1,
    }, '-=0.2');

    /* Scroll indicator sonsuz bounce */
    gsap.to('.scroll-dot', {
      y: 10,
      repeat: -1,
      yoyo: true,
      duration: 1.2,
      ease: 'sine.inOut',
    });

    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, { scope: containerRef });

  const titleLine1 = "Felides";
  const titleLine2 = "Agency";

  return (
    <section
      ref={containerRef}
      className="relative h-screen flex flex-col justify-center items-center overflow-hidden noise-overlay"
      aria-label="Hero bölümü"
    >
      {/* ── Arka Plan Görseli ────────────────────────────── */}
      <div
        ref={bgRef}
        className="absolute inset-[-5%] z-0 transition-opacity duration-1000"
        style={{ opacity: imgLoaded ? 1 : 0 }}
      >
        <img
          src={HERO_BG}
          alt="Sinematik çalışma ortamı"
          className="w-full h-full object-cover"
          onLoad={() => setImgLoaded(true)}
          fetchpriority="high"
        />
        {/* Gradient katmanları */}
        <div className="absolute inset-0 bg-black/65" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />
      </div>

      {/* Yedek arka plan (görsel yüklenirken) */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 40%, #1a1a2e 0%, #0a0a0f 60%, #000 100%)',
          opacity: imgLoaded ? 0 : 1,
          transition: 'opacity 1s ease',
        }}
      />

      {/* ── İçerik ──────────────────────────────────────── */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-7xl mx-auto w-full">

        {/* Badge */}
        <div
          ref={badgeRef}
          className="mb-8 inline-flex items-center gap-2 border border-white/10 bg-white/5 backdrop-blur-md rounded-full px-5 py-2 text-xs tracking-[0.2em] uppercase text-zinc-400 animate-glow-pulse"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Yeni Projeler Kabul Ediliyor
        </div>

        {/* Ana Başlık */}
        <h1
          ref={titleRef}
          className="font-display text-[clamp(5rem,18vw,18rem)] leading-[0.88] tracking-tight overflow-hidden select-none"
        >
          <div className="flex overflow-hidden">
            {titleLine1.split('').map((char, i) => (
              <span
                key={`l1-${i}`}
                className="hero-char inline-block heading-gradient"
              >
                {char}
              </span>
            ))}
          </div>
          <div className="flex overflow-hidden">
            {titleLine2.split('').map((char, i) => (
              <span
                key={`l2-${i}`}
                className="hero-char inline-block text-white/20"
              >
                {char}
              </span>
            ))}
          </div>
        </h1>

        {/* Alt Başlık */}
        <p
          ref={subtitleRef}
          className="mt-10 max-w-xl text-zinc-400 text-lg md:text-xl leading-relaxed tracking-wide"
        >
          Video prodüksiyon, drone çekimleri ve dijital tasarımla
          <br className="hidden md:block" />
          markanıza <span className="text-white font-medium">sinematik bir kimlik</span> kazandırıyoruz.
        </p>

        {/* CTA Butonları */}
        <div ref={ctaRef} className="mt-12 flex flex-col sm:flex-row items-center gap-4">
          {/* Birincil Buton — shimmer efektli */}
          <a
            href="#services"
            id="hero-cta-primary"
            className="relative group inline-flex items-center gap-3 bg-white text-black font-bold text-sm tracking-[0.12em] uppercase px-8 py-4 rounded-full overflow-hidden transition-all duration-500 hover:scale-[1.04] hover:shadow-[0_0_40px_rgba(255,255,255,0.2)]"
          >
            <span className="relative z-10">Projelerimizi İnceleyin</span>
            {/* Shimmer sweep */}
            <span className="absolute inset-0 btn-shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            {/* Ok ikonu */}
            <svg
              className="relative z-10 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
              viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>

          {/* İkincil Buton */}
          <a
            href="#contact"
            id="hero-cta-secondary"
            className="group inline-flex items-center gap-2 border border-white/15 text-white/70 font-medium text-sm tracking-[0.1em] uppercase px-8 py-4 rounded-full backdrop-blur-sm transition-all duration-500 hover:border-white/40 hover:text-white hover:bg-white/5"
          >
            Hizmetlerimiz
            <svg
              className="w-3 h-3 transition-transform duration-300 group-hover:translate-y-0.5"
              viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M6 2V10M6 10L2 6M6 10L10 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>

        {/* İstatistikler Satırı */}
        <div className="mt-20 flex items-center gap-10 md:gap-16 text-center">
          {[
            { num: '150+', label: 'Tamamlanan Proje' },
            { num: '8',    label: 'Yıllık Deneyim' },
            { num: '40+',  label: 'Mutlu Marka' },
          ].map((stat, i) => (
            <div key={i} className="flex flex-col gap-1">
              <span className="font-display text-4xl md:text-5xl text-white">{stat.num}</span>
              <span className="text-xs tracking-[0.15em] uppercase text-zinc-500">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Scroll Indicator ─────────────────────────────── */}
      <div
        ref={scrollRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] tracking-[0.25em] uppercase text-zinc-600">Kaydır</span>
        <div className="w-px h-10 bg-gradient-to-b from-white/20 to-transparent relative overflow-hidden">
          <div className="scroll-dot absolute top-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-white/40" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
