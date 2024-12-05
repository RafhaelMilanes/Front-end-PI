"use client"
import React,{useContext, useEffect, useState} from "react";
import { FestasContext } from "@/context/FestaContext";
import Link from "next/link";
import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

function SecaoProximasFestas() {
  const router = useRouter()

  const contextFesta = useContext(FestasContext);

  const [festas, setFestas] = useState<object[]>([]);
  const [erro, setErro] = useState<string | undefined>(undefined);

  useEffect(() => {
    const fetchFestasParticipando = async () => {
      if (contextFesta) {
        try {
          const resposta = await contextFesta.carregar();
          if (resposta) {
            setFestas(resposta.slice(0,3));
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
  }, [contextFesta]);

  return (
    <section className="py-8">
      <h2 className="ps-10 text-5xl text-white  ">Festas Próximas:</h2>
      <ul className="grid w-full grid-rows-[repeat(auto-fit,minmax(300px,1fr))] grid-cols-[repeat(auto-fit,minmax(300px,1fr))]">
        {festas.map((item, index) => (
          <li className="bg-white mx-10 my-8 rounded-3xl" key={index} onClick={() => {router.push(`/festa/dashboard?a=${item.id}`)}}>
            <div className="bg-[#97a2d7] text-white px-5 py-4 rounded-t-3xl">
              <h3 className="text-3xl">{item.nome}</h3>
              <p className="text-xl">{item.data}</p>
            </div>
            <div className="px-5 py-5">
              <p>{item.descricao}</p>
              <p className="text-3xl pt-7">Valor: R${item.valor},00</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default SecaoProximasFestas;
