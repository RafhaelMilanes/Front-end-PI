"use client";
import NavBar from "@/components/ui/navBar";
import { SearchInput } from "@/components/ui/search-input";
import  Ticket  from "@/components/ui/ticket";
import { useState } from "react";

export default function page() {
<<<<<<< HEAD
  const [ticket, setTicket] = useState([ 
    {
      id: 1,
      title: "Festa IESB",
      date: "30 de Agosto de 2024",
      value: "R$ 15,00",
      description: "Festa da turma ADS2024",
      isCompleted: false
    },
    {
      id: 2,
      title: "Festa CEUB",
      date: "01 de Agosto de 2024",
      value: "R$ 15,00",
      description: "Festa da turma ADS203",
      isCompleted: false
    },
    {
      id: 3,
      title: "Festa UNB",
      date: "02 de Agosto de 2024",
      value: "R$ 15,00",
      description: "Festa Direito 060810",
      isCompleted: false
    }
  ])

  function onDeleteTicket (ticketId: number){
    const newTicket = ticket.filter(ticket => ticket.id !== ticketId )
    setTicket(newTicket)
  }
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
        {ticket.map((ticketItem) => (
        <Ticket key={ticketItem.id} ticket={ticketItem} onDeleteTicket={onDeleteTicket} />
      ))}
=======
  return (
    <>
      <NavBar />
      <div className="grid grid-row items-center w-full pt-10 px-10 grid-rows-[repeat(auto-fit,minmax(50px,1fr))] grid-cols-[repeat(auto-fit,minmax(300px,1fr))]">
        <h1 className="text-white pb-5 text-7xl">Festas</h1>
        <div>
          <SearchInput />
        </div>
      </div>
      <Ticket/>
>>>>>>> 1ac37b7b004c5b5b7dcb232e7e9fba0e941c3aa7
    </>
  );
}
