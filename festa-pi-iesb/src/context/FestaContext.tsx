"use client";
import React, { createContext, useState, ReactNode } from "react";
import {
  adicionar,
  adicionarParticipante,
  buscarTodos,
  buscarUm,
  buscarConvites,
  aceitarConvite,
  recusarConvite,
  buscarFestasParticipando,
} from "@/service/FestasService";

interface FestasContextType {
  Festas: object[];
  setFestas: React.Dispatch<React.SetStateAction<object[]>>;
  erro: string | undefined;
  setErro: React.Dispatch<React.SetStateAction<string | undefined>>;
  criarFesta: (dados: object) => Promise<void>;
  carregar: () => Promise<void>;
  carregarUm: (id: number) => Promise<void>;
  addParticipante: (usuarioId: number, festaId: number) => Promise<void>;
  addConvite: (usuarioId: number, festaId: number) => Promise<void>;
  removeConvite: (usuarioId: number, festaId: number) => Promise<void>;
  procurarConvites: (
    usuarioId: number | undefined
  ) => Promise<{ sucesso: boolean; dados: object[]; msg: string }>;
  FestasPartcipante: (
    usuarioId: number | undefined
  ) => Promise<{ sucesso: boolean; dados: object[]; msg: string }>;
}

const FestasContext = createContext<FestasContextType | undefined>(undefined);

interface FestasProviderProps {
  children: ReactNode;
}

function FestasProvider({ children }: FestasProviderProps) {
  const [Festas, setFestas] = useState<object[]>([]);
  const [erro, setErro] = useState<string>();

  const criarFesta = async (dados: object) => {
    const resposta = await adicionar(dados);
    if (resposta.sucesso) {
      console.log("deu bom!");
    } else {
      return resposta.mensagem;
    }
    return "";
  };

  const carregar = async (): Promise<void> => {
    setFestas([]);
    const resposta = await buscarTodos();
    if (resposta.sucesso) {
      setFestas(resposta.dados);
    } else {
      setErro(resposta.mensagem);
    }
  };

  const carregarUm = async (id: number): Promise<void> => {
    setFestas([]);
    const resposta = await buscarUm(id);

    if (resposta.sucesso) {
      setFestas(resposta.dados);
    } else {
      setErro(resposta.mensagem);
    }
  };

  const addParticipante = async (usuarioId: number, festaId: number) => {
    try {
      const resposta = await adicionarParticipante(usuarioId, festaId);
      if (resposta.sucesso) {
        console.log("Participante adicionado à festa com sucesso!");
        await carregarUm(festaId);
      } else {
        setErro(resposta.msg);
      }
    } catch (error) {
      setErro(erro);
    }
  };

  const addConvite = async (usuarioId: number, festaId: number) => {
    try {
      const resposta = await aceitarConvite(usuarioId, festaId);
      if (resposta.sucesso) {
        console.log("Convite aceito com sucesso!");
        await carregarUm(festaId);
      } else {
        setErro(resposta.msg);
      }
    } catch (error) {
      setErro(error.message);
    }
  };

  const removeConvite = async (usuarioId: number, festaId: number) => {
    try {
      const resposta = await recusarConvite(usuarioId, festaId);
      if (resposta.sucesso) {
        console.log("Convite recusado com sucesso!");
        await carregarUm(festaId);
      } else {
        setErro(resposta.msg);
      }
    } catch (error) {
      setErro(error.message);
    }
  };

  const procurarConvites = async (usuarioId: number | undefined) => {
    try {
      const resposta = await buscarConvites(usuarioId);
      if (resposta.sucesso) {
        return resposta.dados;
      } else {
        setErro(resposta.msg);
        return [];
      }
    } catch (error) {
      setErro(error.message);
      return [];
    }
  };

  const FestasPartcipante = async (usuarioId: number | undefined) => {
    try {
      const resposta = await buscarFestasParticipando(usuarioId);
      if (resposta.sucesso) {
        return resposta.dados;
      } else {
        setErro(resposta.msg);
        return [];
      }
    } catch (error) {
      setErro(error.message);
      return [];
    }
  };

  return (
    <FestasContext.Provider
      value={{
        Festas,
        setFestas,
        erro,
        setErro,
        criarFesta,
        carregar,
        carregarUm,
        addParticipante,
        addConvite,
        removeConvite,
        procurarConvites,
        FestasPartcipante
      }}
    >
      {children}
    </FestasContext.Provider>
  );
}

export { FestasProvider, FestasContext };
