# Backend — Academia MVP

API construída com **NestJS + TypeScript + Prisma (PostgreSQL)**.

## Como rodar

```bash
npm install
cp .env.example .env       # ajuste o DATABASE_URL se necessário
npx prisma migrate dev --name init
npm run start:dev
```

A API sobe em `http://localhost:3001`.

## Scripts

- `npm run start:dev` — inicia em modo desenvolvimento (watch)
- `npm run build` — build de produção
- `npm run start:prod` — roda o build de produção
- `npm run lint` — executa o ESLint
- `npm run prisma:generate` — gera o Prisma Client
- `npm run prisma:migrate` — cria/aplica migrations
- `npm run prisma:studio` — abre interface visual do banco
- `npm run prisma:seed` — popula o banco com dados mínimos de exemplo

## Estrutura

```
src/
  app.module.ts
  app.controller.ts
  app.service.ts
  main.ts
  prisma/
    prisma.module.ts   # módulo global do Prisma
    prisma.service.ts  # serviço de conexão com o banco
prisma/
  schema.prisma         # modelos do banco (Usuario, Aluno, Plano)
  seed.ts                # dados iniciais opcionais
```

## Observação

O Prisma Client precisa ser gerado antes de usar o `PrismaService`
(`npx prisma generate`, ou automaticamente ao rodar `npx prisma migrate dev`).
