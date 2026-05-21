import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

/* ─── Servis Verileri (Unsplash görselleriyle) ────────── */
const services = [
  {
    id: 1,
    number: '01',
    title: 'Kamera\nÇekimleri',
    desc: 'Profesyonel Sony FX serisi kameralar ve sinema optikleriyle, markanızın hikayesini etkileyici görsellerle anlatıyoruz.',
    tag: 'Prodüksiyon',
    img: 'https://images.unsplash.com/photo-1537808288253-200047a98c1b?w=1400&q=80&auto=format&fit=crop',
    imgAlt: 'Profesyonel sinema kamerası set ortamı',
    accent: '#e8d5b0',
  },
  {
    id: 2,
    number: '02',
    title: 'Drone\nÇekimleri',
    desc: 'DJI Inspire ve Mavic serisi ile 6K aerial görüntüler. Lokasyonunuzu tanımlayan nefes kesen hava çekimleri.',
    tag: 'Aerial',
    img: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=1400&q=80&auto=format&fit=crop',
    imgAlt: 'Uçan drone hava fotoğrafçılığı',
    accent: '#b0c8e8',
  },
  {
    id: 3,
    number: '03',
    title: 'Web Site &\nDijital',
    desc: 'Modern teknolojiler ve ödüllü UI/UX tasarımla, performanslı ve dönüşüm odaklı dijital varlıklar inşa ediyoruz.',
    tag: 'Teknoloji',
    img: 'https://images.unsplash.com/photo-1561736778-92e52a7769ef?w=1400&q=80&auto=format&fit=crop',
    imgAlt: 'Web tasarım ve kod arayüzü',
    accent: '#c8b0e8',
  },
  {
    id: 4,
    number: '04',
    title: 'Grafik\nTasarım',
    desc: 'Logo, kurumsal kimlik ve dijital materyalden sosyal medya tasarımına kadar markanıza özgün bir görsel dil yaratıyoruz.',
    tag: 'Tasarım',
    img: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=1400&q=80&auto=format&fit=crop',
    imgAlt: 'Grafik tasarım ve yaratıcı süreç',
    accent: '#e8b0b0',
  },
];

const Services = () => {
  const containerRef      = useRef(null);
  const scrollWrapperRef  = useRef(null);
  const headingRef        = useRef(null);

  useGSAP(() => {
    /* ── Bölüm başlığı giriş animasyonu ── */
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

    /* ── Yatay Scroll (pin + scrub) ── */
    const tween = gsap.to(cards, {
      xPercent: -100 * (cards.length - 1),
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        pin: true,
        scrub: 1.2,
        snap: {
          snapTo: 1 / (cards.length - 1),
          duration: { min: 0.2, max: 0.4 },
          ease: 'power2.inOut',
        },
        end: () => '+=' + scrollWrapperRef.current.offsetWidth,
        // Mobilde overflow sorunu için
        anticipatePin: 1,
      },
    });

    /* ── Her kart için içerik aşağıdan fade-in ── */
    cards.forEach((card) => {
      gsap.from(card.querySelector('.card-content'), {
        y: 80,
        opacity: 0,
        duration: 1.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: card,
          containerAnimation: tween,
          start: 'left center',
          toggleActions: 'play none none reverse',
        },
      });

      /* Kart numarası sayaç efekti */
      gsap.from(card.querySelector('.card-number'), {
        opacity: 0,
        x: -30,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: card,
          containerAnimation: tween,
          start: 'left 70%',
          toggleActions: 'play none none reverse',
        },
      });
    });
  }, { scope: containerRef });

  return (
    <section
      id="services"
      ref={containerRef}
      className="h-screen w-full overflow-hidden bg-zinc-950 flex flex-col"
      aria-label="Hizmetlerimiz"
    >
      {/* ── Bölüm Başlığı (sol üst) ── */}
      <div
        ref={headingRef}
        className="flex items-center justify-between px-6 md:px-16 pt-8 pb-4 shrink-0"
      >
        <div className="flex items-center gap-4">
          <span className="w-8 h-px bg-white/30" />
          <span className="text-xs tracking-[0.25em] uppercase text-zinc-500">
            Hizmetlerimiz
          </span>
        </div>
        <div className="hidden md:flex items-center gap-2 text-zinc-600 text-sm">
          <span>01</span>
          <span className="w-12 h-px bg-zinc-800" />
          <span className="text-white">04</span>
        </div>
      </div>

      {/* ── Kart Listesi (yatay scroll) ── */}
      <div
        ref={scrollWrapperRef}
        className="flex h-full w-[400vw]"
        style={{ willChange: 'transform' }}
      >
        {services.map((svc) => (
          <div
            key={svc.id}
            className="service-card w-screen h-full flex justify-center items-center px-4 md:px-10 py-6"
          >
            {/* ── Kart İçeriği ── */}
            <div className="card-content relative w-full max-w-6xl h-full rounded-3xl overflow-hidden cursor-pointer group">

              {/* ── Görsel Katman ── */}
              <div className="service-img-wrap absolute inset-0 rounded-3xl">
                <img
                  src={svc.img}
                  alt={svc.imgAlt}
                  loading="lazy"
                  decoding="async"
                />
                {/* Gradient overlay — okunabilirlik */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20 transition-opacity duration-700 group-hover:opacity-80" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
              </div>

              {/* ── Kart Metni ── */}
              <div className="relative z-10 h-full flex flex-col justify-between p-8 md:p-14">

                {/* Üst alan: Numara + Tag */}
                <div className="flex items-start justify-between">
                  <span
                    className="card-number font-display text-[6rem] md:text-[9rem] leading-none text-white/8 select-none"
                    aria-hidden="true"
                  >
                    {svc.number}
                  </span>
                  <span
                    className="mt-2 inline-flex items-center border text-xs tracking-[0.2em] uppercase px-4 py-1.5 rounded-full backdrop-blur-sm transition-all duration-500 group-hover:border-white/30"
                    style={{
                      borderColor: `${svc.accent}30`,
                      color: svc.accent,
                      backgroundColor: `${svc.accent}08`,
                    }}
                  >
                    {svc.tag}
                  </span>
                </div>

                {/* Alt alan: Başlık + Açıklama */}
                <div className="flex flex-col gap-4 md:gap-6">
                  <h3 className="font-display text-5xl md:text-8xl lg:text-9xl text-white leading-tight whitespace-pre-line">
                    {svc.title}
                  </h3>
                  <div className="flex flex-col md:flex-row md:items-end gap-6 md:gap-10">
                    <p className="max-w-lg text-base md:text-lg text-zinc-300/80 leading-relaxed">
                      {svc.desc}
                    </p>
                    {/* Hover ile beliren "Keşfet" oku */}
                    <div className="md:ml-auto flex-shrink-0 opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-500">
                      <div
                        className="w-12 h-12 md:w-16 md:h-16 rounded-full border border-white/20 flex items-center justify-center backdrop-blur-sm hover:bg-white/10 transition-colors"
                        style={{ boxShadow: `0 0 30px ${svc.accent}20` }}
                      >
                        <svg className="w-5 h-5 text-white" viewBox="0 0 20 20" fill="none">
                          <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* ── İnce Renk Çizgisi (alt) ── */}
              <div
                className="absolute bottom-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                style={{ background: `linear-gradient(90deg, transparent, ${svc.accent}80, transparent)` }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
