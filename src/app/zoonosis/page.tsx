'use client';

import { useState } from 'react';
import Link from 'next/link';
import { MOCK_NOTICES } from '@/data/mockData';
import { CommunityNotice } from '@/types';
import { 
  Syringe, 
  MapPin, 
  Calendar, 
  AlertCircle, 
  CheckCircle2, 
  FileText, 
  Clock, 
  Sparkles, 
  PartyPopper, 
  Heart, 
  X, 
  Check, 
  Building2, 
  ArrowRight
} from 'lucide-react';

export default function ZoonosisPage() {
  const [selectedMunicipality, setSelectedMunicipality] = useState('todos');

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

  const notices = MOCK_NOTICES.filter((n) => {
    if (selectedMunicipality === 'todos') return true;
    return n.municipality === selectedMunicipality;
  });

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

    // Generar un número de turno aleatorio realista
    const randomTurn = Math.floor(Math.random() * 30) + 10;
    setTurnNumber(randomTurn);
    setBookingConfirmed(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-12">
      
      {/* Header */}
      <div className="space-y-3 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-900 border border-emerald-200">
          <Syringe className="w-3.5 h-3.5 text-emerald-600" />
          <span>Salud Animal Gratuita en Mendoza</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-stone-900 tracking-tight">
          Móviles Veterinarios & Castraciones
        </h1>
        <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
          Cronograma actualizado de operativos de castración quirúrgica gratuita, vacunación antirrábica y desparasitación en los municipios de Mendoza (Godoy Cruz, Capital, Guaymallén, Maipú y Luján).
        </p>
      </div>

      {/* Requisitos para Castración */}
      <div className="bg-amber-50/70 border border-amber-200 rounded-3xl p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-2 text-amber-950 font-bold text-base">
          <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
          <h4>Requisitos obligatorios antes de llevar a tu mascota:</h4>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs text-stone-700">
          <div className="bg-white p-4 rounded-2xl border border-amber-200/60 space-y-1">
            <strong className="block text-amber-900 font-bold">1. Ayuno Previo</strong>
            <span>8 horas de ayuno de sólidos y 4 horas de líquidos sin excepción.</span>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-amber-200/60 space-y-1">
            <strong className="block text-amber-900 font-bold">2. Edad Mínima</strong>
            <span>Perros y gatos a partir de los 6 meses de edad en buen estado de salud.</span>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-amber-200/60 space-y-1">
            <strong className="block text-amber-900 font-bold">3. Traslado Seguro</strong>
            <span>Gatos en transportadora o bolso seguro; perros con collar y correa.</span>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-amber-200/60 space-y-1">
            <strong className="block text-amber-900 font-bold">4. DNI & Manta</strong>
            <span>DNI con domicilio en el departamento y una manta para el postoperatorio.</span>
          </div>
        </div>
      </div>

      {/* Filtro por Municipio */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        <span className="text-xs font-bold text-stone-400 shrink-0">Filtrar por Comuna:</span>
        {['todos', 'Godoy Cruz', 'Guaymallén', 'Capital'].map((m) => (
          <button
            key={m}
            onClick={() => setSelectedMunicipality(m)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 capitalize ${
              selectedMunicipality === m
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-white border border-stone-200 text-stone-700 hover:bg-stone-50'
            }`}
          >
            {m === 'todos' ? 'Todos los municipios' : m}
          </button>
        ))}
      </div>

      {/* Listado de Operativos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {notices.map((notice) => {
          const isMeta = notice.type === 'meta_lograda';
          const isEvento = notice.type === 'evento_adopcion';
          const isMovil = notice.type === 'movil_zoonosis';

          return (
            <div
              key={notice.id}
              className="bg-white rounded-3xl overflow-hidden border border-stone-200 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div className="p-6 sm:p-7 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                    isMeta 
                      ? 'bg-amber-100 text-amber-900' 
                      : isEvento 
                      ? 'bg-rose-100 text-rose-800' 
                      : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    {notice.highlightBadge}
                  </span>
                  {notice.municipality && (
                    <span className="text-xs font-bold text-stone-500 bg-stone-100 px-2.5 py-1 rounded-lg">
                      {notice.municipality}
                    </span>
                  )}
                </div>

                <h3 className="text-xl font-bold text-stone-900 leading-snug">
                  {notice.title}
                </h3>

                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  {notice.subtitle}
                </p>

                <div className="space-y-2 pt-2 text-xs text-stone-600">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{notice.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{notice.location}</span>
                  </div>
                </div>
              </div>

              {/* Botón de acción con comportamiento específico según el tipo */}
              <div className="p-5 bg-stone-50 border-t border-stone-100">
                <button
                  onClick={() => handleOpenNoticeModal(notice)}
                  className={`w-full font-bold text-xs py-3 px-4 rounded-xl transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer ${
                    isMeta
                      ? 'bg-amber-500 hover:bg-amber-600 text-stone-950'
                      : isEvento
                      ? 'bg-rose-600 hover:bg-rose-700 text-white'
                      : isMovil
                      ? 'bg-stone-900 hover:bg-emerald-700 text-white'
                      : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                  }`}
                >
                  {isMeta && <PartyPopper className="w-4 h-4" />}
                  {isEvento && <Calendar className="w-4 h-4" />}
                  {isMovil && <FileText className="w-4 h-4" />}
                  {!isMeta && !isEvento && !isMovil && <Syringe className="w-4 h-4" />}
                  <span>{notice.actionText}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* ========================================================================= */}
      {/* MODAL 1: RESERVA DE TURNO PARA CASTRACIÓN                                 */}
      {/* ========================================================================= */}
      {activeModalNotice && activeModalType === 'castracion' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-5 shadow-2xl border border-stone-100 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={closeModal}
              className="absolute top-5 right-5 p-1.5 rounded-full hover:bg-stone-100 text-stone-400"
            >
              <X className="w-5 h-5" />
            </button>

            {bookingConfirmed ? (
              <div className="text-center py-6 space-y-4 animate-in zoom-in-95">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <Check className="w-8 h-8" />
                </div>
                <div>
                  <span className="text-xs uppercase font-extrabold text-emerald-700 tracking-wider">
                    Turno Confirmado
                  </span>
                  <h3 className="text-2xl font-black text-stone-900">
                    ¡Turno #{turnNumber} Asignado con Éxito!
                  </h3>
                </div>

                <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl text-left space-y-1.5 text-xs text-stone-700">
                  <p><strong>Mascota:</strong> {petName || 'Mascota'} ({petSpecies === 'perro' ? 'Perro' : 'Gato'})</p>
                  <p><strong>Titular:</strong> {ownerName} (DNI: {ownerDni})</p>
                  <p><strong>Lugar:</strong> {activeModalNotice.location}</p>
                  <p><strong>Horario:</strong> {turnTime}</p>
                  <p><strong>Confirmación enviada a WhatsApp:</strong> {ownerPhone}</p>
                </div>

                <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-left text-xs text-amber-950 space-y-1">
                  <strong className="block font-bold">⚠️ Instrucciones importantes:</strong>
                  <ul className="list-disc list-inside space-y-0.5 text-[11px]">
                    <li>Presentarse 15 minutos antes con DNI y comprobante de domicilio.</li>
                    <li>Cumplir estrictamente las 8hs de ayuno de sólidos y 4hs de líquidos.</li>
                    <li>Llevar manta limpia para abrigar a tu mascota tras la anestesia.</li>
                  </ul>
                </div>

                <button
                  onClick={closeModal}
                  className="bg-stone-900 text-white font-bold text-xs px-6 py-3 rounded-xl hover:bg-stone-800 transition-colors w-full"
                >
                  Entendido, cerrar comprobante
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="space-y-1">
                  <span className="text-[11px] uppercase font-bold tracking-wider text-emerald-700">
                    Reserva de Turno Quirúrgico Gratuito
                  </span>
                  <h3 className="text-xl font-extrabold text-stone-900">
                    {activeModalNotice.title}
                  </h3>
                  <p className="text-xs text-stone-500">
                    Lugar: {activeModalNotice.location} • {activeModalNotice.date}
                  </p>
                </div>

                <form onSubmit={handleBookingSubmit} className="space-y-3.5 text-left">
                  <div>
                    <label className="text-xs font-semibold text-stone-700 block mb-1">
                      Nombre y Apellido del responsable *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ej: Martín Rodríguez"
                      value={ownerName}
                      onChange={(e) => setOwnerName(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-xs font-semibold text-stone-700">
                          DNI (solo números) *
                        </label>
                        <span className={`text-[10px] font-bold ${
                          ownerDni.length === 8 ? 'text-emerald-600' : 'text-stone-400'
                        }`}>
                          {ownerDni.length}/8
                        </span>
                      </div>
                      <input
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        required
                        placeholder="Ej: 38123456"
                        value={ownerDni}
                        onChange={(e) => handleDniChange(e.target.value)}
                        className={`w-full bg-stone-50 border rounded-xl px-3.5 py-2.5 text-xs text-stone-900 focus:outline-hidden focus:ring-2 ${
                          formErrors.dni ? 'border-rose-400 focus:ring-rose-400' : 'border-stone-200 focus:ring-emerald-500'
                        }`}
                      />
                      {formErrors.dni && (
                        <p className="text-[11px] text-rose-600 mt-1">{formErrors.dni}</p>
                      )}
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-xs font-semibold text-stone-700">
                          WhatsApp de confirmación *
                        </label>
                        <span className={`text-[10px] font-bold ${
                          ownerPhone.length >= 8 ? 'text-emerald-600' : 'text-stone-400'
                        }`}>
                          {ownerPhone.length >= 8 ? '✓' : `${ownerPhone.length}/8`}
                        </span>
                      </div>
                      <input
                        type="tel"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        required
                        placeholder="Ej: 2615554321"
                        value={ownerPhone}
                        onChange={(e) => handlePhoneChange(e.target.value)}
                        className={`w-full bg-stone-50 border rounded-xl px-3.5 py-2.5 text-xs text-stone-900 focus:outline-hidden focus:ring-2 ${
                          formErrors.phone ? 'border-rose-400 focus:ring-rose-400' : 'border-stone-200 focus:ring-emerald-500'
                        }`}
                      />
                      {formErrors.phone && (
                        <p className="text-[11px] text-rose-600 mt-1">{formErrors.phone}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-semibold text-stone-700 block mb-1">
                        Nombre de la mascota
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Ej: Firulais"
                        value={petName}
                        onChange={(e) => setPetName(e.target.value)}
                        className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-stone-700 block mb-1">
                        Especie
                      </label>
                      <select
                        value={petSpecies}
                        onChange={(e) => setPetSpecies(e.target.value as 'perro' | 'gato')}
                        className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs text-stone-700 font-semibold focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                      >
                        <option value="perro">Perro / Perra</option>
                        <option value="gato">Gato / Gata</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-stone-700 block mb-1">
                      Horario de preferencia
                    </label>
                    <select
                      value={turnTime}
                      onChange={(e) => setTurnTime(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs text-stone-700 font-semibold focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                    >
                      <option value="08:30 hs (Turno Mañana)">08:30 hs (Turno Mañana temprano)</option>
                      <option value="10:30 hs (Turno Media Mañana)">10:30 hs (Turno Media Mañana)</option>
                      <option value="12:00 hs (Turno Mediodía)">12:00 hs (Turno Mediodía)</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    disabled={ownerDni.length < 8 || ownerPhone.length < 8 || !ownerName.trim() || !petName.trim()}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-extrabold text-sm py-3 rounded-xl shadow-md transition-colors"
                  >
                    Confirmar Reserva de Turno Gratuito
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 2: REQUISITOS DETALLADOS DEL MÓVIL VETERINARIO                      */}
      {/* ========================================================================= */}
      {activeModalNotice && activeModalType === 'requisitos' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-5 shadow-2xl border border-stone-100 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={closeModal}
              className="absolute top-5 right-5 p-1.5 rounded-full hover:bg-stone-100 text-stone-400"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2">
              <span className="text-[11px] uppercase font-bold tracking-wider text-emerald-700">
                Guía Completa de Atención
              </span>
              <h3 className="text-xl font-extrabold text-stone-900">
                {activeModalNotice.title}
              </h3>
              <p className="text-xs text-stone-500">
                {activeModalNotice.location} • {activeModalNotice.date}
              </p>
            </div>

            <div className="space-y-3 text-xs text-stone-700 leading-relaxed">
              <div className="p-3.5 bg-stone-50 rounded-2xl border border-stone-200/80 space-y-1">
                <strong className="text-stone-900 font-bold block">💉 Servicios Gratuitos Incluidos:</strong>
                <p>• Castración quirúrgica de caninos y felinos machos y hembras.</p>
                <p>• Vacunación antirrábica anual obligatoria para animales desde los 3 meses.</p>
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
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-3 rounded-xl transition-colors shadow-xs"
              >
                Anotar mi mascota en este móvil
              </button>
              <button
                onClick={closeModal}
                className="bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold text-xs px-4 py-3 rounded-xl transition-colors"
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
              className="absolute top-5 right-5 p-1.5 rounded-full hover:bg-stone-100 text-stone-400"
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
                className="bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold text-xs px-4 py-3 rounded-xl transition-colors"
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
              className="absolute top-5 right-5 p-1.5 rounded-full hover:bg-stone-100 text-stone-400"
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
                className="bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold text-xs px-4 py-3 rounded-xl transition-colors"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
