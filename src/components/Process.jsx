import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const steps = [
  {
    number: '01',
    title: 'Keşif & Strateji',
    desc: 'Markanızı, hedef kitlenizi ve rakiplerinizi derinlemesine analiz ediyoruz. Her karar veriye dayalı, her strateji size özel.',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-7 h-7">
        <circle cx="14" cy="14" r="8" stroke="currentColor" strokeWidth="1.5" />
        <path d="M20 20L27 27" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    accent: '#c8b0e8',
  },
  {
    number: '02',
    title: 'Konsept & Tasarım',
    desc: 'Stratejinizi görsel dile çeviriyoruz. Wireframe\'den final tasarıma kadar her pikseli özenle kuruyoruz.',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-7 h-7">
        <rect x="4" y="4" width="24" height="24" rx="4" stroke="currentColor" strokeWidth="1.5" />
        <path d="M10 16L14 20L22 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    accent: '#e8d5b0',
  },
  {
    number: '03',
    title: 'Üretim & Geliştirme',
    desc: 'Tasarımı hayata geçiriyoruz — video çekimlerinden web geliştirmeye, drone görüntülerinden grafik baskıya kadar her şey.',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-7 h-7">
        <path d="M6 8L14 16L6 24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M18 24H26" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    accent: '#b0c8e8',
  },
  {
    number: '04',
    title: 'Teslimat & Büyüme',
    desc: 'Projenizi teslim edip sahne arkasına çekilmiyoruz. Uzun vadeli büyümeniz için yanınızda olmaya devam ediyoruz.',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-7 h-7">
        <path d="M4 24L10 18L16 22L28 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M22 8H28V14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    accent: '#b0e8c8',
  },
];

const Process = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const subRef = useRef(null);
  const lineRef = useRef(null);

  useGSAP(() => {
    /* ── Heading entrance ─────────────────────────────── */
    gsap.from(headingRef.current, {
      y: 60,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: headingRef.current,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
    });

    gsap.from(subRef.current, {
      y: 30,
      opacity: 0,
      duration: 0.9,
      ease: 'power3.out',
      delay: 0.1,
      scrollTrigger: {
        trigger: subRef.current,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
    });

    /* ── Vertical progress line draws down ──────────── */
    gsap.from(lineRef.current, {
      scaleY: 0,
      transformOrigin: 'top center',
      duration: 2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: lineRef.current,
        start: 'top 75%',
        toggleActions: 'play none none reverse',
      },
    });

    /* ── Each step card reveals ──────────────────────── */
    const cards = gsap.utils.toArray('.process-card');
    cards.forEach((card, i) => {
      const isEven = i % 2 === 0;

      gsap.from(card, {
        x: isEven ? -60 : 60,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 82%',
          toggleActions: 'play none none reverse',
        },
      });

      /* Icon bounce */
      gsap.from(card.querySelector('.process-icon'), {
        scale: 0,
        opacity: 0,
        duration: 0.6,
        ease: 'back.out(2)',
        delay: 0.2,
        scrollTrigger: {
          trigger: card,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });
    });
  }, { scope: sectionRef });

  return (
    <section
      id="process"
      ref={sectionRef}
      className="relative bg-black py-32 overflow-hidden"
      aria-label="Çalışma Sürecimiz"
    >
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(200,176,232,0.04) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="container mx-auto px-6 md:px-12 max-w-6xl">

        {/* ── Section label + heading ─────────────────── */}
        <div className="text-center mb-24">
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="w-8 h-px bg-white/20" />
            <span className="text-xs tracking-[0.25em] uppercase text-zinc-500">
              Nasıl Çalışırız
            </span>
            <span className="w-8 h-px bg-white/20" />
          </div>
          <h2
            ref={headingRef}
            className="font-display text-[clamp(3rem,8vw,7rem)] leading-[0.9] heading-gradient"
          >
            Sürecimiz
          </h2>
          <p
            ref={subRef}
            className="mt-6 text-zinc-400 text-lg max-w-xl mx-auto leading-relaxed"
          >
            Fikrinden nihai ürüne dört disiplinli adımda ulaşıyoruz.
          </p>
        </div>

        {/* ── Steps ──────────────────────────────────────── */}
        <div className="relative">
          {/* Vertical line (desktop) */}
          <div
            ref={lineRef}
            className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2"
            style={{ background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.08) 20%, rgba(255,255,255,0.08) 80%, transparent)' }}
            aria-hidden="true"
          />

          <div className="flex flex-col gap-16 md:gap-20">
            {steps.map((step, i) => {
              const isEven = i % 2 === 0;
              return (
                <div
                  key={step.number}
                  className={`process-card relative flex flex-col md:flex-row items-center gap-8 md:gap-0 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  {/* Text side */}
                  <div className={`flex-1 ${isEven ? 'md:pr-20 md:text-right' : 'md:pl-20 md:text-left'}`}>
                    <span
                      className="font-display text-[5rem] leading-none select-none"
                      style={{ color: `${step.accent}14` }}
                      aria-hidden="true"
                    >
                      {step.number}
                    </span>
                    <h3 className="font-display text-4xl md:text-5xl text-white mt-2 mb-4 leading-tight">
                      {step.title}
                    </h3>
                    <p className="text-zinc-400 text-base leading-relaxed max-w-sm" style={{ marginLeft: isEven ? 'auto' : undefined }}>
                      {step.desc}
                    </p>
                  </div>

                  {/* Center dot */}
                  <div
                    className="process-icon relative z-10 shrink-0 w-14 h-14 rounded-full border flex items-center justify-center"
                    style={{
                      borderColor: `${step.accent}40`,
                      background: `radial-gradient(circle, ${step.accent}12 0%, transparent 70%)`,
                      color: step.accent,
                      boxShadow: `0 0 30px ${step.accent}18`,
                    }}
                  >
                    {step.icon}
                  </div>

                  {/* Empty side for layout balance */}
                  <div className="flex-1 hidden md:block" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
