import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes  } from '@fortawesome/free-solid-svg-icons';

type pros = {
    title: string;
    date: string;
    value: string;
    description?: string;
}

export const Ticket = ({title, date, value, description}: pros) => {
return (
    <>
        <div className="flex w-full h-28 px-10 mb-12">
        {/* Parte Esquerda */}
        <div className="flex-col bg-[#97A2D7] w-80  text-white flex justify-center items-start px-3 rounded-s-xl">
            <p className="text-2xl">{title}</p>
            <p className="text-sm">{date}</p>
            <p>Valor: {value}</p>
        </div>

        {/* Parte Central */}
        <div className="flex-1 bg-white flex justify-start items-start px-3">
            <p>Descrição: {description}</p>
        </div>

        {/* Parte Direita */}
        <div className="px-14 bg-[#97A2D7]  text-white flex justify-center items-center rounded-e-xl gap-9 space-x-2">
        <button className="flex flex-col items-center">
            <FontAwesomeIcon icon={faCheck} className="text-white text-3xl" />
            <p>Aceita</p>
        </button>
        <button className="flex flex-col items-center">
            <FontAwesomeIcon icon={faTimes} className="text-white text-3xl" />
            <p>Recusar</p>
        </button>
        </div>
        </div>
    </>
);}
