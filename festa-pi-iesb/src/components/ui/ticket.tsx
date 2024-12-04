import { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FestasContext } from "@/context/FestaContext";
import { AuthContext } from "@/context/AuthContext";

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

export const Ticket = () => {
  const tamanhoTela = useScreenWidth();

  const contextFesta = useContext(FestasContext);
  const contextAuth = useContext(AuthContext);
  const [convites, setConvites] = useState<object[]>([]);
  const [erro, setErro] = useState<string | undefined>(undefined);

  const fetchConvites = async () => {
    if (contextFesta && contextAuth?.usuario?.id) {
      try {
        const resposta = await contextFesta.procurarConvites(
          contextAuth.usuario.id
        );
        if (resposta) {
          setConvites(resposta);
          setErro(undefined);
        } else {
          setErro("Não foi possível buscar os convites.");
        }
      } catch (error) {
        setErro("Ocorreu um erro ao buscar os convites.");
      }
    }
  };
  useEffect(() => {
    fetchConvites();
  }, [contextFesta, contextAuth]);

  const handleAceitarConvite = async (IdFesta: number) => {
    if (contextFesta && contextAuth?.usuario?.id) {
      try {
        const resposta = await contextFesta.addConvite(
          contextAuth.usuario.id,
          IdFesta
        );
        if (resposta) {
          setErro(undefined);
          fetchConvites();
        } else {
          setErro(contextFesta.erro);
        }
      } catch (error) {
        setErro(contextFesta.erro);
      }
    }
  };

  const handleRecusarConvite = async (festaId: number) => {
    if (contextFesta && contextAuth?.usuario?.id) {
      try {
        const resposta = await contextFesta.removeConvite(
          contextAuth.usuario.id,
          festaId
        );
        if (resposta) {
          setErro(undefined);
          fetchConvites();
        } else {
          setErro("Não foi possível recusar o convite.");
        }
      } catch (error) {
        setErro("Ocorreu um erro ao recusar o convite.");
      }
    }
  };

  return (
    <>
      {tamanhoTela > 735 ? (
        <ul>
          {erro && <p className="text-red-700">{erro}</p>}
          {convites.map((item, index) => (
            <li className="w-full my-8 px-10" key={index}>
              <div className="flex justify-center w-full">
                {/* Parte Esquerda */}
                <div className="w-[30%] py-3 flex-col bg-[#97A2D7] text-white flex justify-center items-start px-8 rounded-s-3xl">
                  <p className="text-2xl">{item.nome}</p>
                  <p className="text-sm">{item.data}</p>
                  <p>Valor: {item.valor}</p>
                </div>

                {/* Parte Central */}
                <div className="w-[40%] bg-white flex justify-start items-start px-3">
                  <p>Descrição: {item.descricao}</p>
                </div>

                {/* Parte Direita */}
                <div className="w-[20%] bg-[#97A2D7] justify-around	 text-white flex justify-center items-center rounded-e-3xl">
                  <button
                    className="flex flex-col items-center"
                    onClick={() => {
                      handleAceitarConvite(item.id);
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faCheck}
                      className="text-white text-3xl"
                    />
                    <p>Aceita</p>
                  </button>
                  <button
                    className="flex flex-col items-center"
                    onClick={() => {
                      handleRecusarConvite(item.id);
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faTimes}
                      className="text-white text-3xl"
                    />
                    <p>Recusar</p>
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <ul>
          {convites.map((item, index) => (
            <li className="w-full px-10 py-5" key={index}>
              <div className="">
                {/* Parte Top Mobile*/}
                <div className="flex flex-col items-center bg-[#97A2D7] text-white py-4 rounded-t-3xl">
                  <p className="text-2xl">{item.nome}</p>
                  <p className="text-sm">{item.data}</p>
                  <p>Valor: {item.valor}</p>
                </div>

                {/* Parte Central Mobile*/}
                <div className="bg-white py-4 px-3">
                  <p>Descrição: {item.descricao}</p>
                </div>

                {/* Parte Down Mobile*/}
                <div className="flex flex-row justify-evenly items-center bg-[#97A2D7] text-white py-4 rounded-b-3xl">
                  <button
                    className="flex flex-col items-center"
                    onClick={() => {
                      handleAceitarConvite(item.id);
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faCheck}
                      className="text-white text-3xl"
                    />
                    <p>Aceita</p>
                  </button>
                  <button
                    className="flex flex-col items-center"
                    onClick={() => {
                      handleRecusarConvite(item.id);
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faTimes}
                      className="text-white text-3xl"
                    />
                    <p>Recusar</p>
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};
