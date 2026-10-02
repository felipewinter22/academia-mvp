"use server";

import { revalidatePath } from "next/cache";
import { createCheckin, deleteCheckin } from "@/services/api";

export async function createCheckinAction(formData: FormData) {
  await createCheckin({ alunoId: formData.get("alunoId")!.toString() });
  revalidatePath("/checkins");
}

export async function deleteCheckinAction(id: string) {
  await deleteCheckin(id);
  revalidatePath("/checkins");
}
