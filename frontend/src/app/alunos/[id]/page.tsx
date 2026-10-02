import Link from "next/link";
import { getAluno, getCheckins, getPagamentos } from "@/services/api";
import { DeleteButton } from "@/components/delete-button";
import {
  createCheckinAction,
  createPagamentoAction,
  deleteCheckinAction,
  deletePagamentoAction,
} from "./actions";

export const dynamic = "force-dynamic";

export default async function AlunoDetalhePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [aluno, pagamentos, checkins] = await Promise.all([
    getAluno(id),
    getPagamentos(id),
    getCheckins(id),
  ]);

  const addPagamento = createPagamentoAction.bind(null, id);
  const addCheckin = createCheckinAction.bind(null, id);

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-3xl flex-col gap-8 p-8">
      <Link
        href="/alunos"
        className="text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
      >
        ← Voltar
      </Link>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
            {aluno.nome}
          </h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            {aluno.email}
            {aluno.telefone ? ` · ${aluno.telefone}` : ""} ·{" "}
            {aluno.plano?.nome ?? "Sem plano"} ·{" "}
            {aluno.ativo ? "Ativo" : "Inativo"}
          </p>
        </div>
        <Link
          href={`/alunos/${aluno.id}/editar`}
          className="rounded-md border border-zinc-300 px-4 py-2 text-sm font-medium dark:border-zinc-700"
        >
          Editar aluno
        </Link>
      </div>

      <section className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            Pagamentos
          </h2>
        </div>

        <form
          action={addPagamento}
          className="flex flex-wrap items-end gap-3 text-sm"
        >
          <label className="flex flex-col gap-1">
            Valor (R$)
            <input
              name="valor"
              type="number"
              step="0.01"
              min="0"
              required
              className="rounded-md border border-zinc-300 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-900"
            />
          </label>
          <label className="flex flex-1 min-w-[180px] flex-col gap-1">
            Descrição
            <input
              name="descricao"
              placeholder="Ex: Mensalidade de outubro"
              className="rounded-md border border-zinc-300 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-900"
            />
          </label>
          <button
            type="submit"
            className="rounded-md bg-emerald-600 px-4 py-2 font-medium text-white hover:bg-emerald-700"
          >
            Registrar
          </button>
        </form>

        {pagamentos.length === 0 ? (
          <p className="rounded-md bg-zinc-100 px-4 py-3 text-sm text-zinc-600 dark:bg-zinc-900 dark:text-zinc-400">
            Nenhum pagamento registrado ainda.
          </p>
        ) : (
          <table className="w-full border-collapse overflow-hidden rounded-md border border-zinc-200 text-left text-sm dark:border-zinc-800">
            <thead className="bg-zinc-100 dark:bg-zinc-900">
              <tr>
                <th className="px-4 py-2 font-medium">Data</th>
                <th className="px-4 py-2 font-medium">Valor</th>
                <th className="px-4 py-2 font-medium">Descrição</th>
                <th className="px-4 py-2 font-medium"></th>
              </tr>
            </thead>
            <tbody>
              {pagamentos.map((pagamento) => (
                <tr
                  key={pagamento.id}
                  className="border-t border-zinc-200 dark:border-zinc-800"
                >
                  <td className="px-4 py-2">
                    {new Date(pagamento.data).toLocaleDateString("pt-BR")}
                  </td>
                  <td className="px-4 py-2">
                    {Number(pagamento.valor).toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </td>
                  <td className="px-4 py-2">{pagamento.descricao ?? "—"}</td>
                  <td className="px-4 py-2">
                    <form
                      action={deletePagamentoAction.bind(
                        null,
                        id,
                        pagamento.id,
                      )}
                    >
                      <DeleteButton />
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      <section className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            Check-ins
          </h2>
          <form action={addCheckin}>
            <button
              type="submit"
              className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700"
            >
              + Registrar check-in
            </button>
          </form>
        </div>

        {checkins.length === 0 ? (
          <p className="rounded-md bg-zinc-100 px-4 py-3 text-sm text-zinc-600 dark:bg-zinc-900 dark:text-zinc-400">
            Nenhum check-in registrado ainda.
          </p>
        ) : (
          <table className="w-full border-collapse overflow-hidden rounded-md border border-zinc-200 text-left text-sm dark:border-zinc-800">
            <thead className="bg-zinc-100 dark:bg-zinc-900">
              <tr>
                <th className="px-4 py-2 font-medium">Data e hora</th>
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
                    <form
                      action={deleteCheckinAction.bind(null, id, checkin.id)}
                    >
                      <DeleteButton />
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
}
