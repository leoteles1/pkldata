import { z } from "zod";

export const tournamentSchema = z.object({
    title: z.string().nonempty({ message: "Título é obrigatório" }),
    startDate: z.string().nonempty({ message: "Data de início é obrigatória" }),
    endDate: z.string().nonempty({ message: "Data de fim é obrigatória" }),
    level: z.coerce.number().refine((val) => [500, 750, 1000].includes(val), {
        message: "Selecione uma pontuação válida",
    }),
    local: z.string().nonempty({ message: "Local é obrigatório" }),
    formato: z.string().nonempty({ message: "Formato é obrigatório" }),
    categorias: z.string().nonempty({ message: "Categorias é obrigatório" }),
    inscricoes: z.string().nonempty({ message: "Inscrições é obrigatório" }),
    logo: z.string().optional().default(""),
    image: z.string().optional().default(""),
});

export type TournamentFormData = z.infer<typeof tournamentSchema>;
