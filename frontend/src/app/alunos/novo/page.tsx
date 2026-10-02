import Link from "next/link";
import { getPlanos } from "@/services/api";
import { createAlunoAction } from "../actions";

export default async function NovoAlunoPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  const planos = await getPlanos().catch(() => []);

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-lg flex-col gap-6 p-8">
      <Link
        href="/alunos"
        className="text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
      >
        ← Voltar
      </Link>

      <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
        Novo aluno
      </h1>

      {error && (
        <p className="rounded-md bg-red-100 px-4 py-3 text-sm text-red-700 dark:bg-red-900/40 dark:text-red-300">
          {error}
        </p>
      )}

      <form action={createAlunoAction} className="flex flex-col gap-4">
        <label className="flex flex-col gap-1 text-sm">
          Nome
          <input
            name="nome"
            required
            className="rounded-md border border-zinc-300 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-900"
          />
        </label>

        <label className="flex flex-col gap-1 text-sm">
          Email
          <input
            name="email"
            type="email"
            required
            className="rounded-md border border-zinc-300 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-900"
          />
        </label>

        <label className="flex flex-col gap-1 text-sm">
          Telefone
          <input
            name="telefone"
            className="rounded-md border border-zinc-300 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-900"
          />
        </label>

        <label className="flex flex-col gap-1 text-sm">
          Plano
          <select
            name="planoId"
            defaultValue=""
            className="rounded-md border border-zinc-300 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-900"
          >
            <option value="">Sem plano</option>
            {planos.map((plano) => (
              <option key={plano.id} value={plano.id}>
                {plano.nome}
              </option>
            ))}
          </select>
        </label>

        <label className="flex items-center gap-2 text-sm">
          <input name="ativo" type="checkbox" defaultChecked />
          Ativo
        </label>

        <div className="flex gap-3">
          <button
            type="submit"
            className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700"
          >
            Salvar
          </button>
          <a
            href="/alunos"
            className="rounded-md border border-zinc-300 px-4 py-2 text-sm font-medium dark:border-zinc-700"
          >
            Cancelar
          </a>
        </div>
      </form>
    </div>
  );
}
