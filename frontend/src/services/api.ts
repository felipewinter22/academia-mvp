// Cliente HTTP central para futura integração com o backend (NestJS).
// A URL virá da variável de ambiente NEXT_PUBLIC_API_URL (ver .env.example).

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

export async function apiFetch(path: string, options?: RequestInit) {
  const response = await fetch(`${API_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`Erro na API: ${response.status}`);
  }

  return response.json();
}
