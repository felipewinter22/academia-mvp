# 🏋️ Academia MVP

Sistema web para **gerenciamento de academia** (alunos, planos e futuras funcionalidades como treinos, matrículas e pagamentos).

Projeto desenvolvido para a disciplina **Programação IV** — Ciência da Computação (UNOESC), sob orientação do professor Roberson Junior Fernandes Alves.

> **Status atual:** Kickoff estrutural do MVP. Front e back ainda **não estão integrados** — cada um roda de forma independente nesta etapa, conforme orientação da atividade.

---

## 👥 Time

- João Pedro
- Felipe
- Matheus
- Mauricio

---

## 📝 Descrição do projeto

O **Academia MVP** é uma aplicação para ajudar academias a gerenciar seus alunos e planos de assinatura. Nesta primeira entrega, o foco é puramente estrutural: organização do repositório, esqueleto do backend e do frontend, e configuração do banco de dados com as primeiras migrations.

Funcionalidades (features) e a integração entre front e back serão implementadas nas próximas etapas.

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
npx prisma migrate dev --name init   # cria as tabelas iniciais no banco
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

A aplicação sobe em `http://localhost:3000`.

> ⚠️ Nesta etapa, o frontend **não consome** a API ainda — cada parte roda isoladamente. A integração será feita nas próximas atividades.

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

- [ ] Definir autenticação (login da equipe da academia)
- [ ] CRUD de Alunos (backend)
- [ ] CRUD de Planos (backend)
- [ ] Telas de listagem e cadastro de Alunos (frontend)
- [ ] Integração frontend ↔ backend
- [ ] Deploy (ambiente de homologação)

---

## 📄 Licença

Projeto acadêmico — uso educacional.
