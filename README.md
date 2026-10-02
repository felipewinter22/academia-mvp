# 🏋️ Academia MVP

Sistema web para **gerenciamento de academia** (alunos, planos e futuras funcionalidades como treinos, matrículas e pagamentos).

Projeto desenvolvido para a disciplina **Programação IV** — Ciência da Computação (UNOESC), sob orientação do professor Roberson Junior Fernandes Alves.

> **Status atual:** CRUD de Alunos e Planos completo, com frontend e backend integrados (busca, filtros, ativar/desativar aluno direto na lista e um resumo com os números principais na home). Falta o deploy em produção.

---

## 👥 Time

- João Pedro Pereira Barpp
- Felipe Alfredo Winter
- Mateus Ariel Leising Stock
- Mauricio Bairos

---

## 📝 Descrição do projeto

O **Academia MVP** é uma aplicação para ajudar academias a gerenciar seus alunos e planos de assinatura. Hoje já dá para cadastrar, editar, buscar e remover alunos e planos, vinculando um aluno a um plano e acompanhando quantos alunos cada plano tem.

### Funcionalidades

- CRUD completo de **Alunos** (nome, email, telefone, plano, status ativo/inativo)
- CRUD completo de **Planos** (nome, descrição, preço mensal)
- Busca por nome/email e filtros por plano e status na lista de alunos
- Ativar/desativar aluno com um clique, direto na listagem
- Contagem de alunos por plano e um pequeno resumo (alunos ativos, planos, receita mensal recorrente) na home
- Validação de dados no backend (DTOs) e tratamento de erros comuns (email duplicado, plano inexistente, exclusão de plano com alunos vinculados)

---

## ⚙️ Stack utilizada

| Camada | Tecnologia |
| ------ | ---------- |
| Frontend | [Next.js](https://nextjs.org/) (App Router) + TypeScript + Tailwind CSS |
| Backend | [NestJS](https://nestjs.com/) + TypeScript |
| ORM | [Prisma](https://www.prisma.io/) |
| Banco de dados | PostgreSQL |

Escolhemos a stack sugerida pelo professor (TypeScript no front e no back) para manter consistência entre os membros do time.

---

## 📦 Estrutura do repositório

```
academia-mvp/
├── README.md
├── .gitignore
├── docker-compose.yml       # sobe o PostgreSQL local
├── backend/                 # API (NestJS + Prisma)
│   ├── src/
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── seed.ts
│   └── .env.example
└── frontend/                # Aplicação web (Next.js)
    ├── src/
    │   ├── app/
    │   ├── components/
    │   ├── services/
    │   ├── types/
    │   └── hooks/
    └── .env.example
```

---

## 🚀 Como rodar o projeto

### Pré-requisitos

- Node.js 20+
- Docker (para rodar o PostgreSQL) — ou uma instância própria do PostgreSQL

### 1. Banco de dados

Na raiz do projeto:

```bash
docker compose up -d
```

Isso sobe um PostgreSQL local na porta `5432` (usuário `postgres`, senha `postgres`, banco `academia_db`).

### 2. Backend (API)

```bash
cd backend
npm install
cp .env.example .env
npx prisma migrate dev               # aplica as migrations no banco
npm run start:dev
```

A API sobe em `http://localhost:3001`. Para conferir se está no ar, acesse `http://localhost:3001` — deve retornar um JSON de status.

Comandos úteis do Prisma:

```bash
npx prisma studio        # interface visual do banco
npm run prisma:seed      # roda o seed mínimo (dados de exemplo)
```

### 3. Frontend

Em outro terminal:

```bash
cd frontend
npm install
cp .env.example .env.local
npm run dev
```

A aplicação sobe em `http://localhost:3000`, já consumindo a API do backend.

---

## 🗄️ Banco de dados

- **SGBD escolhido:** PostgreSQL
- **ORM:** Prisma
- **Modelos iniciais** (`backend/prisma/schema.prisma`):
  - `Usuario` — equipe da academia (admin, instrutor, recepção)
  - `Aluno` — alunos matriculados
  - `Plano` — planos de assinatura oferecidos

Esses modelos são o ponto de partida e serão expandidos conforme novas features forem definidas (matrículas, treinos, pagamentos, frequência, etc.).

---

## 🧭 Próximos passos

Ver [Issues do repositório](../../issues) para o detalhamento, entre eles:

- [x] CRUD de Alunos e Planos (backend)
- [x] Telas de listagem, cadastro e edição (frontend)
- [x] Integração frontend ↔ backend
- [x] Busca, filtros e contagem de alunos por plano
- [ ] Deploy (ambiente de produção)
- [ ] Definir autenticação (login da equipe da academia)

---

## 📄 Licença

Projeto acadêmico — uso educacional.
