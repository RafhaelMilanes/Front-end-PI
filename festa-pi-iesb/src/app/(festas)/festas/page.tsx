"use client";
import { Amigos } from "@/components/ui/amigos";
import { Input } from "@/components/ui/input";
import NavBar from "@/components/ui/navBar";
import { SearchInput } from "@/components/ui/search-input";
import { Ticket } from "@/components/ui/ticket";
import { TicketFestasParticipando } from "@/components/ui/ticketFestasParticipando";
import { AuthContext } from "@/context/AuthContext";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

export default function page() {
  const router = useRouter();
  const contextUser = useContext(AuthContext)

  const [nameField, setNameField] = useState("");

  useEffect(() => {
    if (contextUser?.usuario === null) {
      router.push("/")
    }
  }, [])

  return (
    <>
      <NavBar />
      <div className="grid grid-row items-center w-full pt-10 px-10 grid-rows-[repeat(auto-fit,minmax(50px,1fr))] grid-cols-[repeat(auto-fit,minmax(300px,1fr))]">
        <h1 className="text-white pb-5 text-7xl">Festas</h1>
        <div className="grid grid-row items-center w-full grid-rows-[repeat(auto-fit,minmax(50px,1fr))] grid-cols-[repeat(auto-fit,minmax(250px,1fr))]">
            <div className="my-2">
              <Input
                label="Nome:"
                placeholder="Digite seu nome"
                icon={faSearch}
                value={nameField}
                onChange={(t) => setNameField(t)}
              />
            </div>
            <button
              onClick={() => {
                router.push(`/explorar/dashboard?a=${nameField}`);
              }}
              className="px-10 h-14 mx-4 my-2 bg-[#97a2d7] self-end text-white rounded-xl"
            >
              Pesquisar
            </button>
          </div>
      </div>
      <h2 className="px-10 text-white text-5xl py-8">Convites</h2>
      <Ticket/>
      <h2 className="px-10 text-white text-5xl py-8">Já Marcadas</h2>
      <TicketFestasParticipando/>
    </>
  );
}
