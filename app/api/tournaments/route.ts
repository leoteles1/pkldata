import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { title, level, startDate, endDate, logo, image, details } = body;

    // 1️⃣ cria o torneio
    const { data: tournament, error: tournamentError } = await supabaseAdmin
      .from('tournaments')
      .insert([
        {
          title,
          level,
          start_date: startDate,
          end_date: endDate,
          logo: logo ?? null,
          image: image ?? null,
        },
      ])
      .select()
      .single();

    if (tournamentError) {
      console.error('ERRO TOURNAMENT:', tournamentError);
      return NextResponse.json(
        { error: tournamentError.message },
        { status: 400 },
      );
    }

    // 2️⃣ cria os detalhes (tabela separada)
    const { error: detailsError } = await supabaseAdmin
      .from('tournament_details')
      .insert([
        {
          tournament_id: tournament.id,
          local: details.local,
          formato: details.formato,
          categorias: details.categorias,
          inscricoes: details.inscricoes,
        },
      ]);

    if (detailsError) {
      console.error('ERRO DETAILS:', detailsError);
      return NextResponse.json(
        { error: detailsError.message },
        { status: 400 },
      );
    }

    // 3️⃣ retorna o torneio criado
    return NextResponse.json(tournament);
  } catch (err) {
    console.error('ERRO GERAL:', err);
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 });
  }
}
