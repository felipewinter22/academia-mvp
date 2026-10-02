import Link from "next/link";

export function NavBar() {
  return (
    <header className="border-b border-zinc-200 dark:border-zinc-800">
      <nav className="mx-auto flex w-full max-w-3xl items-center gap-6 px-8 py-4 text-sm font-medium">
        <Link href="/" className="text-zinc-900 dark:text-zinc-50">
          🏋️ Academia MVP
        </Link>
        <Link
          href="/alunos"
          className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
        >
          Alunos
        </Link>
        <Link
          href="/planos"
          className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
        >
          Planos
        </Link>
      </nav>
    </header>
  );
}
