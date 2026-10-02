import type { Metadata } from "next";
import "./globals.css";
import { NavBar } from "@/components/nav-bar";

export const metadata: Metadata = {
  title: "Academia MVP",
  description: "Sistema de gerenciamento de academia",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className="h-full antialiased">
      <body className="min-h-full flex flex-col font-sans">
        <NavBar />
        {children}
      </body>
    </html>
  );
}
