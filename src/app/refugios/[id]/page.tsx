'use client';

import { useState, use } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MOCK_SHELTERS, MOCK_PETS } from '@/data/mockData';
import PetCard from '@/components/PetCard';
import { 
  ArrowLeft, 
  MapPin, 
  Phone, 
  Mail, 
  MessageCircle, 
  Copy, 
  Check, 
  ShieldCheck, 
  Dog, 
  HeartHandshake, 
  Award,
  Sparkles
} from 'lucide-react';

export default function ShelterDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const shelter = MOCK_SHELTERS.find((s) => s.id === resolvedParams.id);

  const [copiedAlias, setCopiedAlias] = useState(false);
  const [copiedCbu, setCopiedCbu] = useState(false);

  if (!shelter) {
    notFound();
  }

  const shelterPets = MOCK_PETS.filter((p) => p.shelterId === shelter.id);

  const copyText = (text: string, isAlias: boolean) => {
    navigator.clipboard.writeText(text);
    if (isAlias) {
      setCopiedAlias(true);
      setTimeout(() => setCopiedAlias(false), 2500);
    } else {
      setCopiedCbu(true);
      setTimeout(() => setCopiedCbu(false), 2500);
    }
  };

  return (
    <div className="space-y-12 pb-16">
      
      {/* Banner de Portada & Header */}
      <div className="relative bg-stone-900 text-white">
        {/* Cover Image Background */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: `url(${shelter.coverImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/70 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12 sm:pt-12 sm:pb-16 space-y-6">
          
          <Link
            href="/refugios"
            className="inline-flex items-center gap-2 text-xs font-bold text-stone-300 hover:text-white bg-white/10 hover:bg-white/20 px-3.5 py-1.5 rounded-xl backdrop-blur-md transition-colors w-fit border border-white/10"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Volver a todos los refugios</span>
          </Link>

          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 pt-4">
            
            {/* Logo & Shelter info */}
            <div className="flex items-center gap-5">
              <img
                src={shelter.logo}
                alt={shelter.name}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl object-cover border-4 border-white/20 shadow-xl bg-white"
              />
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] uppercase font-bold tracking-wider bg-amber-500 text-stone-950 px-2.5 py-0.5 rounded-md">
                    Refugio Verificado
                  </span>
                  <span className="text-xs text-amber-200 flex items-center gap-1 font-semibold">
                    <MapPin className="w-3.5 h-3.5" />
                    {shelter.location}
                  </span>
                </div>
                <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
                  {shelter.name}
                </h1>
                <p className="text-xs sm:text-sm text-stone-300 max-w-xl leading-relaxed">
                  {shelter.tagline}
                </p>
              </div>
            </div>

            {/* Quick action buttons */}
            <div className="flex items-center gap-2.5 self-stretch md:self-end">
              <a
                href={`https://wa.me/${shelter.whatsapp}?text=Hola!%20Me%20contacto%20desde%20Comunidad%20Mascotera%20Mendoza.`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 md:flex-initial inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-4 py-3 rounded-xl shadow-md transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>
              <a
                href={`https://instagram.com/${shelter.instagram}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 md:flex-initial inline-flex items-center justify-center gap-2 bg-white/15 hover:bg-white/25 text-white font-bold text-xs px-4 py-3 rounded-xl backdrop-blur-md border border-white/20 transition-colors"
              >
                <svg className="w-4 h-4 text-pink-300 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                <span>Instagram</span>
              </a>
            </div>

          </div>

        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Grid: Historia & Termómetro vs Datos Bancarios Directos */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Historia & Termómetro de Necesidades (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Historia */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-100 shadow-xs space-y-3">
              <h3 className="text-lg font-black text-stone-900 tracking-tight">
                Nuestra Historia y Misión
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                {shelter.description}
              </p>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                {shelter.story}
              </p>
            </div>

            {/* Termómetro de Insumos específico de este refugio */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-100 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                <div>
                  <h3 className="text-base font-black text-stone-900">
                    Termómetro de Insumos Urgentes
                  </h3>
                  <p className="text-xs text-stone-500">
                    Necesidades activas de {shelter.name}
                  </p>
                </div>
                <span className="text-[11px] font-bold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
                  Actualizado hoy
                </span>
              </div>

              <div className="space-y-4">
                {shelter.needs.map((need) => {
                  const percentage = Math.min(100, Math.round((need.current / need.needed) * 100));
                  return (
                    <div key={need.id} className="space-y-1.5 bg-stone-50 p-3.5 rounded-2xl border border-stone-100">
                      <div className="flex items-center justify-between text-xs font-bold text-stone-800">
                        <span className="flex items-center gap-2">
                          <span className={`w-2 h-2 rounded-full ${
                            need.urgency === 'alta' ? 'bg-rose-500' : 'bg-amber-500'
                          }`} />
                          {need.item}
                        </span>
                        <span>{need.current} / {need.needed} {need.unit} ({percentage}%)</span>
                      </div>
                      <div className="w-full bg-stone-200 rounded-full h-2">
                        <div
                          className="bg-amber-500 h-2 rounded-full transition-all duration-700"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Tarjeta Bancaria Oficial 100% libre de comisiones (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-gradient-to-br from-stone-900 via-stone-800 to-amber-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl space-y-5 border border-stone-700">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                  Datos Oficiales para Donar
                </span>
                <span className="text-[11px] text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-2 py-0.5 rounded-md flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  0% Comisión
                </span>
              </div>

              <p className="text-xs text-stone-300 leading-relaxed">
                Cada peso que transferís ingresa de forma inmediata e íntegra a la cuenta oficial de <strong>{shelter.name}</strong> sin descuentos de plataformas.
              </p>

              {/* Alias */}
              <div className="bg-stone-950/80 rounded-2xl p-4 border border-stone-700 space-y-1">
                <span className="text-[10px] uppercase font-bold text-stone-400 tracking-wider block">
                  Alias Bancario
                </span>
                <div className="flex items-center justify-between gap-2">
                  <code className="text-sm font-mono font-black text-amber-300">
                    {shelter.alias}
                  </code>
                  <button
                    onClick={() => copyText(shelter.alias, true)}
                    className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      copiedAlias ? 'bg-emerald-600 text-white' : 'bg-stone-800 hover:bg-stone-700 text-stone-200'
                    }`}
                  >
                    {copiedAlias ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedAlias ? '¡Copiado!' : 'Copiar Alias'}</span>
                  </button>
                </div>
              </div>

              {/* CBU */}
              <div className="bg-stone-950/80 rounded-2xl p-4 border border-stone-700 space-y-1">
                <span className="text-[10px] uppercase font-bold text-stone-400 tracking-wider block">
                  CBU
                </span>
                <div className="flex items-center justify-between gap-2">
                  <code className="text-xs font-mono text-stone-300 truncate">
                    {shelter.cbu}
                  </code>
                  <button
                    onClick={() => copyText(shelter.cbu, false)}
                    className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      copiedCbu ? 'bg-emerald-600 text-white' : 'bg-stone-800 hover:bg-stone-700 text-stone-200'
                    }`}
                  >
                    {copiedCbu ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedCbu ? '¡Copiado!' : 'Copiar'}</span>
                  </button>
                </div>
              </div>

              {/* Datos del titular */}
              <div className="text-xs text-stone-400 space-y-1 pt-1 border-t border-stone-700/60">
                <div>Titular: <strong className="text-stone-200">{shelter.titular}</strong></div>
                <div>Banco: <strong className="text-stone-200">{shelter.bankName}</strong></div>
                <div>CUIT: <strong className="text-stone-200">{shelter.cuit}</strong></div>
              </div>

              <div className="p-3 bg-emerald-900/30 border border-emerald-700/40 rounded-xl text-[11px] text-emerald-300">
                💡 Podés enviar el comprobante de transferencia por WhatsApp al <strong>{shelter.phone}</strong> para recibir el agradecimiento del refugio.
              </div>
            </div>

          </div>

        </div>

        {/* Sección: Animales en tránsito bajo el cuidado de ESTE refugio */}
        <div className="space-y-6 pt-4 border-t border-stone-200">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-600">
                En busca de familia
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight flex items-center gap-2">
                <Dog className="w-6 h-6 text-amber-600" />
                Animales albergados en {shelter.name} ({shelterPets.length})
              </h3>
              <p className="text-xs text-stone-500">
                Conocé a los perritos y gatitos que están listos para adopción en esta sede.
              </p>
            </div>
          </div>

          {shelterPets.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {shelterPets.map((pet) => (
                <PetCard key={pet.id} pet={pet} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-10 text-center border border-stone-100">
              <p className="text-sm text-stone-500">
                Actualmente todos los rescatados de esta sede están en período de adaptación médica. Pronto se publicarán nuevas fichas.
              </p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
