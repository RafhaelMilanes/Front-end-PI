"use client"
import { AuthContext } from "@/context/AuthContext";
import { FestasContext } from "@/context/FestaContext";
import { useContext, useEffect, useState } from "react";

function SecaoFestasJáMarcadas() {
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

  return (
    <section className="py-8">
      <h2 className="ps-10 text-5xl text-white ">Festas Já Marcadas:</h2>
      {erro && <p className="text-red-700">{erro}</p>}
      <ul className="grid w-full grid-rows-[repeat(auto-fit,minmax(300px,1fr))] grid-cols-[repeat(auto-fit,minmax(300px,1fr))]">
        {festas.map((item, index) => (
          <li className="bg-white mx-10 my-8 rounded-3xl" key={index}>
            <div className="bg-[#97a2d7] text-white px-5 py-4 rounded-t-3xl">
              <h3 className="text-3xl">{item.nome}</h3>
              <p className="text-xl">{item.data}</p>
            </div>
            <div className="px-5 py-5">
              <p>{item.descricao.slice(0, 200)}...</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default SecaoFestasJáMarcadas;
