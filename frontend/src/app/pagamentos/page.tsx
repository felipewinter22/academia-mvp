import Link from "next/link";
import { getPagamentos } from "@/services/api";
import { DeleteButton } from "@/components/delete-button";
import { deletePagamentoAction } from "./actions";

export const dynamic = "force-dynamic";

export default async function PagamentosPage() {
  let pagamentos: Awaited<ReturnType<typeof getPagamentos>> = [];
  let error: string | null = null;

  try {
    pagamentos = await getPagamentos();
  } catch {
    error =
      "Não foi possível carregar os pagamentos. Verifique se o backend está rodando.";
  }

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-3xl flex-col gap-6 p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
            Pagamentos
          </h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Mensalidades registradas para os alunos.
          </p>
        </div>
        <Link
          href="/pagamentos/novo"
          className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700"
        >
          + Novo pagamento
        </Link>
      </div>

      {error && (
        <p className="rounded-md bg-red-100 px-4 py-3 text-sm text-red-700 dark:bg-red-900/40 dark:text-red-300">
          {error}
        </p>
      )}

      {!error && pagamentos.length === 0 && (
        <p className="rounded-md bg-zinc-100 px-4 py-3 text-sm text-zinc-600 dark:bg-zinc-900 dark:text-zinc-400">
          Nenhum pagamento registrado ainda.
        </p>
      )}

      {!error && pagamentos.length > 0 && (
        <table className="w-full border-collapse overflow-hidden rounded-md border border-zinc-200 text-left text-sm dark:border-zinc-800">
          <thead className="bg-zinc-100 dark:bg-zinc-900">
            <tr>
              <th className="px-4 py-2 font-medium">Data</th>
              <th className="px-4 py-2 font-medium">Aluno</th>
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
                  <Link
                    href={`/alunos/${pagamento.alunoId}`}
                    className="hover:underline"
                  >
                    {pagamento.aluno?.nome ?? "—"}
                  </Link>
                </td>
                <td className="px-4 py-2">
                  {Number(pagamento.valor).toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </td>
                <td className="px-4 py-2">{pagamento.descricao ?? "—"}</td>
                <td className="px-4 py-2">
                  <form action={deletePagamentoAction.bind(null, pagamento.id)}>
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
