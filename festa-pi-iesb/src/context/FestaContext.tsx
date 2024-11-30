"use client";
import React, { createContext, useState, ReactNode } from "react";
import { adicionar, buscarTodos, buscarUm } from "@/service/FestasService";

interface FestasContextType {
  Festas: object[];
  setFestas: React.Dispatch<React.SetStateAction<object[]>>;
  criarFesta: (dados: object) => Promise<void>;
  carregar: () => Promise<void>;
  carregarUm: (id: string) => Promise<void>;
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
    setFestas([])
    const resposta = await buscarTodos();
    if (resposta.sucesso) {
      setFestas(resposta.dados);
    } else {
      setErro(resposta.mensagem);
    }
  };

  const carregarUm = async (id: string): Promise<void> => {
    setFestas([])
    const resposta = await buscarUm(id);

    if (resposta.sucesso) {
        setFestas(resposta.dados);
     } else {
        setErro(resposta.mensagem);
     }
};

  return (
    <FestasContext.Provider value={{ Festas, setFestas, criarFesta, carregar, carregarUm }}>
      {children}
    </FestasContext.Provider>
  );
}

export { FestasProvider, FestasContext };
