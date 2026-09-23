import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Comunidad Mascotera Mendoza | Adopción Responsable, Refugios y Zoonosis',
  description: 'Plataforma comunitaria de Mendoza para adopción responsable con seguimiento didáctico (Álbum de Vida), donaciones directas sin comisiones y móviles de Zoonosis.',
  keywords: [
    'adopcion responsable mendoza',
    'refugios mendoza',
    'perros en adopcion mendoza',
    'gatos en adopcion',
    'zoonosis godoy cruz',
    'castraciones gratis mendoza',
    'patitas pedemonte',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-stone-50 text-stone-900 selection:bg-amber-200 selection:text-amber-900">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
