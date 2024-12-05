"use client";
import Imagem from "@/components/ui/imagem";
import React, { useContext, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { buscarUm, adicionarParticipante } from "@/service/FestasService";
import { AuthContext } from "@/context/AuthContext";

function Page() {
  const contextUser = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (contextUser?.usuario === null) {
      router.push("/");
    }
  }, [contextUser, router]);

  const searchParams = useSearchParams();
  const festaId = searchParams.getAll("a")[0];

  const [erro, setErro] = useState("");
  const [festa, setFesta] = useState({
    nome: "",
    data: "",
    descricao: "",
    regras: [],
    participantesDetalhes: [] as { id: number; nome: string }[],
    organizadorDetalhes: null as { id: number; nome: string } | null,
    valor: 0,
  });

  const carregarUm = async (festaId: string): Promise<void> => {
    const resposta = await buscarUm(festaId);
    if (resposta.sucesso) {
      setFesta({
        ...resposta.dados,
        participantesDetalhes: resposta.dados.participantesDetalhes || [],
        organizadorDetalhes: resposta.dados.organizadorDetalhes || null,
      });
    } else {
      setErro(resposta.msg);
    }
  };

  const usuarioId = contextUser?.usuario?.id;

  const handleParticipar = async () => {
    if (usuarioId) {
      const resposta = await adicionarParticipante(usuarioId, parseInt(festaId));
      if (resposta.sucesso) {
        carregarUm(festaId);
      } else {
        setErro(resposta.msg);
      }
    }
  };

  useEffect(() => {
    carregarUm(festaId);
  }, [festaId]);

  const isParticipating = festa.participantesDetalhes.some(participante => participante.id === usuarioId);

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
              {item}
            </li>
          ))}
        </ul>
      </section>
      <section className="px-8 mt-20">
        <h2 className="text-4xl mb-4">Participantes</h2>
        <ul>
          {festa.participantesDetalhes.map((participante, index) => (
            <li key={index} className="list-disc mx-5">
              {participante.nome}
            </li>
          ))}
        </ul>
      </section>
      <section className="px-8 mt-20">
        <h2 className="text-4xl mb-4">Organizadores</h2>
        <ul>
          {festa.organizadorDetalhes && (
            <li className="list-disc mx-5">
              {festa.organizadorDetalhes.nome}
            </li>
          )}
        </ul>
      </section>
      <section className="px-8 mt-20">
        <h2 className="text-4xl mb-4">Valor</h2>
        <p>R$ {festa.valor}</p>
      </section>
      {!isParticipating && (
        <section className="flex mt-20 mb-10 w-4/5 h-12 self-center justify-center items-center bg-[#97a2d7] rounded-xl">
          <button className="text-white text-2xl" onClick={handleParticipar}>
            Participar
          </button>
        </section>
      )}
      {erro && <p className="text-red-700">{erro}</p>}
    </div>
  );
}

export default Page;
