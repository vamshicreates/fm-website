# Fake Muchatlu Archive

Every [@fakemuchatlu](https://www.instagram.com/fakemuchatlu/) post (557 posts, July 2018 – November 2026) on one white page, grouped by style. Every card shows the image, its `instagram.com/p/…` link and date, and clicking it opens that exact post on Instagram.

## Styles

Posts are grouped into styles where the visual look of the account changes (worked out from date-ordered contact sheets in `analysis/`). Each style shows 12 posts at a time in a 3-column grid, with numbered pages for the rest.

| Style | Period | Posts |
|---|---|---:|
| Style 1 | Jul 2018 – Nov 2019 | 96 |
| Style 2 | Nov – Dec 2019 | 24 |
| Style 3 | Dec 2019 – Sep 2020 | 167 |
| Style 4 | Sep – Oct 2020 | 43 |
| Style 5 | Dec 2020 – Aug 2021 | 28 |
| Style 6 | Aug – Dec 2021 | 8 |
| Style 7 | Dec 2021 – Jul 2022 | 45 |
| Style 8 | Jul 2022 – Apr 2023 | 24 |
| Style 9 | Apr 2023 – Jul 2024 | 20 |
| Style 10 | Dec 2024 – Feb 2025 | 16 |
| Style 11 | Feb – Nov 2025 | 65 |
| Style 12 | Nov 2025 – Nov 2026 | 21 |

## Design

Borrowed from the account itself: crimson `#971c1f`, mustard `#e5b33a`, forest `#103b1f`, charcoal `#1f1e25`; Instrument Serif (the italic poster serif), League Gothic (the condensed poster type), Silkscreen (the pixel "FAKE MUCHATLU" labels), Poppins (the early cards); grain texture; the Fm logo rebuilt in CSS. Page background is white.

## Folder

```
fm-website/
├── posts_all/              raw scrape: 1,354 JPGs, 21 MP4s + metadata JSON (not in git)
├── public/images/          800px WebP for every post (+ poster frames for 4 video posts)
├── public/videos/          the 4 video-only posts, web-encoded
├── src/data/posts.json     557 posts with section, link, date, size
├── src/App.jsx, index.css  the site
├── scripts/process_archive.py   raw → WebP pipeline
├── scripts/build_sections.py    assigns each post to its look
└── analysis/               contact sheets used to find the style boundaries
```

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
```

Deployed on Vercel from `main`.

Built by [Vamshi Creates](https://vamshicreates.tech). All posts and artwork belong to @fakemuchatlu.
