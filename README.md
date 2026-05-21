<div align="center">

# ✦ Felides Agency

**Sinematik video prodüksiyon · Drone çekimleri · Web & Grafik Tasarım**

[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![GSAP](https://img.shields.io/badge/GSAP-3-88CE02?style=flat-square&logo=greensock&logoColor=black)](https://gsap.com)

</div>

---

## 📸 Önizleme

> Dijital dünyada iz bırakan sinematik bir ajans web sitesi.  
> Unsplash görselleri, GSAP animasyonları ve yatay scroll deneyimi.

---

## 🚀 Özellikler

- **Hero Section** — Unsplash sinematik arka plan, mouse parallax, GSAP karakter animasyonu, CTA butonları
- **Services Section** — Yatay kaydırmalı (pin + scrub) tam ekran kart galerisi; her karta özel Unsplash görseli
- **Clients Marquee** — Sonsuz döngüde akan referans markaları (CSS animasyonu)
- **Footer** — İletişim ve sosyal bağlantılar
- **Mikro-etkileşimler** — Hover scale, shimmer buton, gradient overlay, scroll indicator

---

## 🛠️ Teknoloji Yığını

| Katman | Araç |
|--------|------|
| UI Framework | React 19 |
| Build Tool | Vite 8 |
| Styling | Tailwind CSS v4 |
| Animasyon | GSAP 3 + ScrollTrigger |
| Scroll | `@studio-freight/react-lenis` |
| İkonlar | Lucide React |
| Fontlar | Inter · Bebas Neue (Google Fonts) |

---

## 📦 Kurulum

```bash
# Depoyu klonla
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
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Navbar.jsx       # Sabit navigasyon çubuğu
│   │   ├── Hero.jsx         # Tam ekran hero bölümü
│   │   ├── Services.jsx     # Yatay scroll hizmet kartları
│   │   ├── Clients.jsx      # Marquee referans şeridi
│   │   └── Footer.jsx       # Footer
│   ├── App.jsx
│   ├── index.css            # Global stiller + Tailwind v4 @theme
│   └── main.jsx
├── index.html
├── tailwind.config.js
├── vite.config.js
└── .vscode/
    └── settings.json        # Tailwind direktifleri için CSS lint ayarı
```

---

## 📜 Komutlar

```bash
npm run dev      # Geliştirme sunucusu (HMR)
npm run build    # Prodüksiyon derlemesi → dist/
npm run preview  # Prodüksiyon önizleme
npm run lint     # ESLint kontrolü
```

---

## 🖼️ Görseller

Proje görselleri için [Unsplash](https://unsplash.com) kullanılmaktadır.  
Prodüksiyon ortamında kendi görsellerinizi `src/components/` dosyalarındaki `img` URL'leriyle değiştirebilirsiniz.

---

## 📄 Lisans

MIT © 2025 Felides Agency
