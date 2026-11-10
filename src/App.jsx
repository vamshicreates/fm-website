import React, { useState, useEffect, useMemo } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ControlsBar from './components/ControlsBar';
import EraSection from './components/EraSection';
import LightboxModal from './components/LightboxModal';
import Footer from './components/Footer';
import postsData from './data/posts.json';

export default function App() {
  const [isDark, setIsDark] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEra, setSelectedEra] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState('grid');
  const [lightboxPost, setLightboxPost] = useState(null);

  // Sync theme with HTML class
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    }
  }, [isDark]);

  const { profile, eras, posts } = postsData;

  // Filter & sort posts
  const filteredPosts = useMemo(() => {
    let result = [...posts];

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.caption.toLowerCase().includes(q) ||
          p.date?.toLowerCase().includes(q) ||
          p.shortcode.toLowerCase().includes(q)
      );
    }

    // Era filter
    if (selectedEra !== 'all') {
      result = result.filter((p) => p.era === selectedEra);
    }

    // Sorting
    result.sort((a, b) => {
      if (sortBy === 'newest') return (b.date || '').localeCompare(a.date || '');
      if (sortBy === 'oldest') return (a.date || '').localeCompare(b.date || '');
      if (sortBy === 'likes') return (b.likes || 0) - (a.likes || 0);
      if (sortBy === 'slides') return (b.slides || 1) - (a.slides || 1);
      return 0;
    });

    return result;
  }, [posts, searchQuery, selectedEra, sortBy]);

  // Group filtered posts by Era for section-by-section display
  const postsByEra = useMemo(() => {
    const map = {};
    eras.forEach((era) => {
      map[era.id] = [];
    });
    filteredPosts.forEach((post) => {
      if (map[post.era]) {
        map[post.era].push(post);
      }
    });
    return map;
  }, [filteredPosts, eras]);

  return (
    <div className={`min-h-screen ${isDark ? 'bg-brand-espresso text-[#EAE5D9]' : 'bg-brand-parchment text-brand-ink'} transition-colors duration-300 font-sans`}>
      <a id="top" className="sr-only">Top</a>

      {/* Navigation */}
      <Navbar
        isDark={isDark}
        setIsDark={setIsDark}
        profile={profile}
        totalPosts={posts.length}
      />

      {/* Hero Section */}
      <Hero
        profile={profile}
        eras={eras}
        selectedEra={selectedEra}
        onSelectEra={(eraId) => {
          setSelectedEra(eraId);
          // If selecting an era, scroll smoothly to it
          if (eraId !== 'all') {
            setTimeout(() => {
              const el = document.getElementById(`era-${eraId}`);
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }, 50);
          }
        }}
      />

      {/* Sticky Filter & Search Bar */}
      <ControlsBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedEra={selectedEra}
        setSelectedEra={setSelectedEra}
        eras={eras}
        sortBy={sortBy}
        setSortBy={setSortBy}
        viewMode={viewMode}
        setViewMode={setViewMode}
        filteredCount={filteredPosts.length}
        totalCount={posts.length}
      />

      {/* Main Content Sections: Sectioned by style era */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {filteredPosts.length === 0 ? (
          <div className="py-20 text-center space-y-3">
            <p className="font-serif text-2xl text-stone-400">No posts found matching your search</p>
            <p className="text-sm font-mono text-stone-500">
              Try searching for different words, or reset your filters.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedEra('all');
              }}
              className="mt-4 px-4 py-2 rounded-xl bg-brand-crimson text-white text-xs font-mono"
            >
              Reset Filters
            </button>
          </div>
        ) : selectedEra === 'all' && !searchQuery.trim() ? (
          /* Render all distinct style sections in chronological evolution */
          eras.map((era) => (
            <EraSection
              key={era.id}
              era={era}
              posts={postsByEra[era.id]}
              onOpenLightbox={(post) => setLightboxPost(post)}
              viewMode={viewMode}
            />
          ))
        ) : (
          /* When filtered by era or search, display matching eras */
          eras.map((era) => {
            const eraPosts = postsByEra[era.id];
            if (!eraPosts || eraPosts.length === 0) return null;
            return (
              <EraSection
                key={era.id}
                era={era}
                posts={eraPosts}
                onOpenLightbox={(post) => setLightboxPost(post)}
                viewMode={viewMode}
              />
            );
          })
        )}

      </main>

      {/* Lightbox Modal for viewing carousels and details */}
      {lightboxPost && (
        <LightboxModal
          post={lightboxPost}
          onClose={() => setLightboxPost(null)}
        />
      )}

      {/* Footer */}
      <Footer profile={profile} totalPosts={posts.length} />
    </div>
  );
}
