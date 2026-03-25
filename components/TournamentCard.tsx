'use client';

import { useState } from 'react';
import { TournamentLevel } from '@/types/tournament';
import { Calendar, MapPin, X, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
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

  const monthStartBase = monthStart.replace('.', '').toUpperCase();
  const monthLetters = monthStartBase.slice(0, 3).padEnd(3, ' ').split('');

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
    <Dialog open={open} onOpenChange={setOpen}>
      <div
        onClick={() => setOpen(true)}
        className="group bg-white rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden cursor-pointer h-full border border-slate-100 flex flex-col"
      >
        {/* ======= MOBILE VIEW ======= */}
        <div className="sm:hidden flex items-center justify-between w-full px-3 py-4 gap-2">

          <div className="flex items-center gap-3 shrink-0">
            {/* DATE */}
            <div className="flex items-center gap-1.5">
              <div className="flex flex-col items-center justify-center text-[15px] font-black leading-none text-slate-800 tracking-wide">
                <span>{monthLetters[0]}</span>
                <span>{monthLetters[1]}</span>
                <span>{monthLetters[2]}</span>
              </div>
              <div className="flex flex-col items-center justify-center text-[13px] font-semibold leading-[1.1] text-slate-600 gap-0.5">
                <span>{dayStart}</span>
                <span className="text-[10px] lowercase text-slate-400">a</span>
                <span>{dayEnd}</span>
              </div>
            </div>

            {/* FEDERATION LOGO */}
            {logo && (
              <div className="w-11 h-11 flex items-center justify-center shrink-0">
                <img src={logo} alt="Logo" className="max-w-full max-h-full object-contain" />
              </div>
            )}
          </div>

          {/* VERTICAL DIVIDER */}
          <div className="w-px h-10 bg-slate-300 mx-1 shrink-0"></div>

          {/* TITLE */}
          <div className="flex-1 flex items-center min-w-0 pr-1">
            <h4 className="text-[1.35rem] font-black uppercase text-slate-900 leading-none line-clamp-2">
              {title}
            </h4>
          </div>

          {/* BADGE */}
          {level && (
            <div className="shrink-0 p-1 border border-slate-200 rounded-xl flex items-center justify-center w-11 h-11">
              <img
                src={`/badges/pkb-${level}.png`}
                alt={`PKB ${level}`}
                className="max-w-full max-h-full object-contain"
              />
            </div>
          )}
        </div>

        {/* ======= DESKTOP VIEW ======= */}
        <div className="hidden sm:flex flex-col w-full h-full">
          <div className="relative h-48 w-full bg-[#0B1221] overflow-hidden flex items-center justify-center shrink-0">
            <div className="absolute top-4 left-4 z-10">
              {logo && (
                <div className="bg-white p-1 rounded-lg">
                  <img src={logo} alt={title} className="w-10 h-10 object-contain" />
                </div>
              )}
            </div>

            <div className="w-full h-full relative">
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
          </div>

          <div className="p-5 flex flex-col flex-1">
            <h4 className="text-lg font-bold text-slate-900 leading-tight mb-4 group-hover:text-blue-600 transition-colors line-clamp-2">
              {title}
            </h4>

            <div className="flex justify-between items-end gap-2 mt-auto">
              <div className="space-y-2 text-sm text-slate-600">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
                  <span className="truncate">{dateString}</span>
                </div>

                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                  <span className="truncate">{details.local}</span>
                </div>
              </div>

              {level && (
                <span className="px-2 py-1">
                  <img
                    src={`/badges/pkb-${level}.png`}
                    alt={`PKB ${level}`}
                    className="h-6 w-auto"
                  />
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      <DialogContent className="max-w-md w-screen sm:w-[500px] p-0 overflow-hidden rounded-t-3xl sm:rounded-3xl border-none shadow-2xl bg-white flex flex-col mt-auto h-[90vh] sm:h-[70vh] sm:mt-0">
        <DialogHeader className="sr-only">
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <button
          onClick={() => setOpen(false)}
          className="absolute top-4 right-4 z-50 p-2 bg-black/20 hover:bg-black/40 backdrop-blur-md rounded-full text-white transition-colors"
        >
          <X className="w-5 h-5" />
          <span className="sr-only">Close</span>
        </button>

        {/* Banner Area */}
        <div className="relative h-64 sm:h-[45%] w-full shrink-0 bg-slate-100 flex items-center justify-center">
          {image ? (
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover"
            />
          ) : (
            <div className="text-4xl font-black text-slate-300 tracking-widest uppercase">
              Imagem
            </div>
          )}
        </div>

        {/* Info Bar */}
        <div className="px-6 py-5 flex items-center justify-between border-b border-slate-100 shrink-0 bg-white">
          {/* Logo */}
          <div className="shrink-0 w-16 h-16 p-1.5 rounded-xl border border-slate-200 flex items-center justify-center bg-white shadow-sm">
            {logo ? (
              <img src={logo} alt="Logo" className="max-w-full max-h-full object-contain" />
            ) : (
              <Trophy className="w-6 h-6 text-slate-300" />
            )}
          </div>

          {/* Title */}
          <div className="flex-1 px-4 text-center">
            <h2 className="text-[1.35rem] sm:text-2xl font-black text-slate-800 leading-tight uppercase line-clamp-2">
              {title}
            </h2>
          </div>

          {level ? (
            <img
              src={`/badges/pkb-${level}.png`}
              alt={`PKB ${level}`}
              className="max-w-full max-h-full object-contain"
            />

          ) : (
            <span className="text-xs font-bold text-slate-400">Reg</span>
          )}

        </div>

        <div className="p-4 md:p-8 bg-white flex-1 relative border-b border-slate-100">
          <div className="grid grid-cols-2 gap-4 w-full">
            <div className="flex flex-col items-start gap-2">
              <div className="flex items-center gap-2">
                <div className="w-12 h-12 rounded-lg border border-green-100 flex items-center justify-center shrink-0">
                  <Calendar className="w-6 h-6 text-green-500" />
                </div>
                <span className="text-[14px] sm:text-[18px] font-bold text-slate-800">
                  {dateString}
                </span>
              </div>
            </div>

            <div className="flex flex-col items-start gap-2">
              <div className="flex items-center gap-2">
                <div className="w-12 h-12 rounded-lg border border-green-100 flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6 text-green-500" />
                </div>
                <span className="text-[14px] sm:text-[18px] font-bold text-slate-800">
                  {details.local}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 md:p-8 pt-2 bg-white shrink-0 mt-auto">
          {details.inscricoes?.startsWith('http') ? (
            <Button
              asChild
              variant="outline"
              className="w-full h-14 text-xl font-bold uppercase bg-green-500 text-white  border-2 border-slate-200 hover:bg-green-600 hover:text-white flex items-center justify-center rounded-xl"
            >
              <a href={details.inscricoes} target="_blank" rel="noopener noreferrer">
                Inscrição
              </a>
            </Button>
          ) : (
            <Button
              disabled
              variant="outline"
              className="w-full h-14 text-xl font-black uppercase text-slate-400 border-2 border-slate-100 rounded-xl bg-white"
            >
              Em breve
            </Button>
          )}
        </div>

      </DialogContent>
    </Dialog>
  );
}
