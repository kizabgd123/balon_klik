import React, { useState, useEffect, useCallback } from 'react';
import { 
  Maximize2, X, ChevronLeft, ChevronRight, 
  Heart, Filter, Sparkles, Send, Image as ImageIcon 
} from 'lucide-react';
import { PortfolioItem } from '../types';

interface PhotoGalleryProps {
  items: PortfolioItem[];
  providerName: string;
  onRequestSimilar?: (item: PortfolioItem) => void;
}

export const PhotoGallery: React.FC<PhotoGalleryProps> = ({
  items,
  providerName,
  onRequestSimilar
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Sve');
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);
  const [likedMap, setLikedMap] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem(`baloniklik_likes_${providerName}`);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Extract unique categories
  const categories = ['Sve', ...Array.from(new Set(items.map(i => i.category)))];

  // Filter items
  const filteredItems = selectedCategory === 'Sve'
    ? items
    : items.filter(item => item.category === selectedCategory);

  // Handle like toggle
  const toggleLike = (e: React.MouseEvent, itemId: string) => {
    e.stopPropagation();
    setLikedMap(prev => {
      const updated = { ...prev, [itemId]: !prev[itemId] };
      try {
        localStorage.setItem(`baloniklik_likes_${providerName}`, JSON.stringify(updated));
      } catch (err) {
        console.error(err);
      }
      return updated;
    });
  };

  // Lightbox keyboard controls
  const handleNext = useCallback(() => {
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex((activeLightboxIndex + 1) % filteredItems.length);
    }
  }, [activeLightboxIndex, filteredItems.length]);

  const handlePrev = useCallback(() => {
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex((activeLightboxIndex - 1 + filteredItems.length) % filteredItems.length);
    }
  }, [activeLightboxIndex, filteredItems.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeLightboxIndex === null) return;
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'Escape') setActiveLightboxIndex(null);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeLightboxIndex, handleNext, handlePrev]);

  const activeItem = activeLightboxIndex !== null ? filteredItems[activeLightboxIndex] : null;

  if (!items || items.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-gray-150 p-8 text-center">
        <ImageIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
        <h3 className="text-lg font-bold text-gray-800">Galerija je u pripremi</h3>
        <p className="text-sm text-gray-500 mt-1">Dekorater uskoro dodaje nove fotografije svojih radova.</p>
      </div>
    );
  }

  return (
    <div id="portfolio-gallery-section" className="bg-white rounded-2xl border border-gray-150 shadow-xs p-6 sm:p-8">
      {/* Gallery Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-100">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            Galerija Radova i Portfolio
            <span className="text-xs font-semibold bg-purple-50 text-purple-700 px-2.5 py-1 rounded-full border border-purple-100">
              {items.length} {items.length === 1 ? 'rad' : 'fotografija'}
            </span>
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Pogledajte prethodne postavke, organske lukove i tematske dekoracije koje je izradio <strong className="text-gray-800">{providerName}</strong>
          </p>
        </div>
      </div>

      {/* Category Filter Pills */}
      {categories.length > 1 && (
        <div className="mt-6 flex items-center gap-2 flex-wrap">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-1 mr-1">
            <Filter className="w-3.5 h-3.5" /> Kategorije:
          </span>
          {categories.map(cat => {
            const count = cat === 'Sve' ? items.length : items.filter(i => i.category === cat).length;
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`text-xs font-semibold px-3.5 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-purple-600 text-white shadow-xs'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                <span>{cat}</span>
                <span className={`text-[11px] px-1.5 py-0.2 rounded-full ${isSelected ? 'bg-purple-700/80 text-white' : 'bg-gray-200 text-gray-600'}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      )}

      {/* Gallery Grid */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredItems.map((item, index) => {
          const isLiked = likedMap[item.id];
          const baseLikes = item.likes || 12;
          const displayLikes = isLiked ? baseLikes + 1 : baseLikes;

          return (
            <div
              key={item.id}
              onClick={() => setActiveLightboxIndex(index)}
              className="group relative rounded-2xl overflow-hidden bg-gray-100 border border-gray-150 aspect-4/3 cursor-pointer shadow-xs hover:shadow-md transition-all duration-300"
            >
              {/* Photo */}
              <img
                src={item.url}
                alt={item.title}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-106"
              />

              {/* Gradient Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30 opacity-70 group-hover:opacity-90 transition-opacity" />

              {/* Top Badges */}
              <div className="absolute top-3 inset-x-3 flex justify-between items-center z-10">
                <span className="text-[11px] font-bold bg-white/90 backdrop-blur-xs text-gray-800 px-2.5 py-1 rounded-lg shadow-xs">
                  {item.category}
                </span>

                <button
                  type="button"
                  onClick={(e) => toggleLike(e, item.id)}
                  className={`p-2 rounded-full backdrop-blur-xs transition-transform active:scale-90 ${
                    isLiked 
                      ? 'bg-red-500/90 text-white' 
                      : 'bg-black/30 hover:bg-black/50 text-white'
                  }`}
                  title={isLiked ? 'Sviđa mi se' : 'Označi kao omiljeno'}
                >
                  <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-white' : ''}`} />
                </button>
              </div>

              {/* Bottom Information */}
              <div className="absolute bottom-0 inset-x-0 p-4 text-white z-10">
                <h4 className="font-bold text-sm leading-snug line-clamp-1 group-hover:text-purple-200 transition-colors">
                  {item.title}
                </h4>
                {item.description && (
                  <p className="text-xs text-gray-300 mt-0.5 line-clamp-1 opacity-90">
                    {item.description}
                  </p>
                )}

                <div className="mt-2 flex items-center justify-between text-[11px] text-gray-300 pt-2 border-t border-white/15">
                  <span className="flex items-center gap-1">
                    <Heart className="w-3 h-3 text-red-400 fill-red-400" /> {displayLikes} sviđanja
                  </span>

                  <span className="flex items-center gap-1 font-semibold text-white group-hover:translate-x-0.5 transition-transform">
                    <Maximize2 className="w-3 h-3 text-purple-300" /> Uvećaj
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Fullscreen Lightbox Modal */}
      {activeItem && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6 animate-in fade-in duration-200"
          onClick={() => setActiveLightboxIndex(null)}
        >
          {/* Lightbox Top Bar */}
          <div 
            className="flex items-center justify-between text-white max-w-6xl w-full mx-auto pb-4 border-b border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold bg-purple-600/80 px-3 py-1 rounded-full text-white">
                {activeItem.category}
              </span>
              <span className="text-xs text-gray-400">
                Slika {(activeLightboxIndex ?? 0) + 1} od {filteredItems.length}
              </span>
            </div>

            <button
              onClick={() => setActiveLightboxIndex(null)}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              title="Zatvori (Esc)"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Lightbox Main Stage */}
          <div 
            className="relative flex-1 flex items-center justify-center py-4 max-w-5xl w-full mx-auto min-h-0"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Previous Arrow */}
            {filteredItems.length > 1 && (
              <button
                onClick={handlePrev}
                className="absolute left-0 sm:-left-4 z-20 p-3 rounded-full bg-black/50 hover:bg-purple-600 text-white backdrop-blur-xs transition-all hover:scale-110 cursor-pointer"
                title="Prethodna slika (Leva strelica)"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}

            {/* Photo Container */}
            <div className="max-h-full max-w-full flex items-center justify-center overflow-hidden rounded-2xl shadow-2xl bg-black/40">
              <img
                src={activeItem.url}
                alt={activeItem.title}
                className="max-h-[72vh] max-w-full object-contain rounded-xl select-none"
              />
            </div>

            {/* Next Arrow */}
            {filteredItems.length > 1 && (
              <button
                onClick={handleNext}
                className="absolute right-0 sm:-right-4 z-20 p-3 rounded-full bg-black/50 hover:bg-purple-600 text-white backdrop-blur-xs transition-all hover:scale-110 cursor-pointer"
                title="Sledeća slika (Desna strelica)"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            )}
          </div>

          {/* Lightbox Bottom Caption & Action */}
          <div 
            className="max-w-4xl w-full mx-auto bg-gray-900/85 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-white/10 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-400 shrink-0" />
                <h3 className="font-bold text-base sm:text-lg truncate">{activeItem.title}</h3>
              </div>
              {activeItem.description && (
                <p className="text-xs sm:text-sm text-gray-300 mt-1">
                  {activeItem.description}
                </p>
              )}
            </div>

            <div className="flex items-center gap-3 shrink-0 w-full sm:w-auto justify-end">
              <button
                onClick={(e) => toggleLike(e, activeItem.id)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                  likedMap[activeItem.id]
                    ? 'bg-red-500 text-white'
                    : 'bg-white/10 hover:bg-white/20 text-white'
                }`}
              >
                <Heart className={`w-4 h-4 ${likedMap[activeItem.id] ? 'fill-white' : ''}`} />
                <span>
                  {likedMap[activeItem.id] ? (activeItem.likes || 12) + 1 : (activeItem.likes || 12)}
                </span>
              </button>

              {onRequestSimilar && (
                <button
                  onClick={() => {
                    onRequestSimilar(activeItem);
                    setActiveLightboxIndex(null);
                  }}
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-md transition-all hover:scale-102 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  Želim ovakvu dekoraciju
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotoGallery;
