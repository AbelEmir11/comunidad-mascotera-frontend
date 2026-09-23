'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Pet } from '@/types';
import { MapPin, ShieldCheck, Heart, Building, Users } from 'lucide-react';

interface PetCardProps {
  pet: Pet;
  onFavoriteToggle?: (petId: string, isFav: boolean) => void;
}

const FAVORITES_KEY = 'comunidad_mascotera_favoritos';

export default function PetCard({ pet, onFavoriteToggle }: PetCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(FAVORITES_KEY);
      if (stored) {
        const favIds: string[] = JSON.parse(stored);
        setIsFavorite(favIds.includes(pet.id));
      }
    } catch {
      // LocalStorage fallback
    }
  }, [pet.id]);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      const stored = localStorage.getItem(FAVORITES_KEY);
      let favIds: string[] = stored ? JSON.parse(stored) : [];

      let nextState = false;
      if (favIds.includes(pet.id)) {
        favIds = favIds.filter((id) => id !== pet.id);
        nextState = false;
        setToastMessage(`Eliminado de favoritos`);
      } else {
        favIds.push(pet.id);
        nextState = true;
        setToastMessage(`¡Guardado en favoritos! ❤️`);
      }

      localStorage.setItem(FAVORITES_KEY, JSON.stringify(favIds));
      setIsFavorite(nextState);
      if (onFavoriteToggle) {
        onFavoriteToggle(pet.id, nextState);
      }

      setTimeout(() => setToastMessage(null), 2200);
    } catch {
      setIsFavorite(!isFavorite);
    }
  };

  return (
    <div className="group bg-white rounded-3xl overflow-hidden border border-stone-100 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col hover:-translate-y-1 relative">
      
      {/* Toast Feedback animado */}
      {toastMessage && (
        <div className="absolute top-14 right-3 z-30 bg-stone-900/90 text-white text-[11px] font-bold py-1 px-3 rounded-full shadow-lg backdrop-blur-md animate-in fade-in zoom-in-90 duration-200">
          {toastMessage}
        </div>
      )}

      {/* Image Container */}
      <div className="relative aspect-4/3 w-full overflow-hidden bg-stone-100">
        <div
          className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
          style={{ backgroundImage: `url(${pet.photos[0]})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          <span className="bg-white/95 backdrop-blur-md text-stone-900 text-xs font-extrabold px-3 py-1 rounded-full shadow-sm">
            {pet.species === 'perro' ? '🐶 Perro' : '🐱 Gato'}
          </span>
          {pet.urgent && (
            <span className="bg-rose-500 text-white text-[11px] font-extrabold px-2.5 py-1 rounded-full shadow-sm animate-pulse">
              Adopción Urgente
            </span>
          )}
        </div>

        {/* Botón de Favorito interactivo */}
        <div className="absolute top-3 right-3 z-20">
          <button 
            onClick={toggleFavorite}
            className={`w-9 h-9 rounded-full backdrop-blur-md flex items-center justify-center transition-all shadow-md active:scale-125 cursor-pointer ${
              isFavorite
                ? 'bg-rose-50 text-rose-500 border border-rose-200 scale-105'
                : 'bg-white/80 hover:bg-white text-stone-700 hover:text-rose-500'
            }`}
            title={isFavorite ? 'Quitar de favoritos' : 'Guardar en favoritos'}
            aria-label={isFavorite ? 'Quitar de favoritos' : 'Guardar en favoritos'}
          >
            <Heart className={`w-4 h-4 transition-colors ${isFavorite ? 'fill-rose-500 text-rose-500 animate-in zoom-in-110' : ''}`} />
          </button>
        </div>

        {/* Bottom Details Overlay */}
        <div className="absolute bottom-3 left-3 right-3 text-white">
          <div className="flex items-end justify-between">
            <div>
              <h3 className="text-xl font-black tracking-tight drop-shadow-sm">{pet.name}</h3>
              <p className="text-xs text-stone-200 font-medium">
                {pet.gender === 'macho' ? 'Macho' : 'Hembra'} • {pet.age} • Tamaño {pet.size}
              </p>
            </div>
            {pet.compatibility.apartment && (
              <span className="text-[10px] font-bold bg-amber-500/90 text-stone-950 px-2 py-0.5 rounded-md flex items-center gap-1 shadow-xs">
                <Building className="w-3 h-3" /> Apto Depto
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Body Info */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2.5">
          {/* Shelter ref */}
          <div className="flex items-center gap-1.5 text-xs text-stone-500">
            <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            <span className="font-semibold text-stone-700 truncate">{pet.shelterName}</span>
            <span>•</span>
            <span className="text-stone-400 shrink-0">{pet.shelterLocation.split(',')[0]}</span>
          </div>

          <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
            {pet.story}
          </p>

          {/* Traits tags */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {pet.traits.slice(0, 2).map((t, idx) => (
              <span 
                key={idx}
                className="text-[11px] bg-stone-100 text-stone-700 font-medium px-2.5 py-0.5 rounded-lg"
              >
                {t}
              </span>
            ))}
            {pet.compatibility.kids && (
              <span className="text-[11px] bg-emerald-50 text-emerald-700 font-semibold px-2 py-0.5 rounded-lg flex items-center gap-1">
                <Users className="w-3 h-3" /> Chicos
              </span>
            )}
          </div>
        </div>

        {/* Health Checklist & CTA */}
        <div className="pt-3 border-t border-stone-100 space-y-3">
          <div className="flex items-center gap-3 text-[11px] text-stone-500">
            <span className="flex items-center gap-1 text-emerald-700 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              {pet.health.vaccinated ? 'Vacunado/a' : 'Plan en marcha'}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1 text-emerald-700 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              {pet.health.neutered ? 'Castrado/a' : 'Castración incluida'}
            </span>
          </div>

          <Link
            href={`/mascotas/${pet.id}`}
            className="w-full inline-flex items-center justify-center gap-2 bg-stone-900 hover:bg-amber-500 hover:text-stone-950 text-white font-bold text-xs py-2.5 px-4 rounded-xl transition-colors shadow-xs"
          >
            <span>Conocer a {pet.name}</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
