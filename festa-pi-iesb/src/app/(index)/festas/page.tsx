"use client";
import NavBar from "@/components/ui/navBar";
import { SearchInput } from "@/components/ui/search-input";
import { Ticket } from "@/components/ui/ticket";

export default function page() {
  return (
    <>
        <NavBar />
        <div className="flex w-full items-center justify-between mb-20">
            <div className="flex justify-center items-center flex-grow">
                <h1 className="text-6xl text-white">Festas</h1>
            </div>

            <div className="w-[328px] pt-6 ml-auto mx-9 ">
                <SearchInput />
            </div>
        </div>

        <h1 className="text-4xl text-white px-10">Convites</h1>
      <Ticket
        title="Role da Baixada"
        date="30 de Agosto de 2024"
        value="R$ 15,00"
      />
      <Ticket
        title="Role da Baixada"
        date="30 de Agosto de 2024"
        value="R$ 15,00"
      />
    </>
  );
}
