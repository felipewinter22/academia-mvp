"use server";

import { revalidatePath } from "next/cache";
import {
  createCheckin,
  createPagamento,
  deleteCheckin,
  deletePagamento,
} from "@/services/api";

export async function createPagamentoAction(
  alunoId: string,
  formData: FormData,
) {
  const descricao = formData.get("descricao")?.toString().trim();

  await createPagamento({
    alunoId,
    valor: Number(formData.get("valor")),
    descricao: descricao || undefined,
  });

  revalidatePath(`/alunos/${alunoId}`);
}

export async function deletePagamentoAction(alunoId: string, id: string) {
  await deletePagamento(id);
  revalidatePath(`/alunos/${alunoId}`);
}

export async function createCheckinAction(alunoId: string) {
  await createCheckin({ alunoId });
  revalidatePath(`/alunos/${alunoId}`);
}

export async function deleteCheckinAction(alunoId: string, id: string) {
  await deleteCheckin(id);
  revalidatePath(`/alunos/${alunoId}`);
}
