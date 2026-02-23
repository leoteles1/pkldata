import { TournamentEvent } from '@/types/tournament';

export function groupTournamentsByMonth(tournaments: TournamentEvent[]) {
  return tournaments.reduce<Record<string, TournamentEvent[]>>((acc, event) => {
    const date = new Date(event.startDate);

    const month = date.toLocaleString('pt-BR', {
      month: 'long',
    });

    if (!acc[month]) {
      acc[month] = [];
    }

    acc[month].push(event);

    return acc;
  }, {});
}
