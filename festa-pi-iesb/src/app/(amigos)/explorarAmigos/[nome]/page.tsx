"use client";
import NavBar from "@/components/ui/navBar";
import { AmigosContext } from "@/context/AmigosContext";
import { AuthContext } from "@/context/AuthContext";
import { faCheck, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
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

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const NomePessoa = searchParams.getAll("a")[0];

  const contextAmigos = useContext(AmigosContext);
  const contextUsuario = useContext(AuthContext);

  const [usuarios, setUsuarios] = useState<object[]>([]);
  const [erro, setErro] = useState<string | undefined>(undefined);
  const [nameField, setNameField] = useState("");

  useEffect(() => {
    if (contextUsuario?.usuario === null) {
      router.push("/");
    }
  }, [contextUsuario, router]);

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
          setErro("Não foi possível adicionar o amigo.");
        }
      } catch (error) {
        setErro("Ocorreu um erro ao adicionar o amigo.");
      }
    }
  };

  const tamanhoTela = useScreenWidth();

  const filteredUsuarios = NomePessoa
    ? usuarios.filter((usuario: any) => usuario.nome === NomePessoa)
    : usuarios;
  return (
    <>
      <NavBar />
      <div className="px-10 mt-10">
        <div className="grid grid-row items-center w-full grid-rows-[repeat(auto-fit,minmax(50px,1fr))] grid-cols-[repeat(auto-fit,minmax(300px,1fr))]">
          {filteredUsuarios.length <= 0 ? (
            <h1 className="text-white pb-5 text-6xl">
              Nenhuma Pessoa Encontrada
            </h1>
          ) : (
            <h1 className="text-white pb-5 text-6xl">Pessoas Encontradas</h1>
          )}{" "}
          <div className="grid grid-row items-center w-full grid-rows-[repeat(auto-fit,minmax(50px,1fr))] grid-cols-[repeat(auto-fit,minmax(250px,1fr))]">
            <div className="my-2">
              <Input
                label="Nome:"
                placeholder="Digite seu nome"
                icon={faSearch}
                value={nameField}
                onChange={(t) => setNameField(t)}
              />
            </div>
            <button
              onClick={() => {
                router.push(`/explorarAmigos/dashboard?a=${nameField}`);
              }}
              className="px-10 h-14 mx-4 my-2 bg-[#97a2d7] self-end text-white rounded-xl"
            >
              Pesquisar
            </button>
          </div>
        </div>

        {contextAmigos?.erro && (
          <p className="text-red-700">{contextAmigos.erro}</p>
        )}

        {tamanhoTela > 735 ? (
          <ul className="my-20">
            {filteredUsuarios.map((item, index) => (
              <li
                className="w-full py-4 px-8 my-8 bg-[#97A2D7] rounded-3xl"
                key={index}
              >
                <div className="flex flex-col w-full text-white">
                  <div className="self-start flex-col text-white flex justify-center items-start">
                    <p className="text-2xl">{item.nome}</p>
                    <p className="text-sm">
                      {item.amigos.length} amigos em comum
                    </p>
                  </div>
                  <div className="flex self-end flex-row items-center">
                    <button
                      className="flex flex-col items-center px-28 py-2 bg-[#657ADD] rounded-3xl"
                      onClick={() => handleAddAmigo(item.id)}
                    >
                      <p>Adicionar Amigo</p>
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <ul className="my-20">
            {filteredUsuarios.map((item, index) => (
              <li
                className="w-full py-5 text-white bg-[#97A2D7] rounded-3xl"
                key={index}
              >
                <div className="">
                  <div className="flex flex-col items-center text-white py-4 ">
                    <p className="text-2xl">{item.nome}</p>
                    <p className="text-sm">
                      {item.amigos.length} amigos em comum
                    </p>
                  </div>

                  <div className="flex self-end flex-row items-center justify-center">
                    <button
                      className="flex flex-col items-center px-28 py-2 bg-[#657ADD] rounded-3xl"
                      onClick={() => handleAddAmigo(item.id)}
                    >
                      Adicionar Amigo
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
