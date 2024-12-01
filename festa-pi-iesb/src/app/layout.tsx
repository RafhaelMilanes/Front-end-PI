import type { Metadata } from "next";
import "./globals.css";
import { FestasProvider } from "@/context/FestaContext";
import { AuthProvider } from "@/context/AuthContext";

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
      <body>
        <AuthProvider>
          <FestasProvider>{children}</FestasProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
