import { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FestasContext } from "@/context/FestaContext";
import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

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

export const TicketFestasParticipando = () => {
  const router = useRouter()
  const tamanhoTela = useScreenWidth();

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
            setErro(contextFesta.erro);
          }
        } catch (error) {
          setErro(contextFesta.erro);
        }
      }
    };
    fetchFestasParticipando();
  }, [contextFesta, contextAuth]);

  return (
    <>
      {tamanhoTela > 735 ? (
        <ul>
          {erro && <p className="text-red-700">{erro}</p>}
          {festas.map((item, index) => (
              <li className="w-full my-8 px-10" key={index} onClick={() => {router.push(`/festa/dashboard?a=${item.id}`)}}>
                <div className="flex justify-center w-full">
                  {/* Parte Esquerda */}
                  <div className="w-[30%] py-3 flex-col bg-[#97A2D7] text-white flex justify-center items-start px-8 rounded-s-3xl">
                    <p className="text-2xl">{item.nome}</p>
                    <p className="text-sm">{item.data}</p>
                    <p>Valor: {item.valor}</p>
                  </div>

                  {/* Parte Central */}
                  <div className="w-[70%] bg-white flex justify-start items-start px-8 rounded-r-3xl">
                    <p>Descrição: {item.descricao}</p>
                  </div>
                </div>
              </li>
          ))}
        </ul>
      ) : (
        <ul>
          {festas.map((item, index) => (
              <li className="w-full px-10 py-5" key={index} onClick={() => {router.push(`/festa/dashboard?a=${item.id}`)}}>
                <div className="">
                  {/* Parte Top Mobile*/}
                  <div className="flex flex-col items-center bg-[#97A2D7] text-white py-4 rounded-t-3xl">
                    <p className="text-2xl">{item.nome}</p>
                    <p className="text-sm">{item.data}</p>
                    <p>Valor: {item.valor}</p>
                  </div>

                  {/* Parte Central Mobile*/}
                  <div className="bg-white py-4 px-3 rounded-b-3xl">
                    <p>Descrição: {item.descricao}</p>
                  </div>
                </div>
              </li>
          ))}
        </ul>
      )}
    </>
  );
};
