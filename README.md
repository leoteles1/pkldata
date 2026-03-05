# 🏓 PKLDATA BRASIL

Calendário oficial de torneios de Pickleball chancelados pela Confederação Brasileira e federações filiadas.

## Stack

| Tecnologia | Versão |
|---|---|
| **Next.js** | 16.1.6 (Turbopack) |
| **React** | 19.2.3 |
| **TypeScript** | 5.x |
| **Tailwind CSS** | 4.x |
| **Supabase** | Auth + Database |
| **shadcn/ui** | Radix UI + CVA |
| **Zod** | 4.x |
| **React Hook Form** | 7.x |
| **Sonner** | Toast notifications |

## Estrutura do Projeto

```
pkldata/
├── app/
│   ├── page.tsx              # Página pública – calendário de torneios
│   ├── layout.tsx            # Layout root (fontes, Toaster, Footer)
│   ├── globals.css           # Estilos globais (Tailwind)
│   ├── login/
│   │   └── page.tsx          # Tela de login (client component)
│   ├── admin/
│   │   ├── page.tsx          # Página admin (server component)
│   │   └── AdminClient.tsx   # Painel admin – CRUD de torneios
│   └── api/
│       └── tournaments/      # API Route – POST torneios
├── actions/
│   └── auth.action.ts        # Server Action – login
├── services/
│   ├── auth.service.ts       # Autenticação via Supabase (server-side cookies)
│   ├── tournaments.service.ts # Agrupamento de torneios por mês
│   └── tournaments.mapper.ts # Mapper: banco → tipo da aplicação
├── data/
│   ├── getTournaments.ts     # Data access – query Supabase (admin client)
│   └── tournaments.ts        # Dados estáticos de torneios
├── lib/
│   ├── supabase.ts           # Cliente Supabase (anon/público)
│   ├── supabaseAdmin.ts      # Cliente Supabase (service role)
│   ├── utils.ts              # Utilitários (cn)
│   └── schemas/
│       └── loginSchema.ts    # Validação Zod do formulário de login
├── components/
│   ├── Header.tsx            # Cabeçalho com logo
│   ├── Footer.tsx            # Rodapé
│   ├── TournamentCard.tsx    # Card de torneio
│   ├── SponsorsCarousel.tsx  # Carrossel de patrocinadores
│   └── ui/                   # Componentes shadcn (Button, Card, Input, Label, Sonner)
├── interfaces/
│   └── Iauth.ts              # Interface de autenticação
├── types/
│   └── tournament.ts         # Tipos: TournamentEvent, TournamentDetails, TournamentLevel
├── proxy.ts                  # Middleware (Next.js 16) – guard de rotas + refresh de sessão
├── public/                   # Assets estáticos (logos, imagens)
└── .env                      # Variáveis de ambiente
```

## Arquitetura

### Fluxo de Autenticação

```
Login (client) → Server Action → AuthService (createServerClient)
                                       ↓
                              Sessão gravada nos cookies
                                       ↓
                              proxy.ts valida sessão
                                       ↓
                          /admin → permitido | /login → redireciona
```

- O `proxy.ts` atua como middleware do Next.js 16, interceptando rotas `/admin/*` e `/login`
- Sessões são gerenciadas via cookies `HttpOnly` pelo Supabase
- Rotas `/admin` requerem sessão ativa; usuários não autenticados são redirecionados para `/login`
- Usuários autenticados em `/login` são redirecionados para `/admin`

### Camada de Dados

```
Supabase (banco) → getTournaments() → tournaments.mapper → TournamentEvent[]
                                                                  ↓
                                                    tournaments.service (agrupa por mês)
                                                                  ↓
                                                         page.tsx (render)
```

- **`supabaseAdmin.ts`** – Cliente com `SUPABASE_SERVICE_ROLE_KEY` para operações server-side
- **`supabase.ts`** – Cliente público com `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- **`tournaments.mapper.ts`** – Converte snake_case do banco para camelCase da aplicação

### Níveis de Torneio

Os torneios possuem três níveis de pontuação: `500`, `750` e `1000`.

## Variáveis de Ambiente

Crie um arquivo `.env` na raiz com as seguintes variáveis:

```env
# Supabase (público – expostas ao browser)
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-anon-key

# Supabase (privado – apenas server-side)
SUPABASE_URL=https://seu-projeto.supabase.co
SUPABASE_SERVICE_ROLE_KEY=sua-service-role-key
```

## Começando

```bash
# Instalar dependências
npm install

# Rodar em desenvolvimento
npm run dev

# Build de produção
npm run build

# Iniciar produção
npm start
```

O servidor inicia em [http://localhost:3000](http://localhost:3000).

## Rotas

| Rota | Acesso | Descrição |
|---|---|---|
| `/` | Público | Calendário de torneios agrupados por mês |
| `/login` | Público | Página de login (redireciona para `/admin` se autenticado) |
| `/admin` | Protegida | Painel de gerenciamento de torneios |
| `/api/tournaments` | API | Endpoint POST para criar torneios |
