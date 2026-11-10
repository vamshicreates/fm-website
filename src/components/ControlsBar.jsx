import React from 'react';
import { Search, SlidersHorizontal, Grid, LayoutGrid, Rows, X } from 'lucide-react';

export default function ControlsBar({
  searchQuery,
  setSearchQuery,
  selectedEra,
  setSelectedEra,
  eras,
  sortBy,
  setSortBy,
  viewMode,
  setViewMode,
  filteredCount,
  totalCount
}) {
  return (
    <div className="sticky top-20 z-30 backdrop-blur-md bg-brand-espresso/95 light:bg-brand-parchment/95 border-b border-white/10 light:border-black/10 py-3.5 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3.5">
        
        {/* Search input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Search captions, dates, quotes, Telugu text..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-9 py-2 rounded-xl bg-white/[0.05] light:bg-black/[0.05] border border-white/10 light:border-black/10 text-xs sm:text-sm text-white light:text-brand-ink placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-brand-crimson focus:border-brand-crimson transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 text-stone-400 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Filters, Sorters & View Switcher */}
        <div className="flex flex-wrap items-center gap-2.5">
          
          {/* Era Filter Dropdown or Pills */}
          <select
            value={selectedEra}
            onChange={(e) => setSelectedEra(e.target.value)}
            className="px-3 py-2 rounded-xl bg-white/[0.05] light:bg-black/[0.05] border border-white/10 light:border-black/10 text-xs font-mono text-stone-200 light:text-stone-800 focus:outline-none focus:ring-1 focus:ring-brand-crimson"
          >
            <option value="all">All Eras ({totalCount})</option>
            {eras.map((era) => (
              <option key={era.id} value={era.id}>
                {era.title.split(':')[1]?.trim() || era.title} ({era.years})
              </option>
            ))}
          </select>

          {/* Sort By Dropdown */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 rounded-xl bg-white/[0.05] light:bg-black/[0.05] border border-white/10 light:border-black/10 text-xs font-mono text-stone-200 light:text-stone-800 focus:outline-none focus:ring-1 focus:ring-brand-crimson"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="likes">Most Liked ❤️</option>
            <option value="slides">Most Carousel Slides</option>
          </select>

          {/* View Mode Toggle */}
          <div className="hidden sm:flex items-center space-x-1 p-1 rounded-xl bg-white/[0.05] light:bg-black/[0.05] border border-white/10 light:border-black/10">
            <button
              onClick={() => setViewMode('grid')}
              title="Standard Grid"
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'grid'
                  ? 'bg-brand-crimson text-white shadow-sm'
                  : 'text-stone-400 hover:text-white light:hover:text-black'
              }`}
            >
              <Grid className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setViewMode('compact')}
              title="Compact Gallery"
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'compact'
                  ? 'bg-brand-crimson text-white shadow-sm'
                  : 'text-stone-400 hover:text-white light:hover:text-black'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setViewMode('feed')}
              title="Editorial Feed"
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'feed'
                  ? 'bg-brand-crimson text-white shadow-sm'
                  : 'text-stone-400 hover:text-white light:hover:text-black'
              }`}
            >
              <Rows className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Result Count Indicator */}
          <span className="text-[11px] font-mono text-stone-400 light:text-stone-600 pl-1">
            Showing <strong className="text-white light:text-black">{filteredCount}</strong> posts
          </span>

        </div>

      </div>
    </div>
  );
}
