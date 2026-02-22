'use client';

import { useState } from 'react';
import { TournamentLevel } from '@/types/tournament';

interface TournamentCardProps {
  title: string;
  level: TournamentLevel;
  logo?: string;
  image?: string | null;
  startDate: string;
  endDate: string;
  details: {
    local: string;
    formato: string;
    categorias: string;
    inscricoes: string;
  };
}

const levelColors: Record<string, string> = {
  1000: 'bg-red-600 text-white',
  750: 'bg-blue-600 text-white',
  500: 'bg-orange-500 text-white',
};

export default function TournamentCard({
  startDate,
  endDate,
  title,
  level,
  image,
  logo,
  details,
}: TournamentCardProps) {
  const [open, setOpen] = useState(false);
  const start = new Date(startDate);
  const end = new Date(endDate);

  const dayStart = String(start.getDate()).padStart(2, '0');
  const dayEnd = String(end.getDate()).padStart(2, '0');

  const monthLabel = start
    .toLocaleDateString('pt-BR', { month: 'short' })
    .toUpperCase();

  return (
    <>
      {/* CARD */}
      <div
        onClick={() => setOpen(true)}
        className="cursor-pointer border rounded-xl p-4 bg-white flex items-center gap-4 hover:shadow-md transition"
      >
        {/* DATA */}
        <div className="flex flex-col items-center justify-center text-center">
          <span className="text-lg font-bold leading-none">
            {dayStart}–{dayEnd}
          </span>
        </div>

        {/* LOGO */}
        {logo && (
          <img src={logo} alt={title} className="w-10 h-10 object-contain" />
        )}

        {/* LINHA */}
        <div className="h-10 w-px bg-gray-300" />

        {/* TÍTULO */}
        <div className="flex-1">
          <div className="font-semibold">{title}</div>
        </div>

        {/* PONTUAÇÃO */}
        <span
          className={`text-xs font-bold px-3 py-1 rounded-full ${
            levelColors[level]
          }`}
        >
          PKB {level}
        </span>
      </div>

      {/* MODAL */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="bg-white rounded-xl p-6 w-[90%] max-w-md">
            {/* HEADER */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                {logo && (
                  <img
                    src={logo}
                    alt={title}
                    className="w-10 h-10 object-contain"
                  />
                )}

                <h2 className="text-lg font-bold leading-tight">{title}</h2>
              </div>

              {/* PONTUAÇÃO */}
              <span
                className={`text-xs text-white px-3 py-1 rounded-full ${
                  levelColors[level]
                }`}
              >
                PKB {level}
              </span>
            </div>

            {/* LINHA */}
            <div className="h-px bg-gray-200 mb-4" />

            {/* IMAGEM */}
            {image && (
              <img
                src={image}
                alt={title}
                className="w-full h-auto object-contain mb-4"
              />
            )}

            {/* INFOS */}
            <div className="space-y-2 text-sm text-gray-700">
              <p>
                <strong>Local:</strong> {details.local}
              </p>
              <p>
                <strong>Formato:</strong> {details.formato}
              </p>
              <p>
                <strong>Categorias:</strong> {details.categorias}
              </p>
              <p>
                <strong>Inscrições:</strong> {details.inscricoes}
              </p>
            </div>

            <button
              onClick={() => setOpen(false)}
              className="mt-6 w-full rounded-lg bg-gray-900 text-white py-2"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </>
  );
}
