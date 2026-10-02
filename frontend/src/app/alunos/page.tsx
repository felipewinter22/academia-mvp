import Link from "next/link";
import { getAlunos, getPlanos } from "@/services/api";
import { DeleteButton } from "@/components/delete-button";
import { deleteAlunoAction, toggleAlunoAtivoAction } from "./actions";

export const dynamic = "force-dynamic";

export default async function AlunosPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; planoId?: string; ativo?: string }>;
}) {
  const { search, planoId, ativo } = await searchParams;

  let alunos: Awaited<ReturnType<typeof getAlunos>> = [];
  let error: string | null = null;

  try {
    alunos = await getAlunos({
      search,
      planoId,
      ativo: ativo ? ativo === "true" : undefined,
    });
  } catch {
    error =
      "Não foi possível carregar os alunos. Verifique se o backend está rodando.";
  }

  const planos = await getPlanos().catch(() => []);

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-3xl flex-col gap-6 p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
            Alunos
          </h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Alunos matriculados na academia.
          </p>
        </div>
        <Link
          href="/alunos/novo"
          className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700"
        >
          + Novo aluno
        </Link>
      </div>

      <form className="flex flex-wrap gap-3 text-sm" method="get">
        <input
          type="search"
          name="search"
          placeholder="Buscar por nome ou email..."
          defaultValue={search}
          className="flex-1 min-w-[200px] rounded-md border border-zinc-300 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-900"
        />
        <select
          name="planoId"
          defaultValue={planoId ?? ""}
          className="rounded-md border border-zinc-300 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-900"
        >
          <option value="">Todos os planos</option>
          {planos.map((plano) => (
            <option key={plano.id} value={plano.id}>
              {plano.nome}
            </option>
          ))}
        </select>
        <select
          name="ativo"
          defaultValue={ativo ?? ""}
          className="rounded-md border border-zinc-300 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-900"
        >
          <option value="">Qualquer status</option>
          <option value="true">Ativos</option>
          <option value="false">Inativos</option>
        </select>
        <button
          type="submit"
          className="rounded-md border border-zinc-300 px-4 py-2 font-medium dark:border-zinc-700"
        >
          Filtrar
        </button>
        {(search || planoId || ativo) && (
          <Link
            href="/alunos"
            className="flex items-center text-zinc-600 hover:underline dark:text-zinc-400"
          >
            Limpar
          </Link>
        )}
      </form>

      {error && (
        <p className="rounded-md bg-red-100 px-4 py-3 text-sm text-red-700 dark:bg-red-900/40 dark:text-red-300">
          {error}
        </p>
      )}

      {!error && alunos.length === 0 && (
        <p className="rounded-md bg-zinc-100 px-4 py-3 text-sm text-zinc-600 dark:bg-zinc-900 dark:text-zinc-400">
          Nenhum aluno encontrado.
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
              <th className="px-4 py-2 font-medium">Ações</th>
            </tr>
          </thead>
          <tbody>
            {alunos.map((aluno) => (
              <tr
                key={aluno.id}
                className="border-t border-zinc-200 dark:border-zinc-800"
              >
                <td className="px-4 py-2">
                  <Link
                    href={`/alunos/${aluno.id}`}
                    className="font-medium hover:underline"
                  >
                    {aluno.nome}
                  </Link>
                </td>
                <td className="px-4 py-2">{aluno.email}</td>
                <td className="px-4 py-2">{aluno.plano?.nome ?? "—"}</td>
                <td className="px-4 py-2">
                  <form
                    action={toggleAlunoAtivoAction.bind(
                      null,
                      aluno.id,
                      aluno.ativo,
                    )}
                  >
                    <button
                      type="submit"
                      title="Clique para alternar o status"
                      className={
                        aluno.ativo
                          ? "rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-700 hover:bg-emerald-200 dark:bg-emerald-900/40 dark:text-emerald-300"
                          : "rounded-full bg-zinc-200 px-2 py-0.5 text-xs font-medium text-zinc-600 hover:bg-zinc-300 dark:bg-zinc-800 dark:text-zinc-400"
                      }
                    >
                      {aluno.ativo ? "Ativo" : "Inativo"}
                    </button>
                  </form>
                </td>
                <td className="px-4 py-2">
                  <div className="flex items-center gap-3">
                    <Link
                      href={`/alunos/${aluno.id}/editar`}
                      className="text-sm font-medium text-emerald-700 hover:underline dark:text-emerald-400"
                    >
                      Editar
                    </Link>
                    <form action={deleteAlunoAction.bind(null, aluno.id)}>
                      <DeleteButton />
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
