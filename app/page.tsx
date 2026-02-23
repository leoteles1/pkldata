export const dynamic = 'force-dynamic';

import Header from './components/Header';
import TournamentCard from './components/TournamentCard';
import { getTournaments } from '@/data/getTournaments';
import { groupTournamentsByMonth } from '@/services/tournaments.service';

export default async function Home() {
  const tournaments = await getTournaments();
  const groupedByMonth = groupTournamentsByMonth(tournaments);

  return (
    <>
      <Header />

      <main className="max-w-5xl mx-auto px-6 space-y-12 min-h-screen bg-neutral-200">
        <div className="text-center pt-0 pb-10 space-y-2">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            O Calendário do Pickleball Brasileiro
          </h1>

          <p className="text-gray-600 text-lg">Torneios oficiais 2026</p>
        </div>

        <div className="space-y-8">
          {groupedByMonth &&
            Object.entries(groupedByMonth).map(([month, events]) => (
              <div key={month} className="space-y-4">
                <h3 className="text-2xl font-bold tracking-wide inline-block pb-1">
                  {month.toUpperCase()}
                </h3>

                {(events as any[]).map((event) => (
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
            ))}
        </div>
      </main>
    </>
  );
}
