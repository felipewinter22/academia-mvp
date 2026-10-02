"use client";

export function DeleteButton({ label = "Excluir" }: { label?: string }) {
  return (
    <button
      type="submit"
      className="text-sm font-medium text-red-600 hover:underline dark:text-red-400"
      onClick={(event) => {
        if (!confirm("Tem certeza que deseja excluir?")) {
          event.preventDefault();
        }
      }}
    >
      {label}
    </button>
  );
}
