import React from 'react';
import { Instagram, Sun, Moon, Coffee, Sparkles, ExternalLink } from 'lucide-react';

export default function Navbar({ isDark, setIsDark, profile, totalPosts }) {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-brand-espresso/90 light:bg-brand-parchment/90 border-b border-white/10 light:border-black/10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand identity */}
        <div className="flex items-center space-x-3.5">
          <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-brand-crimson to-amber-600 flex items-center justify-center text-white shadow-lg shadow-brand-crimson/20 border border-white/20">
            <Coffee className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-serif font-bold text-xl sm:text-2xl text-white light:text-brand-ink tracking-tight">
                Fake Muchatlu
              </span>
              <span className="hidden sm:inline-block px-2 py-0.5 rounded-full text-xs font-mono font-medium bg-brand-crimson/20 text-brand-crimson border border-brand-crimson/30">
                @fakemuchatlu
              </span>
            </div>
            <p className="text-xs text-stone-400 light:text-stone-600 font-mono hidden md:block">
              అబద్ధపు ముచ్చట్లు • 550+ Visual Archives (2018–2026)
            </p>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center space-x-3">
          <div className="hidden lg:flex items-center space-x-3 text-xs font-mono text-stone-400 light:text-stone-600 px-3 py-1.5 rounded-lg bg-white/5 light:bg-black/5 border border-white/5 light:border-black/5">
            <span>❤️ {profile?.followers || '69.8K'} Followers</span>
            <span className="text-stone-600 light:text-stone-400">•</span>
            <span>📑 {totalPosts || 553} Posts</span>
          </div>

          <a
            href="https://www.instagram.com/fakemuchatlu/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-brand-crimson to-rose-700 hover:from-red-600 hover:to-rose-800 text-white font-medium text-xs sm:text-sm shadow-md shadow-brand-crimson/25 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
          >
            <Instagram className="w-4 h-4" />
            <span className="hidden sm:inline">Follow on Instagram</span>
            <span className="sm:hidden">Instagram</span>
            <ExternalLink className="w-3 h-3 opacity-70" />
          </a>

          <button
            onClick={() => setIsDark(!isDark)}
            aria-label="Toggle theme"
            className="p-2.5 rounded-xl bg-white/5 light:bg-black/5 hover:bg-white/10 light:hover:bg-black/10 text-stone-300 light:text-stone-700 border border-white/10 light:border-black/10 transition-colors"
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-stone-700" />}
          </button>
        </div>

      </div>
    </header>
  );
}
