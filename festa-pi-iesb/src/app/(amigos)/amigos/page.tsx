"use client";
import NavBar from "@/components/ui/navBar";
import { SearchInput } from "@/components/ui/search-input";
import { Amigos } from "@/components/ui/amigos";
import { Solicitacoes } from "@/components/ui/solicitacoes";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export default function page() {
  const contextAuth = useContext(AuthContext);
  const router = useRouter();

  const [nameField, setNameField] = useState("");


  useEffect(() => {
    if (contextAuth?.usuario === null) {
      router.push("/");
    }
  }, []);

  return (
    <>
      <NavBar />
      <div className="grid grid-row items-center w-full pt-10 px-10 grid-rows-[repeat(auto-fit,minmax(50px,1fr))] grid-cols-[repeat(auto-fit,minmax(300px,1fr))]">
        <h1 className="text-white pb-5 text-7xl">Amigos</h1>
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
      <p className="px-10 text-white pt-5 text-4xl">Amizades</p>
      <Amigos />
    </>
  );
}
