export const dynamic = 'force-dynamic';

import Header from '../components/Header';
import TournamentCard from '../components/TournamentCard';
import FilterBar from '../components/FilterBar';
import { getTournaments } from '@/data/getTournaments';
import SponsorsCarousel from '../components/SponsorsCarousel';
import { Skeleton } from '@/components/ui/skeleton';

export default async function Home({ searchParams }: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const tournaments = await getTournaments();

  const fromParam = typeof params?.from === 'string' ? params.from : null;
  const toParam = typeof params?.to === 'string' ? params.to : null;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let filteredTournaments = tournaments;

  if (fromParam || toParam) {
    const fromDate = fromParam ? new Date(fromParam) : null;
    const toDate = toParam ? new Date(toParam) : null;

    filteredTournaments = tournaments.filter((event) => {
      const eventStart = new Date(event.startDate);
      const eventEnd = new Date(event.endDate);
      if (fromDate && eventEnd < fromDate) return false;

      if (toDate && eventStart > toDate) return false;

      return true;
    });
  } else {
    filteredTournaments = tournaments.filter((event) => {
      const eventEnd = new Date(event.endDate);
      return eventEnd >= today;
    });
  }

  filteredTournaments.sort(
    (a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
  );

  const groupedTournaments: { month: string; events: typeof tournaments }[] = [];

  filteredTournaments.forEach((event) => {
    // Para garantir que eventos do dia 1 nao recuem pro mes anterior por causa de fuso:
    // Pegando do componente da data (UTC se a data for yyyy-mm-dd puro)
    const eventDate = new Date(event.startDate);
    const monthStr = eventDate.toLocaleDateString('pt-BR', { month: 'long', timeZone: 'UTC' });
    const capitalizedMonth = monthStr.charAt(0).toUpperCase() + monthStr.slice(1);

    const lastGroup = groupedTournaments[groupedTournaments.length - 1];
    if (lastGroup && lastGroup.month === capitalizedMonth) {
      lastGroup.events.push(event);
    } else {
      groupedTournaments.push({ month: capitalizedMonth, events: [event] });
    }
  });

  return (
    <>
      <Header />
      <SponsorsCarousel />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 min-h-screen">
        <div className="text-center pt-10 pb-4 space-y-3">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-slate-600 to-slate-900 drop-shadow-sm">
            O Calendário do{' '}
            <span className="text-slate-500 drop-shadow-sm">Pickleball</span>{' '}
            Brasileiro
          </h1>

          <p className="text-slate-600 text-lg md:text-xl max-w-2xl mx-auto">Torneios oficiais e chancelados da temporada de 2026</p>
        </div>

        <FilterBar />

        <div className="pb-24">
          {filteredTournaments.length === 0 ? (
            <div className="text-center py-20 text-slate-500 bg-white rounded-2xl border border-slate-100 border-dashed">
              <p className="text-lg">Nenhum torneio encontrado para o período selecionado.</p>
            </div>
          ) : (
            <div className="space-y-12">
              {groupedTournaments.map((group) => (
                <div key={group.month} className="space-y-6">
                  <div className="flex items-center gap-4">
                    <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">
                      {group.month}
                    </h2>
                    <div className="h-px bg-slate-200 flex-1"></div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {group.events.map((event) => (
                      <TournamentCard
                        key={event.id}
                        title={event.title}
                        level={event.level}
                        startDate={event.startDate}
                        endDate={event.endDate}
                        logo={event.logo}
                        image={event.image}
                        details={event.details}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
