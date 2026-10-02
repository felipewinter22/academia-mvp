export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-zinc-50 p-8 text-center dark:bg-black">
      <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">
        🏋️ Academia MVP
      </h1>
      <p className="max-w-md text-zinc-600 dark:text-zinc-400">
        Sistema de gerenciamento de academia com CRUD de alunos e planos,
        integrando frontend (Next.js) e backend (NestJS + Prisma).
      </p>
      <span className="rounded-full bg-emerald-100 px-4 py-1 text-sm font-medium text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">
        Etapa: CRUD de Alunos e Planos
      </span>
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
