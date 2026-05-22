import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

/* ─── Hizmet verileri ─────────────────────────────────────────────────
 * Layout: Sol panel → hizmet bilgisi, Sağ panel → ilgili fotoğraf
 * ───────────────────────────────────────────────────────────────────── */
const services = [
  {
    id: 1,
    number: '01',
    title: 'Web Site\nHizmeti',
    desc: 'Modern teknolojiler ve ödüllü UI/UX tasarımla, performanslı ve dönüşüm odaklı dijital varlıklar inşa ediyoruz. SEO uyumlu, hızlı ve mobil öncelikli çözümler.',
    tag: 'Teknoloji',
    img: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=1400&q=80&auto=format&fit=crop',
    imgAlt: 'Web tasarım ve geliştirme süreci',
    accent: '#c8b0e8',
  },
  {
    id: 2,
    number: '02',
    title: 'Video\nProdüksiyon',
    desc: 'Profesyonel Sony FX serisi kameralar ve sinema optikleriyle, markanızın hikayesini etkileyici görsellerle anlatıyoruz. Kurumsal, reklam ve sosyal medya içerikleri.',
    tag: 'Prodüksiyon',
    img: 'https://images.unsplash.com/photo-1537808288253-200047a98c1b?w=1400&q=80&auto=format&fit=crop',
    imgAlt: 'Video prodüksiyon kamera seti',
    accent: '#e8d5b0',
  },
  {
    id: 3,
    number: '03',
    title: 'Drone\nÇekimleri',
    desc: 'DJI Inspire ve Mavic serisi ile 6K aerial görüntüler. Lokasyonunuzu tanımlayan nefes kesen hava çekimleri. Lisanslı ve deneyimli pilot ekibiyle güvenli uçuş.',
    tag: 'Aerial',
    img: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=1400&q=80&auto=format&fit=crop',
    imgAlt: 'Drone hava fotoğrafçılığı',
    accent: '#b0c8e8',
  },
  {
    id: 4,
    number: '04',
    title: 'Grafik Tasarım\n& Baskı',
    desc: 'Logo, kurumsal kimlik, ambalaj ve dijital materyalden baskı tasarımına kadar markanıza özgün bir görsel dil yaratıyoruz. Kartvizit, katalog, tabela ve daha fazlası.',
    tag: 'Tasarım & Baskı',
    img: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=1400&q=80&auto=format&fit=crop',
    imgAlt: 'Grafik tasarım ve baskı çalışması',
    accent: '#e8b0b0',
  },
  {
    id: 5,
    number: '05',
    title: 'QR\nMenü',
    desc: 'Restoranlar ve kafeler için modern dijital menü çözümleri. QR kod ile anında erişilebilir, kolayca güncellenebilir ve göz alıcı tasarımlı menüler. Sınırsız güncelleme.',
    tag: 'Dijital Menü',
    img: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1400&q=80&auto=format&fit=crop',
    imgAlt: 'Modern restoran dijital menü',
    accent: '#b0e8c8',
  },
];

const Services = () => {
  const containerRef     = useRef(null);
  const scrollWrapperRef = useRef(null);
  const headingRef       = useRef(null);
  const progressRef      = useRef(null);

  useGSAP(() => {
    /* ── Section heading entrance ──────────────────────────────── */
    gsap.from(headingRef.current, {
      y: 60,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: headingRef.current,
        start: 'top 85%',
      },
    });

    const cards = gsap.utils.toArray('.service-card');

    /* ── Horizontal scroll: pin + scrub + snap ──────────────────
     * Core logic unchanged. onUpdate fills the progress bar via
     * direct DOM write (faster than animating inside RAF).
     * ─────────────────────────────────────────────────────────── */
    const tween = gsap.to(cards, {
      xPercent: -100 * (cards.length - 1),
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        pin: true,
        scrub: 1.2,
        snap: {
          snapTo:   1 / (cards.length - 1),
          duration: { min: 0.2, max: 0.4 },
          ease:     'power2.inOut',
        },
        // Multiply by 0.5 to cut the required vertical scroll distance in half
        end: () => '+=' + (scrollWrapperRef.current.offsetWidth * 0.5),
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          if (progressRef.current) {
            progressRef.current.style.transform = `scaleX(${self.progress})`;
          }
        },
      },
    });

    /* ── Per-card: content fade-up + number slide + image parallax ── */
    cards.forEach((card) => {
      /* Card content fades up as it enters */
      gsap.from(card.querySelector('.card-content'), {
        y: 80,
        opacity: 0,
        duration: 1.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger:            card,
          containerAnimation: tween,
          start:              'left center',
          toggleActions:      'play none none reverse',
        },
      });

      /* Service number slides in */
      gsap.from(card.querySelector('.card-number'), {
        opacity: 0,
        x: -30,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger:            card,
          containerAnimation: tween,
          start:              'left 70%',
          toggleActions:      'play none none reverse',
        },
      });

      /* Right-panel image subtle y-parallax (depth layer) */
      const imgEl = card.querySelector('.svc-img-panel img');
      if (imgEl) {
        gsap.fromTo(
          imgEl,
          { yPercent: -8 },
          {
            yPercent: 8,
            ease: 'none',
            scrollTrigger: {
              trigger:            card,
              containerAnimation: tween,
              start:              'left right',
              end:                'right left',
              scrub:              true,
            },
          },
        );
      }
    });
  }, { scope: containerRef });

  return (
    <section
      id="services"
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden bg-zinc-950 flex flex-col"
      aria-label="Hizmetlerimiz"
    >
      {/* ── Scroll progress bar ─────────────────────────────────── */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-white/[0.04] z-20" aria-hidden="true">
        <div
          ref={progressRef}
          className="h-full bg-gradient-to-r from-transparent via-white/50 to-transparent"
          style={{ transform: 'scaleX(0)', transformOrigin: 'left center' }}
        />
      </div>

      {/* ── Section heading ─────────────────────────────────────── */}
      <div
        ref={headingRef}
        className="flex items-center justify-between px-6 md:px-16 pt-8 pb-4 shrink-0"
      >
        <div className="flex items-center gap-4">
          <span className="w-8 h-px bg-white/30" />
          <span className="text-xs tracking-[0.25em] uppercase text-zinc-500">Hizmetlerimiz</span>
        </div>
        <div className="hidden md:flex items-center gap-2 text-zinc-600 text-sm">
          <span>01</span>
          <span className="w-12 h-px bg-zinc-800" />
          <span className="text-white">05</span>
        </div>
      </div>

      {/* ── Horizontal card track (5 × 100vw = 500vw) ──────────── */}
      <div
        ref={scrollWrapperRef}
        className="flex h-full will-change-transform"
        style={{ width: `${services.length * 100}vw` }}
      >
        {services.map((svc) => (
          <div
            key={svc.id}
            className="service-card w-screen h-full flex justify-center items-center px-4 md:px-10 py-6"
          >
            {/* ── Split card: left text / right image ── */}
            <div className="card-content relative w-full max-w-6xl h-full rounded-3xl overflow-hidden cursor-pointer group flex">

              {/* ── LEFT: Service info panel ─────────────────────── */}
              <div className="relative flex flex-col justify-between p-8 md:p-12 w-[44%] shrink-0 bg-zinc-900">

                {/* Accent colour glow — subtle corner ambience */}
                <div
                  className="absolute -top-16 -left-16 w-56 h-56 rounded-full opacity-[0.10] blur-3xl pointer-events-none"
                  style={{ background: svc.accent }}
                  aria-hidden="true"
                />

                {/* Top: large faded number + tag pill */}
                <div className="relative flex items-start justify-between">
                  <span
                    className="card-number font-display text-[6rem] md:text-[8.5rem] leading-none text-white/[0.05] select-none"
                    aria-hidden="true"
                  >
                    {svc.number}
                  </span>
                  <span
                    className="mt-2 inline-flex items-center border text-xs tracking-[0.2em] uppercase px-4 py-1.5 rounded-full backdrop-blur-sm transition-all duration-500 group-hover:border-white/25"
                    style={{
                      borderColor:     `${svc.accent}30`,
                      color:            svc.accent,
                      backgroundColor: `${svc.accent}0a`,
                    }}
                  >
                    {svc.tag}
                  </span>
                </div>

                {/* Bottom: title + description + arrow */}
                <div className="relative flex flex-col gap-4 md:gap-5">
                  <h3 className="font-display text-4xl md:text-6xl lg:text-7xl text-white leading-[0.95] whitespace-pre-line">
                    {svc.title}
                  </h3>
                  <p className="text-sm md:text-[15px] text-zinc-400/90 leading-relaxed max-w-xs">
                    {svc.desc}
                  </p>

                  {/* Arrow CTA — reveals on hover */}
                  <div className="mt-1 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                    <div
                      className="w-11 h-11 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors"
                      style={{ boxShadow: `0 0 24px ${svc.accent}22` }}
                    >
                      <svg className="w-4 h-4 text-white" viewBox="0 0 16 16" fill="none">
                        <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Vertical divider between panels */}
                <div
                  className="absolute top-0 right-0 bottom-0 w-px"
                  style={{ background: `linear-gradient(to bottom, transparent, ${svc.accent}18, transparent)` }}
                  aria-hidden="true"
                />

                {/* Bottom accent line on hover */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                  style={{ background: `linear-gradient(90deg, transparent, ${svc.accent}65, transparent)` }}
                  aria-hidden="true"
                />
              </div>

              {/* ── RIGHT: Relevant image panel ──────────────────── */}
              <div className="svc-img-panel">
                {/* Left-edge blend: fades image into text panel */}
                <div
                  className="absolute inset-y-0 left-0 w-20 z-10 pointer-events-none"
                  style={{ background: 'linear-gradient(to right, #18181b, transparent)' }}
                  aria-hidden="true"
                />
                <img
                  src={svc.img}
                  alt={svc.imgAlt}
                  loading="lazy"
                  decoding="async"
                />
              </div>

            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
