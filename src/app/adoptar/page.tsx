'use client';

import { useState, useEffect, useCallback } from 'react';
import { Pet } from '@/types';
import { fetchAnimals } from '@/services/api';
import PetCard from '@/components/PetCard';
import PetCompatibilityModal from '@/components/PetCompatibilityModal';
import { 
  Dog, 
  Sparkles, 
  Search, 
  Filter, 
  Building, 
  Users, 
  RotateCcw, 
  Heart,
  AlertTriangle,
  RefreshCw
} from 'lucide-react';

const FAVORITES_KEY = 'comunidad_mascotera_favoritos';

export default function AdoptarPage() {
  const [pets, setPets] = useState<Pet[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isMatchModalOpen, setIsMatchModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [species, setSpecies] = useState<'todos' | 'perro' | 'gato'>('todos');
  const [size, setSize] = useState<'todos' | 'pequeño' | 'mediano' | 'grande'>('todos');
  const [onlyApartment, setOnlyApartment] = useState(false);
  const [onlyKids, setOnlyKids] = useState(false);
  const [onlyUrgent, setOnlyUrgent] = useState(false);
  const [onlyFavorites, setOnlyFavorites] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);

  const loadAnimals = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchAnimals();
      setPets(data);
    } catch (err: unknown) {
      console.error('Error al consultar animales:', err);
      setError('No pudimos conectar con el servidor backend. Verificá que la API de Spring Boot esté en ejecución en http://localhost:8080.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAnimals();
  }, [loadAnimals]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(FAVORITES_KEY);
      if (stored) {
        setFavorites(JSON.parse(stored));
      }
    } catch {
      // LocalStorage fallback
    }
  }, []);

  const filteredPets = pets.filter((pet) => {
    // Búsqueda por nombre o refugio
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      const matchName = pet.name.toLowerCase().includes(term);
      const matchShelter = pet.shelterName?.toLowerCase().includes(term) ?? false;
      const matchLocation = pet.shelterLocation?.toLowerCase().includes(term) ?? false;
      if (!matchName && !matchShelter && !matchLocation) return false;
    }

    // Especie
    if (species !== 'todos' && pet.species !== species) return false;

    // Tamaño
    if (size !== 'todos' && pet.size !== size) return false;

    // Apto departamento
    if (onlyApartment && !pet.compatibility.apartment) return false;

    // Convivencia con chicos
    if (onlyKids && !pet.compatibility.kids) return false;

    // Solo urgentes
    if (onlyUrgent && !pet.urgent) return false;

    // Solo favoritos
    if (onlyFavorites && !favorites.includes(pet.id)) return false;

    return true;
  });

  const resetFilters = () => {
    setSearchTerm('');
    setSpecies('todos');
    setSize('todos');
    setOnlyApartment(false);
    setOnlyKids(false);
    setOnlyUrgent(false);
    setOnlyFavorites(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-10">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-600">
            Adopción Responsable
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight">
            Animales en Tránsito de Mendoza
          </h1>
          <p className="text-sm text-stone-600 max-w-xl">
            Buscá por especie, tamaño y compatibilidad con tu hogar. Si no sabés cuál elegir, hacé nuestro test de compatibilidad.
          </p>
        </div>

        <button
          onClick={() => setIsMatchModalOpen(true)}
          className="shrink-0 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-extrabold text-sm px-6 py-3.5 rounded-2xl shadow-md transition-all hover:scale-105 active:scale-95 cursor-pointer"
        >
          <Sparkles className="w-4 h-4" />
          <span>Test de Compatibilidad (&quot;Match&quot;)</span>
        </button>
      </div>

      {/* Barra de Filtros */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-stone-100 shadow-sm space-y-4">
        
        {/* Buscador y selectores principales */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          
          {/* Búsqueda por texto */}
          <div className="relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por nombre o refugio..."
              className="w-full bg-stone-50 border border-stone-200 rounded-xl pl-10 pr-4 py-2.5 text-xs text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-amber-500"
            />
          </div>

          {/* Especie */}
          <div className="flex bg-stone-50 p-1 rounded-xl border border-stone-200">
            {[
              { id: 'todos', label: 'Todos' },
              { id: 'perro', label: '🐶 Perros' },
              { id: 'gato', label: '🐱 Gatos' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setSpecies(item.id as typeof species)}
                className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
                  species === item.id ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-500'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Tamaño */}
          <select
            value={size}
            onChange={(e) => setSize(e.target.value as typeof size)}
            className="bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs text-stone-700 font-semibold focus:outline-hidden focus:ring-2 focus:ring-amber-500"
          >
            <option value="todos">Cualquier tamaño</option>
            <option value="pequeño">Tamaño Pequeño (hasta 10kg)</option>
            <option value="mediano">Tamaño Mediano (10 a 25kg)</option>
            <option value="grande">Tamaño Grande (+25kg)</option>
          </select>

          {/* Botón de limpiar filtros */}
          <button
            onClick={resetFilters}
            className="inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-stone-500 hover:text-stone-800 bg-stone-50 hover:bg-stone-100 border border-stone-200 rounded-xl px-4 py-2.5 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Limpiar filtros</span>
          </button>
        </div>

        {/* Checkboxes de compatibilidad rápida */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-stone-100">
          <span className="text-xs font-bold text-stone-400 mr-2 flex items-center gap-1">
            <Filter className="w-3 h-3" /> Filtros rápidos:
          </span>

          <button
            onClick={() => setOnlyApartment(!onlyApartment)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
              onlyApartment
                ? 'bg-amber-500 border-amber-500 text-white'
                : 'bg-white border-stone-200 text-stone-600 hover:bg-stone-50'
            }`}
          >
            <Building className="w-3.5 h-3.5" />
            <span>Apto Departamento</span>
          </button>

          <button
            onClick={() => setOnlyKids(!onlyKids)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
              onlyKids
                ? 'bg-amber-500 border-amber-500 text-white'
                : 'bg-white border-stone-200 text-stone-600 hover:bg-stone-50'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Bueno con Chicos</span>
          </button>

          <button
            onClick={() => setOnlyUrgent(!onlyUrgent)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
              onlyUrgent
                ? 'bg-rose-500 border-rose-500 text-white'
                : 'bg-white border-stone-200 text-stone-600 hover:bg-stone-50'
            }`}
          >
            <span>🚨 Solo Urgentes</span>
          </button>

          <button
            onClick={() => setOnlyFavorites(!onlyFavorites)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
              onlyFavorites
                ? 'bg-rose-500 border-rose-500 text-white shadow-xs'
                : 'bg-white border-stone-200 text-stone-600 hover:bg-stone-50'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${onlyFavorites ? 'fill-white text-white' : 'text-rose-500'}`} />
            <span>Mis Favoritos ({favorites.length})</span>
          </button>
        </div>

      </div>

      {/* Sección de Resultados */}
      <div className="space-y-4">
        
        {/* Estado de Carga */}
        {isLoading && (
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-700 bg-amber-50 border border-amber-200 rounded-2xl px-4 py-3">
              <RefreshCw className="w-4 h-4 animate-spin text-amber-600" />
              <span>Consultando catálogo de animales en tiempo real al servidor backend...</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((n) => (
                <div key={n} className="bg-white rounded-3xl p-5 border border-stone-100 shadow-xs animate-pulse space-y-4">
                  <div className="w-full h-52 bg-stone-200 rounded-2xl" />
                  <div className="h-5 bg-stone-200 rounded-md w-2/3" />
                  <div className="h-3 bg-stone-200 rounded-md w-1/2" />
                  <div className="flex gap-2">
                    <div className="h-6 bg-stone-200 rounded-lg w-16" />
                    <div className="h-6 bg-stone-200 rounded-lg w-20" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Estado de Error de Conexión */}
        {!isLoading && error && (
          <div className="bg-rose-50 border border-rose-200 rounded-3xl p-8 sm:p-10 text-center space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-rose-950">
              Error de conexión con el backend
            </h3>
            <p className="text-xs text-rose-700 max-w-md mx-auto leading-relaxed">
              {error}
            </p>
            <div className="pt-2">
              <button
                onClick={loadAnimals}
                className="inline-flex items-center gap-2 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs px-6 py-3 rounded-xl transition-all shadow-sm active:scale-95 cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reintentar conexión</span>
              </button>
            </div>
          </div>
        )}

        {/* Resultados Exitosos */}
        {!isLoading && !error && (
          <>
            <div className="flex items-center justify-between text-xs text-stone-500 font-medium px-1">
              <span>Mostrando {filteredPets.length} animales disponibles</span>
              <span className="text-emerald-700 font-semibold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-ping" />
                Sincronizado con API Backend
              </span>
            </div>

            {filteredPets.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPets.map((pet) => (
                  <PetCard 
                    key={pet.id} 
                    pet={pet} 
                    onFavoriteToggle={(id, isFav) => {
                      setFavorites(prev => isFav ? [...prev, id] : prev.filter(fId => fId !== id));
                    }}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-3xl p-12 text-center border border-stone-100 space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center mx-auto">
                  <Dog className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-bold text-stone-900">
                  {pets.length === 0
                    ? 'No hay animales registrados en el backend'
                    : 'No encontramos animalitos con esos filtros'}
                </h3>
                <p className="text-xs text-stone-500 max-w-sm mx-auto">
                  {pets.length === 0
                    ? 'El backend respondió correctamente, pero la base de datos no contiene mascotas activas.'
                    : 'Probá flexibilizar los filtros de tamaño o especie para ver más compañeros rescatados.'}
                </p>
                {pets.length > 0 && (
                  <button
                    onClick={resetFilters}
                    className="bg-stone-900 hover:bg-amber-500 hover:text-stone-950 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-colors cursor-pointer"
                  >
                    Restablecer filtros
                  </button>
                )}
              </div>
            )}
          </>
        )}

      </div>

      {/* Modal del Test */}
      <PetCompatibilityModal
        isOpen={isMatchModalOpen}
        onClose={() => setIsMatchModalOpen(false)}
      />

    </div>
  );
}
