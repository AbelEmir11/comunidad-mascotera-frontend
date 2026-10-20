'use client';

import { useState, useEffect, useCallback, use } from 'react';
import Link from 'next/link';
import { MOCK_SHELTERS } from '@/data/mockData';
import { fetchAnimalById, submitAdoptionApplication } from '@/services/api';
import { Pet } from '@/types';
import { 
  ArrowLeft, 
  MapPin, 
  ShieldCheck, 
  CheckCircle2, 
  Building, 
  Users, 
  Zap, 
  Heart, 
  Share2, 
  MessageCircle, 
  Sparkles, 
  X,
  Check,
  Dog,
  AlertTriangle,
  RefreshCw
} from 'lucide-react';

export default function PetDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);

  const [pet, setPet] = useState<Pet | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notFoundState, setNotFoundState] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [activePhoto, setActivePhoto] = useState(0);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [shared, setShared] = useState(false);

  // Form states
  const [applicantName, setApplicantName] = useState('');
  const [applicantPhone, setApplicantPhone] = useState('');
  const [applicantDni, setApplicantDni] = useState('');
  const [applicantHousing, setApplicantHousing] = useState('casa_patio');
  const [agreedToFollowup, setAgreedToFollowup] = useState(true);
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState<{ dni?: string; phone?: string; name?: string }>({});

  const loadPet = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setNotFoundState(false);
    try {
      const data = await fetchAnimalById(resolvedParams.id);
      if (!data) {
        setNotFoundState(true);
      } else {
        setPet(data);
      }
    } catch (err: unknown) {
      console.error('Error al consultar el detalle de la mascota:', err);
      setError('No pudimos conectar con el servidor backend. Verificá que la API de Spring Boot esté en ejecución.');
    } finally {
      setIsLoading(false);
    }
  }, [resolvedParams.id]);

  useEffect(() => {
    loadPet();
  }, [loadPet]);

  const handleDniChange = (val: string) => {
    // Solo números, máximo 8 dígitos
    const numeric = val.replace(/\D/g, '').slice(0, 8);
    setApplicantDni(numeric);
    if (numeric.length > 0 && numeric.length < 8) {
      setFormErrors((prev) => ({ ...prev, dni: 'Mínimo 8 números requeridos' }));
    } else {
      setFormErrors((prev) => ({ ...prev, dni: undefined }));
    }
  };

  const handlePhoneChange = (val: string) => {
    // Solo números, entre 8 y 12 dígitos
    const numeric = val.replace(/\D/g, '').slice(0, 12);
    setApplicantPhone(numeric);
    if (numeric.length > 0 && numeric.length < 8) {
      setFormErrors((prev) => ({ ...prev, phone: 'Mínimo 8 números requeridos' }));
    } else {
      setFormErrors((prev) => ({ ...prev, phone: undefined }));
    }
  };

  const handleShare = () => {
    if (!pet) return;
    if (navigator.share) {
      navigator.share({
        title: `Conocé a ${pet.name} en Comunidad Mascotera`,
        text: `${pet.name} busca una familia que lo adopte en Mendoza. ¿Le das una oportunidad?`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setShared(true);
      setTimeout(() => setShared(false), 2000);
    }
  };

  const handleApplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pet) return;

    const errors: { dni?: string; phone?: string; name?: string } = {};

    if (!applicantName.trim()) {
      errors.name = 'El nombre y apellido son obligatorios';
    }
    if (applicantDni.length < 8) {
      errors.dni = 'El DNI debe tener 8 dígitos numéricos (ej. 38123456)';
    }
    if (applicantPhone.length < 8) {
      errors.phone = 'El teléfono debe tener al menos 8 dígitos (ej. 2615554321)';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    await submitAdoptionApplication(pet.id, {
      applicantName,
      applicantDni,
      applicantPhone,
      applicantHousing,
      agreedToFollowup,
    });
    setApplicationSubmitted(true);
  };

  // 1. Estado de carga
  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8 animate-pulse">
        <div className="h-9 bg-stone-200 rounded-xl w-40" />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 space-y-4">
            <div className="aspect-4/3 bg-stone-200 rounded-3xl w-full" />
            <div className="h-20 bg-stone-200 rounded-3xl w-full" />
          </div>
          <div className="lg:col-span-5 space-y-4">
            <div className="h-8 bg-stone-200 rounded-lg w-3/4" />
            <div className="h-4 bg-stone-200 rounded-md w-1/2" />
            <div className="h-32 bg-stone-200 rounded-2xl w-full" />
            <div className="h-12 bg-stone-200 rounded-xl w-full" />
          </div>
        </div>
      </div>
    );
  }

  // 2. Estado de animal inexistente (404)
  if (notFoundState) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-5">
        <div className="w-16 h-16 rounded-3xl bg-amber-100 text-amber-600 flex items-center justify-center mx-auto shadow-inner">
          <Dog className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
            Mascota no encontrada
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed max-w-md mx-auto">
            No encontramos ningún animal registrado con el identificador <code className="bg-stone-100 px-2 py-0.5 rounded-md font-mono text-amber-700 font-bold">{resolvedParams.id}</code> en el servidor. Pudo haber sido adoptado o el enlace no es válido.
          </p>
        </div>
        <div className="pt-2">
          <Link
            href="/adoptar"
            className="inline-flex items-center gap-2 bg-stone-900 hover:bg-amber-500 hover:text-stone-950 text-white font-bold text-xs px-6 py-3 rounded-xl transition-all shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Volver al catálogo de adopción</span>
          </Link>
        </div>
      </div>
    );
  }

  // 3. Estado de error de conexión con el backend
  if (error || !pet) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-5">
        <div className="w-16 h-16 rounded-3xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto shadow-inner">
          <AlertTriangle className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-black text-rose-950 tracking-tight">
            Error de conexión con el backend
          </h1>
          <p className="text-xs sm:text-sm text-rose-700 leading-relaxed max-w-md mx-auto">
            {error || 'No fue posible obtener los datos de la mascota desde la API.'}
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            onClick={loadPet}
            className="inline-flex items-center gap-2 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs px-6 py-3 rounded-xl transition-all shadow-sm cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reintentar conexión</span>
          </button>
          <Link
            href="/adoptar"
            className="inline-flex items-center gap-2 bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-xs px-5 py-3 rounded-xl transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Volver al catálogo</span>
          </Link>
        </div>
      </div>
    );
  }

  const shelter = MOCK_SHELTERS.find((s) => s.id === pet.shelterId) || {
    id: pet.shelterId,
    name: pet.shelterName || 'Refugio Asociado',
    location: pet.shelterLocation || 'Mendoza, Argentina',
    logo: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=200&q=80',
    whatsapp: '5492615554321',
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      
      {/* Back button */}
      <div className="flex items-center justify-between">
        <Link
          href="/adoptar"
          className="inline-flex items-center gap-2 text-xs font-bold text-stone-600 hover:text-stone-900 bg-white border border-stone-200 px-3.5 py-2 rounded-xl transition-colors shadow-2xs"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Volver al catálogo</span>
        </Link>

        <button
          onClick={handleShare}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-700 hover:text-stone-950 bg-white border border-stone-200 px-3.5 py-2 rounded-xl transition-colors shadow-2xs cursor-pointer"
        >
          <Share2 className="w-3.5 h-3.5 text-amber-600" />
          <span>{shared ? '¡Enlace copiado!' : 'Compartir ficha'}</span>
        </button>
      </div>

      {/* Main Grid: Gallery vs Pet Profile */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Photo Gallery (7 cols) */}
        <div className="lg:col-span-7 space-y-3">
          <div className="relative aspect-4/3 w-full rounded-3xl overflow-hidden bg-stone-100 border border-stone-200 shadow-md">
            <img
              src={pet.photos[activePhoto] || pet.photos[0]}
              alt={pet.name}
              className="w-full h-full object-cover"
            />
            {pet.urgent && (
              <span className="absolute top-4 left-4 bg-rose-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md animate-pulse">
                Adopción Urgente
              </span>
            )}
          </div>

          {/* Thumbnails */}
          {pet.photos.length > 1 && (
            <div className="flex gap-2">
              {pet.photos.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActivePhoto(idx)}
                  className={`w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all cursor-pointer ${
                    activePhoto === idx ? 'border-amber-500 ring-2 ring-amber-500/20' : 'border-stone-200 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`${pet.name} miniatura ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Refugio que lo cuida */}
          <div className="bg-white rounded-3xl p-5 border border-stone-100 shadow-xs flex items-center justify-between gap-4 mt-6">
            <div className="flex items-center gap-3 min-w-0">
              <img
                src={shelter.logo}
                alt={shelter.name}
                className="w-12 h-12 rounded-2xl object-cover border border-stone-200 shrink-0"
              />
              <div className="min-w-0">
                <span className="text-[10px] uppercase font-bold text-amber-600 tracking-wider block">
                  Cuidado y Rehabilitado por:
                </span>
                <h4 className="font-extrabold text-sm text-stone-900 truncate">
                  {shelter.name}
                </h4>
                <p className="text-xs text-stone-500 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-stone-400" />
                  {shelter.location}
                </p>
              </div>
            </div>

            <Link
              href={`/refugios/${shelter.id}`}
              className="shrink-0 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold px-3.5 py-2 rounded-xl transition-colors"
            >
              Ver Refugio
            </Link>
          </div>
        </div>

        {/* Right Column: Details, Traits, Health & CTA (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Header info */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 capitalize">
                {pet.species} • {pet.gender}
              </span>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-700 capitalize">
                Tamaño {pet.size}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight">
              {pet.name}
            </h1>

            <p className="text-sm font-medium text-stone-500">
              Edad aproximada: <strong className="text-stone-800">{pet.age}</strong> • Tiempo en refugio: {pet.timeInShelter}
            </p>
          </div>

          {/* Rasgos / Etiquetas */}
          <div className="flex flex-wrap gap-2">
            {pet.traits.map((trait, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1 text-xs font-semibold bg-stone-100 text-stone-800 px-3 py-1 rounded-xl"
              >
                <Sparkles className="w-3 h-3 text-amber-500" />
                {trait}
              </span>
            ))}
          </div>

          {/* Historia */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-stone-100 shadow-xs space-y-2">
            <h3 className="font-extrabold text-stone-900 text-sm">
              Su Historia de Rescate
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              {pet.story}
            </p>
          </div>

          {/* Pasaporte Sanitario Didáctico */}
          <div className="bg-emerald-50/60 rounded-3xl p-5 border border-emerald-100 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-emerald-950 text-xs uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                Pasaporte Sanitario Oficial
              </h3>
              <span className="text-[10px] font-bold bg-emerald-200/60 text-emerald-800 px-2 py-0.5 rounded-md">
                Garantía Veterinaria
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="flex items-center gap-2 bg-white/80 p-2.5 rounded-xl border border-emerald-100/60">
                <CheckCircle2 className={`w-4 h-4 shrink-0 ${pet.health.vaccinated ? 'text-emerald-600' : 'text-stone-300'}`} />
                <span className="font-medium text-stone-700">
                  {pet.health.vaccinated ? 'Vacunación al día' : 'Vacunación pendiente'}
                </span>
              </div>

              <div className="flex items-center gap-2 bg-white/80 p-2.5 rounded-xl border border-emerald-100/60">
                <CheckCircle2 className={`w-4 h-4 shrink-0 ${pet.health.neutered ? 'text-emerald-600' : 'text-stone-300'}`} />
                <span className="font-medium text-stone-700">
                  {pet.health.neutered ? 'Castrado / Esterilizado' : 'Compromiso de castración'}
                </span>
              </div>

              <div className="flex items-center gap-2 bg-white/80 p-2.5 rounded-xl border border-emerald-100/60">
                <CheckCircle2 className={`w-4 h-4 shrink-0 ${pet.health.dewormed ? 'text-emerald-600' : 'text-stone-300'}`} />
                <span className="font-medium text-stone-700">
                  {pet.health.dewormed ? 'Desparasitado int/ext' : 'Desparasitación en curso'}
                </span>
              </div>

              <div className="flex items-center gap-2 bg-white/80 p-2.5 rounded-xl border border-emerald-100/60">
                <CheckCircle2 className={`w-4 h-4 shrink-0 ${pet.health.microchip ? 'text-emerald-600' : 'text-stone-300'}`} />
                <span className="font-medium text-stone-700">
                  {pet.health.microchip ? 'Microchip registrado' : 'Sin microchip'}
                </span>
              </div>
            </div>

            {pet.health.specialCare && (
              <p className="text-[11px] text-emerald-800 font-medium bg-emerald-100/50 p-2 rounded-lg">
                ⚠️ Cuidado especial: {pet.health.specialCare}
              </p>
            )}
          </div>

          {/* Compatibilidad de Convivencia */}
          <div className="bg-white rounded-3xl p-5 border border-stone-100 shadow-xs space-y-3">
            <h3 className="font-extrabold text-stone-900 text-xs uppercase tracking-wider">
              Compatibilidad con tu Hogar
            </h3>
            
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="flex items-center gap-2 p-2 rounded-xl bg-stone-50">
                <Building className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                <span className="font-medium text-stone-700">
                  {pet.compatibility.apartment ? 'Apto departamento' : 'Requiere patio o espacio'}
                </span>
              </div>

              <div className="flex items-center gap-2 p-2 rounded-xl bg-stone-50">
                <Users className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                <span className="font-medium text-stone-700">
                  {pet.compatibility.kids ? 'Ideal con niños' : 'Prefiere adultos'}
                </span>
              </div>

              <div className="flex items-center gap-2 p-2 rounded-xl bg-stone-50">
                <Zap className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                <span className="font-medium text-stone-700 capitalize">
                  Energía {pet.compatibility.energyLevel}
                </span>
              </div>

              <div className="flex items-center gap-2 p-2 rounded-xl bg-stone-50">
                <Heart className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                <span className="font-medium text-stone-700">
                  {pet.compatibility.otherDogs ? 'Convive con perros' : 'Prefiere ser único can'}
                </span>
              </div>
            </div>
          </div>

          {/* Botones de Acción (Postular y WhatsApp Refugio) */}
          <div className="space-y-2 pt-2">
            <button
              onClick={() => setIsApplyModalOpen(true)}
              className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-extrabold text-sm py-4 rounded-2xl shadow-lg transition-all hover:scale-102 active:scale-98 cursor-pointer"
            >
              Postularme para Adoptar a {pet.name}
            </button>

            {shelter.whatsapp && (
              <a
                href={`https://wa.me/${shelter.whatsapp}?text=Hola!%20Vi%20en%20Comunidad%20Mascotera%20la%20ficha%20de%20${encodeURIComponent(pet.name)}%20y%20me%20gustar%C3%ADa%20hacerles%20una%20consulta.`}
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-xs py-3 rounded-2xl border border-emerald-200 transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>Consultar por WhatsApp con el Refugio</span>
              </a>
            )}
          </div>

        </div>

      </div>

      {/* Modal de Postulación Responsable */}
      {isApplyModalOpen && (
        <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto relative animate-in fade-in zoom-in duration-200">
            
            {/* Close button */}
            <button
              onClick={() => setIsApplyModalOpen(false)}
              className="absolute top-5 right-5 p-1 text-stone-400 hover:text-stone-700 rounded-full hover:bg-stone-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {applicationSubmitted ? (
              <div className="text-center py-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto animate-bounce">
                  <Check className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-black text-stone-900">
                  ¡Postulación Enviada con Éxito!
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed max-w-sm mx-auto">
                  El equipo de <strong>{shelter.name}</strong> revisará tus datos y se pondrá en contacto por WhatsApp al número provisto ({applicantPhone}) para coordinar una entrevista previa.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => {
                      setIsApplyModalOpen(false);
                      setApplicationSubmitted(false);
                    }}
                    className="bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs px-6 py-3 rounded-xl transition-colors cursor-pointer"
                  >
                    Entendido, ¡muchas gracias!
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <span className="text-[10px] uppercase font-bold text-amber-600 tracking-wider">
                    Formulario Oficial
                  </span>
                  <h3 className="text-xl font-black text-stone-900 tracking-tight">
                    Postularme para adoptar a {pet.name}
                  </h3>
                  <p className="text-xs text-stone-500">
                    Completá tus datos para que el refugio evalúe la compatibilidad con tu hogar.
                  </p>
                </div>

                <form onSubmit={handleApplySubmit} className="space-y-3.5 text-left">
                  <div>
                    <label className="text-xs font-semibold text-stone-700 block mb-1">
                      Nombre y Apellido completo *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ej: Laura Martínez"
                      value={applicantName}
                      onChange={(e) => setApplicantName(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-xs font-semibold text-stone-700">
                          DNI (solo números) *
                        </label>
                        <span className={`text-[10px] font-bold ${
                          applicantDni.length === 8 ? 'text-emerald-600' : 'text-stone-400'
                        }`}>
                          {applicantDni.length}/8 dígitos
                        </span>
                      </div>
                      <input
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        required
                        placeholder="Ej: 38123456"
                        value={applicantDni}
                        onChange={(e) => handleDniChange(e.target.value)}
                        className={`w-full bg-stone-50 border rounded-xl px-3.5 py-2.5 text-xs text-stone-900 focus:outline-hidden focus:ring-2 ${
                          formErrors.dni ? 'border-rose-400 focus:ring-rose-400 bg-rose-50/30' : 'border-stone-200 focus:ring-amber-500'
                        }`}
                      />
                      {formErrors.dni && (
                        <p className="text-[11px] text-rose-600 font-medium mt-1">
                          {formErrors.dni}
                        </p>
                      )}
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-xs font-semibold text-stone-700">
                          WhatsApp (solo números) *
                        </label>
                        <span className={`text-[10px] font-bold ${
                          applicantPhone.length >= 8 ? 'text-emerald-600' : 'text-stone-400'
                        }`}>
                          {applicantPhone.length >= 8 ? '✓ Válido' : `${applicantPhone.length}/8 mín.`}
                        </span>
                      </div>
                      <input
                        type="tel"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        required
                        placeholder="Ej: 2615554321"
                        value={applicantPhone}
                        onChange={(e) => handlePhoneChange(e.target.value)}
                        className={`w-full bg-stone-50 border rounded-xl px-3.5 py-2.5 text-xs text-stone-900 focus:outline-hidden focus:ring-2 ${
                          formErrors.phone ? 'border-rose-400 focus:ring-rose-400 bg-rose-50/30' : 'border-stone-200 focus:ring-amber-500'
                        }`}
                      />
                      {formErrors.phone && (
                        <p className="text-[11px] text-rose-600 font-medium mt-1">
                          {formErrors.phone}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-stone-700 block mb-1">
                      Tipo de vivienda
                    </label>
                    <select
                      value={applicantHousing}
                      onChange={(e) => setApplicantHousing(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs text-stone-700 font-semibold focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                    >
                      <option value="casa_patio">Casa con patio cerrado y seguro</option>
                      <option value="depto_balcon">Departamento con red / balcón seguro</option>
                      <option value="finca_parque">Finca / Terreno amplio en Mendoza</option>
                    </select>
                  </div>

                  {/* Compromiso didáctico del Álbum de Vida */}
                  <div className="p-3 bg-amber-50 rounded-xl border border-amber-200/80 space-y-2">
                    <label className="flex items-start gap-2.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={agreedToFollowup}
                        onChange={(e) => setAgreedToFollowup(e.target.checked)}
                        className="mt-0.5 rounded-sm text-amber-600 focus:ring-amber-500"
                      />
                      <span className="text-xs text-amber-950 font-medium">
                        Acepto compartir fotos/novedades en el <strong>Álbum de Vida</strong> cada 15 o 30 días para desbloquear medallas y dar tranquilidad al refugio.
                      </span>
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={!agreedToFollowup || applicantDni.length < 8 || applicantPhone.length < 8 || !applicantName.trim()}
                    className="w-full bg-amber-500 hover:bg-amber-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-extrabold text-sm py-3 rounded-xl shadow-md transition-colors cursor-pointer"
                  >
                    Enviar Postulación al Refugio
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
