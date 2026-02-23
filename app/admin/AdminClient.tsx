'use client';

import { useState } from 'react';
import { TournamentEvent } from '@/types/tournament';

type Tournament = {
  id: string;
  title: string;
  level: number;
  start_date: string;
  end_date: string;
};

export default function AdminClient({
  tournaments,
}: {
  tournaments: TournamentEvent[];
}) {
  const [list, setList] = useState(tournaments);
  const [showForm, setShowForm] = useState(false);

  const [title, setTitle] = useState('');
  const [level, setLevel] = useState<number | ''>('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // detalhes
  const [local, setLocal] = useState('');
  const [formato, setFormato] = useState('');
  const [categorias, setCategorias] = useState('');
  const [inscricoes, setInscricoes] = useState('');

  const [logo, setLogo] = useState('');
  const [image, setImage] = useState('');

  async function handleCreate() {
    const payload = {
      title,
      level: Number(level),
      startDate,
      endDate,
      logo: logo || null,
      image: image || null,
      details: {
        local,
        formato,
        categorias,
        inscricoes,
      },
    };

    const res = await fetch('/api/tournaments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      alert('Erro ao criar torneio');
      return;
    }

    const newTournament = await res.json();
    setList((prev) => [newTournament, ...prev]);
    setShowForm(false);

    // reset
    setTitle('');
    setLevel('');
    setStartDate('');
    setEndDate('');
    setLocal('');
    setFormato('');
    setCategorias('');
    setInscricoes('');
    setLogo('');
    setImage('');
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-xl font-bold">Admin – Torneios</h1>

      <button
        onClick={() => setShowForm(true)}
        className="bg-black text-white px-4 py-2 rounded"
      >
        Novo Torneio
      </button>

      {/* MODAL */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-xl space-y-4">
            <h2 className="text-lg font-bold">Novo Torneio</h2>

            <input
              placeholder="Título do torneio"
              className="border p-2 w-full rounded"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            {/* DATA + DATA + PONTUAÇÃO */}
            <div className="grid grid-cols-3 gap-2">
              <input
                type="date"
                className="border p-2 rounded"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
              <input
                type="date"
                className="border p-2 rounded"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
              <select
                className="border p-2 rounded"
                value={level}
                onChange={(e) =>
                  setLevel(e.target.value === '' ? '' : Number(e.target.value))
                }
              >
                <option value="">Pontuação</option>
                <option value="500">500</option>
                <option value="750">750</option>
                <option value="1000">1000</option>
              </select>
            </div>

            <hr />

            <input
              placeholder="Local"
              className="border p-2 w-full rounded"
              value={local}
              onChange={(e) => setLocal(e.target.value)}
            />

            <input
              placeholder="Formato"
              className="border p-2 w-full rounded"
              value={formato}
              onChange={(e) => setFormato(e.target.value)}
            />

            <input
              placeholder="Categorias"
              className="border p-2 w-full rounded"
              value={categorias}
              onChange={(e) => setCategorias(e.target.value)}
            />

            <input
              placeholder="Inscrições"
              className="border p-2 w-full rounded"
              value={inscricoes}
              onChange={(e) => setInscricoes(e.target.value)}
            />

            <hr />

            <input
              placeholder="Logo (path ou url)"
              className="border p-2 w-full rounded"
              value={logo}
              onChange={(e) => setLogo(e.target.value)}
            />

            <input
              placeholder="Imagem (path ou url)"
              className="border p-2 w-full rounded"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setShowForm(false)}
                className="px-4 py-2 border rounded"
              >
                Cancelar
              </button>
              <button
                onClick={handleCreate}
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* LISTA */}
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
