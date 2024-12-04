"use client"
import { AuthContext } from "@/context/AuthContext";
import { FestasContext } from "@/context/FestaContext";
import { useContext, useEffect, useState } from "react";

function AgendaMinimizada() {
    const items = [{nome: "festa 1", data: "23/12/24"}, {nome: "festa 2", data: "25/12/24"}]

    const contextFesta = useContext(FestasContext);
  const contextAuth = useContext(AuthContext);
  
  const [festas, setFestas] = useState<object[]>([]);
  const [erro, setErro] = useState<string | undefined>(undefined);

  useEffect(() => {
    const fetchFestasParticipando = async () => {
      if (contextFesta && contextAuth?.usuario?.id) {
        try {
          const resposta = await contextFesta.FestasPartcipante(
            contextAuth.usuario.id
          );
          if (resposta) {
            setFestas(resposta);
            setErro(undefined);
          } else {
            setErro("Não foi possível buscar as festas.");
          }
        } catch (error) {
          setErro("Ocorreu um erro ao buscar as festas.");
        }
      }
    };
    fetchFestasParticipando();
  }, [contextFesta, contextAuth]);

    return(
        <div className="flex flex-row items-center py-2 bg-white">
            <h2 className="mx-14">Próximas Festas:</h2>
            {erro && <p className="text-red-700">{erro}</p>}
            <ul className="flex flex-row justify-around w-4/6">
                {festas.slice(0,2).map((item, index) => (
                    <li key={index}>
                            <p>{item.nome}</p>
                            <p>{item.data}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AgendaMinimizada