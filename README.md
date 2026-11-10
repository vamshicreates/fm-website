# Fake Muchatlu (@fakemuchatlu) Visual Archive & Anthology (2018–2026)

An interactive, responsive web archive commemorating 8 years of **Fake Muchatlu** (అబద్ధపు ముచ్చట్లు) — the iconic Telugu writer, barista, and visual essayist known for dry self-deprecating wit, coffee house philosophy, and minimalist typography.

---

## ✨ Features

- **Full Archival Collection**: Every single post (550+ posts, 1,350+ images/slides) spanning from the July 2018 inception to November 2026.
- **Sectioned by Stylistic Evolution**: The creator's aesthetic evolved dramatically over 8 years. Posts are organized chronologically and stylistically into 6 distinct eras:
  1. 🔴 **Era VI: Crimson & Contemporary (2025–2026)** — Bold vermilion & deep wine cards with modern Telugu attitude.
  2. 🎨 **Era V: Pastel & Tinted Canvas (2024)** — Soft pastels, sky blue tints, and illustrated contemplative notes.
  3. 🌑 **Era IV: Midnight Charcoal & Dark Room (2022–2023)** — Obsidian and deep graphite cards; late-night unfiltered musings.
  4. 📜 **Era III: White Parchment & Journal Notes (2020–2021)** — Clean off-white paper, ink pen lettering, 90s Telugu nostalgia, and lockdown reflections.
  5. ◻️ **Era II: Monochromatic Square Reflections (2019)** — Classic square format, understated monochrome palettes, and punchy sarcastic social commentary.
  6. 🏛️ **Era I: The Genesis & Raw Foundations (2018)** — Dark slate textures, square frames, and early philosophical verses that sparked the account.
- **Direct Instagram Linking**: Every card features the image, caption, date, likes count, and a direct link pill (`instagram.com/p/{shortcode}`). Clicking the card or link navigates directly to the original Instagram post!
- **Interactive Lightbox Modal**: View high-resolution multi-slide carousels, read full captions, navigate with arrow keys, and copy direct links with one click.
- **Search & Sort Engine**: Real-time filtering by caption text, dates, Telugu words, and Romanized phrases. Sort by Newest, Oldest, Most Liked, or Most Slides.
- **View Switcher**: Standard Grid, Compact Gallery (for scanning large volumes), and Editorial Feed.
- **Dual Theme Support**: Dark Espresso Mode and Warm Parchment Light Mode.

---

## 📂 Directory Structure

```
fm-website/
├── posts_all/         # Complete untouched raw archive of all 1,354 JPGs, 21 MP4s, and 1,375 JSONs
├── public/
│   ├── data/posts.json # Compiled metadata database
│   └── images/         # Optimized 800px WebP images for instant web loading
├── src/
│   ├── components/     # Navbar, Hero, ControlsBar, EraSection, PostCard, LightboxModal, Footer
│   ├── data/posts.json # Bundled JSON for fast client-side filtering
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── scripts/
│   └── process_archive.py # Pipeline that processed the raw Instagram data & generated WebP assets
└── package.json
```

---

## 🚀 Running Locally

```bash
cd fm-website
npm install
npm run dev
```

Visit `http://localhost:3000` to browse the archive.

## 🏗️ Production Build

```bash
npm run build
npm run preview
```

---

## ☕ Author Bio Quote
> *"Na stroke chaala amateurish ga untundhi. SCA cert. Making coffee, cleaning tables, mopping floors & pretending to be useful. Currently: destitute."*  
> — **Fake Muchatlu**
