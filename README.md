# Fake Muchatlu Archive

Every [@fakemuchatlu](https://www.instagram.com/fakemuchatlu/) post (557 posts, July 2018 – November 2026) on one white page, grouped by the look each post was made in. Every card shows the image, its `instagram.com/p/…` link and date, and clicking it opens that exact post on Instagram.

## The 12 looks

The sections come from reading date-ordered contact sheets of every post (`analysis/`) and marking where the visual style actually changes, not from calendar years.

| # | Look | Period | Posts |
|---|------|--------|------:|
| 01 | The Fm Stamp: charcoal/white squares, yellow "#Fake Muchatlu" tag, Fm mark | Jul 2018 – Nov 2019 | 96 |
| 02 | Dashed Frames: logo on top, dotted border, mascot sign-off | Nov – Dec 2019 | 24 |
| 03 | Tweet Cards: avatar + handle tweet layout on white | Dec 2019 – Sep 2020 | 167 |
| 04 | Paper Notes: typewriter serif on grey paper and kraft | Sep – Oct 2020 | 43 |
| 05 | Clean Notes & Chats: bare notes, chat bubbles, challenge lists | Dec 2020 – Aug 2021 | 28 |
| 06 | Dark Serif: black cards, serif, mustard highlights | Aug – Dec 2021 | 8 |
| 07 | Meme Tweets: red FM avatar + Telugu cinema stills | Dec 2021 – Jul 2022 | 45 |
| 08 | Notes App: plain-text notes and iMessage bubbles | Jul 2022 – Apr 2023 | 24 |
| 09 | After Dark: black cards with heavy white type | Apr 2023 – Jul 2024 | 20 |
| 10 | Photo Poems: landscapes with serif overlays | Dec 2024 – Feb 2025 | 16 |
| 11 | Poster Lab: crimson/cream/forest posters, halftone, ghost | Feb – Nov 2025 | 65 |
| 12 | The Red Room: crimson cards, mustard italic serif | Nov 2025 – Nov 2026 | 21 |

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
