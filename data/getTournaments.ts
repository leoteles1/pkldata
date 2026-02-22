import { supabase } from '@/lib/supabase';

export async function getTournaments() {
  const { data, error } = await supabase
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
    console.error(error);
    return [];
  }

  return data;
}
