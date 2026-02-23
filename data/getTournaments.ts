import { getSupabaseAdmin } from '@/lib/supabaseAdmin';
import { mapTournamentFromDatabase } from '@/services/tournaments.mapper';
import { TournamentEvent } from '@/types/tournament';

export async function getTournaments(): Promise<TournamentEvent[]> {
  const { data, error } = await getSupabaseAdmin
    .from('tournaments')
    .select(
      `
      id,
      title,
      level,
      start_date,
      end_date,
      logo,
      image,
      tournament_details (
        local,
        formato,
        categorias,
        inscricoes
      )
    `,
    )
    .order('start_date', { ascending: true });

  if (error) {
    console.error('GET TOURNAMENTS ERROR:', error);
    return [];
  }

  if (!data) return [];

  return data.map(mapTournamentFromDatabase);
}
