"use client";
import NavBar from "@/components/ui/navBar";
import { SearchInput } from "@/components/ui/search-input";
import { Ticket } from "@/components/ui/ticket";
import { useState } from "react";

export default function Page() {
  const [tickets, setTickets] = useState([
    {
      id: 1,
      title: "Festa IESB",
      date: "30 de Agosto de 2024",
      value: "R$ 15,00",
      description: "Festa da turma ADS2024",
      isCompleted: false,
    },
    {
      id: 2,
      title: "Festa CEUB",
      date: "01 de Agosto de 2024",
      value: "R$ 15,00",
      description: "Festa da turma ADS203",
      isCompleted: false,
    },
    {
      id: 3,
      title: "Festa UNB",
      date: "02 de Agosto de 2024",
      value: "R$ 15,00",
      description: "Festa Direito 060810",
      isCompleted: false,
    },
  ]);

  const onDeleteTicket = (ticketId: number) => {
    const newTickets = tickets.filter((ticket) => ticket.id !== ticketId);
    setTickets(newTickets);
  };

  const onAcceptTicket = (ticketId: number) => {
    const updatedTickets = tickets.map((ticket) =>
      ticket.id === ticketId ? { ...ticket, isCompleted: true } : ticket
    );
    setTickets(updatedTickets);
  };

  return (
    <>
      <NavBar />
      <div className="flex w-full items-center justify-between mb-20">
        <div className="flex justify-center items-center flex-grow">
          <h1 className="text-6xl text-white">Festas</h1>
        </div>

        <div className="w-[328px] pt-6 ml-auto mx-9">
          <SearchInput />
        </div>
      </div>

      <h1 className="text-4xl text-white px-10">Convites</h1>
      {tickets
        .filter((ticket) => !ticket.isCompleted) // Exibe apenas tickets não aceitos
        .map((ticketItem) => (
          <Ticket
            key={ticketItem.id}
            ticket={ticketItem}
            onDeleteTicket={onDeleteTicket}
            onAcceptTicket={onAcceptTicket}
          />
        ))}

      {/* Seção de Tickets Aceitos */}
      <h1 className="text-4xl text-white px-10 mt-10">Já Marcadas: </h1>
      {tickets.filter((ticket) => ticket.isCompleted).length > 0 ? (
        tickets
          .filter((ticket) => ticket.isCompleted) // Exibe apenas tickets aceitos
          .map((ticketItem) => (
            <Ticket
              key={ticketItem.id}
              ticket={ticketItem}
              onDeleteTicket={onDeleteTicket}
              onAcceptTicket={onAcceptTicket}
            />
          ))
      ) : (
        <p className="text-white px-10">Nenhum convite aceito ainda.</p>
      )}
    </>
  );
}
