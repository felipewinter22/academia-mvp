// Tipos compartilhados do frontend.
// Serão expandidos conforme as entidades do backend forem consumidas.

export interface Plano {
  id: string;
  nome: string;
  descricao: string | null;
  precoMensal: string;
  _count?: {
    alunos: number;
  };
}

export interface Aluno {
  id: string;
  nome: string;
  email: string;
  telefone: string | null;
  ativo: boolean;
  plano: Plano | null;
}

export interface AlunoInput {
  nome: string;
  email: string;
  telefone?: string;
  ativo?: boolean;
  planoId?: string;
}

export interface PlanoInput {
  nome: string;
  descricao?: string;
  precoMensal: number;
}

export interface AlunoFiltros {
  search?: string;
  planoId?: string;
  ativo?: boolean;
}
