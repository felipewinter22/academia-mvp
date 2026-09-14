# Issues sugeridas (próximos passos)

Depois de subir o repositório para o GitHub, criem uma Issue para cada item
abaixo (Issues → New issue). Isso atende ao critério "Próximos passos
registrados em Issues" do checklist da atividade.

1. **Definir autenticação** — login da equipe da academia (admin, instrutor, recepção).
2. **CRUD de Alunos (backend)** — endpoints para criar, listar, editar e remover alunos.
3. **CRUD de Planos (backend)** — endpoints para criar, listar, editar e remover planos.
4. **Tela de listagem de Alunos (frontend)** — consumir a API e exibir os alunos cadastrados.
5. **Tela de cadastro/edição de Aluno (frontend)** — formulário de cadastro e edição.
6. **Integração frontend ↔ backend** — configurar `NEXT_PUBLIC_API_URL` e conectar as chamadas via `services/api.ts`.
7. **Validações de dados** — usar `class-validator`/DTOs no backend e validação de formulário no frontend.
8. **Deploy** — definir ambiente de homologação/produção (ex: Vercel para o frontend, Railway/Render para o backend + banco).

> Dica: usem labels como `backend`, `frontend`, `banco de dados` e `documentação`
> para organizar as issues por área.
