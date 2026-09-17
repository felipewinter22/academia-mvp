import { getAlunos } from "@/services/api";

export const dynamic = "force-dynamic";

export default async function AlunosPage() {
  let alunos: Awaited<ReturnType<typeof getAlunos>> = [];
  let error: string | null = null;

  try {
    alunos = await getAlunos();
  } catch {
    error =
      "Não foi possível carregar os alunos. Verifique se o backend está rodando.";
  }

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-3xl flex-col gap-6 p-8">
      <div>
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
          Alunos
        </h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Alunos matriculados na academia.
        </p>
      </div>

      {error && (
        <p className="rounded-md bg-red-100 px-4 py-3 text-sm text-red-700 dark:bg-red-900/40 dark:text-red-300">
          {error}
        </p>
      )}

      {!error && alunos.length === 0 && (
        <p className="rounded-md bg-zinc-100 px-4 py-3 text-sm text-zinc-600 dark:bg-zinc-900 dark:text-zinc-400">
          Nenhum aluno cadastrado ainda.
        </p>
      )}

      {!error && alunos.length > 0 && (
        <table className="w-full border-collapse overflow-hidden rounded-md border border-zinc-200 text-left text-sm dark:border-zinc-800">
          <thead className="bg-zinc-100 dark:bg-zinc-900">
            <tr>
              <th className="px-4 py-2 font-medium">Nome</th>
              <th className="px-4 py-2 font-medium">Email</th>
              <th className="px-4 py-2 font-medium">Plano</th>
              <th className="px-4 py-2 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {alunos.map((aluno) => (
              <tr
                key={aluno.id}
                className="border-t border-zinc-200 dark:border-zinc-800"
              >
                <td className="px-4 py-2">{aluno.nome}</td>
                <td className="px-4 py-2">{aluno.email}</td>
                <td className="px-4 py-2">{aluno.plano?.nome ?? "—"}</td>
                <td className="px-4 py-2">
                  <span
                    className={
                      aluno.ativo
                        ? "rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300"
                        : "rounded-full bg-zinc-200 px-2 py-0.5 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
                    }
                  >
                    {aluno.ativo ? "Ativo" : "Inativo"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
