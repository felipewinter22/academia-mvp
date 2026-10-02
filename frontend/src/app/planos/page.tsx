import Link from "next/link";
import { getPlanos } from "@/services/api";
import { DeleteButton } from "@/components/delete-button";
import { deletePlanoAction } from "./actions";

export const dynamic = "force-dynamic";

export default async function PlanosPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error: deleteError } = await searchParams;
  let planos: Awaited<ReturnType<typeof getPlanos>> = [];
  let error: string | null = null;

  try {
    planos = await getPlanos();
  } catch {
    error =
      "Não foi possível carregar os planos. Verifique se o backend está rodando.";
  }

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-3xl flex-col gap-6 p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
            Planos
          </h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Planos de assinatura oferecidos pela academia.
          </p>
        </div>
        <Link
          href="/planos/novo"
          className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700"
        >
          + Novo plano
        </Link>
      </div>

      {(error || deleteError) && (
        <p className="rounded-md bg-red-100 px-4 py-3 text-sm text-red-700 dark:bg-red-900/40 dark:text-red-300">
          {error ?? deleteError}
        </p>
      )}

      {!error && planos.length === 0 && (
        <p className="rounded-md bg-zinc-100 px-4 py-3 text-sm text-zinc-600 dark:bg-zinc-900 dark:text-zinc-400">
          Nenhum plano cadastrado ainda.
        </p>
      )}

      {!error && planos.length > 0 && (
        <table className="w-full border-collapse overflow-hidden rounded-md border border-zinc-200 text-left text-sm dark:border-zinc-800">
          <thead className="bg-zinc-100 dark:bg-zinc-900">
            <tr>
              <th className="px-4 py-2 font-medium">Nome</th>
              <th className="px-4 py-2 font-medium">Descrição</th>
              <th className="px-4 py-2 font-medium">Preço mensal</th>
              <th className="px-4 py-2 font-medium">Alunos</th>
              <th className="px-4 py-2 font-medium">Ações</th>
            </tr>
          </thead>
          <tbody>
            {planos.map((plano) => (
              <tr
                key={plano.id}
                className="border-t border-zinc-200 dark:border-zinc-800"
              >
                <td className="px-4 py-2">{plano.nome}</td>
                <td className="px-4 py-2">{plano.descricao ?? "—"}</td>
                <td className="px-4 py-2">
                  {Number(plano.precoMensal).toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </td>
                <td className="px-4 py-2">
                  <Link
                    href={`/alunos?planoId=${plano.id}`}
                    className="hover:underline"
                  >
                    {plano._count?.alunos ?? 0}
                  </Link>
                </td>
                <td className="px-4 py-2">
                  <div className="flex items-center gap-3">
                    <Link
                      href={`/planos/${plano.id}/editar`}
                      className="text-sm font-medium text-emerald-700 hover:underline dark:text-emerald-400"
                    >
                      Editar
                    </Link>
                    <form action={deletePlanoAction.bind(null, plano.id)}>
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
