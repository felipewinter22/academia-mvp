"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createPlano, deletePlano, updatePlano } from "@/services/api";
import type { PlanoInput } from "@/types";

function parseForm(formData: FormData): PlanoInput {
  const descricao = formData.get("descricao")?.toString().trim();

  return {
    nome: formData.get("nome")!.toString().trim(),
    descricao: descricao || undefined,
    precoMensal: Number(formData.get("precoMensal")),
  };
}

export async function createPlanoAction(formData: FormData) {
  try {
    await createPlano(parseForm(formData));
  } catch (error) {
    redirect(`/planos/novo?error=${encodeURIComponent((error as Error).message)}`);
  }

  revalidatePath("/planos");
  redirect("/planos");
}

export async function updatePlanoAction(id: string, formData: FormData) {
  try {
    await updatePlano(id, parseForm(formData));
  } catch (error) {
    redirect(
      `/planos/${id}/editar?error=${encodeURIComponent((error as Error).message)}`,
    );
  }

  revalidatePath("/planos");
  redirect("/planos");
}

export async function deletePlanoAction(id: string) {
  try {
    await deletePlano(id);
  } catch (error) {
    redirect(`/planos?error=${encodeURIComponent((error as Error).message)}`);
  }

  revalidatePath("/planos");
  redirect("/planos");
}
