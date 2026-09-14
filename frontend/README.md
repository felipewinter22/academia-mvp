# Frontend — Academia MVP

Aplicação frontend construída com **Next.js (App Router) + TypeScript + Tailwind CSS**.

## Como rodar

```bash
npm install
cp .env.example .env.local
npm run dev
```

A aplicação sobe em `http://localhost:3000`.

## Scripts

- `npm run dev` — inicia em modo desenvolvimento
- `npm run build` — build de produção
- `npm run start` — roda o build de produção
- `npm run lint` — executa o ESLint

## Estrutura

```
src/
  app/         # rotas (App Router)
  components/  # componentes reutilizáveis
  services/    # integração com a API (backend)
  types/       # tipos TypeScript compartilhados
  hooks/       # hooks customizados
```
