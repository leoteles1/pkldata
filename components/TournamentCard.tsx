'use client';

import { useState } from 'react';
import { TournamentLevel } from '@/types/tournament';
import { Calendar, MapPin, X, Trophy } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

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

export default function TournamentCard({
  startDate,
  endDate,
  title,
  level,
  logo,
  image,
  details,
}: TournamentCardProps) {
  const [open, setOpen] = useState(false);
  const start = new Date(startDate);
  const end = new Date(endDate);

  const dayStart = String(start.getDate()).padStart(2, '0');
  const dayEnd = String(end.getDate()).padStart(2, '0');
  const monthStart = start.toLocaleDateString('pt-BR', { month: 'short' });
  const monthEnd = end.toLocaleDateString('pt-BR', { month: 'short' });

  const dateString =
    start.getMonth() === end.getMonth()
      ? `${dayStart} a ${dayEnd} ${monthStart}`
      : `${dayStart} ${monthStart} a ${dayEnd} ${monthEnd}`;

  // Default placeholder is handled safely inside the markup using Trophy

  const badgeVariant =
    level === 1000 ? '1000' :
      level === 750 ? '750' :
        level === 500 ? '500' : 'regional';

  const levelDisplay = level === 1000 || level === 750 || level === 500 ? `PKB ${level}` : 'Regional';

  return (
    <>
      <div
        onClick={() => setOpen(true)}
        className="group bg-white rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden cursor-pointer h-full border border-slate-100"
      >
        <div className="relative h-32 sm:h-48 hidden md:block w-full bg-slate-100 overflow-hidden flex items-center justify-center">
          {image ? (
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full bg-slate-800 flex items-center justify-center text-slate-500">
              <Trophy className="w-12 h-12 sm:w-16 sm:h-16 opacity-30" />
            </div>
          )}
          <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />

          <div className="absolute bottom-2 left-2 right-2 sm:bottom-4 sm:left-4 sm:right-4 flex justify-between items-end">
            {logo && (
              <div className="bg-white p-1 rounded-md sm:rounded-lg">
                <img src={logo} alt={title} className="w-6 h-6 sm:w-10 sm:h-10 object-contain" />
              </div>
            )}
            {level && (
              <Badge variant={badgeVariant as any} className="shadow-lg font-bold text-[10px] sm:text-xs">
                {levelDisplay}
              </Badge>
            )}
          </div>
        </div>

        <div className="p-3 sm:p-5 flex flex-col flex-1">
          <h4 className="text-sm sm:text-lg font-bold text-slate-900 leading-tight mb-2 sm:mb-4 group-hover:text-blue-600 transition-colors line-clamp-2">
            {title}
          </h4>

          <div className="mt-auto space-y-1 sm:space-y-2 text-xs sm:text-sm text-slate-600">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-slate-400 shrink-0" />
              <span className="truncate">{dateString}</span>
            </div>

            <div className="flex items-center gap-1.5 sm:gap-2">
              <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-slate-400 shrink-0" />
              <span className="truncate">{details.local}</span>
            </div>
          </div>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <div
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <div className="relative bg-white rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">

            <div className="relative h-56 sm:h-72 w-full shrink-0 bg-slate-900 border-b border-white/10 overflow-hidden flex items-center justify-center">
              {image ? (
                <Image
                  src={image}
                  alt={title}
                  fill
                  className="object-contain object-center scale-95"
                />
              ) : (
                <Trophy className="w-20 h-20 sm:w-28 sm:h-28 text-slate-700 opacity-60" />
              )}
              <button
                onClick={() => setOpen(false)}
                className="absolute top-4 right-4 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full backdrop-blur-md transition-colors blur-0 z-10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 md:p-8 overflow-y-auto">

              <div className="flex items-start justify-between gap-4 mb-6">
                <div className="flex items-center gap-3">
                  {logo && (
                    <img src={logo} alt={title} className="w-12 h-12 object-contain" />
                  )}
                  <h2 className="text-2xl font-extrabold text-slate-900 leading-tight">{title}</h2>
                </div>
                {level && (
                  <Badge variant={badgeVariant as any} className="text-sm px-3 py-1 mt-1 shrink-0">
                    {levelDisplay}
                  </Badge>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6 mb-8 text-sm">
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-slate-500 font-medium text-xs uppercase tracking-wider mb-0.5">Data</p>
                    <p className="text-slate-900 font-semibold">{dateString}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-slate-500 font-medium text-xs uppercase tracking-wider mb-0.5">Local</p>
                    <p className="text-slate-900 font-medium">{details.local}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Trophy className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                  <div className="space-y-3 w-full">
                    <div>
                      <p className="text-slate-500 font-medium text-xs uppercase tracking-wider mb-0.5">Formato</p>
                      <p className="text-slate-900">{details.formato}</p>
                    </div>

                    <div>
                      <p className="text-slate-500 font-medium text-xs uppercase tracking-wider mb-0.5">Categorias</p>
                      <p className="text-slate-900">{details.categorias}</p>
                    </div>

                    <div>
                      <p className="text-slate-500 font-medium text-xs uppercase tracking-wider mb-0.5">Link do Torneio</p>
                      {details.inscricoes?.startsWith('http') ? (
                        <a
                          href={details.inscricoes}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 underline truncate block max-w-full"
                        >
                          {details.inscricoes}
                        </a>
                      ) : (
                        <p className="text-slate-900">{details.inscricoes || 'Não disponível'}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-slate-100 bg-slate-50 flex flex-col sm:flex-row gap-3 shrink-0">
              {details.inscricoes?.startsWith('http') ? (
                <Button
                  asChild
                  className="w-full sm:flex-1 h-12 text-base font-semibold bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <a href={details.inscricoes} target="_blank" rel="noopener noreferrer">
                    Fazer inscrição
                  </a>
                </Button>
              ) : (
                <Button
                  disabled
                  className="w-full sm:flex-1 h-12 text-base"
                >
                  Inscrições em breve
                </Button>
              )}

              <Button
                variant="outline"
                onClick={() => setOpen(false)}
                className="w-full sm:w-auto h-12 px-8"
              >
                Fechar
              </Button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
