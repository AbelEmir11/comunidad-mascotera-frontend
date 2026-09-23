'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Heart, 
  Menu, 
  X, 
  Dog, 
  Building2, 
  Award, 
  HandHeart, 
  Sparkles,
  Syringe
} from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: '/', label: 'Inicio' },
    { href: '/adoptar', label: 'Adoptar', icon: Dog },
    { href: '/refugios', label: 'Refugios', icon: Building2 },
    { href: '/zoonosis', label: 'Móvil Zoonosis', icon: Syringe, badge: 'Gratis' },
    { href: '/seguimiento', label: 'Álbum de Vida', icon: Award, highlight: true },
    { href: '/patrocinadores', label: 'Patrocinadores', icon: Sparkles },
  ];

  const isActive = (href: string) => {
    if (href === '/' && pathname === '/') return true;
    if (href !== '/' && pathname.startsWith(href)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-amber-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <Link 
            href="/" 
            className="flex items-center gap-3 group focus:outline-hidden"
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-amber-500 via-orange-500 to-rose-500 flex items-center justify-center text-white shadow-md shadow-orange-500/20 group-hover:scale-105 transition-transform duration-200">
              <Heart className="w-6 h-6 fill-white text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl tracking-tight text-stone-900">
                  Comunidad<span className="text-amber-600">Mascotera</span>
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded-md">
                  Mendoza
                </span>
              </div>
              <p className="text-xs text-stone-500 hidden sm:block">
                Adopción responsable & Red de refugios
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-medium transition-colors ${
                    active
                      ? 'text-amber-700 bg-amber-50 font-semibold'
                      : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
                  }`}
                >
                  {Icon && <Icon className={`w-4 h-4 ${active ? 'text-amber-600' : 'text-stone-400'}`} />}
                  <span>{link.label}</span>
                  {link.badge && (
                    <span className="bg-emerald-100 text-emerald-700 text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                      {link.badge}
                    </span>
                  )}
                  {link.highlight && (
                    <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Quick Action CTA */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              href="/#donaciones"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold text-sm px-4 py-2.5 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 active:scale-95"
            >
              <HandHeart className="w-4 h-4" />
              <span>Donar directo 🐾</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden items-center gap-2">
            <Link
              href="/#donaciones"
              className="inline-flex items-center gap-1 bg-amber-500 text-white text-xs font-semibold px-3 py-1.5 rounded-lg"
            >
              <HandHeart className="w-3.5 h-3.5" />
              <span>Donar</span>
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl text-stone-600 hover:text-stone-900 hover:bg-stone-100 focus:outline-hidden"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown */}
      {isOpen && (
        <div className="lg:hidden border-t border-stone-100 bg-white px-4 pt-3 pb-6 space-y-2 shadow-xl animate-in slide-in-from-top duration-200">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium ${
                  active
                    ? 'text-amber-700 bg-amber-50 font-bold'
                    : 'text-stone-700 hover:bg-stone-50'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  {Icon && <Icon className={`w-4 h-4 ${active ? 'text-amber-600' : 'text-stone-400'}`} />}
                  <span>{link.label}</span>
                </div>
                {link.badge && (
                  <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-2 py-0.5 rounded-full">
                    {link.badge}
                  </span>
                )}
              </Link>
            );
          })}
          <div className="pt-3 border-t border-stone-100">
            <Link
              href="/#donaciones"
              onClick={() => setIsOpen(false)}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold text-sm py-3 rounded-xl shadow-xs"
            >
              <HandHeart className="w-4 h-4" />
              <span>Donar a los refugios (Sin comisiones)</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
