import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Footer from '../components/Footer';
import { Toaster } from '@/components/ui/sonner';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'PKLDATA BRASIL – Calendário de Torneios de Pickleball',
    template: '%s | PKLDATA BRASIL',
  },
  description:
    'Calendário oficial de torneios de Pickleball no Brasil. Confira agenda, inscrições, resultados e campeonatos chancelados pela Confederação Brasileira e federações filiadas.',
  keywords: [
    'pickleball',
    'pickleball brasil',
    'torneio pickleball',
    'torneios pickleball brasil',
    'campeonato pickleball',
    'calendário pickleball',
    'agenda torneios pickleball',
    'inscrição torneio pickleball',
    'resultados pickleball',
    'confederação brasileira de pickleball',
    'quadra pickleball',
    'jogar pickleball',
    'eventos pickleball brasil',
    'pickleball 2026',
    'campeonato brasileiro pickleball',
  ],
  authors: [{ name: 'PKLDATA BRASIL' }],
  creator: 'PKLDATA BRASIL',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    siteName: 'PKLDATA BRASIL',
    title: 'PKLDATA BRASIL – Calendário de Torneios de Pickleball',
    description:
      'Confira o calendário completo de torneios de Pickleball no Brasil. Agenda, inscrições e resultados dos campeonatos oficiais.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'PKLDATA BRASIL – Calendário de Torneios de Pickleball',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PKLDATA BRASIL – Torneios de Pickleball',
    description:
      'Calendário oficial de torneios de Pickleball no Brasil. Agenda, inscrições e resultados.',
    images: ['/og-image.png'],
  },
  other: {
    'color-scheme': 'light',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="light">
      <head>
        <meta name="color-scheme" content="light" />
      </head>
      <body
        className={`
          ${geistSans.variable}
          ${geistMono.variable}
          antialiased
          bg-white
          text-gray-900
          `}
      >
        {children}
        <Footer />
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
