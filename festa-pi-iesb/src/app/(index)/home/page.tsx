"use client"
import AgendaMinimizada from "@/components/ui/agendaMinimizada";
import CriarNovaFesta from "@/components/ui/criarNovaFesta";
import NavBar from "@/components/ui/navBar";
import SecaoFestasJáMarcadas from "@/components/ui/secaoFestasJáMarcadas";
import SecaoProximasFestas from "@/components/ui/secaoProximasFestas";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/context/AuthContext";
import { useContext, useEffect } from "react";

export default function Page() {
  const contextAuth = useContext(AuthContext)
  const router = useRouter();

  useEffect(() => {
    if (contextAuth?.usuario === null) {
      router.push("/")
    }
  }, [])

  return (
    <>
      <NavBar />
      <AgendaMinimizada />
      <div className="flex flex-col pt-10">
        <h1 className="self-center text-white text-7xl">Início</h1>
        <SecaoProximasFestas />
        <SecaoFestasJáMarcadas />
        <CriarNovaFesta />
      </div>
    </>
  );
}
