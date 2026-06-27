<div align="center">

# ✦ Felides Agency

**Web Site · Video Prodüksiyon · Drone Çekimleri · Grafik Tasarım & Baskı · QR Menü**

[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![GSAP](https://img.shields.io/badge/GSAP-3-88CE02?style=flat-square&logo=greensock&logoColor=black)](https://gsap.com)
[![Lenis](https://img.shields.io/badge/Lenis-Smooth%20Scroll-000000?style=flat-square)](https://github.com/darkroomengineering/lenis)

</div>

---

## 📸 Önizleme

> Dijital dünyada iz bırakan sinematik bir ajans web sitesi.
> GSAP ScrollTrigger, Lenis smooth scroll, yatay kart galerisi ve paralaks geçişlerle premium bir deneyim.

---

## 🚀 Özellikler

- **Lenis Smooth Scroll** — `@studio-freight/lenis` ile silky-smooth sayfa kaydırma; GSAP ticker ile frame-perfect senkronizasyon
- **Hero Section** — Sinematik Unsplash arka plan, mouse parallax, GSAP karakter-karakter title animasyonu, scroll-exit parallax
- **Services Section** — 5 hizmet kartı; yatay pin + scrub + snap scroll; sol metin paneli / sağ ilgili görsel split layout; canlı progress bar
- **Clients Marquee** — GSAP infinite tween; hover'da timeScale ile yavaşlama efekti
- **Navbar** — Saf GSAP ScrollTrigger ile yön bazlı göster/gizle; sıfır React re-render
- **Footer** — Stagger reveal + border çizgi animasyonu
- **Mikro-etkileşimler** — Hover scale, shimmer buton, gradient overlay, scroll indicator bounce

---

## 🛠️ Teknoloji Yığını

| Katman | Araç |
|--------|------|
| UI Framework | React 19 |
| Build Tool | Vite 8 |
| Styling | Tailwind CSS v4 |
| Animasyon | GSAP 3 + ScrollTrigger + useGSAP |
| Smooth Scroll | `@studio-freight/lenis` |
| İkonlar | Lucide React |
| Fontlar | Inter · Bebas Neue (Google Fonts) |

---

## 📦 Kurulum

```bash
# Repoyu klonla
git clone https://github.com/KULLANICI_ADIN/felides-agency.git
cd felides-agency

# Bağımlılıkları yükle
npm install

# Geliştirme sunucusunu başlat
npm run dev
```

Tarayıcıda `http://localhost:5173` adresini aç.

---

## 🗂️ Proje Yapısı

```
felides-agency/
├── public/
│   ├── felideslogo.jpeg
│   └── icons.svg
├── src/
│   ├── components/
│   │   ├── Navbar.jsx       # GSAP ScrollTrigger ile hide/show navbar
│   │   ├── Hero.jsx         # Tam ekran hero + mouse parallax + scroll-exit
│   │   ├── Services.jsx     # Yatay scroll hizmet kartları (split layout)
│   │   ├── Clients.jsx      # GSAP infinite marquee + hover slowdown
│   │   └── Footer.jsx       # Stagger reveal footer
│   ├── hooks/
│   │   └── useLenisScroll.js  # Lenis ↔ GSAP ticker köprüsü
│   ├── App.jsx              # Root component + global plugin kaydı
│   ├── index.css            # Global stiller + Tailwind v4 @theme
│   └── main.jsx
├── index.html
├── tailwind.config.js
├── vite.config.js
├── package.json
└── .gitignore
```

---

## 📜 Komutlar

```bash
npm run dev      # Geliştirme sunucusu (HMR aktif)
npm run build    # Prodüksiyon derlemesi → dist/
npm run preview  # Prodüksiyon önizleme
npm run lint     # ESLint kontrolü
```

---

## 🎨 Animasyon Mimarisi

```
useLenisScroll()
  ├── new Lenis({ lerp: 0.1, smoothWheel: true })
  ├── gsap.ticker.add(t => lenis.raf(t * 1000))   ← frame-perfect sync
  └── lenis.on('scroll', ScrollTrigger.update)

Navbar     → ScrollTrigger.create onUpdate (direction-aware)
Hero       → entrance timeline + mouse parallax + 3× scrub tweens
Services   → pin + scrub + snap + progress bar onUpdate + img parallax
Clients    → gsap.to(track, { xPercent:-50, repeat:-1 }) + timeScale hover
Footer     → 4× ScrollTrigger reveals (title, desc, links stagger, border draw)
```

---

## 🖼️ Görseller

Tüm görseller [Unsplash](https://unsplash.com) üzerinden yüklenmektedir (API key gerekmez).
Prodüksiyon ortamında kendi görsellerinizi `src/components/` dosyalarındaki `img` URL'leriyle değiştirebilirsiniz.

---

## 📄 Lisans

MIT © 2025 Felides Agency
