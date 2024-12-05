"use client";
import NavBar from "@/components/ui/navBar";
import { SearchInput } from "@/components/ui/search-input";
import { Explorar } from "@/components/ui/explorar";
import { useRouter, useSearchParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/context/AuthContext";
import { FestasContext } from "@/context/FestaContext";
import { Input } from "@/components/ui/input";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export default function page() {
  useEffect(() => {
    if (contextUsuario?.usuario === null) {
      router.push("/");
    }
  }, []);
  const searchParams = useSearchParams();
  const NomeFesta = searchParams.getAll("a")[0];

  const router = useRouter();
  const contextUsuario = useContext(AuthContext);
  const contextFesta = useContext(FestasContext);

  const [festas, setFestas] = useState<object[]>([]);
  const [erro, setErro] = useState<string | undefined>(undefined);
  const [nameField, setNameField] = useState("");

  useEffect(() => {
    const fetchFestasParticipando = async () => {
      if (contextFesta) {
        try {
          const resposta = await contextFesta.carregar();
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
  }, [contextFesta]);

  const filteredFesta = NomeFesta
    ? festas.filter((usuario: any) => usuario.nome === NomeFesta)
    : festas;

  return (
    <>
      <NavBar />
      <div className="grid grid-row items-center w-full mb-16 pt-10 px-10 grid-rows-[repeat(auto-fit,minmax(50px,1fr))] grid-cols-[repeat(auto-fit,minmax(300px,1fr))]">
        <div className="grid grid-row items-center w-full grid-rows-[repeat(auto-fit,minmax(50px,1fr))] grid-cols-[repeat(auto-fit,minmax(300px,1fr))]">
          {filteredFesta.length <= 0 ? (
            <h1 className="text-white pb-5 text-6xl">
              Nenhuma Festa Encontrada
            </h1>
          ) : (
            <h1 className="text-white pb-5 text-6xl">Festa Encontradas</h1>
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
                router.push(`/explorar/dashboard?a=${nameField}`);
              }}
              className="px-10 h-14 mx-4 my-2 bg-[#97a2d7] self-end text-white rounded-xl"
            >
              Pesquisar
            </button>
          </div>
        </div>
      </div>
      <Explorar festas={filteredFesta} />
    </>
  );
}
