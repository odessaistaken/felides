import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const testimonials = [
  {
    quote: 'Felides ekibi beklentilerimizin çok ötesine geçti. Web sitemiz açıldıktan sonra online rezervasyonlarımız %340 arttı. Sinematik video içeriklerimiz sosyal medyada viral oldu.',
    author: 'Ayşe Kaya',
    title: 'Kurucu Ortak',
    company: 'Nomad Restoran',
    avatar: 'AK',
    accent: '#c8b0e8',
  },
  {
    quote: 'Drone çekimlerinden kurumsal kimlik tasarımına kadar her şeyi tek bir çatı altında hallettik. Profesyonellikleri ve yaratıcılıkları gerçekten farklı bir seviyede.',
    author: 'Mert Demir',
    title: 'Pazarlama Direktörü',
    company: 'Vertex Yapı',
    avatar: 'MD',
    accent: '#e8d5b0',
  },
  {
    quote: 'QR menü projemiz tam bir oyun değiştirici oldu. Müşterilerimiz seviyor, garsonlarımız da sipariş almaktan çok daha keyif alıyor. Olağanüstü destek.',
    author: 'Zeynep Arslan',
    title: 'İşletme Sahibi',
    company: 'Amber Kafe',
    avatar: 'ZA',
    accent: '#b0e8c8',
  },
];

const Testimonials = () => {
  const sectionRef  = useRef(null);
  const headingRef  = useRef(null);

  useGSAP(() => {
    /* ── Heading ──────────────────────────────────────── */
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

    /* ── Cards stagger ───────────────────────────────── */
    const cards = gsap.utils.toArray('.testimonial-card');
    gsap.from(cards, {
      y: 70,
      opacity: 0,
      stagger: 0.15,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: cards[0],
        start: 'top 82%',
        toggleActions: 'play none none reverse',
      },
    });

    /* ── Quote marks parallax ─────────────────────────── */
    gsap.utils.toArray('.quote-mark').forEach((el) => {
      gsap.to(el, {
        y: -30,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
        },
      });
    });
  }, { scope: sectionRef });

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="relative bg-zinc-950 py-32 overflow-hidden border-y border-zinc-900"
      aria-label="Müşteri Yorumları"
    >
      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.015]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
        aria-hidden="true"
      />

      <div className="container mx-auto px-6 md:px-12 max-w-7xl">

        {/* ── Heading ──────────────────────────────────── */}
        <div className="text-center mb-20">
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="w-8 h-px bg-white/20" />
            <span className="text-xs tracking-[0.25em] uppercase text-zinc-500">
              Referanslar
            </span>
            <span className="w-8 h-px bg-white/20" />
          </div>
          <h2
            ref={headingRef}
            className="font-display text-[clamp(3rem,8vw,7rem)] leading-[0.9] heading-gradient"
          >
            Müşterilerimiz
            <br />
            <span className="text-white/20">Konuşuyor</span>
          </h2>
        </div>

        {/* ── Cards ─────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="testimonial-card group relative rounded-3xl p-8 border border-zinc-800/60 bg-zinc-900/40 backdrop-blur-sm hover:border-zinc-700 transition-all duration-500 hover:-translate-y-1 overflow-hidden"
            >
              {/* Accent glow on hover */}
              <div
                className="absolute -top-24 -right-24 w-48 h-48 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-3xl pointer-events-none"
                style={{ background: t.accent }}
                aria-hidden="true"
              />

              {/* Decorative quote mark */}
              <div
                className="quote-mark font-display text-[8rem] leading-none absolute -top-4 -left-2 select-none pointer-events-none"
                style={{ color: `${t.accent}10` }}
                aria-hidden="true"
              >
                "
              </div>

              {/* Stars */}
              <div className="relative flex gap-1 mb-6">
                {[...Array(5)].map((_, si) => (
                  <svg key={si} className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor" style={{ color: t.accent }}>
                    <path d="M8 1l1.8 3.6L14 5.4l-3 2.9.7 4.1L8 10.4l-3.7 1.9.7-4.1-3-2.9 4.2-.8z" />
                  </svg>
                ))}
              </div>

              {/* Quote */}
              <blockquote className="relative text-zinc-300 text-[15px] leading-relaxed mb-8">
                "{t.quote}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                  style={{
                    background: `linear-gradient(135deg, ${t.accent}30, ${t.accent}10)`,
                    border: `1px solid ${t.accent}30`,
                    color: t.accent,
                  }}
                >
                  {t.avatar}
                </div>
                <div>
                  <div className="text-white font-semibold text-sm">{t.author}</div>
                  <div className="text-zinc-500 text-xs">{t.title}, {t.company}</div>
                </div>
              </div>

              {/* Bottom accent line */}
              <div
                className="absolute bottom-0 left-8 right-8 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `linear-gradient(90deg, transparent, ${t.accent}50, transparent)` }}
                aria-hidden="true"
              />
            </div>
          ))}
        </div>

        {/* ── Stats row ─────────────────────────────────── */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-zinc-900 pt-16">
          {[
            { num: '150+', label: 'Tamamlanan Proje' },
            { num: '%98',  label: 'Müşteri Memnuniyeti' },
            { num: '8',    label: 'Yıllık Deneyim'    },
            { num: '40+',  label: 'Aktif Marka'       },
          ].map((stat, i) => (
            <div key={i} className="stat-item text-center">
              <div
                className="font-display text-5xl md:text-6xl text-white mb-2"
              >
                {stat.num}
              </div>
              <div className="text-xs tracking-[0.2em] uppercase text-zinc-500">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
