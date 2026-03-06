import { TournamentEvent } from '@/types/tournament';
import { TournamentFormData } from '@/lib/schemas/tournamentSchema';
import { getSupabaseAdmin } from '@/lib/supabaseAdmin';
import { mapTournamentFromDatabase } from '@/services/tournaments.mapper';

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

export class TournamentsService {
  static async create(data: TournamentFormData): Promise<TournamentEvent> {
    const { data: tournament, error: tournamentError } = await getSupabaseAdmin
      .from('tournaments')
      .insert([
        {
          title: data.title,
          level: data.level,
          start_date: data.startDate,
          end_date: data.endDate,
          logo: data.logo || null,
          image: data.image || null,
        },
      ])
      .select('*, tournament_details(*)')
      .single();

    if (tournamentError) {
      throw new Error(tournamentError.message);
    }

    const { error: detailsError } = await getSupabaseAdmin
      .from('tournament_details')
      .insert([
        {
          tournament_id: tournament.id,
          local: data.local,
          formato: data.formato,
          categorias: data.categorias,
          inscricoes: data.inscricoes,
        },
      ]);

    if (detailsError) {
      throw new Error(detailsError.message);
    }

    const { data: fullTournament, error: fetchError } = await getSupabaseAdmin
      .from('tournaments')
      .select('*, tournament_details(*)')
      .eq('id', tournament.id)
      .single();

    if (fetchError) {
      throw new Error(fetchError.message);
    }

    return mapTournamentFromDatabase(fullTournament);
  }
}
