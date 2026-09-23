'use client';

import LifeAlbumPreview from '@/components/LifeAlbumPreview';
import { Award, Camera, Heart, CheckCircle2, ShieldCheck, Clock, Sparkles } from 'lucide-react';

export default function SeguimientoPage() {
  const medals = [
    {
      icon: '🏠',
      name: 'Bienvenido al Hogar',
      period: 'Día 15',
      desc: 'Primer reporte con foto del espacio donde duerme y primeros momentos de confianza.',
    },
    {
      icon: '🛋️',
      name: 'Rey del Sillón',
      period: 'Mes 1',
      desc: 'Adaptación completa al ritmo de la casa, sus rincones preferidos y paseos.',
    },
    {
      icon: '💉',
      name: 'Salud de Hierro',
      period: 'Mes 2',
      desc: 'Control veterinario de rutina y refuerzo de vacunas o antiparasitario.',
    },
    {
      icon: '🦮',
      name: 'Paseador Estrella',
      period: 'Mes 3',
      desc: 'Paseos consolidados, sociabilidad con otros animales y obediencia.',
    },
    {
      icon: '🎉',
      name: 'Un Año de Amor',
      period: '1 Año',
      desc: 'Celebración del primer aniversario de adopción definitiva. ¡Familia consolidada!',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-200">
          <Award className="w-3.5 h-3.5 text-amber-600" />
          <span>Innovación en Adopción Responsable</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-stone-900 tracking-tight">
          El Álbum de Vida Post-Adopción
        </h1>
        <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
          En lugar de un control policial que agobia al adoptante, creamos una experiencia didáctica y emocionante. Cada hito cumplido con fotos y anécdotas desbloquea medallas y mantiene el semáforo del refugio en verde.
        </p>
      </div>

      {/* 3 Pilares del Sistema */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-stone-100 shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center">
            <Camera className="w-6 h-6" />
          </div>
          <h3 className="font-extrabold text-base text-stone-900">1. Fotos cada 15 o 30 días</h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            El adoptante recibe un recordatorio amistoso por WhatsApp y sube en 30 segundos una foto o video de cómo crece el animalito.
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-stone-100 shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-orange-100 text-orange-700 flex items-center justify-center">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="font-extrabold text-base text-stone-900">2. Medallas y Logros</h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            Gamificación real: cada entrega otorga una insignia didáctica que se suma a la ficha pública de la mascota, celebrando su progreso.
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-stone-100 shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="font-extrabold text-base text-stone-900">3. Semáforo para el Refugio</h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            El refugio monitorea en verde, amarillo y rojo todos sus casos. Si alguien adeuda reporte, el sistema envía un mensaje automático y cariñoso.
          </p>
        </div>
      </div>

      {/* Componente Interactivo en Vivo */}
      <LifeAlbumPreview />

      {/* Catálogo de Medallas */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-100 shadow-xs space-y-6">
        <div className="space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-600">
            Gamificación de la Tenencia Responsable
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-stone-900">
            Las Medallas del Álbum de Vida
          </h3>
          <p className="text-xs sm:text-sm text-stone-500">
            Cada etapa de la vida de tu mascota adoptada tiene su recompensa simbólica.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {medals.map((m, idx) => (
            <div
              key={idx}
              className="bg-stone-50/70 p-4 rounded-2xl border border-stone-200/80 text-center space-y-2 hover:border-amber-400 transition-colors"
            >
              <div className="text-3xl">{m.icon}</div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-100/70 px-2 py-0.5 rounded-full inline-block">
                {m.period}
              </div>
              <h4 className="font-bold text-xs text-stone-900">{m.name}</h4>
              <p className="text-[11px] text-stone-500 leading-normal">{m.desc}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
