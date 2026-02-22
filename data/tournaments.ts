import { TournamentMonth } from '@/types/tournament';

export const tournaments: TournamentMonth[] = [
  {
    month: 'Janeiro',
    events: [
      {
        id: 'sp-open-jan',
        title: 'SP Open Pickleball',
        level: 500,

        startDate: '2026-01-18',
        endDate: '2026-01-19',

        logo: '/logos/logo-fpp.jpg',
        image: null,

        details: {
          local: 'São Paulo – SP',
          formato: 'Simples e Duplas',
          categorias: 'Open',
          inscricoes: 'Em breve',
        },
      },
    ],
  },

  // {
  //   month: 'Março',
  //   events: [
  //     {
  //       id: 'sp-open-mar',
  //       date: '15–17',
  //       title: 'SP OPEN',
  //       level: 'PKB 750',
  //       logo: '/logos/logo-fpp.jpg',
  //       image: '/tournaments/brasileiro.jpg',
  //       details: {
  //         local: 'A definir',
  //         formato: 'Simples e Duplas',
  //         categorias: 'Open',
  //         inscricoes: 'Em breve',
  //       },
  //     },
  //   ],
  // },

  // {
  //   month: 'Abril',
  //   events: [
  //     {
  //       id: 'liga-transforma',
  //       date: '05–07',
  //       title: 'LIGA TRANSFORMA',
  //       level: 'PKB 500',
  //       logo: '/logos/logo-fpp.jpg',
  //       image: null,
  //       details: {
  //         local: 'A definir',
  //         formato: 'Simples e Duplas',
  //         categorias: 'Open',
  //         inscricoes: 'Em breve',
  //       },
  //     },
  //     {
  //       id: 'copa-federacoes',
  //       date: '05–07',
  //       title: 'COPA DAS FEDERAÇÕES',
  //       level: 'PKB 1000',
  //       logo: '/logos/cbp-logo.jpg',
  //       image: '/tournaments/brasileiro.jpg',
  //       details: {
  //         local: 'A definir',
  //         formato: 'Simples e Duplas',
  //         categorias: 'Open / 35+',
  //         inscricoes: 'Em breve',
  //       },
  //     },
  //   ],
  // },
];
