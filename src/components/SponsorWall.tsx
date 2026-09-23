import Link from 'next/link';
import { MOCK_SPONSORS } from '@/data/mockData';
import { Sparkles, Award, Gift, Building2, ExternalLink, Heart } from 'lucide-react';

export default function SponsorWall() {
  const municipios = MOCK_SPONSORS.filter((s) => s.category === 'municipio');
  const veterinarias = MOCK_SPONSORS.filter((s) => s.category === 'veterinaria');
  const marcas = MOCK_SPONSORS.filter((s) => s.category === 'marca');

  return (
    <div id="patrocinadores" className="bg-stone-900 text-white rounded-3xl p-6 sm:p-8 lg:p-12 shadow-2xl relative overflow-hidden space-y-10 border border-stone-800">
      
      {/* Background glow styling */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header del Mural */}
      <div className="relative z-10 text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
          <Sparkles className="w-3.5 h-3.5" />
          Alianzas que Hacen la Diferencia
        </div>
        <h3 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
          Mural de Grandes Patrocinadores & Aliados
        </h3>
        <p className="text-sm text-stone-300 leading-relaxed">
          Un agradecimiento público y de honor a las comunas, profesionales y empresas comprometidas con la salud animal y la erradicación del abandono en Mendoza.
        </p>
      </div>

      {/* Categoría 1: Compromiso Municipal & Gubernamental (Platino) */}
      <div className="relative z-10 space-y-4">
        <div className="flex items-center gap-2 border-b border-stone-800 pb-2">
          <Award className="w-5 h-5 text-amber-400" />
          <h4 className="font-extrabold text-lg text-white">
            Municipios Comprometidos con Zoonosis y Salud Pública
          </h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {municipios.map((muni) => (
            <div
              key={muni.id}
              className="bg-stone-800/80 hover:bg-stone-800 border border-stone-700/80 rounded-2xl p-5 space-y-3 transition-all hover:border-amber-400/50 group"
            >
              <div className="flex items-center gap-4">
                <img
                  src={muni.logo}
                  alt={muni.name}
                  className="w-14 h-14 rounded-2xl object-cover border border-stone-700 shrink-0"
                />
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase font-bold tracking-wider bg-amber-400/20 text-amber-300 px-2 py-0.5 rounded-sm">
                      Huella de Platino
                    </span>
                  </div>
                  <h5 className="font-extrabold text-base text-white truncate group-hover:text-amber-400 transition-colors">
                    {muni.name}
                  </h5>
                  <p className="text-xs text-stone-400">{muni.location}</p>
                </div>
              </div>

              <p className="text-xs text-stone-300 leading-relaxed">
                {muni.description}
              </p>

              <div className="bg-stone-900/90 rounded-xl p-3 border border-stone-800 space-y-1">
                <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider block">
                  Aporte a la comunidad:
                </span>
                <p className="text-xs text-stone-300 font-medium">{muni.supportType}</p>
              </div>

              {muni.benefitForAdopters && (
                <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-950/40 border border-emerald-900/50 p-2.5 rounded-xl">
                  <Gift className="w-4 h-4 shrink-0" />
                  <span>{muni.benefitForAdopters}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Categoría 2: Red de Veterinarias Aliadas & Cuponera para Adoptantes (Oro) */}
      <div id="veterinarias" className="relative z-10 space-y-4">
        <div className="flex items-center justify-between border-b border-stone-800 pb-2">
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-amber-400" />
            <h4 className="font-extrabold text-lg text-white">
              Veterinarias Aliadas con Cuponera para Adoptantes
            </h4>
          </div>
          <span className="text-xs text-amber-400 font-semibold hidden sm:inline">
            Beneficios exclusivos
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {veterinarias.map((vet) => (
            <div
              key={vet.id}
              className="bg-stone-800/60 border border-stone-700/60 rounded-2xl p-5 space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <img
                    src={vet.logo}
                    alt={vet.name}
                    className="w-12 h-12 rounded-xl object-cover border border-stone-700 shrink-0"
                  />
                  <div>
                    <h5 className="font-bold text-sm text-white">{vet.name}</h5>
                    <p className="text-[11px] text-stone-400">{vet.location}</p>
                  </div>
                </div>

                <p className="text-xs text-stone-300">{vet.description}</p>
              </div>

              {/* Cupón destacado */}
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-3 space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-300">
                  <Gift className="w-3.5 h-3.5" />
                  <span>Beneficio al Adoptar:</span>
                </div>
                <p className="text-xs text-stone-200">{vet.benefitForAdopters}</p>
              </div>
            </div>
          ))}

          {/* Tarjeta de invitación para nuevas veterinarias */}
          <div className="bg-gradient-to-br from-stone-800/40 to-amber-950/30 border border-dashed border-stone-700 rounded-2xl p-5 flex flex-col justify-center items-center text-center space-y-3">
            <div className="w-10 h-10 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <Heart className="w-5 h-5" />
            </div>
            <h5 className="font-bold text-sm text-white">¿Tenés una Veterinaria o Pet Shop?</h5>
            <p className="text-xs text-stone-400 max-w-xs">
              Sumate a la red de beneficios. Ganá clientes fieles y apoyá directamente a los refugios de tu zona.
            </p>
            <Link
              href="mailto:alianzas@comunidadmascotera.org?subject=Alianza%20Veterinaria"
              className="bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold text-xs px-4 py-2 rounded-xl transition-colors"
            >
              Sumar mi veterinaria
            </Link>
          </div>
        </div>
      </div>

      {/* CTA Final para patrocinar */}
      <div className="relative z-10 bg-gradient-to-r from-amber-600 to-orange-600 rounded-2xl p-6 text-stone-950 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h4 className="font-black text-lg text-white">
            ¿Representás a un Municipio, Entidad o Empresa en Cuyo?
          </h4>
          <p className="text-xs text-amber-100 mt-1 max-w-xl">
            Integrá tus programas de zoonosis, castraciones o responsabilidad social en nuestro portal con métricas claras y visibilidad ante miles de familias de Mendoza.
          </p>
        </div>
        <Link
          href="mailto:alianzas@comunidadmascotera.org?subject=Propuesta%20Patrocinio"
          className="shrink-0 bg-stone-950 hover:bg-stone-900 text-white font-bold text-xs px-6 py-3 rounded-xl shadow-lg transition-colors text-center"
        >
          Solicitar reunión de alianza
        </Link>
      </div>

    </div>
  );
}
