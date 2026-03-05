import { z } from "zod";

export const loginSchema = z.object({
    email: z.string().nonempty({ message: "Email é obrigatório" }).email({ message: "Email inválido" }),
    password: z.string().nonempty({ message: "Senha é obrigatória" }).min(6, { message: "Senha deve ter pelo menos 6 caracteres" }),
});