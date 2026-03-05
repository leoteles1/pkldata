'use server';

import { Iauth } from '@/interfaces/Iauth';
import { loginSchema } from '@/lib/schemas/loginSchema';
import { AuthService } from '@/services/auth.service';

export async function loginAction(data: Iauth) {
    try {

        const parsedData = loginSchema.safeParse(data);

        if (!parsedData.success) {
            return {
                success: false,
                error: 'Dados de login inválidos.'
            };
        }

        await AuthService.login(parsedData.data);


        return {
            success: true,
            message: 'Login realizado com sucesso.'
        };

    } catch (error: any) {
        return {
            success: false,
            error: error.message || 'Ocorreu um erro inesperado ao fazer login.'
        };
    }
}
