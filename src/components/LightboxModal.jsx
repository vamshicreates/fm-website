import React, { useState, useEffect } from 'react';
import { X, ExternalLink, ChevronLeft, ChevronRight, Heart, Calendar, Copy, Check, Instagram } from 'lucide-react';

export default function LightboxModal({ post, onClose }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' && post?.images?.length > 1) {
        setCurrentSlide((prev) => (prev + 1) % post.images.length);
      }
      if (e.key === 'ArrowLeft' && post?.images?.length > 1) {
        setCurrentSlide((prev) => (prev - 1 + post.images.length) % post.images.length);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [post, onClose]);

  if (!post) return null;

  const slides = post.images && post.images.length > 0 ? post.images : [post.image];
  const activeImage = slides[currentSlide];

  const handleCopyLink = () => {
    navigator.clipboard.writeText(post.url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formattedDate = post.date
    ? new Date(post.date).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      })
    : '';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative max-w-4xl w-full max-h-[92vh] rounded-3xl bg-brand-espresso light:bg-brand-parchment border border-white/10 light:border-black/10 overflow-hidden shadow-2xl flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-md transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left: Image / Carousel area */}
        <div className="relative md:w-3/5 bg-black flex items-center justify-center min-h-[350px] md:min-h-[550px]">
          <img
            src={activeImage}
            alt={post.caption || `Fake Muchatlu post ${post.shortcode}`}
            className="w-full h-full max-h-[70vh] md:max-h-[85vh] object-contain"
          />

          {/* Slide navigation if carousel */}
          {slides.length > 1 && (
            <>
              <button
                onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
                aria-label="Previous slide"
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 hover:bg-brand-crimson text-white backdrop-blur-md transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
                aria-label="Next slide"
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 hover:bg-brand-crimson text-white backdrop-blur-md transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-white font-mono text-xs border border-white/20">
                {currentSlide + 1} / {slides.length}
              </div>
            </>
          )}
        </div>

        {/* Right: Metadata & Actions */}
        <div className="md:w-2/5 p-6 flex flex-col justify-between overflow-y-auto space-y-6">
          <div className="space-y-4">
            
            <div className="flex items-center justify-between pb-3 border-b border-white/10 light:border-black/10">
              <span className="font-serif font-bold text-lg text-white light:text-brand-ink">
                Fake Muchatlu
              </span>
              <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-brand-crimson/15 text-brand-crimson border border-brand-crimson/20">
                {post.shortcode}
              </span>
            </div>

            {/* Date & Likes */}
            <div className="flex items-center justify-between text-xs font-mono text-stone-400 light:text-stone-600">
              <span className="flex items-center space-x-1.5">
                <Calendar className="w-3.5 h-3.5" />
                <span>{formattedDate}</span>
              </span>

              {post.likes > 0 && (
                <span className="flex items-center space-x-1 text-rose-400 font-semibold">
                  <Heart className="w-3.5 h-3.5 fill-rose-500/20" />
                  <span>{post.likes.toLocaleString()} likes</span>
                </span>
              )}
            </div>

            {/* Caption */}
            <div className="space-y-2">
              <p className="text-xs font-mono uppercase text-stone-500 tracking-wider">
                Original Caption:
              </p>
              <div className="p-3.5 rounded-xl bg-white/[0.03] light:bg-black/[0.03] border border-white/5 light:border-black/5 text-sm text-stone-200 light:text-stone-800 leading-relaxed font-normal whitespace-pre-wrap max-h-48 overflow-y-auto">
                {post.caption || '(No caption provided for this post)'}
              </div>
            </div>

          </div>

          {/* Action buttons */}
          <div className="space-y-2.5 pt-4 border-t border-white/10 light:border-black/10">
            <a
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-xl bg-gradient-to-r from-brand-crimson to-rose-700 hover:from-red-600 hover:to-rose-800 text-white font-medium text-sm shadow-lg shadow-brand-crimson/20 transition-all"
            >
              <Instagram className="w-4 h-4" />
              <span>Open Post on Instagram</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-80" />
            </a>

            <button
              onClick={handleCopyLink}
              className="w-full flex items-center justify-center space-x-2 py-2.5 px-4 rounded-xl bg-white/5 light:bg-black/5 hover:bg-white/10 light:hover:bg-black/10 text-stone-300 light:text-stone-700 text-xs font-mono border border-white/10 light:border-black/10 transition-colors"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Link Copied to Clipboard!' : 'Copy Instagram Link'}</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
