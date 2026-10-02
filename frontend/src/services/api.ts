// Cliente HTTP central para integração com o backend (NestJS).
// A URL virá da variável de ambiente NEXT_PUBLIC_API_URL (ver .env.example).

import type {
  Aluno,
  AlunoFiltros,
  AlunoInput,
  Plano,
  PlanoInput,
} from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

async function extractErrorMessage(response: Response): Promise<string> {
  try {
    const body = await response.json();
    if (Array.isArray(body.message)) return body.message.join(", ");
    if (typeof body.message === "string") return body.message;
  } catch {
    // corpo não é JSON, usa a mensagem genérica abaixo
  }
  return `Erro na API: ${response.status}`;
}

export async function apiFetch(path: string, options?: RequestInit) {
  const response = await fetch(`${API_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    cache: "no-store",
    ...options,
  });

  if (!response.ok) {
    throw new Error(await extractErrorMessage(response));
  }

  return response.json();
}

export function getAlunos(filtros: AlunoFiltros = {}): Promise<Aluno[]> {
  const params = new URLSearchParams();
  if (filtros.search) params.set("search", filtros.search);
  if (filtros.planoId) params.set("planoId", filtros.planoId);
  if (filtros.ativo !== undefined) params.set("ativo", String(filtros.ativo));

  const query = params.toString();
  return apiFetch(`/alunos${query ? `?${query}` : ""}`);
}

export function getAluno(id: string): Promise<Aluno> {
  return apiFetch(`/alunos/${id}`);
}

export function createAluno(data: AlunoInput): Promise<Aluno> {
  return apiFetch("/alunos", { method: "POST", body: JSON.stringify(data) });
}

export function updateAluno(
  id: string,
  data: Partial<AlunoInput>,
): Promise<Aluno> {
  return apiFetch(`/alunos/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}

export function deleteAluno(id: string): Promise<Aluno> {
  return apiFetch(`/alunos/${id}`, { method: "DELETE" });
}

export function getPlanos(): Promise<Plano[]> {
  return apiFetch("/planos");
}

export function getPlano(id: string): Promise<Plano> {
  return apiFetch(`/planos/${id}`);
}

export function createPlano(data: PlanoInput): Promise<Plano> {
  return apiFetch("/planos", { method: "POST", body: JSON.stringify(data) });
}

export function updatePlano(id: string, data: PlanoInput): Promise<Plano> {
  return apiFetch(`/planos/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}

export function deletePlano(id: string): Promise<Plano> {
  return apiFetch(`/planos/${id}`, { method: "DELETE" });
}
