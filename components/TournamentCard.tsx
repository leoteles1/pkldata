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
        <div className="relative h-24 sm:h-48 md:block w-full bg-[#0B1221] overflow-hidden flex items-center justify-center">
          <div className="absolute top-2 left-2 sm:top-4 sm:left-4 z-10">
            {logo && (
              <div className="bg-white p-1 rounded-md sm:rounded-lg">
                <img src={logo} alt={title} className="w-6 h-6 sm:w-10 sm:h-10 object-contain" />
              </div>
            )}
          </div>

          <div className="hidden sm:block w-full h-full relative">
            {image ? (
              <Image
                src={image}
                alt={title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-slate-500">
                <Trophy className="w-16 h-16 opacity-30" />
              </div>
            )}
            <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
          </div>
          <div className="sm:hidden px-4 text-center">
            <h4 className="text-sm font-bold text-white leading-tight line-clamp-2">
              {title}
            </h4>
          </div>
        </div>


        <div className="p-4 sm:p-5 flex flex-col flex-1">

          <h4 className="hidden sm:block text-lg font-bold text-slate-900 leading-tight mb-4 group-hover:text-blue-600 transition-colors line-clamp-2">
            {title}
          </h4>

          <div className="flex justify-between items-end gap-2 mt-auto">
            <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-slate-600">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-slate-400 shrink-0" />
                <span className="truncate">{dateString}</span>
              </div>

              <div className="flex items-center gap-1.5 sm:gap-2">
                <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-slate-400 shrink-0" />
                <span className="truncate">{details.local}</span>
              </div>
            </div>

            {level && (
              <Badge variant={badgeVariant as any} className="shadow-lg font-bold text-[10px] sm:text-xs shrink-0">
                {levelDisplay}
              </Badge>
            )}
          </div>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <div
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <div className="relative bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl flex flex-col max-h-[95vh] border border-slate-100">

            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 bg-black/20 hover:bg-black/40 text-white p-2 rounded-full backdrop-blur-md transition-colors z-20"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Cabeçalho com Imagem e Overlay */}
            <div className="relative h-64 sm:h-72 w-full shrink-0 bg-slate-900 overflow-hidden">
              {image ? (
                <Image
                  src={image}
                  alt={title}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-slate-800">
                  <Trophy className="w-20 h-20 text-slate-700 opacity-60" />
                </div>
              )}
              {/* Overlay Gradiente */}
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />



              <div className="absolute bottom-6 left-6 right-6 flex items-center gap-3">
                {logo && (
                  <div className="bg-white p-1 rounded-lg shrink-0">
                    <img src={logo} alt={title} className="w-10 h-10 object-contain" />
                  </div>
                )}
                <h2 className="text-2xl font-bold text-white leading-tight drop-shadow-md">{title}</h2>
              </div>
            </div>

            {/* Conteúdo do Modal */}
            <div className="p-6 md:p-8 overflow-y-auto bg-white">
              <div className="space-y-6">
                {/* Data */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center shrink-0">
                    <Calendar className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-slate-400 font-bold text-[10px] uppercase tracking-wider">Data do Evento</p>
                    <p className="text-slate-900 font-bold text-lg">{dateString}</p>
                  </div>
                </div>

                {/* Localização */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center shrink-0">
                    <MapPin className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-slate-400 font-bold text-[10px] uppercase tracking-wider">Localização</p>
                    <p className="text-slate-900 font-bold text-lg">{details.local}</p>
                  </div>
                </div>

                {/* PKB */}
                {level && (
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center shrink-0">
                      <Trophy className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <p className="text-slate-400 font-bold text-[10px] uppercase tracking-wider">Pontuação PKB</p>
                      <Badge variant={badgeVariant as any} className="shadow-lg font-bold mt-1">
                        {levelDisplay}
                      </Badge>
                    </div>
                  </div>
                )}

                {/* Link do Torneio */}
                <div className="pt-4 border-t border-slate-100">
                  {details.inscricoes?.startsWith('http') ? (
                    <div className="flex items-center gap-2 text-green-600 group/link">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
                      <a
                        href={details.inscricoes}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium hover:underline truncate"
                      >
                        {new URL(details.inscricoes).hostname}
                      </a>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
            <div className="p-6 md:p-8 bg-white shrink-0">
              {details.inscricoes?.startsWith('http') ? (
                <Button
                  asChild
                  className="w-full h-14 text-lg font-bold bg-green-500 hover:bg-green-600 text-white rounded-2xl shadow-lg shadow-green-200"
                >
                  <a href={details.inscricoes} target="_blank" rel="noopener noreferrer">
                    <span className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><polyline points="16 11 18 13 22 9"></polyline></svg>
                      Fazer inscrição
                    </span>
                  </a>
                </Button>
              ) : (
                <Button
                  disabled
                  className="w-full h-14 text-lg font-bold rounded-2xl"
                >
                  Inscrições em breve
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
