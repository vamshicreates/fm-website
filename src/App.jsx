import React, { useEffect, useMemo, useState } from 'react';
import data from './data/posts.json';

const IG = 'https://www.instagram.com/fakemuchatlu/';

// One swatch per look, sampled from the posts themselves.
const SWATCH = {
  stamp: '#1f1e25', dashed: '#5f5d66', tweets: '#1d9bf0', paper: '#b08d63',
  notes: '#9a978f', serif: '#c99a2e', memes: '#d43a2f', notesapp: '#3478f6',
  dark: '#0d0d0f', photo: '#6f7f52', poster: '#103b1f', red: '#971c1f',
};

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const ym = (s) => `${MONTHS[+s.slice(5, 7) - 1]} ${s.slice(0, 4)}`;
const fullDate = (s) => `${+s.slice(8, 10)} ${MONTHS[+s.slice(5, 7) - 1]} ${s.slice(0, 4)}`;
const pad = (n) => String(n).padStart(2, '0');

function FmMark({ size = 34 }) {
  return (
    <span className="fm-mark" style={{ fontSize: size }} aria-hidden="true">
      F<span className="fm-m">m</span>
    </span>
  );
}

function Header({ total }) {
  return (
    <header className="topbar">
      <a href="#top" className="brand" aria-label="Fake Muchatlu archive, back to top">
        <FmMark size={26} />
        <span className="pixel">Fake Muchatlu</span>
      </a>
      <a className="ig-btn" href={IG} target="_blank" rel="noopener noreferrer">
        @fakemuchatlu <span aria-hidden="true">↗</span>
      </a>
    </header>
  );
}

function Hero({ profile, sections, total }) {
  const years = new Date().getFullYear() - 2018;
  return (
    <section className="hero" id="top">
      <div className="hero-card grain">
        <span className="pixel hero-kicker">Orey archive</span>
        <h1 className="hero-title">
          <em>Na stroke</em> chaala <br />amateurish ga <em>untundhi.</em>
        </h1>
        <p className="hero-sub">
          Every post from <strong>@fakemuchatlu</strong>, July 2018 to today, grouped by style.
          Tap any post to open it on Instagram.
        </p>
        <div className="hero-stats">
          <div><b>{total}</b><span className="pixel">posts</span></div>
          <div><b>{years}</b><span className="pixel">years</span></div>
          <div><b>{profile.followers}</b><span className="pixel">followers</span></div>
        </div>
        <span className="pixel hero-swipe">scroll --&gt;</span>
      </div>
    </section>
  );
}

function LookIndex({ sections, firstImages, order }) {
  return (
    <section className="index" aria-label="All looks">
      <div className="index-head">
        <h2 className="poster-h">Styles</h2>
        <p>Jump to a style.</p>
      </div>
      <ol className="index-grid">
        {order.map((s) => (
          <li key={s.id}>
            <a href={`#${s.id}`} className="index-card">
              <div className="index-thumbs">
                {(firstImages[s.id] || []).map((src, i) => (
                  <img key={i} src={src} alt="" loading="lazy" width="80" height="80" />
                ))}
              </div>
              <div className="index-meta">
                <span className="index-title"><i style={{ background: SWATCH[s.id] }} />Style {s.no}</span>
                <span className="pixel index-dates">{ym(s.from + '-01')} – {ym(s.to + '-01')} · {s.count}</span>
              </div>
            </a>
          </li>
        ))}
      </ol>
    </section>
  );
}

function SectionNav({ order, active, newestFirst, setNewestFirst }) {
  useEffect(() => {
    const el = document.querySelector(`.secnav a[data-id="${active}"]`);
    if (el) el.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' });
  }, [active]);
  return (
    <nav className="secnav" aria-label="Sections">
      <div className="secnav-track">
        {order.map((s) => (
          <a key={s.id} data-id={s.id} href={`#${s.id}`} className={active === s.id ? 'on' : ''}
             style={{ '--sw': SWATCH[s.id] }}>
            <i />Style {s.no}
          </a>
        ))}
      </div>
      <button className="order-btn pixel" onClick={() => setNewestFirst(!newestFirst)}>
        {newestFirst ? 'Newest first' : 'Oldest first'} ⇅
      </button>
    </nav>
  );
}

function PostCard({ p }) {
  return (
    <a className="post" href={p.url} target="_blank" rel="noopener noreferrer"
       title={p.caption ? p.caption.slice(0, 140) : 'Open on Instagram'}>
      <div className="post-img">
        <img src={p.image} alt={p.caption ? p.caption.slice(0, 120) : `Fake Muchatlu post, ${fullDate(p.date)}`}
             loading="lazy" decoding="async" width={p.w} height={p.h} />
        {p.video && <span className="badge">▶ video</span>}
        {!p.video && p.slides > 1 && <span className="badge">1 / {p.slides}</span>}
      </div>
      <div className="post-meta">
        <span className="post-link"><span className="lnk-pre">instagram.com/p/</span>{p.shortcode} <span aria-hidden="true">↗</span></span>
        <span className="post-date">{fullDate(p.date)}</span>
      </div>
    </a>
  );
}

const PER_PAGE = 12;

function Pager({ page, pages, go }) {
  if (pages <= 1) return null;
  return (
    <nav className="pager" aria-label="Pages">
      <button className="pg-arrow" onClick={() => go(page - 1)} disabled={page === 0} aria-label="Previous page">←</button>
      {Array.from({ length: pages }, (_, i) => (
        <button key={i} className={i === page ? 'pg on' : 'pg'} onClick={() => go(i)}
                aria-current={i === page ? 'page' : undefined}>{i + 1}</button>
      ))}
      <button className="pg-arrow" onClick={() => go(page + 1)} disabled={page === pages - 1} aria-label="Next page">→</button>
    </nav>
  );
}

function Section({ s, posts }) {
  const [page, setPage] = useState(0);
  const pages = Math.ceil(posts.length / PER_PAGE);
  // uniform cells per style: use the style's most common shape so nothing is cropped
  const ratio = useMemo(() => {
    const r = posts.map((p) => p.w / p.h).sort((a, b) => a - b);
    return r[Math.floor(r.length / 2)] || 0.8;
  }, [posts]);
  const go = (i) => {
    setPage(Math.max(0, Math.min(pages - 1, i)));
    document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  const shown = posts.slice(page * PER_PAGE, page * PER_PAGE + PER_PAGE);
  return (
    <section className="look" id={s.id} style={{ '--sw': SWATCH[s.id] }}>
      <header className="look-head">
        <span className="look-no">{pad(s.no)}</span>
        <div className="look-text">
          <span className="pixel look-dates">{ym(s.from + '-01')} – {ym(s.to + '-01')} · {s.count} posts</span>
          <h2 className="look-title">Style {s.no}</h2>
        </div>
        {pages > 1 && <span className="pixel look-page">Page {page + 1} / {pages}</span>}
      </header>
      <div className="grid3" style={{ '--ratio': ratio }}>
        {shown.map((p) => <PostCard key={p.id} p={p} />)}
      </div>
      <Pager page={page} pages={pages} go={go} />
    </section>
  );
}

export default function App() {
  const { profile, sections, posts } = data;
  const [newestFirst, setNewestFirst] = useState(false);
  const [active, setActive] = useState(sections[0].id);

  const bySection = useMemo(() => {
    const m = {};
    for (const p of posts) (m[p.section] ||= []).push(p); // posts.json is newest-first
    return m;
  }, [posts]);

  const order = newestFirst ? [...sections].reverse() : sections;

  const firstImages = useMemo(() => {
    const m = {};
    for (const s of sections) {
      const list = bySection[s.id] || [];
      const step = Math.max(1, Math.floor(list.length / 3));
      m[s.id] = [0, 1, 2].map((i) => list[Math.min(list.length - 1, i * step)]?.image).filter(Boolean);
    }
    return m;
  }, [sections, bySection]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' }
    );
    document.querySelectorAll('.look').forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [newestFirst]);

  return (
    <>
      <Header total={posts.length} />
      <main>
        <Hero profile={profile} sections={sections} total={posts.length} />
        <LookIndex sections={sections} order={order} firstImages={firstImages} />
        <SectionNav order={order} active={active} newestFirst={newestFirst} setNewestFirst={setNewestFirst} />
        {order.map((s) => {
          const list = bySection[s.id] || [];
          return <Section key={s.id + (newestFirst ? '-n' : '-o')} s={s} posts={newestFirst ? list : [...list].reverse()} />;
        })}
      </main>
      <footer className="foot">
        <div className="foot-card grain">
          <FmMark size={44} />
          <p>All posts and artwork belong to <a href={IG} target="_blank" rel="noopener noreferrer">@fakemuchatlu</a>. Every card opens the original post.</p>
          <p className="pixel">Built by <a href="https://vamshicreates.tech" target="_blank" rel="noopener noreferrer">Vamshi Creates</a></p>
        </div>
      </footer>
    </>
  );
}
