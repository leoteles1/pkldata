'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { LoaderIcon } from 'lucide-react';
import { useForm } from "react-hook-form"
import { loginSchema } from '@/lib/schemas/loginSchema';
import { Iauth } from '@/interfaces/Iauth';
import { zodResolver } from "@hookform/resolvers/zod";
import { loginAction } from '@/actions/auth.action';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const { register, handleSubmit, formState: { errors } } = useForm<Iauth>({
    resolver: zodResolver(loginSchema),
  })

  async function handleLogin(data: Iauth) {
    setLoading(true);

    const result = await loginAction(data);

    if (!result.success) {
      toast.error(result.error);
      setLoading(false);
      return;
    }

    setLoading(false);
    toast.success(result.message);
    //setTimeout(() => router.push('/admin'), 1500);
    window.location.href = '/admin';
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Login administrador</CardTitle>
          <CardDescription>
            Insira seu email e senha para acessar
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(handleLogin)}>
            <div className="space-y-4">
              <div>
                <Label>Email</Label>
                <Input
                  type="email"
                  className="mt-2"
                  placeholder="Email"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>
              <div>
                <Label>Senha</Label>
                <Input
                  type="password"
                  placeholder="Senha"
                  className="mt-2"
                  {...register("password")}
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">{errors.password.message}</p>
                )}
              </div>
            </div>
            <CardFooter className="flex justify-center my-4 p-0">
              <CardAction className="w-full">
                <Button className="w-full cursor-pointer" type="submit" disabled={loading}>
                  {loading ? (
                    <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    'Entrar'
                  )}
                </Button>
              </CardAction>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
