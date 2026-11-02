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
  AlertCircle,
  CheckCircle2,
  FileText,
  Clock,
  X,
  Check,
  Building2
} from 'lucide-react';

interface NewsCarouselProps {
  notices: CommunityNotice[];
}

export default function NewsCarousel({ notices }: NewsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Modal states
  const [activeModalNotice, setActiveModalNotice] = useState<CommunityNotice | null>(null);
  const [activeModalType, setActiveModalType] = useState<'castracion' | 'requisitos' | 'agradecimiento' | 'evento' | null>(null);

  // Form states for booking
  const [ownerName, setOwnerName] = useState('');
  const [ownerDni, setOwnerDni] = useState('');
  const [ownerPhone, setOwnerPhone] = useState('');
  const [petName, setPetName] = useState('');
  const [petSpecies, setPetSpecies] = useState<'perro' | 'gato'>('perro');
  const [turnTime, setTurnTime] = useState('08:30 hs (Turno Mañana)');
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [turnNumber, setTurnNumber] = useState<number | null>(null);
  const [formErrors, setFormErrors] = useState<{ dni?: string; phone?: string }>({});

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev === notices.length - 1 ? 0 : prev + 1));
  }, [notices.length]);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? notices.length - 1 : prev - 1));
  };

  useEffect(() => {
    if (isPaused || activeModalNotice) return;
    const interval = setInterval(nextSlide, 6500);
    return () => clearInterval(interval);
  }, [isPaused, nextSlide, activeModalNotice]);

  if (!notices || notices.length === 0) return null;

  const currentNotice = notices[currentIndex];

  const handleOpenNoticeModal = (notice: CommunityNotice) => {
    setActiveModalNotice(notice);
    setBookingConfirmed(false);
    setFormErrors({});

    if (notice.type === 'castracion') {
      setActiveModalType('castracion');
    } else if (notice.type === 'movil_zoonosis') {
      setActiveModalType('requisitos');
    } else if (notice.type === 'meta_lograda') {
      setActiveModalType('agradecimiento');
    } else if (notice.type === 'evento_adopcion') {
      setActiveModalType('evento');
    }
  };

  const closeModal = () => {
    setActiveModalNotice(null);
    setActiveModalType(null);
    setBookingConfirmed(false);
    setOwnerName('');
    setOwnerDni('');
    setOwnerPhone('');
    setPetName('');
    setFormErrors({});
  };

  const handleDniChange = (val: string) => {
    const numeric = val.replace(/\D/g, '').slice(0, 8);
    setOwnerDni(numeric);
    if (numeric.length > 0 && numeric.length < 8) {
      setFormErrors((prev) => ({ ...prev, dni: 'El DNI debe tener 8 números' }));
    } else {
      setFormErrors((prev) => ({ ...prev, dni: undefined }));
    }
  };

  const handlePhoneChange = (val: string) => {
    const numeric = val.replace(/\D/g, '').slice(0, 12);
    setOwnerPhone(numeric);
    if (numeric.length > 0 && numeric.length < 8) {
      setFormErrors((prev) => ({ ...prev, phone: 'El teléfono debe tener al menos 8 números' }));
    } else {
      setFormErrors((prev) => ({ ...prev, phone: undefined }));
    }
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: { dni?: string; phone?: string } = {};

    if (ownerDni.length < 8) {
      errors.dni = 'El DNI debe tener 8 números';
    }
    if (ownerPhone.length < 8) {
      errors.phone = 'El teléfono debe tener al menos 8 números';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    const randomTurn = Math.floor(1000 + Math.random() * 9000);
    setTurnNumber(randomTurn);
    setBookingConfirmed(true);
  };

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
    <>
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
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => handleOpenNoticeModal(currentNotice)}
                className="inline-flex items-center justify-center gap-2 bg-white text-stone-900 hover:bg-amber-400 hover:text-stone-950 font-bold text-sm px-6 py-3 rounded-xl shadow-lg transition-all duration-200 group/btn cursor-pointer"
              >
                <span>{currentNotice.actionText}</span>
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </button>

              <Link
                href="/zoonosis"
                className="text-xs text-stone-300 hover:text-white underline underline-offset-4 font-medium transition-colors"
              >
                Ver todo el cronograma
              </Link>
            </div>

            {/* Controls: Prev / Next and Dots */}
            <div className="flex items-center gap-3 self-end sm:self-center">
              <div className="flex gap-1.5 mr-2">
                {notices.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-2 rounded-full transition-all cursor-pointer ${
                      currentIndex === idx ? 'w-6 bg-amber-400' : 'w-2 bg-white/40 hover:bg-white/70'
                    }`}
                    aria-label={`Ir al aviso ${idx + 1}`}
                  />
                ))}
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={prevSlide}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/25 backdrop-blur-xs flex items-center justify-center text-white transition-colors cursor-pointer"
                  aria-label="Aviso anterior"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={nextSlide}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/25 backdrop-blur-xs flex items-center justify-center text-white transition-colors cursor-pointer"
                  aria-label="Siguiente aviso"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* ========================================================================= */}
      {/* MODAL 1: FORMULARIO DE TURNO DE CASTRACIÓN                                */}
      {/* ========================================================================= */}
      {activeModalNotice && activeModalType === 'castracion' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-5 shadow-2xl border border-stone-100 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={closeModal}
              className="absolute top-5 right-5 p-1.5 rounded-full hover:bg-stone-100 text-stone-400 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {bookingConfirmed ? (
              <div className="text-center py-6 space-y-4 animate-in zoom-in-95">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <Check className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
                    Turno #{turnNumber} Confirmado
                  </span>
                  <h3 className="text-2xl font-black text-stone-900">
                    ¡Turno reservado con éxito!
                  </h3>
                  <p className="text-xs text-stone-600 max-w-sm mx-auto">
                    Tu turno para <strong>{petName}</strong> fue agendado en <strong>{activeModalNotice.location}</strong> para el horario <strong>{turnTime}</strong>.
                  </p>
                </div>

                <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-left text-xs space-y-2 text-amber-900">
                  <p className="font-bold">⚠️ Requisitos obligatorios para el día de la cirugía:</p>
                  <ul className="list-disc pl-4 space-y-1 text-amber-800">
                    <li>Ayuno estricto de 12 horas de sólidos y 6 horas de líquidos.</li>
                    <li>Llevar una manta o abrigo para el post-operatorio.</li>
                    <li>Perros con collar y correa (bozal si es reactivo); gatos en bolso o transportadora ventilada.</li>
                    <li>Presentarse 15 minutos antes con DNI que acredite domicilio en {activeModalNotice.municipality || 'Mendoza'}.</li>
                  </ul>
                </div>

                <button
                  onClick={closeModal}
                  className="w-full bg-stone-900 hover:bg-amber-500 hover:text-stone-950 text-white font-bold text-xs py-3 rounded-xl transition-colors cursor-pointer"
                >
                  Entendido, cerrar comprobante
                </button>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="space-y-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                    Inscripción Online de Zoonosis
                  </span>
                  <h3 className="text-xl font-black text-stone-900">
                    Turno para Castración Quirúrgica
                  </h3>
                  <p className="text-xs text-stone-500 mt-1">
                    {activeModalNotice.title} • {activeModalNotice.location}
                  </p>
                </div>

                <div className="space-y-3 pt-2 text-xs">
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">
                      Nombre y Apellido del Tutor Responsable:
                    </label>
                    <input
                      type="text"
                      required
                      value={ownerName}
                      onChange={(e) => setOwnerName(e.target.value)}
                      placeholder="Ej. Martín Alvarado"
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <label className="font-semibold text-stone-700">DNI (8 números):</label>
                        <span className={`text-[10px] ${ownerDni.length === 8 ? 'text-emerald-600 font-bold' : 'text-stone-400'}`}>
                          {ownerDni.length}/8
                        </span>
                      </div>
                      <input
                        type="text"
                        inputMode="numeric"
                        required
                        value={ownerDni}
                        onChange={(e) => handleDniChange(e.target.value)}
                        placeholder="38123456"
                        className={`w-full bg-stone-50 border rounded-xl px-3.5 py-2.5 text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-amber-500 ${
                          formErrors.dni ? 'border-rose-400 bg-rose-50/30' : 'border-stone-200'
                        }`}
                      />
                      {formErrors.dni && (
                        <p className="text-[10px] text-rose-500 mt-1 font-semibold">{formErrors.dni}</p>
                      )}
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <label className="font-semibold text-stone-700">WhatsApp de contacto:</label>
                        <span className={`text-[10px] ${ownerPhone.length >= 8 ? 'text-emerald-600 font-bold' : 'text-stone-400'}`}>
                          {ownerPhone.length >= 8 ? '✓' : `${ownerPhone.length}/8`}
                        </span>
                      </div>
                      <input
                        type="text"
                        inputMode="numeric"
                        required
                        value={ownerPhone}
                        onChange={(e) => handlePhoneChange(e.target.value)}
                        placeholder="2613670507"
                        className={`w-full bg-stone-50 border rounded-xl px-3.5 py-2.5 text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-amber-500 ${
                          formErrors.phone ? 'border-rose-400 bg-rose-50/30' : 'border-stone-200'
                        }`}
                      />
                      {formErrors.phone && (
                        <p className="text-[10px] text-rose-500 mt-1 font-semibold">{formErrors.phone}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold text-stone-700 mb-1">Nombre de la Mascota:</label>
                      <input
                        type="text"
                        required
                        value={petName}
                        onChange={(e) => setPetName(e.target.value)}
                        placeholder="Ej. Choco"
                        className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-stone-700 mb-1">Especie:</label>
                      <select
                        value={petSpecies}
                        onChange={(e) => setPetSpecies(e.target.value as 'perro' | 'gato')}
                        className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2.5 text-stone-700 font-medium focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                      >
                        <option value="perro">🐶 Canino (Perro/a)</option>
                        <option value="gato">🐱 Felino (Gato/a)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">Horario sugerido de ingreso:</label>
                    <select
                      value={turnTime}
                      onChange={(e) => setTurnTime(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2.5 text-stone-700 font-medium focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                    >
                      <option value="08:30 hs (Turno Mañana)">08:30 hs (Turno Mañana - Primer turno)</option>
                      <option value="10:00 hs (Turno Mañana)">10:00 hs (Turno Mañana - Segundo turno)</option>
                      <option value="11:30 hs (Turno Mediodía)">11:30 hs (Turno Mediodía - Tercer turno)</option>
                    </select>
                  </div>
                </div>

                <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-blue-900 text-[11px] leading-relaxed">
                  ℹ️ Servicio veterinario 100% municipal y gratuito. Se solicita puntualidad y cumplir con el ayuno de 12 horas.
                </div>

                <button
                  type="submit"
                  disabled={ownerDni.length < 8 || ownerPhone.length < 8 || !ownerName.trim() || !petName.trim()}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-xs py-3 rounded-xl transition-colors shadow-sm cursor-pointer"
                >
                  Confirmar y Generar Turno Gratuito
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 2: REQUISITOS DE AYUNO Y TURNOS (MÓVIL ZOONOSIS)                   */}
      {/* ========================================================================= */}
      {activeModalNotice && activeModalType === 'requisitos' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-5 shadow-2xl border border-stone-100 relative">
            <button
              onClick={closeModal}
              className="absolute top-5 right-5 p-1.5 rounded-full hover:bg-stone-100 text-stone-400 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <span className="text-xs uppercase font-extrabold text-emerald-700 tracking-wider">
                Guía de Preparación Oficial
              </span>
              <h3 className="text-xl font-black text-stone-900">
                {activeModalNotice.title}
              </h3>
              <p className="text-xs text-stone-500">
                📍 {activeModalNotice.location} • {activeModalNotice.date}
              </p>
            </div>

            <div className="space-y-3 text-xs text-stone-700 leading-relaxed max-h-[60vh] overflow-y-auto pr-1">
              <div className="p-3.5 bg-emerald-50 rounded-2xl border border-emerald-200 space-y-1 text-emerald-950">
                <strong className="font-bold block">🚨 Preparación Quirúrgica:</strong>
                <p>• <strong>Ayuno previo:</strong> 12 horas de ayuno sólido total y 6 horas de líquidos.</p>
                <p>• <strong>Edad mínima:</strong> A partir de los 5 meses de edad.</p>
                <p>• <strong>Estado de salud:</strong> El animal debe estar sano, sin garrapatas visibles y no presentar celo reciente.</p>
              </div>

              <div className="p-3.5 bg-stone-50 rounded-2xl border border-stone-200 space-y-1 text-stone-800">
                <strong className="font-bold block">💉 Servicios incluidos sin costo:</strong>
                <p>• Esterilización quirúrgica (castración machos y hembras).</p>
                <p>• Vacunación antirrábica anual obligatoria para mayores de 3 meses.</p>
                <p>• Desparasitación interna y pipeta preventiva para pulgas/garrapatas.</p>
              </div>

              <div className="p-3.5 bg-amber-50 rounded-2xl border border-amber-200 space-y-1 text-amber-950">
                <strong className="font-bold block">📋 Modalidad de Atención:</strong>
                <p>• Por orden de llegada a partir de las 8:30 hs.</p>
                <p>• Cupo diario de 25 cirugías por jornada para garantizar la máxima seguridad.</p>
                <p>• Debe acreditarse domicilio en {activeModalNotice.municipality || 'el departamento'} con DNI físico.</p>
              </div>
            </div>

            <div className="pt-2 flex gap-2">
              <button
                onClick={() => {
                  setActiveModalType('castracion');
                }}
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-3 rounded-xl transition-colors shadow-xs cursor-pointer"
              >
                Anotar mi mascota en este móvil
              </button>
              <button
                onClick={closeModal}
                className="bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold text-xs px-4 py-3 rounded-xl transition-colors cursor-pointer"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 3: RESUMEN DE AGRADECIMIENTO POR META LOGRADA                       */}
      {/* ========================================================================= */}
      {activeModalNotice && activeModalType === 'agradecimiento' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-5 shadow-2xl border border-stone-100 relative text-center">
            <button
              onClick={closeModal}
              className="absolute top-5 right-5 p-1.5 rounded-full hover:bg-stone-100 text-stone-400 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-16 h-16 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center mx-auto">
              <PartyPopper className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <span className="text-xs uppercase font-extrabold text-amber-700 tracking-wider">
                Festejo de la Comunidad Mascotera
              </span>
              <h3 className="text-2xl font-black text-stone-900">
                ¡Gracias Mendoza! Meta Cumplida
              </h3>
              <p className="text-xs text-stone-600">
                {activeModalNotice.title}
              </p>
            </div>

            <div className="bg-stone-50 border border-stone-200 rounded-2xl p-4 text-left space-y-2 text-xs text-stone-700">
              <p className="leading-relaxed">
                🎉 Gracias a <strong>180 vecinos donantes</strong>, comerciantes de Chacras de Coria y la donación directa por Alias sin intermediarios, se adquirieron <strong>60 bolsas de alimento balanceado premium (15kg)</strong>.
              </p>
              <div className="pt-2 border-t border-stone-200/80 grid grid-cols-2 gap-2 text-center font-bold">
                <div className="p-2 bg-white rounded-xl border border-stone-200">
                  <span className="text-lg text-amber-600 block">38</span>
                  <span className="text-[10px] text-stone-500">Perritos alimentados este mes</span>
                </div>
                <div className="p-2 bg-white rounded-xl border border-stone-200">
                  <span className="text-lg text-emerald-600 block">100%</span>
                  <span className="text-[10px] text-stone-500">Fondos auditados y directos</span>
                </div>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-2">
              <Link
                href="/refugios/angeles-cuatro-patas"
                onClick={closeModal}
                className="flex-1 inline-flex items-center justify-center gap-1.5 bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold text-xs py-3 rounded-xl shadow-xs transition-colors"
              >
                <span>Ver perfil del Refugio Ángeles</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <button
                onClick={closeModal}
                className="bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold text-xs px-4 py-3 rounded-xl transition-colors cursor-pointer"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 4: DETALLE DE JORNADA DE ADOPCIÓN (CALENDARIO)                      */}
      {/* ========================================================================= */}
      {activeModalNotice && activeModalType === 'evento' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-5 shadow-2xl border border-stone-100 relative">
            <button
              onClick={closeModal}
              className="absolute top-5 right-5 p-1.5 rounded-full hover:bg-stone-100 text-stone-400 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <span className="text-[11px] uppercase font-bold tracking-wider text-rose-600">
                Evento Presencial en Mendoza
              </span>
              <h3 className="text-xl font-extrabold text-stone-900">
                {activeModalNotice.title}
              </h3>
              <p className="text-xs text-stone-500">
                {activeModalNotice.location}
              </p>
            </div>

            <div className="space-y-2 text-xs text-stone-700 leading-relaxed bg-stone-50 p-4 rounded-2xl border border-stone-200/80">
              <p>📍 <strong>Lugar exacto:</strong> Prado Español, Parque Central, Ciudad de Mendoza.</p>
              <p>🗓️ <strong>Fecha y hora:</strong> {activeModalNotice.date}</p>
              <p>🐕 <strong>Qué vas a encontrar:</strong> Fichas de animales en tránsito, interacción guiada por adiestradores, stands de refugios y asesoramiento veterinario gratuito sobre tenencia responsable.</p>
            </div>

            <div className="p-3 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Entrada libre y gratuita. Evento Pet-Friendly (podés llevar a tu mascota con correa).</span>
            </div>

            <div className="pt-2 flex gap-2">
              <a
                href="https://calendar.google.com"
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeModal}
                className="flex-1 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs py-3 rounded-xl text-center shadow-xs transition-colors"
              >
                Abrir en Google Calendar
              </a>
              <button
                onClick={closeModal}
                className="bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold text-xs px-4 py-3 rounded-xl transition-colors cursor-pointer"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
