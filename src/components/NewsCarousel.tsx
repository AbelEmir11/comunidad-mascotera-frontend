'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { CommunityNotice } from '@/types';
import { 
  ChevronLeft, 
  ChevronRight, 
  Calendar, 
  MapPin, 
  Sparkles, 
  ArrowRight,
  Syringe,
  PartyPopper,
  AlertCircle
} from 'lucide-react';

interface NewsCarouselProps {
  notices: CommunityNotice[];
}

export default function NewsCarousel({ notices }: NewsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev === notices.length - 1 ? 0 : prev + 1));
  }, [notices.length]);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? notices.length - 1 : prev - 1));
  };

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(nextSlide, 6500);
    return () => clearInterval(interval);
  }, [isPaused, nextSlide]);

  if (!notices || notices.length === 0) return null;

  const currentNotice = notices[currentIndex];

  const getNoticeTheme = (type: CommunityNotice['type']) => {
    switch (type) {
      case 'movil_zoonosis':
        return {
          badgeBg: 'bg-emerald-500 text-white',
          icon: Syringe,
          gradient: 'from-emerald-950/90 via-emerald-900/80 to-stone-900/90',
        };
      case 'meta_lograda':
        return {
          badgeBg: 'bg-amber-500 text-stone-950',
          icon: PartyPopper,
          gradient: 'from-amber-950/90 via-orange-950/80 to-stone-900/90',
        };
      case 'castracion':
        return {
          badgeBg: 'bg-blue-600 text-white',
          icon: Syringe,
          gradient: 'from-blue-950/90 via-indigo-950/80 to-stone-900/90',
        };
      case 'evento_adopcion':
      default:
        return {
          badgeBg: 'bg-rose-500 text-white',
          icon: Sparkles,
          gradient: 'from-rose-950/90 via-stone-900/80 to-stone-950/90',
        };
    }
  };

  const theme = getNoticeTheme(currentNotice.type);
  const Icon = theme.icon;

  return (
    <div 
      className="relative overflow-hidden rounded-3xl shadow-xl border border-stone-100 bg-stone-900 text-white group"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Image with animated transition & dark gradient overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-all duration-700 scale-105"
        style={{ backgroundImage: `url(${currentNotice.image || 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=1200&q=80'})` }}
      />
      <div className={`absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r ${theme.gradient} backdrop-blur-[1px]`} />

      {/* Slide Content */}
      <div className="relative z-10 p-6 sm:p-8 md:p-12 min-h-[360px] md:min-h-[420px] flex flex-col justify-between max-w-3xl">
        
        {/* Top Badges */}
        <div className="flex flex-wrap items-center gap-2.5">
          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wide shadow-sm ${theme.badgeBg}`}>
            <Icon className="w-3.5 h-3.5" />
            {currentNotice.highlightBadge}
          </span>
          {currentNotice.municipality && (
            <span className="bg-white/20 backdrop-blur-md text-white border border-white/30 text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
              <MapPin className="w-3 h-3 text-amber-300" />
              {currentNotice.municipality}, Mza
            </span>
          )}
          {currentNotice.isUrgent && (
            <span className="bg-rose-600/90 text-white text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1 animate-pulse">
              <AlertCircle className="w-3 h-3" />
              Cupos limitados
            </span>
          )}
        </div>

        {/* Center Content */}
        <div className="my-6 space-y-3">
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight leading-tight text-white drop-shadow-sm">
            {currentNotice.title}
          </h3>
          <p className="text-sm sm:text-base text-stone-200 line-clamp-2 sm:line-clamp-3 leading-relaxed max-w-2xl">
            {currentNotice.subtitle}
          </p>
          
          <div className="flex flex-wrap items-center gap-4 pt-2 text-xs sm:text-sm text-amber-200/90 font-medium">
            <div className="flex items-center gap-1.5 bg-black/30 backdrop-blur-xs px-3 py-1.5 rounded-lg border border-white/10">
              <Calendar className="w-4 h-4 text-amber-400" />
              <span>{currentNotice.date}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-black/30 backdrop-blur-xs px-3 py-1.5 rounded-lg border border-white/10">
              <MapPin className="w-4 h-4 text-amber-400" />
              <span>{currentNotice.location}</span>
            </div>
          </div>
        </div>

        {/* Action Button & Indicator Dots */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
          <Link
            href={currentNotice.actionUrl}
            className="inline-flex items-center justify-center gap-2 bg-white text-stone-900 hover:bg-amber-400 hover:text-stone-950 font-bold text-sm px-6 py-3 rounded-xl shadow-lg transition-all duration-200 group/btn w-fit"
          >
            <span>{currentNotice.actionText}</span>
            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
          </Link>

          {/* Controls: Prev / Next and Dots */}
          <div className="flex items-center gap-3 self-end sm:self-center">
            <div className="flex gap-1.5 mr-2">
              {notices.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    currentIndex === idx ? 'w-8 bg-amber-400' : 'w-2 bg-white/40 hover:bg-white/70'
                  }`}
                  aria-label={`Ir a noticia ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={prevSlide}
              className="p-2 rounded-full bg-white/15 hover:bg-white/30 text-white backdrop-blur-md transition-colors"
              aria-label="Noticia anterior"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              className="p-2 rounded-full bg-white/15 hover:bg-white/30 text-white backdrop-blur-md transition-colors"
              aria-label="Siguiente noticia"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
