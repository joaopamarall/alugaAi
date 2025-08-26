# Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

---

# Notas de integração com o backend

- Endpoints esperados (sugestão):
- GET /equipamentos → Equipment[]
- POST /equipamentos {nome, codigo?, descricao?, status}
- PUT /equipamentos/:id {patch}
- GET /reservas → Reserva[]
- POST /reservas {equipamentoId, responsavel, inicio, fim, observacoes?}
- POST /reservas/:id/concluir
- O frontend usa ofetch; configure CORS no backend.
- Datas ISO (UTC) para evitar ambiguidade; formatamos no front com dayjs.

---

# Ideias futuras (rápidas)

- Calendário mensal de reservas (ex.: vue-cal ou fullcalendar) — pode ser adicionado depois.
- Regras de conflito: bloquear reserva se intervalo se sobrepõe a outra do mesmo equipamento.
- Papel de usuário (admin x comum) e autenticação.
- Exportar relatório (CSV/PDF) das reservas.
