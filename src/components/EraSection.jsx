import React from 'react';
import PostCard from './PostCard';
import { Sparkles, Calendar, Layers } from 'lucide-react';

export default function EraSection({ era, posts, onOpenLightbox, viewMode }) {
  if (!posts || posts.length === 0) return null;

  // Grid styling based on viewMode
  const gridClasses = {
    grid: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6',
    compact: 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4',
    feed: 'grid grid-cols-1 md:grid-cols-2 max-w-5xl mx-auto gap-8'
  }[viewMode] || 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6';

  return (
    <section id={`era-${era.id}`} className="py-12 border-b border-white/5 light:border-black/5 scroll-mt-36">
      
      {/* Era Header */}
      <div className="mb-8">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-2.5">
          <div className="flex items-center space-x-2.5">
            <span
              className="w-3.5 h-3.5 rounded-full shadow-sm"
              style={{ backgroundColor: era.color }}
            />
            <span className="text-xs font-mono font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-white/5 light:bg-black/5 border border-white/10 light:border-black/10 text-stone-300 light:text-stone-700">
              {era.years}
            </span>
            <span className="text-xs font-mono text-stone-400 light:text-stone-500">
              • {posts.length} Posts
            </span>
          </div>

          <a
            href="#top"
            className="text-[11px] font-mono text-stone-400 hover:text-brand-crimson light:text-stone-500 light:hover:text-brand-crimson transition-colors"
          >
            ↑ Back to Top
          </a>
        </div>

        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white light:text-brand-ink tracking-tight">
          {era.title}
        </h2>

        <p className="mt-1 text-sm text-stone-300 light:text-stone-700 max-w-3xl font-light leading-relaxed">
          {era.subtitle}
        </p>
      </div>

      {/* Grid of posts */}
      <div className={gridClasses}>
        {posts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            onOpenLightbox={onOpenLightbox}
            viewMode={viewMode}
          />
        ))}
      </div>

    </section>
  );
}
