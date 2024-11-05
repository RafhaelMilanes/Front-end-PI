"use client";
import NavBar from "@/components/ui/navBar";
import { SearchInput } from "@/components/ui/search-input";
import { Ticket } from "@/components/ui/ticket";

export default function page() {
return (
    <>
    <NavBar />
    <div className="flex justify-between items-center w-full px-10">
        <h1 className="text-6xl text-white">Festas</h1>
        <div className="w-[328px] ml-auto pt-6">
            <SearchInput />
        </div>
    </div>
    <Ticket
        title="Role da Baixada"
        date="30 de Agosto de 2024"
        value="R$ 15,00"
    />
    </>
);
}
