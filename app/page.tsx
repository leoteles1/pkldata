import Header from './components/Header';
import TournamentCard from './components/TournamentCard';
import { getTournaments } from '@/data/getTournaments';

export default async function Home() {
  const tournaments = await getTournaments();
  const groupedByMonth = tournaments?.reduce((acc: any, event) => {
    const date = new Date(event.start_date);

    const monthYear = date.toLocaleString('pt-BR', {
      month: 'long',
    });

    if (!acc[monthYear]) {
      acc[monthYear] = [];
    }

    acc[monthYear].push(event);

    return acc;
  }, {});

  return (
    <>
      <Header />

      <main className="max-w-3xl mx-auto px-4 space-y-6">
        <h2 className="flex justify-center items-center text-xl font-semibold pt-0 py-6">
          O CALENDÁRIO 2026 DO PICKLEBALL BRASILEIRO
        </h2>

        <div className="space-y-8">
          {groupedByMonth &&
            Object.entries(groupedByMonth).map(([month, events]) => (
              <div key={month} className="space-y-4">
                <h3 className="text-lg font-extrabold tracking-wide">
                  . {month.toUpperCase()}
                </h3>

                {(events as any[]).map((event) => (
                  <TournamentCard
                    key={event.id}
                    title={event.title}
                    level={event.level}
                    startDate={event.start_date}
                    endDate={event.end_date}
                    logo={event.logo}
                    image={event.image}
                    details={event.tournament_details[0]}
                  />
                ))}
              </div>
            ))}
        </div>
      </main>
    </>
  );
}
