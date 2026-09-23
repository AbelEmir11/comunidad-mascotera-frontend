'use client';

import { useState } from 'react';
import { MOCK_SHELTERS } from '@/data/mockData';
import ShelterCard from '@/components/ShelterCard';
import { Building2, MapPin, Heart, ShieldCheck, Search } from 'lucide-react';

export default function RefugiosPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [zoneFilter, setZoneFilter] = useState('todas');

  const filteredShelters = MOCK_SHELTERS.filter((s) => {
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      const matchName = s.name.toLowerCase().includes(term);
      const matchLocation = s.location.toLowerCase().includes(term);
      if (!matchName && !matchLocation) return false;
    }

    if (zoneFilter !== 'todas' && s.zone !== zoneFilter) return false;

    return true;
  });

  const totalAnimals = MOCK_SHELTERS.reduce((acc, curr) => acc + curr.animalsCount, 0);
  const totalAdoptions = MOCK_SHELTERS.reduce((acc, curr) => acc + curr.adoptionsCount, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-10">
      
      {/* Header */}
      <div className="space-y-3 max-w-3xl">
        <span className="text-xs font-bold uppercase tracking-wider text-amber-600">
          Red Provincial de Mendoza
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight">
          Refugios y Asociaciones Protectoras
        </h1>
        <p className="text-sm text-stone-600 leading-relaxed">
          Conocé a los hogares y asociaciones civiles que rescatan, rehabilitan y cuidan a los animales en el Gran Mendoza y zonas rurales. Podés donarles directo a su Alias sin comisiones o adoptar a sus rescatados.
        </p>
      </div>

      {/* Stats Counter Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-stone-100 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-stone-900">{MOCK_SHELTERS.length} Refugios</div>
            <div className="text-xs text-stone-500">Activos en la red mendocina</div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-stone-100 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
            <Heart className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-stone-900">{totalAnimals} Rescatados</div>
            <div className="text-xs text-stone-500">En tránsito esperando adopción</div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-stone-100 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-stone-900">{totalAdoptions}+ Finales Felices</div>
            <div className="text-xs text-stone-500">Adopciones logradas en conjunto</div>
          </div>
        </div>
      </div>

      {/* Filtros */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-stone-100 shadow-xs">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar refugio por nombre..."
            className="w-full bg-stone-50 border border-stone-200 rounded-xl pl-10 pr-3.5 py-2 text-xs text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-amber-500"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          <span className="text-xs font-bold text-stone-400 shrink-0">Zona:</span>
          {['todas', 'Godoy Cruz', 'Capital', 'Luján de Cuyo'].map((z) => (
            <button
              key={z}
              onClick={() => setZoneFilter(z)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 capitalize ${
                zoneFilter === z
                  ? 'bg-amber-500 text-white shadow-xs'
                  : 'bg-stone-50 text-stone-600 hover:bg-stone-100'
              }`}
            >
              {z === 'todas' ? 'Todas las zonas' : z}
            </button>
          ))}
        </div>
      </div>

      {/* Grid de Refugios */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredShelters.map((shelter) => (
          <ShelterCard key={shelter.id} shelter={shelter} />
        ))}
      </div>

    </div>
  );
}
