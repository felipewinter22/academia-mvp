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

export interface Pagamento {
  id: string;
  alunoId: string;
  valor: string;
  descricao: string | null;
  data: string;
  aluno?: {
    nome: string;
  };
}

export interface PagamentoInput {
  alunoId: string;
  valor: number;
  descricao?: string;
}

export interface Checkin {
  id: string;
  alunoId: string;
  dataHora: string;
  aluno?: {
    nome: string;
  };
}

export interface CheckinInput {
  alunoId: string;
}
