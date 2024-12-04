"use client";
import { Amigos } from "@/components/ui/amigos";
import NavBar from "@/components/ui/navBar";
import { SearchInput } from "@/components/ui/search-input";
import { Ticket } from "@/components/ui/ticket";
import { TicketFestasParticipando } from "@/components/ui/ticketFestasParticipando";
import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";

export default function page() {
  const router = useRouter();
  const contextUser = useContext(AuthContext)
/*{
  useEffect(() => {
    if (contextUser?.usuario === null) {
      router.push("/")
    }
  }, [])
}*/
  return (
    <>
      <NavBar />
      <div className="grid grid-row items-center w-full pt-10 px-10 grid-rows-[repeat(auto-fit,minmax(50px,1fr))] grid-cols-[repeat(auto-fit,minmax(300px,1fr))]">
        <h1 className="text-white pb-5 text-7xl">Festas</h1>
        <div>
          <SearchInput />
        </div>
      </div>
      <h2 className="px-10 text-white text-5xl py-8">Convites</h2>
      <Ticket/>
      <h2 className="px-10 text-white text-5xl py-8">Já Marcadas</h2>
      <TicketFestasParticipando/>
    </>
  );
}
