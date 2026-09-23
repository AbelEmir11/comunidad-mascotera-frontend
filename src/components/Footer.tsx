import Link from 'next/link';
import { Heart, MapPin, Mail, Phone, ShieldCheck, Camera } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-stone-800">
          
          {/* Columna 1: Identidad & Propósito */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-rose-500 flex items-center justify-center text-white">
                <Heart className="w-5 h-5 fill-white" />
              </div>
              <span className="font-extrabold text-xl text-white tracking-tight">
                Comunidad<span className="text-amber-500">Mascotera</span>
              </span>
            </div>
            <p className="text-sm text-stone-400 leading-relaxed">
              Plataforma mendocina dedicada a transformar la adopción responsable, conectar refugios, automatizar el seguimiento con amor y canalizar donaciones 100% directas.
            </p>
            <div className="flex items-center gap-2 text-xs text-amber-400 bg-stone-800/80 px-3 py-1.5 rounded-lg border border-stone-700/60 w-fit">
              <MapPin className="w-3.5 h-3.5" />
              <span>Mendoza, Argentina</span>
            </div>
          </div>

          {/* Columna 2: Navegación Rápida */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 tracking-wider uppercase">
              Para Adoptantes
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/adoptar" className="hover:text-amber-400 transition-colors">
                  Buscar Animales en Adopción
                </Link>
              </li>
              <li>
                <Link href="/adoptar#test-match" className="hover:text-amber-400 transition-colors">
                  Test de Compatibilidad (&quot;Match&quot;)
                </Link>
              </li>
              <li>
                <Link href="/seguimiento" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <span>Álbum de Vida & Medallas</span>
                  <span className="text-[10px] bg-amber-500/20 text-amber-400 px-1.5 py-0.5 rounded-sm">
                    Nuevo
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/zoonosis" className="hover:text-amber-400 transition-colors">
                  Móviles de Castración Gratuita
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 3: Refugios y Colaboración */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 tracking-wider uppercase">
              Comunidad & Refugios
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/refugios" className="hover:text-amber-400 transition-colors">
                  Directorio de Refugios de Mendoza
                </Link>
              </li>
              <li>
                <Link href="/#donaciones" className="hover:text-amber-400 transition-colors">
                  Donaciones sin comisión (Alias directo)
                </Link>
              </li>
              <li>
                <Link href="/patrocinadores" className="hover:text-amber-400 transition-colors">
                  Mural de Patrocinadores & Municipios
                </Link>
              </li>
              <li>
                <Link href="/patrocinadores#veterinarias" className="hover:text-amber-400 transition-colors">
                  Red de Veterinarias Pet-Friendly
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 4: Transparencia y Contacto */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold text-sm mb-4 tracking-wider uppercase">
              Compromiso Ético
            </h4>
            <div className="flex items-start gap-3 bg-stone-800/50 p-3 rounded-xl border border-stone-800">
              <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <p className="text-xs text-stone-400 leading-normal">
                No cobramos comisiones sobre donaciones. El 100% de lo aportado va directo a las cuentas y causas de los refugios.
              </p>
            </div>
            <div className="space-y-2 text-xs text-stone-400">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-pink-400 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                <span>@comunidadmascotera.mza</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-400" />
                <span>hola@comunidadmascotera.org</span>
              </div>
            </div>
          </div>

        </div>

        {/* Barra inferior */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>© 2026 Comunidad Mascotera Mendoza. Hecho con ❤️ para los rescatistas y animales de Cuyo.</p>
          <div className="flex items-center gap-6">
            <Link href="/terminos" className="hover:text-stone-400 transition-colors">
              Términos de Adopción Responsable
            </Link>
            <Link href="/privacidad" className="hover:text-stone-400 transition-colors">
              Privacidad y Protección de Datos
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
