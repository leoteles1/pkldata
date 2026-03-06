'use server';

import { TournamentFormData, tournamentSchema } from '@/lib/schemas/tournamentSchema';
import { TournamentsService } from '@/services/tournaments.service';

export async function createTournamentAction(data: TournamentFormData) {
    try {
        const parsedData = tournamentSchema.safeParse(data);

        if (!parsedData.success) {
            return {
                success: false,
                error: 'Dados do torneio inválidos.',
            };
        }

        const tournament = await TournamentsService.create(parsedData.data);

        return {
            success: true,
            data: tournament,
            message: 'Torneio criado com sucesso!',
        };

    } catch (error: any) {
        return {
            success: false,
            error: error.message || 'Ocorreu um erro inesperado ao criar o torneio.',
        };
    }
}
