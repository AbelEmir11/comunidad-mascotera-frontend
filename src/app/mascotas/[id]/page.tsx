'use client';

import { useState, use } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MOCK_PETS, MOCK_SHELTERS } from '@/data/mockData';
import { submitAdoptionApplication } from '@/services/api';
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
  Check
} from 'lucide-react';

export default function PetDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const pet = MOCK_PETS.find((p) => p.id === resolvedParams.id);

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

  if (!pet) {
    notFound();
  }

  const shelter = MOCK_SHELTERS.find((s) => s.id === pet.shelterId) || MOCK_SHELTERS[0];

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
          className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-700 hover:text-stone-950 bg-white border border-stone-200 px-3.5 py-2 rounded-xl transition-colors shadow-2xs"
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
                  className={`w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all ${
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

          {/* Personality tags */}
          <div className="flex flex-wrap gap-1.5">
            {pet.traits.map((t, idx) => (
              <span
                key={idx}
                className="text-xs font-semibold bg-stone-100 text-stone-700 px-3 py-1 rounded-xl"
              >
                {t}
              </span>
            ))}
          </div>

          {/* Story */}
          <div className="space-y-2 bg-white rounded-3xl p-5 border border-stone-100 shadow-xs">
            <h3 className="font-extrabold text-sm text-stone-900">Su Historia:</h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              {pet.story}
            </p>
          </div>

          {/* Compatibility Radar */}
          <div className="bg-white rounded-3xl p-5 border border-stone-100 shadow-xs space-y-3">
            <h3 className="font-extrabold text-sm text-stone-900">Compatibilidad con el Hogar:</h3>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className={`p-2.5 rounded-xl border flex items-center gap-2 ${
                pet.compatibility.apartment ? 'bg-emerald-50/60 border-emerald-200 text-emerald-900' : 'bg-stone-50 border-stone-200 text-stone-500'
              }`}>
                <Building className="w-4 h-4 text-emerald-600" />
                <span>{pet.compatibility.apartment ? 'Apto Departamento' : 'Requiere Patio'}</span>
              </div>

              <div className={`p-2.5 rounded-xl border flex items-center gap-2 ${
                pet.compatibility.kids ? 'bg-emerald-50/60 border-emerald-200 text-emerald-900' : 'bg-stone-50 border-stone-200 text-stone-500'
              }`}>
                <Users className="w-4 h-4 text-emerald-600" />
                <span>{pet.compatibility.kids ? 'Sociable con Chicos' : 'Hogar sin niños'}</span>
              </div>

              <div className={`p-2.5 rounded-xl border flex items-center gap-2 ${
                pet.compatibility.cats ? 'bg-emerald-50/60 border-emerald-200 text-emerald-900' : 'bg-stone-50 border-stone-200 text-stone-500'
              }`}>
                <span>🐱</span>
                <span>{pet.compatibility.cats ? 'Acepta Gatos' : 'Sin gatos'}</span>
              </div>

              <div className={`p-2.5 rounded-xl border flex items-center gap-2 ${
                pet.compatibility.otherDogs ? 'bg-emerald-50/60 border-emerald-200 text-emerald-900' : 'bg-stone-50 border-stone-200 text-stone-500'
              }`}>
                <span>🐶</span>
                <span>{pet.compatibility.otherDogs ? 'Acepta otros Perros' : 'Perro único'}</span>
              </div>
            </div>

            <div className="pt-1 flex items-center justify-between text-xs text-stone-500">
              <span className="flex items-center gap-1">
                <Zap className="w-3.5 h-3.5 text-amber-500" />
                Nivel de energía: <strong className="capitalize text-stone-700">{pet.compatibility.energyLevel}</strong>
              </span>
            </div>
          </div>

          {/* Health Passport */}
          <div className="bg-emerald-50/40 rounded-3xl p-5 border border-emerald-200/60 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-sm text-emerald-950 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                Pasaporte Sanitario & Vacunación
              </h3>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">
                Verificado
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="flex items-center gap-1.5 text-stone-700">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>{pet.health.vaccinated ? 'Vacunación al día' : 'Plan en marcha'}</span>
              </div>
              <div className="flex items-center gap-1.5 text-stone-700">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>{pet.health.neutered ? 'Castrado/a' : 'Castración incluida'}</span>
              </div>
              <div className="flex items-center gap-1.5 text-stone-700">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>{pet.health.dewormed ? 'Desparasitado/a' : 'Desparasitación ok'}</span>
              </div>
              <div className="flex items-center gap-1.5 text-stone-700">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Libreta sanitaria sellada</span>
              </div>
            </div>

            {pet.health.specialCare && (
              <p className="text-[11px] text-stone-500 italic pt-1 border-t border-emerald-200/60">
                * {pet.health.specialCare}
              </p>
            )}
          </div>

          {/* Main Adoption CTA Button */}
          <div className="space-y-3 pt-2">
            <button
              onClick={() => setIsApplyModalOpen(true)}
              className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 hover:from-amber-600 hover:to-rose-600 text-white font-extrabold text-base py-4 px-6 rounded-2xl shadow-lg shadow-orange-500/20 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              <Heart className="w-5 h-5 fill-white" />
              <span>Quiero Postularme para Adoptar a {pet.name}</span>
            </button>

            <a
              href={`https://wa.me/${shelter.whatsapp}?text=Hola%20${encodeURIComponent(shelter.name)}!%20Vi%20a%20${encodeURIComponent(pet.name)}%20en%20Comunidad%20Mascotera%20y%20quiero%20hacer%20unas%20consultas.`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 bg-white hover:bg-stone-50 text-emerald-700 font-bold text-xs py-3 px-4 rounded-xl border border-emerald-200 transition-colors shadow-2xs"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <span>Consultar dudas al refugio por WhatsApp</span>
            </a>
          </div>

        </div>

      </div>

      {/* Modal de Postulación Responsable */}
      {isApplyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-5 shadow-2xl border border-stone-100 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => {
                setIsApplyModalOpen(false);
                setApplicationSubmitted(false);
              }}
              className="absolute top-5 right-5 p-1.5 rounded-full hover:bg-stone-100 text-stone-400"
            >
              <X className="w-5 h-5" />
            </button>

            {applicationSubmitted ? (
              <div className="text-center py-6 space-y-4 animate-in zoom-in-95">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <Check className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-black text-stone-900">
                  ¡Solicitud Enviada con Éxito!
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  Los rescatistas de <strong>{shelter.name}</strong> recibieron tu postulación para <strong>{pet.name}</strong>. Se comunicarán a tu WhatsApp al <strong>{applicantPhone}</strong> en las próximas 24 a 48 horas.
                </p>
                <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200 text-xs text-amber-900 text-left space-y-1">
                  <strong className="block font-bold">Recordá el compromiso:</strong>
                  <span>Al concretarse la adopción, se habilitará el <em>Álbum de Vida</em> de {pet.name} para que subas sus primeras fotos del día 15 y mes 1.</span>
                </div>
                <button
                  onClick={() => {
                    setIsApplyModalOpen(false);
                    setApplicationSubmitted(false);
                  }}
                  className="bg-stone-900 text-white font-bold text-xs px-6 py-3 rounded-xl hover:bg-stone-800 transition-colors"
                >
                  Entendido, ¡muchas gracias!
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="space-y-1">
                  <span className="text-[11px] uppercase font-bold tracking-wider text-amber-600">
                    Formulario de Adopción Responsable
                  </span>
                  <h3 className="text-xl font-extrabold text-stone-900">
                    Postularme para adoptar a {pet.name}
                  </h3>
                  <p className="text-xs text-stone-500">
                    Este formulario permite al refugio conocer tu entorno antes de concretar la entrevista.
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
                    className="w-full bg-amber-500 hover:bg-amber-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-extrabold text-sm py-3 rounded-xl shadow-md transition-colors"
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
