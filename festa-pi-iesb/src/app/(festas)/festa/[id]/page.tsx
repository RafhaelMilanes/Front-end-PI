"use client";
import Imagem from "@/components/ui/imagem";
import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import { buscarUm } from "@/service/FestasService";

function Page() {
  const searchParams = useSearchParams();
  const festaId = searchParams.getAll("a")[0];

  const [erro, setErro] = useState("");
  const [festa, setFesta] = useState({
    nome: "",
    data: "",
    descricao: "",
    regras: [],
    participantes: [],
    organizador: [],
    valor: 0,
  });

  const carregarUm = async (festaId: string): Promise<void> => {
    const resposta = await buscarUm(festaId);
    if (resposta.sucesso) {
      setFesta(resposta.dados);
    } else {
      setErro(resposta.mensagem);
    }
  };

  carregarUm(festaId);

  return (
    <div className="flex flex-col">
      <Imagem titulo={festa.nome} data={festa.data} />
      <section className="px-8 mt-20">
        <h2 className="text-4xl mb-4">Descrição</h2>
        <p>{festa.descricao}</p>
      </section>
      <section className="px-8 mt-20">
        <h2 className="text-4xl mb-4">Regras</h2>
        <ul>
          {festa.regras.map((item, index) => (
            <li key={index} className="list-disc mx-5">
              {[item]}
            </li>
          ))}
        </ul>
      </section>
      <section className="px-8 mt-20">
        <h2 className="text-4xl mb-4">Participantes</h2>
        <p>
          {festa.participantes.map((item, index) => (
            <li key={index} className="list-disc mx-5">
              {[item]}
            </li>
          ))}
        </p>
      </section>
      <section className="px-8 mt-20">
        <h2 className="text-4xl mb-4">Organizadores</h2>
        <p>{festa.organizador}</p>
      </section>
      <section className="px-8 mt-20">
        <h2 className="text-4xl mb-4">Valor</h2>
        <p>R$ {festa.valor}</p>
      </section>
      <section className="flex mt-20 mb-10 w-4/5 h-12 self-center justify-center items-center bg-[#97a2d7] rounded-xl">
        <button className="text-white text-2xl">Participar</button>
      </section>
    </div>
  );
}

export default Page;
