'use client';

import * as React from "react"
import { Filter, CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { useRouter, useSearchParams } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"

export default function FilterBar() {
    const [open, setOpen] = React.useState(false);

    const router = useRouter();
    const searchParams = useSearchParams();

    const initialFrom = searchParams.get('from');
    const initialTo = searchParams.get('to');

    const [date, setDate] = React.useState<any>({
        from: initialFrom ? new Date(initialFrom) : undefined,
        to: initialTo ? new Date(initialTo) : undefined,
    });

    const handleApply = () => {
        const params = new URLSearchParams(searchParams.toString());
        if (date?.from) {
            params.set('from', date.from.toISOString());
        } else {
            params.delete('from');
        }
        if (date?.to) {
            params.set('to', date.to.toISOString());
        } else {
            params.delete('to');
        }
        router.push(`/?${params.toString()}`);
        setOpen(false);

    }

    const clearFilters = () => {
        setDate(undefined);
        router.push('/');
    }

    return (
        <div className="flex flex-col flex-wrap sm:flex-row items-end gap-4 py-4 w-full bg-slate-50/50 p-4 rounded-xl border border-slate-100 shadow-sm">
            <div className="flex flex-col w-full sm:w-auto gap-2">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Período dos Torneios</span>
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            id="date"
                            variant={"outline"}
                            className={cn(
                                "w-full sm:w-[300px] justify-start text-left font-medium bg-white",
                                !date && "text-muted-foreground"
                            )}
                        >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date?.from ? (
                                date.to ? (
                                    <>
                                        {format(date.from, "dd/MM/yy")} -{" "}
                                        {format(date.to, "dd/MM/yy")}
                                    </>
                                ) : (
                                    format(date.from, "dd/MM/yy")
                                )
                            ) : (
                                <span>Selecione uma data...</span>
                            )}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                            initialFocus
                            mode="range"
                            defaultMonth={date?.from}
                            selected={date}
                            onSelect={setDate}
                            numberOfMonths={2}
                            locale={ptBR}
                            showOutsideDays={false}
                        />
                        <div className="p-3 border-t border-slate-100 flex justify-end">
                            <Button size="sm" onClick={handleApply}>Buscar Torneios</Button>
                        </div>
                    </PopoverContent>
                </Popover>
            </div>

            <div className="sm:ml-auto w-full sm:w-auto flex justify-start sm:justify-end">
                <Button
                    variant="ghost"
                    className="text-slate-500 hover:text-slate-900"
                    onClick={clearFilters}
                >
                    <Filter className="w-4 h-4 mr-2" />
                    Limpar filtros
                </Button>
            </div>
        </div>
    )
}
