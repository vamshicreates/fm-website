import React from 'react';
import { Calendar, Layers, Sparkles, Coffee, Heart, ArrowUpRight } from 'lucide-react';

export default function Hero({ profile, eras, onSelectEra, selectedEra }) {
  return (
    <section className="relative overflow-hidden pt-12 pb-16 px-4 sm:px-6 lg:px-8 border-b border-white/10 light:border-black/10">
      
      {/* Decorative background glow matching the crimson and coffee aesthetic */}
      <div className="absolute top-0 right-1/4 -z-10 w-96 h-96 bg-brand-crimson/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 -z-10 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Main Editorial Text */}
          <div className="lg:col-span-8 space-y-5">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-mono bg-brand-crimson/10 text-brand-crimson border border-brand-crimson/20">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Complete Visual Anthology • 2018–2026</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white light:text-brand-ink leading-[1.1]">
              The Aesthetic Evolution of <br className="hidden sm:block" />
              <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-brand-crimson via-rose-400 to-amber-500">
                @fakemuchatlu
              </span>
            </h1>

            <p className="text-base sm:text-lg text-stone-300 light:text-stone-700 leading-relaxed max-w-2xl font-light">
              Every post, every stroke, every thought. An unfiltered chronicling of Telugu wit, coffee-stained observations, and design reinvention from the early square monochrome quotes to the iconic crimson era.
            </p>

            {/* Author Bio Box */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.03] light:bg-black/[0.03] border border-white/10 light:border-black/10 max-w-2xl relative">
              <div className="flex items-start space-x-3">
                <Coffee className="w-5 h-5 text-amber-500 mt-1 flex-shrink-0" />
                <div className="space-y-1">
                  <p className="font-serif italic text-sm sm:text-base text-stone-200 light:text-stone-800">
                    "{profile?.bio || 'Na stroke chaala amateurish ga untundhi. SCA cert. Making coffee, cleaning tables, mopping floors & pretending to be useful. Currently: destitute.'}"
                  </p>
                  <p className="text-xs font-mono text-stone-500 light:text-stone-500">
                    — Fake Muchatlu (Author & Barista)
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Era Evolution Stats Card */}
          <div className="lg:col-span-4">
            <div className="p-6 rounded-3xl bg-white/[0.04] light:bg-black/[0.03] border border-white/10 light:border-black/10 shadow-2xl backdrop-blur-sm space-y-5">
              <div className="flex items-center justify-between pb-4 border-b border-white/10 light:border-black/10">
                <div>
                  <h3 className="font-serif font-bold text-lg text-white light:text-brand-ink">
                    Archival Overview
                  </h3>
                  <p className="text-xs text-stone-400 light:text-stone-600 font-mono">
                    8 Years • 6 Visual Eras
                  </p>
                </div>
                <div className="w-10 h-10 rounded-full bg-brand-crimson/15 text-brand-crimson flex items-center justify-center font-bold">
                  553
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-center">
                <div className="p-3 rounded-xl bg-white/[0.02] light:bg-black/[0.02] border border-white/5 light:border-black/5">
                  <span className="block text-xl font-bold font-mono text-white light:text-brand-ink">553</span>
                  <span className="text-[11px] font-mono text-stone-400 light:text-stone-600">Total Posts</span>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.02] light:bg-black/[0.02] border border-white/5 light:border-black/5">
                  <span className="block text-xl font-bold font-mono text-white light:text-brand-ink">1,350+</span>
                  <span className="text-[11px] font-mono text-stone-400 light:text-stone-600">Total Slides</span>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.02] light:bg-black/[0.02] border border-white/5 light:border-black/5">
                  <span className="block text-xl font-bold font-mono text-white light:text-brand-ink">69.8K</span>
                  <span className="text-[11px] font-mono text-stone-400 light:text-stone-600">Followers</span>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.02] light:bg-black/[0.02] border border-white/5 light:border-black/5">
                  <span className="block text-xl font-bold font-mono text-white light:text-brand-ink">100%</span>
                  <span className="text-[11px] font-mono text-stone-400 light:text-stone-600">Direct Linked</span>
                </div>
              </div>

              {/* Direct Instagram Action */}
              <a
                href={profile?.url || "https://www.instagram.com/fakemuchatlu/"}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center space-x-2 py-3 rounded-xl bg-white/10 light:bg-black/10 hover:bg-white/15 light:hover:bg-black/15 text-white light:text-brand-ink text-xs font-mono font-medium transition-colors border border-white/10 light:border-black/10"
              >
                <span>Visit Instagram @fakemuchatlu</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

        </div>

        {/* Visual Timeline Section Pills */}
        <div className="mt-12 pt-8 border-t border-white/5 light:border-black/5">
          <p className="text-xs font-mono uppercase tracking-wider text-stone-400 light:text-stone-600 mb-4 flex items-center space-x-2">
            <Layers className="w-3.5 h-3.5 text-brand-crimson" />
            <span>Browse By Visual Era:</span>
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
            {eras.map((era) => {
              const isSelected = selectedEra === era.id;
              return (
                <button
                  key={era.id}
                  onClick={() => onSelectEra(isSelected ? 'all' : era.id)}
                  className={`text-left p-3 rounded-xl border transition-all text-xs ${
                    isSelected
                      ? 'bg-brand-crimson/15 border-brand-crimson text-white light:text-brand-crimson ring-1 ring-brand-crimson'
                      : 'bg-white/[0.02] light:bg-black/[0.02] border-white/10 light:border-black/10 hover:border-white/25 text-stone-300 light:text-stone-700'
                  }`}
                >
                  <div className="flex items-center space-x-1.5 mb-1">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: era.color }} />
                    <span className="font-mono font-bold text-[11px] text-stone-400 light:text-stone-500">{era.years}</span>
                  </div>
                  <div className="font-serif font-bold text-xs truncate">
                    {era.title.split(':')[1]?.trim() || era.title}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
