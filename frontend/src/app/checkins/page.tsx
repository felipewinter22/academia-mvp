import Link from "next/link";
import { getAlunos, getCheckins } from "@/services/api";
import { DeleteButton } from "@/components/delete-button";
import { createCheckinAction, deleteCheckinAction } from "./actions";

export const dynamic = "force-dynamic";

export default async function CheckinsPage() {
  let checkins: Awaited<ReturnType<typeof getCheckins>> = [];
  let error: string | null = null;

  try {
    checkins = await getCheckins();
  } catch {
    error =
      "Não foi possível carregar os check-ins. Verifique se o backend está rodando.";
  }

  const alunos = await getAlunos().catch(() => []);

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-3xl flex-col gap-6 p-8">
      <div>
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
          Check-ins
        </h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Entradas registradas na academia.
        </p>
      </div>

      <form
        action={createCheckinAction}
        className="flex flex-wrap items-end gap-3 text-sm"
      >
        <label className="flex flex-1 min-w-[200px] flex-col gap-1">
          Aluno
          <select
            name="alunoId"
            required
            defaultValue=""
            className="rounded-md border border-zinc-300 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-900"
          >
            <option value="" disabled>
              Selecione um aluno
            </option>
            {alunos.map((aluno) => (
              <option key={aluno.id} value={aluno.id}>
                {aluno.nome}
              </option>
            ))}
          </select>
        </label>
        <button
          type="submit"
          className="rounded-md bg-emerald-600 px-4 py-2 font-medium text-white hover:bg-emerald-700"
        >
          + Registrar check-in
        </button>
      </form>

      {error && (
        <p className="rounded-md bg-red-100 px-4 py-3 text-sm text-red-700 dark:bg-red-900/40 dark:text-red-300">
          {error}
        </p>
      )}

      {!error && checkins.length === 0 && (
        <p className="rounded-md bg-zinc-100 px-4 py-3 text-sm text-zinc-600 dark:bg-zinc-900 dark:text-zinc-400">
          Nenhum check-in registrado ainda.
        </p>
      )}

      {!error && checkins.length > 0 && (
        <table className="w-full border-collapse overflow-hidden rounded-md border border-zinc-200 text-left text-sm dark:border-zinc-800">
          <thead className="bg-zinc-100 dark:bg-zinc-900">
            <tr>
              <th className="px-4 py-2 font-medium">Data e hora</th>
              <th className="px-4 py-2 font-medium">Aluno</th>
              <th className="px-4 py-2 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {checkins.map((checkin) => (
              <tr
                key={checkin.id}
                className="border-t border-zinc-200 dark:border-zinc-800"
              >
                <td className="px-4 py-2">
                  {new Date(checkin.dataHora).toLocaleString("pt-BR")}
                </td>
                <td className="px-4 py-2">
                  <Link
                    href={`/alunos/${checkin.alunoId}`}
                    className="hover:underline"
                  >
                    {checkin.aluno?.nome ?? "—"}
                  </Link>
                </td>
                <td className="px-4 py-2">
                  <form action={deleteCheckinAction.bind(null, checkin.id)}>
                    <DeleteButton />
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
