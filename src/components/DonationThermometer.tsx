'use client';

import { useState } from 'react';
import { MOCK_SHELTERS } from '@/data/mockData';
import { 
  HandHeart, 
  Copy, 
  Check, 
  ShieldCheck, 
  QrCode, 
  HeartHandshake, 
  Car, 
  Sparkles,
  CheckCircle2,
  X
} from 'lucide-react';

export default function DonationThermometer() {
  const [selectedShelterId, setSelectedShelterId] = useState(MOCK_SHELTERS[0].id);
  const [copiedAlias, setCopiedAlias] = useState(false);
  const [copiedCbu, setCopiedCbu] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);

  // Volunteer form modal state
  const [volunteerName, setVolunteerName] = useState('');
  const [volunteerPhone, setVolunteerPhone] = useState('');
  const [volunteerType, setVolunteerType] = useState('traslado_auto');
  const [volunteerSubmitted, setVolunteerSubmitted] = useState(false);

  const currentShelter = MOCK_SHELTERS.find((s) => s.id === selectedShelterId) || MOCK_SHELTERS[0];

  const handleCopy = (text: string, isAlias: boolean) => {
    navigator.clipboard.writeText(text);
    if (isAlias) {
      setCopiedAlias(true);
      setTimeout(() => setCopiedAlias(false), 2500);
    } else {
      setCopiedCbu(true);
      setTimeout(() => setCopiedCbu(false), 2500);
    }
  };

  const handleVolunteerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!volunteerName || !volunteerPhone) return;
    setVolunteerSubmitted(true);
    setTimeout(() => {
      setVolunteerSubmitted(false);
      setVolunteerName('');
      setVolunteerPhone('');
    }, 4000);
  };

  return (
    <div id="donaciones" className="bg-gradient-to-b from-amber-50/50 via-white to-stone-50 rounded-3xl p-6 sm:p-8 lg:p-12 border border-amber-100 shadow-xl space-y-10">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900">
          <HandHeart className="w-3.5 h-3.5 text-amber-600" />
          100% Directo a los Refugios • 0% Comisiones
        </div>
        <h3 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
          Termómetro de Necesidades & Donaciones
        </h3>
        <p className="text-sm text-stone-600">
          En lugar de pasarelas que descuentan hasta un 10% en comisiones, transferís directamente al Alias o CBU oficial de cada refugio, o colaborás con tu tiempo y vehículo.
        </p>
      </div>

      {/* Selector de Refugios en Mendoza */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {MOCK_SHELTERS.map((shelter) => (
          <button
            key={shelter.id}
            onClick={() => setSelectedShelterId(shelter.id)}
            className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 ${
              selectedShelterId === shelter.id
                ? 'bg-amber-500 text-white shadow-md shadow-amber-500/20 ring-2 ring-amber-400/40'
                : 'bg-white border border-stone-200 text-stone-700 hover:bg-stone-50'
            }`}
          >
            <img src={shelter.logo} alt={shelter.name} className="w-4 h-4 rounded-full object-cover" />
            <span>{shelter.name}</span>
          </button>
        ))}
      </div>

      {/* Grid: Termómetro de Insumos vs Datos Bancarios / Voluntariado */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Columna 1: Termómetro de Insumos (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-stone-200/80 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-stone-100 pb-3">
            <div>
              <h4 className="font-extrabold text-base text-stone-900">
                Insumos que necesita {currentShelter.name}
              </h4>
              <p className="text-xs text-stone-500">
                Ubicación: {currentShelter.location}
              </p>
            </div>
            <span className="text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200/60 px-2.5 py-1 rounded-full">
              Actualizado esta semana
            </span>
          </div>

          {/* Barras de Progreso */}
          <div className="space-y-4">
            {currentShelter.needs.map((item) => {
              const percentage = Math.min(100, Math.round((item.current / item.needed) * 100));
              return (
                <div key={item.id} className="space-y-1.5 bg-stone-50/60 p-3.5 rounded-2xl border border-stone-100">
                  <div className="flex items-center justify-between text-xs font-bold text-stone-800">
                    <span className="flex items-center gap-1.5">
                      <span className={`w-2 h-2 rounded-full ${
                        item.urgency === 'alta' ? 'bg-rose-500 animate-pulse' : 'bg-amber-500'
                      }`} />
                      {item.item}
                    </span>
                    <span className="text-stone-600">
                      {item.current} de {item.needed} {item.unit} ({percentage}%)
                    </span>
                  </div>

                  <div className="w-full bg-stone-200 rounded-full h-2.5 overflow-hidden">
                    <div
                      className={`h-2.5 rounded-full transition-all duration-700 ${
                        percentage >= 80 
                          ? 'bg-emerald-500' 
                          : percentage >= 40 
                          ? 'bg-amber-500' 
                          : 'bg-orange-500'
                      }`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex items-center gap-2 text-xs text-stone-500 bg-stone-50 p-3 rounded-xl">
            <HeartHandshake className="w-4 h-4 text-amber-600 shrink-0" />
            <span>
              ¿Podés acercar bolsas de alimento o medicamentos en persona? Contactá al refugio por WhatsApp al <strong>{currentShelter.phone}</strong> para coordinar entrega en punto seguro.
            </span>
          </div>
        </div>

        {/* Columna 2: Cuentas Oficiales y Voluntariado (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Tarjeta de Transferencia Directa */}
          <div className="bg-stone-900 text-white rounded-2xl p-6 shadow-md space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                Cuenta Oficial del Refugio
              </span>
              <div className="flex items-center gap-1 text-[11px] text-emerald-400">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Titular verificado</span>
              </div>
            </div>

            <div className="space-y-1">
              <div className="text-xs text-stone-400">Titular: {currentShelter.titular}</div>
              <div className="text-xs text-stone-400">Entidad: {currentShelter.bankName}</div>
              <div className="text-xs text-stone-400">CUIT: {currentShelter.cuit}</div>
            </div>

            {/* Bloque Alias con 1-clic */}
            <div className="bg-stone-800/90 rounded-xl p-3 border border-stone-700 space-y-1">
              <span className="text-[10px] text-stone-400 uppercase font-bold tracking-wider">
                Alias de Transferencia Directa
              </span>
              <div className="flex items-center justify-between gap-2">
                <code className="text-sm font-mono font-bold text-amber-300">
                  {currentShelter.alias}
                </code>
                <button
                  onClick={() => handleCopy(currentShelter.alias, true)}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                    copiedAlias ? 'bg-emerald-600 text-white' : 'bg-stone-700 hover:bg-stone-600 text-stone-200'
                  }`}
                >
                  {copiedAlias ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedAlias ? '¡Copiado!' : 'Copiar'}</span>
                </button>
              </div>
            </div>

            {/* Bloque CBU con 1-clic */}
            <div className="bg-stone-800/90 rounded-xl p-3 border border-stone-700 space-y-1">
              <span className="text-[10px] text-stone-400 uppercase font-bold tracking-wider">
                CBU
              </span>
              <div className="flex items-center justify-between gap-2">
                <code className="text-xs font-mono text-stone-300 truncate">
                  {currentShelter.cbu}
                </code>
                <button
                  onClick={() => handleCopy(currentShelter.cbu, false)}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                    copiedCbu ? 'bg-emerald-600 text-white' : 'bg-stone-700 hover:bg-stone-600 text-stone-200'
                  }`}
                >
                  {copiedCbu ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedCbu ? '¡Copiado!' : 'Copiar'}</span>
                </button>
              </div>
            </div>

            <button
              onClick={() => setShowQrModal(true)}
              className="w-full inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white text-xs font-bold py-2 rounded-xl transition-colors border border-white/15"
            >
              <QrCode className="w-3.5 h-3.5" />
              <span>Ver Código QR de Transferencia</span>
            </button>
          </div>

          {/* Tarjeta de Voluntariado / Banco de Horas y Auto */}
          <div className="bg-white rounded-2xl p-5 border border-stone-200/80 space-y-3">
            <div className="flex items-center gap-2">
              <Car className="w-4 h-4 text-amber-600" />
              <h5 className="font-bold text-sm text-stone-900">
                Sumate como Voluntario / Traslados
              </h5>
            </div>
            <p className="text-xs text-stone-600">
              ¿Tenés auto para llevar un perrito al veterinario o 2 horas el fin de semana para ayudar?
            </p>

            {volunteerSubmitted ? (
              <div className="p-3 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>¡Gracias por postularte! El refugio se comunicará por WhatsApp.</span>
              </div>
            ) : (
              <form onSubmit={handleVolunteerSubmit} className="space-y-2.5">
                <input
                  type="text"
                  required
                  placeholder="Tu nombre y apellido"
                  value={volunteerName}
                  onChange={(e) => setVolunteerName(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                />
                <input
                  type="tel"
                  required
                  placeholder="WhatsApp (ej. 261 555-1234)"
                  value={volunteerPhone}
                  onChange={(e) => setVolunteerPhone(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                />
                <select
                  value={volunteerType}
                  onChange={(e) => setVolunteerType(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                >
                  <option value="traslado_auto">Tengo auto para traslados veterinarios</option>
                  <option value="paseos_limpieza">Paseos y mantenimiento en el refugio</option>
                  <option value="hogar_transito">Ofrezco hogar de tránsito temporal</option>
                  <option value="difusion">Diseño / Difusión en redes sociales</option>
                </select>
                <button
                  type="submit"
                  className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs py-2 rounded-xl transition-colors shadow-xs"
                >
                  Quiero Colaborar
                </button>
              </form>
            )}
          </div>

        </div>

      </div>

      {/* Modal de QR */}
      {showQrModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 text-center space-y-4 border border-stone-100 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setShowQrModal(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-stone-100 text-stone-400"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="space-y-1">
              <h4 className="font-extrabold text-base text-stone-900">
                QR para Transferencia Inmediata
              </h4>
              <p className="text-xs text-stone-500">
                Escaneá desde tu app bancaria o billetera virtual (Mercado Pago, BNA+, Ualá, etc.)
              </p>
            </div>
            <div className="p-4 bg-stone-50 border border-stone-200 rounded-2xl inline-block">
              {/* QR Image placeholder with clean graphic */}
              <div className="w-48 h-48 bg-stone-900 rounded-xl flex flex-col items-center justify-center text-white p-4 space-y-2">
                <QrCode className="w-28 h-28 text-white" />
                <span className="text-[11px] font-mono font-bold text-amber-300">
                  {currentShelter.alias}
                </span>
              </div>
            </div>
            <p className="text-[11px] text-emerald-700 font-semibold bg-emerald-50 py-1.5 px-3 rounded-lg">
              ✓ Transferencia directa y 100% gratuita para el refugio
            </p>
          </div>
        </div>
      )}

    </div>
  );
}
