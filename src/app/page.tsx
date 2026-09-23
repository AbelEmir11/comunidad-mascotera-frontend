'use client';

import { useState } from 'react';
import Link from 'next/link';
import { MOCK_PETS, MOCK_SHELTERS, MOCK_NOTICES } from '@/data/mockData';
import NewsCarousel from '@/components/NewsCarousel';
import PetCard from '@/components/PetCard';
import ShelterCard from '@/components/ShelterCard';
import LifeAlbumPreview from '@/components/LifeAlbumPreview';
import DonationThermometer from '@/components/DonationThermometer';
import SponsorWall from '@/components/SponsorWall';
import PetCompatibilityModal from '@/components/PetCompatibilityModal';
import { 
  Sparkles, 
  Dog, 
  Cat, 
  Heart, 
  ShieldCheck, 
  ArrowRight, 
  Award, 
  Building2, 
  Syringe,
  CheckCircle2
} from 'lucide-react';

export default function HomePage() {
  const [isMatchModalOpen, setIsMatchModalOpen] = useState(false);
  const [petFilter, setPetFilter] = useState<'todos' | 'perro' | 'gato' | 'urgente'>('todos');

  const filteredPets = MOCK_PETS.filter((pet) => {
    if (petFilter === 'perro') return pet.species === 'perro';
    if (petFilter === 'gato') return pet.species === 'gato';
    if (petFilter === 'urgente') return pet.urgent;
    return true;
  });

  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      
      {/* 1. Hero Section */}
      <section className="relative pt-8 pb-12 sm:pt-14 sm:pb-20 overflow-hidden">
        {/* Decorative background blobs */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-tr from-amber-200/30 via-orange-100/20 to-rose-100/30 rounded-full blur-3xl -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            
            {/* Pill badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold bg-amber-100/90 text-amber-900 border border-amber-200/60 shadow-xs animate-in fade-in slide-in-from-bottom-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Red Solidaria de Refugios en Mendoza</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-stone-900 tracking-tight leading-[1.15]">
              Adopción responsable con amor,{' '}
              <span className="bg-gradient-to-r from-amber-600 via-orange-500 to-rose-600 bg-clip-text text-transparent">
                seguimiento didáctico
              </span>{' '}
              y donaciones 100% directas.
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-stone-600 leading-relaxed max-w-2xl mx-auto">
              Conocé a los animales en tránsito de Mendoza, encontrá a tu compañero ideal mediante nuestro test de compatibilidad y acompañalo con el primer <strong>Álbum de Vida gamificado</strong> para refugios.
            </p>

            {/* Hero CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setIsMatchModalOpen(true)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 hover:from-amber-600 hover:to-rose-600 text-white font-extrabold text-sm px-7 py-3.5 rounded-2xl shadow-lg shadow-orange-500/25 transition-all hover:scale-105 active:scale-95 cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>Hacer Test de Compatibilidad (&quot;Match&quot;)</span>
              </button>

              <Link
                href="/adoptar"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-stone-50 text-stone-800 font-bold text-sm px-6 py-3.5 rounded-2xl border border-stone-200 shadow-xs transition-all"
              >
                <Dog className="w-4 h-4 text-amber-600" />
                <span>Ver animales en adopción</span>
              </Link>
            </div>

            {/* Trust Badges / Stats */}
            <div className="pt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-stone-200/60 max-w-4xl mx-auto text-left">
              <div className="p-3 bg-white/70 backdrop-blur-xs rounded-2xl border border-stone-100">
                <div className="text-2xl sm:text-3xl font-black text-amber-600">76+</div>
                <div className="text-xs text-stone-500 font-medium">Animales en tránsito</div>
              </div>
              <div className="p-3 bg-white/70 backdrop-blur-xs rounded-2xl border border-stone-100">
                <div className="text-2xl sm:text-3xl font-black text-orange-600">3</div>
                <div className="text-xs text-stone-500 font-medium">Refugios mendocinos</div>
              </div>
              <div className="p-3 bg-white/70 backdrop-blur-xs rounded-2xl border border-stone-100">
                <div className="text-2xl sm:text-3xl font-black text-emerald-600">0%</div>
                <div className="text-xs text-stone-500 font-medium">Comisión en donaciones</div>
              </div>
              <div className="p-3 bg-white/70 backdrop-blur-xs rounded-2xl border border-stone-100">
                <div className="text-2xl sm:text-3xl font-black text-rose-600">100%</div>
                <div className="text-xs text-stone-500 font-medium">Seguimiento con amor</div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Carrusel de Noticias Comunitarias, Zoonosis y Metas Logradas */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Syringe className="w-5 h-5 text-amber-600" />
              <h2 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight">
                Novedades Comunitarias & Móvil Veterinario
              </h2>
            </div>
            <Link
              href="/zoonosis"
              className="text-xs font-bold text-amber-700 hover:text-amber-800 flex items-center gap-1"
            >
              <span>Ver cronograma completo</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <NewsCarousel notices={MOCK_NOTICES} />
        </div>
      </section>

      {/* 3. Catálogo de Animales con Filtros Rápidos */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600">
              Familias para Siempre
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
              Esperando un Hogar en Mendoza
            </h2>
            <p className="text-xs sm:text-sm text-stone-500">
              Todos los animales se entregan desparasitados y con compromiso de castración o vacunación al día.
            </p>
          </div>

          {/* Filtros rápidos por especie */}
          <div className="flex flex-wrap items-center gap-2 bg-stone-100 p-1.5 rounded-2xl w-fit">
            {[
              { id: 'todos', label: 'Todos', icon: null },
              { id: 'perro', label: 'Perros', icon: Dog },
              { id: 'gato', label: 'Gatos', icon: Cat },
              { id: 'urgente', label: 'Urgentes', icon: Heart },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setPetFilter(tab.id as typeof petFilter)}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    petFilter === tab.id
                      ? 'bg-white text-stone-900 shadow-sm'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  {Icon && <Icon className="w-3.5 h-3.5" />}
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Grid de Animales */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPets.map((pet) => (
            <PetCard key={pet.id} pet={pet} />
          ))}
        </div>

        <div className="text-center pt-4">
          <Link
            href="/adoptar"
            className="inline-flex items-center gap-2 bg-white border-2 border-stone-900 hover:bg-stone-900 hover:text-white text-stone-900 font-bold text-sm px-6 py-3 rounded-2xl transition-all shadow-xs"
          >
            <span>Explorar catálogo completo con filtros avanzados</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* 4. Banner del Test de Compatibilidad ("Match") */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 rounded-3xl p-8 sm:p-12 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl text-center md:text-left">
            <span className="bg-white/20 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              Adopción Inteligente y sin Devoluciones
            </span>
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight">
              ¿No sabés qué mascota se adapta mejor a tu rutina?
            </h3>
            <p className="text-sm text-amber-50 leading-relaxed">
              En solo 1 minuto respondé 4 preguntas sencillas (espacio de tu casa, horarios de trabajo y convivencia) y nuestro algoritmo te dirá con quién hacés <strong>Match perfecto</strong>.
            </p>
          </div>

          <button
            onClick={() => setIsMatchModalOpen(true)}
            className="shrink-0 bg-stone-950 hover:bg-stone-900 text-white font-extrabold text-sm px-8 py-4 rounded-2xl shadow-xl transition-all hover:scale-105 active:scale-95 flex items-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Iniciar Test de Match</span>
          </button>
        </div>
      </section>

      {/* 5. Directorio de Refugios de Mendoza */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600">
              Transparencia y Comunidad
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
              Refugios Amigos de Mendoza
            </h2>
            <p className="text-xs sm:text-sm text-stone-500">
              Cada refugio tiene su propia ficha, contador de rescatados y datos bancarios directos sin comisiones.
            </p>
          </div>

          <Link
            href="/refugios"
            className="text-xs font-bold text-amber-700 hover:text-amber-800 flex items-center gap-1"
          >
            <span>Ver todos los refugios</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {MOCK_SHELTERS.map((shelter) => (
            <ShelterCard key={shelter.id} shelter={shelter} />
          ))}
        </div>
      </section>

      {/* 6. El Álbum de Vida (Seguimiento Gamificado) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <LifeAlbumPreview />
      </section>

      {/* 7. Termómetro de Donaciones & Voluntariado */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <DonationThermometer />
      </section>

      {/* 8. Mural de Patrocinadores & Municipios */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SponsorWall />
      </section>

      {/* Modal del Test de Match */}
      <PetCompatibilityModal
        isOpen={isMatchModalOpen}
        onClose={() => setIsMatchModalOpen(false)}
      />

    </div>
  );
}
