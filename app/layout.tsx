import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'PKLDATA BRASIL',
  description:
    'Calendário oficial de torneios de Pickleball chancelados pela Confederação Brasileira e federações filiadas.',
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
      </body>
    </html>
  );
}
