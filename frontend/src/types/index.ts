// Tipos compartilhados do frontend.
// Serão expandidos conforme as entidades do backend forem consumidas.

export interface Plano {
  id: string;
  nome: string;
  descricao: string | null;
  precoMensal: string;
}

export interface Aluno {
  id: string;
  nome: string;
  email: string;
  telefone: string | null;
  ativo: boolean;
  plano: Plano | null;
}
