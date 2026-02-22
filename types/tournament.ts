export interface TournamentDetails {
  local: string;
  formato: string;
  categorias: string;
  inscricoes: string;
}

export type TournamentLevel = 500 | 750 | 1000;

export interface TournamentEvent {
  id: string;
  title: string;
  level: TournamentLevel;

  startDate: string; // yyyy-mm-dd
  endDate: string; // yyyy-mm-dd

  logo: string;
  image?: string | null;

  details: TournamentDetails;
}

export interface TournamentMonth {
  month: string;
  events: TournamentEvent[];
}
