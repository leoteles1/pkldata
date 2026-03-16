'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { tournamentSchema, TournamentFormData } from '@/lib/schemas/tournamentSchema';
import { TournamentEvent } from '@/types/tournament';
import { createTournamentAction } from '@/actions/tournament.action';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from '@/components/ui/dialog';
import {
    Card,
    CardContent,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { LoaderIcon } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface TournamentModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSuccess: (tournament: TournamentEvent) => void;
}

export function TournamentModal({ open, onOpenChange, onSuccess }: TournamentModalProps) {
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        watch,
        formState: { errors },
    } = useForm<TournamentFormData>({
        resolver: zodResolver(tournamentSchema) as any,
        defaultValues: {
            title: '',
            startDate: '',
            endDate: '',
            level: undefined,
            local: '',
            formato: '',
            categorias: '',
            inscricoes: '',
            logo: '',
            image: '',
        },
    });

    async function onSubmit(data: TournamentFormData) {
        setLoading(true);

        try {
            const result = await createTournamentAction(data);

            if (!result.success) {
                toast.error(result.error);
                return;
            }

            toast.success(result.message);
            onSuccess(result.data!);
            reset();
            onOpenChange(false);
        } catch {
            toast.error('Erro inesperado ao criar torneio');
        } finally {
            setLoading(false);
        }
    }

    function handleClose(isOpen: boolean) {
        if (!isOpen) {
            reset();
        }
        onOpenChange(isOpen);
    }

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-xl">
                <DialogHeader>
                    <DialogTitle>Novo Torneio</DialogTitle>
                    <DialogDescription>
                        Preencha os dados para criar um novo torneio.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <Card className="border-0 shadow-none py-0">
                        <CardContent className="space-y-4 px-0">

                            <div className="space-y-2">
                                <Label htmlFor="title">Título do torneio</Label>
                                <Input
                                    id="title"
                                    placeholder="Ex: PKL Open 2026"
                                    {...register('title')}
                                />
                                {errors.title && (
                                    <p className="text-sm text-red-500">{errors.title.message}</p>
                                )}
                            </div>

                            <div className="grid grid-cols-3 gap-3">
                                <div className="space-y-2">
                                    <Label htmlFor="startDate">Início</Label>
                                    <Input
                                        id="startDate"
                                        type="date"
                                        {...register('startDate')}
                                    />
                                    {errors.startDate && (
                                        <p className="text-sm text-red-500">{errors.startDate.message}</p>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="endDate">Fim</Label>
                                    <Input
                                        id="endDate"
                                        type="date"
                                        {...register('endDate')}
                                    />
                                    {errors.endDate && (
                                        <p className="text-sm text-red-500">{errors.endDate.message}</p>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="level">Pontuação</Label>
                                    <Select
                                        value={watch('level')?.toString() || ''}
                                        onValueChange={(value) => setValue('level', Number(value), { shouldValidate: true })}
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Selecione" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="500">500</SelectItem>
                                            <SelectItem value="750">750</SelectItem>
                                            <SelectItem value="1000">1000</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.level && (
                                        <p className="text-sm text-red-500">{errors.level.message}</p>
                                    )}
                                </div>
                            </div>

                            <Separator />

                            {/* Detalhes */}
                            <div className="space-y-2">
                                <Label htmlFor="local">Local</Label>
                                <Input
                                    id="local"
                                    placeholder="Ex: Ginásio Municipal"
                                    {...register('local')}
                                />
                                {errors.local && (
                                    <p className="text-sm text-red-500">{errors.local.message}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="formato">Formato</Label>
                                <Input
                                    id="formato"
                                    placeholder="Ex: Eliminatória simples"
                                    {...register('formato')}
                                />
                                {errors.formato && (
                                    <p className="text-sm text-red-500">{errors.formato.message}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="categorias">Categorias</Label>
                                <Input
                                    id="categorias"
                                    placeholder="Ex: Masculino, Feminino, Misto"
                                    {...register('categorias')}
                                />
                                {errors.categorias && (
                                    <p className="text-sm text-red-500">{errors.categorias.message}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="inscricoes">Inscrições</Label>
                                <Input
                                    id="inscricoes"
                                    placeholder="Ex: Abertas até 10/03"
                                    {...register('inscricoes')}
                                />
                                {errors.inscricoes && (
                                    <p className="text-sm text-red-500">{errors.inscricoes.message}</p>
                                )}
                            </div>

                            <Separator />

                            {/* Imagens */}
                            <div className="grid grid-cols-2 gap-3">
                                <div className="space-y-2">
                                    <Label htmlFor="logo">Logo (opcional)</Label>
                                    <Input
                                        id="logo"
                                        placeholder="URL da logo"
                                        {...register('logo')}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="image">Imagem (opcional)</Label>
                                    <Input
                                        id="image"
                                        placeholder="URL da imagem"
                                        {...register('image')}
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <DialogFooter className="mt-6">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => handleClose(false)}
                            disabled={loading}
                        >
                            Cancelar
                        </Button>
                        <Button type="submit" disabled={loading} className="cursor-pointer">
                            {loading ? (
                                <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />
                            ) : (
                                'Salvar'
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
