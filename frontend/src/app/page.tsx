import { getAlunos, getPlanos } from "@/services/api";

export const dynamic = "force-dynamic";

export default async function Home() {
  let totalAlunosAtivos = 0;
  let totalPlanos = 0;
  let receitaMensal = 0;

  try {
    const [alunos, planos] = await Promise.all([getAlunos(), getPlanos()]);
    totalAlunosAtivos = alunos.filter((aluno) => aluno.ativo).length;
    totalPlanos = planos.length;
    receitaMensal = alunos
      .filter((aluno) => aluno.ativo && aluno.plano)
      .reduce((total, aluno) => total + Number(aluno.plano!.precoMensal), 0);
  } catch {
    // backend fora do ar: mostra a página sem os números
  }

  return (
    <div className="flex min-h-[calc(100vh-57px)] flex-col items-center justify-center gap-6 bg-zinc-50 p-8 text-center dark:bg-black">
      <div>
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">
          🏋️ Academia MVP
        </h1>
        <p className="mt-2 max-w-md text-zinc-600 dark:text-zinc-400">
          Sistema de gerenciamento de academia com CRUD de alunos e planos,
          integrando frontend (Next.js) e backend (NestJS + Prisma).
        </p>
      </div>

      <div className="flex gap-6 rounded-md border border-zinc-200 px-8 py-4 dark:border-zinc-800">
        <div>
          <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
            {totalAlunosAtivos}
          </p>
          <p className="text-xs text-zinc-600 dark:text-zinc-400">
            Alunos ativos
          </p>
        </div>
        <div>
          <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
            {totalPlanos}
          </p>
          <p className="text-xs text-zinc-600 dark:text-zinc-400">Planos</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
            {receitaMensal.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </p>
          <p className="text-xs text-zinc-600 dark:text-zinc-400">
            Receita mensal recorrente
          </p>
        </div>
      </div>

      <div className="flex gap-4">
        <a
          href="/alunos"
          className="text-sm font-medium text-emerald-700 underline underline-offset-4 dark:text-emerald-400"
        >
          Ver alunos →
        </a>
        <a
          href="/planos"
          className="text-sm font-medium text-emerald-700 underline underline-offset-4 dark:text-emerald-400"
        >
          Ver planos →
        </a>
      </div>
    </div>
  );
}
