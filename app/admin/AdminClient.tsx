'use client';

import { useState } from 'react';
import { TournamentEvent } from '@/types/tournament';
import { TournamentModal } from '@/components/tournament-modal';
import { Button } from '@/components/ui/button';

export default function AdminClient({
  tournaments,
}: {
  tournaments: TournamentEvent[];
}) {
  const [list, setList] = useState(tournaments);
  const [showForm, setShowForm] = useState(false);

  function handleTournamentCreated(tournament: TournamentEvent) {
    setList((prev) => [tournament, ...prev]);
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-xl font-bold">Admin – Torneios</h1>

      <Button
        onClick={() => setShowForm(true)}
        className="cursor-pointer"
      >
        Adicionar Torneio
      </Button>

      <TournamentModal
        open={showForm}
        onOpenChange={setShowForm}
        onSuccess={handleTournamentCreated}
      />

      <div className="space-y-2">
        {list.map((t) => (
          <div key={t.id} className="border p-3 rounded">
            <strong>{t.title}</strong>
            <div>
              {t.startDate} → {t.endDate}
            </div>
            <div>Pontuação: {t.level}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
