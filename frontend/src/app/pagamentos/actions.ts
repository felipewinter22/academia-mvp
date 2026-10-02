"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createPagamento, deletePagamento } from "@/services/api";

export async function createPagamentoAction(formData: FormData) {
  const descricao = formData.get("descricao")?.toString().trim();

  try {
    await createPagamento({
      alunoId: formData.get("alunoId")!.toString(),
      valor: Number(formData.get("valor")),
      descricao: descricao || undefined,
    });
  } catch (error) {
    redirect(
      `/pagamentos/novo?error=${encodeURIComponent((error as Error).message)}`,
    );
  }

  revalidatePath("/pagamentos");
  redirect("/pagamentos");
}

export async function deletePagamentoAction(id: string) {
  await deletePagamento(id);
  revalidatePath("/pagamentos");
}
