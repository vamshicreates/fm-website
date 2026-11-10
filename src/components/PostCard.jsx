import React, { useState } from 'react';
import { ExternalLink, Heart, Calendar, Copy, Check, Eye, Layers } from 'lucide-react';

export default function PostCard({ post, onOpenLightbox, viewMode }) {
  const [copied, setCopied] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleCopyLink = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(post.url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formattedDate = post.date
    ? new Date(post.date).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      })
    : '';

  const formatLikes = (num) => {
    if (!num) return '0';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'k';
    return num.toLocaleString();
  };

  return (
    <article className="group relative rounded-2xl overflow-hidden bg-white/[0.03] light:bg-black/[0.02] border border-white/10 light:border-black/10 hover:border-brand-crimson/50 light:hover:border-brand-crimson/50 transition-all duration-300 flex flex-col shadow-lg hover:shadow-2xl hover:shadow-brand-crimson/10">
      
      {/* 
        IMAGE WRAPPER:
        Clicking the image opens the exact post on Instagram in a new tab!
      */}
      <div className="relative overflow-hidden bg-stone-900 aspect-[4/5] flex items-center justify-center">
        
        {/* Placeholder skeleton while loading */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-stone-800 animate-pulse" />
        )}

        <a
          href={post.url}
          target="_blank"
          rel="noopener noreferrer"
          title={`Open on Instagram: ${post.shortcode}`}
          className="w-full h-full block relative cursor-pointer"
        >
          <img
            src={post.image}
            alt={post.caption || `Fake Muchatlu post ${post.shortcode}`}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
            className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-105 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />

          {/* Hover overlay with clear action indicator */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4 pointer-events-none">
            <div className="flex justify-end">
              <span className="px-2.5 py-1 rounded-full text-xs font-mono font-medium bg-brand-crimson text-white shadow-md flex items-center space-x-1">
                <span>Open Post</span>
                <ExternalLink className="w-3 h-3 ml-1" />
              </span>
            </div>

            <p className="text-xs text-white/90 font-serif italic line-clamp-2">
              {post.caption || 'Fake Muchatlu'}
            </p>
          </div>
        </a>

        {/* Carousel multi-slide badge */}
        {post.slides > 1 && (
          <div className="absolute top-3 left-3 pointer-events-none px-2 py-0.5 rounded-lg bg-black/70 backdrop-blur-md text-white font-mono text-[11px] flex items-center space-x-1 border border-white/20">
            <Layers className="w-3 h-3 text-amber-400" />
            <span>{post.slides} slides</span>
          </div>
        )}

        {/* Lightbox preview button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onOpenLightbox(post);
          }}
          title="Preview Slides in Lightbox"
          className="absolute bottom-3 right-3 p-2 rounded-xl bg-black/75 hover:bg-brand-crimson text-white border border-white/20 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-200"
        >
          <Eye className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* 
        CARD DETAILS & DIRECT LINK:
        Clearly displays the link pill, date, likes, and caption
      */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3 bg-brand-espresso/60 light:bg-brand-parchment/60 backdrop-blur-sm">
        
        {/* Caption snippet */}
        {post.caption && (
          <p className="text-xs sm:text-sm text-stone-200 light:text-stone-800 line-clamp-2 font-normal leading-relaxed">
            {post.caption}
          </p>
        )}

        {/* Metadata row: Date & Likes */}
        <div className="flex items-center justify-between text-[11px] font-mono text-stone-400 light:text-stone-600 pt-1 border-t border-white/5 light:border-black/5">
          <span className="flex items-center space-x-1">
            <Calendar className="w-3 h-3 opacity-70" />
            <span>{formattedDate}</span>
          </span>

          <span className="flex items-center space-x-1 text-rose-400 font-semibold">
            <Heart className="w-3 h-3 fill-rose-500/20" />
            <span>{formatLikes(post.likes)}</span>
          </span>
        </div>

        {/* 
          EXPLICIT INSTAGRAM POST LINK PILL:
          Direct link with copy button as required by user!
        */}
        <div className="flex items-center space-x-1.5 pt-2 border-t border-white/5 light:border-black/5">
          <a
            href={post.url}
            target="_blank"
            rel="noopener noreferrer"
            title="Open original Instagram post"
            className="flex-1 flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-white/5 light:bg-black/5 hover:bg-brand-crimson/15 light:hover:bg-brand-crimson/10 border border-white/10 light:border-black/10 hover:border-brand-crimson/30 text-[11px] font-mono text-stone-300 light:text-stone-700 hover:text-brand-crimson transition-colors group/link"
          >
            <span className="truncate">instagram.com/p/{post.shortcode}</span>
            <ExternalLink className="w-3 h-3 ml-1.5 flex-shrink-0 opacity-70 group-hover/link:opacity-100 group-hover/link:text-brand-crimson" />
          </a>

          <button
            onClick={handleCopyLink}
            title={copied ? "Link Copied!" : "Copy Post Link"}
            className="p-1.5 rounded-lg bg-white/5 light:bg-black/5 hover:bg-white/10 light:hover:bg-black/10 text-stone-400 hover:text-white light:hover:text-black border border-white/10 light:border-black/10 transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>

      </div>

    </article>
  );
}
