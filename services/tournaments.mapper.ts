import { TournamentEvent } from '@/types/tournament';

type DatabaseTournament = {
  id: string;
  title: string;
  level: number;
  start_date: string;
  end_date: string;
  logo: string | null;
  image: string | null;
  tournament_details: {
    local: string;
    formato: string;
    categorias: string;
    inscricoes: string;
  }[];
};

export function mapTournamentFromDatabase(
  db: DatabaseTournament,
): TournamentEvent {
  return {
    id: db.id,
    title: db.title,
    level: db.level as 500 | 750 | 1000,

    startDate: db.start_date,
    endDate: db.end_date,

    logo: db.logo ?? '',
    image: db.image ?? null,

    details: db.tournament_details[0], // 1:1 relationship
  };
}
