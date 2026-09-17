export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-zinc-50 p-8 text-center dark:bg-black">
      <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">
        🏋️ Academia MVP
      </h1>
      <p className="max-w-md text-zinc-600 dark:text-zinc-400">
        Esqueleto do frontend criado com Next.js. A integração com a API
        (backend) e as telas de gerenciamento da academia serão implementadas
        nas próximas etapas do projeto.
      </p>
      <span className="rounded-full bg-emerald-100 px-4 py-1 text-sm font-medium text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">
        Etapa: Kickoff estrutural
      </span>
      <a
        href="/alunos"
        className="text-sm font-medium text-emerald-700 underline underline-offset-4 dark:text-emerald-400"
      >
        Ver alunos →
      </a>
    </div>
  );
}
