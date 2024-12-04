"use client";
import NavBar from "@/components/ui/navBar";
import { AmigosContext } from "@/context/AmigosContext";
import { AuthContext } from "@/context/AuthContext";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

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

export default function page() {
  const router = useRouter();
  useEffect(() => {
    if (contextUsuario?.usuario === null) {
      router.push("/")
    }
  }, [])
  
  const tamanhoTela = useScreenWidth();

  const items = [
    {
      nome: "dasc",
      amigos: [1, 4, 6],
      festas: [1, 7, 8],
    },
  ];

  const contextAmigos = useContext(AmigosContext);
  const contextUsuario = useContext(AuthContext);
  const [usuarios, setUsuarios] = useState<object[]>([]);
  const [erro, setErro] = useState<string | undefined>(undefined);

  const fetchTodosUsuarios = async () => {
    if (contextAmigos && contextUsuario?.usuario?.id) {
      try {
        const resposta = await contextAmigos.buscarTodos(
          contextUsuario.usuario.id
        );
        if (resposta) {
          setUsuarios(resposta);
          setErro(undefined);
        } else {
          setErro("Não foi possível buscar os usuários.");
        }
      } catch (error) {
        setErro("Ocorreu um erro ao buscar os usuários.");
      }
    }
  };

  useEffect(() => {
    fetchTodosUsuarios();
  }, [contextAmigos, contextUsuario]);

  const handleAddAmigo = async (amigoId: number) => {
    if (contextUsuario?.usuario?.id && contextAmigos) {
      try {
        const sucesso = await contextAmigos.addAmigo(
          contextUsuario.usuario.id,
          amigoId
        );
        if (sucesso) {
          fetchTodosUsuarios();
          contextAmigos.setErro("");
        } else {
          ;
        }
      } catch (error) {
      }
    }
  };

  return (
    <>
      <NavBar />
      <div className="px-10 mt-10">
        <h1 className="text-white pb-5 text-7xl">Pessoas proximas</h1>
        {contextAmigos?.erro && (
          <p className="text-red-700">{contextAmigos.erro}</p>
        )}

        {tamanhoTela > 735 ? (
          <ul>
            {usuarios.map((item, index) => (
              <li className="w-full my-8 bg-[#97A2D7] rounded-3xl" key={index}>
                <div className="flex justify-between w-full text-white">
                  {/* Parte Esquerda */}
                  <div className="py-3 flex-col text-white flex justify-center items-start px-8">
                    <p className="text-2xl">{item.nome}</p>
                    <p className="text-sm">
                      {item.amigos.length} amigos em comum
                    </p>
                  </div>

                  {/* Parte Central */}
                  <div className="flex flex-col justify-center items-start mr-20 px-8">
                    <h3>Confirmado para:</h3>
                    <p>{item.festas.length} festas</p>
                  </div>

                  <div className="flex flex-row items-center">
                    <button className="flex flex-col items-center px-10">
                      <FontAwesomeIcon
                        icon={faCheck}
                        className="text-white text-3xl"
                        onClick={() => {
                          handleAddAmigo(item.id);
                        }}
                      />
                      <p>Adicionar</p>
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <ul>
            {items.map((item, index) => (
              <li
                className="w-full py-5 text-white bg-[#97A2D7] rounded-3xl"
                key={index}
              >
                <div className="">
                  {/* Parte Top Mobile*/}
                  <div className="flex flex-col items-center text-white py-4 ">
                    <p className="text-2xl">{item.nome}</p>
                    <p className="text-sm">
                      {item.amigos.length} amigos em comum
                    </p>
                  </div>

                  {/* Parte Central Mobile*/}
                  <div className=" flex flex-col items-center py-4 px-3">
                    <h3>Confirmado para:</h3>
                    <p>{item.festas.length} festas</p>
                  </div>

                  <div className="flex flex-row items-center justify-center py-4">
                    <button className="flex flex-col items-center px-10">
                      <FontAwesomeIcon
                        icon={faCheck}
                        className="text-white text-3xl"
                      />
                      <p>Adicionar</p>
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
