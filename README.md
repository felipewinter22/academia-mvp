# 🏋️ Academia MVP

Sistema web para **gerenciamento de academia**: alunos, planos, pagamentos e check-ins.

Projeto desenvolvido para a disciplina **Programação IV** — Ciência da Computação (UNOESC), sob orientação do professor Roberson Junior Fernandes Alves.

> **Status atual:** CRUD de Alunos, Planos, Pagamentos e Check-ins completo, com frontend e backend integrados (busca, filtros, ativar/desativar aluno direto na lista e um resumo com os números principais na home) e aplicação já em produção.

## 🌐 Aplicação no ar

- **Frontend:** https://frontend-two-beta-52.vercel.app
- **Backend (API):** https://academia-mvp.onrender.com

> O backend está no plano free do Render, que "dorme" depois de um tempo sem uso — a primeira requisição depois de um tempo ocioso pode demorar de 30 a 60 segundos pra responder enquanto ele volta a subir.

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
- **Pagamentos**: registro de mensalidades por aluno, com lista global e histórico na página de cada aluno
- **Check-ins**: registro de entrada na academia, com lista global e histórico por aluno
- Página de detalhe do aluno (`/alunos/:id`) reunindo dados, pagamentos e check-ins num só lugar
- Busca por nome/email e filtros por plano e status na lista de alunos
- Ativar/desativar aluno com um clique, direto na listagem
- Contagem de alunos por plano e um pequeno resumo (alunos ativos, planos, receita mensal recorrente) na home
- Validação de dados no backend (DTOs) e tratamento de erros comuns (email duplicado, plano/aluno inexistente, exclusão de plano com alunos vinculados)

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
- **Modelos** (`backend/prisma/schema.prisma`):
  - `Usuario` — equipe da academia (admin, instrutor, recepção)
  - `Aluno` — alunos matriculados
  - `Plano` — planos de assinatura oferecidos
  - `Pagamento` — mensalidades pagas por um aluno
  - `Checkin` — entradas registradas de um aluno na academia

---

## 🧭 Próximos passos

Ver [Issues do repositório](../../issues) para o detalhamento, entre eles:

- [x] CRUD de Alunos e Planos (backend)
- [x] Telas de listagem, cadastro e edição (frontend)
- [x] Integração frontend ↔ backend
- [x] Busca, filtros e contagem de alunos por plano
- [x] Registro de pagamentos e check-ins
- [x] Deploy (Render + Vercel)
- [ ] Definir autenticação (login da equipe da academia)

---

## 💡 Pra onde isso poderia ir

Ideias que não entram nesta entrega, mas fazem sentido como continuação natural do que já existe:

- **Cobrança automática**: hoje o pagamento é lançado manualmente; dava pra integrar com Pix/Mercado Pago/Stripe e gerar a mensalidade sozinho todo mês, já marcando quem está inadimplente
- **Alerta de inadimplência**: listar quem não paga há mais de X dias e avisar a recepção (ou o próprio aluno, por email/WhatsApp)
- **Alerta de aluno sumido**: usando o histórico de check-ins, identificar quem não aparece há semanas — ajuda a academia agir antes do cancelamento
- **Check-in por QR Code/catraca**: hoje é um clique manual na tela; numa academia de verdade isso seria lido automaticamente na entrada
- **App ou área do aluno**: o aluno logar e ver seu próprio histórico de check-ins e pagamentos, sem depender da recepção
- **Login da equipe com permissões**: o modelo `Usuario` já tem os papéis (`ADMIN`, `INSTRUTOR`, `RECEPCAO`) prontos no banco, só falta a autenticação usar isso de fato
- **Relatórios**: receita por mês, frequência média, plano mais popular — os dados já existem, falta uma tela pra cruzar isso
- **Múltiplas unidades**: se a academia crescer e abrir filial, o modelo de dados aguentaria adicionar uma unidade por aluno/check-in sem muita reforma

---

## 📄 Licença

Projeto acadêmico — uso educacional.
