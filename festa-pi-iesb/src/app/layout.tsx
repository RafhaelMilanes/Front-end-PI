import type { Metadata } from "next";
import "./globals.css";

import { TelaProvaider } from "../context/TelaContext";

export const metadata: Metadata = {
  title: "Social Party",
  description: "Encontre o desande da calourada",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
        <body>{children}</body>
    </html>
  );
}
