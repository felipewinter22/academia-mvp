import Link from "next/link";
import { createPlanoAction } from "../actions";

export default async function NovoPlanoPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-lg flex-col gap-6 p-8">
      <Link
        href="/planos"
        className="text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
      >
        ← Voltar
      </Link>

      <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
        Novo plano
      </h1>

      {error && (
        <p className="rounded-md bg-red-100 px-4 py-3 text-sm text-red-700 dark:bg-red-900/40 dark:text-red-300">
          {error}
        </p>
      )}

      <form action={createPlanoAction} className="flex flex-col gap-4">
        <label className="flex flex-col gap-1 text-sm">
          Nome
          <input
            name="nome"
            required
            className="rounded-md border border-zinc-300 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-900"
          />
        </label>

        <label className="flex flex-col gap-1 text-sm">
          Descrição
          <textarea
            name="descricao"
            rows={3}
            className="rounded-md border border-zinc-300 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-900"
          />
        </label>

        <label className="flex flex-col gap-1 text-sm">
          Preço mensal (R$)
          <input
            name="precoMensal"
            type="number"
            step="0.01"
            min="0"
            required
            className="rounded-md border border-zinc-300 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-900"
          />
        </label>

        <div className="flex gap-3">
          <button
            type="submit"
            className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700"
          >
            Salvar
          </button>
          <a
            href="/planos"
            className="rounded-md border border-zinc-300 px-4 py-2 text-sm font-medium dark:border-zinc-700"
          >
            Cancelar
          </a>
        </div>
      </form>
    </div>
  );
}
