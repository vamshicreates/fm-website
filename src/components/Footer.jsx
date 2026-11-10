import React from 'react';
import { Coffee, Instagram, Heart, ArrowUp } from 'lucide-react';

export default function Footer({ profile, totalPosts }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="mt-20 border-t border-white/10 light:border-black/10 bg-brand-espresso/90 light:bg-brand-parchment/90 py-12 px-4 sm:px-6 lg:px-8 text-xs font-mono text-stone-400 light:text-stone-600 transition-colors">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Brand details */}
        <div className="flex items-center space-x-3 text-center md:text-left">
          <div className="w-10 h-10 rounded-full bg-brand-crimson/20 text-brand-crimson flex items-center justify-center border border-brand-crimson/30">
            <Coffee className="w-5 h-5" />
          </div>
          <div>
            <p className="font-serif font-bold text-base text-white light:text-brand-ink">
              Fake Muchatlu Visual Anthology
            </p>
            <p className="text-[11px] text-stone-400 light:text-stone-500">
              Preserving 550+ posts, thoughts & Telugu musings from 2018 to 2026.
            </p>
          </div>
        </div>

        {/* Links & Attribution */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs">
          <a
            href="https://www.instagram.com/fakemuchatlu/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-1.5 hover:text-brand-crimson transition-colors"
          >
            <Instagram className="w-3.5 h-3.5" />
            <span>@fakemuchatlu</span>
          </a>

          <span>•</span>

          <span>{totalPosts} Archived Posts</span>

          <span>•</span>

          <button
            onClick={scrollToTop}
            className="flex items-center space-x-1 hover:text-brand-crimson transition-colors p-1.5 rounded-lg bg-white/5 light:bg-black/5"
          >
            <span>Top</span>
            <ArrowUp className="w-3 h-3" />
          </button>
        </div>

      </div>

      <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-white/5 light:border-black/5 text-center text-[11px] text-stone-400 light:text-stone-500">
        All original artwork, quotes, and photography &copy; {new Date().getFullYear()} Fake Muchatlu (@fakemuchatlu). All rights reserved.
      </div>
    </footer>
  );
}
