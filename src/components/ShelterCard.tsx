'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Shelter } from '@/types';
import { MapPin, Copy, Check, ArrowRight, Dog, HeartHandshake } from 'lucide-react';

interface ShelterCardProps {
  shelter: Shelter;
}

export default function ShelterCard({ shelter }: ShelterCardProps) {
  const [copied, setCopied] = useState(false);

  const copyAlias = () => {
    navigator.clipboard.writeText(shelter.alias);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const topNeed = shelter.needs[0];

  return (
    <div className="bg-white rounded-3xl overflow-hidden border border-stone-100 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col hover:-translate-y-1">
      {/* Cover Image & Shelter Logo */}
      <div className="relative h-36 w-full bg-stone-200">
        <div 
          className="w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url(${shelter.coverImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

        {/* Animals Count Badge */}
        <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md text-stone-900 text-xs font-bold px-3 py-1 rounded-full shadow-sm flex items-center gap-1.5">
          <Dog className="w-3.5 h-3.5 text-amber-600" />
          <span>{shelter.animalsCount} en tránsito</span>
        </div>

        {/* Zone Badge */}
        <div className="absolute bottom-3 left-20 text-white">
          <div className="flex items-center gap-1 text-xs font-medium drop-shadow-xs">
            <MapPin className="w-3.5 h-3.5 text-amber-400" />
            <span>{shelter.zone}, Mendoza</span>
          </div>
        </div>

        {/* Avatar / Logo */}
        <div className="absolute -bottom-5 left-4 w-14 h-14 rounded-2xl border-2 border-white shadow-md overflow-hidden bg-white">
          <img 
            src={shelter.logo} 
            alt={shelter.name} 
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Content */}
      <div className="pt-7 px-5 pb-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <h3 className="text-lg font-black text-stone-900 tracking-tight leading-snug">
            {shelter.name}
          </h3>
          <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
            {shelter.tagline}
          </p>
        </div>

        {/* Urgent Need snippet */}
        {topNeed && (
          <div className="bg-amber-50/70 border border-amber-200/60 rounded-2xl p-3 space-y-1.5">
            <div className="flex items-center justify-between text-[11px] font-bold text-amber-900">
              <span className="flex items-center gap-1">
                <HeartHandshake className="w-3.5 h-3.5 text-amber-600" />
                Necesidad Urgente:
              </span>
              <span>{topNeed.current} de {topNeed.needed} {topNeed.unit}</span>
            </div>
            <div className="text-xs font-medium text-stone-700 truncate">
              {topNeed.item}
            </div>
            <div className="w-full bg-amber-200/70 rounded-full h-1.5 overflow-hidden">
              <div 
                className="bg-amber-500 h-1.5 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, (topNeed.current / topNeed.needed) * 100)}%` }}
              />
            </div>
          </div>
        )}

        {/* Direct Donation Alias (100% free of commissions) */}
        <div className="bg-stone-50 border border-stone-200/80 rounded-2xl p-3 flex items-center justify-between gap-2">
          <div className="min-w-0">
            <span className="text-[10px] uppercase font-bold text-stone-400 tracking-wider block">
              Alias 100% Directo
            </span>
            <span className="text-xs font-mono font-bold text-stone-800 truncate block">
              {shelter.alias}
            </span>
          </div>

          <button
            onClick={copyAlias}
            className={`shrink-0 flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold transition-all shadow-xs ${
              copied
                ? 'bg-emerald-600 text-white'
                : 'bg-white border border-stone-300 text-stone-700 hover:bg-stone-100 hover:border-stone-400'
            }`}
            title="Copiar Alias para transferir sin comisiones"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>¡Copiado!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copiar</span>
              </>
            )}
          </button>
        </div>

        {/* Navigation link to full shelter profile */}
        <Link
          href={`/refugios/${shelter.id}`}
          className="inline-flex items-center justify-center gap-2 w-full bg-stone-900 hover:bg-amber-500 hover:text-stone-950 text-white font-bold text-xs py-2.5 px-4 rounded-xl transition-colors group/link"
        >
          <span>Ver perfil y sus {shelter.animalsCount} animales</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
