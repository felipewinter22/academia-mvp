"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createAluno, deleteAluno, updateAluno } from "@/services/api";
import type { AlunoInput } from "@/types";

function parseForm(formData: FormData): AlunoInput {
  const telefone = formData.get("telefone")?.toString().trim();
  const planoId = formData.get("planoId")?.toString().trim();

  return {
    nome: formData.get("nome")!.toString().trim(),
    email: formData.get("email")!.toString().trim(),
    telefone: telefone || undefined,
    planoId: planoId || undefined,
    ativo: formData.get("ativo") === "on",
  };
}

export async function createAlunoAction(formData: FormData) {
  try {
    await createAluno(parseForm(formData));
  } catch (error) {
    redirect(`/alunos/novo?error=${encodeURIComponent((error as Error).message)}`);
  }

  revalidatePath("/alunos");
  redirect("/alunos");
}

export async function updateAlunoAction(id: string, formData: FormData) {
  try {
    await updateAluno(id, parseForm(formData));
  } catch (error) {
    redirect(
      `/alunos/${id}/editar?error=${encodeURIComponent((error as Error).message)}`,
    );
  }

  revalidatePath("/alunos");
  redirect("/alunos");
}

export async function deleteAlunoAction(id: string) {
  await deleteAluno(id);
  revalidatePath("/alunos");
  redirect("/alunos");
}

export async function toggleAlunoAtivoAction(id: string, ativo: boolean) {
  await updateAluno(id, { ativo: !ativo });
  revalidatePath("/alunos");
}
