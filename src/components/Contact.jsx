import { useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const Contact = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const formRef = useRef(null);
  const leftRef = useRef(null);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    message: '',
  });
  const [status, setStatus] = useState('idle'); // idle | sending | success | error

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

    /* ── Left info panel slides in ─────────────────────── */
    gsap.from(leftRef.current, {
      x: -50,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: leftRef.current,
        start: 'top 82%',
        toggleActions: 'play none none reverse',
      },
    });

    /* ── Form fields stagger up ───────────────────────── */
    const fields = gsap.utils.toArray('.form-field', formRef.current);
    gsap.from(fields, {
      y: 40,
      opacity: 0,
      stagger: 0.1,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: formRef.current,
        start: 'top 82%',
        toggleActions: 'play none none reverse',
      },
    });

    /* ── Info items stagger ───────────────────────────── */
    gsap.from('.contact-info-item', {
      x: -30,
      opacity: 0,
      stagger: 0.12,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: leftRef.current,
        start: 'top 78%',
        toggleActions: 'play none none reverse',
      },
    });
  }, { scope: sectionRef });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('sending');

    // Simulate form submission (replace with real endpoint)
    setTimeout(() => {
      setStatus('success');
      setFormData({ firstName: '', lastName: '', phone: '', message: '' });

      // Reset after 4s
      setTimeout(() => setStatus('idle'), 4000);
    }, 1200);
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative bg-black py-32 overflow-hidden"
      aria-label="İletişim"
    >
      {/* Ambient gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 30% 60%, rgba(176,200,232,0.05) 0%, transparent 65%)',
        }}
        aria-hidden="true"
      />

      <div className="container mx-auto px-6 md:px-12 max-w-7xl">

        {/* ── Section label + heading ─────────────────── */}
        <div className="text-center mb-20">
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="w-8 h-px bg-white/20" />
            <span className="text-xs tracking-[0.25em] uppercase text-zinc-500">
              Bizimle Çalışın
            </span>
            <span className="w-8 h-px bg-white/20" />
          </div>
          <h2
            ref={headingRef}
            className="font-display text-[clamp(3rem,8vw,7rem)] leading-[0.9] heading-gradient"
          >
            Haydi Konuşalım
          </h2>
        </div>

        {/* ── Two-column layout ──────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* LEFT — Info */}
          <div ref={leftRef} className="flex flex-col gap-10">
            <p className="text-zinc-400 text-lg leading-relaxed max-w-md">
              Yeni bir proje mi planlıyorsunuz? Markanızı bir üst seviyeye taşımak mı istiyorsunuz?
              Formu doldurun, size en kısa sürede dönelim.
            </p>

            <div className="flex flex-col gap-6">
              {/* Phone */}
              <div className="contact-info-item flex items-start gap-5">
                <div className="shrink-0 w-11 h-11 rounded-2xl border border-zinc-800 flex items-center justify-center bg-zinc-900">
                  <svg className="w-5 h-5 text-zinc-400" viewBox="0 0 24 24" fill="none">
                    <path d="M6.6 10.8C7.8 13.2 9.8 15.2 12.2 16.4L14 14.6C14.2 14.4 14.6 14.4 14.8 14.6C15.8 15 16.8 15.2 17.8 15.2C18.2 15.2 18.6 15.6 18.6 16V18.8C18.6 19.2 18.2 19.6 17.8 19.6C10.4 19.6 4.4 13.6 4.4 6.2C4.4 5.8 4.8 5.4 5.2 5.4H8C8.4 5.4 8.8 5.8 8.8 6.2C8.8 7.2 9 8.2 9.4 9.2C9.6 9.4 9.4 9.8 9.2 10L7.4 11.8C7.2 11.6 6.8 11.2 6.6 10.8Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div>
                  <div className="text-white font-semibold mb-1">Telefon</div>
                  <a href="tel:+905511065528" className="text-zinc-400 hover:text-white transition-colors">
                    +90 (551) 106 55 28
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="contact-info-item flex items-start gap-5">
                <div className="shrink-0 w-11 h-11 rounded-2xl border border-zinc-800 flex items-center justify-center bg-zinc-900">
                  <svg className="w-5 h-5 text-zinc-400" viewBox="0 0 24 24" fill="none">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M22 6l-10 7L2 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div>
                  <div className="text-white font-semibold mb-1">E-posta</div>
                  <a href="mailto:info@felides.com" className="text-zinc-400 hover:text-white transition-colors">
                    info@felides.com
                  </a>
                </div>
              </div>

              {/* Location */}
              <div className="contact-info-item flex items-start gap-5">
                <div className="shrink-0 w-11 h-11 rounded-2xl border border-zinc-800 flex items-center justify-center bg-zinc-900">
                  <svg className="w-5 h-5 text-zinc-400" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="12" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                </div>
                <div>
                  <div className="text-white font-semibold mb-1">Konum</div>
                  <span className="text-zinc-400">İstanbul, Türkiye</span>
                </div>
              </div>
            </div>

            {/* Social links */}
            <div className="flex items-center gap-4 pt-4 border-t border-zinc-900">
              {[
                { label: 'Instagram', href: 'https://www.instagram.com/felidesagency/' },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="text-zinc-500 hover:text-white text-sm transition-colors"
                >
                  {social.label}
                </a>
              ))}
            </div>
          </div>

          {/* RIGHT — Form */}
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="relative rounded-3xl border border-zinc-800/60 bg-zinc-900/40 backdrop-blur-sm p-8 md:p-10"
            aria-label="İletişim formu"
          >
            {/* Form inner glow */}
            <div
              className="absolute inset-0 rounded-3xl pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(255,255,255,0.02) 0%, transparent 60%)',
              }}
              aria-hidden="true"
            />

            <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-5">

              {/* Ad */}
              <div className="form-field flex flex-col gap-2">
                <label htmlFor="contact-firstName" className="text-xs tracking-[0.15em] uppercase text-zinc-500">
                  Ad
                </label>
                <input
                  id="contact-firstName"
                  name="firstName"
                  type="text"
                  required
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Adınız"
                  className="contact-input w-full bg-zinc-800/50 border border-zinc-700/60 rounded-xl px-4 py-3.5 text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-zinc-500 focus:bg-zinc-800 transition-all duration-300"
                />
              </div>

              {/* Soyad */}
              <div className="form-field flex flex-col gap-2">
                <label htmlFor="contact-lastName" className="text-xs tracking-[0.15em] uppercase text-zinc-500">
                  Soyad
                </label>
                <input
                  id="contact-lastName"
                  name="lastName"
                  type="text"
                  required
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Soyadınız"
                  className="contact-input w-full bg-zinc-800/50 border border-zinc-700/60 rounded-xl px-4 py-3.5 text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-zinc-500 focus:bg-zinc-800 transition-all duration-300"
                />
              </div>

              {/* Telefon (full width) */}
              <div className="form-field sm:col-span-2 flex flex-col gap-2">
                <label htmlFor="contact-phone" className="text-xs tracking-[0.15em] uppercase text-zinc-500">
                  Telefon Numarası
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 text-sm select-none">
                    +90
                  </span>
                  <input
                    id="contact-phone"
                    name="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="5XX XXX XX XX"
                    className="contact-input w-full bg-zinc-800/50 border border-zinc-700/60 rounded-xl pl-14 pr-4 py-3.5 text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-zinc-500 focus:bg-zinc-800 transition-all duration-300"
                  />
                </div>
              </div>

              {/* Mesaj (full width) */}
              <div className="form-field sm:col-span-2 flex flex-col gap-2">
                <label htmlFor="contact-message" className="text-xs tracking-[0.15em] uppercase text-zinc-500">
                  Mesajınız
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Projeniz hakkında kısaca bilgi verin…"
                  className="contact-input w-full bg-zinc-800/50 border border-zinc-700/60 rounded-xl px-4 py-3.5 text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-zinc-500 focus:bg-zinc-800 transition-all duration-300 resize-none"
                />
              </div>

              {/* Submit */}
              <div className="form-field sm:col-span-2">
                <button
                  id="contact-submit"
                  type="submit"
                  disabled={status === 'sending' || status === 'success'}
                  className="group relative w-full inline-flex items-center justify-center gap-3 bg-white text-black font-bold text-sm tracking-[0.12em] uppercase px-8 py-4 rounded-full overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(255,255,255,0.15)] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {/* Shimmer sweep */}
                  <span className="absolute inset-0 btn-shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <span className="relative z-10">
                    {status === 'sending' ? 'Gönderiliyor…' : status === 'success' ? '✓ Gönderildi!' : 'Mesaj Gönder'}
                  </span>

                  {status === 'idle' && (
                    <svg
                      className="relative z-10 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                      viewBox="0 0 16 16" fill="none"
                    >
                      <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </button>
              </div>

            </div>
          </form>

        </div>
      </div>
    </section>
  );
};

export default Contact;
