import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";

export const useScreenWidth = () => {
  const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth);

  const handleWindowSizeChange = () => {
    setScreenWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  return screenWidth;
};
interface TicketProps {
  ticket: {
    id: number;
    title: string;
    date: string;
    value: string;
    description: string;
    isCompleted: boolean;
  };
  onDeleteTicket: (ticketId: number) => void;
}

export const Ticket = ({ ticket, onDeleteTicket }: TicketProps) => {
  const { title, date, value, description } = ticket;
  const screenWidth = useScreenWidth();

  return (
    <div className="w-full my-8 px-10">
      <div className="flex justify-center w-full">
        {/* Seção da esquerda */}
        <div className="w-[30%] py-3 flex-col bg-[#97A2D7] text-white flex justify-center items-start px-8 rounded-s-3xl">
          <p className="text-2xl">{title}</p>
          <p className="text-sm">{date}</p>
          <p>Valor: {value}</p>
        </div>

        {/* Seção central */}
        <div className="w-[40%] bg-white flex justify-start items-start px-3">
          <p>Descrição: {description}</p>
        </div>

        {/* Seção da direita (Ações) */}
        <div className="w-[20%] bg-[#97A2D7] justify-around text-white flex items-center rounded-e-3xl">
          <button className="flex flex-col items-center">
            <FontAwesomeIcon
              icon={faCheck}
              className="text-white text-3xl"
            />
            <p>Aceitar</p>
          </button>
          <button className="flex flex-col items-center">
            <FontAwesomeIcon
              icon={faTimes}
              className="text-white text-3xl"
              onClick={() => onDeleteTicket(ticket.id)}
            />
            <p>Recusar</p>
          </button>
        </div>
      </div>
    </div>
  );
};