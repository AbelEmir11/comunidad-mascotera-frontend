'use client';

import SponsorWall from '@/components/SponsorWall';
import { Sparkles, Building2, Gift, Award, CheckCircle2 } from 'lucide-react';

export default function PatrocinadoresPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-200">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          <span>Sinergia Pública, Privada y Social</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-stone-900 tracking-tight">
          Mural de Patrocinadores & Aliados
        </h1>
        <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
          Los refugios no pueden depender únicamente de rifas o del bolsillo de los rescatistas. Conectamos municipios que buscan visibilidad en salud pública con veterinarias que ofrecen beneficios reales a los adoptantes.
        </p>
      </div>

      {/* 3 Razones por las que funciona */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-stone-100 shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center">
            <Building2 className="w-6 h-6" />
          </div>
          <h3 className="font-extrabold text-base text-stone-900">Para Municipios</h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            Muestra el impacto de sus áreas de Zoonosis, castraciones masivas y campañas de tenencia responsable con métricas verificadas y agradecimiento público provincial.
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-stone-100 shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
            <Gift className="w-6 h-6" />
          </div>
          <h3 className="font-extrabold text-base text-stone-900">Para Veterinarias</h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            Ofrecer un descuento en la primera consulta o vacuna convierte al adoptante en un cliente fiel para los 10 a 15 años de vida de la mascota.
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-stone-100 shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-orange-100 text-orange-800 flex items-center justify-center">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="font-extrabold text-base text-stone-900">Para el Adoptante</h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            Recibe un &quot;Kit de Bienvenida&quot; con cupones de descuento que alivian el costo de atención inicial y aseguran que la mascota esté sana desde el día 1.
          </p>
        </div>
      </div>

      {/* Componente del Mural */}
      <SponsorWall />

    </div>
  );
}
