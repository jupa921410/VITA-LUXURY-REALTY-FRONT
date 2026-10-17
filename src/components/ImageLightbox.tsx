import { useEffect, useState, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from 'lucide-react';

interface ImageLightboxProps {
  isOpen: boolean;
  images: Array<{ src: string; alt?: string; title?: string }>;
  initialIndex?: number;
  onClose: () => void;
}

export default function ImageLightbox({
  isOpen,
  images,
  initialIndex = 0,
  onClose,
}: ImageLightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [zoom, setZoom] = useState(1);

  const [prevInitialIndex, setPrevInitialIndex] = useState(initialIndex);
  if (initialIndex !== prevInitialIndex) {
    setPrevInitialIndex(initialIndex);
    setCurrentIndex(initialIndex);
    setZoom(1);
  }

  const handleNext = useCallback(() => {
    setZoom(1);
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const handlePrev = useCallback(() => {
    setZoom(1);
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleNext, handlePrev, onClose]);

  if (!isOpen || images.length === 0) return null;

  const currentImage = images[currentIndex];

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.3, 3));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.3, 0.7));
  const handleResetZoom = () => setZoom(1);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#070e1b]/98 backdrop-blur-xl select-none animate-fadeIn">
      {/* Top Header Bar */}
      <div className="absolute top-0 left-0 right-0 p-4 sm:p-6 flex items-center justify-between z-20 border-b border-white/10 bg-gradient-to-b from-[#070e1b] to-transparent">
        <div className="flex items-center gap-3">
          <span className="gold-badge text-[9px]">
            {currentIndex + 1} / {images.length}
          </span>
          {currentImage?.alt && (
            <span className="text-xs text-white/80 font-accent tracking-wider hidden sm:inline-block max-w-md truncate">
              {currentImage.alt}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleZoomOut}
            className="p-2 rounded-sm bg-[#0C1730]/80 text-white/70 hover:text-white border border-white/15 hover:border-[#B8892F] transition-all"
            title="Reducir"
          >
            <ZoomOut size={16} />
          </button>
          <button
            onClick={handleResetZoom}
            className="px-2.5 py-1.5 text-[11px] font-mono rounded-sm bg-[#0C1730]/80 text-white/70 hover:text-white border border-white/15 hover:border-[#B8892F] transition-all"
            title="Tamaño Original (100%)"
          >
            {Math.round(zoom * 100)}%
          </button>
          <button
            onClick={handleZoomIn}
            className="p-2 rounded-sm bg-[#0C1730]/80 text-white/70 hover:text-white border border-white/15 hover:border-[#B8892F] transition-all"
            title="Ampliar"
          >
            <ZoomIn size={16} />
          </button>

          <button
            onClick={onClose}
            className="p-2 ml-2 rounded-sm bg-[#B8892F] text-[#070e1b] hover:bg-[#d4a038] transition-all font-bold"
            title="Cerrar (Esc)"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      {/* Main Complete Image Display */}
      <div
        className="w-full h-full p-4 sm:p-12 pt-20 pb-16 flex items-center justify-center overflow-auto"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <img
          src={currentImage.src}
          alt={currentImage.alt || 'Property Full View'}
          style={{
            transform: `scale(${zoom})`,
            transition: zoom === 1 ? 'transform 0.25s ease' : 'none',
          }}
          className="max-w-full max-h-full object-contain shadow-2xl rounded-xs select-none"
          draggable={false}
        />
      </div>

      {/* Navigation Arrows */}
      {images.length > 1 && (
        <>
          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-[#0C1730]/90 text-white/90 border border-[#B8892F]/50 hover:bg-[#B8892F] hover:text-[#0C1730] transition-all shadow-xl z-20"
            title="Anterior (Flecha izquierda)"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-[#0C1730]/90 text-white/90 border border-[#B8892F]/50 hover:bg-[#B8892F] hover:text-[#0C1730] transition-all shadow-xl z-20"
            title="Siguiente (Flecha derecha)"
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}

      {/* Bottom Thumbnail Strip */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 max-w-[90vw] overflow-x-auto flex items-center gap-2 p-2 rounded-sm bg-[#0C1730]/90 border border-[#B8892F]/30 backdrop-blur-md z-20">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => {
                setZoom(1);
                setCurrentIndex(i);
              }}
              className={`relative w-14 h-10 rounded-xs overflow-hidden border shrink-0 transition-all ${
                currentIndex === i
                  ? 'border-[#B8892F] scale-105 ring-2 ring-[#B8892F]/50'
                  : 'border-white/20 opacity-50 hover:opacity-100'
              }`}
            >
              <img src={img.src} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
